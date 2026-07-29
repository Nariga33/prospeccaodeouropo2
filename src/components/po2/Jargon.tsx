import { type ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const JARGON_DEFINITIONS: Record<string, { full?: string; desc: string }> = {
  ICP: {
    full: "Ideal Customer Profile",
    desc: "Perfil de cliente ideal — o tipo de empresa que mais compra, melhor paga e mais retém.",
  },
  BDR: {
    full: "Business Development Representative",
    desc: "Profissional de prospecção ativa (outbound). Gera reunião com lead frio.",
  },
  MRR: {
    full: "Monthly Recurring Revenue",
    desc: "Receita recorrente mensal — quanto entra todo mês de forma previsível.",
  },
  DIAL: {
    desc: "Valor anual de uma proposta em discussão ativa com o cliente.",
  },
  CAC: {
    full: "Custo de Aquisição de Cliente",
    desc: "Quanto você gasta, em média, para conquistar um novo cliente.",
  },
  CHAMP: {
    desc: "Challenges, Authority, Money, Prioritization — qualificação focada na dor antes do orçamento.",
  },
  SPIN: {
    desc: "Situation, Problem, Implication, Need-payoff — perguntas que constroem urgência.",
  },
  BANT: {
    desc: "Budget, Authority, Need, Timing — qualificação clássica para leads maduros.",
  },
  LAER: {
    desc: "Listen, Acknowledge, Explore, Respond — tratamento de objeções com método.",
  },
  "Gap Selling": {
    desc: "Vender o gap entre o estado atual e o desejado, quantificando o custo de não agir.",
  },
  "Challenger Sale": {
    desc: "Provocar uma nova visão do problema do cliente, em vez de apenas atender pedido.",
  },
  Outbound: {
    desc: "Prospecção ativa — você procura o cliente, não espera ele chegar.",
  },
  Pipeline: {
    desc: "Funil de oportunidades comerciais em andamento.",
  },
  Cadência: {
    desc: "Sequência planejada de toques (e-mail, ligação, LinkedIn, WhatsApp) ao longo do tempo.",
  },
  Pitch: {
    desc: "Discurso de apresentação inicial — os primeiros segundos da abordagem.",
  },
};

interface JargonProps {
  term: keyof typeof JARGON_DEFINITIONS | string;
  children?: ReactNode;
}

export function Jargon({ term, children }: JargonProps) {
  const def = JARGON_DEFINITIONS[term];
  if (!def) return <>{children ?? term}</>;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group cursor-help underline decoration-gold/40 decoration-dotted underline-offset-4 transition-colors hover:decoration-gold"
        >
          {children ?? term}
          <span className="ml-0.5 align-super text-[0.6em] font-bold text-gold">*</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="max-w-xs border-gold/30 bg-card text-foreground"
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
          {term}
          {def.full ? ` · ${def.full}` : ""}
        </div>
        <p className="mt-2 text-sm text-foreground/90">{def.desc}</p>
      </PopoverContent>
    </Popover>
  );
}
