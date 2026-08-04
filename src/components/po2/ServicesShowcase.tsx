import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Target, Headset, Handshake, Trophy, GraduationCap, ArrowRight } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const SERVICES = [
  {
    key: "bdr",
    icon: Target,
    tab: "BDR",
    tag: "Outbound",
    title: "Prospecção ativa",
    desc: "ICP, cadência multicanal e cold call consultiva — do primeiro contato ao agendamento, sem depender de indicação.",
    href: "/bdr",
  },
  {
    key: "sdr",
    icon: Headset,
    tab: "SDR",
    tag: "Inbound",
    title: "Qualificação de leads",
    desc: "Lead scoring, SLA de resposta rápida e handoff estruturado — de quem já demonstrou interesse até o closer.",
    href: "/sdr",
  },
  {
    key: "inside-sales",
    icon: Handshake,
    tab: "Inside Sales",
    tag: "Condução",
    title: "Reunião e proposta",
    desc: "A ponte entre qualificação e fechamento — condução da reunião, proposta com prazo e negociação remota.",
    href: "/inside-sales",
  },
  {
    key: "closer",
    icon: Trophy,
    tab: "Closer",
    tag: "Fechamento",
    title: "Negociação final",
    desc: "Objeções finais, margem definida e onboarding padrão — fechar não é sorte, é processo repetível.",
    href: "/closer",
  },
  {
    key: "mentoria",
    icon: GraduationCap,
    tab: "Mentoria",
    tag: "Acompanhamento",
    title: "Operação executada junto",
    desc: "Não é curso gravado — é acompanhamento prático com Matheus Staruck, correção de rota entre sessões.",
    href: "/mentoria",
  },
];

export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  const CurrentIcon = current.icon;

  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          <span className={goldRule} /> Full funnel
        </div>
        <h2 className="max-w-2xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          Operação comercial completa,{" "}
          <span className="font-display font-normal italic text-gold">
            sem contratar e gerenciar time sozinho.
          </span>
        </h2>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Cada função do funil, com seu próprio método — atendemos qualquer etapa isolada ou a
          operação inteira.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
                i === active
                  ? "border-gold bg-gold text-gold-foreground shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-gold/30 hover:text-foreground"
              }`}
            >
              {i === active && <span className="size-1.5 rounded-full bg-gold-foreground" />}
              {s.tab}
            </button>
          ))}
        </div>

        <div
          key={current.key}
          className="animate-fade-in mt-6 overflow-hidden rounded-3xl border border-gold/20 bg-card/70"
        >
          <div className="grid gap-8 p-8 md:grid-cols-[1fr_1.3fr] md:items-center md:p-12">
            <div className="flex flex-col items-start">
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                {current.tag}
              </span>
              <span className="mt-6 flex size-16 items-center justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5 text-gold">
                <CurrentIcon className="size-8" />
              </span>
            </div>
            <div>
              <h3 className="font-display text-3xl text-foreground">{current.title}</h3>
              <p className="mt-3 text-muted-foreground">{current.desc}</p>
              <Link
                to={current.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]"
              >
                Conhecer {current.tab} <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
