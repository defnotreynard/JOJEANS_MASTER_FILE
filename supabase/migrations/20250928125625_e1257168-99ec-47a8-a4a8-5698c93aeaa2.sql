-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION generate_event_reference()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'EVT-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
END;
$$;