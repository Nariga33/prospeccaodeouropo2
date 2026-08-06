import { Check, X } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const FIT = [
  "Já vende, mas depende de esforço individual pra gerar oportunidade",
  "Tem (ou quer ter) pelo menos 1 pessoa dedicada à prospecção ou vendas",
  "Quer processo replicável — não depender de sorte comercial",
  "Aceita ser guiado por diagnóstico antes de qualquer proposta fechada",
];

const NOT_FIT = [
  "Busca resultado sem mudar nada do processo atual",
  "Não tem verba mínima pra estruturar ao menos 1 posição comercial",
  "Quer solução mágica, sem acompanhamento nem disciplina de execução",
  "Já tem uma operação madura rodando com método documentado e funcionando",
];

export function WhoItsFor() {
  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Antes de continuar <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            A PO2 não é pra{" "}
            <span className="font-display font-normal italic text-gold">todo mundo.</span>
          </h2>
          <p className="mx-auto mt-5 text-muted-foreground">
            Preferimos ser diretos agora do que decepcionar depois — confere se faz sentido pra sua
            realidade.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-gold/30 bg-gold/5 p-8">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-gold">
              É pra você se
            </h3>
            <ul className="space-y-4">
              {FIT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-card/40 p-8">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Não é pra você se
            </h3>
            <ul className="space-y-4">
              {NOT_FIT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-red-400/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
