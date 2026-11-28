# app_example.py - small Flask example: how the backend talks to the AI.
# Rand: a starting point. Login / staff / citizen reports are yours - the tables are ready in schema.sql.
#
#   pip install -r requirements.txt
#   python app_example.py                       -> http://localhost:5000
#   (no NVIDIA GPU?  set ROADRESQ_NO_VLM=1  -> demo mode: every suspect = "review")
#
# Endpoints
#   POST /api/analyze                 form-data: video=<file>, camera_id=<id>  -> {"job_id": 3, "status": "processing"}
#   GET  /api/jobs/<id>               processing / done / error
#   GET  /api/incidents               all incidents, newest first  (?status=confirmed|review)
#   GET  /api/incidents/<id>          one incident (with kroki data)
#   POST /api/incidents/<id>/verdict  json {"verdict": "accident" | "not_accident", "staff_id": 1}
#   GET  /media/<path>                result video / crash picture

import json
import os
import sqlite3
import sys
import threading
import time

from flask import Flask, jsonify, request, send_from_directory

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "ai"))
from roadresq_system import analyze_video, load_models  # noqa: E402

DB = os.path.join(HERE, "roadguard.db")
MEDIA = os.path.join(HERE, "media")
os.makedirs(MEDIA, exist_ok=True)
app = Flask(__name__)
ai_lock = threading.Lock()                       # one video at a time (the model is big)


def db():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    return con


def init_db():
    with db() as con, open(os.path.join(HERE, "schema.sql"), encoding="utf-8") as f:
        con.executescript(f.read())


def url(path):
    return "/media/" + os.path.relpath(path, MEDIA).replace("\\", "/") if path else None


def run_ai(job_id, video_path, camera_id):
    out_dir = os.path.join(MEDIA, "jobs", str(job_id))
    try:
        with ai_lock:
            r = analyze_video(video_path, out_dir=out_dir)
        with db() as con:
            for a in r["alerts"]:                # one row per incident
                con.execute("""INSERT INTO incidents (job_id, camera_id, created_at, level, time_s, x_px, y_px,
                               crash_type, severity, ambulance, civil_defense, police, fire, overturned, pedestrian_hit,
                               vehicles, evidence, reason, crash_image, video, clip_start_s, clip_end_s, kroki_json)
                               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                            (job_id, camera_id, time.strftime("%Y-%m-%d %H:%M:%S"), a["level"], a["time_s"],
                             a["place"]["x_px"], a["place"]["y_px"], a["crash_type"], a["severity"],
                             a["units"]["ambulance"], a["units"]["civil_defense"], a["units"]["police"],
                             int(a["fire"]), int(a["overturned"]), int(a["pedestrian_hit"]), a["vehicles"],
                             ",".join(a["evidence"]), a["vlm_reason"], a["crash_image"], r["files"].get("video"),
                             a["clip_start_s"], a["clip_end_s"], json.dumps(a["kroki"])))
            con.execute("UPDATE jobs SET status='done', result_json=? WHERE id=?", (json.dumps(r, default=float), job_id))
    except Exception as e:
        with db() as con:
            con.execute("UPDATE jobs SET status='error', result_json=? WHERE id=?", (json.dumps({"error": str(e)}), job_id))


@app.post("/api/analyze")
def analyze():
    f = request.files.get("video")
    if not f:
        return jsonify(error='send the video as form-data field "video"'), 400
    cam = request.form.get("camera_id", "upload")
    with db() as con:
        job_id = con.execute("INSERT INTO jobs (camera_id, uploaded_at, status) VALUES (?,?,?)",
                             (cam, time.strftime("%Y-%m-%d %H:%M:%S"), "processing")).lastrowid
    folder = os.path.join(MEDIA, "jobs", str(job_id))
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, os.path.basename(f.filename or "video.mp4"))
    f.save(path)
    threading.Thread(target=run_ai, args=(job_id, path, cam), daemon=True).start()
    return jsonify(job_id=job_id, status="processing")


@app.get("/api/jobs/<int:jid>")
def job(jid):
    with db() as con:
        r = con.execute("SELECT * FROM jobs WHERE id=?", (jid,)).fetchone()
    return (jsonify(dict(r)), 200) if r else (jsonify(error="not found"), 404)


def inc_dict(r):
    d = dict(r)
    d["crash_image_url"], d["video_url"] = url(d.pop("crash_image")), url(d.pop("video"))
    d["kroki"] = json.loads(d.pop("kroki_json") or "null")
    d["evidence"] = [e for e in (d["evidence"] or "").split(",") if e]
    return d


@app.get("/api/incidents")
def incidents():
    q, args = "SELECT * FROM incidents", []
    if request.args.get("status"):
        q += " WHERE level=?"
        args.append(request.args["status"])
    with db() as con:
        rows = con.execute(q + " ORDER BY id DESC", args).fetchall()
    return jsonify([inc_dict(r) for r in rows])


@app.get("/api/incidents/<int:iid>")
def incident(iid):
    with db() as con:
        r = con.execute("SELECT * FROM incidents WHERE id=?", (iid,)).fetchone()
    return (jsonify(inc_dict(r)), 200) if r else (jsonify(error="not found"), 404)


@app.post("/api/incidents/<int:iid>/verdict")
def verdict(iid):
    """The operator confirms or rejects -> saved for learning later (human-in-the-loop)."""
    body = request.get_json(force=True)
    if body.get("verdict") not in ("accident", "not_accident"):
        return jsonify(error='verdict must be "accident" or "not_accident"'), 400
    with db() as con:
        con.execute("UPDATE incidents SET operator_verdict=?, verdict_by=?, verdict_at=? WHERE id=?",
                    (body["verdict"], body.get("staff_id"), time.strftime("%Y-%m-%d %H:%M:%S"), iid))
    return jsonify(ok=True)


@app.get("/media/<path:p>")
def media(p):
    return send_from_directory(MEDIA, p)


@app.after_request
def cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp


if __name__ == "__main__":
    init_db()
    print("loading the AI (Qwen 8B needs an NVIDIA GPU with ~17 GB; otherwise demo mode)...")
    load_models()
    app.run(host="0.0.0.0", port=5000, threaded=True)
