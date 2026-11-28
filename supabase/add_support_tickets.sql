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
