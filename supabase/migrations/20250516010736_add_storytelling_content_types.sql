-- Supabase Migration: Add new storytelling content types to saved_content table
--
-- This migration adds new possible values for the 'content_type' column
-- in the 'public.saved_content' table. These new types correspond to
-- the different storytelling expert pages.
--
-- Existing 'content_type' column is TEXT, so no ENUM alteration is needed.
-- We are just documenting the new conventional values that will be used.

-- New content_type values to be used by the application:
-- - 'story-fundament'
-- - 'tagline'
-- - 'elevator-pitch'
-- - 'positioning-story'
-- - 'brand-story'
-- - 'product-usage-story'
-- - 'testimonial-story'

-- No actual DDL changes are strictly required in this migration
-- as the 'content_type' column is already TEXT.
-- However, this file serves as a record of the new content types
-- being introduced at this point in the project's lifecycle.

-- If there were constraints or specific checks on 'content_type' values,
-- they would be added or modified here. For now, we rely on application-level
-- consistency for these TEXT values.

-- Optional: Add comments to the table or column if more context is desired,
-- though the existing comment on 'content_type' is quite generic.
-- Example:
-- COMMENT ON COLUMN public.saved_content.content_type IS 'Art des Inhalts (z.B. "Strategie", "Expertenseite", "story-fundament", "tagline", etc.)';
-- For this migration, we will not alter existing comments to keep it minimal.

SELECT 'Storytelling content types documentation migration applied.';