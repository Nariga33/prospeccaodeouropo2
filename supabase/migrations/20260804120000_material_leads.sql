-- Leads capturados na página de Materiais (iscas digitais)
CREATE TABLE public.material_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  whatsapp text,
  material text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.material_leads TO anon, authenticated;
GRANT SELECT, DELETE ON public.material_leads TO authenticated;
GRANT ALL ON public.material_leads TO service_role;
ALTER TABLE public.material_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone submits a material lead"
  ON public.material_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins read material leads"
  ON public.material_leads
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete material leads"
  ON public.material_leads
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
