ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS certificate_signature_name text,
  ADD COLUMN IF NOT EXISTS certificate_signature_title text;
