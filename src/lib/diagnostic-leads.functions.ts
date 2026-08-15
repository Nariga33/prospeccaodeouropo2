import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { sendToWebhook } from "@/lib/webhook";

// Roda 100% server-side (nunca vai pro bundle do navegador) — usa a service role
// pra poder gravar E ler de volta o id (.select().single()) sem depender de RLS/GRANT
// pro papel anônimo, que nunca teve permissão de SELECT nessa tabela.
async function adminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

const createSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  cargo: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(160),
  telefone: z.string().trim().min(6).max(40),
  faturamento: z.string().trim().max(80).optional(),
  ticket: z.string().trim().max(40).optional(),
  metaContratos: z.string().trim().max(40).optional(),
  plan: z.string().trim().max(120).optional(),
});

export const createDiagnosticLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => createSchema.parse(d))
  .handler(async ({ data }) => {
    const supabase = await adminClient();
    const { data: row, error } = await supabase
      .from("diagnostic_leads")
      .insert({
        nome: data.nome,
        cargo: data.cargo || null,
        email: data.email,
        telefone: data.telefone,
        faturamento: data.faturamento || null,
        ticket: data.ticket || null,
        meta_contratos: data.metaContratos || null,
        plan: data.plan || null,
        status: "form_only",
      })
      .select("id")
      .single();
    if (error) {
      console.error("[diagnostic_leads] falha ao criar lead:", error.message);
      throw new Error(error.message);
    }
    await sendToWebhook("diagnostico_form", {
      ...data,
      name: data.nome,
      email: data.email,
      phone: data.telefone,
      id: row.id,
    });
    return { id: row.id as string };
  });

const updateSchema = z.object({
  id: z.string().uuid(),
  role: z.string().trim().max(40).optional(),
  score: z.number().int().min(0).optional(),
  maxScore: z.number().int().min(0).optional(),
  pct: z.number().int().min(0).max(100).optional(),
  answers: z.unknown().optional(),
  status: z.enum(["form_only", "started_quiz", "completed_quiz", "clicked_whatsapp"]),
});

export const updateDiagnosticLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => updateSchema.parse(d))
  .handler(async ({ data }) => {
    const supabase = await adminClient();
    const patch: Database["public"]["Tables"]["diagnostic_leads"]["Update"] = {
      status: data.status,
      updated_at: new Date().toISOString(),
    };
    if (data.role !== undefined) patch.role = data.role;
    if (data.score !== undefined) patch.score = data.score;
    if (data.maxScore !== undefined) patch.max_score = data.maxScore;
    if (data.pct !== undefined) patch.pct = data.pct;
    if (data.answers !== undefined) patch.answers = data.answers as never;

    const { error } = await supabase.from("diagnostic_leads").update(patch).eq("id", data.id);
    if (error) {
      console.error("[diagnostic_leads] falha ao atualizar lead:", error.message);
      throw new Error(error.message);
    }
    return { ok: true as const };
  });
