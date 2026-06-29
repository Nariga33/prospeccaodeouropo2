import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/po2-logo.png";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { EvolutionModel } from "@/components/po2/EvolutionModel";
import { StepInsightDialog } from "@/components/po2/StepInsightDialog";
import { Jargon } from "@/components/po2/Jargon";
import { MethodologyDialog, type Methodology } from "@/components/po2/MethodologyDialog";
import { CountUp } from "@/hooks/use-count-up";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import {
  Phone, Target, Layers, LineChart, Building2, Users, TrendingUp, Wallet,
  Check, ArrowRight, Sparkles, Search, MessageSquare, Headphones, ShieldCheck,
  Filter, BarChart3, Zap, Compass, Brain, ListChecks, GraduationCap, Calendar, ClipboardList, Activity,
} from "lucide-react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PO2 — Prospecção de Ouro 2.0 | Assessoria de Prospecção B2B" },
      { name: "description", content: "Prospecção ativa com método, inteligência e previsibilidade. Do primeiro contato à reunião qualificada." },
      { property: "og:title", content: "PO2 — Prospecção de Ouro 2.0" },
      { property: "og:description", content: "Outbound com método. +R$2M gerados, +100k ligações, +1k agendas qualificadas." },
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
        <Founder />
        <Problem />
        <Consequences />
        <Thesis />
        <Method />
        <Mentoria />
        <Pitch />
        <Methodologies />
        <Cases />
        <Pricing />
        <FinalCta />

      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3"><Logo className="h-9 w-auto" /></a>
        <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#metodo" className="transition-colors hover:text-gold">Método</a>
          <a href="#metodologias" className="transition-colors hover:text-gold">Metodologias</a>
          <a href="#casos" className="transition-colors hover:text-gold">Resultados</a>
          <a href="#planos" className="transition-colors hover:text-gold">Planos</a>
        </nav>
        <DiagnosticDialog trigger={<button className={ctaPrimary}>Diagnóstico gratuito <ArrowRight className="size-4" /></button>} />
      </div>
    </header>
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
            Do primeiro contato à reunião qualificada. Estruturamos sua operação outbound com ICP, cadência, abordagem consultiva e métricas — para tirar o crescimento do improviso e colocá-lo no painel de controle.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <DiagnosticDialog trigger={<button className={ctaPrimary}>Realizar o diagnóstico gratuito <ArrowRight className="size-4" /></button>} />
            <a href="#metodo" className={ctaSecondary}>Ver o método PO2</a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gold/10 blur-3xl" />
          <div className="rounded-3xl border border-white/10 bg-card/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Painel · Resultado acumulado</span>
              <div className="flex gap-1">
                <span className="size-2 rounded-full bg-red-500/50" />
                <span className="size-2 rounded-full bg-amber-500/50" />
                <span className="size-2 rounded-full bg-emerald-500/50" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Receita gerada</div>
              <div className="font-display text-6xl text-gold">+R$ 2M</div>
              <div className="text-sm text-muted-foreground">em +30 negócios fechados</div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[{v:"+100k",l:"Ligações"},{v:"+5k",l:"Empresas"},{v:"+1k",l:"Agendas"}].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/5 p-4">
                  <div className="font-display text-2xl text-foreground">{s.v}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.l}</div>
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
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.5fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> Quem está por trás
            </div>
            <h2 className="font-display text-5xl text-foreground">Matheus Staruck</h2>
            <p className="mt-4 text-muted-foreground">Fundador da PO2. Especialista em operações outbound B2B — método validado em campo, não em teoria.</p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.l} className="bg-card/80 p-6">
                <div className="font-display text-3xl text-gold">{s.v}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const issues = [
    { icon: Target, t: "Sem ICP", d: "Listas feitas no chute, sem critério de qualificação." },
    { icon: MessageSquare, t: "Abordagem Genérica", d: "Mensagem igual para todo mundo — sem contexto." },
    { icon: Layers, t: "Cadência Sem Estratégia", d: "Sequência sem narrativa, sem progressão comercial." },
    { icon: BarChart3, t: "Número Sem Análise", d: "Time ocupado, mas sem saber o que converte." },
  ];
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          <span className={goldRule} /> O Problema
        </div>
        <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          Outbound não falha por falta de esforço.{" "}
          <span className="font-display font-normal italic text-gold">Falha por falta de método.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Empresas com bons produtos e vendedores continuam sem previsibilidade porque a prospecção acontece no improviso.
        </p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-4">
          {issues.map((i) => (
            <div key={i.t} className="group bg-card/70 p-7 transition-colors hover:bg-card">
              <div className="mb-5 inline-flex size-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                <i.icon className="size-5" />
              </div>
              <h3 className="text-lg font-bold">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Consequences() {
  const items = [
    { icon: LineChart, t: "Pipeline Fraco", d: "Sem geração ativa, o funil depende de indicação e esforço desorganizado." },
    { icon: Users, t: "Reuniões Sem Qualidade", d: "Vendedores falando com leads errados — sem critério de qualificação." },
    { icon: Wallet, t: "CAC Mais Alto", d: "Time comercial improdutivo eleva o custo de aquisição." },
    { icon: ShieldCheck, t: "Dependência de Indicação", d: "Sem previsibilidade, a empresa fica refém do acaso comercial." },
  ];
  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> O custo
            </div>
            <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              O preço de continuar operando{" "}
              <span className="font-display font-normal italic text-gold">no escuro.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Estar ocupado não significa estar prospectando. Sem método, todo esforço comercial vira ruído — e a conta chega.
            </p>
          </div>
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.t} className="flex gap-5 rounded-2xl border border-white/10 bg-card/70 p-6 transition-colors hover:border-gold/30">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                  <i.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold">{i.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
                </div>
              </div>
            ))}
          </div>
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
          "Outbound não é sobre ligar mais. É sobre <em className="text-gold">ligar melhor</em>, para as pessoas certas, com a mensagem certa, no momento certo — e com controle dos números."
        </blockquote>
        <p className="mt-10 text-base text-muted-foreground">
          Prospecção não é dom. É processo, repetição inteligente e melhoria contínua.
        </p>
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    { n: "01", icon: Target, t: "ICP & Listas", d: "Definição de empresas-alvo, cargos e critérios de qualificação." },
    { n: "02", icon: Search, t: "Estudo de Lead", d: "Pesquisa prévia de empresa, dores e decisores antes do contato." },
    { n: "03", icon: Layers, t: "Cadência Multicanal", d: "Sequência progressiva por e-mail, LinkedIn, cold call e WhatsApp." },
    { n: "04", icon: Headphones, t: "Cold Call Consultiva", d: "Abordagem com contexto — não script decorado." },
    { n: "05", icon: ShieldCheck, t: "Gestão de Objeções", d: "Documentar, entender raiz e ajustar discurso." },
    { n: "06", icon: Filter, t: "Qualificação", d: "Aplicação de CHAMP, SPIN ou Gap Selling conforme o lead." },
    { n: "07", icon: BarChart3, t: "Métricas & Melhoria", d: "Volume, conexão, agendamento e conversão por canal e segmento." },
  ];
  return (
    <section id="metodo" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> O Método
            </div>
            <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Prospecção de Ouro 2.0 —{" "}
              <span className="font-display font-normal italic text-gold">7 etapas</span> que viram receita.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Do diagnóstico comercial à otimização contínua de pitch, ICP e cadência — com acompanhamento semanal e ajustes baseados em dados reais.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, idx) => (
            <StepInsightDialog
              key={s.n}
              stepKey={s.n}
              trigger={
                <button
                  type="button"
                  aria-label={`Ver insight da etapa ${s.n} — ${s.t}`}
                  className={`group relative h-full w-full cursor-pointer rounded-2xl border border-white/10 bg-card/70 p-7 text-left transition-all hover:-translate-y-1 hover:border-gold/40 focus:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 ${idx === 6 ? "lg:col-start-2" : ""}`}
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
    </section>
  );
}

