# roadresq_system.py - RoadResQ AI system (final version)
#
#   video -> 1. YOLO26 + ByteTrack            (the eye: every vehicle, every frame)
#         -> 2. physics rule                  (suspect moments: boxes touch + sudden change / car stops hard)
#         -> 3. Qwen3-VL (vision-language)    (the brain: looks at zoomed frames -> collision? evidence? type?)
#         -> 4. alert level + severity + suggested units + kroki data
#
# Alert levels
#   "confirmed" : Qwen saw visual evidence (damage, debris, pushed/spun, overturned, smoke/fire, off road) -> alert now
#   "review"    : the physics rule is suspicious but Qwen saw no clear evidence -> operator checks a short clip
#
# Use from the backend:
#     from roadresq_system import load_models, analyze_video
#     load_models()                                   # once at server start
#     result = analyze_video("cam01.mp4", out_dir="media/incidents/7")
#
# Without a GPU (or ROADRESQ_NO_VLM=1) Qwen is skipped: every suspect becomes "review" (demo mode).
# To switch to the bigger brain later: change VLM_MODEL below (e.g. "Qwen/Qwen3-VL-32B-Instruct").

import json
import os
import re
import sys

import cv2
import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import roadresq_ai as R  # noqa: E402  (YOLO, tracking, features, physics rule)

VLM_MODEL = os.environ.get("ROADRESQ_VLM", "Qwen/Qwen3-VL-8B-Instruct")
USE_VLM = os.environ.get("ROADRESQ_NO_VLM", "0") != "1"
SUSPECT_MIN = 0.65          # physics score (0..1) needed to become a suspect
CONF_MIN = 70               # Qwen confidence needed
MERGE_S = 60                # alarms closer than this (same camera) = the same incident
EVIDENCE = {"damage", "debris", "pushed_or_spun", "overturned", "smoke_or_fire", "off_road"}

PROMPT = """The FIRST image is the full view of a fixed traffic CCTV camera; the suspect area is marked with a red rectangle.
The other images are ZOOMED frames of that area in time order; the time is written on each frame.
The vehicles to watch are marked with thin colored boxes and numbers (from our tracker).
{hint}Question: in the zoomed frames, does a real collision happen? (a vehicle hits another vehicle,
a motorcycle, a pedestrian, a bin/barrier/curb/pole/any object, or overturns).
Decide ONLY from what you can SEE in the images. Vehicles that are only close to each other, overlapping because of
the camera angle, waiting in a queue, braking normally, passing, or parked are NOT a collision.
List the visual evidence you actually see (empty list if none):
"damage" (dented/broken vehicle), "debris" (parts on the road), "pushed_or_spun" (a vehicle is shoved sideways or spins),
"overturned", "smoke_or_fire", "off_road" (a vehicle leaves the road/hits the curb).
Answer ONLY with JSON:
{{"collision": true or false, "confidence": 0-100, "evidence": [..], "time_s": moment of impact or null,
 "type": "rear-end" | "head-on" | "t-bone" | "sideswipe" | "single" | "none", "vehicles": number,
 "pedestrian_hit": true or false, "reason": "few words, your own"}}"""
NEG = re.compile(r"\b(no (contact|collision|impact|crash)|without (contact|hitting|collision|impact)|"
                 r"did not (hit|collide|touch)|does not (hit|collide|touch)|pass(es|ing)? (safely|close|by))", re.I)
COLORS = [(0, 255, 255), (255, 0, 255), (255, 255, 0)]

_vlm = {}


# ------------------------------------------------------------------------------------------- loading
def load_models():
    """Load Qwen once (about 17 GB on GPU for the 8B model). YOLO loads per video (small)."""
    global USE_VLM
    if not USE_VLM or "model" in _vlm:
        return
    try:
        import torch
        from transformers import AutoProcessor, Qwen3VLForConditionalGeneration
        if not torch.cuda.is_available():
            print("no GPU -> demo mode (no Qwen, all suspects go to operator review)")
            USE_VLM = False
            return
        _vlm["torch"] = torch
        _vlm["proc"] = AutoProcessor.from_pretrained(VLM_MODEL)
        _vlm["model"] = Qwen3VLForConditionalGeneration.from_pretrained(
            VLM_MODEL, torch_dtype=torch.float16, device_map="auto").eval()
    except Exception as e:  # keep the server alive
        print("could not load Qwen (%s) -> demo mode" % e)
        USE_VLM = False


