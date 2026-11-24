import { useEffect, useState } from "react";
import { Activity, CalendarCheck, Heart, MessageCircle, Phone, Sparkles, Wind } from "lucide-react";

/**
 * "Monitor vivo" do PO2 Pulse: uma tela do CRM em movimento, feita em código.
 * Sinais vitais (ECG + pulso, oxigênio, pressão), um card andando no Kanban
 * e o SDR de IA respondendo no WhatsApp. Dados ilustrativos.
 * Com prefers-reduced-motion, tudo fica parado num quadro bonito.
 */

// Um batimento (P, QRS, T) em 120 px de largura, linha de base em y=60.
const BATIDA = "l14 0 l5 -6 l5 6 l10 0 l4 8 l6 -46 l6 52 l4 -14 l10 0 l7 -10 l7 10 l42 0";
const ECG = "M0 60 " + Array.from({ length: 8 }, () => BATIDA).join(" ");

const ESTILO = `
@keyframes pmv-ecg { from { transform: translateX(0); } to { transform: translateX(-240px); } }
@keyframes pmv-bat { 0%, 70%, 100% { transform: scale(1); } 80% { transform: scale(1.28); } }
@keyframes pmv-card {
  0%, 18% { transform: translate(0, 0); }
  32%, 62% { transform: translate(calc(100% + 10px), 0); }
  74%, 100% { transform: translate(calc(100% + 10px), 0); opacity: 0; }
}
@keyframes pmv-card-in { 0%, 74% { opacity: 0; transform: translateY(6px); } 86%, 100% { opacity: 1; transform: none; } }
@keyframes pmv-msg1 { 0%, 8% { opacity: 0; transform: translateY(6px); } 14%, 100% { opacity: 1; transform: none; } }
@keyframes pmv-dig { 0%, 22% { opacity: 0; } 26%, 44% { opacity: 1; } 48%, 100% { opacity: 0; } }
@keyframes pmv-msg2 { 0%, 46% { opacity: 0; transform: translateY(6px); } 52%, 100% { opacity: 1; transform: none; } }
@keyframes pmv-msg3 { 0%, 66% { opacity: 0; transform: translateY(6px); } 72%, 100% { opacity: 1; transform: none; } }
@keyframes pmv-agenda { 0%, 76% { opacity: 0; transform: translateY(8px) scale(.96); } 82%, 96% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@keyframes pmv-ponto { 0%, 100% { opacity: .25; } 50% { opacity: 1; } }
@keyframes pmv-flutua { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes pmv-arco { 0%, 100% { transform: scale(1); opacity: .9; } 50% { transform: scale(1.04); opacity: 1; } }
.pmv-ecg { animation: pmv-ecg 2.4s linear infinite; }
.pmv-bat { animation: pmv-bat .8s ease-in-out infinite; transform-origin: center; }
.pmv-card { animation: pmv-card 9s ease-in-out infinite; }
.pmv-card-in { animation: pmv-card-in 9s ease-in-out infinite; }
.pmv-msg1 { animation: pmv-msg1 9s ease-out infinite; }
.pmv-dig { animation: pmv-dig 9s ease-out infinite; }
.pmv-msg2 { animation: pmv-msg2 9s ease-out infinite; }
.pmv-msg3 { animation: pmv-msg3 9s ease-out infinite; }
.pmv-agenda { animation: pmv-agenda 9s ease-out infinite; }
.pmv-ponto { animation: pmv-ponto 1s ease-in-out infinite; }
.pmv-flutua { animation: pmv-flutua 6s ease-in-out infinite; }
.pmv-arco { animation: pmv-arco 5s ease-in-out infinite; transform-origin: 85% 40%; }
@media (prefers-reduced-motion: reduce) {
  .pmv-ecg, .pmv-bat, .pmv-card, .pmv-card-in, .pmv-msg1, .pmv-dig, .pmv-msg2, .pmv-msg3, .pmv-agenda, .pmv-ponto, .pmv-flutua, .pmv-arco {
    animation: none !important; opacity: 1 !important;
  }
  .pmv-dig { display: none; }
}
`;

