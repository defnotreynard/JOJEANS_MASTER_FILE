-- Add missing columns to gallery table to match the gallery card display
ALTER TABLE public.gallery
ADD COLUMN couple TEXT,
ADD COLUMN style TEXT DEFAULT 'Romantic',
ADD COLUMN likes INTEGER DEFAULT 0,
ADD COLUMN views INTEGER DEFAULT 0;

-- Update existing rows to have default values
UPDATE public.gallery
SET 
  couple = COALESCE(couple, 'Couple Name'),
  style = COALESCE(style, 'Romantic'),
  likes = COALESCE(likes, 0),
  views = COALESCE(views, 0)
WHERE couple IS NULL OR style IS NULL OR likes IS NULL OR views IS NULL;