# ------------------------------------------------------------------------------------------- step 2
def find_suspects(tracks, n_frames):
    """Physics rule every 2 s (see roadresq_ai.locate_crash): returns suspect moments."""
    R.LOOK_BACK_S, R.LOOK_AHEAD_S = 2.0, 0.0
    out = []
    for a in range(40, n_frames + 40, 40):
        r = R.locate_crash(tracks, min(a, n_frames - 1), n_frames)
        if not r:
            continue
        score = r["score"] / (4 if r["kind"] == "pair" else 3)
        if score < SUSPECT_MIN:
            continue
        item = dict(t=r["crash_time_s"], frame=r["crash_frame"], score=round(float(score), 2), kind=r["kind"],
                    ids=[int(i) for i in r["car_ids"]], type_tracker=r["crash_type"],
                    box=[float(v) for v in r["box_px"]], x_px=float(r["x_px"]), y_px=float(r["y_px"]),
                    x_m=r.get("x_m_carla"), y_m=r.get("y_m_carla"))
        if out and abs(out[-1]["t"] - item["t"]) < 1.5:
            if item["score"] > out[-1]["score"]:
                out[-1] = item
        else:
            out.append(item)
    return out


# ------------------------------------------------------------------------------------------- step 3
def _grab(cap, fps, t):
    cap.set(cv2.CAP_PROP_POS_FRAMES, max(0, int(round(t * fps))))
    ok, img = cap.read()
    return img if ok else None


def suspect_images(path, tracks, s):
    """1 full view (red rectangle) + 21 zoomed frames (t-1 s .. t+1.5 s) with the YOLO boxes of the suspect vehicles."""
    from PIL import Image
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    base = _grab(cap, fps, s["t"])
    h, w = base.shape[:2]
    sx, sy = w / R.W, h / R.H
    x1, y1, x2, y2 = s["box"][0] * sx, s["box"][1] * sy, s["box"][2] * sx, s["box"][3] * sy
    side = max((x2 - x1) * 2.5, (y2 - y1) * 2.5, 0.25 * w)
    cx = min(max((x1 + x2) / 2, side / 2), w - side / 2)
    cy = min(max((y1 + y2) / 2, side / 2), h - side / 2)
    a, b = int(max(0, cx - side / 2)), int(max(0, cy - side / 2))
    c, d = int(min(w, a + side)), int(min(h, b + side))
    full = base.copy()
    cv2.rectangle(full, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 255), 3)
    imgs = [Image.fromarray(cv2.cvtColor(cv2.resize(full, (512, int(h * 512 / w))), cv2.COLOR_BGR2RGB))]
    sel = tracks[tracks.car_id.isin(s["ids"])]
    for k in range(-8, 13):
        t = s["t"] + k / 8.0
        img = _grab(cap, fps, t) if t >= 0 else None
        if img is None:
            continue
        for _, r in sel[sel.frame_number == int(round(t * 20))].iterrows():
            j = s["ids"].index(int(r.car_id))
            cv2.rectangle(img, (int(r.box_left_px * sx), int(r.box_top_px * sy)),
                          (int(r.box_right_px * sx), int(r.box_bottom_px * sy)), COLORS[j % 3], 2)
            cv2.putText(img, str(j + 1), (int(r.box_left_px * sx), int(r.box_top_px * sy) - 4),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, COLORS[j % 3], 2)
        crop = cv2.resize(img[b:d, a:c], (384, 384))
        for col, th in (((0, 0, 0), 4), ((255, 255, 255), 2)):
            cv2.putText(crop, "t=%.2fs" % t, (8, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.7, col, th)
        imgs.append(Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)))
    cap.release()
    return imgs


def ask_vlm(images, t):
    torch, proc, model = _vlm["torch"], _vlm["proc"], _vlm["model"]
    content = [{"type": "image"} for _ in images] + [
        {"type": "text", "text": PROMPT.format(hint="Look especially around t=%.2fs.\n" % t)}]
    text = proc.apply_chat_template([{"role": "user", "content": content}], tokenize=False, add_generation_prompt=True)
    inputs = proc(text=[text], images=images, return_tensors="pt").to(model.device)
    with torch.no_grad():
        out = model.generate(**inputs, max_new_tokens=200, do_sample=False)
    ans = proc.batch_decode(out[:, inputs["input_ids"].shape[1]:], skip_special_tokens=True)[0]
    del inputs, out
    torch.cuda.empty_cache()
    m = re.search(r"\{.*\}", ans, re.S)
    try:
        return json.loads(m.group(0)) if m else {"raw": ans}
    except Exception:
        return {"raw": ans}


