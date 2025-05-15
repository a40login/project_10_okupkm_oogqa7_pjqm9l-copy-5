-- SQL migration to automatically create a company profile when a new user is created.

-- 1. Create the function to handle new user company profile creation.
CREATE OR REPLACE FUNCTION public.handle_new_user_company_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER -- Allows the function to run with the permissions of the user who defined it (typically a superuser)
AS $$
BEGIN
  -- Insert a new row into public.company_profiles for the new user.
  -- It populates the user_id (linking to auth.users) and the user's email.
  -- Other fields in company_profiles will be NULL or their default values,
  -- creating a "blank" profile to be filled in later by the user.
  INSERT INTO public.company_profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  RETURN NEW; -- The result is ignored for AFTER triggers, but it's good practice.
END;
$$;

-- 2. Create the trigger on auth.users table.
-- This trigger will fire AFTER a new user record is INSERTED into auth.users.
CREATE TRIGGER on_auth_user_created_create_company_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW -- Ensures the function runs for each newly inserted user.
  EXECUTE FUNCTION public.handle_new_user_company_profile();

-- Optional: Grant usage on auth schema and select on auth.users to postgres role if needed,
-- though SECURITY DEFINER functions usually handle this.
-- GRANT USAGE ON SCHEMA auth TO postgres;
-- GRANT SELECT ON auth.users TO postgres; 
-- (Uncomment and adjust if you face permission issues, but typically not needed when running as superuser via SQL editor)

-- Notification to confirm setup (optional, for Supabase logs)
-- SELECT pg_notify('migrations', 'Applied auto_create_company_profile migration');
