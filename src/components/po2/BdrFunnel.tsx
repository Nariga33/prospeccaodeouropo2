import { useEffect, useRef, useState } from "react";

const STAGES = [
  {
    label: "Pesquisa",
    width: 100,
    bg: "#15171b",
    border: "rgba(197,160,89,0.15)",
    text: "#9a9a9a",
  },
  {
    label: "Abordagem Personalizada",
    width: 78,
    bg: "#3a2e18",
    border: "rgba(197,160,89,0.4)",
    text: "#e6cf9e",
  },
  {
    label: "Preparação p/ Fechar Agenda",
    width: 52,
    bg: "#6b4f24",
    border: "rgba(197,160,89,0.6)",
    text: "#f5e2b8",
  },
  { label: "Dar Sequência", width: 28, bg: "#C5A059", border: "#C5A059", text: "#1a1208" },
];

const STEP_DELAY_MS = 260;

export function BdrFunnel() {
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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="mx-auto flex w-full max-w-xl flex-col items-center gap-1.5">
      {STAGES.map((s, i) => (
        <div
          key={s.label}
          className="relative flex h-16 items-center justify-center px-4 text-center transition-all duration-500 ease-out hover:scale-[1.02]"
          style={{
            width: `${s.width}%`,
            background: s.bg,
            border: `1px solid ${s.border}`,
            clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)",
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? "translateY(0)" : "translateY(-14px)",
          }}
        >
          <span className="text-sm font-bold leading-tight" style={{ color: s.text }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
