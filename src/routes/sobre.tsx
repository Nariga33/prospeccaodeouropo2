import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import { FaqPo2, Frentes } from "@/components/po2/Metodo";
import fotoVictor from "@/assets/sobre-victor.webp";
import fotoMatheus from "@/assets/sobre-matheus.webp";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a PO2 - Quem está por trás do Método PO2" },
      {
        name: "description",
        content:
          "Conheça quem está por trás do Método PO2: Matheus Staruck, fundador, e Victor Nogueira, cofundador, com +R$20MM em negócios gerados. Prospecção B2B e estruturação de operações comerciais desde 2024, em Porto Alegre.",
      },
      { property: "og:title", content: "Sobre a PO2 - Quem está por trás" },
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
        <section className="mx-auto max-w-[1450px] px-6 pb-8 pt-16 md:pt-24">
          <span className="inline-block rounded-md bg-gold px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-foreground">
            Quem é a PO2
          </span>
          <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
            Quem faz a PO2{" "}
            <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
              respirar vendas
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Fundada em 2024, em Porto Alegre (RS), a PO2 é especializada em prospecção B2B e estruturação de operações
            comerciais.
          </p>
        </section>

        <Frentes />

        <section className="mx-auto max-w-[1450px] px-6 pt-8">
          <div className="rounded-3xl border border-gold/30 bg-gradient-to-r from-[#155E75]/40 to-card p-8 md:flex md:items-end md:justify-between md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Resultados dos fundadores</p>
              <p className="mt-3 font-display text-5xl text-gold md:text-7xl">+R$20MM</p>
              <p className="mt-2 text-muted-foreground">em negócios gerados, somando os resultados do Matheus e do Victor.</p>
            </div>
            <p className="mt-6 max-w-sm text-xs leading-relaxed text-muted-foreground md:mt-0">
              R$10 milhões em negócios do Matheus e R$10 milhões em negócios do Victor.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1450px] gap-8 px-6 py-12 md:grid-cols-2 md:py-16">
          {PESSOAS.map((p) => (
            <article key={p.nome} className="overflow-hidden rounded-3xl border border-white/10 bg-card">
              <img
                src={p.foto}
                alt={p.alt}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{p.cargo}</p>
                <h2 className="mt-3 font-display text-3xl font-semibold">{p.nome}</h2>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {p.numeros.map(([v, l]) => (
                    <div key={l} className="rounded-xl border border-white/10 bg-[#155E75]/30 p-4">
                      <div className="font-display text-2xl text-gold">{v}</div>
                      <div className="mt-1 text-xs leading-snug text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">{p.corpo}</div>
              </div>
            </article>
          ))}
        </section>

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
