import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Methodologies } from "@/components/po2/Methodologies";

export const Route = createFileRoute("/metodologias")({
  head: () => ({
    meta: [
      { title: "Metodologias & Filosofia PO2 — Prospecção de Ouro 2.0" },
      {
        name: "description",
        content:
          "Frameworks de qualificação (CHAMP, SPIN, BANT, Challenger Sale) e o Modelo PO2 de Evolução Comercial — mapa mental e ciclo C.R.E.S.C.E.R.",
      },
      { property: "og:title", content: "Metodologias PO2" },
      {
        property: "og:description",
        content:
          "Antes da técnica, a transformação — o Modelo PO2 de Evolução Comercial explicado a fundo.",
      },
      { property: "og:url", content: "https://www.prospeccaoodeouropo2.com/metodologias" },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaoodeouropo2.com/metodologias" }],
  }),
  component: MetodologiasPage,
});

function MetodologiasPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <Methodologies />
      </main>
      <Footer />
    </div>
  );
}