def decide(r):
    ev = sorted({e for e in (r.get("evidence") or []) if isinstance(e, str)} & EVIDENCE)
    yes = bool(r.get("collision")) and (r.get("confidence") or 0) >= CONF_MIN
    return yes and len(ev) > 0 and not NEG.search(str(r.get("reason", ""))), ev


# ------------------------------------------------------------------------------------------- step 4
def suggest_response(level, evidence, vehicles, pedestrian):
    """Severity + suggested units. RULES written by the team (not learned) - easy to change."""
    ev = set(evidence)
    units = {"ambulance": 0, "civil_defense": 0, "police": 1}
    if level == "review":
        return "unknown", units, "operator must confirm from the clip"
    if "smoke_or_fire" in ev or "overturned" in ev:
        severity = "high"
        units.update(ambulance=2, civil_defense=1)
    elif pedestrian or (vehicles or 0) >= 3:
        severity = "high"
        units.update(ambulance=2)
    elif "damage" in ev or "pushed_or_spun" in ev or "off_road" in ev:
        severity = "medium"
        units.update(ambulance=1)
    else:
        severity = "low"
    if (vehicles or 0) >= 3:
        units["police"] = 2
    why = ", ".join(sorted(ev)) or "no visible injury signs"
    return severity, units, why


def kroki_data(tracks, s, n_frames):
    """Paths of the involved vehicles from 2 s before to 2 s after (for drawing the kroki)."""
    f0, f1 = max(0, s["frame"] - 40), min(n_frames - 1, s["frame"] + 40)
    cars = []
    for j, cid in enumerate(s["ids"]):
        d = tracks[(tracks.car_id == cid) & (tracks.frame_number.between(f0, f1))].sort_values("frame_number")
        d = d.iloc[::4]                                  # 5 points per second is enough
        cars.append({"vehicle": j + 1, "path_px": [[round(float(x), 1), round(float(y), 1)] for x, y in
                                                   zip(d.box_center_x_px, d.box_center_y_px)],
                     "path_m": [[round(float(x), 1), round(float(y), 1)] for x, y in zip(d.x_m, d.y_m)]
                     if "x_m" in d and d.x_m.notna().all() else None})
    return {"impact_px": [round(s["x_px"], 1), round(s["y_px"], 1)], "picture_size": [R.W, R.H], "vehicles": cars}


