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

export const listAllCourses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as any);
    const { data, error } = await (context as any).supabase
      .from("courses")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data as any[];
  });

const looseUrl = z.string().trim().max(1000).optional().nullable().or(z.literal(""));

const courseSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().max(4000).default(""),
  image_url: looseUrl,
  platform: z.string().trim().max(80).default(""),
  link_url: z.string().trim().max(1000).default(""),
  cta_label: z.string().trim().max(60).default("Acessar curso"),
  sort_order: z.number().int().default(0),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

function normalize(input: any) {
  const empty = (v: any) => (v === "" ? null : v);
  return { ...input, image_url: empty(input.image_url) };
}

export const createCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => courseSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { data: row, error } = await (context as any).supabase
      .from("courses")
      .insert(normalize(data))
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().uuid(), patch: courseSchema.partial() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { data: row, error } = await (context as any).supabase
      .from("courses")
      .update(normalize(data.patch))
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { error } = await (context as any).supabase.from("courses").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
