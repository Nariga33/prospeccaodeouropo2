-- O insert/update do diagnóstico passou a rodar via service role no servidor
-- (o INSERT ... RETURNING id precisava de SELECT, que o papel anon nunca teve —
-- por isso nenhum lead estava sendo salvo). Como o app não depende mais de
-- escrita direta do anon nessa tabela, fecha esse caminho por segurança
-- (evita inserts/updates arbitrários direto pela API pública).

REVOKE INSERT, UPDATE ON public.diagnostic_leads FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone submits a diagnostic lead" ON public.diagnostic_leads;
DROP POLICY IF EXISTS "Anyone updates their diagnostic lead progress" ON public.diagnostic_leads;
