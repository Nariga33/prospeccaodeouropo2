import { useEffect, useRef, useState } from "react";
import { Check, Database, MessageCircle, Phone, RotateCcw, Sparkles, UserRound, X } from "lucide-react";

/**
 * "Quantas abas a sua operação tem abertas?"
 * Abas de navegador abrindo uma a uma (ferramentas que se paga separado),
 * o custo de mercado somando e, no fim, a aba do PO2 Pulse fechando a conta.
 * Preços públicos consultados em nov/2026 (fontes na nota).
 */

type Aba = {
  id: string;
  aba: string;
  titulo: string;
  icon: typeof Database;
  cor: string;
  custo: number;
  detalhe: string;
  noPulse: string;
};

const ABAS: Aba[] = [
  {
    id: "apollo",
    aba: "apollo.io",
    titulo: "Base de prospecção",
    icon: Database,
    cor: "#F4F5F0",
    custo: 2876,
    detalhe: "10 usuários · US$ 49 por usuário",
    noPulse: "Prospecção de empresas e contatos inclusa",
  },
  {
    id: "discador",
    aba: "Discador",
    titulo: "Discador para o time",
    icon: Phone,
    cor: "#22C5E6",
    custo: 1291,
    detalhe: "5 agentes · US$ 44 por agente",
    noPulse: "Discador com 5 ramais incluso",
  },
  {
    id: "whatsapp",
    aba: "WhatsApp descentralizado",
    titulo: "WhatsApp multiatendimento",
    icon: MessageCircle,
    cor: "#25D366",
    custo: 963,
    detalhe: "10 atendentes · plataforma à parte",
    noPulse: "WhatsApp dentro do CRM, ligado ao card do lead",
  },
  {
    id: "sdr",
    aba: "SDR",
    titulo: "SDR para responder e qualificar",
    icon: UserRound,
    cor: "#F4F5F0",
    custo: 3001,
    detalhe: "1 pessoa · salário médio, sem encargos",
    noPulse: "SDR de IA no WhatsApp com 300 conversas por mês",
  },
];

