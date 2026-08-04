import { useEffect, useRef, useState } from "react";
import logo from "@/assets/po2-logo.png";
import {
  Search,
  FileText,
  Mail,
  Megaphone,
  MessageCircle,
  Share2,
  Gauge,
  Users,
} from "lucide-react";

const CHANNELS = [
  {
    icon: Search,
    label: "SEO / Busca",
    day: "Etapa 1",
    desc: "Lead encontra a empresa buscando a solução — sem interrupção, por interesse próprio.",
  },
  {
    icon: FileText,
    label: "Conteúdo",
    day: "Etapa 2",
    desc: "Material educa o lead e gera confiança antes de qualquer contato humano.",
  },
  {
    icon: Megaphone,
    label: "Anúncios",
    day: "Etapa 3",
    desc: "Tráfego pago acelera volume pro topo do funil, dentro do ICP definido.",
  },
  {
    icon: Gauge,
    label: "Lead Scoring",
    day: "Etapa 4",
    desc: "Pontuação por fit e intenção — decide quem o SDR aborda primeiro.",
  },
  {
    icon: MessageCircle,
    label: "Chat do Site",
    day: "Etapa 5",
    desc: "Resposta em minutos quando o lead demonstra interesse ao vivo.",
  },
  {
    icon: Mail,
    label: "Nutrição",
    day: "Etapa 6",
    desc: "Cadência de e-mail pra quem ainda não está pronto pra falar com vendas.",
  },
  {
    icon: Users,
    label: "CRM",
    day: "Etapa 7",
    desc: "Handoff estruturado pro SDR, sem perder contexto do que o lead já viu.",
  },
  {
    icon: Share2,
    label: "Redes Sociais",
    day: "Etapa 8",
    desc: "Social selling reforça autoridade enquanto o lead avalia a decisão.",
  },
];

const STEP_DELAY_MS = 220;

export function InboundHub() {
  const size = 700;
  const cx = size / 2;
  const cy = size / 2;
  const rOrbit = 205;
  const rNode = 78;
  const rCenter = 150;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [active, setActive] = useState(0);
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

  const current = CHANNELS[active];
  const CurrentIcon = current.icon;

  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className="h-px w-12 bg-gold/60" /> Tudo sobre metodologia inbound
            <span className="h-px w-12 bg-gold/60" />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Um método,{" "}
            <span className="font-display font-normal italic text-gold">
              todo o funil de entrada.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            A PO2 não trabalha só a qualificação — orquestra busca, conteúdo, anúncio e nutrição
            numa jornada única, com lead scoring guiando quem o SDR aborda primeiro. Clique em cada
            etapa pra entender o papel dela.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="relative mx-auto mt-16 flex max-w-[720px] items-center justify-center"
        >
          <svg viewBox={`0 0 ${size} ${size}`} className="aspect-square w-full overflow-visible">
            <defs>
              <radialGradient id="po2InboundGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(197,160,89,0.22)" />
                <stop offset="100%" stopColor="rgba(197,160,89,0)" />
              </radialGradient>
              <filter id="po2InboundBlur" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
            </defs>
            <circle cx={cx} cy={cy} r={rOrbit + rNode + 30} fill="url(#po2InboundGlow)" />

            {CHANNELS.map((c, i) => {
              const angle = (i / CHANNELS.length) * Math.PI * 2 - Math.PI / 2;
              const x = cx + Math.cos(angle) * rOrbit;
              const y = cy + Math.sin(angle) * rOrbit;
              const visible = i < visibleCount;
              return (
                <circle
                  key={`glow-${c.label}`}
                  cx={x}
                  cy={y}
                  r={rNode / 2 + 14}
                  fill={i === active ? "rgba(197,160,89,0.35)" : "rgba(197,160,89,0.14)"}
                  filter="url(#po2InboundBlur)"
                  style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease-out" }}
                />
              );
            })}

            <circle cx={cx} cy={cy} r={rCenter} fill="#0F1115" stroke="#C5A059" strokeWidth="2.5" />
            <foreignObject x={cx - 78} y={cy - 78} width={156} height={156}>
              <div className="flex h-full w-full items-center justify-center">
                <img src={logo} alt="PO2" className="h-20 w-auto object-contain" />
              </div>
            </foreignObject>

            {CHANNELS.map((c, i) => {
              const angle = (i / CHANNELS.length) * Math.PI * 2 - Math.PI / 2;
              const x = cx + Math.cos(angle) * rOrbit;
              const y = cy + Math.sin(angle) * rOrbit;
              const Icon = c.icon;
              const visible = i < visibleCount;
              const isActive = i === active;
              return (
                <g
                  key={c.label}
                  className="cursor-pointer"
                  onClick={() => setActive(i)}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1)" : "scale(0.4)",
                    transformOrigin: `${x}px ${y}px`,
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                  }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={rNode / 2}
                    fill={isActive ? "#1a1208" : "#15171b"}
                    stroke={isActive ? "#C5A059" : "rgba(197,160,89,0.5)"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  <foreignObject x={x - 20} y={y - 20} width={40} height={40}>
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon size={isActive ? 24 : 20} color="#C5A059" />
                    </div>
                  </foreignObject>
                  <text
                    x={x}
                    y={y + rNode / 2 + 20}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="600"
                    fill="rgba(230,225,215,0.85)"
                    className="pointer-events-none select-none"
                  >
                    {c.label}
                  </text>
                  <text
                    x={x}
                    y={y + rNode / 2 + 35}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    letterSpacing="0.15em"
                    fill={isActive ? "#C5A059" : "rgba(197,160,89,0.6)"}
                    className="pointer-events-none select-none"
                  >
                    {c.day.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mx-auto mt-8 flex max-w-md items-start gap-4 rounded-2xl border border-gold/30 bg-card/70 p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
            <CurrentIcon className="size-5" />
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              {current.day} · {current.label}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{current.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
