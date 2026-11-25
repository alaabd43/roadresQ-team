# roadresq_ai.py - RoadResQ AI: video -> accident? when? where? which type?
#
# Command line (same as before):
#     py -3.13 roadresq_ai.py my_video.mp4
#
# From the backend (Flask / FastAPI):
#     from roadresq_ai import analyze_video
#     result = analyze_video("uploads/cam01.mp4", out_dir="media/incidents/17")
#     # result is a dict (see the bottom of analyze_video) - save it in the database
#
# Steps: video -> YOLO + ByteTrack (cars) -> cleaning/features (preprocess.py) -> Random Forest
#        -> ALERT when the crash probability (averaged over 0.5 s) goes above the threshold
#        -> find WHICH cars crashed (pair scoring, or a single car), the crash moment and the crash type.
#
# Needs in the same folder: preprocess.py, roadresq_rf.joblib, model_config.json, tracker.yaml
#   pip install -r requirements.txt

import json
import os
import sys

import cv2
import joblib
import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import preprocess as P  # noqa: E402

MODEL_FPS = 20                 # the model was trained on 20 frames per second
W, H = P.IMG_W, P.IMG_H        # and on 800 x 600 pictures
YOLO_MODEL, IMGSZ, CONF = 'yolo26s.pt', 1280, 0.20
CLASSES = [2, 5, 7]            # car, bus, truck

# where to look for the crash, relative to the first alert (the alert usually comes a few seconds late)
LOOK_BACK_S, LOOK_AHEAD_S = 8.0, 1.0

_cache = {}


def load_models():
    """Load the RF + config + YOLO once (the RF is ~1 GB, so the backend should keep it in memory)."""
    if 'rf' not in _cache:
        _cache['cfg'] = json.load(open(os.path.join(HERE, 'model_config.json')))
        _cache['rf'] = joblib.load(os.path.join(HERE, 'roadresq_rf.joblib'))
    return _cache['cfg'], _cache['rf']


def read_frames(path):
    """Frames at 20 per second, 800x600 (whatever the video's own speed and size are)."""
    cap = cv2.VideoCapture(path)
    src_fps = cap.get(cv2.CAP_PROP_FPS) or 30
    frames, k, i = [], 0, 0
    while True:
        ok, img = cap.read()
        if not ok:
            break
        t = i / src_fps
        while k / MODEL_FPS <= t + 1e-9:
            frames.append(cv2.resize(img, (W, H)))
            k += 1
        i += 1
    cap.release()
    return frames, src_fps


def detect(frames, name, log=print):
    from ultralytics import YOLO
    model = YOLO(os.path.join(HERE, YOLO_MODEL) if os.path.exists(os.path.join(HERE, YOLO_MODEL)) else YOLO_MODEL)
    tracker = os.path.join(HERE, 'tracker.yaml')
    rows = []
    for f, img in enumerate(frames):
        r = model.track(img, classes=CLASSES, conf=CONF, imgsz=IMGSZ, tracker=tracker,
                        persist=True, verbose=False)[0]
        if r.boxes is not None and r.boxes.id is not None:
            for xyxy, tid, cf in zip(r.boxes.xyxy.tolist(), r.boxes.id.tolist(), r.boxes.conf.tolist()):
                x1, y1, x2, y2 = xyxy
                rows.append(dict(recording=name, frame_number=f, time_s=f / MODEL_FPS, car_id=int(tid),
                                 object='vehicle', yolo_guess='car', stable_class='car', class_changes=0,
                                 confidence=cf, box_left_px=x1, box_top_px=y1, box_right_px=x2,
                                 box_bottom_px=y2, box_center_x_px=(x1 + x2) / 2,
                                 box_center_y_px=(y1 + y2) / 2, box_width_px=x2 - x1, box_height_px=y2 - y1,
                                 speed_px_per_sec=0.0, carla_frame_number=f, label=0, scenario=name,
                                 model='YOLO', expected_collision=False, collision_start_carla_frame=np.nan,
                                 collision_end_carla_frame=np.nan))
        if f % 100 == 0:
            log("  YOLO: %d / %d frames" % (f, len(frames)))
    return pd.DataFrame(rows)


def features(det, out_dir, still_fix):
    P.STILL_FIX = still_fix
    df = P.clean(det, [], out_dir)
    df = P.track_features(df)
    ff = P.history_features(P.frame_features(df))
    return df, ff


# ----------------------------------------------------------------------------------------------
# WHERE + WHEN + TYPE
# ----------------------------------------------------------------------------------------------
def _per_car(tracks):
    """One small table per car, indexed by frame, with smoothed position, speed and box."""
    cars = {}
    for cid, d in tracks.groupby('car_id'):
        d = d.set_index('frame_number').sort_index()
        d = d[~d.index.duplicated()]
        cars[cid] = d
    return cars


