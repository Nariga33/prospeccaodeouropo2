import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Mentoria } from "@/components/po2/Mentoria";
import { RodaComercial } from "@/components/po2/RodaComercial";
import { MentoriaOffer } from "@/components/po2/MentoriaOffer";

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
      { property: "og:url", content: "https://www.prospeccaodeouropo2.com/mentoria" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Mentoria de prospecção e vendas B2B",
          name: "Mentoria PO2 com Matheus Staruck",
          description:
            "Mentoria prática de prospecção e vendas B2B — diagnóstico, 8 módulos, templates, acompanhamento e comunidade.",
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
          offers: {
            "@type": "Offer",
            price: "497",
            priceCurrency: "BRL",
          },
        },
      },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaodeouropo2.com/mentoria" }],
  }),
  component: MentoriaPage,
});

function MentoriaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <Mentoria />
        <RodaComercial />
        <MentoriaOffer />
      </main>
      <Footer />
    </div>
  );
}
