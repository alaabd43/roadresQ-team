# preprocess.py - RoadResQ: clean the YOLO / RT-DETR tracking table and build the features
# the accident model (Random Forest) learns from.
#
#   py -3.13 preprocess.py final_dataset.csv out
#
# All model features are measured in CAR LENGTHS (the car's own box is the ruler), not metres,
# so the same model can run on any camera (CARLA or a real traffic camera).
# All features use only the PAST (now, 1 s ago, 2 s ago), so the model can run live on a video.
#
# Output in "out":
#   clean_tracks.csv     one row = one car in one frame, cleaned
#   frame_features.csv   one row = one frame: the model input (+ label, recording, fold)
#   folds.csv            recording -> fold 0..4 for 5-fold cross-validation (whole recordings)
#   report.txt           what was removed and why
#   road_map.npy         where the road is in the picture (learned from moving cars)

import math
import os
import sys

import numpy as np
import pandas as pd

FPS = 20
IMG_W, IMG_H, FOV = 800, 600, 90.0
MIN_TRACK = 10            # tracks shorter than 0.5 s = flicker
N_FOLDS = 5

# Recordings we agreed to remove
NIGHT_RAIN = 'night_rain'                    # detector too weak (finds ~29% of cars)
CRASH_NOT_SEEN = [                           # detector hardly saw the crash cars (checked with vehicles.csv)
    'A2_s3_rain', 'A2_s4_night', 'A2_s6_sunset', 'A3_s4_night', 'A3_s6_sunset', 'A3_s8_fog',
    'A4_s10_night_fog', 'A4_s3_rain', 'A5_s10_night_fog', 'A5_s2_dawn', 'A5_s3_rain',
    'A5_s6_sunset', 'A5_s7_wet', 'A5_s8_fog']
# H3_s3_rain and N3_s7_wet: the detector finds nothing after ~16 s -> only the frames with
# detections are used (automatic: frames are taken from the first to the last detection).

# Fixed CARLA camera - only used for x_m / y_m (map position for the website), NOT for model features
CAM = np.array([-68.2, 41.2, 32.6])
PITCH, YAW = math.radians(-45.0), math.radians(-44.3)
F = np.array([math.cos(PITCH) * math.cos(YAW), math.cos(PITCH) * math.sin(YAW), math.sin(PITCH)])
R = np.array([math.cos(YAW + math.pi / 2), math.sin(YAW + math.pi / 2), 0.0])
U = np.cross(R, F)
if U[2] < 0:
    U = -U
FOCAL = IMG_W / (2 * math.tan(math.radians(FOV) / 2))


def pixel_to_ground(u, v, z=0.78):
    du = (np.asarray(u) - IMG_W / 2) / FOCAL
    dv = -(np.asarray(v) - IMG_H / 2) / FOCAL
    d = F[None, :] + du[:, None] * R[None, :] + dv[:, None] * U[None, :]
    t = (z - CAM[2]) / d[:, 2]
    p = CAM[None, :] + t[:, None] * d
    return p[:, 0], p[:, 1]


def say(rep, msg):
    print(msg)
    rep.append(msg)


MAX_LINK_GAP = 15        # a car may disappear up to 0.75 s and keep its id
MAX_FILL_GAP = 10        # holes up to 0.5 s inside a track are filled in
STILL_FIX = False        # True = a box that moved < 0.1 car length in 1 s counts as still (tested: no gain, v3 = off)


