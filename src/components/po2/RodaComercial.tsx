import { useMemo, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Target, Search, Layers, Headphones, ShieldCheck, Filter, BarChart3 } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const AXES = [
  {
    key: "icp",
    label: "ICP & Listas",
    icon: Target,
    question: "Você tem um ICP documentado e listas segmentadas por critério claro?",
  },
  {
    key: "estudo",
    label: "Estudo de Lead",
    icon: Search,
    question: "Antes de abordar, você pesquisa a empresa e o decisor específico?",
  },
  {
    key: "cadencia",
    label: "Cadência",
    icon: Layers,
    question: "Existe uma sequência estruturada por múltiplos canais (não só um disparo)?",
  },
  {
    key: "coldcall",
    label: "Cold Call",
    icon: Headphones,
    question: "As ligações seguem um roteiro consultivo, adaptado ao contexto do lead?",
  },
  {
    key: "objecoes",
    label: "Objeções",
    icon: ShieldCheck,
    question: "As objeções mais comuns estão documentadas com resposta padrão?",
  },
  {
    key: "qualificacao",
    label: "Qualificação",
    icon: Filter,
    question:
      "Existe critério objetivo (CHAMP, SPIN, Gap Selling...) pra qualificar antes de agendar?",
  },
  {
    key: "metricas",
    label: "Métricas",
    icon: BarChart3,
    question: "Você acompanha volume, conexão, agendamento e conversão por canal, toda semana?",
  },
] as const;

type AxisKey = (typeof AXES)[number]["key"];

export function RodaComercial() {
  const [scores, setScores] = useState<Record<AxisKey, number>>({
    icp: 5,
    estudo: 5,
    cadencia: 5,
    coldcall: 5,
    objecoes: 5,
    qualificacao: 5,
    metricas: 5,
  });

  const data = useMemo(
    () => AXES.map((a) => ({ subject: a.label, valor: scores[a.key], fullMark: 10 })),
    [scores],
  );

  const weakest = useMemo(() => {
    const entries = AXES.map((a) => ({ ...a, score: scores[a.key] }));
    return entries.reduce((min, e) => (e.score < min.score ? e : min), entries[0]);
  }, [scores]);

  const average = useMemo(() => {
    const total = AXES.reduce((sum, a) => sum + scores[a.key], 0);
    return (total / AXES.length).toFixed(1);
  }, [scores]);

  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Autoavaliação
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            A roda da sua{" "}
            <span className="font-display font-normal italic text-gold">operação comercial.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Nota de 0 a 10 pra cada etapa do método — mesma lógica da roda da vida, só que com
            perguntas técnicas de prospecção. Arrasta os controles e veja onde sua operação
            realmente está.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="mx-auto h-[360px] w-full max-w-md">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} outerRadius="72%">
                <PolarGrid stroke="rgba(197,160,89,0.2)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: "rgba(230,225,215,0.85)" }}
                />
                <PolarRadiusAxis
                  domain={[0, 10]}
                  tick={{ fontSize: 9, fill: "rgba(197,160,89,0.5)" }}
                  tickCount={6}
                  axisLine={false}
                />
                <Radar
                  dataKey="valor"
                  stroke="#C5A059"
                  fill="#C5A059"
                  fillOpacity={0.28}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between rounded-xl border border-gold/30 bg-card/70 p-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Média geral
                </div>
                <div className="font-display text-3xl text-gold">{average} / 10</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Maior lacuna
                </div>
                <div className="font-display text-xl text-foreground">{weakest.label}</div>
              </div>
            </div>

            <div className="space-y-5">
              {AXES.map((a) => (
                <div key={a.key}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a.icon className="size-4 text-gold" />
                      <span className="text-sm font-semibold text-foreground/90">{a.label}</span>
                    </div>
                    <span className="font-display text-lg text-gold">{scores[a.key]}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={scores[a.key]}
                    onChange={(e) => setScores((s) => ({ ...s, [a.key]: Number(e.target.value) }))}
                    className="w-full accent-gold"
                    aria-label={a.question}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{a.question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
