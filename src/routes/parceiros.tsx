import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Partners } from "@/components/po2/Partners";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Parceiros PO2 | Rede de Parceiros Comerciais" },
      {
        name: "description",
        content:
          "Conheça a rede de parceiros da PO2 e como crescer junto em prospecção, vendas e estruturação comercial B2B.",
      },
      { property: "og:title", content: "Parceiros PO2 | Rede de Parceiros Comerciais" },
      { property: "og:description", content: "Conheça a rede de parceiros da PO2 e como crescer junto em prospecção, vendas e estruturação comercial B2B." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pulsepo2.com/parceiros" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/parceiros" }],
  }),
  component: ParceirosPage,
});

function ParceirosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <Partners />
      </main>
      <Footer />
    </div>
  );
}
