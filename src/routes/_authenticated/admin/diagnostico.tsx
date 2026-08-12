import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { listDiagnosticLeads, deleteDiagnosticLead } from "@/lib/admin-leads.functions";
import { LogOut, Trash2, Copy, Check, Loader2, Download } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/diagnostico")({
  head: () => ({
    meta: [{ title: "Admin — Diagnóstico PO2" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminDiagnosticoPage,
});

const statusLabel: Record<string, string> = {
  form_only: "Só preencheu o formulário",
  started_quiz: "Começou o quiz",
  completed_quiz: "Completou o quiz",
  clicked_whatsapp: "Clicou no WhatsApp",
};

function AdminDiagnosticoPage() {
  const qc = useQueryClient();
  const list = useServerFn(listDiagnosticLeads);
  const nav = useNavigate();
  const { data: leads, isLoading } = useQuery({
    queryKey: ["admin-diagnostic-leads"],
    queryFn: () => list(),
  });
  const [copied, setCopied] = useState(false);

  const del = useServerFn(deleteDiagnosticLead);
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Lead removido");
      qc.invalidateQueries({ queryKey: ["admin-diagnostic-leads"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  async function logout() {
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }

  function exportCsv() {
    const rows = [
      ["nome", "email", "telefone", "cargo", "faturamento", "pontuacao", "status", "data"],
      ...(leads ?? []).map((r: any) => [
        r.nome,
        r.email,
        r.telefone,
        r.cargo ?? "",
        r.faturamento ?? "",
        r.pct != null ? `${r.pct}%` : "",
        statusLabel[r.status] ?? r.status,
        new Date(r.created_at).toLocaleString("pt-BR"),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c: any) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leads-diagnostico.csv";
    a.click();
  }

  function copyEmails() {
    const emails = (leads ?? []).map((r: any) => r.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <Link to="/" className="text-xs text-muted-foreground hover:text-gold">
              ← Ver site
            </Link>
            <h1 className="mt-1 text-xl font-semibold">Diagnóstico PO2 — Leads</h1>
            <a
              href="/admin/eventos"
              className="mt-1 inline-block text-xs text-muted-foreground hover:text-gold"
            >
              Ir para Eventos →
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyEmails}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copiar e-mails
            </button>
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-gold-foreground"
            >
              <Download className="size-4" /> Exportar CSV
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
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Nome</th>
                  <th className="p-3">Telefone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Cargo</th>
                  <th className="p-3">Pontuação</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Data</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {(leads ?? []).map((r: any) => (
                  <tr key={r.id} className="border-t border-white/5">
                    <td className="p-3 font-medium">{r.nome}</td>
                    <td className="p-3">
                      <a
                        href={`https://wa.me/55${String(r.telefone).replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gold hover:underline"
                      >
                        {r.telefone}
                      </a>
                    </td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{r.cargo ?? "—"}</td>
                    <td className="p-3">{r.pct != null ? `${r.pct}%` : "—"}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                        {statusLabel[r.status] ?? r.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString("pt-BR")}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            if (confirm("Remover esse lead?")) delMut.mutate(r.id);
                          }}
                          className="rounded-md border border-white/10 p-2 text-red-400"
                          title="Remover"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(leads ?? []).length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-muted-foreground">
                      Ninguém entrou no diagnóstico ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
