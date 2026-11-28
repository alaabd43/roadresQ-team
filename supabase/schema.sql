-- RoadGuard / RoadResQ - online database (Supabase / PostgreSQL)
-- Paste ALL of this into Supabase: SQL Editor -> New query -> Run.  Safe to run again.

-- =========================================================
-- 1. TABLES
-- =========================================================

-- street cameras (shown in the operations room)
create table if not exists cameras (
  id          text primary key,              -- CAM-01
  name_ar     text,
  name_en     text,
  lat         double precision,
  lng         double precision,
  stream_url  text,
  online      boolean default true
);

-- emergency stations shown on the map (the nearest of each kind is used for the route)
create table if not exists responders (
  id       text primary key,
  kind     text not null,                   -- ambulance / civil_defense / police
  name_ar  text,
  name_en  text,
  lat      double precision not null,
  lng      double precision not null
);

-- staff accounts: the login itself (email + password, hashed) is in Supabase Auth.
-- this table only says WHO is staff and their role.
create table if not exists staff (
  id         uuid primary key references auth.users(id) on delete cascade,
  emp_no     text unique,
  full_name  text,
  role       text default 'operator'         -- operator / admin / ambulance / civil_defense / police
);

-- one video sent to the AI
create table if not exists jobs (
  id           bigserial primary key,
  camera_id    text,
  uploaded_at  timestamptz default now(),
  status       text default 'processing',    -- processing / done / error
  result_json  jsonb
);

-- one row per accident the AI found
create table if not exists incidents (
  id              bigserial primary key,
  job_id          bigint references jobs(id) on delete cascade,
  camera_id       text,
  created_at      timestamptz default now(),
  level           text,                      -- confirmed / review
  time_s          real,
  x_px real, y_px real,
  crash_type      text,                      -- rear-end / head-on / t-bone / sideswipe / single
  severity        text,                      -- high / medium / low / unknown
  ambulance int default 0, civil_defense int default 0, police int default 0,
  fire int default 0, overturned int default 0, pedestrian_hit int default 0,
  vehicles        int,
  evidence        text,                      -- "damage,debris"
  reason          text,
  crash_image     text,                      -- public URL (Supabase Storage)
  video           text,                      -- public URL
  clip_start_s real, clip_end_s real,
  kroki_json      jsonb,
  operator_verdict text,                     -- accident / not_accident   (human-in-the-loop)
  verdict_by      uuid references auth.users(id),
  verdict_at      timestamptz,
  units_sent      text,                      -- "police,amb"
  status          text default 'open'        -- open / units_sent / closed
);

-- citizen reports
create table if not exists citizen_reports (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid default auth.uid() references auth.users(id) on delete set null,
  created_at   timestamptz default now(),
  phone        text,
  lat double precision, lng double precision,
  type         int,                          -- 0 collision / 1 pedestrian / 2 rollover / 3 fire
  flags        text,                         -- "0,2"  (injured, trapped, smoke, road blocked)
  description  text,
  photo        text,                         -- path in the private "reports" bucket
  status       text default 'new',           -- new / checked / dispatched / closed
  incident_id  bigint references incidents(id) on delete set null
);

-- =========================================================
-- 2. WHO IS STAFF?
-- =========================================================
create or replace function is_staff() returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from staff where id = auth.uid()) $$;

-- =========================================================
-- 3. SECURITY (Row Level Security)
--    website key (anon) can only do what these rules allow.
--    the AI backend uses the service_role key (on the laptop only) and skips these rules.
-- =========================================================
alter table cameras         enable row level security;
alter table staff           enable row level security;
alter table jobs            enable row level security;
alter table incidents       enable row level security;
alter table citizen_reports enable row level security;
alter table responders      enable row level security;

drop policy if exists cam_read  on cameras;
create policy cam_read  on cameras for select using (is_staff());

drop policy if exists resp_read on responders;
create policy resp_read on responders for select using (is_staff());

drop policy if exists staff_read on staff;
create policy staff_read on staff for select using (id = auth.uid() or is_staff());

drop policy if exists jobs_read on jobs;
create policy jobs_read on jobs for select using (is_staff());

drop policy if exists inc_read on incidents;
create policy inc_read on incidents for select using (is_staff());
drop policy if exists inc_update on incidents;
create policy inc_update on incidents for update using (is_staff()) with check (is_staff());

drop policy if exists rep_insert on citizen_reports;
create policy rep_insert on citizen_reports for insert to authenticated with check (user_id = auth.uid());
drop policy if exists rep_read on citizen_reports;
create policy rep_read on citizen_reports for select using (user_id = auth.uid() or is_staff());
drop policy if exists rep_update on citizen_reports;
create policy rep_update on citizen_reports for update using (is_staff()) with check (is_staff());

