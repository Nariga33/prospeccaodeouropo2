import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const listDiagnosticLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as any);
    const { data, error } = await (context as any).supabase
      .from("diagnostic_leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data as any[];
  });

export const deleteDiagnosticLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { error } = await (context as any).supabase
      .from("diagnostic_leads")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
