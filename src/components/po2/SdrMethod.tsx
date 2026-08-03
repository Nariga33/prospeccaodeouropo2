import { useState } from "react";
import {
  Gauge,
  Timer,
  MessageSquareText,
  ArrowRightLeft,
  Repeat,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { Jargon } from "@/components/po2/Jargon";

const goldRule = "h-px w-12 bg-gold/60";

const SDR_PHASES = [
  {
    key: "captura",
    label: "Captura",
    tagline: "Do visitante ao lead qualificado por dado",
    steps: [
      {
        n: "01",
        icon: Gauge,
        t: "Lead Scoring",
        d: "Critério objetivo de pontuação por perfil (fit) e comportamento (intenção) — não achismo.",
      },
      {
        n: "02",
        icon: Timer,
        t: "SLA de Resposta",
        d: "Responder o lead em minutos, não horas. Velocidade é o maior preditor de conversão inbound.",
      },
    ],
  },
  {
    key: "qualificacao",
    label: "Qualificação",
    tagline: "Do MQL/PQL ao SAL",
    steps: [
      {
        n: "03",
        icon: MessageSquareText,
        t: "Qualificação Rápida",
        d: "Roteiro de qualificação por chamada ou chat — consultivo, não interrogatório.",
      },
      {
        n: "04",
        icon: ShieldCheck,
        t: "Gestão de Objeções",
        d: "Documentar e responder objeções de quem já demonstrou interesse — contexto muda tudo.",
      },
    ],
  },
  {
    key: "conversao",
    label: "Conversão",
    tagline: "Do SAL ao Sale",
    steps: [
      {
        n: "05",
        icon: ArrowRightLeft,
        t: "Handoff Estruturado",
        d: "Passagem de bastão pro closer com contexto completo — cliente não repete a própria história.",
      },
      {
        n: "06",
        icon: Repeat,
        t: "Nutrição de Frios",
        d: "Cadência de reengajamento pra quem ainda não está pronto — sem descartar antes da hora.",
      },
      {
        n: "07",
        icon: BarChart3,
        t: "Métricas por Estágio",
        d: "Taxa de conversão Lead → MQL → SAL → SQL → Sale, acompanhada toda semana.",
      },
    ],
  },
];

export function SdrMethod() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = SDR_PHASES[activePhase];

  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> O Método
            </div>
            <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Qualificação inbound —{" "}
              <span className="font-display font-normal italic text-gold">7 etapas</span> que viram
              receita.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Tratamos <Jargon term="SDR">SDR</Jargon> com o mesmo rigor que tratamos{" "}
            <Jargon term="BDR">BDR</Jargon> — critério, velocidade e métrica em cada etapa do funil,
            do visitante ao fechamento.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {SDR_PHASES.map((p, i) => (
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