-- =========================================================
-- 4. FILES (Storage)
--    media   = AI pictures + videos (public link)
--    reports = citizen photos (private: only the citizen and staff)
-- =========================================================
insert into storage.buckets (id, name, public) values ('media', 'media', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('reports', 'reports', false)
  on conflict (id) do nothing;

drop policy if exists rep_upload on storage.objects;
create policy rep_upload on storage.objects for insert to authenticated
  with check (bucket_id = 'reports' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists rep_view on storage.objects;
create policy rep_view on storage.objects for select to authenticated
  using (bucket_id = 'reports' and ((storage.foldername(name))[1] = auth.uid()::text or is_staff()));

-- =========================================================
-- 5. LIVE UPDATES (new accident -> operations room updates by itself)
-- =========================================================
do $$ begin
  alter publication supabase_realtime add table incidents;
exception when others then null; end $$;
do $$ begin
  alter publication supabase_realtime add table citizen_reports;
exception when others then null; end $$;

-- =========================================================
-- 6. STARTING DATA: the 4 cameras
-- =========================================================
insert into cameras (id, name_ar, name_en, lat, lng, online) values
  ('CAM-01', 'وسط المدينة',   'Downtown',       32.0255, 36.0215, true),
  ('CAM-02', 'شارع الجامعة',  'University St.', 32.0160, 35.8720, true),
  ('CAM-03', 'الدوار السابع', '7th Circle',     31.9590, 35.8600, true),
  ('CAM-04', 'طريق المطار',   'Airport Rd.',    31.8560, 35.9050, false)
on conflict (id) do nothing;

-- =========================================================
-- 7. STARTING DATA: emergency stations (approximate locations, for the demo map)
-- =========================================================
insert into responders (id, kind, name_ar, name_en, lat, lng) values
  ('AMB-AMMAN',  'ambulance',     'مستشفى البشير، عمّان',        'Al-Bashir Hospital, Amman',       31.9437, 35.9330),
  ('AMB-ZARQA',  'ambulance',     'مستشفى الزرقاء الحكومي',      'Zarqa Government Hospital',       32.0600, 36.0880),
  ('AMB-IRBID',  'ambulance',     'مستشفى الأميرة بسمة، إربد',   'Princess Basma Hospital, Irbid',  32.5450, 35.8550),
  ('AMB-MAFRAQ', 'ambulance',     'مستشفى المفرق الحكومي',       'Mafraq Government Hospital',      32.3400, 36.2050),
  ('CD-AMMAN',   'civil_defense', 'مركز دفاع مدني عمّان',        'Amman civil defense center',      31.9550, 35.9100),
  ('CD-ZARQA',   'civil_defense', 'مركز دفاع مدني الزرقاء',      'Zarqa civil defense center',      32.0640, 36.0890),
  ('CD-IRBID',   'civil_defense', 'مركز دفاع مدني إربد',         'Irbid civil defense center',      32.5550, 35.8500),
  ('POL-AMMAN',  'police',        'مديرية شرطة عمّان',           'Amman police directorate',        31.9530, 35.9300),
  ('POL-IRBID',  'police',        'مديرية شرطة إربد',            'Irbid police directorate',        32.5560, 35.8480),
  ('POL-MAFRAQ', 'police',        'مديرية شرطة المفرق',          'Mafraq police directorate',       32.3420, 36.2080)
on conflict (id) do nothing;

-- =========================================================
-- 6. SUPPORT TICKETS (technical problems reported from the website, seen by the whole team)
-- =========================================================
create table if not exists support_tickets (
  id           bigserial primary key,
  ticket       text,
  created_at   timestamptz default now(),
  staff_id     uuid default auth.uid() references auth.users(id) on delete set null,
  staff_email  text,
  version      text,
  description  text not null,
  screenshot   text,                         -- path in the private "reports" bucket
  status       text default 'new'            -- new / done
);
alter table support_tickets enable row level security;
drop policy if exists tk_insert on support_tickets;
create policy tk_insert on support_tickets for insert to authenticated with check (is_staff());
drop policy if exists tk_read on support_tickets;
create policy tk_read on support_tickets for select using (is_staff());
drop policy if exists tk_update on support_tickets;
create policy tk_update on support_tickets for update using (is_staff()) with check (is_staff());

-- =========================================================
-- 7. DISPATCH NUMBERS (WhatsApp number of each responder, edited from the website: Tools -> Dispatch contacts)
-- =========================================================
alter table responders add column if not exists phone text;
drop policy if exists resp_update on responders;
create policy resp_update on responders for update using (is_staff()) with check (is_staff());
