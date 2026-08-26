import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
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

// Quantidade de perguntas do quiz por cargo (pra calcular "parou na pergunta X de Y").
const TOTAL_QUESTIONS: Record<string, number> = {
  bdr: 10,
  sdr: 10,
  inside_sales: 10,
  closer: 10,
  empresario: 15,
};

const roleLabel: Record<string, string> = {
  bdr: "BDR",
  sdr: "SDR",
  inside_sales: "Inside Sales",
  closer: "Closer",
  empresario: "Empresário/Founder",
};

function progressInfo(r: any): { text: string; done: boolean } {
  if (r.status === "clicked_whatsapp") {
    return { text: "Finalizou e chamou no WhatsApp", done: true };
  }
  if (r.status === "completed_quiz") {
    return { text: "Completou o quiz, mas não chamou no WhatsApp", done: true };
  }
  if (r.status === "started_quiz") {
    const total = r.role ? (TOTAL_QUESTIONS[r.role] ?? null) : null;
    const answered = Array.isArray(r.answers)
      ? r.answers.filter((a: any) => a !== null && a !== undefined).length
      : 0;
    const cargo = r.role ? (roleLabel[r.role] ?? r.role) : null;
    const where = total
      ? `Parou na pergunta ${Math.min(answered + 1, total)} de ${total}`
      : "Começou o quiz e abandonou";
    return { text: cargo ? `${where} (${cargo})` : where, done: false };
  }
  return { text: "Preencheu o formulário e não abriu o quiz", done: false };
}

function AdminDiagnosticoPage() {
  const qc = useQueryClient();
  const list = useServerFn(listDiagnosticLeads);
  const nav = useNavigate();
  const { data: leads, isLoading } = useQuery({
    queryKey: ["admin-diagnostic-leads"],
    queryFn: () => list(),
  });
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");

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

  const rows = useMemo(() => {
    const all = leads ?? [];
    if (filter === "all") return all;
    return all.filter((r: any) => progressInfo(r).done === (filter === "done"));
  }, [leads, filter]);

  const pendingCount = useMemo(
    () => (leads ?? []).filter((r: any) => !progressInfo(r).done).length,
    [leads],
  );

  function exportCsv() {
    const csvRows = [
      ["nome", "email", "telefone", "cargo", "faturamento", "pontuacao", "onde_parou", "data"],
      ...(leads ?? []).map((r: any) => [
        r.nome,
        r.email,
        r.telefone,
        r.cargo ?? "",
        r.faturamento ?? "",
        r.pct != null ? `${r.pct}%` : "",
        progressInfo(r).text,
        new Date(r.created_at).toLocaleString("pt-BR"),
      ]),
    ];
    const csv = csvRows
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
            <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
              <a href="/admin/eventos" className="hover:text-gold">
                Ir para Eventos →
              </a>
              <a href="/admin/materiais" className="hover:text-gold">
                Ir para Materiais →
              </a>
            </div>
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
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            Todos ({(leads ?? []).length})
          </FilterButton>
          <FilterButton active={filter === "pending"} onClick={() => setFilter("pending")}>
            Não terminaram ({pendingCount})
          </FilterButton>
          <FilterButton active={filter === "done"} onClick={() => setFilter("done")}>
            Terminaram ({(leads ?? []).length - pendingCount})
          </FilterButton>
        </div>

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
                  <th className="p-3">Pontuação</th>
                  <th className="p-3">Onde parou / Status</th>
                  <th className="p-3">Data</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r: any) => {
                  const progress = progressInfo(r);
                  return (
                    <tr
                      key={r.id}
                      className={`border-t border-white/5 ${
                        !progress.done ? "border-l-2 border-l-amber-500/50" : ""
                      }`}
                    >
                      <td className="p-3 font-medium">
                        {r.nome}
                        {r.cargo && <div className="text-xs text-muted-foreground">{r.cargo}</div>}
                      </td>
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
                      <td className="p-3">{r.pct != null ? `${r.pct}%` : "—"}</td>
                      <td className="p-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                            progress.done
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-amber-500/15 text-amber-400"
                          }`}
                        >
                          {progress.text}
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
                  );
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-muted-foreground">
                      {filter === "all"
                        ? "Ninguém entrou no diagnóstico ainda — assim que alguém preencher o formulário no site, aparece aqui."
                        : 'Nenhum lead nesse filtro — tenta "Todos".'}
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

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-gold bg-gold/15 text-gold"
          : "border-white/10 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
