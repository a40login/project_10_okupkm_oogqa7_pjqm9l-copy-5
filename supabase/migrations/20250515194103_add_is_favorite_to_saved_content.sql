-- Add is_favorite column to saved_content table
ALTER TABLE public.saved_content
ADD COLUMN is_favorite BOOLEAN NOT NULL DEFAULT FALSE;

-- Add a comment to the new column
COMMENT ON COLUMN public.saved_content.is_favorite IS 'Indicates if the content is marked as a favorite by the user';

-- Optionally, create an index if you plan to query frequently by is_favorite
CREATE INDEX idx_saved_content_is_favorite ON public.saved_content(user_id, is_favorite);