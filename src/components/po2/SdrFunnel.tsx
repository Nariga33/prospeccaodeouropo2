import { useEffect, useRef, useState } from "react";
import { Jargon } from "@/components/po2/Jargon";

const STAGES = [
  {
    label: "Visitante",
    width: 100,
    bg: "#161A1C",
    border: "rgba(216,255,54,0.15)",
    text: "#9a9a9a",
  },
  { label: "Lead", width: 82, bg: "#241f18", border: "rgba(216,255,54,0.25)", text: "#c9c4ba" },
  {
    label: "MQL / PQL",
    width: 64,
    bg: "#155E75",
    border: "rgba(216,255,54,0.4)",
    text: "#D8FF36",
    split: true,
  },
  { label: "SAL", width: 46, bg: "#5c451c", border: "rgba(216,255,54,0.55)", text: "#f0dcae" },
  { label: "SQL", width: 30, bg: "#8a651f", border: "rgba(216,255,54,0.7)", text: "#fff2d6" },
  { label: "Sale", width: 16, bg: "#D8FF36", border: "#D8FF36", text: "#101314" },
];

const STEP_DELAY_MS = 220;

export function SdrFunnel() {
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
          className="relative flex h-16 items-center justify-center text-center transition-all duration-500 ease-out hover:scale-[1.02]"
          style={{
            width: `${s.width}%`,
            background: s.bg,
            border: `1px solid ${s.border}`,
            clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)",
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? "translateY(0)" : "translateY(-14px)",
          }}
        >
          {s.split ? (
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: s.text }}>
              <Jargon term="MQL">MQL</Jargon>
              <span className="opacity-40">/</span>
              <Jargon term="PQL">PQL</Jargon>
            </div>
          ) : (
            <span className="text-sm font-bold" style={{ color: s.text }}>
              {["SAL", "SQL"].includes(s.label) ? (
                <Jargon term={s.label}>{s.label}</Jargon>
              ) : (
                s.label
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
