import { Brain, Eye, Map as MapIcon, Footprints, Trophy, Infinity as InfinityIcon } from "lucide-react";

const goldRule = "inline-block h-px w-10 bg-gold/60";

const levels = [
  { n: "01", icon: Brain, title: "Mentalidade", tag: "Como penso", desc: "Desenvolvemos líderes comerciais — crenças, prosperidade e relação com vendas." },
  { n: "02", icon: Eye, title: "Consciência", tag: "O que enxergo", desc: "Diagnosticamos a realidade da operação e revelamos o problema real, não o aparente." },
  { n: "03", icon: MapIcon, title: "Caminho", tag: "O que decido", desc: "Construímos o plano estratégico — processos, prioridades e metas com direção." },
  { n: "04", icon: Footprints, title: "Jornada", tag: "O que executo", desc: "Acompanhamos a execução com disciplina, indicadores e evolução contínua." },
  { n: "05", icon: Trophy, title: "Resultado", tag: "O que construo", desc: "Receita previsível e crescimento sustentável — consequência, não acaso." },
];

const cycle = [
  "Consciência",
  "Responsabilidade",
  "Estratégia",
  "Sistema",
  "Constância",
  "Evolução",
  "Resultado",
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
        <div className="rounded-xl border border-white/10 bg-card/50 p-4">
          <div className="text-xs text-red-300/90">❌ "Ninguém responde minhas mensagens"</div>
          <div className="mt-2 text-xs text-gold">✅ "Minha abordagem ainda não gera curiosidade suficiente"</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-card/50 p-4">
          <div className="text-xs text-red-300/90">❌ "Falta lead"</div>
          <div className="mt-2 text-xs text-gold">✅ "Falta conversão — a consciência revela o problema real"</div>
        </div>
      </div>
    </div>
  );
}

function CrescerCycle() {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const r = 140;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
        <span className={goldRule} /> Filosofia oficial PO2
      </div>
      <h3 className="font-display text-3xl text-foreground md:text-4xl">
        Método <span className="italic text-gold">C.R.E.S.C.E.R.</span>
      </h3>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Um ciclo contínuo — não uma linha reta. Cada volta eleva o patamar da operação.
      </p>

      <div className="relative mt-8 flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="po2-cycle-spin h-[360px] w-[360px] max-w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="po2CycleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(197,160,89,0.18)" />
              <stop offset="100%" stopColor="rgba(197,160,89,0)" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r + 30} fill="url(#po2CycleGlow)" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(197,160,89,0.35)" strokeWidth="1" strokeDasharray="3 6" />
          {cycle.map((label, i) => {
            const angle = (i / cycle.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            const letter = label.charAt(0);
            return (
              <g key={label}>
                <circle cx={x} cy={y} r="22" fill="#0F1115" stroke="rgba(197,160,89,0.6)" strokeWidth="1.5" />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#C5A059"
                >
                  {letter}
                </text>
                <text
                  x={cx + Math.cos(angle) * (r + 38)}
                  y={cy + Math.sin(angle) * (r + 38) + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="rgba(230,225,215,0.85)"
                  fontWeight="600"
                >
                  {label}
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

      <div className="mt-6 grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
        {cycle.map((c) => (
          <div key={c} className="rounded-md border border-white/10 bg-card/40 px-3 py-2">
            <span className="mr-1.5 font-bold text-gold">{c.charAt(0)}.</span>
            {c}
          </div>
        ))}
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
