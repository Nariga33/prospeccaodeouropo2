import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { BdrMethod } from "@/components/po2/BdrMethod";
import { BdrFunnel } from "@/components/po2/BdrFunnel";
import { BdrColdCallFramework } from "@/components/po2/BdrColdCallFramework";
import { OutboundHub } from "@/components/po2/OutboundHub";
import { GapSection } from "@/components/po2/GapSection";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { Jargon } from "@/components/po2/Jargon";
import { ArrowRight, Target } from "lucide-react";

export const Route = createFileRoute("/bdr")({
  head: () => ({
    meta: [
      { title: "BDR & Outbound — PO2 | Prospecção Ativa" },
      {
        name: "description",
        content:
          "Método de 7 etapas para estruturar operação de BDR/outbound: ICP, cadência multicanal, cold call consultiva, gestão de objeções e métricas por canal.",
      },
      { property: "og:title", content: "BDR & Outbound — PO2" },
      {
        property: "og:description",
        content:
          "O mesmo rigor de método que a PO2 aplica no inbound, agora para prospecção ativa.",
      },
      { property: "og:url", content: "https://www.prospeccaoodeouropo2.com/bdr" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Assessoria de prospecção outbound (BDR)",
          name: "BDR & Outbound — PO2",
          description:
            "Estruturação de operação de BDR/outbound: ICP, cadência multicanal, cold call consultiva, gestão de objeções e métricas por canal.",
          provider: {
            "@type": "ProfessionalService",
            name: "PO2 — Prospecção de Ouro 2.0",
            areaServed: "Brasil",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Porto Alegre",
              addressRegion: "RS",
              addressCountry: "BR",
            },
          },
          areaServed: "BR",
        },
      },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaoodeouropo2.com/bdr" }],
  }),
  component: BdrPage,
});

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

function BdrPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Target className="size-3" /> BDR & Outbound
            </div>
            <h1 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight md:text-6xl">
              Topo de funil não é sorte. <span className="italic text-gold">É método.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Estruturação de operação outbound e treinamento de <Jargon term="BDR">BDR</Jargon> —
              do ICP à reunião agendada, com o mesmo rigor de processo que a PO2 aplica na
              qualificação inbound.
            </p>
            <div className="mt-8">
              <DiagnosticDialog
                trigger={
                  <button className={ctaPrimary}>
                    Diagnóstico gratuito <ArrowRight className="size-4" />
                  </button>
                }
              />
            </div>
          </div>
        </section>

        <GapSection
          kicker="O problema real"
          title="Mensagem sobre produto"
          titleEm="não gera reunião."
          problemTitle="Cadência que fala de você, não do lead"
          problemText="A maioria das cadências de outbound abre falando da empresa, do produto, do 'nós ajudamos empresas como a sua'. O lead nunca leu a segunda linha — porque nada ali provou que você entende o problema dele antes de tentar vender algo."
          solutionTitle="Gap Prospecting: o problema antes do pitch"
          solutionText="A PO2 estrutura cada abordagem em cima do Gap Prospecting — nomeia o problema específico do lead, com dado real do cenário dele, antes de qualquer menção a produto. A reunião nasce da urgência do problema, não da insistência do vendedor."
        />

        <section id="funil-bdr" className="border-b border-white/5 bg-surface/40">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                <span className="h-px w-12 bg-gold/60" /> O funil outbound
                <span className="h-px w-12 bg-gold/60" />
              </div>
              <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
                Da pesquisa à agenda —{" "}
                <span className="font-display font-normal italic text-gold">
                  sem depender de sorte.
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Cada etapa prepara a próxima — abordagem sem pesquisa é chute, e sequência sem
                abordagem certa é insistência vazia.
              </p>
            </div>
            <BdrFunnel />
          </div>
        </section>

        <BdrColdCallFramework />

        <BdrMethod />

        <OutboundHub />

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1),transparent_60%)]" />
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              Sua prospecção ativa já gera{" "}
              <span className="italic text-gold">o volume que devia?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Diagnóstico gratuito pra mapear onde sua operação de BDR está travando.
            </p>
            <div className="mt-8 flex justify-center">
              <DiagnosticDialog
                trigger={
                  <button className={ctaPrimary}>
                    Quero o diagnóstico <ArrowRight className="size-4" />
                  </button>
                }
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
