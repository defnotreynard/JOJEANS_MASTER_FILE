-- Add package and services fields to gallery table
ALTER TABLE public.gallery
ADD COLUMN package text,
ADD COLUMN services text[];

-- Add a comment to describe the columns
COMMENT ON COLUMN public.gallery.package IS 'Package tier: Silver, Gold, or Platinum';
COMMENT ON COLUMN public.gallery.services IS 'Array of services availed for this event';