def link_tracks(df):
    """When the tracker loses a car and gives it a NEW id a moment later at the place where the
    car should be, give it its old id back."""
    out, links = [], 0
    for rec, d in df.groupby('recording', sort=False):
        d = d.sort_values('frame_number')
        info = {}
        for cid, t in d.groupby('car_id'):
            tail = t.tail(5)
            span = max(1, tail.frame_number.iloc[-1] - tail.frame_number.iloc[0])
            info[cid] = dict(
                start=t.frame_number.iloc[0], end=t.frame_number.iloc[-1],
                p0=(t.box_center_x_px.iloc[0], t.box_center_y_px.iloc[0]),
                p1=(t.box_center_x_px.iloc[-1], t.box_center_y_px.iloc[-1]),
                vel=((tail.box_center_x_px.iloc[-1] - tail.box_center_x_px.iloc[0]) / span,
                     (tail.box_center_y_px.iloc[-1] - tail.box_center_y_px.iloc[0]) / span),
                size=float(np.maximum(t.box_width_px, t.box_height_px).median()))
        parent = {c: c for c in info}

        def root(c):
            while parent[c] != c:
                c = parent[c]
            return c
        used = set()
        for b in sorted(info, key=lambda c: info[c]['start']):
            B = info[b]
            best = None
            for a, A in info.items():
                if a == b or a in used or not (A['end'] < B['start'] <= A['end'] + MAX_LINK_GAP):
                    continue
                gap = B['start'] - A['end']
                px = A['p1'][0] + A['vel'][0] * gap
                py = A['p1'][1] + A['vel'][1] * gap
                dist = math.hypot(B['p0'][0] - px, B['p0'][1] - py)
                if dist < 1.2 * max(A['size'], 8) and (best is None or dist < best[0]):
                    best = (dist, a)
            if best:
                used.add(best[1])
                parent[b] = best[1]
                links += 1
        d = d.copy()
        d['car_id'] = d.car_id.map(lambda c: root(c))
        out.append(d.drop_duplicates(['frame_number', 'car_id']))
    return pd.concat(out), links


def fill_gaps(df):
    """Fill short holes inside a track by straight-line interpolation of the box."""
    box = ['box_left_px', 'box_top_px', 'box_right_px', 'box_bottom_px', 'box_center_x_px',
           'box_center_y_px', 'box_width_px', 'box_height_px', 'confidence']
    const = [c for c in df.columns if c not in box + ['frame_number', 'time_s', 'label', 'car_id']]
    frame_label = df.groupby(['recording', 'frame_number']).label.max()
    out = []
    for (rec, cid), t in df.groupby(['recording', 'car_id'], sort=False):
        t = t.set_index('frame_number').sort_index()
        full = range(t.index.min(), t.index.max() + 1)
        if len(full) == len(t):
            out.append(t.reset_index())
            continue
        t = t.reindex(full)
        hole = t.confidence.isna()
        run = (hole != hole.shift()).cumsum()
        run_len = hole.groupby(run).transform('size')
        t[box] = t[box].interpolate()
        t = t[~hole | (run_len <= MAX_FILL_GAP)].copy()
        t['filled'] = hole[t.index].astype(int)
        t[const] = t[const].ffill()
        t['car_id'] = cid
        t.index.name = 'frame_number'
        t = t.reset_index()
        cs, ce = t.collision_start_carla_frame.iloc[0], t.collision_end_carla_frame.iloc[0]
        t['label'] = [int(frame_label.get((rec, f), int(pd.notna(cs) and cs <= f <= ce + 40)))
                      for f in t.frame_number]
        out.append(t)
    df = pd.concat(out, ignore_index=True)
    df['filled'] = df.get('filled', 0)
    df['filled'] = df.filled.fillna(0).astype(int)
    df['time_s'] = df.time_s.fillna(0)
    return df



DUP_IOU = float(os.environ.get("DUP_IOU", 0.70))        # two boxes this similar in the same frame = the detector boxed ONE car twice
DUP_FRAMES = int(os.environ.get("DUP_FRAMES", 6))       # ... for at least 0.5 s
def remove_duplicates(df):
    """Drop the second box when the detector gives one car two ids (two boxes almost on top of each other)."""
    drop = []
    n_pairs = 0
    cols = ['frame_number', 'car_id', 'box_left_px', 'box_top_px', 'box_right_px', 'box_bottom_px']
    for rec, d in df.groupby('recording'):
        size = d.groupby('car_id').size()
        m = d[cols].merge(d[cols], on='frame_number', suffixes=('_a', '_b'))
        m = m[m.car_id_a < m.car_id_b]
        if m.empty:
            continue
        iw = (np.minimum(m.box_right_px_a, m.box_right_px_b) - np.maximum(m.box_left_px_a, m.box_left_px_b)).clip(lower=0)
        ih = (np.minimum(m.box_bottom_px_a, m.box_bottom_px_b) - np.maximum(m.box_top_px_a, m.box_top_px_b)).clip(lower=0)
        inter = iw * ih
        area_a = (m.box_right_px_a - m.box_left_px_a) * (m.box_bottom_px_a - m.box_top_px_a)
        area_b = (m.box_right_px_b - m.box_left_px_b) * (m.box_bottom_px_b - m.box_top_px_b)
        m['iou'] = inter / (area_a + area_b - inter).clip(lower=1e-6)
        hi = m[m.iou > DUP_IOU].groupby(['car_id_a', 'car_id_b']).size()
        for (a, b), cnt in hi[hi >= DUP_FRAMES].items():
            n_pairs += 1
            loser = a if size[a] < size[b] else b
            fr = m[(m.car_id_a == a) & (m.car_id_b == b) & (m.iou > 0.6)].frame_number
            drop.append(pd.DataFrame({'recording': rec, 'car_id': loser, 'frame_number': fr.values}))
    if not drop:
        return df, 0, 0
    dr = pd.concat(drop).drop_duplicates()
    key = df.set_index(['recording', 'car_id', 'frame_number']).index
    bad = key.isin(pd.MultiIndex.from_frame(dr[['recording', 'car_id', 'frame_number']]))
    return df[~bad].copy(), n_pairs, int(bad.sum())

