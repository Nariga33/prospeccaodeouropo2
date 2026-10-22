import { ArrowRight, Check, X } from "lucide-react";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import fotoMatheus from "@/assets/sobre-matheus.webp";
import fotoVictor from "@/assets/sobre-victor.webp";
import { Halo, Reveal } from "@/components/po2/Reveal";

const GRADIENTE =
  "bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent";

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.3em] ${
        dark ? "text-[#155E75]" : "text-gold"
      }`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Capítulos                                                          */
/* ------------------------------------------------------------------ */

type Capitulo = {
  id: string;
  n: string;
  papel: string;
  titulo: React.ReactNode;
  intro: string;
  passos: { t: string; d: string }[];
  rodape: string;
  fundo: "escuro" | "base";
};

const CAPITULOS: Capitulo[] = [
  {
    id: "pre-vendas",
    n: "01",
    papel: "Pré-vendas · LDR",
    titulo: (
      <>
        Tudo começa antes da primeira <span className={GRADIENTE}>ligação</span>
      </>
    ),
    intro:
      "Quem chega até a PO2 quase sempre tem o mesmo problema: a pré-venda não está estruturada. O LDR é a base dessa estrutura. Ele prepara o terreno para o time só falar com quem vale a conversa, na hora certa.",
    passos: [
      {
        t: "Montagem de lista",
        d: "Contas e contatos reais, organizados e higienizados, nascidos do perfil de quem já compra.",
      },
      {
        t: "Definição de ICP",
        d: "O perfil de cliente ideal escrito e compartilhado. Cada etapa sabe quem vale o esforço.",
      },
      {
        t: "Definição de persona",
        d: "Quem decide, quem influencia e o que cada um precisa ouvir para abrir a conversa.",
      },
      {
        t: "Definição do tempo de ligação",
        d: "Quando ligar, por quanto tempo e em que ritmo, para o time prospectar com rotina e não por impulso.",
      },
    ],
    rodape: "Resultado: um BDR que entra em campo já sabendo quem abordar, como e quando.",
    fundo: "base",
  },
  {
    id: "bdr",
    n: "02",
    papel: "BDR · Prospecção ativa",
    titulo: (
      <>
        O BDR abre a porta. A metodologia PO2 dá o <span className={GRADIENTE}>caminho</span>
      </>
    ),
    intro:
      "BDR é quem prospecta de forma ativa: sai atrás do lead que ainda não conhece a empresa e transforma o contato frio em reunião qualificada. Na PO2 isso não depende de talento individual. Depende de método.",
    passos: [
      {
        t: "Estudo do lead",
        d: "Cada abordagem nasce do contexto real da empresa, do cargo e do momento.",
      },
      {
        t: "Cadência multicanal",
        d: "Ligação, e-mail, LinkedIn e WhatsApp em uma ordem que conta uma história até a resposta.",
      },
      {
        t: "Cold call consultiva",
        d: "Diga o nome, identifique-se, dê o motivo, explique o porquê e peça o que quer. Depois, pare de falar.",
      },
      {
        t: "Objeções e qualificação",
        d: "Respostas treinadas e perguntas de diagnóstico para só levar adiante o que tem aderência.",
      },
      {
        t: "Métricas e melhoria",
        d: "Números revisados toda semana por etapa. A decisão vira dado, não achismo.",
      },
    ],
    rodape: "Resultado: reuniões já validadas, entregues para quem vai conduzir a venda.",
    fundo: "escuro",
  },
  {
    id: "sdr",
    n: "03",
    papel: "SDR · Qualificação",
    titulo: (
      <>
        O SDR cuida de quem já levantou a <span className={GRADIENTE}>mão</span>
      </>
    ),
    intro:
      "SDR é quem trabalha o lead que já demonstrou interesse, vindo de inbound, de campanha ou da própria prospecção. O papel dele é responder rápido, qualificar e passar a bola de forma limpa para o closer.",
    passos: [
      {
        t: "Priorização do lead",
        d: "Critério claro de quem merece atenção primeiro, para o tempo do time ir para onde há chance.",
      },
      {
        t: "Resposta rápida",
        d: "Lead esfria. Um tempo de resposta combinado evita oportunidade perdida por demora.",
      },
      {
        t: "Qualificação objetiva",
        d: "Perguntas certas para entender dor, momento e quem decide, sem virar interrogatório.",
      },
      {
        t: "Passagem estruturada",
        d: "O closer recebe o contexto completo e não precisa começar a conversa do zero.",
      },
    ],
    rodape: "Resultado: menos lead jogado fora e uma venda que começa mais adiantada.",
    fundo: "base",
  },
  {
    id: "closer",
    n: "04",
    papel: "Closer · Mentoria",
    titulo: (
      <>
        Fechar é uma habilidade que se <span className={GRADIENTE}>treina</span>
      </>
    ),
    intro:
      "O closer conduz a oportunidade até a decisão. Aqui entra a mentoria da PO2: acompanhamento próximo para o time conduzir a negociação com contexto, critério e segurança.",
    passos: [
      {
        t: "Contexto antes da call",
        d: "Chegar sabendo o que foi dito, o que dói e quem decide.",
      },
      {
        t: "Custo da inação",
        d: "Ajudar o cliente a enxergar o que ele perde ao não resolver o problema.",
      },
      {
        t: "Objeções finais e margem",
        d: "Saber o que negociar, até onde ir e quando não ceder.",
      },
      {
        t: "Follow-up e onboarding",
        d: "Acompanhar até o sim e entregar o cliente bem recebido, com o próximo passo definido.",
      },
    ],
    rodape: "Resultado: um time que fecha com método e aprende a cada negociação.",
    fundo: "escuro",
  },
];

function CapituloBloco({ c }: { c: Capitulo }) {
  const escuro = c.fundo === "escuro";
  return (
    <section
      id={c.id}
      className={`relative overflow-hidden border-t border-white/5 ${escuro ? "bg-[#0B0D0E]" : ""}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/3 h-[420px] w-[420px] rounded-full bg-[#155E75]/15 blur-[120px] ${
          escuro ? "-right-32" : "-left-32"
        }`}
      />
      <div className="relative mx-auto grid max-w-[1450px] gap-12 px-6 py-20 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <Reveal className="relative lg:sticky lg:top-28 lg:self-start">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-1 -top-16 select-none font-display text-[7rem] leading-none text-transparent md:-top-24 md:text-[11rem]"
            style={{ WebkitTextStroke: "1px rgba(216,255,54,0.14)" }}
          >
            {c.n}
          </span>
          <div className="relative flex items-center gap-3">
            <span className="font-display text-sm text-gold">{c.n}</span>
            <span className="h-px w-8 bg-gold/60" />
            <Eyebrow>{c.papel}</Eyebrow>
          </div>
          <h2 className="relative mt-5 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
            {c.titulo}
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {c.intro}
          </p>
          <p className="mt-8 max-w-lg rounded-r-xl border-l-2 border-gold bg-gradient-to-r from-gold/[0.07] to-transparent py-3 pl-4 pr-4 text-sm font-medium text-foreground/90">
            {c.rodape}
          </p>
        </Reveal>
        <ol className="relative space-y-3">
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[42px] top-10 w-px bg-gradient-to-b from-gold/60 via-white/10 to-transparent"
          />
          {c.passos.map((p, i) => (
            <li key={p.t}>
              <Reveal delay={i * 70}>
                <div className="group relative flex gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_10px_40px_-12px_rgba(216,255,54,0.18)]">
                  <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-[#0B0D0E] font-display text-sm text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium">{p.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 1. O que a gente vende (solução)                                   */
/* ------------------------------------------------------------------ */

function Ecg({ className = "" }: { className?: string }) {
  return (
    <>
      <style>{`
        @keyframes po2-ecg { from { stroke-dashoffset: 1300; } to { stroke-dashoffset: 0; } }
        .po2-ecg { stroke-dasharray: 1300; animation: po2-ecg 3.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .po2-ecg { animation: none; stroke-dashoffset: 0; } }
      `}</style>
      <svg aria-hidden="true" viewBox="0 0 1200 160" className={className}>
        <defs>
          <linearGradient id="po2g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#D8FF36" />
            <stop offset="0.5" stopColor="#3EE6A0" />
            <stop offset="1" stopColor="#22C5E6" />
          </linearGradient>
        </defs>
        <path
          className="po2-ecg"
          d="M0 80 H220 L250 80 L275 30 L305 130 L335 55 L355 80 H640 L670 80 L695 25 L725 135 L755 55 L775 80 H1200"
          fill="none"
          stroke="url(#po2g)"
          strokeWidth="3"
          style={{ filter: "drop-shadow(0 0 6px rgba(62,230,160,0.55))" }}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function SolucaoHome() {
  return (
    <section className="relative overflow-hidden border-t border-white/5">
      <Halo />
      <Reveal className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-36">
        <Eyebrow>O que a gente vende</Eyebrow>
        <h2 className="mt-6 text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
          Retire a sua empresa dos aparelhos e comece a respirar <span className={GRADIENTE}>ar puro</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Um comercial que respira sozinho: com método, tecnologia e ritmo.
        </p>
        <Ecg className="mx-auto mt-12 h-14 w-full max-w-3xl md:h-20" />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Pra quem a gente vende (a dor do cliente)                       */
/* ------------------------------------------------------------------ */

const SEM = [
  "Venda que depende do esforço de uma pessoa só",
  "Lista no chute e abordagem genérica",
  "Cadência sem estratégia, sem história",
  "Número sem análise, decisão no achismo",
];
const COM = [
  "ICP documentado e lista certa",
  "Abordagem consultiva e cadência estruturada",
  "Time treinado e mentorado, do BDR ao closer",
  "Inovação com tecnologia própria e ritmo diário",
];

export function PraQuemHome() {
  return (
    <section className="border-t border-white/5 bg-[#0B0D0E]">
      <div className="mx-auto max-w-[1450px] px-6 py-20 md:py-28">
        <Eyebrow>Pra quem a gente vende</Eyebrow>
        <h2 className="mt-4 max-w-4xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          Para quem já vende, mas sente a operação{" "}
          <span className={GRADIENTE}>sem fôlego</span>
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
          Empresas B2B, de CEOs e diretores comerciais a times de LDR, BDR, SDR e closer, que querem previsibilidade
          para gerar oportunidades.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-white/10 bg-card/60 p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Sem a PO2</p>
            <ul className="mt-6 space-y-4">
              {SEM.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground md:text-base">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-red-400/10">
                    <X className="size-3 text-red-400/80" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/[0.09] via-gold/[0.03] to-transparent p-8 shadow-[0_0_60px_-20px_rgba(216,255,54,0.25)] md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Com a PO2</p>
            <ul className="mt-6 space-y-4">
              {COM.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground/90 md:text-base">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/15">
                    <Check className="size-3 text-gold" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Como a gente vende isso (produto, estrutura e entrega)          */
/* ------------------------------------------------------------------ */

const FAIXA = [
  { href: "#pre-vendas", n: "01", t: "Pré-vendas" },
  { href: "#bdr", n: "02", t: "BDR" },
  { href: "#sdr", n: "03", t: "SDR" },
  { href: "#closer", n: "04", t: "Closer" },
  { href: "#pulse", n: "05", t: "Pulse" },
];

function ComoIntro() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        <Eyebrow>Como a gente vende isso</Eyebrow>
        <h2 className="mt-4 max-w-4xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          Do primeiro contato ao <span className={GRADIENTE}>fechamento</span>
        </h2>
        <Reveal className="relative mt-12">
          <span
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-5 h-px bg-gradient-to-r from-[#D8FF36]/70 via-[#3EE6A0]/40 to-[#22C5E6]/70 md:top-6"
          />
          <ul className="relative grid grid-cols-5 gap-2">
            {FAIXA.map((f) => (
              <li key={f.href}>
                <a href={f.href} className="group flex flex-col items-center gap-3 text-center">
                  <span className="grid size-10 place-items-center rounded-full border border-gold/50 bg-background font-display text-xs text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-gold-foreground group-hover:shadow-[0_0_30px_rgba(216,255,54,0.45)] md:size-12 md:text-sm">
                    {f.n}
                  </span>
                  <span className="whitespace-nowrap font-display text-[10px] leading-tight text-foreground/90 transition-colors group-hover:text-gold sm:text-sm md:text-lg">
                    {f.t}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function PulseCapitulo() {
  return (
    <section id="pulse" className="relative overflow-hidden border-t border-white/5 bg-[#0B0D0E]">
      <Halo />
      <Reveal className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-36">
        <Eyebrow>05 · Pulse</Eyebrow>
        <h2 className="mt-5 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          Oxigênio sem <span className={GRADIENTE}>pulsação</span> não mantém ninguém vivo
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-muted-foreground md:text-lg">
          O Pulse é o CRM da PO2: leads, atividades, funil e cadências no ritmo certo, todo dia.
        </p>
        <Ecg className="mx-auto mt-12 h-14 w-full max-w-3xl md:h-20" />
      </Reveal>
    </section>
  );
}

export function ComoHome() {
  return (
    <>
      <ComoIntro />
      {CAPITULOS.map((c) => (
        <CapituloBloco key={c.id} c={c} />
      ))}
      <PulseCapitulo />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Quem vende isso (sobre) e 5. CTA                                */
/* ------------------------------------------------------------------ */

const FUNDADORES = [
  {
    nome: "Matheus Staruck",
    cargo: "Fundador e CEO",
    foto: fotoMatheus,
    stat: "+R$10MM",
    d: "Especialista em Outbound, Vendas Consultivas, Challenger Sale e Gestão Comercial.",
  },
  {
    nome: "Victor Nogueira",
    cargo: "Cofundador",
    foto: fotoVictor,
    stat: "+R$10MM",
    d: "Especialista em Challenger Sale, Vendas Consultivas e Global Sales.",
  },
];

export function QuemVendeHome() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-[1450px] px-6 py-20 md:py-28">
        <Eyebrow>Quem vende isso</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          Quem faz a PO2 <span className={GRADIENTE}>respirar vendas</span>
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {FUNDADORES.map((f, i) => (
            <Reveal key={f.nome} delay={i * 120}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card transition-all duration-500 hover:border-gold/40 hover:shadow-[0_20px_60px_-25px_rgba(216,255,54,0.25)] sm:flex-row">
              <div className="relative overflow-hidden sm:w-2/5">
                <img
                  src={f.foto}
                  alt={f.nome}
                  className="aspect-[4/3] h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] sm:aspect-[4/5]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/60 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-card/70" />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{f.cargo}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{f.nome}</h3>
                <p className={`mt-4 font-display text-4xl md:text-5xl ${GRADIENTE}`}>{f.stat}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">em negócios gerados</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0B0D0E]">
      <Halo />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 md:size-[760px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#22C5E6]/10 md:size-[500px]"
      />
      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center md:py-40">
        <h2 className="text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
          Pronto para <span className={GRADIENTE}>respirar</span>?
        </h2>
        <a
          href={PO2_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
        >
          Falar com o time <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

export function CtaOxigenio() {
  return (
    <section className="mx-auto max-w-[1450px] px-6 py-12 md:py-16">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-gold/30 bg-gradient-to-br from-[#155E75]/40 via-card to-card p-8 md:flex-row md:items-center md:p-12">
        <div>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
            Sua prospecção está com pouco oxigênio e <span className={GRADIENTE}>pulso baixo</span>?
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
  );
}
