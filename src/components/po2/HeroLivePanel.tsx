import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/hooks/use-count-up";

export function HeroLivePanel() {
  const [closed, setClosed] = useState(false);
  const [ligacoes, setLigacoes] = useState(200);
  const startedTicking = useRef(false);

  useEffect(() => {
    if (startedTicking.current) return;
    startedTicking.current = true;
    const timer = setInterval(() => {
      setLigacoes((v) => v + Math.floor(Math.random() * 3) + 1);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  if (closed) {
    return (
      <div className="relative flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-card/40">
        <button
          onClick={() => setClosed(false)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
        >
          <span className="size-2 rounded-full bg-emerald-500/70" /> Reabrir painel
        </button>
      </div>
    );
  }

  return (
    <div className="relative animate-in fade-in zoom-in-95 duration-300">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gold/10 blur-3xl" />
      <div className="rounded-3xl border border-white/10 bg-card/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Painel · Resultado acumulado
            </span>
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-400">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Ao vivo
            </span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setClosed(true)}
              aria-label="Fechar painel"
              className="size-2 rounded-full bg-red-500/50 transition-transform hover:scale-125 hover:bg-red-500"
            />
            <span className="size-2 rounded-full bg-amber-500/50" />
            <span className="size-2 rounded-full bg-emerald-500/50" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Receita gerada
          </div>
          <div className="font-display text-6xl text-gold">
            <CountUp value="+R$ 2M" />
          </div>
          <div className="text-sm text-muted-foreground">em +30 negócios fechados</div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="font-display text-2xl text-foreground">
              +{ligacoes.toLocaleString("pt-BR")}k
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Ligações
            </div>
          </div>
          {[
            { v: "+10k", l: "Empresas" },
            { v: "+1k", l: "Agendas" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-white/5 p-4">
              <div className="font-display text-2xl text-foreground">
                <CountUp value={s.v} />
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
