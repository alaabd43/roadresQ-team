-- RoadGuard database (SQLite). Rand can move it to MySQL/PostgreSQL - same tables.

-- one uploaded / recorded video sent to the AI
CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    camera_id TEXT,
    uploaded_at TEXT,
    status TEXT,                 -- processing / done / error
    result_json TEXT             -- full AI output
);

-- one row per incident the AI found
CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id INTEGER REFERENCES jobs(id),
    camera_id TEXT,
    created_at TEXT,
    level TEXT,                  -- confirmed (alert now) / review (operator checks the clip)
    time_s REAL,                 -- second in the video
    x_px REAL, y_px REAL,        -- place in the picture (800x600)
    crash_type TEXT,             -- rear-end / head-on / t-bone / sideswipe / single
    severity TEXT,               -- high / medium / low / unknown
    ambulance INTEGER, civil_defense INTEGER, police INTEGER,   -- suggested units
    fire INTEGER, overturned INTEGER, pedestrian_hit INTEGER,
    vehicles INTEGER,
    evidence TEXT,               -- e.g. "damage,debris"
    reason TEXT,                 -- what Qwen saw (English)
    crash_image TEXT,            -- picture at the crash moment
    video TEXT,                  -- result video with boxes
    clip_start_s REAL, clip_end_s REAL,  -- short clip for the operator
    kroki_json TEXT,             -- vehicle paths for drawing the kroki
    operator_verdict TEXT,       -- accident / not_accident  (filled by staff) -> data to improve the AI later
    verdict_by INTEGER REFERENCES staff(id),
    verdict_at TEXT,
    status TEXT DEFAULT 'open'   -- open / units_sent / closed
);

CREATE TABLE IF NOT EXISTS cameras (
    id TEXT PRIMARY KEY,         -- e.g. CAM-01
    name TEXT,
    lat REAL, lng REAL,          -- place on the Jordan map
    stream_url TEXT
);

CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,          -- never store plain passwords (use werkzeug.security / bcrypt)
    full_name TEXT,
    role TEXT                    -- operator / admin / ambulance / civil_defense / police
);

CREATE TABLE IF NOT EXISTS citizen_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT,
    phone TEXT,
    lat REAL, lng REAL,
    description TEXT,
    photo TEXT,
    status TEXT DEFAULT 'new',   -- new / checked / linked
    incident_id INTEGER REFERENCES incidents(id)
);