const PRECO_PULSE = 1779;
const TOTAL = ABAS.reduce((s, a) => s + a.custo, 0);
const brl = (v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

function useContador(alvo: number, ms = 700) {
  const [v, setV] = useState(alvo);
  const atual = useRef(alvo);
  useEffect(() => {
    const ini = atual.current;
    if (ini === alvo) return;
    const t0 = performance.now();
    let raf = 0;
    const passo = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const n = Math.round(ini + (alvo - ini) * (1 - Math.pow(1 - p, 3)));
      atual.current = n;
      setV(n);
      if (p < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [alvo, ms]);
  return v;
}

export function PulseAbas() {
  // etapa: 0 = nada aberto, 1..4 = abas de mercado abertas, 5 = aba do Pulse
  const [etapa, setEtapa] = useState(0);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const limpar = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const rodar = () => {
    limpar();
    setSelecionada(null);
    setEtapa(0);
    [1, 2, 3, 4, 5].forEach((e, i) => {
      timers.current.push(window.setTimeout(() => setEtapa(e), 500 + i * 1400));
    });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      setEtapa(5);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          rodar();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      limpar();
    };
  }, []);

  const abertas = ABAS.slice(0, Math.min(etapa, 4));
  const noPulse = etapa >= 5;
  const custoMercado = abertas.reduce((s, a) => s + a.custo, 0);
  const contador = useContador(custoMercado);
  const ativaId = selecionada ?? (noPulse ? "pulse" : abertas[abertas.length - 1]?.id ?? null);
  const ativa = ABAS.find((a) => a.id === ativaId);

  return (
    <section id="custo" className="relative overflow-hidden border-t border-white/5 bg-[#05090B]">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[#155E75]/25 blur-[140px]" />
      <div className="relative mx-auto max-w-[1450px] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Custo de mercado × PO2 Pulse</p>
          <h2 className="mt-4 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
            Quantas abas a sua operação precisa ter <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">abertas</span>?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Base de prospecção, discador, WhatsApp e SDR, cada um pago à parte. Veja quanto isso soma para um time de 10
            pessoas e quanto custa tudo junto no Pulse.
          </p>
        </div>

        {/* navegador */}
        <div ref={ref} className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D0E] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
          {/* barra de abas */}
          <div className="flex items-end gap-1 overflow-x-auto border-b border-white/10 bg-[#07090A] px-3 pt-2.5" role="tablist" aria-label="Ferramentas comparadas">
            <span className="mb-2.5 mr-2 hidden shrink-0 items-center gap-1.5 sm:flex" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </span>
            {abertas.map((a) => {
              const on = ativaId === a.id;
              return (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSelecionada(a.id)}
                  className={`group flex min-w-0 shrink-0 items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2 text-[11px] transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 sm:text-xs ${
                    on ? "border-white/10 bg-[#0B0D0E] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  } ${noPulse ? "opacity-40 line-through decoration-red-400/70" : ""}`}
                >
                  <a.icon className="size-3.5 shrink-0" style={{ color: a.cor }} />
                  <span className="max-w-[9rem] truncate">{a.aba}</span>
                  <X className="size-3 shrink-0 opacity-40" />
                </button>
              );
            })}
            {noPulse && (
              <button
                role="tab"
                aria-selected={ativaId === "pulse"}
                onClick={() => setSelecionada("pulse")}
                className={`flex shrink-0 items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2 text-[11px] font-medium animate-in fade-in slide-in-from-bottom-2 duration-500 sm:text-xs ${
                  ativaId === "pulse" ? "border-gold/50 bg-[#0B0D0E] text-gold" : "border-transparent text-gold/70"
                }`}
              >
                <Sparkles className="size-3.5" /> PO2 Pulse
              </button>
            )}
            {etapa === 0 && <span className="mb-2 px-2 text-xs text-muted-foreground">Nova aba</span>}
          </div>

          {/* conteúdo da aba */}
          <div className="grid min-h-[300px] gap-5 p-5 md:grid-cols-2 md:p-8">
            {ativaId === "pulse" ? (
              <div key="pulse" className="animate-in fade-in duration-500 md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Tudo isso em uma aba só</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {ABAS.map((a) => (
                    <div key={a.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
                        <Check className="size-3" />
                      </span>
                      <span>
                        <span className="block text-sm text-foreground">{a.noPulse}</span>
                        <span className="block text-xs text-muted-foreground line-through decoration-white/30">
                          {a.titulo}: R$ {brl(a.custo)}/mês
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : ativa ? (
              <>
                <div key={ativa.id + "m"} className="animate-in fade-in slide-in-from-left-2 duration-500 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    <ativa.icon className="size-4" style={{ color: ativa.cor }} /> Fora do Pulse
                  </p>
                  <p className="mt-4 font-display text-2xl">{ativa.titulo}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{ativa.detalhe}</p>
                  <p className="mt-6 font-display text-4xl tabular-nums text-foreground md:text-5xl">
                    R$ {brl(ativa.custo)}
                    <span className="ml-1 text-base text-muted-foreground">/mês</span>
                  </p>
                </div>
                <div key={ativa.id + "p"} className="animate-in fade-in slide-in-from-right-2 duration-500 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                    <Sparkles className="size-4" /> No PO2 Pulse
                  </p>
                  <p className="mt-4 font-display text-2xl">{ativa.noPulse}</p>
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-sm font-medium text-gold-foreground">
                    <Check className="size-4" /> Incluso no plano Pulse
                  </p>
                </div>
              </>
            ) : (
              <div className="grid place-items-center text-sm text-muted-foreground md:col-span-2">Abrindo as ferramentas…</div>
            )}
          </div>

          {/* placar */}
          <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-3">
            <div className="bg-[#0B0D0E] px-5 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Custo de mercado</p>
              <p className={`font-display text-3xl tabular-nums ${noPulse ? "text-red-300/80 line-through decoration-red-400/60" : ""}`}>
                R$ {brl(contador)}
                <span className="ml-1 text-sm text-muted-foreground">/mês</span>
              </p>
            </div>
            <div className="bg-[#0B0D0E] px-5 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">PO2 Pulse com discador</p>
              <p className="font-display text-3xl tabular-nums text-gold">
                R$ {brl(PRECO_PULSE)}
                <span className="ml-1 text-sm text-muted-foreground">/mês</span>
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 bg-[#0B0D0E] px-5 py-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Diferença</p>
                <p className={`font-display text-3xl tabular-nums transition-opacity duration-500 ${noPulse ? "opacity-100" : "opacity-30"}`}>
                  {noPulse ? `R$ ${brl(TOTAL - PRECO_PULSE)}` : "—"}
                  {noPulse && <span className="ml-1 text-sm text-muted-foreground">/mês</span>}
                </p>
              </div>
              <button
                type="button"
                onClick={rodar}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                aria-label="Rever a comparação"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-5xl text-xs leading-relaxed text-muted-foreground/70">
          Comparação para um time de 10 usuários com o plano Pulse com discador (5 ramais). Preços públicos consultados em
          novembro de 2026: Apollo plano Basic anual (US$ 49 por usuário), discador CloudTalk Essential com Power Dialer
          (US$ 44 por agente), Agendor Chat para 10 atendentes (R$ 963) e salário médio de SDR no Brasil segundo a Jooble
          (R$ 3.001, sem encargos). Dólar a R$ 5,87 (18/11/2026). Valores aproximados, que podem mudar. A IA atende e
          qualifica no WhatsApp, mas não faz todo o trabalho de um SDR.
        </p>
      </div>
    </section>
  );
}
