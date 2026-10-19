import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Zap, Users, Settings, Headset, ChevronDown } from "lucide-react";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import { FunilEtapas, MatrizDiagnostico, PitchBlocos, PlanoEtapas, ProblemaMetodo } from "@/components/po2/Metodo";
import bgHero from "@/assets/bg-gradiente-hero.webp";
import { SolucaoHome } from "@/components/po2/Jornada";
import { Arcs } from "@/components/po2/Arcs";
import { ClientesMarquee } from "@/components/po2/ClientesMarquee";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções - PO2 Oxigênio Comercial" },
      {
        name: "description",
        content:
          "Estruturação comercial, aceleração de vendas, mentoria, tecnologia e terceirização de pré-vendas: as soluções da PO2 para gerar mais oportunidades e resultados.",
      },
      { property: "og:title", content: "Soluções - PO2" },
      { property: "og:url", content: "https://pulsepo2.com/solucoes" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/solucoes" }],
  }),
  component: SolucoesPage,
});

type Item = {
  id: string;
  icon: typeof BarChart3;
  t: string;
  d: string;
  lista?: { titulo: string; itens: string[] };
};

const PRE_VENDAS = [
  "Montagem de lista",
  "Montagem de ICP",
  "Diagnóstico estrutural",
  "Cadência multicanal",
  "Pitch alinhado",
  "Refinamento de pitch",
  "Acompanhamento até a entrega de resultado",
];

const ITEMS: Item[] = [
  {
    id: "estruturacao",
    icon: BarChart3,
    t: "Estruturação comercial",
    d: "Organizamos processos, times e ferramentas para uma operação mais previsível e escalável.",
    lista: { titulo: "Estruturação de processos de pré-vendas", itens: PRE_VENDAS },
  },
  {
    id: "aceleracao",
    icon: Zap,
    t: "Aceleração de vendas",
    d: "Implementamos estratégias e rotinas que geram mais oportunidades e aumentam a taxa de conversão.",
  },
  {
    id: "mentoria",
    icon: Users,
    t: "Mentoria e capacitação",
    d: "Desenvolvemos times comerciais com métodos práticos e aplicáveis à realidade de cada negócio.",
  },
  {
    id: "tecnologia",
    icon: Settings,
    t: "Tecnologia a favor de vendas",
    d: "Implementamos automações e soluções que dão mais eficiência e visibilidade para a operação.",
  },
  {
    id: "terceirizacao",
    icon: Headset,
    t: "Terceirização de pré-vendas",
    d: "A PO2 assume a operação de pré-vendas da sua empresa, da prospecção à entrega de oportunidades.",
  },
];

function SolucoesPage() {
  const [open, setOpen] = useState<string>("estruturacao");
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-white/5">
        <img src={bgHero} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70" />
        <Arcs className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-full max-w-[1100px] opacity-70 md:block md:translate-x-[40%]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-20 md:pt-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <div className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground md:text-xs">
              Soluções
            </div>
            <h1 className="mt-8 max-w-lg text-balance font-display text-4xl font-normal leading-[1.1] tracking-tight md:text-6xl">
              Estrutura comercial para{" "}
              <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
                resultados
              </span>
            </h1>
            <p className="mt-8 max-w-md text-pretty text-lg text-muted-foreground">
              Do primeiro contato ao fechamento: processos, tecnologia e mentoria para o seu comercial respirar sozinho.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={PO2_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
              >
                Falar com o time <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <ul className="space-y-3">
            {ITEMS.map((i) => {
              const isOpen = open === i.id;
              const Icon = i.icon;
              return (
                <li key={i.id} id={i.id} className="rounded-2xl border border-white/10 bg-card/70 backdrop-blur">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? "" : i.id)}
                    className="flex w-full items-start gap-5 p-5 text-left"
                  >
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-gold/50 text-[#22C5E6]">
                      <Icon className="size-7" strokeWidth={1.5} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-xl font-medium">{i.t}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{i.d}</span>
                    </span>
                    <ChevronDown className={`mt-1 size-5 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/10 px-5 pb-5 pt-4 sm:pl-24">
                      {i.lista && (
                        <>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{i.lista.titulo}</p>
                          <ul className="mt-3 space-y-2 text-sm">
                            {i.lista.itens.map((x) => (
                              <li key={x} className="flex gap-2"><span className="text-gold">•</span>{x}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      <a
                        href={PO2_WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
                      >
                        Quero saber mais <ArrowRight className="size-4" />
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <ClientesMarquee />
        </section>
        <SolucaoHome />
        <ProblemaMetodo />
        <FunilEtapas />
        <MatrizDiagnostico />
        <PlanoEtapas />
        <PitchBlocos />
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#155E75]/40 via-card to-card p-8 md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                Sua prospecção está com pouco oxigênio e pulso baixo?
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Fale com o time da PO2. Medimos onde falta fôlego na sua operação comercial e devolvemos o ritmo.
              </p>
            </div>
            <a
              href={PO2_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
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
