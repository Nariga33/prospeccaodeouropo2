import { PO2_WHATSAPP_URL } from "@/lib/contact";
import { Arcs } from "@/components/po2/Arcs";
import { ClientesMarquee } from "@/components/po2/ClientesMarquee";
import bgHero from "@/assets/bg-gradiente-hero.webp";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { ArrowRight } from "lucide-react";

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
      { property: "og:url", content: "https://pulsepo2.com/" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <Hero />
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
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 md:pt-32">
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
            href="/solucoes"
            className="inline-flex items-center gap-6 rounded-xl border border-white/20 px-7 py-4 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Conheça as soluções <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
      <ClientesMarquee />
    </section>
  );
}
