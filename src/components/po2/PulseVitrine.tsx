import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Database, Phone, Plus, UserPlus, MessageSquareText } from "lucide-react";
import { PO2_WHATSAPP_NUMBER } from "@/lib/contact";
import { Halo, Reveal } from "@/components/po2/Reveal";

const GRADIENTE =
  "bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent";

function zap(texto: string) {
  return `https://wa.me/${PO2_WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

function track(name: string, extra: Record<string, unknown> = {}) {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, { page: "pulse", ...extra });
  } catch {
    /* sem analytics */
  }
}

/* ------------------------------------------------------------------ */
/* Imagem otimizada: WebP responsivo com JPG de reserva                */
/* ------------------------------------------------------------------ */

function Foto({
  nome,
  larguras,
  w,
  h,
  alt,
  sizes,
  className = "",
}: {
  nome: string;
  larguras: [number, number];
  w: number;
  h: number;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const [p, g] = larguras;
  return (
    <picture>
      <source type="image/webp" srcSet={`/pulse/${nome}-${p}.webp ${p}w, /pulse/${nome}-${g}.webp ${g}w`} sizes={sizes} />
      <img
        src={`/pulse/${nome}.jpg`}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

/* ------------------------------------------------------------------ */
/* Demonstração                                                        */
/* ------------------------------------------------------------------ */

const TELAS_DEMO = [
  {
    nome: "01-monitor",
    t: "Monitor",
    d: "Os sinais vitais do comercial: ritmo de ligações, reuniões e o que fazer agora.",
    alt: "Tela Monitor do PO2 Pulse com gráfico de ritmo de ligações, pulso de ligações do dia e reuniões agendadas e realizadas",
  },
  {
    nome: "02-funil-kanban",
    t: "Leads em Kanban",
    d: "Arraste os cards entre as etapas do funil e filtre por origem, contato e cargo.",
    alt: "Tela de leads do PO2 Pulse em Kanban, com colunas Lead, Reunião agendada, No-show e Reunião realizada",
  },
  {
    nome: "03-whatsapp-ia",
    t: "SDR de IA no WhatsApp",
    d: "A IA conversa com o lead no WhatsApp, entende a dor e agenda a reunião, tudo ligado ao card.",
    alt: "Conversa de WhatsApp dentro do PO2 Pulse em que o SDR de IA agenda uma reunião com uma diretora comercial",
  },
  {
    nome: "05-funil-metricas",
    t: "Funil e métricas",
    d: "Do lead ao fechamento, com a etapa que mais perde destacada para você agir.",
    alt: "Tela de funil e métricas comerciais do PO2 Pulse mostrando 15 leads, 11 reuniões e 2 fechamentos em 90 dias",
  },
];

function VideoTour() {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduz, setReduz] = useState(false);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduz(true);
      ref.current?.pause();
    }
  }, []);
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0B0D0E] shadow-[0_40px_120px_-40px_rgba(21,94,117,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 text-[11px] text-muted-foreground">
          PO2 Pulse
        </span>
      </div>
      <video
        ref={ref}
        src="/pulse/tour-pulse.mp4"
        poster="/pulse/tour-pulse-capa.jpg"
        width={1440}
        height={900}
        autoPlay={!reduz}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduz}
        aria-label="Tour de 52 segundos pelo PO2 Pulse: monitor, leads em Kanban, WhatsApp com SDR de IA, cadências e funil"
        className="block aspect-[16/10] w-full bg-black object-cover"
      />
    </div>
  );
}

export function PulseDemonstracao() {
  return (
    <section id="demonstracao" className="relative overflow-hidden border-y border-white/5 bg-[#05090B]">
      <Halo />
      <div className="relative mx-auto max-w-[1450px] px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Demonstração</p>
          <h2 className="mt-4 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
            Criado por quem já precisou de oxigênio e <span className={GRADIENTE}>não tinha o aparelho certo</span>
          </h2>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            Veja o Pulse por dentro: monitor, funil, WhatsApp com IA, cadências e métricas, na mesma tela.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-6xl">
          <VideoTour />
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-6xl gap-4 sm:grid-cols-2">
          {TELAS_DEMO.map((x, i) => (
            <Reveal key={x.nome} delay={(i % 2) * 90}>
              <figure className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors hover:border-gold/40">
                <div className="overflow-hidden">
                  <Foto
                    nome={x.nome}
                    larguras={[800, 1440]}
                    w={1440}
                    h={900}
                    alt={x.alt}
                    sizes="(min-width: 1200px) 560px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="font-display text-lg">{x.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
          <Reveal className="sm:col-span-2">
            <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors hover:border-gold/40">
              <div className="overflow-x-auto">
                <Foto
                  nome="04-cadencia"
                  larguras={[960, 1912]}
                  w={1912}
                  h={496}
                  alt="Cadência do PO2 Pulse em fluxo: início, WhatsApp, espera de um dia útil, condição de resposta, mover no funil, e-mail e tarefa de ligação"
                  sizes="(min-width: 1200px) 1140px, 100vw"
                  className="block w-full min-w-[720px] sm:min-w-0"
                />
              </div>
              <figcaption className="p-5">
                <p className="font-display text-lg">Cadência em múltiplos canais</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  WhatsApp, espera, condição, e-mail e tarefa de ligação no mesmo fluxo. Respondeu, o lead anda no funil.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <p className="mx-auto mt-6 max-w-6xl text-xs text-muted-foreground/70">
          Imagens ilustrativas com dados fictícios.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Planos                                                              */
/* ------------------------------------------------------------------ */

type Plano = {
  id: string;
  nome: string;
  sub: string;
  usuarios: number;
  sem: number;
  com: number;
  ramais: number;
  padraoDiscador: boolean;
  destaque?: boolean;
  inclui: string[];
};

const PLANOS: Plano[] = [
  {
    id: "respiro",
    nome: "Respiro",
    sub: "Kanban + WhatsApp",
    usuarios: 3,
    sem: 219,
    com: 606,
    ramais: 3,
    padraoDiscador: false,
    inclui: [
      "Funil em Kanban",
      "WhatsApp dentro do CRM",
      "Atividades e chat da equipe",
      "Playbooks e dashboard",
      "Importação de leads",
    ],
  },
  {
    id: "oxigenio",
    nome: "Oxigênio",
    sub: "WhatsApp + IA + Discador",
    usuarios: 3,
    sem: 559,
    com: 929,
    ramais: 3,
    padraoDiscador: true,
    destaque: true,
    inclui: [
      "Tudo do Respiro",
      "SDR de IA no WhatsApp",
      "150 conversas de IA por mês",
      "Áudios entendidos pela IA",
      "Follow-up automático",
      "Lead qualificado no funil",
    ],
  },
  {
    id: "pulse",
    nome: "Pulse",
    sub: "Completo",
    usuarios: 10,
    sem: 1159,
    com: 1779,
    ramais: 5,
    padraoDiscador: true,
    inclui: [
      "Tudo do Oxigênio",
      "300 conversas de IA por mês",
      "Cadências de e-mail e WhatsApp",
      "Prospecção de empresas e contatos",
      "Propostas e contratos",
      "Cérebro, Painel do dono e Sala de guerra",
    ],
  },
];

const brl = (v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

function Interruptor({ ligado, onChange, id }: { ligado: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer select-none items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="flex items-center gap-2 text-sm">
        <Phone className="size-4 text-gold" strokeWidth={1.75} /> Com discador
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={ligado}
        onClick={() => onChange(!ligado)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${ligado ? "bg-gold" : "bg-white/15"}`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-[#101314] shadow transition-transform duration-300 ${
            ligado ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function CardPlano({ p, i }: { p: Plano; i: number }) {
  const [discador, setDiscador] = useState(p.padraoDiscador);
  const preco = discador ? p.com : p.sem;
  const itens = discador ? [...p.inclui, `Discador com ${p.ramais} ramais`] : p.inclui;
  const msg = `Olá! Vim pela página do Pulse e quero o plano ${p.nome} ${discador ? `com discador (${p.ramais} ramais)` : "sem discador"}.`;

  return (
    <Reveal delay={i * 90} className="h-full">
      <article
        className={`relative flex h-full flex-col rounded-3xl border p-7 md:p-8 ${
          p.destaque
            ? "border-gold/60 bg-gradient-to-b from-gold/[0.08] via-[#0B0D0E] to-[#0B0D0E] shadow-[0_0_80px_-30px_rgba(216,255,54,0.45)]"
            : "border-white/10 bg-[#0B0D0E]"
        }`}
      >
        {p.destaque && (
          <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-foreground">
            Recomendado
          </span>
        )}
        <p className={`font-display text-3xl ${p.destaque ? GRADIENTE : ""}`}>{p.nome}</p>
        <p className="mt-1 text-sm text-muted-foreground">{p.sub}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.usuarios} usuários</p>

        <div className="mt-7 flex items-end gap-2">
          <span className="pb-1.5 text-sm text-muted-foreground">R$</span>
          <span key={preco} className="font-display text-5xl leading-none tabular-nums animate-in fade-in duration-300 md:text-6xl">
            {brl(preco)}
          </span>
          <span className="pb-1.5 text-sm text-muted-foreground">/mês</span>
        </div>

        <div className="mt-6">
          <Interruptor id={`discador-${p.id}`} ligado={discador} onChange={setDiscador} />
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Inclui</p>
        <ul className="mt-3 flex-1 space-y-2.5">
          {itens.map((t) => {
            const ehDiscador = t.startsWith("Discador com");
            return (
              <li
                key={t}
                className={`flex items-start gap-3 text-sm ${ehDiscador ? "font-medium text-gold animate-in fade-in slide-in-from-left-1 duration-300" : "text-foreground/90"}`}
              >
                <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${ehDiscador ? "bg-gold text-gold-foreground" : "bg-gold/15 text-gold"}`}>
                  <Check className="size-3" />
                </span>
                {t}
              </li>
            );
          })}
        </ul>

        <a
          href={zap(msg)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("pulse_plano_cta", { plano: p.id, discador })}
          className={`mt-8 inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-medium transition-all ${
            p.destaque
              ? "bg-gold text-gold-foreground hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
              : "border border-white/20 text-foreground hover:border-gold hover:text-gold"
          }`}
        >
          Quero o {p.nome} <ArrowRight className="size-4" />
        </a>
      </article>
    </Reveal>
  );
}

const ADICIONAIS = [
  { icon: Phone, t: "Ramal extra do discador", v: "R$ 129", u: "por mês" },
  { icon: MessageSquareText, t: "Conversa extra da IA", v: "R$ 2,29", u: "por conversa" },
  { icon: UserPlus, t: "Usuário extra", v: "R$ 59 a R$ 99", u: "por usuário" },
];

const CONSULTAS = [
  { q: 50, v: 229, cada: 4.58 },
  { q: 100, v: 439, cada: 4.39 },
];

export function PulsePlanos() {
  return (
    <section id="planos" className="relative overflow-hidden border-t border-white/5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-40 h-[480px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[#155E75]/20 blur-[140px]"
      />
      <div className="relative mx-auto max-w-[1450px] px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Planos</p>
          <h2 className="mt-4 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
            Escolha o <span className={GRADIENTE}>fôlego</span> da sua operação
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">Preço mensal. Ligue o discador no plano que precisar.</p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-5 lg:grid-cols-3">
          {PLANOS.map((p, i) => (
            <CardPlano key={p.id} p={p} i={i} />
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-[#0B0D0E] p-7 md:p-8">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                <Plus className="size-4" /> Adicionais
              </p>
              <ul className="mt-6 divide-y divide-white/10">
                {ADICIONAIS.map(({ icon: Icon, t, v, u }) => (
                  <li key={t} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="flex items-center gap-3 text-sm md:text-base">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 text-[#22C5E6]">
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>
                      {t}
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-right">
                      <span className="block font-display text-lg tabular-nums">{v}</span>
                      <span className="block text-xs text-muted-foreground">{u}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#155E75]/35 to-[#0B0D0E] p-7 md:p-8">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                <Database className="size-4" /> Consultas de dados · compra à parte
              </p>
              <p className="mt-4 max-w-md text-pretty text-muted-foreground">
                Encontre e complete os dados dos seus leads direto no CRM. Compre só o volume que for usar.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {CONSULTAS.map((c) => (
                  <a
                    key={c.q}
                    href={zap(`Olá! Vim pela página do Pulse e quero o pacote de ${c.q} consultas de dados.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("pulse_consultas_cta", { pacote: c.q })}
                    className="group rounded-2xl border border-white/10 bg-[#05090B]/60 p-5 transition-colors hover:border-gold/50"
                  >
                    <p className="text-sm text-muted-foreground">{c.q} consultas</p>
                    <p className="mt-1 font-display text-3xl tabular-nums">R$ {brl(c.v)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">R$ {brl(c.cada)} cada</p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm text-gold">
                      Quero este pacote <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
