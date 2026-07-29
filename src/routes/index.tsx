import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/po2-logo.png";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { EvolutionModel } from "@/components/po2/EvolutionModel";
import { StepInsightDialog } from "@/components/po2/StepInsightDialog";
import { Jargon } from "@/components/po2/Jargon";
import { MethodologyDialog, type Methodology } from "@/components/po2/MethodologyDialog";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { CountUp } from "@/hooks/use-count-up";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import {
  Phone,
  Target,
  Layers,
  LineChart,
  Building2,
  Users,
  TrendingUp,
  Wallet,
  Check,
  ArrowRight,
  Sparkles,
  Search,
  MessageSquare,
  Headphones,
  ShieldCheck,
  Filter,
  BarChart3,
  Zap,
  Compass,
  Brain,
  ListChecks,
  GraduationCap,
  Calendar,
  ClipboardList,
  Activity,
  ChevronLeft,
  ChevronRight,
  Workflow,
  ShieldQuestion,
  BookOpen,
  Repeat,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PO2 — Prospecção de Ouro 2.0 | Assessoria de Prospecção B2B" },
      {
        name: "description",
        content:
          "Prospecção ativa com método, inteligência e previsibilidade. Do primeiro contato à reunião qualificada.",
      },
      { property: "og:title", content: "PO2 — Prospecção de Ouro 2.0" },
      {
        property: "og:description",
        content: "Outbound com método. +R$2M gerados, +100k ligações, +1k agendas qualificadas.",
      },
    ],
  }),
  component: LandingPage,
});

const goldRule = "h-px w-12 bg-gold/60";
const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";
const ctaSecondary =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/10";

