import { useEffect, useRef, useState } from "react";
import logo from "@/assets/po2-logo.png";
import {
  Linkedin,
  Phone,
  Mail,
  MessageCircle,
  Search,
  Users,
  BarChart3,
  CalendarClock,
} from "lucide-react";

const CHANNELS = [
  { icon: Linkedin, label: "LinkedIn", day: "Dia 1" },
  { icon: Phone, label: "Cold Call", day: "Dia 2" },
  { icon: MessageCircle, label: "WhatsApp", day: "Dia 3" },
  { icon: Mail, label: "E-mail", day: "Dia 4" },
  { icon: Search, label: "Pesquisa de lead", day: "Dia 5" },
  { icon: Users, label: "CRM", day: "Dia 6" },
  { icon: CalendarClock, label: "Cadência", day: "Dia 7" },
  { icon: BarChart3, label: "Métricas", day: "Dia 8" },
];

const STEP_DELAY_MS = 260;

export function OutboundHub() {
  const size = 680;
  const cx = size / 2;
  const cy = size / 2;
  const rOrbit = 270;
  const rNode = 58;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || started.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            CHANNELS.forEach((_, i) => {
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
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className="h-px w-12 bg-gold/60" /> Tudo sobre prospecção outbound
            </div>
            <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Um método,{" "}
              <span className="font-display font-normal italic text-gold">todos os canais.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              A PO2 não te entrega uma ferramenta isolada — orquestra LinkedIn, WhatsApp, cold call,
              e-mail e CRM numa cadência única, com métrica em cada etapa. Prospecção ativa de
              verdade não depende de um canal só.
            </p>
          </div>

          <div ref={wrapRef} className="relative mx-auto flex items-center justify-center">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="aspect-square w-full max-w-[680px] overflow-visible"
            >
              <defs>
                <radialGradient id="po2HubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(197,160,89,0.16)" />
                  <stop offset="100%" stopColor="rgba(197,160,89,0)" />
                </radialGradient>
              </defs>
              <circle cx={cx} cy={cy} r={rOrbit + 50} fill="url(#po2HubGlow)" />
              <circle
                cx={cx}
                cy={cy}
                r={rOrbit}
                fill="none"
                stroke="rgba(197,160,89,0.2)"
                strokeWidth="1"
                strokeDasharray="2 8"
              />

              {CHANNELS.map((c, i) => {
                const angle = (i / CHANNELS.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(angle) * rOrbit;
                const y = cy + Math.sin(angle) * rOrbit;
                return (
                  <line
                    key={`line-${c.label}`}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke="rgba(197,160,89,0.2)"
                    strokeWidth="1"
                    style={{
                      opacity: i < visibleCount ? 1 : 0,
                      transition: "opacity 0.5s ease-out",
                    }}
                  />
                );
              })}

              <circle cx={cx} cy={cy} r={98} fill="#0F1115" stroke="#C5A059" strokeWidth="2" />
              <foreignObject x={cx - 58} y={cy - 58} width={116} height={116}>
                <div className="flex h-full w-full items-center justify-center">
                  <img src={logo} alt="PO2" className="h-16 w-auto object-contain" />
                </div>
              </foreignObject>

              {CHANNELS.map((c, i) => {
                const angle = (i / CHANNELS.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(angle) * rOrbit;
                const y = cy + Math.sin(angle) * rOrbit;
                const Icon = c.icon;
                const visible = i < visibleCount;
                return (
                  <g
                    key={c.label}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.5)",
                      transformOrigin: `${x}px ${y}px`,
                      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                    }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={rNode / 2}
                      fill="#15171b"
                      stroke="rgba(197,160,89,0.5)"
                      strokeWidth="1.5"
                    />
                    <foreignObject x={x - 13} y={y - 13} width={26} height={26}>
                      <div className="flex h-full w-full items-center justify-center">
                        <Icon size={21} color="#C5A059" />
                      </div>
                    </foreignObject>
                    <text
                      x={x}
                      y={y + rNode / 2 + 18}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="600"
                      fill="rgba(230,225,215,0.85)"
                      className="pointer-events-none select-none"
                    >
                      {c.label}
                    </text>
                    <text
                      x={x}
                      y={y + rNode / 2 + 32}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="0.15em"
                      fill="rgba(197,160,89,0.65)"
                      className="pointer-events-none select-none"
                    >
                      {c.day.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
