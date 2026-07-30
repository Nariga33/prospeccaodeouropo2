import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { Jargon } from "@/components/po2/Jargon";
import {
  ClipboardList,
  Target,
  Filter,
  Headphones,
  Layers,
  Search,
  BarChart3,
  ShieldCheck,
  Compass,
  BookOpen,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Activity,
  Workflow,
  ShieldQuestion,
  Repeat,
} from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";
const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

export function Mentoria() {
  const slides = [
    {
      icon: ClipboardList,
      t: "Diagnóstico ao vivo",
      d: "Sessão inicial de imersão na sua operação. Mapeamos funil, cadência atual, indicadores e onde o dinheiro está travando.",
      entrega: "Relatório de gargalos + plano de 90 dias",
      chart: {
        headline: "7 dias",
        subtitle: <>Do achismo ao primeiro insight acionável sobre o funil.</>,
        axisLabel: "Tempo até o 1º insight acionável (dias)",
        unit: " dias",
        data: [
          { name: "Sem diagnóstico", value: 30, bad: true },
          { name: "Com diagnóstico PO2", value: 7 },
        ],
        bullets: [
          <>Mapeamento revela onde a receita trava — quase nunca é onde o time acha.</>,
          <>Plano de 90 dias com prioridades ordenadas por impacto e esforço.</>,
          <>Você sai da sessão sabendo o que atacar já na semana seguinte.</>,
        ],
      },
    },
    {
      icon: Target,
      t: "ICP construído junto",
      d: "Definimos com dados quem é o cliente ideal: porte, dor, gatilho e canal. Chega de queimar lista fria.",
      entrega: "Documento de ICP + lista-piloto de 100 contas",
      chart: {
        headline: "3,2×",
        subtitle: (
          <>
            mais reuniões qualificadas em times com <Jargon term="ICP">ICP</Jargon> documentado vs.
            listas no chute.
          </>
        ),
        axisLabel: "Taxa de conversão lead → reunião qualificada",
        unit: "%",
        data: [
          { name: "Sem ICP", value: 6, bad: true },
          { name: "Com ICP documentado", value: 19 },
        ],
        bullets: [
          <>
            Sem <Jargon term="ICP">ICP</Jargon>, ~60% do esforço vai para empresas que nunca vão
            comprar.
          </>,
          <>Listas direcionadas reduzem custo por reunião e encurtam o ciclo.</>,
          <>
            ICP escrito alinha marketing, <Jargon term="BDR">BDR</Jargon> e closer no mesmo perfil.
          </>,
        ],
      },
    },
    {
      icon: Headphones,
      t: "Scripts e cadência revisados",
      d: "Reescrevemos pitch, e-mail e cold call baseado em SPIN e CHAMP, ajustados ao seu mercado e ticket.",
      entrega: "Cadência de 12 toques em 21 dias",
      chart: {
        headline: "3×",
        subtitle: <>mais respostas com pitch e cadência calibrados ao mercado.</>,
        axisLabel: "Taxa de resposta em cold outbound",
        unit: "%",
        data: [
          { name: "Script genérico", value: 4, bad: true },
          { name: "Script PO2", value: 12 },
        ],
        bullets: [
          <>Abordagem consultiva substitui pitch de catálogo — decisor responde mais.</>,
          <>12 toques distribuídos em canais certos aumentam superfície de contato.</>,
          <>Cada objeção comum ganha resposta calibrada — sem improviso na hora.</>,
        ],
      },
    },
    {
      icon: Activity,
      t: "Ritual semanal de métricas",
      d: "Encontro semanal para revisar indicadores, ajustar rota e destravar quem está preso. Sem achismo, só dado.",
      entrega: "Dashboard de KPIs + reunião fixa semanal",
      chart: {
        headline: "80%",
        subtitle: <>de acerto no forecast trimestral com ritual semanal de indicadores.</>,
        axisLabel: "Acurácia do forecast trimestral",
        unit: "%",
        data: [
          { name: "Sem ritual", value: 35, bad: true },
          { name: "Com ritual PO2", value: 80 },
        ],
        bullets: [
          <>Reunião fixa impede que problemas de funil apareçam só no fim do mês.</>,
          <>Indicadores viram decisão — não relatório para ninguém ler.</>,
          <>Time para de terceirizar para o mercado o que é ajuste de operação.</>,
        ],
      },
    },
    {
      icon: Workflow,
      t: "Estruturação de pipeline",
      d: "Organizamos o funil por estágio, critérios de avanço e SLA por etapa. Cada card sabe o que precisa acontecer para virar receita.",
      entrega: "Pipeline documentado no seu CRM",
      chart: {
        headline: "-43%",
        subtitle: <>de tempo no ciclo de venda com estágios e SLA bem definidos.</>,
        axisLabel: "Ciclo médio de venda (dias)",
        unit: " dias",
        data: [
          { name: "Pipeline solto", value: 72, bad: true },
          { name: "Pipeline PO2", value: 41 },
        ],
        bullets: [
          <>Critérios claros de avanço eliminam deal "empurrado" que nunca fecha.</>,
          <>SLA por etapa impede que oportunidade quente esfrie na fila.</>,
          <>Previsibilidade real: o CRM vira painel, não cemitério de leads.</>,
        ],
      },
    },
    {
      icon: ShieldQuestion,
      t: "Treinamento de objeções",
      d: "Mapeamento das 10 objeções mais comuns do seu mercado e resposta calibrada — do preço ao timing e à concorrência.",
      entrega: "Playbook de objeções com áudios de referência",
      chart: {
        headline: "+89%",
        subtitle: <>na conversão reunião → proposta com objeções treinadas.</>,
        axisLabel: "Conversão reunião → proposta enviada",
        unit: "%",
        data: [
          { name: "Sem treino", value: 18, bad: true },
          { name: "Com playbook", value: 34 },
        ],
        bullets: [
          <>Vendedor deixa de travar em "tá caro" e "vou pensar" — resposta é reflexo.</>,
          <>Áudios de referência mostram o tom, não só o texto.</>,
          <>Objeção mapeada vira gatilho de avanço, não desculpa para perder deal.</>,
        ],
      },
    },
    {
      icon: BookOpen,
      t: "Playbook de outbound",
      d: "Manual vivo com ICP, cadência, scripts, objeções e rituais. Onboarding de novo vendedor deixa de depender de você.",
      entrega: "Playbook em Notion / Google Docs",
      chart: {
        headline: "-67%",
        subtitle: (
          <>
            no ramp-up de um novo <Jargon term="BDR">BDR</Jargon> com playbook estruturado.
          </>
        ),
        axisLabel: "Dias até novo BDR bater meta",
        unit: " dias",
        data: [
          { name: "Sem playbook", value: 90, bad: true },
          { name: "Com playbook", value: 30 },
        ],
        bullets: [
          <>Conhecimento sai da cabeça do fundador e vira ativo da empresa.</>,
          <>Novo vendedor entra produtivo sem depender de sombra semanal.</>,
          <>Playbook vivo evolui a cada ciclo — não engaveta em 30 dias.</>,
        ],
      },
    },
    {
      icon: Repeat,
      t: "Acompanhamento pós-mentoria",
      d: "60 dias de suporte após o ciclo principal para garantir que a operação se sustenta sem depender do mentor.",
      entrega: "Reuniões quinzenais + suporte em canal direto",
      chart: {
        headline: "92%",
        subtitle: <>dos times mantêm o método rodando 6 meses após a mentoria.</>,
        axisLabel: "Retenção do método após 6 meses",
        unit: "%",
        data: [
          { name: "Mentoria comum", value: 40, bad: true },
          { name: "PO2 c/ pós-mentoria", value: 92 },
        ],
        bullets: [
          <>Suporte quinzenal garante que operação não volta ao improviso antigo.</>,
          <>Canal direto tira dúvida na hora que ela aparece — não semana depois.</>,
          <>Mentor sai; o método fica rodando como sistema do time.</>,
        ],
      },
    },
  ];
  const pilares = [
    {
      label: "Para quem é",
      desc: (
        <>
          Fundadores, gestores e times de <Jargon term="Outbound">prospecção ativa</Jargon> que já
          vendem, mas dependem de esforço heróico.
        </>
      ),
    },
    {
      label: "Como funciona",
      desc: "Encontros semanais + tarefas de execução entre sessões + revisão de indicadores.",
    },
    {
      label: "O que muda",
      desc: (
        <>
          De vendedor artesanal para operação com <Jargon term="ICP">ICP</Jargon>, cadência, script
          e ritual de métricas.
        </>
      ),
    },
  ];

  const [active, setActive] = useState(0);
  const go = (delta: number) => setActive((p) => (p + delta + slides.length) % slides.length);
  const current = slides[active];
  const Icon = current.icon;
  const chart = current.chart;

  return (
    <section
      id="mentoria"
      className="relative overflow-hidden border-b border-white/5 bg-surface/40"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[600px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> Mentoria com Matheus Staruck
            </div>
            <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Não é curso. É{" "}
              <span className="font-display font-normal italic text-gold">operação</span> que você
              executa junto.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Mentoria prática para fundadores, gestores e times comerciais que querem parar de
              improvisar e construir uma máquina de{" "}
              <Jargon term="Outbound">prospecção ativa</Jargon> com método, indicadores e melhoria
              contínua.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-gold/30 bg-gold/5 px-5 py-4">
            <GraduationCap className="size-6 text-gold" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                Formato
              </div>
              <div className="text-sm text-foreground">1:1 ou em grupo · semanal</div>
            </div>
          </div>
        </div>

        {/* Pilares */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {pilares.map((p) => (
            <div key={p.label} className="rounded-2xl border border-white/10 bg-card/60 p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                {p.label}
              </div>
              <p className="mt-2 text-sm text-foreground/90">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Gráfico + bullets — reagem ao slide ativo do carrossel */}
          <div className="rounded-3xl border border-gold/30 bg-card/70 p-7">
            <div key={`chart-${active}`} className="animate-fade-in">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/70">
                <span>Impacto da entrega</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-xs font-normal normal-case tracking-normal text-foreground/80">
                  {current.t}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-6xl text-gold">{chart.headline}</span>
                <span className="text-sm text-foreground/80">{chart.subtitle}</span>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-background/40 p-5">
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  {chart.axisLabel}
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chart.data}
                      margin={{ top: 10, right: 16, left: -10, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="name"
                        stroke="#C5A059"
                        tick={{ fontSize: 11, fill: "#C5A059" }}
                        interval={0}
                      />
                      <YAxis stroke="#C5A059" tick={{ fontSize: 11, fill: "#C5A059" }} />
                      <Tooltip
                        contentStyle={{
                          background: "#0e0e10",
                          border: "1px solid rgba(197,160,89,0.3)",
                          borderRadius: 8,
                          fontSize: 12,
                          color: "#fff",
                        }}
                        cursor={{ fill: "rgba(255,255,255,0.04)" }}
                        formatter={(v: number) => [`${v}${chart.unit}`, "Valor"]}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {chart.data.map((d, i) => (
                          <Cell key={i} fill={d.bad ? "#c0524a" : "#C5A059"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5">
                {chart.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/90">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Carrossel de entregas */}
          <div className="flex flex-col gap-4">
            <div
              className="relative flex-1 rounded-3xl border border-gold/30 bg-card/70 p-7 outline-none"
              tabIndex={0}
              role="group"
              aria-label="Entregas da mentoria — use as setas para navegar"
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  go(1);
                }
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  go(-1);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  O que você recebe
                </div>
                <div className="font-display text-sm text-gold/80">
                  {String(active + 1).padStart(2, "0")}{" "}
                  <span className="text-muted-foreground">
                    / {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div key={active} className="mt-6 animate-fade-in">
                <div className="flex size-14 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-foreground md:text-3xl">
                  {current.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.d}</p>

                <div className="mt-5 rounded-xl border border-white/10 bg-background/40 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                    Entrega prática
                  </div>
                  <div className="mt-1 text-sm text-foreground/90">{current.entrega}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Anterior"
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-card/60 text-gold transition-colors hover:border-gold/40"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex flex-wrap justify-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Ir para slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Próximo"
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-card/60 text-gold transition-colors hover:border-gold/40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { icon: Compass, l: "Acompanhamento prático" },
                { icon: BookOpen, l: "Templates" },
                { icon: ClipboardList, l: "Materiais complementares" },
                { icon: Users, l: "Comunidade" },
                { icon: Calendar, l: "Encontros ao vivo" },
              ].map((b) => (
                <div
                  key={b.l}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-card/60 p-4 text-center"
                >
                  <b.icon className="size-5 text-gold" />
                  <span className="text-xs font-semibold text-foreground/85">{b.l}</span>
                </div>
              ))}
            </div>

            <DiagnosticDialog
              trigger={
                <button className={`${ctaPrimary} w-full justify-center`}>
                  <Calendar className="size-4" /> Quero a mentoria
                </button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
