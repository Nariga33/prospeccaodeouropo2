import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Mentoria } from "@/components/po2/Mentoria";

export const Route = createFileRoute("/mentoria")({
  head: () => ({
    meta: [
      { title: "Mentoria com Matheus Staruck — PO2 | Prospecção B2B" },
      {
        name: "description",
        content:
          "Mentoria prática de prospecção B2B com Matheus Staruck. Não é curso, é operação que você executa junto — método, indicadores e melhoria contínua.",
      },
      { property: "og:title", content: "Mentoria PO2 — Matheus Staruck" },
      {
        property: "og:description",
        content:
          "Mentoria prática para fundadores, gestores e times comerciais construírem uma máquina de prospecção ativa.",
      },
    ],
  }),
  component: MentoriaPage,
});

function MentoriaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <Mentoria />
      </main>
      <Footer />
    </div>
  );
}
