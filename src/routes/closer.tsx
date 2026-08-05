import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { CloserMethod } from "@/components/po2/CloserMethod";
import { GapSection } from "@/components/po2/GapSection";
import { CloserCallPains } from "@/components/po2/CloserCallPains";
import { PitchCognitivo } from "@/components/po2/PitchCognitivo";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { Jargon } from "@/components/po2/Jargon";
import { ArrowRight, Trophy } from "lucide-react";

export const Route = createFileRoute("/closer")({
  head: () => ({
    meta: [
      { title: "Closer — PO2 | Negociação e Fechamento" },
      {
        name: "description",
        content:
          "Método de 9 etapas para Closer: qualificação pré-call, roteiro de fechamento, objeções finais, margem de negociação, onboarding e métricas de conversão.",
      },
      { property: "og:title", content: "Closer — PO2" },
      {
        property: "og:description",
        content:
          "Fechar não é sorte — é processo. O mesmo rigor de método em toda a operação comercial.",
      },
      { property: "og:url", content: "https://www.prospeccaoodeouropo2.com/closer" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Assessoria de fechamento comercial (Closer)",
          name: "Closer — PO2",
          description:
            "Método de negociação e fechamento: objeções finais, margem de negociação, onboarding e métricas de conversão.",
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
    links: [{ rel: "canonical", href: "https://www.prospeccaoodeouropo2.com/closer" }],
  }),
  component: CloserPage,
});

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

function CloserPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Trophy className="size-3" /> Closer
            </div>
            <h1 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight md:text-6xl">
              Fechar não é sorte. <span className="italic text-gold">É processo.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              O <Jargon term="Closer">Closer</Jargon> fecha o negócio — negociação final, contrato e
              handoff pro onboarding, com o mesmo rigor de método que a PO2 aplica em toda a
              operação comercial.
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
          title="Negociação de preço"
          titleEm="quando o gap nunca foi quantificado."
          problemTitle="Desconto vira a única ferramenta de fechamento"
          problemText="Sem o custo de continuar no estado atual quantificado em dinheiro, o lead só enxerga um número: o preço da proposta. Qualquer concorrente mais barato parece uma escolha óbvia — porque ninguém mostrou o que o problema já está custando todo mês."
          solutionTitle="Fechar em cima do gap, não do desconto"
          solutionText="O Closer PO2 negocia com o custo do problema calculado desde a discovery — o valor de continuar como está, comparado ao investimento pra mudar. A conversa deixa de ser sobre preço e passa a ser sobre risco de adiar a decisão."
        />

        <CloserCallPains />

        <CloserMethod />

        <PitchCognitivo />

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1),transparent_60%)]" />
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              Quantas propostas ficam{" "}
              <span className="italic text-gold">paradas no seu funil?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Diagnóstico gratuito pra mapear onde sua negociação está travando.
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
