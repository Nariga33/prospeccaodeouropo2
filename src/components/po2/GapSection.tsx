import { AlertCircle, ArrowRight, Sparkles } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

interface GapSectionProps {
  kicker: string;
  title: string;
  titleEm: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
}

export function GapSection({
  kicker,
  title,
  titleEm,
  problemTitle,
  problemText,
  solutionTitle,
  solutionText,
}: GapSectionProps) {
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> {kicker} <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            {title} <span className="font-display font-normal italic text-gold">{titleEm}</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <div className="flex flex-col rounded-3xl border border-red-400/25 bg-red-400/5 p-8">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-red-300">
              <AlertCircle className="size-4" /> Estado atual
            </div>
            <h3 className="font-display text-2xl text-foreground">{problemTitle}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {problemText}
            </p>
          </div>

          <div className="flex items-center justify-center py-2 lg:py-0">
            <span className="flex size-11 items-center justify-center rounded-full border border-gold/40 bg-background text-gold">
              <ArrowRight className="size-5 rotate-90 lg:rotate-0" />
            </span>
          </div>

          <div className="flex flex-col rounded-3xl border border-gold/40 bg-gradient-to-b from-gold/10 to-card/80 p-8">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              <Sparkles className="size-4" /> Estado futuro com PO2
            </div>
            <h3 className="font-display text-2xl text-foreground">{solutionTitle}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">{solutionText}</p>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-lg text-center text-xs text-muted-foreground">
          Lógica aplicada com base no <em className="not-italic text-gold/80">Gap Selling</em> e{" "}
          <em className="not-italic text-gold/80">Gap Prospecting</em>, de Keenan — vender o
          problema, não o produto.
        </p>
      </div>
    </section>
  );
}
