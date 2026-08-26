import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import logo from "@/assets/po2-logo.png";
import matheusPhoto from "@/assets/matheus-staruck.jpg";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { EvolutionModel } from "@/components/po2/EvolutionModel";
import { StepInsightDialog } from "@/components/po2/StepInsightDialog";
import { Jargon } from "@/components/po2/Jargon";
import { MethodologyDialog, type Methodology } from "@/components/po2/MethodologyDialog";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { CountUp } from "@/hooks/use-count-up";
import { HeroLivePanel } from "@/components/po2/HeroLivePanel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FullFunnelOverview } from "@/components/po2/FullFunnelOverview";
import { Testimonials } from "@/components/po2/Testimonials";
import { ServicesShowcase } from "@/components/po2/ServicesShowcase";
import { WhoItsFor } from "@/components/po2/WhoItsFor";
import { ThePlan } from "@/components/po2/ThePlan";
import { RiskReduction } from "@/components/po2/RiskReduction";
import { Faq } from "@/components/po2/Faq";
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
  ExternalLink,
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
  Loader2,
  Handshake,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PO2 — Assessoria de Prospecção B2B em Porto Alegre, RS" },
      {
        name: "description",
        content:
          "Assessoria de prospecção B2B em Porto Alegre (RS), atendendo todo o Brasil: LDR, BDR, SDR, Inside Sales e Closer numa operação só, com método, inteligência e previsibilidade.",
      },
      { property: "og:title", content: "PO2 — Prospecção de Ouro 2.0" },
      {
        property: "og:description",
        content: "Outbound com método. +R$2M gerados, +200k ligações, +10k empresas prospectadas.",
      },
      { property: "og:url", content: "https://www.prospeccaoodeouropo2.com/" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Pra que tamanho de empresa a PO2 é indicada?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Empresas B2B que já vendem, mas dependem de esforço individual pra gerar oportunidade — de times de 1 vendedor a operações com múltiplos BDR, SDR e closers.",
              },
            },
            {
              "@type": "Question",
              name: "Já tenho time comercial. Por que contratar a PO2?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A PO2 não substitui o time — estrutura o método que ele executa: ICP, cadência, script e métricas. Time sem processo vende menos do que poderia, independente do tamanho.",
              },
            },
            {
              "@type": "Question",
              name: "Como a PO2 funciona pro meu segmento?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "O método se adapta ao ciclo de venda e ao ICP do negócio. O diagnóstico gratuito mapeia isso antes de qualquer proposta.",
              },
            },
            {
              "@type": "Question",
              name: "O que diferencia a PO2 de uma consultoria comum?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Não entrega só um relatório — participa da execução, com acompanhamento prático e correção de rota junto com o time.",
              },
            },
            {
              "@type": "Question",
              name: "Quanto tempo leva pra aparecer resultado com a PO2?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Depende da maturidade da operação. A maioria dos clientes vê um fluxo mais previsível de oportunidades entre 60 e 90 dias de implementação do método.",
              },
            },
            {
              "@type": "Question",
              name: "A PO2 garante resultado de vendas?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Não promete número de vendas — isso depende de fatores fora do controle da consultoria, como produto, preço e mercado. O que garante é a estruturação do método. Na Mentoria, especificamente, há garantia de 7 dias.",
              },
            },
          ],
        },
      },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaoodeouropo2.com/" }],
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

        {/* PROBLEMA — dor real, antes/depois */}
        <ProblemVsMethod />

        {/* SOLUÇÃO / MÉTODO — o funil completo e as 5 frentes */}
        <FullFunnelOverview />
        <ServicesShowcase />
        <MetodologiasTeaser />

        {/* Qualificação — pra quem é (e pra quem não é) */}
        <WhoItsFor />

        {/* COMO — o passo a passo aplicado na prática */}
        <Pitch />
        <EventosTeaser />
        <MentoriaTeaser />

        {/* O Plano — o que acontece depois do sim */}
        <ThePlan />

        {/* QUEM ESTÁ POR TRÁS — autoridade, depois que a dor já fisgou */}
        <Founder />

        {/* CASES */}
        <Cases />

        {/* AVALIAÇÕES */}
        <Testimonials />

        {/* Investimento — justifica o valor antes do CTA final */}
        <CostComparison />

        {/* Redução de risco — reforça garantia antes da decisão */}
        <RiskReduction />

        {/* Dúvidas — quebra objeção antes da decisão */}
        <Faq />

        {/* CTA */}
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

