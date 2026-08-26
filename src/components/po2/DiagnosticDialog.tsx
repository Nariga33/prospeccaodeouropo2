import { useState, type ReactNode } from "react";
import { z } from "zod";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createDiagnosticLead } from "@/lib/diagnostic-leads.functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  cargo: z.string().trim().min(2, "Informe seu cargo").max(80),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

interface Props {
  trigger: ReactNode;
  plan?: string;
}

export function DiagnosticDialog({ trigger, plan }: Props) {
  const navigate = useNavigate();
  const createLead = useServerFn(createDiagnosticLead);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<FormData>({
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormData;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const payload = { ...parsed.data, plan };
    sessionStorage.setItem("po2-lead", JSON.stringify(payload));
    try {
      const { id } = await createLead({ data: { ...parsed.data, plan } });
      sessionStorage.setItem("po2-lead-id", id);
    } catch {
      // Não bloqueia o fluxo se o registro falhar — a pessoa segue pro diagnóstico normalmente.
    }
    setOpen(false);
    setSubmitting(false);
    setData({ nome: "", cargo: "", email: "", telefone: "" });
    navigate({ to: "/diagnostico" });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md border-white/10 bg-card text-foreground">
        <DialogHeader>
          <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            <Phone className="size-3" /> Diagnóstico gratuito
          </div>
          <DialogTitle className="font-display text-3xl text-foreground">
            Vamos olhar sua operação outbound.
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            4 campos rápidos e você já entra direto no diagnóstico.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <Field label="Nome" error={errors.nome}>
            <Input
              value={data.nome}
              onChange={(e) => update("nome", e.target.value)}
              placeholder="Seu nome completo"
              className="border-white/10 bg-background/60"
              maxLength={100}
              autoFocus
            />
          </Field>
          <Field label="Cargo" error={errors.cargo}>
            <Input
              value={data.cargo}
              onChange={(e) => update("cargo", e.target.value)}
              placeholder="Ex.: CEO, Diretor Comercial, BDR..."
              className="border-white/10 bg-background/60"
              maxLength={80}
            />
          </Field>
          <Field label="E-mail" error={errors.email}>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="voce@empresa.com"
              className="border-white/10 bg-background/60"
              maxLength={255}
            />
          </Field>
          <Field label="Telefone" error={errors.telefone}>
            <Input
              type="tel"
              value={data.telefone}
              onChange={(e) => update("telefone", e.target.value)}
              placeholder="(11) 99999-0000"
              className="border-white/10 bg-background/60"
              maxLength={20}
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98] disabled:opacity-60"
          >
            {submitting ? "Abrindo..." : "Iniciar diagnóstico"}
            {!submitting && <ArrowRight className="size-4" />}
          </button>
          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Resposta em até 24h úteis
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
