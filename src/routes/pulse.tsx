import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import pulseImg from "@/assets/pulse-dashboard.webp";

export const Route = createFileRoute("/pulse")({
  head: () => ({
    meta: [
      { title: "PO2 Pulse - O pulso da sua operação comercial" },
      {
        name: "description",
        content:
          "PO2 Pulse: acompanhe indicadores, receba recomendações e conte com mentorias periódicas. Consultoria, tecnologia e acompanhamento contínuo.",
      },
      { property: "og:title", content: "PO2 Pulse" },
      { property: "og:url", content: "https://www.prospeccaoodeouropo2.com/pulse" },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaoodeouropo2.com/pulse" }],
  }),
  component: PulsePage,
});

function PulsePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-md bg-gold px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-foreground">
            Olhando para o futuro
          </span>
          <h1 className="mt-8 text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
            PO2 Pulse:{" "}
            <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
              O pulso da sua operação comercial
            </span>
          </h1>
          <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Imagine o seguinte modelo: a empresa contrata a PO2 para estruturar sua operação comercial. Depois da
              implementação, continua utilizando o <strong className="text-foreground">PO2 Pulse</strong> para
              acompanhar indicadores, receber recomendações e contar com mentorias periódicas.
            </p>
            <p>
              Isso criaria uma conexão entre consultoria, tecnologia e acompanhamento contínuo, permitindo à PO2
              construir uma relação de longo prazo com seus clientes.
            </p>
          </div>
          <a
            href={PO2_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-6 rounded-xl border border-gold px-7 py-4 text-sm font-medium transition-all hover:bg-gold hover:text-gold-foreground"
          >
            Falar com o time <ArrowRight className="size-4" />
          </a>
        </div>
        <img
          src={pulseImg}
          alt="Painel do PO2 Pulse em um notebook, com nota geral, evolução e indicadores de processos, conversão, gestão e atividades"
          width={810}
          height={1080}
          className="mx-auto w-full max-w-md rounded-3xl border border-white/10 lg:max-w-none"
        />
      </main>
      <Footer />
    </div>
  );
}
