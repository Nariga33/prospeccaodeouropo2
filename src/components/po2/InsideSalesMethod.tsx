import { useState } from "react";
import {
  MessageSquareText,
  Filter,
  FileText,
  Repeat,
  ShieldCheck,
  Gauge,
  BarChart3,
} from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const IS_PHASES = [
  {
    key: "descoberta",
    label: "Descoberta",
    tagline: "A reunião que revela o problema real",
    steps: [
      {
        n: "01",
        icon: MessageSquareText,
        t: "Roteiro de Descoberta",
        d: "Perguntas estruturadas na reunião — não é uma apresentação de slide solta.",
      },
      {
        n: "02",
        icon: Filter,
        t: "Qualificação por Framework",
        d: "BANT, CHAMP ou SPIN aplicado com consistência, não no improviso.",
      },
    ],
  },
  {
    key: "proposta",
    label: "Proposta",
    tagline: "Sem 'te mando e você vê com calma'",
    steps: [
      {
        n: "03",
        icon: FileText,
        t: "Proposta com Prazo",
        d: "Toda proposta sai com data de retorno combinada — não fica solta esperando resposta.",
      },
      {
        n: "04",
        icon: Repeat,
        t: "Follow-up Sistemático",
        d: "Cadência de retorno pós-reunião — sem deixar a negociação esfriar.",
      },
    ],
  },
  {
    key: "negociacao",
    label: "Negociação",
    tagline: "Do impasse ao fechamento",
    steps: [
      {
        n: "05",
        icon: ShieldCheck,
        t: "Playbook de Objeções",
        d: "Preço, prazo e concorrência — resposta pensada antes da negociação esquentar.",
      },
      {
        n: "06",
        icon: Gauge,
        t: "Forecast Confiável",
        d: "Estágios de pipeline bem definidos, sem 'quase fechado' eterno.",
      },
      {
        n: "07",
        icon: BarChart3,
        t: "Métricas de Conversão",
        d: "Taxa reunião → proposta → fechamento, acompanhada toda semana.",
      },
    ],
  },
];

export function InsideSalesMethod() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = IS_PHASES[activePhase];

  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> O Método
            </div>
            <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Da reunião ao contrato —{" "}
              <span className="font-display font-normal italic text-gold">7 etapas</span> que fecham
              negócio.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            O lead já chegou qualificado — o que decide se fecha ou não é a condução da reunião, da
            proposta e da negociação.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {IS_PHASES.map((p, i) => (
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
