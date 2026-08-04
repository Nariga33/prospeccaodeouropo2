import { useEffect, useRef, useState } from "react";
import { Smile, IdCard, MessageCircleQuestion, Link2, Target } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const STEPS = [
  {
    icon: Smile,
    t: "Chame a atenção",
    d: "Use o nome da pessoa — direto, sem 'como vai você hoje'.",
  },
  { icon: IdCard, t: "Identifique-se", d: "Seu nome e de onde você fala, sem enrolar." },
  { icon: MessageCircleQuestion, t: "Diga o motivo", d: "O porquê da ligação, em uma frase." },
  {
    icon: Link2,
    t: "Conecte com um 'porquê'",
    d: "Uma razão relevante pro momento específico do lead.",
  },
  {
    icon: Target,
    t: "Peça o que você quer",
    d: "E pare de falar — deixa o silêncio trabalhar por você.",
  },
];

const STEP_DELAY_MS = 300;

export function BdrColdCallFramework() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || started.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            STEPS.forEach((_, i) => {
              setTimeout(() => setVisibleCount((v) => Math.max(v, i + 1)), i * STEP_DELAY_MS);
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> A ligação perfeita <span className={goldRule} />
          </div>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            5 passos que decidem{" "}
            <span className="font-display font-normal italic text-gold">
              os primeiros 10 segundos.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Framework de cold call adaptado do livro{" "}
            <em className="not-italic text-gold">Fanatical Prospecting</em>, de Jeb Blount — a PO2
            treina esse roteiro com todo BDR.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent md:block" />
          <div className="grid gap-6 md:grid-cols-5">
            {STEPS.map((s, i) => {
              const visible = i < visibleCount;
              return (
                <div
                  key={s.t}
                  className="flex flex-col items-center text-center transition-all duration-500 ease-out"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
                  }}
                >
                  <div className="relative z-10 flex size-16 items-center justify-center rounded-full border-2 border-gold/50 bg-background text-gold shadow-[0_0_30px_rgba(197,160,89,0.2)]">
                    <s.icon className="size-6" />
                    <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-gold-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-foreground">{s.t}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
