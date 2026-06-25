import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, AlertTriangle, Minus, ArrowLeft, ArrowRight, Phone, Sparkles, Timer } from "lucide-react";
import logo from "@/assets/po2-logo.png";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico gratuito · PO2" },
      { name: "description", content: "10 perguntas para mapear sua máquina de prospecção ativa." },
    ],
  }),
  component: DiagnosticoPage,
});

const WHATSAPP_NUMBER = "5551989218827";

type Score = 2 | 1 | 0;
interface Option { label: string; score: Score }
interface Question { title: string; helper: string; options: Option[] }

const QUESTIONS: Question[] = [
  {
    title: "Você tem um Perfil Ideal de Cliente definido por escrito?",
    helper: "Quais empresas, cargos e dores você quer atingir.",
    options: [
      { label: "Sim, documentado e usado por todo o time", score: 2 },
      { label: "Tenho na cabeça, mas nada formalizado", score: 1 },
      { label: "Não, prospectamos qualquer empresa", score: 0 },
    ],
  },
  {
    title: "Sua equipe estuda o cliente antes de cada contato?",
    helper: "Pesquisar a empresa, o decisor e o momento dele.",
    options: [
      { label: "Sempre — temos um roteiro de preparação", score: 2 },
      { label: "Às vezes, depende do vendedor", score: 1 },
      { label: "Nunca, vamos direto para o contato", score: 0 },
    ],
  },
  {
    title: "Vocês usam vários canais de forma organizada?",
    helper: "E-mail, LinkedIn, ligação e WhatsApp em sequência planejada.",
    options: [
      { label: "Sim, com sequência definida e medida", score: 2 },
      { label: "Usamos os canais, mas sem ordem clara", score: 1 },
      { label: "Cada vendedor faz do seu jeito", score: 0 },
    ],
  },
  {
    title: "Como são as ligações de prospecção?",
    helper: "Conversa com contexto x script decorado.",
    options: [
      { label: "Consultivas, com perguntas e diagnóstico", score: 2 },
      { label: "Depende do vendedor — mistura os dois", score: 1 },
      { label: "Script decorado, sem leitura do cliente", score: 0 },
    ],
  },
  {
    title: "Vocês registram e trabalham as objeções recebidas?",
    helper: "Mapear o motivo real do 'não' e ajustar o discurso.",
    options: [
      { label: "Sim, temos uma lista viva de objeções", score: 2 },
      { label: "Conversamos em reunião, sem registro", score: 1 },
      { label: "Não tratamos objeções de forma estruturada", score: 0 },
    ],
  },
  {
    title: "Existe um padrão para qualificar os leads?",
    helper: "Critérios claros para saber se vale avançar.",
    options: [
      { label: "Sim, critérios padronizados por etapa", score: 2 },
      { label: "Conhecemos, mas aplicamos solto", score: 1 },
      { label: "Não temos critérios definidos", score: 0 },
    ],
  },
  {
    title: "Vocês acompanham números em cada etapa do funil?",
    helper: "Volume, conexão, agendamento e conversão por canal.",
    options: [
      { label: "Sim, indicadores revistos toda semana", score: 2 },
      { label: "Olhamos números soltos, sem rotina", score: 1 },
      { label: "Não temos clareza dos números", score: 0 },
    ],
  },
  {
    title: "Os primeiros 15 segundos do contato têm um roteiro?",
    helper: "Abertura, contexto, diagnóstico e próximo passo.",
    options: [
      { label: "Sim, treinamos e revisamos a abordagem", score: 2 },
      { label: "Existe, mas cada um adapta como quer", score: 1 },
      { label: "Não temos abordagem padrão", score: 0 },
    ],
  },
  {
    title: "Vocês usam sistema de vendas (CRM) e automações?",
    helper: "Ferramentas que sustentam a operação no dia a dia.",
    options: [
      { label: "Sim, bem integrado e disciplinado", score: 2 },
      { label: "Temos CRM, mas pouco organizado", score: 1 },
      { label: "Trabalhamos em planilhas soltas", score: 0 },
    ],
  },
  {
    title: "Existe uma reunião semanal para revisar e melhorar?",
    helper: "Ajustar perfil de cliente, abordagem e números.",
    options: [
      { label: "Sim, ritual fixo com plano de ação", score: 2 },
      { label: "Acontece de vez em quando", score: 1 },
      { label: "Não revisamos, apenas executamos", score: 0 },
    ],
  },
];

