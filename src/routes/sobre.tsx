import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { Arcs } from "@/components/po2/Arcs";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import { FaqPo2, Frentes, FAQS } from "@/components/po2/Metodo";
import fotoVictor from "@/assets/sobre-victor.webp";
import fotoMatheus from "@/assets/sobre-matheus.webp";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem é a PO2 | Matheus Staruck e Victor Nogueira" },
      {
        name: "description",
        content:
          "Conheça a PO2, consultoria de prospecção B2B de Porto Alegre fundada em 2024 por Matheus Staruck e Victor Nogueira, com +R$20MM em negócios gerados.",
      },
      { property: "og:title", content: "Quem é a PO2 | Matheus Staruck e Victor Nogueira" },
      { property: "og:description", content: "Conheça a PO2, consultoria de prospecção B2B de Porto Alegre fundada em 2024 por Matheus Staruck e Victor Nogueira, com +R$20MM em negócios gerados." },
      { property: "og:type", content: "website" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      },
      { property: "og:url", content: "https://pulsepo2.com/sobre" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/sobre" }],
  }),
  component: SobrePage,
});

function track(name: string) {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, { page: "sobre" });
  } catch {
    /* sem analytics */
  }
}

const strong = "font-semibold text-foreground";

const PESSOAS = [
  {
    nome: "Matheus Staruck",
    cargo: "Fundador e CEO",
    foto: fotoMatheus,
    alt: "Matheus Staruck, fundador e CEO da PO2",
    numeros: [
      ["+R$10MM", "Em negócios gerados"],
      ["+200k", "Ligações realizadas"],
      ["+10k", "Empresas prospectadas"],
    ],
    corpo: (
      <p>
        Especialista em <span className={strong}>Outbound, Vendas Consultivas, Challenger Sale e Gestão Comercial</span>.
        Ao todo, <span className={strong}>+R$10MM em negócios gerados</span>.
      </p>
    ),
  },
  {
    nome: "Victor Nogueira",
    cargo: "Cofundador",
    foto: fotoVictor,
    alt: "Victor Nogueira, cofundador da PO2",
    numeros: [
      ["+R$10MM", "Em negócios gerados"],
      ["+200", "Reuniões com decisores corretos"],
      ["Banco Inter", "Parceria com grande marca"],
    ],
    corpo: (
      <p>
        Especialista em <span className={strong}>Challenger Sale, Vendas Consultivas e Global Sales</span>.
        Ao todo, <span className={strong}>+R$10MM em negócios gerados</span>.
      </p>
    ),
  },
];

function SobrePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-white/5 bg-[#05090B]">
          <Arcs className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" />
          <div className="relative mx-auto grid max-w-[1450px] items-center gap-12 px-6 pb-20 pt-20 md:pb-28 md:pt-28 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground md:text-xs">
                Quem é a PO2
              </p>
              <h1 className="mt-8 max-w-3xl font-display text-4xl font-normal leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                Quem faz a PO2{" "}
                <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
                  respirar vendas
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
                Fundada em 2024, em Porto Alegre (RS), a PO2 é especializada em prospecção B2B e estruturação de
                operações comerciais.
              </p>
            </div>

            <div className="min-w-0 rounded-3xl border border-white/10 bg-card/50 p-6 backdrop-blur sm:p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Resultados dos fundadores</p>
              <p className="mt-4 bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text font-display text-5xl text-transparent sm:text-6xl md:text-7xl">
                +R$20MM
              </p>
              <p className="mt-2 text-muted-foreground">em negócios gerados, somando Matheus e Victor.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                {[
                  ["Matheus Staruck", "+R$10MM"],
                  ["Victor Nogueira", "+R$10MM"],
                ].map(([n, v]) => (
                  <div key={n}>
                    <p className="font-display text-2xl text-foreground">{v}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{n}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1450px] gap-6 px-6 py-16 md:grid-cols-2 md:py-24">
          {PESSOAS.map((p) => (
            <article key={p.nome} className="group overflow-hidden rounded-3xl border border-white/10 bg-card transition-colors hover:border-gold/40">
              <div className="relative">
                <img
                  src={p.foto}
                  alt={p.alt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] md:aspect-[4/3.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{p.cargo}</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{p.nome}</h2>
                </div>
              </div>
              <div className="p-7 pt-4 md:p-9 md:pt-4">
                <div className="leading-relaxed text-muted-foreground">{p.corpo}</div>
                <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3">
                  {p.numeros.map(([v, l]) => (
                    <div key={l} className="min-w-0 rounded-xl border border-white/10 bg-[#155E75]/25 p-3 md:p-4">
                      <div className="font-display text-base text-gold sm:text-xl md:text-2xl">{v}</div>
                      <div className="mt-1 text-xs leading-snug text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <Frentes />

        <FaqPo2 />

        <section className="mx-auto max-w-[1450px] px-6 pb-24">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#155E75]/40 via-card to-card p-8 md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                Vamos conversar sobre a sua operação comercial?
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Fale com quem constrói o Método PO2 e descubra como estruturar vendas mais previsíveis.
              </p>
            </div>
            <a
              href={PO2_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("sobre_cta_whatsapp")}
              className="inline-flex shrink-0 items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
            >
              Falar com o time <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