def _val(d, f, col, default=np.nan):
    return d.at[f, col] if f in d.index else default


def _window_max(d, f0, f1, col):
    s = d.loc[(d.index >= f0) & (d.index <= f1), col]
    return float(s.max()) if len(s) else np.nan


def _window_min(d, f0, f1, col):
    s = d.loc[(d.index >= f0) & (d.index <= f1), col]
    return float(s.min()) if len(s) else np.nan


def _heading(d, f, back=10):
    """Direction the car was moving in the ~0.5 s before frame f (unit vector) and its speed."""
    s = d.loc[(d.index >= f - back) & (d.index <= f)]
    if len(s) < 3:
        return None
    v = np.array([s.box_center_x_px_s.iloc[-1] - s.box_center_x_px_s.iloc[0],
                  s.box_center_y_px_s.iloc[-1] - s.box_center_y_px_s.iloc[0]])
    n = np.linalg.norm(v)
    return v / n if n > 1e-6 else None


def _iou(a, b):
    ix = max(0.0, min(a[2], b[2]) - max(a[0], b[0]))
    iy = max(0.0, min(a[3], b[3]) - max(a[1], b[1]))
    inter = ix * iy
    u = (a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - inter
    return inter / u if u > 0 else 0.0


def _box(d, f):
    r = d.loc[f]
    return (r.box_left_px, r.box_top_px, r.box_right_px, r.box_bottom_px)


def _crash_type(ca, cb, f):
    """rear-end / head-on / t-bone / sideswipe from the two directions just before contact."""
    ha, hb = _heading(ca, f - 5, 20), _heading(cb, f - 5, 20)
    if ha is None and hb is None:
        return 'unknown'
    if ha is None or hb is None:              # one car was standing still -> it was hit
        mover, other, h = (cb, ca, hb) if ha is None else (ca, cb, ha)
        to_other = np.array([_val(other, f, 'box_center_x_px_s') - _val(mover, f, 'box_center_x_px_s'),
                             _val(other, f, 'box_center_y_px_s') - _val(mover, f, 'box_center_y_px_s')])
        n = np.linalg.norm(to_other)
        if n < 1e-6:
            return 'rear-end'
        c = abs(float(np.dot(h, to_other / n)))
        return 'rear-end' if c > 0.8 else 't-bone'
    ang = np.degrees(np.arccos(np.clip(float(np.dot(ha, hb)), -1, 1)))
    if ang > 150:
        return 'head-on'
    if ang > 50:
        return 't-bone'
    # same direction: rear-end if one is behind the other, sideswipe if side by side
    to_b = np.array([_val(cb, f, 'box_center_x_px_s') - _val(ca, f, 'box_center_x_px_s'),
                     _val(cb, f, 'box_center_y_px_s') - _val(ca, f, 'box_center_y_px_s')])
    n = np.linalg.norm(to_b)
    if n < 1e-6:
        return 'rear-end'
    along = abs(float(np.dot((ha + hb) / 2, to_b / n)))
    return 'rear-end' if along > 0.7 else 'sideswipe'


def locate_crash(tracks, alert_frame, n_frames):
    """Find the crashed cars around the first alert.

    Pair score (each part 0..1, total 0..4):
      1. both moving before   - max speed in the 2 s before contact (a queue of stopped cars scores ~0)
      2. converging           - the gap shrank fast in the 1 s before contact
      3. touching             - the boxes overlap / are less than ~1 car length apart
      4. sudden change after  - one of them stopped hard or jumped sideways in the 1.5 s after
    Single car (hit a pole / wall / fell over): was moving, stopped hard, stayed stopped.
    """
    f0 = max(0, alert_frame - int(LOOK_BACK_S * MODEL_FPS))
    f1 = min(n_frames - 1, alert_frame + int(LOOK_AHEAD_S * MODEL_FPS))
    cars = _per_car(tracks[(tracks.frame_number >= f0 - 60) & (tracks.frame_number <= f1 + 40)])
    win = tracks[(tracks.frame_number >= f0) & (tracks.frame_number <= f1)]

    best = None   # (score, kind, ids, frame)
    for f, here in win.groupby('frame_number'):
        if len(here) < 2:
            continue
        ids = here.car_id.values
        xy = here[['box_center_x_px_s', 'box_center_y_px_s']].values
        L = here.car_len_px.values
        for i in range(len(ids)):
            for j in range(i + 1, len(ids)):
                gap = np.hypot(*(xy[i] - xy[j])) / ((L[i] + L[j]) / 2)
                if gap > 1.4:
                    continue
                ca, cb = cars[ids[i]], cars[ids[j]]
                touch = max(_iou(_box(ca, f), _box(cb, f)) > 0.0, 0.0) if gap > 0.9 else 1.0
                touch = 1.0 if (gap <= 0.9 or touch) else 0.0
                va = _window_max(ca, f - 40, f, 'speed_cl')
                vb = _window_max(cb, f - 40, f, 'speed_cl')
                moving = np.clip(np.nansum([va, vb]) / 3.0, 0, 1)
                # gap 1 s ago
                fa = f - 20
                if fa in ca.index and fa in cb.index:
                    g_old = np.hypot(ca.at[fa, 'box_center_x_px_s'] - cb.at[fa, 'box_center_x_px_s'],
                                     ca.at[fa, 'box_center_y_px_s'] - cb.at[fa, 'box_center_y_px_s']) / ((L[i] + L[j]) / 2)
                    converge = np.clip((g_old - gap) / 1.5, 0, 1)
                else:
                    converge = 0.3          # one car just appeared: unknown
                # after: hard stop or sideways jump
                after = 0.0
                for c, v in ((ca, va), (cb, vb)):
                    if np.isnan(v) or v < 0.5:
                        continue
                    v_after = _window_min(c, f, f + 30, 'speed_cl')
                    drop = (v - v_after) / v if not np.isnan(v_after) else 0
                    jolt = _window_max(c, f, f + 30, 'jolt')
                    after = max(after, np.clip(drop, 0, 1), np.clip((jolt if not np.isnan(jolt) else 0) / 2.0, 0, 1))
                score = moving + converge + touch + after
                if best is None or score > best[0] + 1e-9:
                    best = (score, 'pair', (ids[i], ids[j]), int(f))

    # single car: moving fast -> hard stop -> stays stopped (and no other car right next to it)
    best_single = None
    for cid, d in cars.items():
        s = d.loc[(d.index >= f0) & (d.index <= f1)]
        if len(s) < 10:
            continue
        for f in s.index[s.sudden_stop == 1] if 'sudden_stop' in s else []:
            v_before = _window_max(d, f - 40, f, 'speed_cl')
            stays = _window_max(d, f, f + 40, 'speed_cl')
            if np.isnan(v_before) or np.isnan(stays):
                continue
            score = np.clip(v_before / 3.0, 0, 1) + (1.0 if stays < 0.3 else 0.0) + \
                np.clip(_val(d, f, 'jolt', 0) / 2.0, 0, 1)
            # a car stopping behind another car = a queue, not a crash
            near = win[(win.frame_number == f) & (win.car_id != cid)]
            if len(near):
                gaps = np.hypot(near.box_center_x_px_s - d.at[f, 'box_center_x_px_s'],
                                near.box_center_y_px_s - d.at[f, 'box_center_y_px_s']) / d.at[f, 'car_len_px']
                if gaps.min() < 1.8:
                    score -= 1.0
            if best_single is None or score > best_single[0]:
                best_single = (score, 'single', (cid,), int(f))

    # pair needs a convincing score (max 4); otherwise a clear single-car stop wins
    cands = []
    if best is not None:
        cands.append((best[0] / 4.0, best))
    if best_single is not None:
        cands.append((best_single[0] / 3.0, best_single))
    if not cands:
        return None
    pick = max(cands, key=lambda c: c[0])[1]

    score, kind, ids, f = pick
    sel = [cars[c] for c in ids]
    boxes = [_box(c, f) for c in sel if f in c.index]
    x1 = min(b[0] for b in boxes); y1 = min(b[1] for b in boxes)
    x2 = max(b[2] for b in boxes); y2 = max(b[3] for b in boxes)
    ctype = 'single' if kind == 'single' else _crash_type(sel[0], sel[1], f)
    return dict(
        crash_frame=f, crash_time_s=round(f / MODEL_FPS, 2), kind=kind, car_ids=[int(c) for c in ids],
        score=round(float(score), 2), crash_type=ctype,
        x_px=round((x1 + x2) / 2, 1), y_px=round((y1 + y2) / 2, 1),
        box_px=[round(v, 1) for v in (x1, y1, x2, y2)],
        x_m_carla=round(float(np.mean([_val(c, f, 'x_m') for c in sel])), 1),
        y_m_carla=round(float(np.mean([_val(c, f, 'y_m') for c in sel])), 1))


# ----------------------------------------------------------------------------------------------
def analyze_video(video, out_dir=None, save_video=True, log=print):
    """Run the whole AI on one video. Returns a dict, and writes into out_dir:
         <name>_alerts.json, <name>_probability.csv, <name>_crash.jpg (if crash), <name>_result.mp4
    """
    cfg, rf = load_models()
    name = os.path.splitext(os.path.basename(video))[0]
    out_dir = out_dir or os.path.dirname(os.path.abspath(video))
    os.makedirs(out_dir, exist_ok=True)
    base = os.path.join(out_dir, name)

    log("1/4 reading the video...")
    frames, src_fps = read_frames(video)
    log("    %d frames (%.1f s), original speed %.0f fps" % (len(frames), len(frames) / MODEL_FPS, src_fps))
    log("2/4 finding and tracking cars (YOLO)...")
    det = detect(frames, name, log)
    result = dict(video=os.path.basename(video), threshold=cfg['threshold'], duration_s=len(frames) / MODEL_FPS,
                  accident_detected=False, first_alert_s=None, crash_time_s=None, crash_type=None,
                  place=None, alert_moments_s=[], files={})
    if det.empty:
        log("no cars found in this video")
        return result
    log("3/4 features...")
    tracks, ff = features(det, out_dir, cfg.get('still_fix', False))
    for f in cfg['features']:
        if f not in ff:
            ff[f] = 0.0
    log("4/4 accident model...")
    p = rf.predict_proba(ff[cfg['features']].values)[:, 1]
    ff['prob'] = pd.Series(p).rolling(cfg['smooth_frames'], min_periods=1).mean().values
    th = cfg['threshold']
    ff['alert'] = (ff.prob > th).astype(int)
    alerts = ff[ff.alert == 1]
    result['alert_moments_s'] = [round(float(t), 2) for t in alerts.t.values[::10]]

    crash = None
    if len(alerts):
        result['accident_detected'] = True
        alert_frame = int(alerts.frame.iloc[0])
        result['first_alert_s'] = round(float(alerts.t.iloc[0]), 2)
        crash = locate_crash(tracks, alert_frame, len(frames))
        if crash:
            result['crash_time_s'] = crash['crash_time_s']
            result['crash_type'] = crash['crash_type']
            result['place'] = {k: crash[k] for k in ('x_px', 'y_px', 'box_px', 'x_m_carla', 'y_m_carla',
                                                     'kind', 'car_ids', 'score')}
            result['place']['note'] = "x_m/y_m are map metres for the CARLA camera only"
            img = frames[crash['crash_frame']].copy()
            b = [int(v) for v in crash['box_px']]
            cv2.rectangle(img, (b[0] - 8, b[1] - 8), (b[2] + 8, b[3] + 8), (0, 0, 255), 2)
            cv2.imwrite(base + '_crash.jpg', img)
            result['files']['crash_frame'] = base + '_crash.jpg'

    json.dump(result, open(base + '_alerts.json', 'w'), indent=1)
    ff[['frame', 't', 'n_cars', 'prob', 'alert']].to_csv(base + '_probability.csv', index=False)
    result['files']['alerts'] = base + '_alerts.json'
    result['files']['probability'] = base + '_probability.csv'

    if save_video:
        out = cv2.VideoWriter(base + '_result.mp4', cv2.VideoWriter_fourcc(*'mp4v'), MODEL_FPS, (W, H))
        by_f = dict(tuple(tracks.groupby('frame_number')))
        prob = dict(zip(ff.frame, ff.prob))
        crashed = set(crash['car_ids']) if crash else set()
        for f, img in enumerate(frames):
            img = img.copy()
            for _, c in by_f.get(f, pd.DataFrame()).iterrows():
                red = crash is not None and f >= crash['crash_frame'] and int(c.car_id) in crashed
                cv2.rectangle(img, (int(c.box_left_px), int(c.box_top_px)), (int(c.box_right_px), int(c.box_bottom_px)),
                              (0, 0, 255) if red else (0, 255, 0), 2 if red else 1)
            pr = prob.get(f, 0.0)
            cv2.rectangle(img, (10, 10), (10 + int(200 * pr), 26), (0, 0, 255) if pr > th else (0, 200, 255), -1)
            cv2.rectangle(img, (10, 10), (210, 26), (255, 255, 255), 1)
            cv2.putText(img, "crash prob %.2f" % pr, (218, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
            if result['first_alert_s'] is not None and f >= int(alerts.frame.iloc[0]):
                cv2.rectangle(img, (0, H - 40), (W, H), (0, 0, 200), -1)
                txt = "ACCIDENT ALERT at %.1f s" % result['first_alert_s']
                if crash:
                    txt += "  |  crash ~%.1f s  |  %s" % (crash['crash_time_s'], crash['crash_type'])
                cv2.putText(img, txt, (10, H - 12), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
            out.write(img)
        out.release()
        result['files']['video'] = base + '_result.mp4'

    log("\nRESULT: " + json.dumps(result, indent=1))
    return result


if __name__ == '__main__':
    analyze_video(sys.argv[1])
