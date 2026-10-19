import { PO2_WHATSAPP_URL } from "@/lib/contact";
import { Arcs } from "@/components/po2/Arcs";
import { ClientesMarquee } from "@/components/po2/ClientesMarquee";
import bgHero from "@/assets/bg-gradiente-hero.webp";
import bgArcos from "@/assets/bg-arcos.webp";
import bgListras from "@/assets/bg-listras.webp";
import monograma from "@/assets/monograma.webp";
import logoBranco from "@/assets/po2-logo-branco.svg";
import matheusHero from "@/assets/matheus-hero.webp";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Users, ArrowRight, BarChart3, Zap, Settings } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PO2 - Oxigênio Comercial" },
      {
        name: "description",
        content:
          "Estruturamos e aceleramos áreas comerciais com processos, tecnologia e mentoria para gerar mais oportunidades e resultados consistentes.",
      },
      {
        name: "keywords",
        content:
          "terceirização do time comercial, terceirizar time comercial, prospecção B2B terceirizada, SDR terceirizado, BDR terceirizado, SDR as a Service, BPO comercial, outbound B2B, prospecção ativa, assessoria comercial, BDR, SDR, inside sales, closer",
      },
      { property: "og:title", content: "PO2 - Oxigênio Comercial" },
      {
        property: "og:description",
        content:
          "Estruturamos e aceleramos áreas comerciais com processos, tecnologia e mentoria para gerar mais oportunidades e resultados consistentes.",
      },
      { property: "og:url", content: "https://www.prospeccaoodeouropo2.com/" },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaoodeouropo2.com/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <Hero />
        <ClientesMarquee />
        <Solucoes />
        <Consultoria />
        <SobreNos />
        <Previsibilidade />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/5">
      <img src={bgHero} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70" />
      <Arcs className="pointer-events-none absolute inset-y-0 right-0 h-full w-full max-w-[1100px] opacity-90 md:translate-x-[30%]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 md:pt-32">
        <div className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground md:text-xs">
          Prospecção que gera receita
        </div>
        <h1 className="mt-8 max-w-3xl text-balance font-display text-4xl font-normal leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          PO2 é a nova forma de fazer{" "}
          <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
            vendas
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
          Estruturamos e aceleramos áreas comerciais com processos, tecnologia e mentoria para
          gerar mais oportunidades e resultados consistentes.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={PO2_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
          >
            Falar com o time <ArrowRight className="size-4" />
          </a>
          <a
            href="#solucoes"
            className="inline-flex items-center gap-6 rounded-xl border border-white/20 px-7 py-4 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Conheça as soluções <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

const SOLUCOES = [
  {
    t: "Estruturação comercial",
    d: "Organizamos processos, times e ferramentas para uma operação mais previsível e escalável.",
  },
  {
    t: "Aceleração de vendas",
    d: "Implementamos estratégias e rotinas que geram mais oportunidades e aumentam a taxa de conversão.",
  },
  {
    t: "Mentoria e capacitação",
    d: "Desenvolvemos times comerciais com métodos práticos e aplicáveis à realidade de cada negócio.",
  },
  {
    t: "Tecnologia a favor de vendas",
    d: "Implementamos automações e soluções que dão mais eficiência e visibilidade para a operação.",
  },
];

function Solucoes() {
  const icons = [BarChart3, Zap, Users, Settings];
  return (
    <section id="solucoes" className="relative overflow-hidden border-b border-white/5 bg-[#06141c] py-24">
      <img src={bgListras} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-60 [mask-image:linear-gradient(to_right,transparent,black_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground md:text-xs">
          Soluções
        </div>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-medium leading-tight md:text-5xl">
          Soluções comerciais em destaque
        </h2>
        <div className="mt-14 flex max-w-xl flex-col gap-10">
          {SOLUCOES.map((x, i) => {
            const Icon = icons[i];
            return (
              <div key={x.t} className="flex items-start gap-6">
                <div className="shrink-0 rounded-2xl bg-gradient-to-br from-[#D8FF36] via-[#22C5E6] to-[#1F6FE0] p-px">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-[#06141c]">
                    <Icon className="size-8 text-[#22D3EE]" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium leading-snug md:text-2xl">{x.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{x.d}</p>
                </div>
              </div>
            );
          })}
        </div>
        <a
          href="/#sobre"
          className="mt-14 inline-flex items-center gap-6 rounded-full border border-[#22C5E6] px-8 py-4 text-sm font-medium transition-all hover:bg-[#22C5E6]/10"
        >
          Conheça a PO2 <ArrowRight className="size-5 text-[#22C5E6]" />
        </a>
      </div>
    </section>
  );
}

function SobreNos() {
  return (
    <section id="sobre" className="relative overflow-hidden border-b border-white/5 bg-[#040d14] py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#155E75]/30 blur-[120px]" />
      <img src={monograma} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute -right-16 top-1/2 h-[520px] w-auto -translate-y-1/2 opacity-35 md:right-8 md:h-[640px] md:opacity-100" />
      <div className="relative mx-auto max-w-7xl px-6">
        <img src={logoBranco} alt="PO2" className="h-16 w-auto md:h-20" />
        <div className="mt-24 text-[11px] font-medium uppercase tracking-[0.4em] text-muted-foreground md:text-xs">
          Sobre nós
        </div>
        <h2 className="mt-6 max-w-md text-balance font-display text-5xl font-medium leading-[1.02] md:text-7xl">
          Estrutura comercial para{" "}
          <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
            resultados
          </span>
        </h2>
        <a
          href="/#sobre"
          className="mt-10 inline-flex items-center gap-6 rounded-full border border-[#22C5E6] px-8 py-4 text-sm font-medium transition-all hover:bg-[#22C5E6]/10"
        >
          Saiba mais <ArrowRight className="size-5 text-[#22C5E6]" />
        </a>
      </div>
    </section>
  );
}

function Previsibilidade() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#06141c]">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_30%_70%,#D8FF36_0%,#22C5E6_35%,#155E75_60%,transparent_72%)] opacity-70 blur-[2px] max-md:opacity-30" />
      <div className="relative mx-auto grid max-w-7xl items-end gap-8 px-6 pt-24 md:grid-cols-2 md:pt-28">
        <div className="pb-24">
          <div className="max-w-xs text-[11px] font-medium uppercase tracking-[0.4em] text-muted-foreground md:text-xs">
            Vendas com estratégia
          </div>
          <h2 className="mt-8 text-balance font-display text-4xl font-medium leading-[1.08] md:text-6xl">
            Mais{" "}
            <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
              previsibilidade
            </span>{" "}
            para o seu crescimento
          </h2>
          <p className="mt-8 max-w-sm text-lg text-muted-foreground">
            Estruturamos processos comerciais que geram oportunidades reais e resultados
            consistentes.
          </p>
          <a
            href="/#sobre"
            className="mt-10 inline-flex items-center gap-6 rounded-full border border-[#22C5E6] px-8 py-4 text-sm font-medium transition-all hover:bg-[#22C5E6]/10"
          >
            Conheça a PO2 <ArrowRight className="size-5 text-[#22C5E6]" />
          </a>
        </div>
        <div className="relative flex justify-center md:justify-end">
          <img
            src={matheusHero}
            alt="Matheus Staruck, fundador da PO2"
            width={996}
            height={1500}
            className="relative z-10 h-auto max-h-[640px] w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function Consultoria() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 py-28">
      <img src={bgArcos} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-[70%] object-cover object-left opacity-40 md:opacity-90" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold md:text-xs">
          Consultoria com resultado
        </div>
        <h2 className="mt-6 max-w-2xl text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
          Vendas que viram o{" "}
          <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
            próximo passo
          </span>
        </h2>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          Estruturamos estratégias comerciais para gerar mais oportunidades e acelerar o
          crescimento da sua empresa.
        </p>
        <a
          href="/#sobre"
          className="mt-10 inline-flex items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
        >
          Conheça a PO2 <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
