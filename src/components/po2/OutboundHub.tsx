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
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Phone, label: "Cold Call" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "E-mail" },
  { icon: Search, label: "Pesquisa de lead" },
  { icon: Users, label: "CRM" },
  { icon: CalendarClock, label: "Cadência" },
  { icon: BarChart3, label: "Métricas" },
];

export function OutboundHub() {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const rOrbit = 175;
  const rNode = 42;

  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
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

          <div className="relative mx-auto flex items-center justify-center">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="h-[420px] w-[420px] max-w-full overflow-visible"
            >
              <defs>
                <radialGradient id="po2HubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(197,160,89,0.16)" />
                  <stop offset="100%" stopColor="rgba(197,160,89,0)" />
                </radialGradient>
              </defs>
              <circle cx={cx} cy={cy} r={rOrbit + 40} fill="url(#po2HubGlow)" />
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
                  />
                );
              })}

              <circle cx={cx} cy={cy} r={64} fill="#0F1115" stroke="#C5A059" strokeWidth="2" />
              <foreignObject x={cx - 40} y={cy - 40} width={80} height={80}>
                <div className="flex h-full w-full items-center justify-center">
                  <img src={logo} alt="PO2" className="h-12 w-auto object-contain" />
                </div>
              </foreignObject>

              {CHANNELS.map((c, i) => {
                const angle = (i / CHANNELS.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(angle) * rOrbit;
                const y = cy + Math.sin(angle) * rOrbit;
                const Icon = c.icon;
                return (
                  <g key={c.label}>
                    <circle
                      cx={x}
                      cy={y}
                      r={rNode / 2}
                      fill="#15171b"
                      stroke="rgba(197,160,89,0.5)"
                      strokeWidth="1.5"
                    />
                    <foreignObject x={x - 11} y={y - 11} width={22} height={22}>
                      <div className="flex h-full w-full items-center justify-center">
                        <Icon size={18} color="#C5A059" />
                      </div>
                    </foreignObject>
                    <text
                      x={x}
                      y={y + rNode / 2 + 16}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill="rgba(230,225,215,0.75)"
                      className="pointer-events-none select-none"
                    >
                      {c.label}
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
