export function Arcs({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 900 900"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="po2-arc-a" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#D8FF36" />
          <stop offset="0.55" stopColor="#D8FF36" stopOpacity="0.55" />
          <stop offset="1" stopColor="#155E75" />
        </linearGradient>
        <radialGradient id="po2-glow" cx="0.7" cy="0.35" r="0.6">
          <stop offset="0" stopColor="#155E75" stopOpacity="0.55" />
          <stop offset="1" stopColor="#155E75" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="600" cy="360" r="520" fill="url(#po2-glow)" />
      <circle cx="560" cy="470" r="440" stroke="url(#po2-arc-a)" strokeWidth="1.5" />
      <circle cx="760" cy="780" r="330" stroke="url(#po2-arc-a)" strokeWidth="1.5" />
    </svg>
  );
}
