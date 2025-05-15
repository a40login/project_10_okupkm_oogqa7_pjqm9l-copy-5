/*
  # Add profile fields to company_profiles table

  1. New Fields
    - `first_name` (text, nullable)
    - `last_name` (text, nullable)
    - `email` (text, nullable)
    - `position` (text, nullable)
    - `linkedin_url` (text, nullable)
    - `facebook_url` (text, nullable)
    - `instagram_url` (text, nullable)

  2. Changes
    - Adds new columns for personal information and social media profiles
    - All fields are nullable to maintain compatibility with existing data
*/

DO $$ 
BEGIN
  -- Add personal information fields
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'company_profiles' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE company_profiles ADD COLUMN first_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'company_profiles' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE company_profiles ADD COLUMN last_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'company_profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE company_profiles ADD COLUMN email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'company_profiles' AND column_name = 'position'
  ) THEN
    ALTER TABLE company_profiles ADD COLUMN position text;
  END IF;

  -- Add social media fields
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'company_profiles' AND column_name = 'linkedin_url'
  ) THEN
    ALTER TABLE company_profiles ADD COLUMN linkedin_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'company_profiles' AND column_name = 'facebook_url'
  ) THEN
    ALTER TABLE company_profiles ADD COLUMN facebook_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'company_profiles' AND column_name = 'instagram_url'
  ) THEN
    ALTER TABLE company_profiles ADD COLUMN instagram_url text;
  END IF;
END $$;
