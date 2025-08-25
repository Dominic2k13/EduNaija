-- Add email and profile_completed columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT FALSE;

-- Update existing users to have profile_completed = true if they have a username
UPDATE users 
SET profile_completed = TRUE 
WHERE username IS NOT NULL;

-- Make username nullable since it will be set after email confirmation
ALTER TABLE users 
ALTER COLUMN username DROP NOT NULL;

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Add index for profile completion status
CREATE INDEX IF NOT EXISTS idx_users_profile_completed ON users(profile_completed);
