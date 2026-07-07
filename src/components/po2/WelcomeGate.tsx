import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, User, Sparkles, CheckCircle2, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useVisitorProfile, type VisitorTrack } from "@/hooks/use-visitor-profile";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";

type Step = "type" | "revenue" | "final";

export function WelcomeGate() {
  const { profile, ready, setProfile, markDismissed } = useVisitorProfile();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("type");
  const [track, setTrack] = useState<VisitorTrack | undefined>();
  const [isPessoa, setIsPessoa] = useState(false);

  useEffect(() => {
    if (!ready || profile) return;
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, [ready, profile]);

  function handleClose(next: boolean) {
    if (!next) markDismissed();
    setOpen(next);
  }

  function pickEmpresa() {
    setIsPessoa(false);
    setStep("revenue");
  }

  function pickPessoa() {
    setIsPessoa(true);
    setProfile({ type: "pessoa" });
    setStep("final");
  }

  function pickRevenue(t: VisitorTrack) {
    setTrack(t);
    setProfile({ type: "empresa", track: t });
    setStep("final");
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg border-white/10 bg-card text-foreground">
        <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
          <Sparkles className="size-3" /> Bem-vindo à PO2
        </div>

        {step === "type" && (
          <>
            <DialogTitle className="font-display text-3xl leading-tight text-foreground">
              Como podemos te ajudar melhor?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Personalizamos sua jornada em 10 segundos.
            </DialogDescription>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ChoiceCard
                icon={<Building2 className="size-6" />}
                title="Sou Empresário(a)"
                subtitle="Quero mais reuniões e vendas B2B"
                onClick={pickEmpresa}
              />
              <ChoiceCard
                icon={<User className="size-6" />}
                title="Pessoa Física"
                subtitle="Quero aprender e evoluir na área"
                onClick={pickPessoa}
              />
            </div>
          </>
        )}

        {step === "revenue" && (
          <>
            <DialogTitle className="font-display text-3xl leading-tight text-foreground">
              Qual o faturamento da empresa?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Recomendamos a trilha ideal para o seu momento.
            </DialogDescription>
            <div className="mt-4 grid gap-3">
              <ChoiceCard
                icon={<Sparkles className="size-6" />}
                title="Até R$ 50 mil/mês"
                subtitle="Trilha recomendada: Mentoria"
                onClick={() => pickRevenue("mentoria")}
              />
              <ChoiceCard
                icon={<CheckCircle2 className="size-6" />}
                title="Acima de R$ 50 mil/mês"
                subtitle="Trilha recomendada: Assessoria"
                onClick={() => pickRevenue("assessoria")}
              />
            </div>
            <button
              onClick={() => setStep("type")}
              className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              ← Voltar
            </button>
          </>
        )}

        {step === "final" && (
          <>
            <DialogTitle className="font-display text-3xl leading-tight text-foreground">
              Garanta já o seu acesso.
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {isPessoa
                ? "Reserve sua vaga no próximo evento gratuito e comece sua evolução."
                : track === "mentoria"
                ? "Você está no perfil ideal para nossa Mentoria. Faça um diagnóstico gratuito e receba um plano de 90 dias."
                : "Você está no perfil ideal para nossa Assessoria. Faça um diagnóstico gratuito e vamos mapear sua operação outbound."}
            </DialogDescription>

            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                {isPessoa ? "Vaga em evento presencial/online" : "Diagnóstico ao vivo com especialista"}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                {isPessoa ? "Certificado de participação" : "Relatório de gargalos + plano de 90 dias"}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                Sem compromisso — resposta em até 24h úteis
              </li>
            </ul>

            <div className="mt-5 flex flex-col gap-2">
              {isPessoa ? (
                <Link
                  to="/eventos"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]"
                >
                  <Calendar className="size-4" /> Ver próximos eventos
                </Link>
              ) : (
                <DiagnosticDialog
                  plan={track}
                  trigger={
                    <button
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]"
                    >
                      Quero meu diagnóstico gratuito <ArrowRight className="size-4" />
                    </button>
                  }
                />
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Explorar o site primeiro
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ChoiceCard({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-background/50 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:bg-background/80 hover:shadow-[0_0_30px_rgba(197,160,89,0.15)]"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
        {icon}
      </span>
      <div>
        <div className="font-display text-lg text-foreground">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <ArrowRight className="ml-auto size-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-gold" />
    </button>
  );
}
