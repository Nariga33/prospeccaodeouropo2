import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, AlertTriangle, Minus, ArrowLeft, ArrowRight, Phone, Sparkles } from "lucide-react";
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
    title: "Você tem ICP e personas definidos por escrito?",
    helper: "Empresas, cargos, dores e critérios de qualificação.",
    options: [
      { label: "Sim, documentado e usado pelo time", score: 2 },
      { label: "Tenho na cabeça, mas nada formal", score: 1 },
      { label: "Não, prospectamos qualquer empresa", score: 0 },
    ],
  },
  {
    title: "Sua equipe estuda o lead antes de cada contato?",
    helper: "Empresa, decisor, contexto, gatilhos recentes.",
    options: [
      { label: "Sempre — temos checklist de pré-abordagem", score: 2 },
      { label: "Às vezes, depende do vendedor", score: 1 },
      { label: "Nunca, vamos direto para o contato", score: 0 },
    ],
  },
  {
    title: "Existe uma cadência multicanal estruturada?",
    helper: "E-mail, LinkedIn, cold call e WhatsApp em sequência.",
    options: [
      { label: "Sim, com toques definidos e mensurados", score: 2 },
      { label: "Usamos canais, mas sem sequência clara", score: 1 },
      { label: "Cada um faz do seu jeito", score: 0 },
    ],
  },
  {
    title: "A cold call é consultiva ou script decorado?",
    helper: "Abertura com contexto vs. ligação automática.",
    options: [
      { label: "Consultiva, com diagnóstico e perguntas", score: 2 },
      { label: "Mistura — depende do BDR", score: 1 },
      { label: "Script decorado, sem contexto", score: 0 },
    ],
  },
  {
    title: "Vocês documentam e trabalham objeções?",
    helper: "Mapear, entender raiz e ajustar discurso.",
    options: [
      { label: "Sim, temos biblioteca viva de objeções", score: 2 },
      { label: "Discutimos pontualmente em reunião", score: 1 },
      { label: "Não tratamos objeções de forma estruturada", score: 0 },
    ],
  },
  {
    title: "Aplica algum framework de qualificação?",
    helper: "CHAMP, SPIN, BANT, Gap Selling, Challenger…",
    options: [
      { label: "Sim, padronizado por estágio de lead", score: 2 },
      { label: "Conhecemos, mas aplicamos solto", score: 1 },
      { label: "Não usamos nenhum framework", score: 0 },
    ],
  },
  {
    title: "Você acompanha métricas por etapa do funil?",
    helper: "Volume, conexão, agendamento, conversão por canal.",
    options: [
      { label: "Sim, dashboard semanal com indicadores", score: 2 },
      { label: "Olhamos números soltos, sem ritual", score: 1 },
      { label: "Não temos visibilidade dos números", score: 0 },
    ],
  },
  {
    title: "O pitch dos primeiros 15 segundos é estruturado?",
    helper: "Pattern interrupt, contexto, diagnóstico, CTA.",
    options: [
      { label: "Sim, treinamos e revisamos o pitch", score: 2 },
      { label: "Existe, mas cada um adapta como quer", score: 1 },
      { label: "Não temos pitch definido", score: 0 },
    ],
  },
  {
    title: "Usa CRM, automação e ferramentas integradas?",
    helper: "Stack que sustenta a operação outbound.",
    options: [
      { label: "Sim, stack integrado e bem operado", score: 2 },
      { label: "Temos CRM, mas pouco disciplinado", score: 1 },
      { label: "Trabalhamos em planilhas soltas", score: 0 },
    ],
  },
  {
    title: "Existe ritual semanal de revisão e melhoria?",
    helper: "Ajustes de ICP, cadência, pitch e métricas.",
    options: [
      { label: "Sim, ritual fixo com plano de ação", score: 2 },
      { label: "Acontece eventualmente", score: 1 },
      { label: "Não revisamos, apenas executamos", score: 0 },
    ],
  },
];

interface Lead { nome: string; email: string; telefone: string; faturamento: string; plan?: string }

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
              <Phone className="size-4" /> Receber meu diagnóstico no WhatsApp <ArrowRight className="size-4" />
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Vamos te enviar a leitura completa pelo WhatsApp +55 51 98921-8827.
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
