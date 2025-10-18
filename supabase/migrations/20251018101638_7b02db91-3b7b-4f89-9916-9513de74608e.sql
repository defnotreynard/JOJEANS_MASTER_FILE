-- Add cover_image column to gallery table for front card image
ALTER TABLE public.gallery 
ADD COLUMN cover_image TEXT;