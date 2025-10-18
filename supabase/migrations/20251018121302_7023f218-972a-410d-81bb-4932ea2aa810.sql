-- Add package and services columns to events table
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS package text,
ADD COLUMN IF NOT EXISTS services text[];