function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={logo} alt="PO2" className={className} />;
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <Hero />
        <ProblemVsMethod />
        <Thesis />
        <Method />
        <Mentoria />
        <EventosTeaser />
        <Pitch />

        <Methodologies />
        <Founder />
        <Cases />
        <CostComparison />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function EventosTeaser() {
  return (
    <section
      id="eventos"
      className="border-t border-white/5 bg-gradient-to-b from-black to-background py-24"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          <Sparkles className="size-3" /> Agenda ao vivo
        </div>
        <h2 className="mt-4 font-[Instrument_Serif] text-4xl leading-tight md:text-5xl">
          Masterclasses PO2 ao vivo.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Encontros online, íntimos e limitados sobre prospecção B2B. Veja os próximos eventos,
          inscreva-se e receba link do Meet, agenda e certificado.
        </p>
        <div className="mt-8">
          <Link to="/eventos" className={ctaPrimary}>
            Ver eventos disponíveis <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-28 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Assessoria de Prospecção B2B
          </div>
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Prospecção ativa com{" "}
            <span className="font-display font-normal italic text-gold">método</span>,{" "}
            <span className="font-display font-normal italic text-gold">inteligência</span> e{" "}
            <span className="font-display font-normal italic text-gold">previsibilidade</span>.
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-lg text-muted-foreground">
            Do primeiro contato à reunião qualificada. Estruturamos sua operação{" "}
            <Jargon term="Outbound">outbound</Jargon> com <Jargon term="ICP">ICP</Jargon>,{" "}
            <Jargon term="Cadência">cadência</Jargon>, abordagem consultiva e métricas — para tirar
            o crescimento do improviso e colocá-lo no painel de controle.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <DiagnosticDialog
              trigger={
                <button className={ctaPrimary}>
                  Realizar o diagnóstico gratuito <ArrowRight className="size-4" />
                </button>
              }
            />
            <a href="#metodo" className={ctaSecondary}>
              Ver o método PO2
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gold/10 blur-3xl" />
          <div className="rounded-3xl border border-white/10 bg-card/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Painel · Resultado acumulado
              </span>
              <div className="flex gap-1">
                <span className="size-2 rounded-full bg-red-500/50" />
                <span className="size-2 rounded-full bg-amber-500/50" />
                <span className="size-2 rounded-full bg-emerald-500/50" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Receita gerada
              </div>
              <div className="font-display text-6xl text-gold">
                <CountUp value="+R$ 2M" />
              </div>
              <div className="text-sm text-muted-foreground">em +30 negócios fechados</div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: "+100k", l: "Ligações" },
                { v: "+5k", l: "Empresas" },
                { v: "+1k", l: "Agendas" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/5 p-4">
                  <div className="font-display text-2xl text-foreground">
                    <CountUp value={s.v} />
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  const stats = [
    { v: "24", l: "Anos de idade" },
    { v: "+4", l: "Anos em ops outbound" },
    { v: "+100k", l: "Ligações realizadas" },
    { v: "+5k", l: "Empresas prospectadas" },
    { v: "+1k", l: "Agendas qualificadas" },
    { v: "+R$2M", l: "Receita gerada" },
  ];
  return (
    <section id="fundador" className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.5fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> Quem está por trás
            </div>
            <h2 className="font-display text-5xl text-foreground">Matheus Staruck</h2>
            <p className="mt-4 text-muted-foreground">
              Fundador da PO2. Especialista em operações outbound B2B — método validado em campo,
              não em teoria.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.l} className="bg-card/80 p-6">
                <div className="font-display text-3xl text-gold">
                  <CountUp value={s.v} />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemVsMethod() {
  const rows = [
    {
      badIcon: Target,
      bad: "Sem ICP",
      badDesc: "Listas feitas no chute, sem critério de qualificação.",
      goodIcon: LineChart,
      good: "ICP documentado",
      goodDesc: "Pipeline previsível, com esforço direcionado para quem compra.",
    },
    {
      badIcon: MessageSquare,
      bad: "Abordagem genérica",
      badDesc: "Mensagem igual para todo mundo — sem contexto.",
      goodIcon: Users,
      good: "Abordagem consultiva",
      goodDesc: "Reuniões com decisores certos — não leads errados.",
    },
    {
      badIcon: Layers,
      bad: "Cadência sem estratégia",
      badDesc: "Sequência sem narrativa, sem progressão comercial.",
      goodIcon: Wallet,
      good: "Cadência estruturada",
      goodDesc: "Time comercial produtivo, CAC mais baixo.",
    },
    {
      badIcon: BarChart3,
      bad: "Número sem análise",
      badDesc: "Time ocupado, mas sem saber o que converte.",
      goodIcon: ShieldCheck,
      good: "Ritual de métricas",
      goodDesc: "Decisão com dado — a empresa deixa de ser refém do acaso comercial.",
    },
  ];
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          <span className={goldRule} /> Antes e depois da PO2
        </div>
        <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          Outbound não falha por falta de esforço.{" "}
          <span className="font-display font-normal italic text-gold">
            Falha por falta de método.
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Empresas com bons produtos e vendedores continuam sem previsibilidade porque a prospecção
          acontece no improviso — e a conta chega em pipeline fraco e CAC alto.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-2 border-b border-white/10 bg-white/5 text-[11px] font-bold uppercase tracking-[0.25em]">
            <div className="flex items-center gap-2 px-6 py-4 text-red-400/80">
              <span className="size-1.5 rounded-full bg-red-400/70" /> Sem método
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 px-6 py-4 text-gold">
              <span className="size-1.5 rounded-full bg-gold" /> Com PO2
            </div>
          </div>
          {rows.map((r) => (
            <div key={r.bad} className="grid grid-cols-2 border-b border-white/5 last:border-b-0">
              <div className="flex gap-4 bg-card/40 p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-red-400/20 bg-red-400/5 text-red-400/80">
                  <r.badIcon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground/90">{r.bad}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.badDesc}</p>
                </div>
              </div>
              <div className="flex gap-4 border-l border-white/10 bg-card/70 p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                  <r.goodIcon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold">{r.good}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.goodDesc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08),transparent_60%)]" />
      <div className="mx-auto max-w-5xl px-6 py-32 text-center">
        <div className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
          <Sparkles className="size-3" /> A Tese PO2
        </div>
        <blockquote className="font-display text-3xl leading-tight text-foreground md:text-5xl">
          "Outbound não é sobre ligar mais. É sobre <em className="text-gold">ligar melhor</em>,
          para as pessoas certas, com a mensagem certa, no momento certo — e com controle dos
          números."
        </blockquote>
        <p className="mt-10 text-base text-muted-foreground">
          Prospecção não é dom. É processo, repetição inteligente e melhoria contínua.
        </p>
      </div>
    </section>
  );
}

const METHOD_PHASES = [
  {
    key: "preparacao",
    label: "Preparação",
    tagline: "Antes do primeiro contato",
    steps: [
      {
        n: "01",
        icon: Target,
        t: "ICP & Listas",
        d: "Definição de empresas-alvo, cargos e critérios de qualificação.",
      },
      {
        n: "02",
        icon: Search,
        t: "Estudo de Lead",
        d: "Pesquisa prévia de empresa, dores e decisores antes do contato.",
      },
    ],
  },
  {
    key: "abordagem",
    label: "Abordagem",
    tagline: "Do primeiro toque à conversa",
    steps: [
      {
        n: "03",
        icon: Layers,
        t: "Cadência Multicanal",
        d: "Sequência progressiva por e-mail, LinkedIn, cold call e WhatsApp.",
      },
      {
        n: "04",
        icon: Headphones,
        t: "Cold Call Consultiva",
        d: "Abordagem com contexto — não script decorado.",
      },
      {
        n: "05",
        icon: ShieldCheck,
        t: "Gestão de Objeções",
        d: "Documentar, entender raiz e ajustar discurso.",
      },
    ],
  },
  {
    key: "conversao",
    label: "Conversão",
    tagline: "Da reunião à melhoria contínua",
    steps: [
      {
        n: "06",
        icon: Filter,
        t: "Qualificação",
        d: "Aplicação de CHAMP, SPIN ou Gap Selling conforme o lead.",
      },
      {
        n: "07",
        icon: BarChart3,
        t: "Métricas & Melhoria",
        d: "Volume, conexão, agendamento e conversão por canal e segmento.",
      },
    ],
  },
];

function CadenceMockup() {
  const touches = [
    {
      day: "Dia 1",
      channel: "E-mail",
      icon: MessageSquare,
      note: "Abertura consultiva, sem pitch de catálogo.",
    },
    { day: "Dia 2", channel: "LinkedIn", icon: Users, note: "Conexão + comentário de contexto." },
    {
      day: "Dia 4",
      channel: "Cold Call",
      icon: Phone,
      note: "Ligação com diagnóstico, não script decorado.",
    },
    {
      day: "Dia 6",
      channel: "WhatsApp",
      icon: Sparkles,
      note: "Follow-up leve, CTA de baixo atrito.",
    },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-background/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
          Cadência multicanal · exemplo
        </span>
        <span className="text-[10px] font-semibold text-muted-foreground">12 toques / 21 dias</span>
      </div>
      <div className="space-y-3">
        {touches.map((t, i) => (
          <div key={t.day} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                <t.icon className="size-3.5" />
              </div>
              {i < touches.length - 1 && <div className="mt-1 h-5 w-px bg-white/10" />}
            </div>
            <div className="flex-1 rounded-lg border border-white/5 bg-card/60 px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">{t.channel}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.day}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Method() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = METHOD_PHASES[activePhase];

  return (
    <section id="metodo" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> O Método
            </div>
            <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Prospecção de Ouro 2.0 —{" "}
              <span className="font-display font-normal italic text-gold">7 etapas</span> que viram
              receita.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Do diagnóstico comercial à otimização contínua de <Jargon term="Pitch">pitch</Jargon>,{" "}
            <Jargon term="ICP">ICP</Jargon> e <Jargon term="Cadência">cadência</Jargon> — com
            acompanhamento semanal e ajustes baseados em dados reais.
          </p>
        </div>

        {/* Navegador por fase do funil */}
        <div className="mb-8 flex flex-wrap gap-2">
          {METHOD_PHASES.map((p, i) => (
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

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div key={phase.key} className="animate-fade-in">
            <div className="mb-5 text-sm font-semibold text-muted-foreground">{phase.tagline}</div>
            <div className="grid gap-4 sm:grid-cols-2">
              {phase.steps.map((s) => (
                <StepInsightDialog
                  key={s.n}
                  stepKey={s.n}
                  trigger={
                    <button
                      type="button"
                      aria-label={`Ver insight da etapa ${s.n} — ${s.t}`}
                      className="group relative h-full w-full cursor-pointer rounded-2xl border border-white/10 bg-card/70 p-7 text-left transition-all hover:-translate-y-1 hover:border-gold/40 focus:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <span className="font-display text-3xl text-gold">{s.n}</span>
                        <div className="flex size-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                          <s.icon className="size-5" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold">{s.t}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 transition-colors group-hover:text-gold">
                        Ver insight →
                      </span>
                    </button>
                  }
                />
              ))}
            </div>
          </div>

          <CadenceMockup />
        </div>
      </div>
    </section>
  );
}

function Pitch() {
  const blocks = [
    {
      n: "01",
      icon: Zap,
      t: "Pattern Interrupt",
      d: "Quebrar o padrão da ligação fria e abrir atenção.",
    },
    {
      n: "02",
      icon: Compass,
      t: "Elevator Pitch",
      d: "Contextualizar o motivo do contato de forma rápida.",
    },
    {
      n: "03",
      icon: Brain,
      t: "Diagnóstico Consultivo",
      d: "Investigar dor, cenário e impacto com perguntas certas.",
    },
    {
      n: "04",
      icon: ListChecks,
      t: "CTA de Baixo Atrito",
      d: "Conduzir para uma conversa simples, sem pressão.",
    },
  ];
  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          <span className={goldRule} /> Os primeiros 15 segundos
        </div>
        <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          O Pitch de <span className="font-display font-normal italic text-gold">4 Blocos</span>{" "}
          PO2.
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Os primeiros 15 segundos definem se o <Jargon term="BDR">BDR</Jargon> será visto como
          vendedor genérico — ou como conversa relevante.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b) => (
            <div key={b.n} className="rounded-2xl border border-white/10 bg-card/70 p-7">
              <span className="font-display text-3xl text-gold">{b.n}</span>
              <div className="mt-6 flex size-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                <b.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border-l-2 border-gold bg-card/60 p-6">
          <p className="font-display text-2xl text-foreground">
            A abordagem da PO2 vende <em className="text-gold">diagnóstico</em> antes de vender
            solução.
          </p>
        </div>
      </div>
    </section>
  );
}

function Methodologies() {
  const ms: Methodology[] = [
    {
      t: "CHAMP",
      d: "Qualificação com foco em dor e prioridade antes de orçamento.",
      acronym: "Challenges · Authority · Money · Prioritization",
      summary:
        "Framework de qualificação que inverte a ordem do BANT: começa pela dor real do cliente, depois valida quem decide, orçamento e prioridade. Foco em entender o problema antes de falar de preço.",
      when: "Use quando o lead ainda não tem clareza do problema ou quando o seu produto resolve uma dor pouco óbvia. Ideal nas primeiras conversas de descoberta.",
      example:
        "Hoje, qual desses três pontos mais impacta o resultado do seu time: volume de leads, qualificação ou conversão final?",
    },
    {
      t: "Challenger Sale",
      d: "Provocar uma nova forma de enxergar o problema do cliente.",
      acronym: "Teach · Tailor · Take control",
      summary:
        "Vendedor desafia a visão atual do cliente trazendo um insight que ele ainda não enxergou. Não atende pedido — provoca uma nova leitura do problema baseada em dados de mercado.",
      when: "Use em mercados maduros, com decisores experientes que já receberam dezenas de abordagens iguais. Quando você precisa se diferenciar pela visão, não pelo produto.",
      example:
        "A maioria dos times comerciais que olhamos achava que o problema era volume. Em 80% dos casos, era ICP errado. Posso te mostrar como identificar isso na sua operação?",
    },
    {
      t: "LAER",
      d: "Ouvir, reconhecer, explorar e responder objeções com método.",
      acronym: "Listen · Acknowledge · Explore · Respond",
      summary:
        "Método de tratamento de objeções em quatro passos. Em vez de rebater na hora, o vendedor escuta até o fim, valida a preocupação, explora a raiz e só então responde com argumento direcionado.",
      when: "Use sempre que surgir objeção real (preço, timing, autoridade). Evita o reflexo de defender o produto e mantém a conversa consultiva.",
      example:
        "Entendi sua preocupação com o investimento. Me ajuda a entender — é o valor em si ou o momento da empresa? (explora antes de responder)",
    },
    {
      t: "SPIN",
      d: "Perguntas que revelam situação, problema, impacto e necessidade.",
      acronym: "Situation · Problem · Implication · Need-payoff",
      summary:
        "Sequência de perguntas criada por Neil Rackham que constrói urgência. Começa mapeando o cenário, identifica problema, amplia o impacto e leva o cliente a verbalizar o ganho da solução.",
      when: "Use em vendas complexas e consultivas, com ciclo médio/longo. Especialmente forte quando o cliente subestima o custo de não resolver.",
      example:
        "Se esse gargalo continuar pelos próximos seis meses, qual o impacto direto no faturamento do trimestre?",
    },
    {
      t: "Gap Selling",
      d: "Conectar cenário atual, desejado e custo do gap.",
      acronym: "Estado atual · Estado desejado · Custo do gap",
      summary:
        "Metodologia de Keenan que estrutura a venda em torno do gap entre onde o cliente está hoje e onde ele quer chegar. O preço vira consequência do custo de não fechar o gap.",
      when: "Use quando o cliente reconhece o problema mas não quantifica. Ajuda a transformar 'seria bom resolver' em 'preciso resolver agora'.",
      example:
        "Você está hoje em X reuniões/mês e quer chegar em Y. Esse gap representa quanto de receita não realizada por mês?",
    },
    {
      t: "BANT",
      d: "Validar orçamento, autoridade e timing em leads mais maduros.",
      acronym: "Budget · Authority · Need · Timing",
      summary:
        "Framework clássico criado pela IBM. Qualifica pelo orçamento disponível, autoridade do contato, necessidade clara e prazo de decisão. Eficiente para limpar pipeline rápido.",
      when: "Use em leads já maduros, em estágios mais avançados do funil, ou para priorizar fila do closer. Não substitui descoberta inicial — complementa.",
      example:
        "Para encaixar com nossos planos, faz sentido para mim entender: orçamento previsto, quem mais decide com você e janela de implantação. Podemos passar por esses três?",
    },
  ];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Methodology | null>(null);
  return (
    <section id="metodologias" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Metodologias aplicadas
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Abordagem consultiva,{" "}
            <span className="font-display font-normal italic text-gold">
              não discurso decorado.
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A PO2 aplica frameworks consagrados conforme o tipo de <Jargon term="ICP">lead</Jargon>{" "}
            e o estágio comercial — leitura de cenário, não roteiro robótico. Clique em cada
            metodologia para entender o que é e quando aplicar.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {ms.map((m) => (
            <button
              key={m.t}
              type="button"
              onClick={() => {
                setActive(m);
                setOpen(true);
              }}
              className="group bg-card/70 p-7 text-left transition-colors hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            >
              <div className="font-display text-3xl text-gold">{m.t}</div>
              <p className="mt-3 text-sm text-muted-foreground">{m.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 transition-colors group-hover:text-gold">
                Ver resumo →
              </span>
            </button>
          ))}
        </div>
        <MethodologyDialog item={active} open={open} onOpenChange={setOpen} />
        <EvolutionModel />
      </div>
    </section>
  );
}

function Mentoria() {
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

function Cases() {
  const cases = [
    {
      n: "01",
      company: "Mansão Maromba",
      contact: "Diretor Thiago (Toguro)",
      context: "Contato direto com o diretor. Agenda realizada para fechar parceria.",
      metric: "Parceria",
      metricLabel: "agendada com C-Level.",
      tag: "C-Level",
    },
    {
      n: "02",
      company: "Comil Ônibus",
      contact: "Diretoria executiva",
      context: "Conversa direta com diretores sobre uso de I.A. na operação.",
      metric: "+R$ 40K",
      metricLabel: "MRR em proposta avançada.",
      tag: "Em proposta",
    },
    {
      n: "03",
      company: "Kabum",
      contact: "Setor financeiro",
      context: "Agenda realizada para falar com o setor financeiro.",
      metric: "+R$ 100K",
      metricLabel: "DIAL em proposta avançada.",
      tag: "Em proposta",
    },
    {
      n: "04",
      company: "Volpato",
      contact: "Time de tecnologia",
      context: "Agenda realizada para falar sobre tecnologia.",
      metric: "+R$ 12K",
      metricLabel: "MRR em proposta avançada.",
      tag: "Em proposta",
    },
  ];
  return (
    <section id="casos" className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> Casos reais
            </div>
            <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Empresas prospectadas pelo{" "}
              <span className="font-display font-normal italic text-gold">Matheus Staruck.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Contatos diretos com decisores, agendas realizadas e propostas em andamento — método
            validado em campo.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <div
              key={c.n}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-card/70 p-7 transition-colors hover:border-gold/40"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl text-muted-foreground/40">{c.n}</span>
                  <div className="flex size-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                    <Building2 className="size-5" />
                  </div>
                </div>
                <span className="rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                  {c.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{c.company}</h3>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {c.contact}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.context}</p>
              <div className="mt-6 flex items-baseline gap-2 border-t border-white/5 pt-5">
                <span className="font-display text-3xl text-gold">{c.metric}</span>
                <span className="text-sm text-muted-foreground">{c.metricLabel}</span>
                <TrendingUp className="ml-auto size-5 text-gold/60 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CostComparison() {
  const stack = [
    {
      label: "Salário + encargos (CLT, júnior)",
      note: "Piso + FGTS, INSS, 13º, férias",
      value: "R$ 6.500",
    },
    { label: "Ferramentas", note: "CRM, enriquecimento de dados, discador", value: "R$ 900" },
    {
      label: "Tempo de gestor treinando",
      note: "Supervisão, script, onboarding",
      value: "R$ 1.200",
    },
  ];
  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Custo real <span className={goldRule} />
          </div>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Montar um <span className="font-display font-normal italic text-gold">BDR interno</span>{" "}
            custa mais do que parece.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Sem contar os 60 a 90 dias de ramp-up em que o BDR ainda não bate meta — tempo em que o
            CAC sobe e o pipeline continua fraco.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="rounded-3xl border border-white/10 bg-card/70 p-8">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Montar sozinho
            </div>
            <div className="mb-6 text-sm text-muted-foreground">
              Contratação + estrutura própria · 1 BDR
            </div>
            <div className="space-y-4">
              {stack.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground/90">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.note}</div>
                  </div>
                  <div className="shrink-0 font-display text-xl text-foreground/80">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Total / mês
              </span>
              <span className="font-display text-4xl text-foreground">R$ 8.600</span>
            </div>
          </div>

          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold lg:rotate-0">
            <ArrowRight className="size-5 rotate-90 lg:rotate-0" />
          </div>

          <div className="relative rounded-3xl border border-gold/50 bg-gradient-to-b from-gold/10 to-card/80 p-8 shadow-[0_0_60px_-15px_rgba(197,160,89,0.4)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-foreground">
              Sem ramp-up às cegas
            </div>
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              Com a PO2
            </div>
            <div className="mb-6 text-sm text-muted-foreground">
              Plano PO2 Growth · operação rodando em 3 meses
            </div>
            <ul className="space-y-3">
              {[
                "Método validado — sem curva de aprendizado",
                "ICP, cadência e scripts prontos desde a semana 1",
                "Acompanhamento semanal incluso",
                "Sem encargos trabalhistas nem gestão de pessoa",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-gold/20 pt-5">
              <span className="text-sm font-bold uppercase tracking-widest text-gold">
                Equivalente / mês
              </span>
              <span className="font-display text-4xl text-gold">R$ 4.000</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <div className="font-display text-2xl text-gold">
            Economia de ~53% no mês, sem os 90 dias às cegas.
          </div>
          <p className="max-w-xl text-xs text-muted-foreground">
            Valores de referência (jun/2026) para estimar o custo de estruturar um BDR interno vs.
            contratar o plano PO2 Growth. Podem variar por região, senioridade e negociação — use
            como comparativo, não como orçamento fechado.
          </p>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "PO2 Core",
      tag: "Organizar",
      duration: "1 mês",
      price: "R$ 8.000",
      highlight: false,
      features: [
        "Diagnóstico comercial",
        "ICP e personas",
        "Playbook de prospecção",
        "Scripts e cadências (base)",
        "Listas direcionais",
        "Treinamento BDR — 1 encontro",
        "Acompanhamento pontual",
      ],
    },
    {
      name: "PO2 Growth",
      tag: "Rodar",
      duration: "3 meses",
      price: "R$ 12.000",
      highlight: true,
      features: [
        "Tudo do Core",
        "Scripts e cadências completos",
        "Construção de listas",
        "Treinamento BDR recorrente",
        "Acompanhamento semanal",
        "Gestão de indicadores",
        "Otimização de pitch",
        "Dashboard comercial básico",
      ],
    },
    {
      name: "PO2 Enterprise",
      tag: "Escalar",
      duration: "6 meses",
      price: "R$ 45.000",
      highlight: false,
      features: [
        "Tudo do Growth",
        "Scripts e cadências avançados",
        "Treinamento contínuo",
        "Acompanhamento estratégico semanal",
        "Dashboard comercial completo",
        "Otimização contínua de pitch e ICP",
      ],
    },
  ];
  return (
    <section id="planos" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Planos & Investimento <span className={goldRule} />
          </div>
          <h2 className="mx-auto max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Três níveis para sua{" "}
            <span className="font-display font-normal italic text-gold">maturidade comercial.</span>
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${p.highlight ? "border-gold/50 bg-gradient-to-b from-gold/10 to-card/80 shadow-[0_0_60px_-15px_rgba(197,160,89,0.4)]" : "border-white/10 bg-card/70"}`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-foreground">
                  Mais escolhido
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl text-foreground">{p.name}</h3>
                <span className="rounded-full border border-gold/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                  {p.tag}
                </span>
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Duração · {p.duration}
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl text-gold">{p.price}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
              <DiagnosticDialog
                plan={p.name}
                trigger={
                  <button
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${p.highlight ? "bg-gold text-gold-foreground hover:shadow-[0_0_40px_rgba(197,160,89,0.45)]" : "border border-white/10 bg-white/5 text-foreground hover:bg-white/10"}`}
                  >
                    Realizar o diagnóstico gratuito <ArrowRight className="size-4" />
                  </button>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[140px]" />
      <div className="mx-auto max-w-4xl px-6 py-32 text-center">
        <Logo className="mx-auto mb-10 h-16 w-auto opacity-90" />
        <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
          Pronto para tirar a prospecção{" "}
          <span className="font-display font-normal italic text-gold">do improviso?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Agende um diagnóstico gratuito. Em 30 minutos, mapeamos os gargalos da sua operação
          outbound e mostramos onde está o ouro.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <DiagnosticDialog
            trigger={
              <button className={ctaPrimary}>
                <Phone className="size-4" /> Realizar o diagnóstico gratuito
              </button>
            }
          />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Vagas limitadas por mês
        </p>
      </div>
    </section>
  );
}
