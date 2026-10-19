import { ArrowRight, Check, X } from "lucide-react";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import fotoMatheus from "@/assets/sobre-matheus.webp";
import fotoVictor from "@/assets/sobre-victor.webp";

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
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-6 select-none font-display text-[9rem] font-normal leading-none text-white/[0.03] md:text-[16rem]"
      >
        {c.n}
      </span>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm text-gold">{c.n}</span>
            <span className="h-px w-8 bg-gold/60" />
            <Eyebrow>{c.papel}</Eyebrow>
          </div>
          <h2 className="mt-5 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
            {c.titulo}
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {c.intro}
          </p>
          <p className="mt-6 max-w-lg border-l-2 border-gold pl-4 text-sm font-medium text-foreground/90">
            {c.rodape}
          </p>
        </div>
        <ol className="space-y-3">
          {c.passos.map((p, i) => (
            <li
              key={p.t}
              className="group flex gap-5 rounded-2xl border border-white/10 bg-card/60 p-6 transition-colors hover:border-gold/40"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-sm text-gold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-medium">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
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
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function SolucaoHome() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
        <Eyebrow>O que a gente vende</Eyebrow>
        <h2 className="mt-6 text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
          Retire a sua empresa dos aparelhos e comece a respirar <span className={GRADIENTE}>ar puro</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Um comercial que respira sozinho: com método, tecnologia e ritmo.
        </p>
        <Ecg className="mx-auto mt-10 h-14 w-full max-w-2xl md:h-16" />
      </div>
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
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
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
          <div className="rounded-3xl border border-white/10 bg-card/60 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Sem a PO2</p>
            <ul className="mt-5 space-y-3">
              {SEM.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-red-400/70" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-gold/30 bg-gold/5 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Com a PO2</p>
            <ul className="mt-5 space-y-3">
              {COM.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
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
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Eyebrow>Como a gente vende isso</Eyebrow>
        <h2 className="mt-4 max-w-4xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          Do primeiro contato ao <span className={GRADIENTE}>fechamento</span>
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-5">
          {FAIXA.map((f) => (
            <li key={f.href} className="bg-background last:col-span-2 md:last:col-span-1">
              <a href={f.href} className="flex h-full flex-col gap-2 p-5 transition-colors hover:bg-white/[0.03]">
                <span className="font-display text-xs text-gold">{f.n}</span>
                <span className="font-display text-base">{f.t}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PulseCapitulo() {
  return (
    <section id="pulse" className="relative overflow-hidden border-t border-white/5 bg-[#0B0D0E]">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
        <Eyebrow>05 · Pulse</Eyebrow>
        <h2 className="mt-5 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          Oxigênio sem <span className={GRADIENTE}>pulsação</span> não mantém ninguém vivo
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-muted-foreground md:text-lg">
          O Pulse é o CRM da PO2: leads, atividades, funil e cadências no ritmo certo, todo dia.
        </p>
        <Ecg className="mx-auto mt-10 h-14 w-full max-w-2xl md:h-16" />
      </div>
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
    d: "Anos de outbound e prospecção B2B, com operações, cadências e times construídos do zero.",
  },
  {
    nome: "Victor Nogueira",
    cargo: "Cofundador",
    foto: fotoVictor,
    d: "Vendas consultivas e geração de demanda, com mais de US$ 3 milhões em receita previsível.",
  },
];

export function QuemVendeHome() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Eyebrow>Quem vende isso</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          Quem faz a PO2 <span className={GRADIENTE}>respirar vendas</span>
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {FUNDADORES.map((f) => (
            <article key={f.nome} className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-card sm:flex-row">
              <img
                src={f.foto}
                alt={f.nome}
                className="aspect-[4/3] w-full object-cover object-top sm:aspect-[4/5] sm:w-2/5"
              />
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{f.cargo}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{f.nome}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="border-t border-white/5 bg-[#0B0D0E]">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
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
