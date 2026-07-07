import { useState } from "react";
import { Brain, Eye, Map as MapIcon, Footprints, Trophy, Infinity as InfinityIcon, ChevronLeft, ChevronRight } from "lucide-react";


const goldRule = "inline-block h-px w-10 bg-gold/60";

const levels = [
  { n: "01", icon: Brain, title: "Mentalidade", tag: "Como penso", desc: "Desenvolvemos líderes comerciais — crenças, prosperidade e relação com vendas." },
  { n: "02", icon: Eye, title: "Consciência", tag: "O que enxergo", desc: "Diagnosticamos a realidade da operação e revelamos o problema real, não o aparente." },
  { n: "03", icon: MapIcon, title: "Caminho", tag: "O que decido", desc: "Construímos o plano estratégico — processos, prioridades e metas com direção." },
  { n: "04", icon: Footprints, title: "Jornada", tag: "O que executo", desc: "Acompanhamos a execução com disciplina, indicadores e evolução contínua." },
  { n: "05", icon: Trophy, title: "Resultado", tag: "O que construo", desc: "Receita previsível e crescimento sustentável — consequência, não acaso." },
];

type CycleItem = { letter: string; label: string; desc: string };
const cycle: CycleItem[] = [
  { letter: "C", label: "Consciência", desc: "Enxergar a realidade da operação antes de agir. Diagnóstico honesto do que funciona, do que não funciona e por quê." },
  { letter: "R", label: "Responsabilidade", desc: "Assumir o problema. Parar de terceirizar a culpa para o mercado, para o lead ou para a sorte." },
  { letter: "E", label: "Estratégia", desc: "Desenhar o plano com ICP, cadência, abordagem e prioridade. Decisão clara antes da ação." },
  { letter: "S", label: "Sistema", desc: "Processo replicável e documentado. Operação que funciona sem depender de esforço heróico." },
  { letter: "C", label: "Constância", desc: "Execução diária com disciplina. Prospecção é regularidade, não pico de motivação." },
  { letter: "E", label: "Evolução", desc: "Medir, ajustar e repetir. Cada ciclo melhora pitch, ICP e cadência com base em dados reais." },
  { letter: "R", label: "Resultado", desc: "Receita previsível como consequência do método — não como acaso comercial." },
];


function JourneyTimeline() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
        <span className={goldRule} /> Jornada de evolução
      </div>
      <h3 className="font-display text-3xl text-foreground md:text-4xl">
        Da <span className="italic text-gold">mentalidade</span> ao resultado.
      </h3>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Saber o caminho não transforma ninguém. Percorrer o caminho, sim.
      </p>

      <ol className="relative mt-10 space-y-4 border-l border-gold/30 pl-8">
        {levels.map((l) => {
          const Icon = l.icon;
          return (
            <li key={l.n} className="relative">
              <span className="absolute -left-[39px] flex size-6 items-center justify-center rounded-full border border-gold/40 bg-background text-[10px] font-bold text-gold">
                {l.n}
              </span>
              <div className="rounded-xl border border-white/10 bg-card/70 p-5 transition-colors hover:border-gold/40">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <div className="font-display text-xl text-foreground">{l.title}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      ({l.tag})
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{l.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {[
          { before: "Ninguém responde minhas mensagens", after: "Minha abordagem ainda não gera curiosidade suficiente" },
          { before: "Falta lead", after: "Falta conversão — a consciência revela o problema real" },
        ].map((ex) => (
          <div key={ex.before} className="rounded-xl border border-white/10 bg-card/50 p-4">
            <div className="flex gap-3 text-xs">
              <span className="w-14 shrink-0 font-bold uppercase tracking-[0.2em] text-red-300/80">Antes</span>
              <span className="text-muted-foreground">"{ex.before}"</span>
            </div>
            <div className="my-3 h-px bg-white/10" />
            <div className="flex gap-3 text-xs">
              <span className="w-14 shrink-0 font-bold uppercase tracking-[0.2em] text-gold">Depois</span>
              <span className="text-foreground">"{ex.after}"</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function CrescerCycle() {
  const size = 380;
  const cx = size / 2;
  const cy = size / 2;
  const r = 135;
  const [active, setActive] = useState(0);
  const current = cycle[active];

  const go = (delta: number) => {
    setActive((prev) => (prev + delta + cycle.length) % cycle.length);
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
        <span className={goldRule} /> Filosofia oficial PO2
      </div>
      <h3 className="font-display text-3xl text-foreground md:text-4xl">
        Método <span className="italic text-gold">C.R.E.S.C.E.R.</span>
      </h3>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Um ciclo contínuo — não uma linha reta. Clique em cada letra para entender o que ela significa.
      </p>

      <div
        className="relative mt-8 flex items-center justify-center outline-none"
        tabIndex={0}
        role="group"
        aria-label="Ciclo C.R.E.S.C.E.R. — use as setas para navegar"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        }}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="h-[380px] w-[380px] max-w-full overflow-visible"
        >
          <defs>
            <radialGradient id="po2CycleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(197,160,89,0.18)" />
              <stop offset="100%" stopColor="rgba(197,160,89,0)" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r + 30} fill="url(#po2CycleGlow)" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(197,160,89,0.35)" strokeWidth="1" strokeDasharray="3 6" />
          {cycle.map((item, i) => {
            const angle = (i / cycle.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            const lx = cx + Math.cos(angle) * (r + 42);
            const ly = cy + Math.sin(angle) * (r + 42);
            const isActive = i === active;
            return (
              <g
                key={`${item.letter}-${i}`}
                className="cursor-pointer"
                onClick={() => setActive(i)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="24"
                  fill={isActive ? "#1a1208" : "#0F1115"}
                  stroke={isActive ? "#C5A059" : "rgba(197,160,89,0.6)"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={isActive ? { filter: "drop-shadow(0 0 10px rgba(197,160,89,0.7))" } : undefined}
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#C5A059"
                  className="pointer-events-none select-none"
                >
                  {item.letter}
                </text>
                <text
                  x={lx}
                  y={ly + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={isActive ? "#C5A059" : "rgba(230,225,215,0.85)"}
                  className="pointer-events-none select-none"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="pointer-events-none absolute flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full border border-gold/40 bg-background text-gold">
            <InfinityIcon className="size-6" />
          </span>
          <div className="mt-2 font-display text-base text-foreground">Ciclo PO2</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Repetir é evoluir
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-card/60 text-gold transition-colors hover:border-gold/40"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex gap-1.5">
          {cycle.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir para item ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo"
          className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-card/60 text-gold transition-colors hover:border-gold/40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-gold/30 bg-card/70 p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 font-display text-2xl text-gold">
            {current.letter}
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {active + 1} de {cycle.length}
            </div>
            <div className="mt-1 font-display text-2xl text-foreground">{current.label}</div>
            <p className="mt-2 text-sm text-muted-foreground">{current.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export function EvolutionModel() {
  return (
    <div className="mt-24 border-t border-gold/20 pt-16">
      <div className="mb-10 max-w-3xl">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          <span className={goldRule} /> Modelo PO2 de evolução comercial
        </div>
        <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          Antes da técnica, <span className="font-display font-normal italic text-gold">a transformação.</span>
        </h2>
        <p className="mt-5 text-muted-foreground">
          Frameworks resolvem execução. O Modelo PO2 resolve o que vem antes — mentalidade, consciência e disciplina de jornada. É assim que método vira resultado sustentável.
        </p>
      </div>

      <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <JourneyTimeline />
        <CrescerCycle />
      </div>
    </div>
  );
}
