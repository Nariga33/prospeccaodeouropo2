import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Eventos } from "@/components/po2/Eventos";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos e Masterclasses de Prospecção B2B | PO2" },
      {
        name: "description",
        content:
          "Masterclasses ao vivo e gratuitas de prospecção B2B com Matheus Staruck. Garanta sua vaga e aprenda o método PO2 na prática.",
      },
      { property: "og:title", content: "Eventos e Masterclasses de Prospecção B2B | PO2" },
      { property: "og:description", content: "Masterclasses ao vivo e gratuitas de prospecção B2B com Matheus Staruck. Garanta sua vaga e aprenda o método PO2 na prática." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pulsepo2.com/eventos" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/eventos" }],
  }),
  component: EventosPage,
});

function EventosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Sparkles className="size-3" /> Agenda oficial PO2
            </div>
            <h1 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight md:text-6xl">
              Eventos ao vivo da PO2.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Escolha uma masterclass, garanta sua vaga e receba o link do Meet, o convite para a
              agenda e o certificado de participação.
            </p>
          </div>
        </section>
        <Eventos />
      </main>
      <Footer />
    </div>
  );
}
