import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as {
          email?: string;
          password?: string;
        };
        const email = (body.email || "matheusstaruck@po2.com").toLowerCase();
        const password = body.password || "mjunhy123";

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // If any admin already exists, no-op.
        const { count } = await supabaseAdmin
          .from("user_roles")
          .select("id", { count: "exact", head: true })
          .eq("role", "admin");
        if ((count ?? 0) > 0) {
          return Response.json({ ok: true, message: "Admin já existe." });
        }

        // Create (or reuse) auth user.
        let userId: string | null = null;
        const created = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });
        if (created.error) {
          if (!/already/i.test(created.error.message)) {
            return Response.json({ ok: false, error: created.error.message }, { status: 400 });
          }
          // Find existing user by email.
          const list = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
          const found = list.data.users.find(
            (u) => (u.email ?? "").toLowerCase() === email,
          );
          if (!found) {
            return Response.json({ ok: false, error: "Usuário existe mas não encontrado" }, { status: 500 });
          }
          userId = found.id;
        } else {
          userId = created.data.user!.id;
        }

        const { error: roleErr } = await supabaseAdmin
          .from("user_roles")
          .insert({ user_id: userId!, role: "admin" as any });
        if (roleErr && !/duplicate/i.test(roleErr.message)) {
          return Response.json({ ok: false, error: roleErr.message }, { status: 500 });
        }

        return Response.json({ ok: true, email, userId });
      },
    },
  },
});