function Pitch() {
  const blocks = [
    { n: "01", icon: Zap, t: "Pattern Interrupt", d: "Quebrar o padrão da ligação fria e abrir atenção." },
    { n: "02", icon: Compass, t: "Elevator Pitch", d: "Contextualizar o motivo do contato de forma rápida." },
    { n: "03", icon: Brain, t: "Diagnóstico Consultivo", d: "Investigar dor, cenário e impacto com perguntas certas." },
    { n: "04", icon: ListChecks, t: "CTA de Baixo Atrito", d: "Conduzir para uma conversa simples, sem pressão." },
  ];
  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          <span className={goldRule} /> Os primeiros 15 segundos
        </div>
        <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          O Pitch de <span className="font-display font-normal italic text-gold">4 Blocos</span> PO2.
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Os primeiros 15 segundos definem se o BDR será visto como vendedor genérico — ou como conversa relevante.
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
            A abordagem da PO2 vende <em className="text-gold">diagnóstico</em> antes de vender solução.
          </p>
        </div>
      </div>
    </section>
  );
}

function Methodologies() {
  const ms = [
    { t: "CHAMP", d: "Qualificação com foco em dor e prioridade antes de orçamento." },
    { t: "Challenger Sale", d: "Provocar uma nova forma de enxergar o problema do cliente." },
    { t: "LAER", d: "Ouvir, reconhecer, explorar e responder objeções com método." },
    { t: "SPIN", d: "Perguntas que revelam situação, problema, impacto e necessidade." },
    { t: "Gap Selling", d: "Conectar cenário atual, desejado e custo do gap." },
    { t: "BANT", d: "Validar orçamento, autoridade e timing em leads mais maduros." },
  ];
  return (
    <section id="metodologias" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Metodologias aplicadas
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Abordagem consultiva, <span className="font-display font-normal italic text-gold">não discurso decorado.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A PO2 aplica frameworks consagrados conforme o tipo de lead e o estágio comercial — leitura de cenário, não roteiro robótico.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {ms.map((m) => (
            <div key={m.t} className="bg-card/70 p-7">
              <div className="font-display text-3xl text-gold">{m.t}</div>
              <p className="mt-3 text-sm text-muted-foreground">{m.d}</p>
            </div>
          ))}
        </div>
        <EvolutionModel />
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
              Empresas prospectadas pelo <span className="font-display font-normal italic text-gold">Matheus Staruck.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Contatos diretos com decisores, agendas realizadas e propostas em andamento — método validado em campo.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <div key={c.n} className="group relative flex flex-col rounded-2xl border border-white/10 bg-card/70 p-7 transition-colors hover:border-gold/40">
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
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.contact}</div>
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


function Pricing() {
  const plans = [
    {
      name: "PO2 Core", tag: "Organizar", duration: "1 mês", price: "R$ 8.000", highlight: false,
      features: ["Diagnóstico comercial","ICP e personas","Playbook de prospecção","Scripts e cadências (base)","Listas direcionais","Treinamento BDR/SDR — 1 encontro","Acompanhamento pontual"],
    },
    {
      name: "PO2 Growth", tag: "Rodar", duration: "3 meses", price: "R$ 12.000", highlight: true,
      features: ["Tudo do Core","Scripts e cadências completos","Construção de listas","Treinamento BDR/SDR recorrente","Acompanhamento semanal","Gestão de indicadores","Otimização de pitch","Dashboard comercial básico"],
    },
    {
      name: "PO2 Enterprise", tag: "Escalar", duration: "6 meses", price: "R$ 45.000", highlight: false,
      features: ["Tudo do Growth","Scripts e cadências avançados","Treinamento contínuo","Acompanhamento estratégico semanal","Dashboard comercial completo","Otimização contínua de pitch e ICP"],
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
            Três níveis para sua <span className="font-display font-normal italic text-gold">maturidade comercial.</span>
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-3xl border p-8 ${p.highlight ? "border-gold/50 bg-gradient-to-b from-gold/10 to-card/80 shadow-[0_0_60px_-15px_rgba(197,160,89,0.4)]" : "border-white/10 bg-card/70"}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-foreground">
                  Mais escolhido
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl text-foreground">{p.name}</h3>
                <span className="rounded-full border border-gold/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">{p.tag}</span>
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Duração · {p.duration}</div>
              <div className="mt-6 flex items-baseline gap-2"><span className="font-display text-5xl text-gold">{p.price}</span></div>
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
                  <button className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${p.highlight ? "bg-gold text-gold-foreground hover:shadow-[0_0_40px_rgba(197,160,89,0.45)]" : "border border-white/10 bg-white/5 text-foreground hover:bg-white/10"}`}>
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
          Pronto para tirar a prospecção <span className="font-display font-normal italic text-gold">do improviso?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Agende um diagnóstico gratuito. Em 30 minutos, mapeamos os gargalos da sua operação outbound e mostramos onde está o ouro.
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
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Vagas limitadas por mês</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-4">
          <Logo className="h-10 w-auto" />
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <p className="text-xs text-muted-foreground">Assessoria de Prospecção B2B · Matheus Staruck</p>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} PO2 — Prospecção de Ouro 2.0
        </div>
      </div>
    </footer>
  );
}
