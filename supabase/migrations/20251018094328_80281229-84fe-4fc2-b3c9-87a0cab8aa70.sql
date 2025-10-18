-- Create storage policies for admins to manage gallery images
-- Allow admins to upload gallery images
CREATE POLICY "Admins can upload gallery images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'event-uploads' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
);

-- Allow admins to view gallery images
CREATE POLICY "Admins can view gallery images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'event-uploads' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
);

-- Allow admins to update gallery images
CREATE POLICY "Admins can update gallery images"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'event-uploads' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
);

-- Allow admins to delete gallery images
CREATE POLICY "Admins can delete gallery images"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'event-uploads' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
);

-- Allow public to view published gallery images
CREATE POLICY "Public can view published gallery images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'event-uploads' 
  AND (storage.foldername(name))[1] = 'gallery'
);