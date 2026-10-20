export function Arcs({ className = "" }: { className?: string }) {
  return (
    <>
      <style>{`
        @keyframes po2-arc-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-22px,16px) scale(1.035); } }
        @keyframes po2-arc-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(26px,-20px) scale(0.96); } }
        @keyframes po2-glow { 0%,100% { opacity: .75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }
        .po2-arc { transform-box: fill-box; transform-origin: center; will-change: transform; }
        .po2-arc-1 { animation: po2-arc-a 16s ease-in-out infinite; }
        .po2-arc-2 { animation: po2-arc-b 20s ease-in-out infinite; }
        .po2-arc-glow { animation: po2-glow 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .po2-arc { animation: none !important; } }
      `}</style>
    <svg
      aria-hidden="true"
      viewBox="0 0 1672 941"
      fill="none"
      className={className}
      preserveAspectRatio="xMaxYMid slice"
    >
      <defs>
        <linearGradient id="po2-arc-a" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#D8FF36" />
          <stop offset="0.5" stopColor="#D8FF36" stopOpacity="0.7" />
          <stop offset="1" stopColor="#22C5E6" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="po2-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#155E75" stopOpacity="0.45" />
          <stop offset="1" stopColor="#155E75" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="po2-arc po2-arc-glow" cx="1560" cy="420" r="560" fill="url(#po2-glow)" />
      <circle className="po2-arc po2-arc-1" cx="1370" cy="590" r="430" stroke="url(#po2-arc-a)" strokeWidth="2" />
      <circle className="po2-arc po2-arc-2" cx="1570" cy="885" r="392" stroke="url(#po2-arc-a)" strokeWidth="2" />
    </svg>
    </>
  );
}
