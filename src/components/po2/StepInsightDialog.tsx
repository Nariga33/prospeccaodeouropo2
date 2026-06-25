import { type ReactNode } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line, Tooltip,
} from "recharts";

const GOLD = "#C5A059";
const MUTED = "#3a3a3a";
const RED = "#c0524a";

export type ChartKind = "bars" | "donut" | "line" | "stack";

export interface StepInsight {
  n: string;
  title: string;
  subtitle: string;
  statBig: string;
  statLabel: string;
  bullets: string[];
  chart: ChartKind;
  data: { name: string; value: number; bad?: boolean }[];
  chartLegend: string;
}

export const STEP_INSIGHTS: Record<string, StepInsight> = {
  "01": {
    n: "01",
    title: "ICP & Listas",
    subtitle: "Quem você ataca define o quanto você fatura.",
    statBig: "3,2×",
    statLabel: "mais reuniões qualificadas em times com ICP documentado vs. listas no chute.",
    chart: "bars",
    chartLegend: "Taxa de conversão lead → reunião qualificada",
    data: [
      { name: "Sem ICP", value: 6, bad: true },
      { name: "Com ICP documentado", value: 19 },
    ],
    bullets: [
      "Sem ICP, ~60% do esforço de prospecção vai para empresas que nunca vão comprar.",
      "Listas direcionadas reduzem custo por reunião e encurtam o ciclo de venda.",
      "ICP escrito alinha marketing, SDR e closer no mesmo perfil de cliente.",
    ],
  },
  "02": {
    n: "02",
    title: "Estudo de Lead",
    subtitle: "Sem munição, cold call vira interrupção.",
    statBig: "72%",
    statLabel: "dos decisores ignoram contatos genéricos sem contexto de empresa.",
    chart: "donut",
    chartLegend: "Resposta positiva em primeiro contato",
    data: [
      { name: "Com pesquisa prévia", value: 41 },
      { name: "Abordagem genérica", value: 9, bad: true },
    ],
    bullets: [
      "Entender a dor real do mercado é o que separa cold call consultiva de spam.",
      "5 minutos de pesquisa por lead aumentam drasticamente a taxa de conexão.",
      "Estudo de lead é munição: cargo, momento da empresa, gatilhos recentes.",
    ],
  },
  "03": {
    n: "03",
    title: "Cadência Multicanal",
    subtitle: "Decisor não responde no primeiro toque — quase nunca.",
    statBig: "80%",
    statLabel: "das respostas acontecem entre o 5º e o 8º toque coordenado.",
    chart: "bars",
    chartLegend: "Taxa de resposta por número de toques",
    data: [
      { name: "1 toque", value: 4, bad: true },
      { name: "3 toques", value: 11 },
      { name: "5 toques", value: 22 },
      { name: "8 toques", value: 34 },
    ],
    bullets: [
      "E-mail + LinkedIn + ligação + WhatsApp coordenados multiplicam alcance.",
      "Maioria dos times desiste no 2º toque — exatamente onde a venda começa.",
      "Cadência sem sequência clara é volume desperdiçado, não prospecção.",
    ],
  },
  "04": {
    n: "04",
    title: "Cold Call Consultiva",
    subtitle: "Contexto vende. Script decorado afasta.",
    statBig: "2,7×",
    statLabel: "mais agendamentos com abordagem consultiva vs. script engessado.",
    chart: "bars",
    chartLegend: "Taxa de agendamento por estilo de abordagem",
    data: [
      { name: "Script decorado", value: 7, bad: true },
      { name: "Abordagem consultiva", value: 19 },
    ],
    bullets: [
      "Os primeiros 15 segundos decidem se o decisor desliga ou conversa.",
      "Pergunta certa gera diagnóstico — diagnóstico gera reunião.",
      "Quem decora script vira robô; quem entende o cliente vira referência.",
    ],
  },
  "05": {
    n: "05",
    title: "Gestão de Objeções",
    subtitle: "Objeção ignorada hoje é deal perdido amanhã.",
    statBig: "44%",
    statLabel: "das vendas se ganham depois da 5ª objeção tratada com método.",
    chart: "line",
    chartLegend: "Taxa de fechamento por nº de objeções tratadas",
    data: [
      { name: "1", value: 8 },
      { name: "2", value: 14 },
      { name: "3", value: 22 },
      { name: "4", value: 33 },
      { name: "5", value: 44 },
    ],
    bullets: [
      "Objeções recorrentes viram playbook — não improviso individual.",
      "Mapear a raiz da objeção corrige pitch, ICP e qualificação em cascata.",
      "Time sem registro de objeções perde a mesma venda várias vezes.",
    ],
  },
  "06": {
    n: "06",
    title: "Qualificação",
    subtitle: "Pipeline inflado é vaidade. Pipeline qualificado é receita.",
    statBig: "−38%",
    statLabel: "no ciclo de venda quando o time aplica critério claro de qualificação.",
    chart: "bars",
    chartLegend: "Conversão proposta → fechamento",
    data: [
      { name: "Sem critério (feeling)", value: 11, bad: true },
      { name: "CHAMP / SPIN / Gap", value: 28 },
    ],
    bullets: [
      "Critério padrão evita closer perdendo tempo com lead que não tem fit.",
      "Qualificação clara protege a meta — e a saúde do time comercial.",
      "Cada etapa do funil precisa de gatilho de avanço, não de torcida.",
    ],
  },
  "07": {
    n: "07",
    title: "Métricas & Melhoria",
    subtitle: "O que não é medido, não evolui — e ninguém te avisa.",
    statBig: "+47%",
    statLabel: "em receita previsível em equipes com ritual semanal de revisão.",
    chart: "line",
    chartLegend: "Receita previsível ao longo dos meses",
    data: [
      { name: "M1", value: 100 },
      { name: "M2", value: 112 },
      { name: "M3", value: 126 },
      { name: "M4", value: 138 },
      { name: "M5", value: 147 },
    ],
    bullets: [
      "Indicadores semanais revelam o gargalo real — lista, abordagem ou fechamento.",
      "Sem ritual, o time repete os mesmos erros em ciclos cada vez maiores.",
      "Dados transformam prospecção de esforço pessoal em sistema escalável.",
    ],
  },
};

