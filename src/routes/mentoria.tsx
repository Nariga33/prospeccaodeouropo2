import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Mentoria } from "@/components/po2/Mentoria";
import { MentoriaOffer } from "@/components/po2/MentoriaOffer";
import { GapSection } from "@/components/po2/GapSection";

export const Route = createFileRoute("/mentoria")({
  head: () => ({
    meta: [
      { title: "Mentoria Comercial com Matheus Staruck | PO2" },
      {
        name: "description",
        content:
          "Mentoria prática de prospecção e vendas B2B com Matheus Staruck, para founders, gestores e times comerciais aplicarem o método PO2 com acompanhamento.",
      },
      { property: "og:title", content: "Mentoria Comercial com Matheus Staruck | PO2" },
      { property: "og:description", content: "Mentoria prática de prospecção e vendas B2B com Matheus Staruck, para founders, gestores e times comerciais aplicarem o método PO2 com acompanhamento." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pulsepo2.com/mentoria" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Mentoria de prospecção e vendas B2B",
          name: "Mentoria PO2 com Matheus Staruck",
          description:
            "Mentoria prática de prospecção e vendas B2B - diagnóstico, 8 módulos, templates, acompanhamento e comunidade.",
          provider: {
            "@type": "ProfessionalService",
            name: "PO2 - Prospecção de Ouro 2.0",
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
    links: [{ rel: "canonical", href: "https://pulsepo2.com/mentoria" }],
  }),
  component: MentoriaPage,
});

function MentoriaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <Mentoria />
        <GapSection
          kicker="O problema real"
          title="Time treinado em técnica"
          titleEm="continua sem saber diagnosticar."
          problemTitle="Sabe responder objeção, não sabe evitar que ela apareça"
          problemText="A maioria do treinamento comercial ensina script de fechamento e contorno de objeção - remédio pro sintoma. O time nunca aprendeu a mapear o gap do cliente antes de vender, então a objeção sempre chega tarde, quando já é difícil reverter."
          solutionTitle="Gap Selling e Gap Prospecting aplicados na prática"
          solutionText="A Mentoria não ensina teoria isolada - corrige a operação real do aluno, sessão a sessão, aplicando a lógica de diagnóstico de Keenan em cima das ligações, reuniões e negociações que já estão acontecendo."
        />
        <MentoriaOffer />
      </main>
      <Footer />
    </div>
  );
}
