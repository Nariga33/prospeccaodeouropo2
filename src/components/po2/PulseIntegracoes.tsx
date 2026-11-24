import { CalendarCheck, FileSpreadsheet, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/po2/Reveal";

const GRADIENTE =
  "bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent";

const NOS = [
  { icon: CalendarCheck, t: "Google Agenda", d: "reuniões" },
  { icon: MessageCircle, t: "WhatsApp", d: "conversas e SDR de IA" },
  { icon: Instagram, t: "Instagram", d: "mensagens" },
  { icon: Mail, t: "E-mail", d: "cadências" },
  { icon: Linkedin, t: "LinkedIn", d: "passos da cadência" },
  { icon: Phone, t: "Discador", d: "ligações pelo CRM" },
  { icon: FileSpreadsheet, t: "Planilhas", d: "importação de leads" },
];

const ESTILO = `
@keyframes pin-fluxo { to { stroke-dashoffset: -28; } }
@keyframes pin-respira { 0%, 100% { transform: scale(1); box-shadow: 0 0 60px -10px rgba(216,255,54,.35); } 50% { transform: scale(1.04); box-shadow: 0 0 90px -5px rgba(216,255,54,.55); } }
@keyframes pin-onda { from { transform: scale(.6); opacity: .6; } to { transform: scale(1.6); opacity: 0; } }
.pin-fluxo { animation: pin-fluxo 1.6s linear infinite; }
.pin-respira { animation: pin-respira 5s ease-in-out infinite; }
.pin-onda { animation: pin-onda 5s ease-out infinite; }
@media (prefers-reduced-motion: reduce) { .pin-fluxo, .pin-respira, .pin-onda { animation: none; } .pin-onda { display: none; } }
`;

export function PulseIntegracoes() {
  const n = NOS.length;
  const pos = NOS.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 50 + 39 * Math.cos(a),
      y: 50 + 39 * Math.sin(a),
      // linha começa antes do ícone e termina na borda do núcleo
      x1: 50 + 33 * Math.cos(a),
      y1: 50 + 33 * Math.sin(a),
      x2: 50 + 13.5 * Math.cos(a),
      y2: 50 + 13.5 * Math.sin(a),
      acima: Math.sin(a) < -0.2,
    };
  });

  return (
    <section id="integracoes" className="relative overflow-hidden border-t border-white/5 bg-[#05090B]">
      <style>{ESTILO}</style>
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#155E75]/25 blur-[130px]" />
      <div className="relative mx-auto grid max-w-[1450px] items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Integrações</p>
          <h2 className="mt-4 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
            O Pulse respira junto com as <span className={GRADIENTE}>ferramentas do seu time</span>
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-lg text-muted-foreground">
            Reuniões no Google Agenda, conversas no WhatsApp e no Instagram, cadências por e-mail, ligações pelo discador
            e leads importados de planilha: tudo ligado ao mesmo funil, no mesmo pulso.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
            {NOS.map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm">
                <Icon className="size-4 shrink-0 text-gold" strokeWidth={1.75} /> {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="relative mx-auto hidden aspect-square w-full max-w-[600px] lg:block">
          <div role="img" aria-label="Diagrama do PO2 Pulse no centro, conectado ao Google Agenda, WhatsApp, Instagram, e-mail, LinkedIn, discador e planilhas">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="pin-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#D8FF36" />
                  <stop offset="1" stopColor="#22C5E6" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.25" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.25" />
              {pos.map((p, i) => (
                <g key={i}>
                  <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="rgba(255,255,255,0.08)" strokeWidth="0.35" />
                  <line
                    x1={p.x1}
                    y1={p.y1}
                    x2={p.x2}
                    y2={p.y2}
                    stroke="url(#pin-g)"
                    strokeWidth="0.55"
                    strokeLinecap="round"
                    strokeDasharray="2 12"
                    className="pin-fluxo"
                    style={{ animationDelay: `${i * 0.22}s` }}
                  />
                </g>
              ))}
            </svg>

            {/* núcleo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="pin-onda absolute inset-0 rounded-full border border-gold/40" />
              <div className="pin-respira relative grid size-36 place-items-center rounded-full border border-gold/50 bg-[#0B0D0E] text-center">
                <span>
                  <span className="block font-display text-3xl leading-none">PO2</span>
                  <span className={`mt-1 block text-sm font-semibold uppercase tracking-[0.3em] ${GRADIENTE}`}>Pulse</span>
                </span>
              </div>
            </div>

            {NOS.map(({ icon: Icon, t, d }, i) => (
              <div
                key={t}
                className="group absolute size-14 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
              >
                <span className={`absolute left-1/2 w-40 -translate-x-1/2 text-center ${pos[i].acima ? "bottom-full mb-2" : "top-full mt-2"}`}>
                  <span className="block font-display text-sm">{t}</span>
                  <span className="block text-[11px] text-muted-foreground">{d}</span>
                </span>
                <span className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-[#0B0D0E] shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold/60 group-hover:shadow-[0_0_30px_-5px_rgba(216,255,54,.45)]">
                  <Icon className="size-6 text-gold" strokeWidth={1.5} />
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
