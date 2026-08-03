import { useState } from "react";
import { Jargon } from "@/components/po2/Jargon";
import { MethodologyDialog, type Methodology } from "@/components/po2/MethodologyDialog";
import { EvolutionModel } from "@/components/po2/EvolutionModel";

const goldRule = "h-px w-12 bg-gold/60";

export function Methodologies() {
  const ms: Methodology[] = [
    {
      t: "CHAMP",
      d: "Qualificação com foco em dor e prioridade antes de orçamento.",
      acronym: "Challenges · Authority · Money · Prioritization",
      summary:
        "Framework de qualificação que inverte a ordem do BANT: começa pela dor real do cliente, depois valida quem decide, orçamento e prioridade. Foco em entender o problema antes de falar de preço.",
      when: "Use quando o lead ainda não tem clareza do problema ou quando o seu produto resolve uma dor pouco óbvia. Ideal nas primeiras conversas de descoberta.",
      example:
        "Hoje, qual desses três pontos mais impacta o resultado do seu time: volume de leads, qualificação ou conversão final?",
    },
    {
      t: "Challenger Sale",
      d: "Provocar uma nova forma de enxergar o problema do cliente.",
      acronym: "Teach · Tailor · Take control",
      summary:
        "Vendedor desafia a visão atual do cliente trazendo um insight que ele ainda não enxergou. Não atende pedido — provoca uma nova leitura do problema baseada em dados de mercado.",
      when: "Use em mercados maduros, com decisores experientes que já receberam dezenas de abordagens iguais. Quando você precisa se diferenciar pela visão, não pelo produto.",
      example:
        "A maioria dos times comerciais que olhamos achava que o problema era volume. Em 80% dos casos, era ICP errado. Posso te mostrar como identificar isso na sua operação?",
    },
    {
      t: "LAER",
      d: "Ouvir, reconhecer, explorar e responder objeções com método.",
      acronym: "Listen · Acknowledge · Explore · Respond",
      summary:
        "Método de tratamento de objeções em quatro passos. Em vez de rebater na hora, o vendedor escuta até o fim, valida a preocupação, explora a raiz e só então responde com argumento direcionado.",
      when: "Use sempre que surgir objeção real (preço, timing, autoridade). Evita o reflexo de defender o produto e mantém a conversa consultiva.",
      example:
        "Entendi sua preocupação com o investimento. Me ajuda a entender — é o valor em si ou o momento da empresa? (explora antes de responder)",
    },
    {
      t: "SPIN",
      d: "Perguntas que revelam situação, problema, impacto e necessidade.",
      acronym: "Situation · Problem · Implication · Need-payoff",
      summary:
        "Sequência de perguntas criada por Neil Rackham que constrói urgência. Começa mapeando o cenário, identifica problema, amplia o impacto e leva o cliente a verbalizar o ganho da solução.",
      when: "Use em vendas complexas e consultivas, com ciclo médio/longo. Especialmente forte quando o cliente subestima o custo de não resolver.",
      example:
        "Se esse gargalo continuar pelos próximos seis meses, qual o impacto direto no faturamento do trimestre?",
    },
    {
      t: "Gap Selling",
      d: "Conectar cenário atual, desejado e custo do gap.",
      acronym: "Estado atual · Estado desejado · Custo do gap",
      summary:
        "Metodologia de Keenan que estrutura a venda em torno do gap entre onde o cliente está hoje e onde ele quer chegar. O preço vira consequência do custo de não fechar o gap.",
      when: "Use quando o cliente reconhece o problema mas não quantifica. Ajuda a transformar 'seria bom resolver' em 'preciso resolver agora'.",
      example:
        "Você está hoje em X reuniões/mês e quer chegar em Y. Esse gap representa quanto de receita não realizada por mês?",
    },
    {
      t: "BANT",
      d: "Validar orçamento, autoridade e timing em leads mais maduros.",
      acronym: "Budget · Authority · Need · Timing",
      summary:
        "Framework clássico criado pela IBM. Qualifica pelo orçamento disponível, autoridade do contato, necessidade clara e prazo de decisão. Eficiente para limpar pipeline rápido.",
      when: "Use em leads já maduros, em estágios mais avançados do funil, ou para priorizar fila do closer. Não substitui descoberta inicial — complementa.",
      example:
        "Para encaixar com nossos planos, faz sentido para mim entender: orçamento previsto, quem mais decide com você e janela de implantação. Podemos passar por esses três?",
    },
  ];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Methodology | null>(null);
  return (
    <section id="metodologias" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Metodologias aplicadas
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Abordagem consultiva,{" "}
            <span className="font-display font-normal italic text-gold">
              não discurso decorado.
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A PO2 aplica frameworks consagrados conforme o tipo de <Jargon term="ICP">lead</Jargon>{" "}
            e o estágio comercial — leitura de cenário, não roteiro robótico. Clique em cada
            metodologia para entender o que é e quando aplicar.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {ms.map((m) => (
            <button
              key={m.t}
              type="button"
              onClick={() => {
                setActive(m);
                setOpen(true);
              }}
              className="group bg-card/70 p-7 text-left transition-colors hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            >
              <div className="font-display text-3xl text-gold">{m.t}</div>
              <p className="mt-3 text-sm text-muted-foreground">{m.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 transition-colors group-hover:text-gold">
                Ver resumo →
              </span>
            </button>
          ))}
        </div>
        <MethodologyDialog item={active} open={open} onOpenChange={setOpen} />
        <EvolutionModel />
      </div>
    </section>
  );
}
