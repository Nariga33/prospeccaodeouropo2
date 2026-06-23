import { useState, type ReactNode } from "react";
import { z } from "zod";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const WHATSAPP_NUMBER = "5551989218827";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  faturamento: z.string().min(1, "Selecione uma faixa"),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

const FATURAMENTO = [
  "Até R$ 50 mil/mês",
  "R$ 50 mil – R$ 200 mil/mês",
  "R$ 200 mil – R$ 500 mil/mês",
  "R$ 500 mil – R$ 1 milhão/mês",
  "Acima de R$ 1 milhão/mês",
];

interface Props {
  trigger: ReactNode;
  plan?: string;
}

export function DiagnosticDialog({ trigger, plan }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<FormData>({ nome: "", email: "", telefone: "", faturamento: "" });
  const [errors, setErrors] = useState<Errors>({});

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
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
    const lines = [
      "Olá! Quero realizar o diagnóstico gratuito da PO2.",
      "",
      `Nome: ${parsed.data.nome}`,
      `E-mail: ${parsed.data.email}`,
      `Telefone: ${parsed.data.telefone}`,
      `Faturamento: ${parsed.data.faturamento}`,
    ];
    if (plan) lines.push(`Plano de interesse: ${plan}`);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setData({ nome: "", email: "", telefone: "", faturamento: "" });
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
            Preencha os dados abaixo. Você será direcionado ao WhatsApp para iniciarmos o diagnóstico.
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
          <Field label="Faturamento mensal" error={errors.faturamento}>
            <Select value={data.faturamento} onValueChange={(v) => update("faturamento", v)}>
              <SelectTrigger className="border-white/10 bg-background/60">
                <SelectValue placeholder="Selecione a faixa" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-card">
                {FATURAMENTO.map((f) => (
                  <SelectItem key={f} value={f}>{f}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]"
          >
            Enviar e abrir WhatsApp <ArrowRight className="size-4" />
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
      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
