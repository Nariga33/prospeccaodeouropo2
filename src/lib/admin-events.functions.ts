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

export const listAllEvents = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as any);
    const { data, error } = await (context as any).supabase
      .from("events")
      .select("*, registrations:event_registrations(count)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data as any[];
  });

export const getEventById = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { data: row, error } = await (context as any).supabase
      .from("events")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

const eventSchema = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/, "slug: minúsculas, números e hífen"),
  title: z.string().trim().min(2).max(200),
  subtitle: z.string().trim().max(300).optional().nullable(),
  description: z.string().max(10000).default(""),
  image_url: z.string().trim().url().max(1000).optional().nullable().or(z.literal("")),
  starts_at: z.string().optional().nullable().or(z.literal("")),
  ends_at: z.string().optional().nullable().or(z.literal("")),
  is_free: z.boolean().default(true),
  price_cents: z.number().int().nonnegative().optional().nullable(),
  investment_label: z.string().trim().max(80).optional().nullable(),
  meet_url: z.string().trim().url().max(1000).optional().nullable().or(z.literal("")),
  whatsapp_url: z.string().trim().url().max(1000).optional().nullable().or(z.literal("")),
  capacity: z.number().int().positive().optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

function normalize(input: any) {
  const empty = (v: any) => (v === "" ? null : v);
  return {
    ...input,
    subtitle: empty(input.subtitle),
    image_url: empty(input.image_url),
    starts_at: empty(input.starts_at),
    ends_at: empty(input.ends_at),
    meet_url: empty(input.meet_url),
    whatsapp_url: empty(input.whatsapp_url),
    investment_label: empty(input.investment_label),
  };
}

export const createEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => eventSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { data: row, error } = await (context as any).supabase
      .from("events")
      .insert(normalize(data))
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().uuid(), patch: eventSchema.partial() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { data: row, error } = await (context as any).supabase
      .from("events")
      .update(normalize(data.patch))
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { error } = await (context as any).supabase.from("events").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const listRegistrations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { eventId: string }) => z.object({ eventId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { data: rows, error } = await (context as any).supabase
      .from("event_registrations")
      .select("*")
      .eq("event_id", data.eventId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows as any[];
  });
