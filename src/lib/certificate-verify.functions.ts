import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

const schema = z.object({
  token: z.string().trim().min(8).max(64),
});

interface VerifyResult {
  valid: boolean;
  name?: string;
  eventTitle?: string;
  date?: string;
  reason?: "not_found" | "not_finished";
}

export const verifyCertificate = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }): Promise<VerifyResult> => {
    const supabase = publicClient();
    const { data: reg, error } = await supabase
      .from("event_registrations")
      .select("name, events(title, starts_at, ends_at)")
      .eq("certificate_token", data.token.trim())
      .maybeSingle();

    if (error || !reg || !reg.events) {
      return { valid: false, reason: "not_found" };
    }

    const ev = reg.events as unknown as {
      title: string;
      starts_at: string | null;
      ends_at: string | null;
    };

    if (ev.ends_at && new Date(ev.ends_at).getTime() > Date.now()) {
      return { valid: false, reason: "not_finished" };
    }

    return {
      valid: true,
      name: reg.name,
      eventTitle: ev.title,
      date: ev.starts_at
        ? new Date(ev.starts_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : undefined,
    };
  });
