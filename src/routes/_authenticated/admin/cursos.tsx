import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/lib/admin-courses.functions";
import { Plus, LogOut, Edit3, Trash2, Loader2, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/cursos")({
  head: () => ({ meta: [{ title: "Admin — Cursos PO2" }, { name: "robots", content: "noindex" }] }),
  component: AdminCursosPage,
});

type CourseRow = any;

function AdminCursosPage() {
  const qc = useQueryClient();
  const list = useServerFn(listAllCourses);
  const nav = useNavigate();
  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: () => list(),
  });

  const [editing, setEditing] = useState<CourseRow | null>(null);
  const [showForm, setShowForm] = useState(false);

  const del = useServerFn(deleteCourse);
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Curso removido");
      qc.invalidateQueries({ queryKey: ["admin-courses"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  async function logout() {
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <Link to="/" className="text-xs text-muted-foreground hover:text-gold">
              ← Ver site
            </Link>
            <h1 className="mt-1 text-xl font-semibold">Cursos PO2 — Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/admin/eventos"
              className="rounded-full border border-white/10 px-4 py-2 text-sm"
            >
              Ir para Eventos
            </Link>
            <button
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-gold-foreground"
            >
              <Plus className="size-4" /> Novo curso
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm"
            >
              <LogOut className="size-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Carregando…
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Curso</th>
                  <th className="p-3">Plataforma</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Ordem</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {(courses ?? []).map((c: any) => (
                  <tr key={c.id} className="border-t border-white/5">
                    <td className="p-3">
                      <div className="flex items-center gap-2 font-medium">
                        <GraduationCap className="size-4 text-gold" /> {c.title}
                      </div>
                    </td>
                    <td className="p-3">{c.platform || "—"}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          c.status === "published"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : c.status === "archived"
                              ? "bg-white/10 text-muted-foreground"
                              : "bg-yellow-500/15 text-yellow-400"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3">{c.sort_order}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditing(c);
                            setShowForm(true);
                          }}
                          className="rounded-md border border-white/10 p-2"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Remover curso?")) delMut.mutate(c.id);
                          }}
                          className="rounded-md border border-white/10 p-2 text-red-400"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(courses ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-muted-foreground">
                      Nenhum curso ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showForm && (
        <CourseFormModal
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => qc.invalidateQueries({ queryKey: ["admin-courses"] })}
        />
      )}
    </div>
  );
}

function CourseFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: CourseRow | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<any>(() => ({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    image_url: initial?.image_url ?? "",
    platform: initial?.platform ?? "",
    link_url: initial?.link_url ?? "",
    cta_label: initial?.cta_label ?? "Acessar curso",
    sort_order: initial?.sort_order ?? 0,
    status: initial?.status ?? "draft",
  }));
  const create = useServerFn(createCourse);
  const update = useServerFn(updateCourse);
  const [saving, setSaving] = useState(false);

  function set<K extends string>(k: K, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, sort_order: Number(form.sort_order) || 0 };
      if (isEdit) {
        await update({ data: { id: initial!.id, patch: payload } });
      } else {
        await create({ data: payload });
      }
      toast.success(isEdit ? "Curso atualizado" : "Curso criado");
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4">
      <form
        onSubmit={submit}
        className="my-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-background p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{isEdit ? "Editar curso" : "Novo curso"}</h2>
          <button type="button" onClick={onClose} className="text-sm text-muted-foreground">
            Fechar
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Título" full>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Descrição" full>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={5}
              className={inputCls}
            />
          </Field>
          <Field label="URL da imagem">
            <input
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://…"
              className={inputCls}
            />
          </Field>
          <Field label="Plataforma">
            <input
              value={form.platform}
              onChange={(e) => set("platform", e.target.value)}
              placeholder="Hotmart, Udemy…"
              className={inputCls}
            />
          </Field>
          <Field label="Link do curso" full>
            <input
              value={form.link_url}
              onChange={(e) => set("link_url", e.target.value)}
              placeholder="https://…"
              className={inputCls}
            />
          </Field>
          <Field label="Texto do botão">
            <input
              value={form.cta_label}
              onChange={(e) => set("cta_label", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Ordem de exibição">
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => set("sort_order", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
              className={inputCls}
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-4 py-2 text-sm"
          >
            Cancelar
          </button>
          <button
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-bold text-gold-foreground disabled:opacity-60"
          >
            {saving && <Loader2 className="size-4 animate-spin" />} Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-gold/60";

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
