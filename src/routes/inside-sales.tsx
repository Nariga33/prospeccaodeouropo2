import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { InsideSalesMethod } from "@/components/po2/InsideSalesMethod";
import { InsideSalesPipeline } from "@/components/po2/InsideSalesPipeline";
import { GapSection } from "@/components/po2/GapSection";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { Jargon } from "@/components/po2/Jargon";
import { ArrowRight, Handshake } from "lucide-react";

export const Route = createFileRoute("/inside-sales")({
  head: () => ({
    meta: [
      { title: "Inside Sales — PO2 | Condução e Fechamento Remoto" },
      {
        name: "description",
        content:
          "Método de 7 etapas para estruturar Inside Sales: descoberta, qualificação, proposta com prazo, follow-up sistemático, objeções, forecast e métricas de conversão.",
      },
      { property: "og:title", content: "Inside Sales — PO2" },
      {
        property: "og:description",
        content:
          "A ponte entre qualificação e fechamento — reunião, proposta e negociação com método.",
      },
      { property: "og:url", content: "https://www.prospeccaodeouropo2.com/inside-sales" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Assessoria de Inside Sales",
          name: "Inside Sales — PO2",
          description:
            "Estruturação de Inside Sales: descoberta, qualificação, proposta com prazo, follow-up sistemático e forecast de pipeline.",
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
    links: [{ rel: "canonical", href: "https://www.prospeccaodeouropo2.com/inside-sales" }],
  }),
  component: InsideSalesPage,
});

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

function InsideSalesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Handshake className="size-3" /> Inside Sales
            </div>
            <h1 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight md:text-6xl">
              O lead chegou pronto. <span className="italic text-gold">E agora?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              <Jargon term="Inside Sales">Inside Sales</Jargon> é a ponte entre a qualificação e o
              fechamento — conduz a reunião, monta a proposta e negocia remotamente, com o mesmo
              rigor de método que a PO2 aplica em todo o funil.
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
          title="Demonstração de produto"
          titleEm="não fecha negócio."
          problemTitle="Discovery vira apresentação de slide"
          problemText="A reunião começa com o vendedor mostrando feature atrás de feature. O lead assiste educadamente e nunca mais responde — porque em nenhum momento ficou claro pra ele o tamanho do problema que está deixando de resolver, em dinheiro ou tempo."
          solutionTitle="Os 4 blocos de discovery do Gap Selling"
          solutionText="A condução da PO2 segue a lógica de Keenan: estado atual, estado futuro, impacto do problema e causa raiz — nessa ordem, antes de qualquer proposta. O lead sai da reunião entendendo o custo de continuar como está, não uma lista de funcionalidades."
        />

        <section className="border-b border-white/5 bg-surface/40">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                <span className="h-px w-12 bg-gold/60" /> O pipeline
                <span className="h-px w-12 bg-gold/60" />
              </div>
              <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
                Da reunião ao fechamento —{" "}
                <span className="font-display font-normal italic text-gold">
                  um estágio de cada vez.
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Cada estágio tem um critério de avanço claro — não é "achismo de que tá quase
                fechando".
              </p>
            </div>
            <InsideSalesPipeline />
          </div>
        </section>

        <InsideSalesMethod />

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1),transparent_60%)]" />
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              Sua taxa de fechamento já é <span className="italic text-gold">o que devia ser?</span>
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