interface Props { stepKey: string; trigger: ReactNode }

export function StepInsightDialog({ stepKey, trigger }: Props) {
  const insight = STEP_INSIGHTS[stepKey];
  if (!insight) return <>{trigger}</>;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto border-white/10 bg-card text-foreground">
        <DialogHeader>
          <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            Etapa {insight.n} · Insight de mercado
          </div>
          <DialogTitle className="font-display text-3xl text-foreground md:text-4xl">
            {insight.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {insight.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 rounded-2xl border border-gold/30 bg-background/60 p-5">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="font-display text-5xl text-gold md:text-6xl">{insight.statBig}</span>
          </div>
          <p className="mt-1 text-sm text-foreground/80">{insight.statLabel}</p>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-background/40 p-5">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            {insight.chartLegend}
          </div>
          <div className="h-56 w-full">
            <InsightChart insight={insight} />
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {insight.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground/90">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <a
          href="#diagnostico"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]"
        >
          Quero diagnóstico gratuito
        </a>
      </DialogContent>
    </Dialog>
  );
}

function InsightChart({ insight }: { insight: StepInsight }) {
  const tooltipStyle = {
    background: "#0e0e10",
    border: "1px solid rgba(197,160,89,0.3)",
    borderRadius: 8,
    fontSize: 12,
    color: "#fff",
  };

  if (insight.chart === "donut") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={insight.data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            stroke="none"
          >
            {insight.data.map((d, i) => (
              <Cell key={i} fill={d.bad ? MUTED : GOLD} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v: number, n: string) => [`${v}%`, n]}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (insight.chart === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={insight.data} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 11 }} />
          <YAxis stroke="#666" tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={GOLD}
            strokeWidth={3}
            dot={{ fill: GOLD, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // bars
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={insight.data} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
        <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 11 }} interval={0} />
        <YAxis stroke="#666" tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {insight.data.map((d, i) => (
            <Cell key={i} fill={d.bad ? RED : GOLD} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
