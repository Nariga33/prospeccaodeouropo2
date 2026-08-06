import { Search, Layers, TrendingUp } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const STEPS = [
  {
    n: "01",
    icon: Search,
    when: "Dias 1 a 3",
    t: "Diagnóstico e mapeamento",
    d: "Reunião de descoberta, mapeamento do funil atual e definição inicial do ICP — antes de qualquer proposta.",
  },
  {
    n: "02",
    icon: Layers,
    when: "Semana 1 e 2",
    t: "Estruturação",
    d: "ICP documentado, cadência montada, scripts e critério de qualificação definidos — a base fica pronta.",
  },
  {
    n: "03",
    icon: TrendingUp,
    when: "A partir do mês 1",
    t: "Execução acompanhada",
    d: "Operação rodando de verdade, com ajuste semanal baseado em métrica real — não em achismo.",
  },
];

export function ThePlan() {
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> O plano <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            O que acontece depois que você diz{" "}
            <span className="font-display font-normal italic text-gold">sim.</span>
          </h2>
          <p className="mx-auto mt-5 text-muted-foreground">
            Sem mistério, sem "vamos ver como vai". Um caminho claro do primeiro contato até a
            operação rodando sozinha.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent md:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex size-16 items-center justify-center rounded-full border-2 border-gold/50 bg-background text-gold shadow-[0_0_30px_rgba(197,160,89,0.2)]">
                <s.icon className="size-6" />
              </span>
              <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                {s.when}
              </div>
              <h3 className="mt-2 font-display text-2xl text-foreground">{s.t}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
