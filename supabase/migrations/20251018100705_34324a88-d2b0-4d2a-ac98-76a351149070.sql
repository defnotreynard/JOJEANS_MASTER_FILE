-- Make the event-uploads bucket public so gallery images can be displayed
UPDATE storage.buckets 
SET public = true 
WHERE id = 'event-uploads';