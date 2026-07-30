import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { toWhatsappUrl } from "./whatsapp";

function publicClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export type PublicEvent = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  image_url: string | null;
  location: string | null;
  starts_at: string | null;
  ends_at: string | null;
  price_full_cents: number | null;
  price_promo_cents: number | null;
  price_note: string | null;
  capacity: number | null;
  whatsapp_url: string | null;
};

export const getPublishedEvents = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("events")
    .select(
      "id, slug, title, subtitle, description, image_url, location, starts_at, ends_at, price_full_cents, price_promo_cents, price_note, capacity, whatsapp_url",
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
      .select("id, meet_url, whatsapp_url, status, title, starts_at, ends_at")
      .eq("id", data.eventId)
      .maybeSingle();
    if (evErr) throw new Error(evErr.message);
    if (!ev || ev.status !== "published") throw new Error("Evento indisponível.");

    // Insert; if already registered, fetch existing row to return the same token.
    let registrationId: string | null = null;
    let certificateToken: string | null = null;

    const { data: inserted, error: insErr } = await supabase
      .from("event_registrations")
      .insert({
        event_id: data.eventId,
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
      })
      .select("id, certificate_token")
      .maybeSingle();

    if (insErr) {
      if (!insErr.message.toLowerCase().includes("duplicate")) throw new Error(insErr.message);
    } else if (inserted) {
      registrationId = inserted.id;
      certificateToken = inserted.certificate_token;
    }

    if (!registrationId) {
      const { data: existing } = await supabase
        .from("event_registrations")
        .select("id, certificate_token")
        .eq("event_id", data.eventId)
        .eq("email", data.email)
        .maybeSingle();
      registrationId = existing?.id ?? null;
      certificateToken = existing?.certificate_token ?? null;
    }

    return {
      ok: true as const,
      registration_id: registrationId,
      certificate_token: certificateToken,
      meet_url: toWhatsappUrl(ev.meet_url) ? ev.meet_url : ev.meet_url, // meet not normalized
      whatsapp_url: toWhatsappUrl(ev.whatsapp_url),
      event: {
        title: ev.title,
        starts_at: ev.starts_at,
        ends_at: ev.ends_at,
      },
    };
  });

// Look up a certificate by token → used by the download form on the site.
export const findCertificateByEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({ eventId: z.string().uuid(), email: z.string().trim().toLowerCase().email() })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: row } = await supabase
      .from("event_registrations")
      .select("certificate_token")
      .eq("event_id", data.eventId)
      .eq("email", data.email)
      .maybeSingle();
    return { token: row?.certificate_token ?? null };
  });
