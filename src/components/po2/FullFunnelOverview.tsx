import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { Megaphone, Brain, Headset, Target, Trophy, RotateCcw, ArrowRight } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

interface FNode {
  key: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  x: number;
  y: number;
  r: number;
  href?: string;
  tier: 0 | 1 | 2;
}

const NODES: FNode[] = [
  { key: "marketing", icon: Megaphone, label: "Marketing", x: 195, y: 100, r: 80, tier: 0 },
  {
    key: "inteligencia",
    icon: Brain,
    label: "Inteligência Comercial",
    x: 505,
    y: 100,
    r: 80,
    tier: 0,
  },
  { key: "sdr", icon: Headset, label: "SDR", x: 140, y: 400, r: 80, href: "/sdr", tier: 1 },
  { key: "bdr", icon: Target, label: "BDR", x: 560, y: 400, r: 80, href: "/bdr", tier: 1 },
  {
    key: "closer",
    icon: Trophy,
    label: "Closer",
    x: 350,
    y: 670,
    r: 100,
    href: "/closer",
    tier: 2,
  },
];

const STEP_DELAY_MS = 260;

export function FullFunnelOverview() {
  const size = { w: 700, h: 800 };
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loopVisible, setLoopVisible] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || started.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            NODES.forEach((_, i) => {
              setTimeout(() => setVisibleCount((v) => Math.max(v, i + 1)), i * STEP_DELAY_MS);
            });
            setTimeout(() => setLoopVisible(true), NODES.length * STEP_DELAY_MS + 300);
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
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> O funil inteiro <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Da abordagem ao fechamento —{" "}
            <span className="font-display font-normal italic text-gold">
              e de volta pro marketing.
            </span>
          </h2>
          <p className="mx-auto mt-5 text-muted-foreground">
            A PO2 não entrega um pedaço isolado. Executa a prospecção, qualifica, fecha — e devolve
            pro marketing o que aprendeu no meio do caminho.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div ref={wrapRef} className="relative mx-auto flex justify-center">
            <svg
              viewBox={`0 0 ${size.w} ${size.h}`}
              className="aspect-[700/800] w-full max-w-[680px] overflow-visible"
            >
              <defs>
                <radialGradient id="funnelGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(197,160,89,0.18)" />
                  <stop offset="100%" stopColor="rgba(197,160,89,0)" />
                </radialGradient>
              </defs>
              <circle cx={350} cy={400} r={380} fill="url(#funnelGlow)" />

              {/* Linhas de fluxo tier a tier (centro a centro — os círculos cobrem as pontas) */}
              <line
                x1={195}
                y1={100}
                x2={140}
                y2={400}
                stroke="rgba(197,160,89,0.3)"
                strokeWidth={1.5}
              />
              <line
                x1={505}
                y1={100}
                x2={560}
                y2={400}
                stroke="rgba(197,160,89,0.3)"
                strokeWidth={1.5}
              />
              <line
                x1={140}
                y1={400}
                x2={350}
                y2={670}
                stroke="rgba(197,160,89,0.3)"
                strokeWidth={1.5}
              />
              <line
                x1={560}
                y1={400}
                x2={350}
                y2={670}
                stroke="rgba(197,160,89,0.3)"
                strokeWidth={1.5}
              />

              {/* Loop de feedback: do Closer de volta pro Marketing/Inteligência */}
              <path
                d="M 445 685 C 700 580, 700 210, 500 110"
                fill="none"
                stroke="#C5A059"
                strokeWidth={2.5}
                strokeDasharray="7 9"
                style={{
                  opacity: loopVisible ? 0.85 : 0,
                  transition: "opacity 0.8s ease-out",
                }}
              />
              <polygon
                points="480,92 508,108 483,127"
                fill="#C5A059"
                style={{ opacity: loopVisible ? 0.85 : 0, transition: "opacity 0.8s ease-out" }}
              />
              <text
                x={690}
                y={400}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                letterSpacing="0.12em"
                fill="#C5A059"
                transform="rotate(90 690 400)"
                style={{ opacity: loopVisible ? 1 : 0, transition: "opacity 0.8s ease-out" }}
              >
                FEEDBACK DE MERCADO
              </text>

              {NODES.map((n, i) => {
                const Icon = n.icon;
                const visible = i < visibleCount;
                const fill = n.tier === 2 ? "#C5A059" : "#0F1115";
                const iconColor = n.tier === 2 ? "#1a1208" : "#C5A059";
                const stroke = n.tier === 2 ? "#C5A059" : "rgba(197,160,89,0.55)";
                const content = (
                  <g
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.5)",
                      transformOrigin: `${n.x}px ${n.y}px`,
                      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                      cursor: n.href ? "pointer" : "default",
                    }}
                  >
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={n.tier === 2 ? 3 : 2}
                    />
                    <foreignObject x={n.x - 22} y={n.y - 22} width={44} height={44}>
                      <div className="flex h-full w-full items-center justify-center">
                        <Icon size={34} color={iconColor} />
                      </div>
                    </foreignObject>
                    <text
                      x={n.x}
                      y={n.y + n.r + 28}
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="700"
                      fill="rgba(230,225,215,0.9)"
                    >
                      {n.label}
                    </text>
                  </g>
                );
                return n.href ? (
                  <Link key={n.key} to={n.href}>
                    {content}
                  </Link>
                ) : (
                  <g key={n.key}>{content}</g>
                );
              })}

              <text
                x={350}
                y={275}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                letterSpacing="0.25em"
                fill="rgba(197,160,89,0.65)"
                style={{ opacity: visibleCount >= 4 ? 1 : 0, transition: "opacity 0.5s" }}
              >
                PRÉ-VENDA
              </text>
            </svg>
          </div>

          <div className="rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/10 to-card/80 p-8">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <RotateCcw className="size-4" /> O ciclo de feedback
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">
              Cada conversa de BDR e SDR revela uma dor de mercado real — objeção recorrente, ICP
              que não fecha, campanha atraindo gente errada. A PO2 mapeia isso e devolve pro
              marketing e pra diretoria, pra refinar produto, ICP e campanhas.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Sem esse ciclo, marketing continua gerando o mesmo lead ruim — e comercial continua
              queimando tempo tentando fechar quem nunca devia ter entrado no funil.
            </p>

            <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-foreground/90">
              Sem esse loop: orçamento de marketing gerando lead que nunca converte — e ninguém sabe
              por quê.
            </div>

            <DiagnosticDialog
              trigger={
                <button className={`${ctaPrimary} mt-6 w-full justify-center`}>
                  Pare de perder dinheiro com leads ruins <ArrowRight className="size-4" />
                </button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