function MentoriaTeaser() {
  return (
    <section className="border-t border-white/5 bg-surface/40 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          <GraduationCap className="size-3" /> Mentoria com Matheus Staruck
        </div>
        <h2 className="mt-4 font-[Instrument_Serif] text-4xl leading-tight md:text-5xl">
          Quer aprender o método e aplicar com acompanhamento?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Não é curso gravado — é operação real, corrigida sessão a sessão. 8 módulos,
          acompanhamento prático e 7 dias de garantia.
        </p>
        <div className="mt-8">
          <Link to="/mentoria" className={ctaPrimary}>
            Conhecer a mentoria <ArrowRight className="size-4" />
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
            Assessoria Comercial Full Funnel
          </div>
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Sua máquina comercial completa, com{" "}
            <span className="font-display font-normal italic text-gold">método</span>,{" "}
            <span className="font-display font-normal italic text-gold">inteligência</span> e{" "}
            <span className="font-display font-normal italic text-gold">previsibilidade</span>.
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-lg text-muted-foreground">
            Prospecção ativa estruturada de ponta a ponta — da primeira ligação ao contrato fechado
            — pra empresas que já vendem, mas ainda dependem do esforço individual de quem
            prospecta.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <DiagnosticDialog
              trigger={
                <button className={ctaPrimary}>
                  Realizar o diagnóstico gratuito <ArrowRight className="size-4" />
                </button>
              }
            />
            <Link to="/bdr" className={ctaSecondary}>
              Ver o método PO2
            </Link>
          </div>

          <div className="mt-10">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Cobertura full funnel
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {["LDR", "BDR", "SDR", "Inside Sales", "Closer"].map((r, i, arr) => (
                <div key={r} className="flex items-center gap-1.5">
                  <span className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1.5 text-xs font-bold text-gold">
                    <Jargon term={r}>{r}</Jargon>
                  </span>
                  {i < arr.length - 1 && <ArrowRight className="size-3 text-gold/40" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <HeroLivePanel />
      </div>
    </section>
  );
}

// Indicadores de autoridade — edite os valores livremente conforme os números crescem.
const AUTHORITY_INDICATORS = [
  { v: "+R$2MM", l: "Receita gerada" },
  { v: "+5", l: "Anos em operação outbound" },
  { v: "+200k", l: "Ligações realizadas" },
  { v: "+10k", l: "Empresas prospectadas" },
];

function Founder() {
  return (
    <section id="fundador" className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          <span className={goldRule} /> Quem está por trás
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gold/10 blur-3xl" />
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black/40">
              <img
                src={matheusPhoto}
                alt="Matheus Staruck, Founder & CEO da PO2"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-5xl text-foreground">Matheus Staruck</h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Founder &amp; CEO — PO2 Prospecção de Ouro 2.0
            </p>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Nasci em Torres, Rio Grande do Sul, mas fui criado em Arroio do Sal. Sou filho de um
                construtor civil e de uma professora que, ao longo do tempo, se tornou empresária no
                segmento de eventos — foi acompanhando essa trajetória que aprendi desde cedo sobre
                relacionamento com clientes, negociação e fechamento de contratos.
              </p>
              <p>
                Meu lado empreendedor começou muito cedo: desde os 12 anos eu buscava maneiras de
                ganhar dinheiro fazendo pequenos serviços e negociando produtos no Marketplace do
                Facebook — o "Brick", como a gente chama aqui no sul. Depois vieram os estudos em
                Tecnologia da Informação e a manutenção de computadores pra conhecidos e familiares,
                até passar pelo varejo.
              </p>
              <p>
                Foi na Hub7 que mergulhei de vez no universo da prospecção B2B, outbound e
                desenvolvimento comercial — participando da construção de operações comerciais,
                estruturação de processos, criação de cadências, treinamento de equipes e
                negociações estratégicas.
              </p>
              <p>
                Toda essa experiência resultou na criação da PO2, onde hoje ajudo empresas a criarem
                operações comerciais previsíveis através de metodologia, processos, tecnologia e
                inteligência comercial.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:grid-cols-4">
          {AUTHORITY_INDICATORS.map((s) => (
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
    </section>
  );
}

function ProblemVsMethod() {
  const rows = [
    {
      badIcon: Target,
      bad: "Sem ICP",
      badDesc: "Listas feitas no chute, sem critério de qualificação.",
      badLong:
        "Sem ICP documentado, cada etapa trata todo contato do mesmo jeito — seja o BDR ligando frio ou o SDR respondendo um lead novo. Empresas que nunca comprariam recebem o mesmo esforço das que fechariam rápido, e isso só fica claro quando já é tarde.",
      goodIcon: LineChart,
      good: "ICP documentado",
      goodDesc: "Pipeline previsível, com esforço direcionado para quem compra.",
      goodLong:
        "Com ICP escrito e compartilhado entre marketing, pré-venda e closer, cada etapa do funil sabe exatamente quem vale o esforço. O pipeline fica mais enxuto — mas muito mais previsível.",
    },
    {
      badIcon: MessageSquare,
      bad: "Abordagem genérica",
      badDesc: "Mensagem igual para todo mundo — sem contexto.",
      badLong:
        "A mesma mensagem genérica vai pra todo mundo, outbound ou inbound. O lead sente que está recebendo spam, mesmo quando o produto poderia resolver o problema real dele — e a taxa de resposta paga o preço.",
      goodIcon: Users,
      good: "Abordagem consultiva",
      goodDesc: "Reuniões com decisores certos — não leads errados.",
      goodLong:
        "Cada abordagem nasce do contexto real do lead — empresa, cargo, momento. A reunião que acontece já começa validada, porque quem está do outro lado sentiu que foi entendido antes de ser abordado.",
    },
    {
      badIcon: Layers,
      bad: "Cadência sem estratégia",
      badDesc: "Sequência sem narrativa, sem progressão comercial.",
      badLong:
        "Sequência de contato sem lógica — um e-mail aqui, uma ligação ali, sem narrativa entre os toques. O lead recebe estímulos desconexos e não entende por que continua sendo procurado.",
      goodIcon: Wallet,
      good: "Cadência estruturada",
      goodDesc: "Time comercial produtivo, CAC mais baixo.",
      goodLong:
        "Cada canal — e-mail, LinkedIn, ligação, WhatsApp — entra numa ordem que conta uma história, reforçando a mesma mensagem sob ângulos diferentes até a resposta acontecer.",
    },
    {
      badIcon: BarChart3,
      bad: "Número sem análise",
      badDesc: "Time ocupado, mas sem saber o que converte.",
      badLong:
        "O time está sempre ocupado — ligando, respondendo, negociando — mas ninguém sabe dizer com clareza o que está funcionando e o que está só queimando tempo.",
      goodIcon: ShieldCheck,
      good: "Ritual de métricas",
      goodDesc: "Decisão com dado — a empresa deixa de ser refém do acaso comercial.",
      goodLong:
        "Métrica revisada toda semana, por etapa do funil, revela exatamente onde está o gargalo — lista ruim, abordagem fraca ou negociação sem critério. A decisão vira dado, não achismo.",
    },
  ];
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          <span className={goldRule} /> Antes e depois da PO2
        </div>
        <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          Sua operação comercial não falha por falta de esforço.{" "}
          <span className="font-display font-normal italic text-gold">
            Falha por falta de método.
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Empresas com bons produtos e vendedores continuam sem previsibilidade porque cada etapa —
          do primeiro contato ao fechamento — acontece no improviso. A conta chega em pipeline fraco
          e CAC alto.
        </p>

        <blockquote className="mt-10 max-w-3xl border-l-2 border-gold/50 pl-6 font-display text-xl italic leading-snug text-foreground/90 md:text-2xl">
          "Vender mais não é sobre fazer mais contato. É sobre fazer o contato{" "}
          <em className="not-italic text-gold">certo</em>, com a pessoa certa, no momento certo — em
          qualquer etapa do funil, com controle dos números."
        </blockquote>

        <p className="mt-4 text-xs text-muted-foreground">
          Clique em cada linha pra ver em detalhe.
        </p>

        <div className="mt-8 space-y-4">
          {rows.map((r) => (
            <BeforeAfterDialog key={r.bad} row={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PVMRow {
  badIcon: React.ComponentType<{ className?: string }>;
  bad: string;
  badDesc: string;
  badLong: string;
  goodIcon: React.ComponentType<{ className?: string }>;
  good: string;
  goodDesc: string;
  goodLong: string;
}

function BeforeAfterDialog({ row: r }: { row: PVMRow }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-card/40 text-left transition-all hover:border-gold/30 hover:shadow-[0_8px_40px_-12px_rgba(197,160,89,0.25)] sm:grid-cols-2"
        >
          <div className="flex items-start gap-4 p-7 sm:pr-10">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-gradient-to-br from-red-400/10 to-transparent text-red-400/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <r.badIcon className="size-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400/70">
                Sem método
              </div>
              <h3 className="mt-1 font-bold text-foreground/85">{r.bad}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.badDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-white/10 bg-gradient-to-br from-gold/[0.06] to-transparent p-7 sm:border-l sm:border-t-0 sm:pl-10">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5 text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <r.goodIcon className="size-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                Com PO2
              </div>
              <h3 className="mt-1 font-bold text-foreground">{r.good}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.goodDesc}</p>
            </div>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
            <span className="flex size-9 items-center justify-center rounded-full border border-gold/40 bg-background text-gold shadow-[0_0_0_6px_rgba(15,17,21,1)] transition-transform group-hover:scale-110">
              <ArrowRight className="size-4" />
            </span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[88vh] max-w-xl overflow-y-auto border-white/10 bg-card text-foreground">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-foreground">
            {r.bad} <span className="text-muted-foreground">→</span> {r.good}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-4">
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400/80">
              Como era
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{r.badLong}</p>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Como fica com a PO2
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{r.goodLong}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || started.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            blocks.forEach((_, i) => {
              setTimeout(() => setVisibleCount((v) => Math.max(v, i + 1)), i * 1000);
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Os primeiros 15 segundos definem se quem está do outro lado —{" "}
          <Jargon term="BDR">BDR</Jargon>, <Jargon term="SDR">SDR</Jargon> ou{" "}
          <Jargon term="Inside Sales">Inside Sales</Jargon> — será visto como vendedor genérico ou
          como conversa relevante.
        </p>

        <div ref={gridRef} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b, i) => (
            <div
              key={b.n}
              className="rounded-2xl border border-white/10 bg-card/70 p-7 transition-all duration-700 ease-out"
              style={{
                opacity: i < visibleCount ? 1 : 0,
                transform: i < visibleCount ? "translateY(0)" : "translateY(24px)",
              }}
            >
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

function MetodologiasTeaser() {
  return (
    <section id="metodologias" className="border-b border-white/5 bg-surface/40 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          <Brain className="size-3" /> Metodologias & Filosofia
        </div>
        <h2 className="mt-4 font-[Instrument_Serif] text-4xl leading-tight md:text-5xl">
          Antes da técnica, <span className="italic text-gold">a transformação.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Frameworks consagrados (CHAMP, SPIN, Challenger Sale...) e o Modelo PO2 de Evolução
          Comercial — mapa mental e ciclo C.R.E.S.C.E.R. explicados a fundo.
        </p>
        <div className="mt-8">
          <Link to="/metodologias" className={ctaPrimary}>
            Explorar as metodologias <ArrowRight className="size-4" />
          </Link>
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
      label: "Time de prospecção (BDR + SDR, CLT júnior)",
      note: "Piso + FGTS, INSS, 13º, férias — 2 posições",
      value: "R$ 13.000",
    },
    {
      label: "Closer / vendedor sênior",
      note: "Salário + encargos + comissão base",
      value: "R$ 12.000",
    },
    {
      label: "Gestão comercial (dedicação parcial)",
      note: "Liderança, processo, acompanhamento",
      value: "R$ 10.000",
    },
    {
      label: "Ferramentas + recrutamento",
      note: "CRM, discador, enriquecimento, contratação",
      value: "R$ 5.000",
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
            Montar um{" "}
            <span className="font-display font-normal italic text-gold">Time Comercial</span> custa
            mais do que parece.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Sem contar os 60 a 90 dias de ramp-up em que o time ainda não bate meta — tempo em que o
            CAC sobe e o pipeline continua fraco.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="rounded-3xl border border-white/10 bg-card/70 p-8">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Montar sozinho
            </div>
            <div className="mb-6 text-sm text-muted-foreground">
              Contratação + estrutura própria · time completo
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
              <span className="font-display text-4xl text-foreground">R$ 40.000</span>
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
              Operação estruturada e rodando em 3 meses
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
                A partir de / mês
              </span>
              <span className="font-display text-4xl text-gold">R$ 8.000</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <div className="font-display text-2xl text-gold">
            Economia de ~80% no mês, sem os 90 dias às cegas.
          </div>
          <p className="max-w-xl text-xs text-muted-foreground">
            Valores de referência (jun/2026) para estimar o custo de estruturar um time comercial
            interno vs. contratar a PO2. Podem variar por região, senioridade e negociação — use
            como comparativo, não como orçamento fechado.
          </p>
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
