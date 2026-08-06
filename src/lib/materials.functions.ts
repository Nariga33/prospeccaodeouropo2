import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { sendToWebhook } from "@/lib/webhook";

function publicClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  material: z.string().trim().min(2).max(120),
});

export const submitMaterialLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadSchema.parse(d))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { error } = await supabase.from("material_leads").insert({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp || null,
      material: data.material,
    });
    if (error) throw new Error(error.message);
    await sendToWebhook("material_form", data);
    return { ok: true as const };
  });
