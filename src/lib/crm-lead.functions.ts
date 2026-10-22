import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Envia o lead do Raio-X para o CRM (OxySales). Roda só no servidor: o token vem do
// segredo CRM_LEADS_TOKEN (Cloudflare) e nunca vai para o navegador nem para o repositório.
const CRM_URL = "https://www.prospeccaoodeouropo2.com/api/leads/entrada";

const schema = z.object({
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  faturamento: z.string().trim().max(60).optional(),
  url: z.string().trim().max(500).optional(),
  diagnostico: z.object({
    nota: z.number().min(0).max(100),
    pilares: z.record(z.string().max(80), z.number()),
    comecar: z.string().max(80),
    recomendacao: z.string().max(400),
    ajustes: z.array(z.string().max(160)).max(10),
  }),
});

export const enviarLeadCrm = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const token = process.env.CRM_LEADS_TOKEN;
    if (!token) {
      console.warn("[crm] CRM_LEADS_TOKEN ausente: lead não enviado ao CRM");
      return { ok: false as const };
    }
    try {
      const enviar = (corpo: unknown) =>
        fetch(CRM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(corpo),
        });
      let res = await enviar(data);
      // Se o CRM ainda não aceita o campo novo, reenvia sem ele para não perder o lead.
      if ((res.status === 400 || res.status === 422) && data.faturamento) {
        const { faturamento: _f, ...semFaturamento } = data;
        res = await enviar(semFaturamento);
      }
      if (!res.ok) {
        console.error(`[crm] recusou o lead: status ${res.status}`);
        return { ok: false as const };
      }
      return { ok: true as const };
    } catch (err) {
      console.error("[crm] falha ao enviar lead:", err instanceof Error ? err.message : err);
      return { ok: false as const };
    }
  });
