import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Download, FileText, Loader2, X } from "lucide-react";
import { submitMaterialLead } from "@/lib/materials.functions";

interface MaterialProps {
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  desc: string;
  fileUrl: string;
  fileName: string;
  ctaLabel: string;
}

export function MaterialCard({
  icon: Icon,
  tag,
  title,
  desc,
  fileUrl,
  fileName,
  ctaLabel,
}: MaterialProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/70 transition-all hover:-translate-y-1 hover:border-gold/40">
        <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-gold/10 via-background to-black">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(197,160,89,0.25)_1px,transparent_1px)] [background-size:18px_18px]" />
          <span className="relative flex size-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <Icon className="size-9" />
          </span>
          <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold backdrop-blur">
            {tag}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{desc}</p>
          <button
            onClick={() => setOpen(true)}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]"
          >
            <Download className="size-3.5" /> {ctaLabel}
          </button>
        </div>
      </div>

      {open && (
        <LeadGate
          material={title}
          fileUrl={fileUrl}
          fileName={fileName}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function LeadGate({
  material,
  fileUrl,
  fileName,
  onClose,
}: {
  material: string;
  fileUrl: string;
  fileName: string;
  onClose: () => void;
}) {
  const submit = useServerFn(submitMaterialLead);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await submit({ data: { name, email, whatsapp: "", material } });
      setDone(true);
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      toast.error("Não deu pra registrar agora — tenta de novo em instantes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-gold/30 bg-background p-7">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            Material gratuito
          </span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>

        {done ? (
          <div className="mt-6 text-center">
            <h3 className="font-display text-2xl text-foreground">Baixando agora!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Se o download não começar sozinho, clica no botão abaixo.
            </p>
            <a
              href={fileUrl}
              download={fileName}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-gold-foreground"
            >
              <Download className="size-3.5" /> Baixar de novo
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4">
            <h3 className="font-display text-xl text-foreground">{material}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Preenche rapidinho pra liberar o download.
            </p>
            <div className="mt-5 space-y-3">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-gold/60"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-gold/60"
              />
            </div>
            <button
              disabled={saving}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-gold-foreground disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileText className="size-4" />
              )}
              {saving ? "Liberando…" : "Quero baixar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