def clean(df, rep, out):
    df['type'] = df.recording.str.split('_').str[0]
    df['weather'] = df.recording.str.split('_', n=2).str[2]
    n_rec = df.recording.nunique()

    nr = sorted(df[df.weather == NIGHT_RAIN].recording.unique())
    say(rep, "removed night+rain recordings (%d): %s" % (len(nr), nr))
    cn = sorted(set(CRASH_NOT_SEEN) & set(df.recording))
    say(rep, "removed crash recordings where the detector did not see the crash cars (%d): %s" % (len(cn), cn))
    df = df[~df.recording.isin(nr + cn)].copy()
    say(rep, "recordings: %d -> %d" % (n_rec, df.recording.nunique()))

    n = len(df)
    df = df.dropna(subset=['car_id']).drop_duplicates(['recording', 'frame_number', 'car_id'])
    df['car_id'] = df.car_id.astype(int)
    say(rep, "rows without car id / duplicated removed: %d" % (n - len(df)))

    df, n_links = link_tracks(df)
    say(rep, "broken tracks joined back together (same car got a new id): %d" % n_links)
    n = len(df)
    df = fill_gaps(df)
    say(rep, "missing frames filled inside tracks (car lost for <= 0.5 s): %d rows added" % (len(df) - n))
    df, n_dup, n_rows = remove_duplicates(df)
    say(rep, "duplicate boxes on the same car removed: %d pairs, %d rows" % (n_dup, n_rows))

    n = len(df)
    df = df[df.groupby(['recording', 'car_id']).frame_number.transform('size') >= MIN_TRACK].copy()
    say(rep, "rows in tracks shorter than %d frames (flicker) removed: %d" % (MIN_TRACK, n - len(df)))

    # road map = every place a MOVING car was seen; a box that never moves AND is off the road
    # is a window / tree / roof. A still box ON the road is kept (car waiting at the light).
    g = df.groupby(['recording', 'car_id'])
    df['moved_px'] = (g.box_center_x_px.transform(lambda s: s.max() - s.min()) +
                      g.box_center_y_px.transform(lambda s: s.max() - s.min()))
    cell = 8
    # one road map per CAMERA: our CARLA recordings share one camera; every other video has its own
    df['camera_key'] = np.where(df.recording.str.startswith('SIM-'), df.recording, 'roadresq_camera')
    df['on_road'] = False
    for cam, idx in df.groupby('camera_key').groups.items():
        d = df.loc[idx]
        road = np.zeros((IMG_H // cell + 1, IMG_W // cell + 1), bool)
        mv = d[d.moved_px > 40]
        road[(mv.box_center_y_px // cell).astype(int).clip(0, IMG_H // cell),
             (mv.box_center_x_px // cell).astype(int).clip(0, IMG_W // cell)] = True
        for _ in range(2):
            r2 = road.copy()
            r2[1:, :] |= road[:-1, :]; r2[:-1, :] |= road[1:, :]
            r2[:, 1:] |= road[:, :-1]; r2[:, :-1] |= road[:, 1:]
            road = r2
        if cam == 'roadresq_camera':
            np.save(os.path.join(out, 'road_map.npy'), road)
        df.loc[idx, 'on_road'] = road[(d.box_center_y_px // cell).astype(int).clip(0, IMG_H // cell),
                                      (d.box_center_x_px // cell).astype(int).clip(0, IMG_W // cell)]
    on_share = df.groupby(['recording', 'car_id']).on_road.transform('mean')
    fake = (df.moved_px < 8) & (on_share < 0.5)
    say(rep, "still boxes off the road removed (windows, trees): %d rows in %d tracks"
        % (fake.sum(), df[fake].groupby(['recording', 'car_id']).ngroups))
    df = df[~fake].copy()

    df['detector'] = df.model
    return df.drop(columns=['object', 'yolo_guess', 'stable_class', 'scenario', 'model', 'carla_frame_number',
                            'camera_key'])


def track_features(df):
    """Per car: smoothed box, its size (= 1 car length), speed and acceleration in car lengths."""
    df = df.sort_values(['recording', 'car_id', 'frame_number']).reset_index(drop=True)
    key = ['recording', 'car_id']
    roll = lambda s, w: s.rolling(w, min_periods=1).median()        # past only
    for c in ['box_center_x_px', 'box_center_y_px']:
        df[c + '_s'] = df.groupby(key)[c].transform(lambda s: roll(s, 5))
    df['car_len_px'] = df.groupby(key).apply(
        lambda d: np.maximum(d.box_width_px, d.box_height_px).rolling(15, min_periods=1).median()
    ).reset_index(level=[0, 1], drop=True).clip(lower=6)
    g = df.groupby(key)
    dt = g.frame_number.diff() / FPS
    step = np.hypot(g.box_center_x_px_s.diff(), g.box_center_y_px_s.diff()) / df.car_len_px
    df['speed_cl'] = (step / dt).where(dt <= 0.25)
    df['speed_cl'] = df.groupby(key).speed_cl.transform(
        lambda s: s.rolling(7, min_periods=1).mean().bfill()).fillna(0).clip(0, 10)
    # jolt = how much the speed changed in the last 0.5 s (a crash = a sudden stop or a sudden push)
    df['jolt'] = 0.0      # computed after the still-car fix (below)
    g = df.groupby(key)
    back = lambda c: g[c].shift(FPS).fillna(g[c].transform('first'))
    moved_1s = np.hypot(df.box_center_x_px_s - back('box_center_x_px_s'),
                        df.box_center_y_px_s - back('box_center_y_px_s')) / df.car_len_px
    df['still'] = (moved_1s < 0.1).astype(int)
    if STILL_FIX:
        df.loc[df.still == 1, 'speed_cl'] = 0.0
    df['accel_cl'] = (df.groupby(key).speed_cl.diff(5) / (5 / FPS)).fillna(0).clip(-10, 10)
    # box suddenly much bigger than 0.5 s ago = two touching cars became one box
    area = df.box_width_px * df.box_height_px
    df['area_jump'] = (area / area.groupby([df.recording, df.car_id]).shift(10)).fillna(1).clip(0, 5)
    df['jolt'] = (df.speed_cl - df.groupby(key).speed_cl.shift(10)).abs().fillna(0)
    df['speed_cl_1s_ago'] = df.groupby(key).speed_cl.shift(20)
    df['speed_cl_max_2s'] = df.groupby(key).speed_cl.transform(lambda s: s.rolling(40, min_periods=1).max())
    # sudden stop: was moving clearly (> 1.6 car lengths/s ~ 6 m/s) 1 s ago, now almost still
    df['sudden_stop'] = ((df.speed_cl_1s_ago > 1.6) & (df.speed_cl < 0.15)).astype(int)
    df['x_m'], df['y_m'] = pixel_to_ground(df.box_center_x_px_s.values, df.box_center_y_px_s.values)
    return df


def frame_features(df):
    rows = []
    life = df.groupby(['recording', 'car_id']).frame_number.agg(['min', 'max'])
    for rec, d in df.groupby('recording'):
        info = d.iloc[0]
        f0, f1 = int(d.frame_number.min()), int(d.frame_number.max())
        lab = d.groupby('frame_number').label.max()
        cs, ce = info.collision_start_carla_frame, info.collision_end_carla_frame
        lf = life.loc[rec]
        byf = dict(tuple(d.groupby('frame_number')))
        pos = {f: dict(zip(x.car_id.values, zip(x.box_center_x_px_s.values, x.box_center_y_px_s.values)))
               for f, x in byf.items()}
        boxes_f = {f: x[['car_id', 'box_left_px', 'box_top_px', 'box_right_px', 'box_bottom_px']].values
                   for f, x in byf.items()}
        for f in range(f0, f1 + 1):
            r = dict(recording=rec, frame=f, t=round((f - f0) / FPS, 2), type=info.type,
                     weather=info.weather, detector=info.detector, label=int(lab.get(f, 0)),
                     in_contact=int(pd.notna(cs) and cs <= f <= ce))
            x = byf.get(f)
            if x is None:
                r['n_cars'] = 0
                rows.append(r)
                continue
            v, a, L = x.speed_cl.values, x.accel_cl.values, x.car_len_px.values
            cx, cy = x.box_center_x_px_s.values, x.box_center_y_px_s.values
            r.update(max_jolt=x.jolt.max(), n_jolt=int((x.jolt > 0.8).sum()))
            r.update(n_cars=len(x), mean_speed=v.mean(), max_speed=v.max(), speed_std=v.std(),
                     min_accel=a.min(), n_hard_brake=int((a < -1.0).sum()),
                     n_stopped=int((v < 0.15).sum()), n_sudden_stop=int(x.sudden_stop.sum()),
                     mean_conf=x.confidence.mean())
            if len(x) > 1:
                pd_ = np.hypot(cx[:, None] - cx[None], cy[:, None] - cy[None])
                pd_ = pd_ / ((L[:, None] + L[None]) / 2)                     # in car lengths
                np.fill_diagonal(pd_, np.inf)
                i, j = np.unravel_index(np.argmin(pd_), pd_.shape)
                r['min_dist_cl'] = pd_[i, j]
                r['pair_speed_diff'] = abs(v[i] - v[j])
                r['pair_min_accel'] = min(a[i], a[j])
                l, t = x.box_left_px.values, x.box_top_px.values
                rr, b = x.box_right_px.values, x.box_bottom_px.values
                iw = np.clip(np.minimum(rr[:, None], rr[None]) - np.maximum(l[:, None], l[None]), 0, None)
                ih = np.clip(np.minimum(b[:, None], b[None]) - np.maximum(t[:, None], t[None]), 0, None)
                inter = iw * ih
                area = (rr - l) * (b - t)
                iou = inter / (area[:, None] + area[None] - inter + 1e-6)
                np.fill_diagonal(iou, 0)
                r['max_iou'] = iou.max()
                r['n_overlap'] = int((iou > 0.05).sum() // 2)
                # ---- every PAIR of cars: how fast are THESE two getting closer? ----
                ids_ = x.car_id.values
                old = pos.get(f - 10, {})                      # the same two cars 0.5 s ago
                vmax2 = x.speed_cl_max_2s.values
                best = None
                for a_ in range(len(x)):
                    for b_ in range(a_ + 1, len(x)):
                        dist = pd_[a_, b_]
                        pa, pb = old.get(ids_[a_]), old.get(ids_[b_])
                        if pa is not None and pb is not None:
                            d_old = math.hypot(pa[0] - pb[0], pa[1] - pb[1]) / ((L[a_] + L[b_]) / 2)
                            closing = (d_old - dist) / 0.5          # car lengths per second
                        else:
                            closing = 0.0
                        ttc = dist / closing if closing > 0.05 else 10.0
                        moving_before = max(vmax2[a_], vmax2[b_])
                        danger = (min(ttc, 10.0), dist)      # most urgent pair; if none closing: the closest
                        if best is None or danger < best[0]:
                            best = (danger, dist, closing, ttc, iou[a_, b_], moving_before, min(a[a_], a[b_]))
                _, r['pair_dist'], r['pair_closing'], r['pair_ttc'], r['pair_iou'], \
                    r['pair_speed_before'], r['pair_brake'] = best
                # overlap of boxes where one of the two cars was moving in the last 2 s
                # (a queue at the light: boxes touch but nobody was moving)
                mv2 = (vmax2[:, None] > 1.0) | (vmax2[None] > 1.0)
                r['moving_iou'] = (iou * mv2).max()
                # two cars touching (closer than 1.5 car lengths) and one of them had a jolt
                jo = x.jolt.values
                close = pd_ < 1.5
                jj = np.maximum(jo[:, None], jo[None])
                r['close_jolt'] = (jj * close).max()
            ids = x.car_id.values
            mid = (x.box_center_x_px.between(40, IMG_W - 40) & x.box_center_y_px.between(40, IMG_H - 40)).values
            r['n_lost'] = int(sum(1 for k, m in zip(ids, mid) if m and lf.loc[k, 'max'] == f and f < f1))
            # merge: a car that ends here, and a box in the next frame covers where it was
            n_merge = 0
            nxt = boxes_f.get(f + 1)
            if nxt is not None:
                for row in boxes_f[f]:
                    if lf.loc[row[0], 'max'] != f or f >= f1:
                        continue
                    l0, t0, r0, b0 = row[1:]
                    for o in nxt:
                        if o[0] == row[0]:
                            continue
                        iw = max(0, min(r0, o[3]) - max(l0, o[1]))
                        ih = max(0, min(b0, o[4]) - max(t0, o[2]))
                        inter = iw * ih
                        if inter / ((r0 - l0) * (b0 - t0) + 1e-6) > 0.3:
                            n_merge += 1
                            break
            r['n_merge'] = n_merge
            r['max_area_jump'] = float(x.area_jump.max())
            r['n_new'] = int(sum(1 for k, m in zip(ids, mid) if m and lf.loc[k, 'min'] == f and f > f0))
            rows.append(r)
    ff = pd.DataFrame(rows)
    zero = ['mean_speed', 'max_speed', 'speed_std', 'min_accel', 'n_hard_brake', 'n_stopped',
            'n_sudden_stop', 'mean_conf', 'pair_speed_diff', 'pair_min_accel', 'max_iou', 'n_overlap',
            'n_lost', 'n_new', 'pair_closing', 'pair_iou', 'pair_speed_before', 'pair_brake', 'moving_iou',
            'max_jolt', 'n_jolt', 'close_jolt', 'n_merge']
    ff[zero] = ff[zero].fillna(0)
    ff['max_area_jump'] = ff.max_area_jump.fillna(1)
    ff['pair_dist'] = ff.pair_dist.fillna(20).clip(0, 20)
    ff['pair_ttc'] = ff.pair_ttc.fillna(10).clip(0, 10)
    ff['min_dist_cl'] = ff.min_dist_cl.fillna(20).clip(0, 20)        # one car or none = far away
    return ff


def history_features(ff):
    """What happened in the last 1-2 seconds (past only, like a live camera)."""
    g = ff.groupby('recording')
    s1, s2 = FPS, 2 * FPS
    ff['min_dist_1s_ago'] = g.min_dist_cl.shift(s1)
    ff['min_dist_2s_ago'] = g.min_dist_cl.shift(s2)
    ff['dist_change_1s'] = ff.min_dist_cl - ff.min_dist_1s_ago            # negative = getting closer
    ff['dist_change_2s'] = ff.min_dist_cl - ff.min_dist_2s_ago
    # closing speed of the closest pair (car lengths per second) and time to collision
    ff['closing_cl'] = -(g.min_dist_cl.diff(5) / (5 / FPS))
    ff['ttc_s'] = np.where(ff.closing_cl > 0.05, ff.min_dist_cl / ff.closing_cl, 10.0)
    ff['ttc_s'] = ff.ttc_s.clip(0, 10)
    roll = lambda col, w, how: g[col].transform(lambda s: getattr(s.rolling(w, min_periods=1), how)())
    ff['min_ttc_2s'] = roll('ttc_s', s2, 'min')
    ff['min_dist_min_2s'] = roll('min_dist_cl', s2, 'min')
    ff['hardest_brake_2s'] = roll('min_accel', s2, 'min')
    ff['hard_brakes_2s'] = roll('n_hard_brake', s2, 'max')
    ff['sudden_stops_2s'] = roll('n_sudden_stop', s2, 'max')
    ff['max_iou_1s'] = roll('max_iou', s1, 'max')
    ff['iou_change_1s'] = ff.max_iou - g.max_iou.shift(s1)
    ff['lost_1s'] = roll('n_lost', s1, 'sum')
    ff['new_1s'] = roll('n_new', s1, 'sum')
    ff['max_speed_drop_1s'] = roll('max_speed', s1, 'max') - ff.max_speed
    ff['cars_change_1s'] = ff.n_cars - g.n_cars.shift(s1)
    ff['stopped_change_1s'] = ff.n_stopped - g.n_stopped.shift(s1)
    # "was moving fast just before" - separates a queue at the light from a crash
    ff['max_speed_2s_ago'] = g.max_speed.shift(s2)
    ff['pair_ttc_min_2s'] = roll('pair_ttc', s2, 'min')
    ff['pair_closing_max_1s'] = roll('pair_closing', s1, 'max')
    ff['moving_iou_max_1s'] = roll('moving_iou', s1, 'max')
    ff['max_jolt_1s'] = roll('max_jolt', s1, 'max')
    ff['close_jolt_1s'] = roll('close_jolt', s1, 'max')
    ff['merge_1s'] = roll('n_merge', s1, 'sum')
    ff['area_jump_1s'] = roll('max_area_jump', s1, 'max')
    hist = ['min_dist_1s_ago', 'min_dist_2s_ago', 'dist_change_1s', 'dist_change_2s', 'closing_cl',
            'iou_change_1s', 'cars_change_1s', 'stopped_change_1s', 'max_speed_2s_ago']
    # start of a recording: no past yet -> "nothing changed"
    ff['min_dist_1s_ago'] = ff.min_dist_1s_ago.fillna(ff.min_dist_cl)
    ff['min_dist_2s_ago'] = ff.min_dist_2s_ago.fillna(ff.min_dist_cl)
    ff['max_speed_2s_ago'] = ff.max_speed_2s_ago.fillna(ff.max_speed)
    ff[hist] = ff[hist].fillna(0)
    return ff


def make_folds(ff, rep):
    """5 folds of WHOLE recordings; every fold gets recordings of every type."""
    recs = ff.groupby('recording').type.first().reset_index()
    rng = np.random.RandomState(42)
    fold = {}
    start = 0
    for t, d in recs.groupby('type'):
        names = list(d.recording)
        rng.shuffle(names)
        for i, r in enumerate(names):
            fold[r] = (start + i) % N_FOLDS
        start += len(names)              # rotate so folds stay the same size
    fd = recs.assign(fold=recs.recording.map(fold))
    say(rep, "folds (recordings per fold): %s" % fd.fold.value_counts().sort_index().to_dict())
    say(rep, "crash recordings per fold: %s" %
        fd[fd.type.str.startswith('A')].fold.value_counts().sort_index().to_dict())
    return fd


FEATURES = ['n_cars', 'mean_speed', 'max_speed', 'speed_std', 'min_accel', 'n_hard_brake', 'n_stopped',
            'n_sudden_stop', 'mean_conf', 'min_dist_cl', 'pair_speed_diff', 'pair_min_accel', 'max_iou',
            'n_overlap', 'n_lost', 'n_new', 'min_dist_1s_ago', 'min_dist_2s_ago', 'dist_change_1s',
            'dist_change_2s', 'closing_cl', 'ttc_s', 'min_ttc_2s', 'min_dist_min_2s', 'hardest_brake_2s',
            'hard_brakes_2s', 'sudden_stops_2s', 'max_iou_1s', 'iou_change_1s', 'lost_1s', 'new_1s',
            'max_speed_drop_1s', 'cars_change_1s', 'stopped_change_1s', 'max_speed_2s_ago',
            'pair_dist', 'pair_closing', 'pair_ttc', 'pair_iou', 'pair_speed_before', 'pair_brake',
            'moving_iou', 'pair_ttc_min_2s', 'pair_closing_max_1s', 'moving_iou_max_1s',
            'max_jolt', 'n_jolt', 'close_jolt', 'max_jolt_1s', 'close_jolt_1s',
            'n_merge', 'merge_1s', 'max_area_jump', 'area_jump_1s']


def main(src, out):
    os.makedirs(out, exist_ok=True)
    rep = []
    df = pd.read_csv(src)
    say(rep, "input: %d rows, %d recordings" % (len(df), df.recording.nunique()))
    df = clean(df, rep, out)
    df = track_features(df)
    df.to_csv(os.path.join(out, 'clean_tracks.csv'), index=False)
    say(rep, "clean rows: %d, tracks: %d" % (len(df), df.groupby(['recording', 'car_id']).ngroups))
    ff = history_features(frame_features(df))
    fd = make_folds(ff, rep)
    ff = ff.merge(fd[['recording', 'fold']], on='recording')
    ff.to_csv(os.path.join(out, 'frame_features.csv'), index=False)
    fd.to_csv(os.path.join(out, 'folds.csv'), index=False)
    say(rep, "frames: %d, crash frames: %d (%.1f%%), features for the model: %d"
        % (len(ff), ff.label.sum(), 100 * ff.label.mean(), len(FEATURES)))
    say(rep, "recordings per type: %s" % ff.groupby('type').recording.nunique().to_dict())
    with open(os.path.join(out, 'report.txt'), 'w') as f:
        f.write('\n'.join(rep) + '\n')
        f.write('\nmodel features (do NOT give the model weather / detector / type):\n')
        f.write(', '.join(FEATURES) + '\n')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
