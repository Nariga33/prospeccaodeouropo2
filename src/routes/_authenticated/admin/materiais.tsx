import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { listMaterialLeads, deleteMaterialLead } from "@/lib/admin-materials.functions";
import { LogOut, Trash2, Copy, Check, Loader2, Download } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/materiais")({
  head: () => ({
    meta: [{ title: "Admin — Materiais PO2" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminMateriaisPage,
});

function AdminMateriaisPage() {
  const qc = useQueryClient();
  const list = useServerFn(listMaterialLeads);
  const nav = useNavigate();
  const { data: leads, isLoading } = useQuery({
    queryKey: ["admin-material-leads"],
    queryFn: () => list(),
  });
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const del = useServerFn(deleteMaterialLead);
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Lead removido");
      qc.invalidateQueries({ queryKey: ["admin-material-leads"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  async function logout() {
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }

  const materials = useMemo(() => {
    const set = new Set((leads ?? []).map((r: any) => r.material));
    return Array.from(set);
  }, [leads]);

  const rows = useMemo(() => {
    const all = leads ?? [];
    if (filter === "all") return all;
    return all.filter((r: any) => r.material === filter);
  }, [leads, filter]);

  function exportCsv() {
    const csvRows = [
      ["nome", "email", "whatsapp", "material", "data"],
      ...(leads ?? []).map((r: any) => [
        r.name,
        r.email,
        r.whatsapp ?? "",
        r.material,
        new Date(r.created_at).toLocaleString("pt-BR"),
      ]),
    ];
    const csv = csvRows
      .map((r) => r.map((c: any) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leads-materiais.csv";
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
            <h1 className="mt-1 text-xl font-semibold">Materiais gratuitos — Leads</h1>
            <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
              <a href="/admin/eventos" className="hover:text-gold">
                Ir para Eventos →
              </a>
              <a href="/admin/diagnostico" className="hover:text-gold">
                Ir para Diagnóstico →
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
          {materials.map((m) => (
            <FilterButton key={m} active={filter === m} onClick={() => setFilter(m)}>
              {m} ({(leads ?? []).filter((r: any) => r.material === m).length})
            </FilterButton>
          ))}
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
                  <th className="p-3">WhatsApp</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Material</th>
                  <th className="p-3">Data</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r: any) => (
                  <tr key={r.id} className="border-t border-white/5">
                    <td className="p-3 font-medium">{r.name}</td>
                    <td className="p-3">
                      {r.whatsapp ? (
                        <a
                          href={`https://wa.me/55${String(r.whatsapp).replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gold hover:underline"
                        >
                          {r.whatsapp}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">
                      <span className="inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs">
                        {r.material}
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
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-muted-foreground">
                      {filter === "all"
                        ? "Ninguém baixou material ainda — assim que alguém enviar o formulário na página de materiais, aparece aqui."
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
