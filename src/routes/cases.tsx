import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { ClientesMarquee } from "@/components/po2/ClientesMarquee";
import { PO2_WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Cases - PO2 Oxigênio Comercial" },
      {
        name: "description",
        content:
          "Empresas prospectadas pela PO2: contatos diretos com decisores, agendas realizadas e propostas em andamento.",
      },
      { property: "og:title", content: "Cases - PO2" },
      { property: "og:url", content: "https://pulsepo2.com/cases" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/cases" }],
  }),
  component: CasesPage,
});

const CASES = [
  { empresa: "Mansão Maromba", contato: "Diretor Thiago (Toguro)", ctx: "Contato direto com o diretor. Agenda realizada para fechar parceria.", metrica: "Parceria", rotulo: "agendada com C-Level.", tag: "C-Level" },
  { empresa: "Comil Ônibus", contato: "Diretoria executiva", ctx: "Conversa direta com diretores sobre uso de I.A. na operação.", metrica: "+R$ 40K", rotulo: "MRR em proposta avançada.", tag: "Em proposta" },
  { empresa: "Kabum", contato: "Setor financeiro", ctx: "Agenda realizada para falar com o setor financeiro.", metrica: "+R$ 100K", rotulo: "DIAL em proposta avançada.", tag: "Em proposta" },
  { empresa: "Volpato", contato: "Time de tecnologia", ctx: "Agenda realizada para falar sobre tecnologia.", metrica: "+R$ 12K", rotulo: "MRR em proposta avançada.", tag: "Em proposta" },
  { empresa: "ExitLag", contato: "Victor Nogueira", ctx: "Prospecção com ICP definido e decisores corretos durante a passagem do Victor pela empresa, contribuindo para mais de US$ 3 milhões em receita previsível.", metrica: "+200", rotulo: "reuniões com ICP definido e decisores corretos.", tag: "Reuniões" },
  { empresa: "Banco Inter", contato: "Victor Nogueira", ctx: "Participação na construção da parceria com a marca, durante a passagem do Victor pela ExitLag.", metrica: "Parceria", rotulo: "construída com grande marca.", tag: "Parceria" },
];


function CasesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="mx-auto max-w-[1450px] px-6 pb-10 pt-16 md:pt-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Cases</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
            Empresas prospectadas pela{" "}
            <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
              PO2
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Contatos diretos com decisores, agendas realizadas e propostas em andamento.
          </p>
        </section>

        <section className="mx-auto max-w-[1450px] px-6 pb-20 md:pb-28">
          <div className="grid gap-4 md:grid-cols-2">
            {CASES.map((c) => (
              <div key={c.empresa} className="flex flex-col rounded-2xl border border-white/10 bg-card p-7 transition-colors hover:border-gold/40">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl font-semibold">{c.empresa}</h2>
                  <span className="rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                    {c.tag}
                  </span>
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.contato}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.ctx}</p>
                <div className="mt-6 flex items-baseline gap-2 border-t border-white/10 pt-5">
                  <span className="font-display text-3xl text-gold">{c.metrica}</span>
                  <span className="text-sm text-muted-foreground">{c.rotulo}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ClientesMarquee />

        <section className="mx-auto max-w-[1450px] px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#155E75]/40 via-card to-card p-8 md:flex-row md:items-center md:p-12">
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              Quer ser o próximo case?
            </h2>
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
