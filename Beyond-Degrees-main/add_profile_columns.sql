-- Add profile columns to USERS table
ALTER TABLE "USERS" ADD COLUMN IF NOT EXISTS user_name TEXT;
ALTER TABLE "USERS" ADD COLUMN IF NOT EXISTS education TEXT;
ALTER TABLE "USERS" ADD COLUMN IF NOT EXISTS interests TEXT;
ALTER TABLE "USERS" ADD COLUMN IF NOT EXISTS social_links TEXT; -- Store as JSON string or text properties
ALTER TABLE "USERS" ADD COLUMN IF NOT EXISTS image TEXT;

-- Verify columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'USERS';