# ------------------------------------------------------------------------------------------- main
def analyze_video(video, out_dir=None, save_video=True, log=print):
    """Run the whole system on one video. Returns a dict (save it in the DB) and writes files into out_dir."""
    load_models()
    name = os.path.splitext(os.path.basename(video))[0]
    out_dir = out_dir or os.path.join(os.path.dirname(os.path.abspath(video)), name + "_out")
    os.makedirs(out_dir, exist_ok=True)
    base = os.path.join(out_dir, name)

    log("1/4 reading + YOLO tracking...")
    frames, _ = R.read_frames(video)
    det = R.detect(frames, name, log=lambda *a: None)
    result = dict(video=os.path.basename(video), duration_s=round(len(frames) / R.MODEL_FPS, 1),
                  brain=VLM_MODEL if USE_VLM else "none (demo mode)", status="none",
                  accident_detected=False, alerts=[], suspects=0, files={})
    if det.empty:
        json.dump(result, open(base + "_result.json", "w"), indent=1)
        return result
    log("2/4 physics rule...")
    tracks, _ = R.features(det, out_dir, False)
    sus = find_suspects(tracks, len(frames))
    result["suspects"] = len(sus)

    log("3/4 checking %d suspect moments%s..." % (len(sus), " with Qwen" if USE_VLM else ""))
    checked = []
    for s in sus:
        if USE_VLM:
            try:
                r = ask_vlm(suspect_images(video, tracks, s), s["t"])
            except Exception as e:
                r = {"raw": "ERROR " + repr(e)[:200]}
            confirmed, ev = decide(r)
        else:
            r, confirmed, ev = {}, False, []
        checked.append((s, r, "confirmed" if confirmed else "review", ev))

    log("4/4 alerts...")
    last = {}
    for s, r, level, ev in checked:
        if level in last and s["t"] - last[level] <= MERGE_S:      # same incident already reported
            continue
        if level == "review" and "confirmed" in last and s["t"] - last["confirmed"] <= MERGE_S:
            continue
        last[level] = s["t"]
        vehicles = r.get("vehicles") or len(s["ids"])
        severity, units, why = suggest_response(level, ev, vehicles, bool(r.get("pedestrian_hit")))
        ctype = r.get("type") if level == "confirmed" and r.get("type") not in (None, "none") else s["type_tracker"]
        img = frames[min(len(frames) - 1, s["frame"])].copy()
        b = [int(v) for v in s["box"]]
        cv2.rectangle(img, (b[0] - 8, b[1] - 8), (b[2] + 8, b[3] + 8), (0, 0, 255) if level == "confirmed" else (0, 165, 255), 2)
        img_path = "%s_%s_%05.1fs.jpg" % (base, level, s["t"])
        cv2.imwrite(img_path, img)
        result["alerts"].append(dict(
            level=level, time_s=s["t"], place={"x_px": round(s["x_px"], 1), "y_px": round(s["y_px"], 1),
                                                "box_px": [round(v, 1) for v in s["box"]]},
            crash_type=ctype, evidence=ev, fire="smoke_or_fire" in ev, overturned="overturned" in ev,
            pedestrian_hit=bool(r.get("pedestrian_hit")), vehicles=vehicles, physics_score=s["score"],
            severity=severity, units=units, severity_reason=why, vlm_reason=r.get("reason") or r.get("raw"),
            crash_image=img_path, clip_start_s=round(max(0.0, s["t"] - 1.5), 2), clip_end_s=round(s["t"] + 1.5, 2),
            kroki=kroki_data(tracks, s, len(frames))))
    result["alerts"].sort(key=lambda a: (a["level"] != "confirmed", a["time_s"]))
    if any(a["level"] == "confirmed" for a in result["alerts"]):
        result["status"], result["accident_detected"] = "confirmed", True
    elif result["alerts"]:
        result["status"] = "review"

    if save_video:
        out = cv2.VideoWriter(base + "_result.mp4", cv2.VideoWriter_fourcc(*"mp4v"), R.MODEL_FPS, (R.W, R.H))
        by_f = dict(tuple(tracks.groupby("frame_number")))
        marks = [(a["time_s"], a["level"], set(s["ids"])) for a in result["alerts"]
                 for s, *_ in checked if s["t"] == a["time_s"]]
        for f, img in enumerate(frames):
            img = img.copy()
            t = f / R.MODEL_FPS
            hot = {}
            for ta, lvl, ids in marks:
                if ta <= t <= ta + 5:
                    for i in ids:
                        hot[i] = (0, 0, 255) if lvl == "confirmed" else (0, 165, 255)
            for _, c in by_f.get(f, pd.DataFrame()).iterrows():
                col = hot.get(int(c.car_id), (0, 255, 0))
                cv2.rectangle(img, (int(c.box_left_px), int(c.box_top_px)), (int(c.box_right_px), int(c.box_bottom_px)),
                              col, 2 if col != (0, 255, 0) else 1)
            for ta, lvl, _ in marks:
                if t >= ta:
                    cv2.rectangle(img, (0, R.H - 36), (R.W, R.H), (0, 0, 200) if lvl == "confirmed" else (0, 120, 230), -1)
                    cv2.putText(img, ("ACCIDENT" if lvl == "confirmed" else "POSSIBLE ACCIDENT - REVIEW") + " at %.1f s" % ta,
                                (10, R.H - 11), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
                    break
            out.write(img)
        out.release()
        result["files"]["video"] = base + "_result.mp4"

    result["files"]["json"] = base + "_result.json"
    json.dump(result, open(base + "_result.json", "w"), indent=1, default=float)
    log("RESULT: status=%s, alerts=%d" % (result["status"], len(result["alerts"])))
    return result


if __name__ == "__main__":
    r = analyze_video(sys.argv[1])
    print(json.dumps({k: v for k, v in r.items() if k != "alerts"}, indent=1))
    for a in r["alerts"]:
        print({k: a[k] for k in ("level", "time_s", "crash_type", "severity", "units", "evidence")})
