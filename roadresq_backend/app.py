# app.py - RoadGuard backend connected to the ONLINE database (Supabase).
# Same API as app_example.py, but everything is saved in Supabase, so the whole team
# sees the results on the website even when this laptop is off.
#
#   1) copy .env.example to .env and fill SUPABASE_URL and SUPABASE_SERVICE_KEY
#   2) pip install -r requirements.txt
#   3) set ROADRESQ_NO_VLM=1      (no NVIDIA GPU -> demo mode, every suspect = "review")
#      python app.py               -> http://localhost:5000
#
# Endpoints (the website already uses them):
#   POST /api/analyze                 form-data: video=<file>, camera_id=<id>  -> {"job_id": 3, "status": "processing"}
#   GET  /api/jobs/<id>               processing / done / error
#   GET  /api/incidents               all incidents, newest first  (?status=confirmed|review)
#   GET  /api/incidents/<id>          one incident (with kroki data)
#   POST /api/incidents/<id>/verdict  json {"verdict": "accident" | "not_accident"}
#   GET  /api/health                  is the server running?

import json
import mimetypes
import os
import shutil
import subprocess
import sys
import threading
import time

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from supabase import create_client

HERE = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(HERE, ".env"))
sys.path.insert(0, os.path.join(HERE, "ai"))
from roadresq_system import analyze_video, load_models  # noqa: E402

URL = os.environ.get("SUPABASE_URL", "").strip()
KEY = os.environ.get("SUPABASE_SERVICE_KEY", "").strip()   # service_role key: NEVER put it on GitHub
if not URL or not KEY:
    sys.exit("Missing SUPABASE_URL / SUPABASE_SERVICE_KEY. Copy .env.example to .env and fill them.")
sb = create_client(URL, KEY)

WORK = os.path.join(HERE, "media")                          # temporary files on the laptop
os.makedirs(WORK, exist_ok=True)
app = Flask(__name__)
ai_lock = threading.Lock()                                  # one video at a time (the model is big)


def now():
    return time.strftime("%Y-%m-%dT%H:%M:%S%z")


def browser_mp4(path):
    """OpenCV writes mp4v, which browsers can't play. Convert to H.264 if ffmpeg is available."""
    try:
        import imageio_ffmpeg
        ff = imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        ff = shutil.which("ffmpeg")
    if not ff:
        return path
    out = path[:-4] + "_web.mp4"
    try:
        subprocess.run([ff, "-y", "-loglevel", "error", "-i", path, "-c:v", "libx264", "-preset", "veryfast",
                        "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out], check=True, timeout=600)
        return out
    except Exception:
        return path


def upload(local_path, job_id):
    """Put a file in the public 'media' bucket and return its link."""
    if not local_path or not os.path.exists(local_path):
        return None
    name = "jobs/%s/%s" % (job_id, os.path.basename(local_path))
    ctype = mimetypes.guess_type(local_path)[0] or "application/octet-stream"
    with open(local_path, "rb") as f:
        sb.storage.from_("media").upload(name, f.read(), {"content-type": ctype, "upsert": "true"})
    return sb.storage.from_("media").get_public_url(name)


def run_ai(job_id, video_path, camera_id):
    out_dir = os.path.join(WORK, "jobs", str(job_id))
    try:
        with ai_lock:
            r = analyze_video(video_path, out_dir=out_dir)
        video_url = None
        if r["files"].get("video"):
            video_url = upload(browser_mp4(r["files"]["video"]), job_id)
        rows = []
        for a in r["alerts"]:                               # one row per incident
            rows.append(dict(
                job_id=job_id, camera_id=camera_id, level=a["level"], time_s=a["time_s"],
                x_px=a["place"]["x_px"], y_px=a["place"]["y_px"], crash_type=a["crash_type"], severity=a["severity"],
                ambulance=a["units"]["ambulance"], civil_defense=a["units"]["civil_defense"], police=a["units"]["police"],
                fire=int(a["fire"]), overturned=int(a["overturned"]), pedestrian_hit=int(a["pedestrian_hit"]),
                vehicles=a["vehicles"], evidence=",".join(a["evidence"]), reason=a.get("vlm_reason"),
                crash_image=upload(a.get("crash_image"), job_id), video=video_url,
                clip_start_s=a["clip_start_s"], clip_end_s=a["clip_end_s"], kroki_json=a["kroki"]))
        if rows:
            sb.table("incidents").insert(rows).execute()
        sb.table("jobs").update({"status": "done", "result_json": json.loads(json.dumps(r, default=float))}) \
          .eq("id", job_id).execute()
    except Exception as e:
        sb.table("jobs").update({"status": "error", "result_json": {"error": str(e)}}).eq("id", job_id).execute()


@app.get("/api/health")
def health():
    return jsonify(ok=True, db="supabase")


@app.post("/api/analyze")
def analyze():
    f = request.files.get("video")
    if not f:
        return jsonify(error='send the video as form-data field "video"'), 400
    cam = request.form.get("camera_id", "upload")
    job_id = sb.table("jobs").insert({"camera_id": cam, "status": "processing"}).execute().data[0]["id"]
    folder = os.path.join(WORK, "jobs", str(job_id))
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, os.path.basename(f.filename or "video.mp4"))
    f.save(path)
    threading.Thread(target=run_ai, args=(job_id, path, cam), daemon=True).start()
    return jsonify(job_id=job_id, status="processing")


@app.get("/api/jobs/<int:jid>")
def job(jid):
    d = sb.table("jobs").select("*").eq("id", jid).execute().data
    if not d:
        return jsonify(error="not found"), 404
    j = d[0]
    j["result_json"] = json.dumps(j["result_json"]) if j.get("result_json") is not None else None
    return jsonify(j)


def inc_dict(d):
    d["crash_image_url"], d["video_url"] = d.pop("crash_image"), d.pop("video")
    d["kroki"] = d.pop("kroki_json")
    d["evidence"] = [e for e in (d["evidence"] or "").split(",") if e]
    return d


@app.get("/api/incidents")
def incidents():
    q = sb.table("incidents").select("*").order("id", desc=True)
    if request.args.get("status"):
        q = q.eq("level", request.args["status"])
    return jsonify([inc_dict(r) for r in q.execute().data])


@app.get("/api/incidents/<int:iid>")
def incident(iid):
    d = sb.table("incidents").select("*").eq("id", iid).execute().data
    return (jsonify(inc_dict(d[0])), 200) if d else (jsonify(error="not found"), 404)


@app.post("/api/incidents/<int:iid>/verdict")
def verdict(iid):
    body = request.get_json(force=True)
    if body.get("verdict") not in ("accident", "not_accident"):
        return jsonify(error='verdict must be "accident" or "not_accident"'), 400
    sb.table("incidents").update({"operator_verdict": body["verdict"], "verdict_at": now()}).eq("id", iid).execute()
    return jsonify(ok=True)


@app.after_request
def cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp


if __name__ == "__main__":
    print("loading the AI (Qwen 8B needs an NVIDIA GPU with ~17 GB; otherwise set ROADRESQ_NO_VLM=1)...")
    load_models()
    app.run(host="0.0.0.0", port=5000, threaded=True)
