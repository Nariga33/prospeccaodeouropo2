import {
  Handshake,
  CalendarClock,
  CheckCircle2,
  Award,
  ArrowRightCircle,
  Sparkles,
  ShieldQuestion,
  Wallet,
  Zap,
} from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const PITCH_COGNITIVO = [
  {
    n: 1,
    icon: Handshake,
    t: "Conexão Imediata",
    d: "Agradece o tempo. Quebra o gelo, mostra profissionalismo.",
  },
  {
    n: 2,
    icon: CalendarClock,
    t: "Parametrização de Agenda",
    d: "Alinha o que vai acontecer na call e quanto tempo leva — corta a ansiedade do lead.",
  },
  {
    n: 3,
    icon: CheckCircle2,
    t: "Validação da Qualificação",
    d: "Retoma o que já foi levantado com SDR/BDR. Mostra que chegou preparado.",
  },
  {
    n: 4,
    icon: Award,
    t: "Âncora de Autoridade",
    d: "Apresenta a PO2 de forma breve. A call não é sobre o closer — é sobre o lead.",
  },
  {
    n: 5,
    icon: ArrowRightCircle,
    t: "Ponte Para o Futuro",
    d: "Solução ligada direto à dor levantada na qualificação. Pausa estratégica pra manter atenção.",
  },
  {
    n: 6,
    icon: Sparkles,
    t: "Bala de Prata",
    d: "Case real, mesmo modelo de negócio. Funcionou pra outro, funciona pra ele.",
  },
  {
    n: 7,
    icon: ShieldQuestion,
    t: "Checkpoint de Intenção",
    d: "Confirma que não sobrou dúvida técnica. Isola a objeção — se sobrar, é preço, não produto.",
  },
  {
    n: 8,
    icon: Wallet,
    t: "Oferta Ancorada",
    d: "Valor total antes do preço final. Opções de investimento, não parcela única.",
  },
  {
    n: 9,
    icon: Zap,
    t: "Incentivo Real",
    d: "Urgência ética — desconto por decisão rápida ou valor agregado, nunca pressão vazia.",
  },
];

export function PitchCognitivo() {
  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> O roteiro de call <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            PITCH —{" "}
            <span className="font-display font-normal italic text-gold">Venda Cognitiva.</span>
          </h2>
          <p className="mx-auto mt-5 text-muted-foreground">
            O roteiro de 9 passos que a PO2 treina em todo Closer — desenvolvido com{" "}
            <span className="text-gold">Thiago Zanoni</span>, especialista em fechamento de alta
            performance. Não depende de carisma, depende de estrutura.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PITCH_COGNITIVO.map((s) => (
            <div
              key={s.n}
              className="group relative rounded-2xl border border-white/10 bg-card/70 p-6 transition-all hover:-translate-y-1 hover:border-gold/40"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-display text-2xl text-gold">
                  {String(s.n).padStart(2, "0")}
                </span>
                <div className="flex size-9 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                  <s.icon className="size-4.5" />
                </div>
              </div>
              <h3 className="text-base font-bold">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
