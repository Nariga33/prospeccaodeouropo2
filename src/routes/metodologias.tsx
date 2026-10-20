import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Methodologies } from "@/components/po2/Methodologies";

export const Route = createFileRoute("/metodologias")({
  head: () => ({
    meta: [
      { title: "Metodologia PO2: Método de Prospecção B2B Full-Funnel" },
      {
        name: "description",
        content:
          "Conheça o método PO2: ICP, lista, cadência multicanal, cold call consultiva, qualificação e fechamento, do primeiro contato ao contrato assinado.",
      },
      { property: "og:title", content: "Metodologia PO2: Método de Prospecção B2B Full-Funnel" },
      { property: "og:description", content: "Conheça o método PO2: ICP, lista, cadência multicanal, cold call consultiva, qualificação e fechamento, do primeiro contato ao contrato assinado." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pulsepo2.com/metodologias" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/metodologias" }],
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
