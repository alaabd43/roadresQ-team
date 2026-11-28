-- 7. DISPATCH NUMBERS (WhatsApp number of each responder, edited from the website: Tools -> Dispatch contacts)
-- =========================================================
alter table responders add column if not exists phone text;
drop policy if exists resp_update on responders;
create policy resp_update on responders for update using (is_staff()) with check (is_staff());
