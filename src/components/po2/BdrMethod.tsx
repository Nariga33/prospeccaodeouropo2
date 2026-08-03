import { useState } from "react";
import { Jargon } from "@/components/po2/Jargon";
import { StepInsightDialog } from "@/components/po2/StepInsightDialog";
import {
  Target,
  Search,
  Layers,
  Headphones,
  ShieldCheck,
  Filter,
  BarChart3,
  Phone,
  MessageSquare,
  Users,
  Sparkles,
} from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const METHOD_PHASES = [
  {
    key: "preparacao",
    label: "Preparação",
    tagline: "Antes do primeiro contato",
    steps: [
      {
        n: "01",
        icon: Target,
        t: "ICP & Listas",
        d: "Definição de empresas-alvo, cargos e critérios de qualificação.",
      },
      {
        n: "02",
        icon: Search,
        t: "Estudo de Lead",
        d: "Pesquisa prévia de empresa, dores e decisores antes do contato.",
      },
    ],
  },
  {
    key: "abordagem",
    label: "Abordagem",
    tagline: "Do primeiro toque à conversa",
    steps: [
      {
        n: "03",
        icon: Layers,
        t: "Cadência Multicanal",
        d: "Sequência progressiva por e-mail, LinkedIn, cold call e WhatsApp.",
      },
      {
        n: "04",
        icon: Headphones,
        t: "Cold Call Consultiva",
        d: "Abordagem com contexto — não script decorado.",
      },
      {
        n: "05",
        icon: ShieldCheck,
        t: "Gestão de Objeções",
        d: "Documentar, entender raiz e ajustar discurso.",
      },
    ],
  },
  {
    key: "conversao",
    label: "Conversão",
    tagline: "Da reunião à melhoria contínua",
    steps: [
      {
        n: "06",
        icon: Filter,
        t: "Qualificação",
        d: "Aplicação de CHAMP, SPIN ou Gap Selling conforme o lead.",
      },
      {
        n: "07",
        icon: BarChart3,
        t: "Métricas & Melhoria",
        d: "Volume, conexão, agendamento e conversão por canal e segmento.",
      },
    ],
  },
];

function CadenceMockup() {
  const touches = [
    {
      day: "Dia 1",
      channel: "E-mail",
      icon: MessageSquare,
      note: "Abertura consultiva, sem pitch de catálogo.",
    },
    { day: "Dia 2", channel: "LinkedIn", icon: Users, note: "Conexão + comentário de contexto." },
    {
      day: "Dia 4",
      channel: "Cold Call",
      icon: Phone,
      note: "Ligação com diagnóstico, não script decorado.",
    },
    {
      day: "Dia 6",
      channel: "WhatsApp",
      icon: Sparkles,
      note: "Follow-up leve, CTA de baixo atrito.",
    },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-background/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
          Cadência multicanal · exemplo
        </span>
        <span className="text-[10px] font-semibold text-muted-foreground">12 toques / 21 dias</span>
      </div>
      <div className="space-y-3">
        {touches.map((t, i) => (
          <div key={t.day} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                <t.icon className="size-3.5" />
              </div>
              {i < touches.length - 1 && <div className="mt-1 h-5 w-px bg-white/10" />}
            </div>
            <div className="flex-1 rounded-lg border border-white/5 bg-card/60 px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">{t.channel}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.day}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BdrMethod() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = METHOD_PHASES[activePhase];

  return (
    <section id="metodo" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> O Método
            </div>
            <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Prospecção de Ouro 2.0 —{" "}
              <span className="font-display font-normal italic text-gold">7 etapas</span> que viram
              receita.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Do diagnóstico comercial à otimização contínua de <Jargon term="Pitch">pitch</Jargon>,{" "}
            <Jargon term="ICP">ICP</Jargon> e <Jargon term="Cadência">cadência</Jargon> — com
            acompanhamento semanal e ajustes baseados em dados reais.
          </p>
        </div>

        {/* Navegador por fase do funil */}
        <div className="mb-8 flex flex-wrap gap-2">
          {METHOD_PHASES.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActivePhase(i)}
              className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
                i === activePhase
                  ? "border-gold bg-gold text-gold-foreground shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-gold/30 hover:text-foreground"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {p.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div key={phase.key} className="animate-fade-in">
            <div className="mb-5 text-sm font-semibold text-muted-foreground">{phase.tagline}</div>
            <div className="grid gap-4 sm:grid-cols-2">
              {phase.steps.map((s) => (
                <StepInsightDialog
                  key={s.n}
                  stepKey={s.n}
                  trigger={
                    <button
                      type="button"
                      aria-label={`Ver insight da etapa ${s.n} — ${s.t}`}
                      className="group relative h-full w-full cursor-pointer rounded-2xl border border-white/10 bg-card/70 p-7 text-left transition-all hover:-translate-y-1 hover:border-gold/40 focus:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <span className="font-display text-3xl text-gold">{s.n}</span>
                        <div className="flex size-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                          <s.icon className="size-5" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold">{s.t}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 transition-colors group-hover:text-gold">
                        Ver insight →
                      </span>
                    </button>
                  }
                />
              ))}
            </div>
          </div>

          <CadenceMockup />
        </div>
      </div>
    </section>
  );
}
