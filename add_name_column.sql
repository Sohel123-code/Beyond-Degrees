-- Add name column to USERS table
alter table "USERS" add column if not exists name text;
