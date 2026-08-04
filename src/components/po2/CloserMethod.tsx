import { useState } from "react";
import {
  ClipboardList,
  Gauge,
  ShieldCheck,
  Percent,
  Repeat,
  FileCheck,
  BarChart3,
} from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const CLOSER_PHASES = [
  {
    key: "fechamento",
    label: "Fechamento",
    tagline: "Do interesse confirmado à decisão",
    steps: [
      {
        n: "01",
        icon: ClipboardList,
        t: "Roteiro de Fechamento",
        d: "Etapas claras do 'interesse confirmado' até a assinatura — não é 'vamos ver o que o cliente decide'.",
      },
      {
        n: "02",
        icon: Gauge,
        t: "Critério de Avanço",
        d: "Sinais objetivos pra saber quando fechar ou continuar nutrindo — não é instinto.",
      },
    ],
  },
  {
    key: "negociacao",
    label: "Negociação",
    tagline: "Segurança na hora de discutir preço e prazo",
    steps: [
      {
        n: "03",
        icon: ShieldCheck,
        t: "Objeções Finais",
        d: "Preço, prazo e autoridade — resposta pensada antes da negociação esquentar.",
      },
      {
        n: "04",
        icon: Percent,
        t: "Margem Definida",
        d: "Até onde ceder decidido antes da call — sem decisão de improviso.",
      },
      {
        n: "05",
        icon: Repeat,
        t: "Follow-up Ativo",
        d: "Proposta parada recebe cadência de reengajamento — não fica esfriando.",
      },
    ],
  },
  {
    key: "entrega",
    label: "Entrega",
    tagline: "Do 'sim' à entrega, sem ruído",
    steps: [
      {
        n: "06",
        icon: FileCheck,
        t: "Onboarding Padrão",
        d: "Contrato e entrega seguem processo replicável — não reinventa a cada venda.",
      },
      {
        n: "07",
        icon: BarChart3,
        t: "Métricas de Fechamento",
        d: "Taxa proposta → fechamento e ciclo médio, acompanhados toda semana.",
      },
    ],
  },
];

export function CloserMethod() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = CLOSER_PHASES[activePhase];

  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> O Método
            </div>
            <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Da negociação ao contrato —{" "}
              <span className="font-display font-normal italic text-gold">7 etapas</span> sem deixar
              dinheiro na mesa.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Fechar não é sorte nem carisma — é processo repetível, com critério pra saber quando
            avançar e margem definida antes da conversa esquentar.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {CLOSER_PHASES.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActivePhase(i)}
              className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
                i === activePhase
                  ? "border-gold bg-gold text-gold-foreground shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-gold/30 hover:text-foreground"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {p.label}
            </button>
          ))}
        </div>

        <div key={phase.key} className="animate-fade-in">
          <div className="mb-5 text-sm font-semibold text-muted-foreground">{phase.tagline}</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {phase.steps.map((s) => (
              <div
                key={s.n}
                className="group relative rounded-2xl border border-white/10 bg-card/70 p-7 transition-all hover:-translate-y-1 hover:border-gold/40"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-3xl text-gold">{s.n}</span>
                  <div className="flex size-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                    <s.icon className="size-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
