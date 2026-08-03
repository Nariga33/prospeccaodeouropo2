import { useEffect, useRef, useState } from "react";
import { Users, Filter, FileText, Handshake, Trophy } from "lucide-react";

const STAGES = [
  { label: "Reunião", icon: Users },
  { label: "Qualificação", icon: Filter },
  { label: "Proposta", icon: FileText },
  { label: "Negociação", icon: Handshake },
  { label: "Fechamento", icon: Trophy },
];

const STEP_DELAY_MS = 200;

export function InsideSalesPipeline() {
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
            STAGES.forEach((_, i) => {
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
    <div
      ref={containerRef}
      className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 sm:flex-row sm:gap-2"
    >
      {STAGES.map((s, i) => (
        <div key={s.label} className="flex w-full items-center gap-2 sm:contents">
          <div
            className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-gold/20 bg-card/70 px-4 py-6 text-center transition-all duration-500 ease-out"
            style={{
              opacity: i < visibleCount ? 1 : 0,
              transform: i < visibleCount ? "translateY(0)" : "translateY(14px)",
            }}
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <s.icon className="size-4.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/90">
              {s.label}
            </span>
          </div>
          {i < STAGES.length - 1 && (
            <div
              className="hidden h-px w-6 shrink-0 bg-gold/30 transition-opacity duration-500 sm:block"
              style={{ opacity: i < visibleCount - 0.5 ? 1 : 0 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