function usePulso(inicial: number) {
  const [v, setV] = useState(inicial);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setV((x) => (x >= inicial + 12 ? inicial : x + 1)), 2400);
    return () => window.clearInterval(id);
  }, [inicial]);
  return v;
}

function Sinal({
  icon: Icon,
  rotulo,
  valor,
  sufixo,
  legenda,
  cor,
  bate,
}: {
  icon: typeof Heart;
  rotulo: string;
  valor: string | number;
  sufixo?: string;
  legenda: string;
  cor: string;
  bate?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em]" style={{ color: cor }}>
          {rotulo}
        </span>
        <Icon className={`size-3.5 ${bate ? "pmv-bat" : ""}`} style={{ color: cor }} fill={bate ? cor : "none"} />
      </div>
      <p className="mt-1 font-display text-[22px] leading-none tabular-nums sm:text-3xl" style={{ color: cor }}>
        {valor}
        {sufixo && <span className="ml-0.5 text-sm">{sufixo}</span>}
      </p>
      <p className="mt-1.5 text-[10px] leading-tight text-white/45">{legenda}</p>
    </div>
  );
}

export function PulseMonitorVivo() {
  const pulso = usePulso(118);

  return (
    <div className="relative flex h-full min-h-[560px] items-center justify-center overflow-hidden bg-[#05090B] px-5 py-12 md:min-h-[640px] md:px-10">
      <style>{ESTILO}</style>

      {/* fundo: arcos da marca respirando + halo petróleo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-1/4 size-[520px] rounded-full bg-[#155E75]/30 blur-[110px]" />
        <svg className="pmv-arco absolute inset-0 h-full w-full" viewBox="0 0 800 800" preserveAspectRatio="xMaxYMid slice">
          <defs>
            <linearGradient id="pmv-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#D8FF36" />
              <stop offset="1" stopColor="#22C5E6" />
            </linearGradient>
          </defs>
          <circle cx="760" cy="300" r="330" fill="none" stroke="url(#pmv-g)" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="820" cy="640" r="300" fill="none" stroke="url(#pmv-g)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative w-full max-w-[620px] pb-[250px] sm:pb-[170px]" role="img" aria-label="Ilustração animada do Monitor do PO2 Pulse: ritmo de ligações em forma de batimento cardíaco, pulso de ligações, oxigênio da meta e pressão de reuniões, um lead avançando no funil, o SDR de IA agendando uma reunião pelo WhatsApp e a reunião aparecendo no Google Agenda">
        {/* janela do CRM */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D0E]/95 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),0_0_80px_-40px_rgba(216,255,54,0.35)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="ml-2 text-[10px] font-medium text-white/50">PO2 Pulse · Monitor</span>
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/60">
              <span className="pmv-ponto size-1.5 rounded-full bg-red-500" /> Ao vivo
            </span>
          </div>

          <div className="p-4 md:p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D8FF36]">Sinais vitais do comercial</p>

            {/* ECG */}
            <div className="relative mt-3 h-[92px] overflow-hidden rounded-xl border border-white/[0.07] bg-[#05090B]"
              style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 80%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 80%, transparent)" }}>
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
              <svg className="pmv-ecg absolute left-0 top-0 h-full" width="960" viewBox="0 0 960 92" preserveAspectRatio="none" aria-hidden="true">
                <path d={ECG} transform="translate(0 -14)" fill="none" stroke="#D8FF36" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 4px rgba(216,255,54,.8))" }} />
              </svg>
              <span className="absolute right-3 top-2 text-[9px] text-[#D8FF36]/80">ritmo de ligações · no ritmo</span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              <Sinal icon={Heart} rotulo="Pulso" valor={pulso} legenda="ligações hoje" cor="#D8FF36" bate />
              <Sinal icon={Wind} rotulo="Oxigênio" valor={98} sufixo="%" legenda="ritmo da meta" cor="#3EE6A0" />
              <Sinal icon={Activity} rotulo="Pressão" valor="72/55" legenda="reuniões agend./realiz." cor="#F4F5F0" />
            </div>

            {/* Kanban */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {["Lead", "Reunião agendada"].map((col, i) => (
                <div key={col} className="relative h-[92px] rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">{col}</p>
                  <div className="mt-2 h-6 rounded-md bg-white/[0.04]" />
                  {i === 0 && (
                    <div className="pmv-card absolute left-2.5 right-2.5 top-[60px] z-10 flex h-6 items-center justify-between rounded-md border border-[#D8FF36]/60 bg-[#141a12] px-2 text-[10px] text-white shadow-[0_0_20px_rgba(216,255,54,.25)]">
                      Metalúrgica Aurora <Phone className="size-3 text-[#D8FF36]" />
                    </div>
                  )}
                  {i === 1 && (
                    <div className="pmv-card-in absolute left-2.5 right-2.5 top-[60px] flex h-6 items-center justify-between rounded-md border border-[#D8FF36]/60 bg-[#141a12] px-2 text-[10px] text-white">
                      Metalúrgica Aurora <span className="text-[#D8FF36]">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* reunião caindo no Google Agenda */}
        <div className="pmv-agenda absolute bottom-0 left-0 flex items-center gap-2.5 rounded-xl border border-[#22C5E6]/40 bg-[#0B0D0E] px-3 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,.9),0_0_30px_-10px_rgba(34,197,230,.5)] sm:bottom-16 sm:left-3">
          <span className="grid size-8 place-items-center rounded-lg bg-[#22C5E6]/15">
            <CalendarCheck className="size-4 text-[#22C5E6]" />
          </span>
          <span className="leading-tight">
            <span className="block text-[10px] font-semibold text-white">Reunião criada no Google Agenda</span>
            <span className="block text-[10px] text-white/50">Metalúrgica Aurora · amanhã, 10:00</span>
          </span>
        </div>

        {/* WhatsApp com SDR de IA, flutuando sobre a janela */}
        <div className="pmv-flutua absolute right-0 bottom-[60px] w-[236px] sm:bottom-0 sm:right-3 rounded-2xl border border-white/10 bg-[#0B0D0E] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,.9)] md:w-[250px]">
          <div className="flex items-center gap-2 border-b border-white/[0.07] pb-2">
            <span className="grid size-6 place-items-center rounded-full bg-[#25D366]/15">
              <MessageCircle className="size-3.5 text-[#25D366]" />
            </span>
            <span className="text-[10px] font-medium text-white/80">WhatsApp</span>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-[#D8FF36]/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-[#D8FF36]">
              <Sparkles className="size-2.5" /> SDR de IA
            </span>
          </div>
          <div className="mt-2 space-y-1.5 text-[10px] leading-snug">
            <p className="pmv-msg1 max-w-[85%] rounded-lg rounded-tl-sm bg-white/[0.06] px-2 py-1.5 text-white/85">
              Muito lead fica sem retorno aqui.
            </p>
            <p className="pmv-dig flex w-10 items-center justify-center gap-0.5 rounded-lg bg-[#D8FF36]/90 px-2 py-2" aria-hidden="true">
              <span className="pmv-ponto size-1 rounded-full bg-[#101314]" />
              <span className="pmv-ponto size-1 rounded-full bg-[#101314]" style={{ animationDelay: ".2s" }} />
              <span className="pmv-ponto size-1 rounded-full bg-[#101314]" style={{ animationDelay: ".4s" }} />
            </p>
            <p className="pmv-msg2 ml-auto max-w-[88%] rounded-lg rounded-tr-sm bg-[#D8FF36] px-2 py-1.5 text-[#101314]">
              Posso marcar 20 min com nosso especialista amanhã às 10h?
            </p>
            <p className="pmv-msg3 max-w-[60%] rounded-lg rounded-tl-sm bg-white/[0.06] px-2 py-1.5 text-white/85">Pode sim 👍</p>
          </div>
        </div>
      </div>

      <p className="absolute bottom-3 right-4 text-[10px] text-white/35">Dados ilustrativos</p>
    </div>
  );
}
