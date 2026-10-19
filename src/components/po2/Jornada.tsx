import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import { PO2_WHATSAPP_URL } from "@/lib/contact";

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
/* Faixa de capítulos                                                 */
/* ------------------------------------------------------------------ */

const FAIXA = [
  { href: "#pre-vendas", n: "01", t: "Pré-vendas" },
  { href: "#bdr", n: "02", t: "BDR" },
  { href: "#sdr", n: "03", t: "SDR" },
  { href: "#closer", n: "04", t: "Closer" },
  { href: "#para-quem", n: "05", t: "Para quem" },
  { href: "#pulse", n: "06", t: "Pulse" },
];

export function JornadaIntro() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Eyebrow>O que você encontra na PO2</Eyebrow>
        <h2 className="mt-4 max-w-4xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          Uma operação comercial inteira, do primeiro contato ao{" "}
          <span className={GRADIENTE}>fechamento</span>
        </h2>
        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          Role e acompanhe cada etapa. Cada papel tem sua função, e a PO2 estrutura e acelera todas elas.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-6">
          {FAIXA.map((f) => (
            <li key={f.href} className="bg-background">
              <a
                href={f.href}
                className="flex h-full flex-col gap-2 p-5 transition-colors hover:bg-white/[0.03]"
              >
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

export function Jornada() {
  return (
    <>
      <JornadaIntro />
      {CAPITULOS.map((c) => (
        <CapituloBloco key={c.id} c={c} />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Para quem é / não é                                                */
/* ------------------------------------------------------------------ */

const PAPEIS = [
  "CEOs",
  "Diretores comerciais",
  "Gestores comerciais",
  "LDRs",
  "BDRs",
  "SDRs",
  "Closers",
];

const SIM = [
  "Já vende, mas depende de esforço individual para gerar oportunidade",
  "Tem, ou quer ter, ao menos uma pessoa dedicada à prospecção ou às vendas",
  "Quer processo replicável, sem depender de sorte comercial",
  "Aceita ser guiado por diagnóstico antes de qualquer proposta fechada",
];

const NAO = [
  "Busca resultado sem mudar nada do processo atual",
  "Não tem verba para estruturar ao menos uma posição comercial",
  "Quer solução mágica, sem acompanhamento nem disciplina de execução",
  "Já tem operação madura, com método documentado e funcionando",
  "Não vende B2B ou não tem time, nem intenção de montar um",
];

export function ParaQuemHome() {
  return (
    <section id="para-quem" className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Eyebrow>05 · Para quem é</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          O ecossistema PO2 é para quem <span className={GRADIENTE}>vende e lidera vendas</span>
        </h2>
        <ul className="mt-8 flex flex-wrap gap-2">
          {PAPEIS.map((p) => (
            <li
              key={p}
              className="rounded-full border border-gold/40 bg-gold/5 px-4 py-2 text-sm font-medium text-gold"
            >
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-gold/30 bg-gold/5 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Faz sentido se</p>
            <ul className="mt-5 space-y-3">
              {SIM.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Não faz sentido se
            </p>
            <ul className="mt-5 space-y-3">
              {NAO.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-red-400/70" /> {s}
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
/* Pulse: oxigênio + pulsação                                         */
/* ------------------------------------------------------------------ */

const APARELHOS = [
  "Venda que depende do esforço de uma pessoa só",
  "Lista no chute e abordagem genérica",
  "Cadência sem estratégia, sem história",
  "Número sem análise, decisão no achismo",
];
const AR_PURO = [
  "ICP documentado e lista certa",
  "Abordagem consultiva e cadência estruturada",
  "Time treinado e mentorado, do BDR ao closer",
  "Ritmo diário no Pulse e métricas revisadas toda semana",
];

export function PulseFinal() {
  return (
    <section id="pulse" className="relative overflow-hidden border-t border-white/5 bg-[#0B0D0E]">
      <style>{`
        @keyframes po2-ecg { from { stroke-dashoffset: 1200; } to { stroke-dashoffset: 0; } }
        @keyframes po2-beat { 0%,100% { transform: scale(1); opacity: .55; } 12% { transform: scale(1.35); opacity: 1; } 24% { transform: scale(1); opacity: .55; } 36% { transform: scale(1.2); opacity: .9; } }
        .po2-ecg { stroke-dasharray: 1200; animation: po2-ecg 3.2s linear infinite; }
        .po2-beat { animation: po2-beat 1.6s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .po2-ecg, .po2-beat { animation: none; stroke-dashoffset: 0; } }
      `}</style>


      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
        <div className="flex items-center justify-center gap-3">
          <span className="relative flex size-3">
            <span className="po2-beat absolute inline-flex size-full rounded-full bg-gold" />
            <span className="relative inline-flex size-3 rounded-full bg-gold" />
          </span>
          <Eyebrow>06 · Pulse · Respire</Eyebrow>
        </div>
        <h2 className="mt-6 text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
          Retire a sua empresa dos aparelhos e comece a respirar <span className={GRADIENTE}>ar puro</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Uma empresa ligada a aparelhos até sobrevive, mas não vive. E não existe pessoa sem
          pulsação só com oxigênio: para respirar sozinha, a sua empresa precisa de método e de pulsação.
        </p>

      <svg
        aria-hidden="true"
        viewBox="0 0 1200 160"
        className="mx-auto mt-12 h-16 w-full max-w-3xl md:h-20"
      >
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
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 text-left md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-card/60 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Nos aparelhos
            </p>
            <ul className="mt-5 space-y-3">
              {APARELHOS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-red-400/70" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-gold/30 bg-gold/5 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Respirando sozinha</p>
            <ul className="mt-5 space-y-3">
              {AR_PURO.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-4 grid max-w-5xl gap-4 text-left md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-card/60 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Oxigênio · inovação</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Método, processo, ICP, cadência e mentoria. É o que traz inovação e dá fôlego para a
              operação comercial.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card/60 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Pulsação · Pulse</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              O Pulse é o CRM da PO2: leads, atividades, funil e cadências rodando todo dia, no ritmo
              certo.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-pretty font-display text-xl text-foreground md:text-2xl">
          Método sem ritmo para. Ritmo sem método dispara. Juntos, a empresa{" "}
          <span className={GRADIENTE}>vive</span>.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/pulse"
            className="inline-flex items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
          >
            Conheça o Pulse <ArrowRight className="size-4" />
          </Link>
          <a
            href={PO2_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-6 rounded-xl border border-white/20 px-7 py-4 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Falar com o time <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
