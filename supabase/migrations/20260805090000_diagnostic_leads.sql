-- Leads do Diagnóstico — grava assim que o formulário inicial é enviado,
-- e vai atualizando conforme a pessoa avança (ou abandona) o questionário.
CREATE TABLE public.diagnostic_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cargo text,
  email text NOT NULL,
  telefone text NOT NULL,
  faturamento text,
  ticket text,
  meta_contratos text,
  plan text,
  role text,
  score int,
  max_score int,
  pct int,
  answers jsonb,
  status text NOT NULL DEFAULT 'form_only',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT, UPDATE ON public.diagnostic_leads TO anon, authenticated;
GRANT SELECT, DELETE ON public.diagnostic_leads TO authenticated;
GRANT ALL ON public.diagnostic_leads TO service_role;
ALTER TABLE public.diagnostic_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone submits a diagnostic lead"
  ON public.diagnostic_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone updates their diagnostic lead progress"
  ON public.diagnostic_leads
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins read diagnostic leads"
  ON public.diagnostic_leads
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete diagnostic leads"
  ON public.diagnostic_leads
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
