import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { MaterialCard } from "@/components/po2/MaterialCard";
import { FileText, Table } from "lucide-react";

export const Route = createFileRoute("/materiais")({
  head: () => ({
    meta: [
      { title: "Materiais gratuitos — PO2 | Prospecção de Ouro 2.0" },
      {
        name: "description",
        content:
          "Guia gratuito de estruturação e contratação de BDR, SDR e Closer, e planilha de acompanhamento semanal de vendas.",
      },
      { property: "og:url", content: "https://www.prospeccaodeouropo2.com/materiais" },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaodeouropo2.com/materiais" }],
  }),
  component: MateriaisPage,
});

function MateriaisPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Materiais gratuitos
            </div>
            <h1 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight md:text-6xl">
              Conteúdo prático, <span className="italic text-gold">sem enrolação.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Ferramentas reais que você usa hoje mesmo — nada de e-book genérico de 40 páginas.
            </p>
          </div>
        </section>

        <section className="pb-24 pt-16">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-2">
            <MaterialCard
              slug="guia-estruturacao"
              icon={FileText}
              tag="Guia PDF"
              title="Como montar seu time de BDR, SDR e Closer com segurança"
              desc="Perfil comportamental, perguntas de entrevista, o que testar na prática e os erros mais comuns em cada contratação — guia gratuito."
              fileUrl="/materiais/guia-estruturacao-contratacao-po2.pdf"
              fileName="guia-estruturacao-contratacao-po2.pdf"
              ctaLabel="Baixar guia"
            />
            <MaterialCard
              slug="planilha-acompanhamento"
              icon={Table}
              tag="Planilha grátis"
              title="Acompanhamento semanal de vendas"
              desc="Ligações, conexões, reuniões, propostas e conversão — tudo numa planilha simples pra preencher toda sexta-feira."
              fileUrl="/materiais/planilha-acompanhamento-vendas-po2.csv"
              fileName="planilha-acompanhamento-vendas-po2.csv"
              ctaLabel="Baixar planilha"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
