-- Enable RLS on the table (if not already enabled)
alter table "USERS" enable row level security;

-- Create policy to allow anonymous access to "USERS"
create policy "Allow public access to USERS table"
on "USERS"
for all
to anon
using (true)
with check (true);
