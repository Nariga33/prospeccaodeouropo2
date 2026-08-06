import { ShieldCheck, Gift, BarChart3 } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const REASONS = [
  {
    icon: Gift,
    t: "Diagnóstico 100% gratuito",
    d: "Sem compromisso, sem letra miúda. Você só decide depois de entender onde a operação está travando.",
  },
  {
    icon: ShieldCheck,
    t: "Mentoria com garantia de 7 dias",
    d: "Se não for pra você, devolvemos o valor investido — sem burocracia.",
  },
  {
    icon: BarChart3,
    t: "Método validado, não teoria",
    d: "+R$2MM gerados, +200k ligações, +10k empresas prospectadas — resultado real, não promessa de slide.",
  },
];

export function RiskReduction() {
  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Sem risco <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Decidir não devia dar{" "}
            <span className="font-display font-normal italic text-gold">medo.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {REASONS.map((r) => (
            <div
              key={r.t}
              className="rounded-2xl border border-gold/20 bg-card/70 p-7 text-center transition-colors hover:border-gold/40"
            >
              <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <r.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-bold text-foreground">{r.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