interface Lead {
  nome: string; email: string; telefone: string; faturamento: string; plan?: string;
  ticket?: string; metaContratos?: string; ticketValor?: number; metaValor?: number;
}


function DiagnosticoPage() {
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(QUESTIONS.length).fill(null));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? sessionStorage.getItem("po2-lead") : null;
    if (!raw) {
      navigate({ to: "/" });
      return;
    }
    try { setLead(JSON.parse(raw)); } catch { navigate({ to: "/" }); }
  }, [navigate]);

  const total = QUESTIONS.length;
  const progress = ((finished ? total : step) / total) * 100;

  function pick(optionIdx: number) {
    const next = [...answers];
    next[step] = optionIdx;
    setAnswers(next);
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setFinished(true);
    }, 220);
  }

  const score = useMemo(
    () => answers.reduce<number>((sum, a, i) => sum + (a !== null ? QUESTIONS[i].options[a].score : 0), 0),
    [answers],
  );
  const maxScore = total * 2;
  const pct = Math.round((score / maxScore) * 100);

  const verdict = useMemo(() => {
    if (pct >= 75) return { tag: "Operação madura", desc: "Sua máquina de prospecção tem fundamentos sólidos. O próximo salto é otimização fina e escala." };
    if (pct >= 45) return { tag: "Operação em construção", desc: "Você tem peças importantes, mas a previsibilidade ainda escapa. Hora de fechar lacunas críticas." };
    return { tag: "Operação no improviso", desc: "A prospecção depende de esforço pessoal, não de método. Estruturar agora destrava receita rápido." };
  }, [pct]);

  const moneyGap = useMemo(() => {
    const ticket = lead?.ticketValor ?? 0;
    const meta = lead?.metaValor ?? 0;
    const potencialMensal = ticket * meta;
    const gapMensal = Math.round(potencialMensal * (1 - pct / 100));
    const gapAnual = gapMensal * 12;
    return { ticket, meta, potencialMensal, gapMensal, gapAnual };
  }, [lead, pct]);

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });


  function buildWhatsAppUrl() {
    if (!lead) return "#";
    const lines = [
      "Olá! Acabei de concluir o diagnóstico PO2.",
      "",
      `Nome: ${lead.nome}`,
      `E-mail: ${lead.email}`,
      `Telefone: ${lead.telefone}`,
      `Faturamento: ${lead.faturamento}`,
    ];
    if (lead.plan) lines.push(`Plano de interesse: ${lead.plan}`);
    if (moneyGap.potencialMensal > 0) {
      lines.push(
        `Ticket médio: ${fmt(moneyGap.ticket)}`,
        `Meta de contratos/mês: ${moneyGap.meta}`,
        `Potencial mensal: ${fmt(moneyGap.potencialMensal)}`,
        `Gap mensal estimado: ${fmt(moneyGap.gapMensal)}  |  Anual: ${fmt(moneyGap.gapAnual)}`,
      );
    }
    lines.push("", `Resultado: ${score}/${maxScore} (${pct}%) — ${verdict.tag}`, "", "Respostas:");

    QUESTIONS.forEach((q, i) => {
      const a = answers[i];
      lines.push(`${i + 1}. ${q.title}`);
      lines.push(`   → ${a !== null ? q.options[a].label : "—"}`);
    });
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  if (!lead) return null;

  const q = QUESTIONS[step];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/5">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <a href="/"><img src={logo} alt="PO2" className="h-8 w-auto" /></a>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Diagnóstico</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10">
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Quanto sua empresa <span className="text-gold">deixa de faturar</span> dependendo só de leads de marketing?
          </h1>
          <p className="mt-4 text-muted-foreground">
            Responda 10 perguntas e receba um diagnóstico estratégico da sua máquina de prospecção ativa — com a leitura honesta de onde está o gargalo e o caminho para virar o jogo.
          </p>
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {!finished ? (
          <div className="rounded-3xl border border-white/10 bg-card/70 p-8 shadow-2xl shadow-black/30">
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              Pergunta {step + 1} de {total}
            </div>
            <h2 className="mt-3 font-display text-3xl text-foreground">{q.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{q.helper}</p>

            <div className="mt-8 space-y-3">
              {q.options.map((opt, i) => {
                const selected = answers[step] === i;
                const Icon = opt.score === 2 ? Check : opt.score === 1 ? Minus : AlertTriangle;
                const tone = opt.score === 2 ? "text-gold border-gold/40" : opt.score === 1 ? "text-amber-300 border-amber-400/30" : "text-red-300 border-red-400/30";
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className={`group flex w-full items-center justify-between gap-4 rounded-xl border bg-background/40 px-5 py-4 text-left transition-all hover:border-gold/40 hover:bg-background/70 ${selected ? "border-gold bg-gold/5" : "border-white/10"}`}
                  >
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${tone}`}>
                      <Icon className="size-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between text-xs">
              <button
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
              >
                <ArrowLeft className="size-3.5" /> Voltar
              </button>
              <span className="text-muted-foreground">Escolha a opção mais sincera — o diagnóstico depende disso.</span>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-gold/40 bg-gradient-to-b from-gold/10 to-card/80 p-10 shadow-[0_0_80px_-20px_rgba(197,160,89,0.45)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              <Sparkles className="size-3" /> Diagnóstico pronto
            </div>
            <h2 className="mt-5 font-display text-4xl text-foreground md:text-5xl">{verdict.tag}.</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">{verdict.desc}</p>

            {moneyGap.potencialMensal > 0 && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-gold/40 bg-background/60 p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  Quanto você está deixando de faturar
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-5xl text-gold md:text-6xl">{fmt(moneyGap.gapMensal)}</span>
                  <span className="text-sm text-muted-foreground">por mês</span>
                </div>
                <div className="mt-1 text-sm text-foreground/80">
                  Até <span className="font-bold text-gold">{fmt(moneyGap.gapAnual)}</span> por ano que não entram no caixa.
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <MiniStat label="Ticket médio" value={fmt(moneyGap.ticket)} />
                  <MiniStat label="Meta de contratos/mês" value={`${moneyGap.meta}`} />
                  <MiniStat label="Potencial mensal" value={fmt(moneyGap.potencialMensal)} />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Cálculo: ticket médio × meta de novos contratos × lacuna de maturidade da operação ({100 - pct}%).
                </p>
              </div>
            )}



            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-background/40 p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pontuação</div>
                <div className="mt-2 font-display text-4xl text-gold">{score}<span className="text-xl text-muted-foreground">/{maxScore}</span></div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-background/40 p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Maturidade</div>
                <div className="mt-2 font-display text-4xl text-gold">{pct}%</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-background/40 p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Próximo passo</div>
                <div className="mt-2 text-sm text-foreground">Conversa de 30 min com o time PO2.</div>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_50px_rgba(197,160,89,0.45)] active:scale-[0.98]"
            >
              <Phone className="size-4" /> Falar com o time PO2 <ArrowRight className="size-4" />
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Vamos te enviar a leitura completa diretamente pelo nosso canal de atendimento.
            </p>
          </div>
        )}
      </main>

      <footer className="py-10 text-center text-xs text-muted-foreground">
        Diagnóstico PO2 · Prospecção de Ouro 2.0
      </footer>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card/40 p-3">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-xl text-foreground">{value}</div>
    </div>
  );
}

