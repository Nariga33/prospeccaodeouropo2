import { Jargon } from "@/components/po2/Jargon";

const STAGES = [
  {
    label: "Visitante",
    width: 100,
    bg: "#15171b",
    border: "rgba(197,160,89,0.15)",
    text: "#9a9a9a",
  },
  { label: "Lead", width: 82, bg: "#241f18", border: "rgba(197,160,89,0.25)", text: "#c9c4ba" },
  {
    label: "MQL / PQL",
    width: 64,
    bg: "#3a2e18",
    border: "rgba(197,160,89,0.4)",
    text: "#e6cf9e",
    split: true,
  },
  { label: "SAL", width: 46, bg: "#5c451c", border: "rgba(197,160,89,0.55)", text: "#f0dcae" },
  { label: "SQL", width: 30, bg: "#8a651f", border: "rgba(197,160,89,0.7)", text: "#fff2d6" },
  { label: "Sale", width: 16, bg: "#C5A059", border: "#C5A059", text: "#1a1208" },
];

export function SdrFunnel() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-1.5">
      {STAGES.map((s) => (
        <div
          key={s.label}
          className="relative flex h-16 items-center justify-center text-center transition-transform hover:scale-[1.02]"
          style={{
            width: `${s.width}%`,
            background: s.bg,
            border: `1px solid ${s.border}`,
            clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)",
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
