-- Allow admins and super_admins to view all events
CREATE POLICY "Admins can view all events"
ON public.events
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);

-- Allow admins and super_admins to update event status
CREATE POLICY "Admins can update event status"
ON public.events
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);

-- Allow admins and super_admins to delete events if needed
CREATE POLICY "Admins can delete events"
ON public.events
FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);