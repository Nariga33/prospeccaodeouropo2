import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type PublicEvent = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  image_url: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_free: boolean;
  price_cents: number | null;
  investment_label: string | null;
  capacity: number | null;
};

export const getPublishedEvents = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("events")
    .select(
      "id, slug, title, subtitle, description, image_url, starts_at, ends_at, is_free, price_cents, investment_label, capacity",
    )
    .eq("status", "published")
    .order("starts_at", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as PublicEvent[];
});

const registerSchema = z.object({
  eventId: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(200),
  whatsapp: z.string().trim().min(8).max(30),
});

export const registerForEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registerSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: ev, error: evErr } = await supabase
      .from("events")
      .select("id, meet_url, whatsapp_url, status")
      .eq("id", data.eventId)
      .maybeSingle();
    if (evErr) throw new Error(evErr.message);
    if (!ev || ev.status !== "published") throw new Error("Evento indisponível.");

    const { error: insErr } = await supabase.from("event_registrations").insert({
      event_id: data.eventId,
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
    });
    if (insErr && !insErr.message.toLowerCase().includes("duplicate")) {
      throw new Error(insErr.message);
    }

    return {
      ok: true as const,
      meet_url: ev.meet_url,
      whatsapp_url: ev.whatsapp_url,
    };
  });
