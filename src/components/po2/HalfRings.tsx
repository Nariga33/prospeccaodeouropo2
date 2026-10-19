export function HalfRings({ className = "" }: { className?: string }) {
  const ring = (cx: number, cy: number, R: number, r: number) =>
    `M${cx} ${cy - R} A${R} ${R} 0 0 1 ${cx} ${cy + R} L${cx} ${cy + r} A${r} ${r} 0 0 0 ${cx} ${cy - r} Z`;
  return (
    <svg aria-hidden="true" viewBox="0 0 600 700" className={className} fill="none">
      <defs>
        <linearGradient id="po2-ring" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#1F6FE0" />
          <stop offset="0.4" stopColor="#22D3EE" />
          <stop offset="0.72" stopColor="#A6F04A" />
          <stop offset="1" stopColor="#F2F52E" />
        </linearGradient>
      </defs>
      <path d={ring(40, 330, 330, 150)} fill="url(#po2-ring)" />
      <path d={ring(380, 400, 230, 105)} fill="url(#po2-ring)" />
    </svg>
  );
}
