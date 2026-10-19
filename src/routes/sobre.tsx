import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import fotoVictor from "@/assets/sobre-victor.webp";
import fotoMatheus from "@/assets/sobre-matheus.webp";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a PO2 - Quem está por trás do Método PO2" },
      {
        name: "description",
        content:
          "Conheça quem está por trás do Método PO2: Matheus Staruck, fundador, e Victor Nogueira, cofundador, com +R$17MM em receita gerada. Prospecção B2B e estruturação de operações comerciais desde 2024, em Porto Alegre.",
      },
      { property: "og:title", content: "Sobre a PO2 - Quem está por trás" },
      { property: "og:url", content: "https://www.prospeccaoodeouropo2.com/sobre" },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaoodeouropo2.com/sobre" }],
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
      ["+R$2MM", "Receita gerada"],
      ["+5", "Anos em operação outbound"],
      ["+200k", "Ligações realizadas"],
      ["+10k", "Empresas prospectadas"],
    ],
    corpo: (
      <>
        <p>
          Nasci em Torres, Rio Grande do Sul, mas fui criado em Arroio do Sal. Sou filho de um construtor civil e de
          uma professora que, ao longo do tempo, se tornou empresária no segmento de eventos. Foi acompanhando essa
          trajetória que aprendi desde cedo sobre{" "}
          <span className={strong}>relacionamento com clientes, negociação e fechamento de contratos</span>.
        </p>
        <p>
          Meu lado empreendedor começou muito cedo: <span className={strong}>desde os 12 anos</span> eu buscava
          maneiras de ganhar dinheiro fazendo pequenos serviços e negociando produtos no Marketplace do Facebook, o
          "Brick", como a gente chama aqui no sul. Depois vieram os estudos em{" "}
          <span className={strong}>Tecnologia da Informação</span> e a manutenção de computadores para conhecidos e
          familiares, até passar pelo varejo.
        </p>
        <p>
          Foi na <span className={strong}>Hub7</span> que mergulhei de vez no universo da{" "}
          <span className={strong}>prospecção B2B, outbound e desenvolvimento comercial</span>, participando da
          construção de operações comerciais, estruturação de processos, criação de cadências, treinamento de equipes e
          negociações estratégicas.
        </p>
        <p>
          Toda essa experiência resultou na <span className={strong}>criação da PO2</span>, onde hoje ajudo empresas a
          criarem <span className={strong}>operações comerciais previsíveis</span> através de metodologia, processos,
          tecnologia e inteligência comercial.
        </p>
      </>
    ),
  },
  {
    nome: "Victor Nogueira",
    cargo: "Cofundador",
    foto: fotoVictor,
    alt: "Victor Nogueira, cofundador da PO2",
    numeros: [
      ["+US$3M", "Receita previsível"],
      ["+200", "Reuniões com ICP definido e decisores corretos"],
      ["Banco Inter", "Parceria construída com grande marca"],
    ],
    corpo: (
      <>
        <p>
          <span className={strong}>Victor Nogueira</span> é especialista em{" "}
          <span className={strong}>vendas consultivas, geração de demanda e Global Markets</span>.
        </p>
        <p>
          Já atuou em operações <span className={strong}>high-ticket</span> e, durante sua passagem pela{" "}
          <span className={strong}>ExitLag</span>, gerou{" "}
          <span className={strong}>+200 reuniões com ICP definido e decisores corretos</span>, além de participar da
          construção de parcerias com grandes marcas, como <span className={strong}>Banco Inter</span>, e contribuir
          para mais de <span className={strong}>US$ 3 milhões em receita previsível</span>.
        </p>
        <p>
          Hoje, leva essa experiência para ajudar profissionais e empresas a{" "}
          <span className={strong}>
            gerar oportunidades qualificadas, acessar decisores e transformar prospecção em receita
          </span>
          .
        </p>
      </>
    ),
  },
];

const CASES = [
  { empresa: "Mansão Maromba", contato: "Diretor Thiago (Toguro)", ctx: "Contato direto com o diretor. Agenda realizada para fechar parceria.", metrica: "Parceria", rotulo: "agendada com C-Level.", tag: "C-Level" },
  { empresa: "Comil Ônibus", contato: "Diretoria executiva", ctx: "Conversa direta com diretores sobre uso de I.A. na operação.", metrica: "+R$ 40K", rotulo: "MRR em proposta avançada.", tag: "Em proposta" },
  { empresa: "Kabum", contato: "Setor financeiro", ctx: "Agenda realizada para falar com o setor financeiro.", metrica: "+R$ 100K", rotulo: "DIAL em proposta avançada.", tag: "Em proposta" },
  { empresa: "Volpato", contato: "Time de tecnologia", ctx: "Agenda realizada para falar sobre tecnologia.", metrica: "+R$ 12K", rotulo: "MRR em proposta avançada.", tag: "Em proposta" },
  { empresa: "ExitLag", contato: "Victor Nogueira", ctx: "Prospecção com ICP definido e decisores corretos durante a passagem do Victor pela empresa, contribuindo para mais de US$ 3 milhões em receita previsível.", metrica: "+200", rotulo: "reuniões com ICP definido e decisores corretos.", tag: "Reuniões" },
  { empresa: "Banco Inter", contato: "Victor Nogueira", ctx: "Participação na construção da parceria com a marca, durante a passagem do Victor pela ExitLag.", metrica: "Parceria", rotulo: "construída com grande marca.", tag: "Parceria" },
];

function SobrePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 md:pt-24">
          <span className="inline-block rounded-md bg-gold px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-foreground">
            Sobre nós
          </span>
          <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
            Quem está{" "}
            <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
              por trás
            </span>{" "}
            do Método PO2
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Fundada em 2024, em Porto Alegre (RS), a PO2 é especializada em prospecção B2B e estruturação de operações
            comerciais. Ajudamos negócios a desenvolver processos de vendas mais eficientes, estruturados e previsíveis.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-8">
          <div className="rounded-3xl border border-gold/30 bg-gradient-to-r from-[#155E75]/40 to-card p-8 md:flex md:items-end md:justify-between md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Resultados dos fundadores</p>
              <p className="mt-3 font-display text-5xl text-gold md:text-7xl">+R$17MM</p>
              <p className="mt-2 text-muted-foreground">em receita gerada, somando os resultados do Matheus e do Victor.</p>
            </div>
            <p className="mt-6 max-w-sm text-xs leading-relaxed text-muted-foreground md:mt-0">
              R$2 milhões na PO2 e mais de US$ 3 milhões em receita previsível em operações do Victor, convertidos a
              R$5,00 por dólar.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-2 md:py-16">
          {PESSOAS.map((p) => (
            <article key={p.nome} className="overflow-hidden rounded-3xl border border-white/10 bg-card">
              <img
                src={p.foto}
                alt={p.alt}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
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

        <section id="casos" className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Casos reais</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Empresas prospectadas pela{" "}
            <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
              PO2
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Contatos diretos com decisores, agendas realizadas e propostas em andamento: método validado em campo.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {CASES.map((c) => (
              <div key={c.empresa} className="flex flex-col rounded-2xl border border-white/10 bg-card p-7 transition-colors hover:border-gold/40">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold">{c.empresa}</h3>
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

        <section className="mx-auto max-w-7xl px-6 pb-24">
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
