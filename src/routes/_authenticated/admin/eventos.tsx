import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  listRegistrations,
} from "@/lib/admin-events.functions";
import { Plus, LogOut, Edit3, Trash2, Users, Copy, Check, Loader2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/eventos")({
  head: () => ({
    meta: [{ title: "Admin — Eventos PO2" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminEventosPage,
});

type EventRow = any;

function AdminEventosPage() {
  const qc = useQueryClient();
  const list = useServerFn(listAllEvents);
  const nav = useNavigate();
  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: () => list(),
  });

  const [editing, setEditing] = useState<EventRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [regsFor, setRegsFor] = useState<EventRow | null>(null);

  const del = useServerFn(deleteEvent);
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Evento removido");
      qc.invalidateQueries({ queryKey: ["admin-events"] });
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
            <h1 className="mt-1 text-xl font-semibold">Eventos PO2 — Admin</h1>
            <a
              href="/admin/diagnostico"
              className="mt-1 inline-block text-xs text-muted-foreground hover:text-gold"
            >
              Ir para Leads do Diagnóstico →
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-gold-foreground"
            >
              <Plus className="size-4" /> Novo evento
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
                  <th className="p-3">Evento</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Investimento</th>
                  <th className="p-3">Inscritos</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {(events ?? []).map((e: any) => (
                  <tr key={e.id} className="border-t border-white/5">
                    <td className="p-3">
                      <div className="font-medium">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{e.slug}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          e.status === "published"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : e.status === "archived"
                              ? "bg-white/10 text-muted-foreground"
                              : "bg-yellow-500/15 text-yellow-400"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {e.price_full_cents != null || e.price_promo_cents != null
                        ? `${e.price_full_cents != null ? `R$ ${(e.price_full_cents / 100).toFixed(0)}` : ""}${
                            e.price_promo_cents != null
                              ? ` → R$ ${(e.price_promo_cents / 100).toFixed(0)}`
                              : ""
                          }`
                        : "—"}
                    </td>
                    <td className="p-3">{e.registrations?.[0]?.count ?? 0}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setRegsFor(e)}
                          className="rounded-md border border-white/10 p-2"
                          title="Ver inscritos"
                        >
                          <Users className="size-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditing(e);
                            setShowForm(true);
                          }}
                          className="rounded-md border border-white/10 p-2"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Remover evento?")) delMut.mutate(e.id);
                          }}
                          className="rounded-md border border-white/10 p-2 text-red-400"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(events ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-muted-foreground">
                      Nenhum evento ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showForm && (
        <EventFormModal
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => qc.invalidateQueries({ queryKey: ["admin-events"] })}
        />
      )}
      {regsFor && <RegistrationsModal event={regsFor} onClose={() => setRegsFor(null)} />}
    </div>
  );
}

function EventFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: EventRow | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<any>(() => ({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    subtitle: initial?.subtitle ?? "",
    description: initial?.description ?? "",
    image_url: initial?.image_url ?? "",
    location: initial?.location ?? "",
    starts_at: initial?.starts_at ? new Date(initial.starts_at).toISOString().slice(0, 16) : "",
    ends_at: initial?.ends_at ? new Date(initial.ends_at).toISOString().slice(0, 16) : "",
    price_full_cents: initial?.price_full_cents ?? "",
    price_promo_cents: initial?.price_promo_cents ?? "",
    price_note: initial?.price_note ?? "",
    meet_url: initial?.meet_url ?? "",
    whatsapp_url: initial?.whatsapp_url ?? "",
    capacity: initial?.capacity ?? null,
    status: initial?.status ?? "draft",
    certificate_signature_name: initial?.certificate_signature_name ?? "",
    certificate_signature_title: initial?.certificate_signature_title ?? "",
  }));
  const create = useServerFn(createEvent);
  const update = useServerFn(updateEvent);
  const [saving, setSaving] = useState(false);

  function set<K extends string>(k: K, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const toCents = (v: any) => {
        if (v === "" || v == null) return null;
        // Accept "297" or "297,00" or "R$ 297,00"
        const digits = String(v)
          .replace(/[^\d,.-]/g, "")
          .replace(",", ".");
        const num = Number(digits);
        if (Number.isNaN(num)) return null;
        return Math.round(num * 100);
      };
      const payload = {
        ...form,
        starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : null,
        ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
        price_full_cents: toCents(form.price_full_cents),
        price_promo_cents: toCents(form.price_promo_cents),
        capacity: form.capacity === "" || form.capacity == null ? null : Number(form.capacity),
      };
      if (isEdit) {
        await update({ data: { id: initial!.id, patch: payload } });
      } else {
        await create({ data: payload });
      }
      toast.success(isEdit ? "Evento atualizado" : "Evento criado");
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
        className="my-8 w-full max-w-3xl rounded-2xl border border-white/10 bg-background p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{isEdit ? "Editar evento" : "Novo evento"}</h2>
          <button type="button" onClick={onClose} className="text-sm text-muted-foreground">
            Fechar
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Título">
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Slug (URL)">
            <input
              required
              value={form.slug}
              onChange={(e) =>
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
              }
              className={inputCls}
            />
          </Field>
          <Field label="Subtítulo" full>
            <input
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Descrição (aceita markdown simples)" full>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={10}
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
          <Field label="Local (ex.: Online — Google Meet, ou endereço presencial)">
            <input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Online — Google Meet"
              className={inputCls}
            />
          </Field>
          <Field label="Capacidade">
            <input
              type="number"
              value={form.capacity ?? ""}
              onChange={(e) => set("capacity", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Início">
            <input
              type="datetime-local"
              value={form.starts_at}
              onChange={(e) => set("starts_at", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Fim">
            <input
              type="datetime-local"
              value={form.ends_at}
              onChange={(e) => set("ends_at", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Valor cheio (ex.: 297)">
            <input
              value={form.price_full_cents}
              onChange={(e) => set("price_full_cents", e.target.value)}
              placeholder="297"
              className={inputCls}
            />
          </Field>
          <Field label="Valor promocional (ex.: 0 para cortesia)">
            <input
              value={form.price_promo_cents}
              onChange={(e) => set("price_promo_cents", e.target.value)}
              placeholder="0"
              className={inputCls}
            />
          </Field>
          <Field label="Nota de preço (ex.: Cortesia PO2)" full>
            <input
              value={form.price_note}
              onChange={(e) => set("price_note", e.target.value)}
              placeholder="Cortesia PO2"
              className={inputCls}
            />
          </Field>
          <Field label="Link do Google Meet">
            <input
              value={form.meet_url}
              onChange={(e) => set("meet_url", e.target.value)}
              placeholder="https://meet.google.com/…"
              className={inputCls}
            />
          </Field>
          <Field label="WhatsApp (link do grupo OU número com DDD)">
            <input
              value={form.whatsapp_url}
              onChange={(e) => set("whatsapp_url", e.target.value)}
              placeholder="https://chat.whatsapp.com/… ou 5541999999999"
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
          <Field label="Assinatura do certificado (nome)">
            <input
              value={form.certificate_signature_name}
              onChange={(e) => set("certificate_signature_name", e.target.value)}
              placeholder="Matheus Staruck"
              className={inputCls}
            />
          </Field>
          <Field label="Assinatura do certificado (cargo)">
            <input
              value={form.certificate_signature_title}
              onChange={(e) => set("certificate_signature_title", e.target.value)}
              placeholder="Fundador · PO2"
              className={inputCls}
            />
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

function RegistrationsModal({ event, onClose }: { event: EventRow; onClose: () => void }) {
  const list = useServerFn(listRegistrations);
  const { data, isLoading } = useQuery({
    queryKey: ["regs", event.id],
    queryFn: () => list({ data: { eventId: event.id } }),
  });
  const [copied, setCopied] = useState(false);

  function exportCsv() {
    const rows = [
      ["nome", "email", "whatsapp", "data"],
      ...(data ?? []).map((r: any) => [r.name, r.email, r.whatsapp ?? "", r.created_at]),
    ];
    const csv = rows
      .map((r) => r.map((c: any) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `inscricoes-${event.slug}.csv`;
    a.click();
  }
  function copyEmails() {
    const emails = (data ?? []).map((r: any) => r.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4">
      <div className="my-8 w-full max-w-3xl rounded-2xl border border-white/10 bg-background p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground"
            >
              <ArrowLeft className="size-3" /> Voltar
            </button>
            <h2 className="mt-1 text-lg font-semibold">Inscrições — {event.title}</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyEmails}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs"
            >
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />} Copiar emails
            </button>
            <button
              onClick={exportCsv}
              className="rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-gold-foreground"
            >
              Exportar CSV
            </button>
          </div>
        </div>
        <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-lg border border-white/10">
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">Carregando…</div>
          ) : (data ?? []).length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">Nenhuma inscrição ainda.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-3">Nome</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">WhatsApp</th>
                  <th className="p-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {(data ?? []).map((r: any) => (
                  <tr key={r.id} className="border-t border-white/5">
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{r.whatsapp}</td>
                    <td className="p-3">{new Date(r.created_at).toLocaleString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
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
