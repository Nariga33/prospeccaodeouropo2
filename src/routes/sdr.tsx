import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { SdrFunnel } from "@/components/po2/SdrFunnel";
import { SdrMethod } from "@/components/po2/SdrMethod";
import { InboundHub } from "@/components/po2/InboundHub";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { Jargon } from "@/components/po2/Jargon";
import { ArrowRight, Headset } from "lucide-react";

export const Route = createFileRoute("/sdr")({
  head: () => ({
    meta: [
      { title: "SDR & Inbound — PO2 | Qualificação de Leads" },
      {
        name: "description",
        content:
          "Estruturação de operação inbound e treinamento de SDR: lead scoring, SLA de resposta, qualificação MQL/PQL até SAL, SQL e venda fechada.",
      },
      { property: "og:title", content: "SDR & Inbound — PO2" },
      {
        property: "og:description",
        content:
          "O mesmo rigor de método que a PO2 aplica no outbound, agora para qualificação inbound.",
      },
      { property: "og:url", content: "https://www.prospeccaodeouropo2.com/sdr" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Assessoria de qualificação inbound (SDR)",
          name: "SDR & Inbound — PO2",
          description:
            "Estruturação de operação inbound e qualificação de SDR: lead scoring, SLA de resposta, funil MQL/PQL/SAL/SQL.",
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
    links: [{ rel: "canonical", href: "https://www.prospeccaodeouropo2.com/sdr" }],
  }),
  component: SdrPage,
});

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

function SdrPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Headset className="size-3" /> SDR & Inbound
            </div>
            <h1 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight md:text-6xl">
              Outbound tem método. <span className="italic text-gold">Inbound também deveria.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Estruturação de operação inbound e treinamento de <Jargon term="SDR">SDR</Jargon> — do
              lead que chega sozinho até a venda fechada, com o mesmo rigor de processo que a PO2
              aplica no outbound.
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

        <section className="border-b border-white/5 bg-surface/40">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                <span className="h-px w-12 bg-gold/60" /> O funil inbound
                <span className="h-px w-12 bg-gold/60" />
              </div>
              <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
                Do visitante à venda —{" "}
                <span className="font-display font-normal italic text-gold">
                  sem perder ninguém no caminho.
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Cada etapa do funil tem um critério de passagem claro — não é achismo de quem
                "parece" pronto pra comprar.
              </p>
            </div>
            <SdrFunnel />
          </div>
        </section>

        <SdrMethod />

        <InboundHub />

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1),transparent_60%)]" />
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              Sua operação inbound já converte{" "}
              <span className="italic text-gold">o que devia?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Diagnóstico gratuito pra mapear onde seu funil MQL → SQL está perdendo lead.
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
