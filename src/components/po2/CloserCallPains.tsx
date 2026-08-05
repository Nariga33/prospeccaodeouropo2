import { AlertTriangle } from "lucide-react";

const CLOSER_PAINS = [
  {
    t: "Closer que apresenta antes de qualificar",
    d: "Já solta a proposta na primeira call, sem entender o custo real da inação pro cliente. Resultado: objeção de preço em praticamente toda negociação, porque nunca existiu ancoragem de valor.",
  },
  {
    t: "Sem checkpoint de intenção antes da oferta",
    d: "A call vai direto pra proposta sem confirmar se as dúvidas técnicas já foram resolvidas. O 'vou pensar' no final não é objeção real — é sintoma de call mal conduzida.",
  },
  {
    t: "Follow-up genérico em proposta parada",
    d: "'Oi, tudo bem? Ficou alguma dúvida?' não reabre negociação. Sem cadência com gatilho de urgência real, a proposta esfria e o lead esquece por que a decisão era urgente.",
  },
];

export function CloserCallPains() {
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-300/80">
            <AlertTriangle className="size-3" /> O que quebra a call
          </div>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
            Não é falta de carisma —{" "}
            <span className="font-display font-normal italic text-gold">é falta de estrutura.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CLOSER_PAINS.map((p) => (
            <div
              key={p.t}
              className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 transition-colors hover:border-red-400/35"
            >
              <h3 className="font-bold text-foreground/90">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
