
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS price_full_cents integer,
  ADD COLUMN IF NOT EXISTS price_promo_cents integer,
  ADD COLUMN IF NOT EXISTS price_note text;

ALTER TABLE public.event_registrations
  ADD COLUMN IF NOT EXISTS certificate_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS certificate_token text UNIQUE DEFAULT encode(gen_random_bytes(18), 'hex');

-- Backfill tokens for rows that already existed before the default
UPDATE public.event_registrations
   SET certificate_token = encode(gen_random_bytes(18), 'hex')
 WHERE certificate_token IS NULL;

-- Public: allow reading a single registration by its certificate token (email delivery link)
CREATE POLICY "Public reads registration by token"
  ON public.event_registrations
  FOR SELECT
  TO anon, authenticated
  USING (certificate_token IS NOT NULL);
