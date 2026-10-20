export function Arcs({ className = "" }: { className?: string }) {
  return (
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
      <circle cx="1560" cy="420" r="560" fill="url(#po2-glow)" />
      <circle cx="1370" cy="590" r="430" stroke="url(#po2-arc-a)" strokeWidth="2" />
      <circle cx="1570" cy="885" r="392" stroke="url(#po2-arc-a)" strokeWidth="2" />
    </svg>
  );
}
