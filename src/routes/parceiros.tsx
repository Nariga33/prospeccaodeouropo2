import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Partners } from "@/components/po2/Partners";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Parceiros — PO2 | Prospecção de Ouro 2.0" },
      {
        name: "description",
        content:
          "Indicações de confiança da PO2: Clube NEX (rede e mentoria entre empresários) e Vendas.team (plataforma comercial com IA nativa).",
      },
    ],
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
