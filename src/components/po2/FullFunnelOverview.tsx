import { Link } from "@tanstack/react-router";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import {
  Megaphone,
  Brain,
  Headset,
  Target,
  Trophy,
  RotateCcw,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

function FunnelBox({
  icon: Icon,
  label,
  href,
  tone = "dark",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  tone?: "dark" | "gold";
}) {
  const content = (
    <div
      className={`flex items-center justify-center gap-2.5 rounded-xl border px-6 py-4 text-sm font-bold transition-all ${
        tone === "gold"
          ? "border-gold bg-gold text-gold-foreground hover:shadow-[0_0_30px_rgba(197,160,89,0.35)]"
          : "border-white/15 bg-card/80 text-foreground hover:border-gold/40"
      }`}
    >
      <Icon className="size-4.5" /> {label}
    </div>
  );
  return href ? (
    <Link to={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

export function FullFunnelOverview() {
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

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="grid w-full grid-cols-2 gap-3">
              <FunnelBox icon={Megaphone} label="Marketing" />
              <FunnelBox icon={Brain} label="Inteligência Comercial" />
            </div>
            <ArrowDown className="size-5 text-gold/50" />

            <div className="w-full rounded-2xl border border-dashed border-gold/25 p-3">
              <div className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                Pré-venda
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FunnelBox icon={Headset} label="SDR" href="/sdr" tone="gold" />
                <FunnelBox icon={Target} label="BDR" href="/bdr" tone="gold" />
              </div>
            </div>
            <ArrowDown className="size-5 text-gold/50" />

            <div className="w-full">
              <FunnelBox icon={Trophy} label="Closer — Fechamento" href="/closer" tone="gold" />
            </div>
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
