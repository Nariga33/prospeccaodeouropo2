import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  Clock,
  GitBranch,
  Heart,
  KanbanSquare,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Play,
  Send,
  Sparkles,
  Wind,
} from "lucide-react";

/**
 * Demo interativa do PO2 Pulse, feita dentro do site.
 * Tudo é simulado no navegador, com dados fictícios: nada fala com o CRM real,
 * nenhuma mensagem é enviada e nenhuma IA é chamada (as respostas são roteirizadas).
 */

type Etapa = "lead" | "contato" | "agendada" | "realizada";
type Lead = { id: number; empresa: string; contato: string; origem: string; etapa: Etapa };
type Aba = "monitor" | "funil" | "whatsapp" | "cadencia";

const ETAPAS: { id: Etapa; t: string }[] = [
  { id: "lead", t: "Lead" },
  { id: "contato", t: "Contato feito" },
  { id: "agendada", t: "Reunião agendada" },
  { id: "realizada", t: "Reunião realizada" },
];

const LEADS_INICIAIS: Lead[] = [
  { id: 1, empresa: "Metalúrgica Aurora", contato: "Carla Menezes", origem: "Outbound", etapa: "lead" },
  { id: 2, empresa: "Grupo Vértice", contato: "Rafael Torres", origem: "Indicação", etapa: "lead" },
  { id: 3, empresa: "Clínica Bem Viver", contato: "Juliana Prado", origem: "Inbound", etapa: "lead" },
  { id: 4, empresa: "Transportes Rota Sul", contato: "Marcos Lima", origem: "Outbound", etapa: "contato" },
  { id: 5, empresa: "Agro Campo Verde", contato: "Paula Ribeiro", origem: "Evento", etapa: "contato" },
  { id: 6, empresa: "Nexa Software", contato: "Diego Alves", origem: "Inbound", etapa: "agendada" },
  { id: 7, empresa: "Construtora Prisma", contato: "Ana Souza", origem: "Outbound", etapa: "realizada" },
];

const META_LIGACOES = 60;

const ABAS: { id: Aba; t: string; icon: typeof Activity; dica: string }[] = [
  { id: "monitor", t: "Monitor", icon: Activity, dica: "Faça uma ligação e veja os sinais vitais reagirem." },
  { id: "funil", t: "Funil", icon: KanbanSquare, dica: "Arraste os cards entre as etapas ou toque em avançar." },
  { id: "whatsapp", t: "WhatsApp IA", icon: MessageCircle, dica: "Você é o lead. Responda e veja o SDR de IA trabalhar." },
  { id: "cadencia", t: "Cadência", icon: GitBranch, dica: "Ligue e desligue passos e simule o caminho de um lead." },
];

const ESTILO = `
@keyframes pdi-ecg { from { transform: translateX(0); } to { transform: translateX(-240px); } }
@keyframes pdi-bat { 0%, 70%, 100% { transform: scale(1); } 80% { transform: scale(1.3); } }
@keyframes pdi-ponto { 0%, 100% { opacity: .25; } 50% { opacity: 1; } }
.pdi-ecg { animation: pdi-ecg 2.4s linear infinite; }
.pdi-ecg-rapido { animation-duration: .9s; }
.pdi-bat { animation: pdi-bat .8s ease-in-out infinite; transform-origin: center; }
.pdi-ponto { animation: pdi-ponto 1s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .pdi-ecg, .pdi-bat, .pdi-ponto { animation: none !important; } }
`;
const BATIDA = "l14 0 l5 -6 l5 6 l10 0 l4 8 l6 -46 l6 52 l4 -14 l10 0 l7 -10 l7 10 l42 0";
const ECG = "M0 60 " + Array.from({ length: 14 }, () => BATIDA).join(" ");

function track(name: string, extra: Record<string, unknown> = {}) {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, { page: "pulse", ...extra });
  } catch {
    /* sem analytics */
  }
}

/* ------------------------------------------------------------------ */

export function PulseDemoInterativa() {
  const [aba, setAba] = useState<Aba>("monitor");
  const [leads, setLeads] = useState<Lead[]>(LEADS_INICIAIS);
  const [ligacoes, setLigacoes] = useState(38);
  const [toast, setToast] = useState<{ t: string; icon: typeof Activity } | null>(null);
  const toastTimer = useRef<number>(0);

  const avisar = (t: string, icon: typeof Activity = Sparkles) => {
    window.clearTimeout(toastTimer.current);
    setToast({ t, icon });
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  };

  const mover = (id: number, etapa: Etapa) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, etapa } : l)));
  };

  const trocarAba = (a: Aba) => {
    setAba(a);
    track("pulse_demo_aba", { aba: a });
  };

  const agendadas = leads.filter((l) => l.etapa === "agendada" || l.etapa === "realizada").length;
  const realizadas = leads.filter((l) => l.etapa === "realizada").length;
  const info = ABAS.find((a) => a.id === aba)!;

  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0B0D0E] shadow-[0_40px_120px_-40px_rgba(21,94,117,0.6)]">
      <style>{ESTILO}</style>
      {/* barra do app */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2.5 shrink-0 rounded-full bg-white/15" />
          <span className="size-2.5 shrink-0 rounded-full bg-white/15" />
          <span className="size-2.5 shrink-0 rounded-full bg-white/15" />
          <span className="ml-2 truncate text-xs text-muted-foreground">PO2 Pulse · demonstração</span>
        </div>
        <span className="shrink-0 rounded-full border border-gold/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
          Dados fictícios
        </span>
      </div>

      <div className="grid md:grid-cols-[200px_minmax(0,1fr)]">
        {/* navegação */}
        <nav className="flex gap-1 overflow-x-auto border-b border-white/10 p-2 md:flex-col md:border-b-0 md:border-r md:p-3" aria-label="Telas da demonstração" role="tablist">
          {ABAS.map(({ id, t, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={aba === id}
              onClick={() => trocarAba(id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                aba === id ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              }`}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.75} /> {t}
            </button>
          ))}
          <p className="mt-auto hidden px-3 pt-6 text-[11px] leading-relaxed text-muted-foreground/70 md:block">
            Tudo aqui é simulado no seu navegador. Nada é enviado.
          </p>
        </nav>

        {/* conteúdo */}
        <div className="relative min-h-[520px] min-w-0 p-4 md:p-6">
          <p className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 shrink-0 text-gold" /> {info.dica}
          </p>

          {aba === "monitor" && (
            <Monitor
              ligacoes={ligacoes}
              agendadas={agendadas}
              realizadas={realizadas}
              leads={leads}
              onLigar={(l) => {
                setLigacoes((x) => x + 1);
                if (l.etapa === "lead") mover(l.id, "contato");
                avisar(`Ligação registrada com ${l.contato} (${l.empresa})`, Phone);
                track("pulse_demo_ligar");
              }}
              irPara={trocarAba}
            />
          )}
          {aba === "funil" && (
            <Funil
              leads={leads}
              onMover={(id, e) => {
                mover(id, e);
                const l = leads.find((x) => x.id === id);
                if (l && e === "agendada") avisar(`Reunião agendada com ${l.empresa}`, CalendarCheck);
              }}
            />
          )}
          {aba === "whatsapp" && (
            <WhatsappIA
              onReuniao={() => {
                mover(1, "agendada");
                avisar("Reunião criada no Google Agenda: Metalúrgica Aurora, amanhã às 10h", CalendarCheck);
              }}
              onFollowup={() => avisar("Follow-up agendado para quinta, 15h", Clock)}
            />
          )}
          {aba === "cadencia" && <Cadencia />}

          {toast && (
            <div
              role="status"
              className="absolute left-4 right-4 top-3 z-20 flex items-center gap-3 rounded-xl border border-[#22C5E6]/40 bg-[#0B0D0E] px-4 py-3 text-sm shadow-[0_20px_50px_-20px_rgba(0,0,0,.9),0_0_30px_-10px_rgba(34,197,230,.5)] animate-in fade-in slide-in-from-top-2 md:left-auto md:max-w-sm"
            >
              <toast.icon className="size-4 shrink-0 text-[#22C5E6]" /> {toast.t}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Monitor                                                             */
/* ------------------------------------------------------------------ */

function Monitor({
  ligacoes,
  agendadas,
  realizadas,
  leads,
  onLigar,
  irPara,
}: {
  ligacoes: number;
  agendadas: number;
  realizadas: number;
  leads: Lead[];
  onLigar: (l: Lead) => void;
  irPara: (a: Aba) => void;
}) {
  const [acelerado, setAcelerado] = useState(false);
  const oxigenio = Math.min(100, Math.round((ligacoes / META_LIGACOES) * 100));
  const fila = leads.filter((l) => l.etapa === "lead" || l.etapa === "contato").slice(0, 4);

  const ligar = (l: Lead) => {
    onLigar(l);
    setAcelerado(true);
    window.setTimeout(() => setAcelerado(false), 1800);
  };

  return (
    <div className="space-y-4">
      <div
        className="relative h-28 overflow-hidden rounded-xl border border-white/[0.07] bg-[#05090B]"
        style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 85%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 85%, transparent)" }}
      >
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <svg className={`pdi-ecg absolute left-0 top-0 h-full ${acelerado ? "pdi-ecg-rapido" : ""}`} width="1680" viewBox="0 0 1680 112" preserveAspectRatio="none" aria-hidden="true">
          <path d={ECG} transform="translate(0 -4)" fill="none" stroke="#D8FF36" strokeWidth="2" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 4px rgba(216,255,54,.8))" }} />
        </svg>
        <span className="absolute right-3 top-2 text-[10px] text-[#D8FF36]/80">ritmo de ligações {acelerado ? "· acelerando" : "· estável"}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Heart, r: "Pulso", v: String(ligacoes), l: "ligações hoje", c: "#D8FF36", bate: true },
          { icon: Wind, r: "Oxigênio", v: `${oxigenio}%`, l: `da meta de ${META_LIGACOES}`, c: "#3EE6A0" },
          { icon: Activity, r: "Pressão", v: `${agendadas}/${realizadas}`, l: "reuniões agend./realiz.", c: "#F4F5F0" },
        ].map((s) => (
          <div key={s.r} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 md:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] md:text-[10px]" style={{ color: s.c }}>{s.r}</span>
              <s.icon className={`size-3.5 ${s.bate ? "pdi-bat" : ""}`} style={{ color: s.c }} fill={s.bate ? s.c : "none"} />
            </div>
            <p key={s.v} className="mt-1 font-display text-2xl tabular-nums animate-in fade-in md:text-4xl" style={{ color: s.c }}>{s.v}</p>
            <p className="mt-1 text-[10px] leading-tight text-muted-foreground md:text-xs">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 md:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Próximas ligações</p>
        <ul className="mt-2 divide-y divide-white/[0.06]">
          {fila.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className="min-w-0">
                <span className="block truncate text-sm">{l.contato}</span>
                <span className="block truncate text-xs text-muted-foreground">{l.empresa}</span>
              </span>
              <button
                type="button"
                onClick={() => ligar(l)}
                className="flex shrink-0 items-center gap-2 rounded-lg bg-gold px-3 py-2 text-xs font-medium text-gold-foreground transition-shadow hover:shadow-[0_0_24px_rgba(216,255,54,.4)]"
              >
                <Phone className="size-3.5" /> Ligar
              </button>
            </li>
          ))}
          {fila.length === 0 && (
            <li className="py-3 text-sm text-muted-foreground">
              Fila zerada. Veja o resultado no{" "}
              <button type="button" className="text-gold underline" onClick={() => irPara("funil")}>funil</button>.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Funil (Kanban)                                                      */
/* ------------------------------------------------------------------ */

function Funil({ leads, onMover }: { leads: Lead[]; onMover: (id: number, e: Etapa) => void }) {
  const [arrastando, setArrastando] = useState<number | null>(null);
  const [sobre, setSobre] = useState<Etapa | null>(null);

  const soltar = (e: DragEvent, etapa: Etapa) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (id) onMover(id, etapa);
    setArrastando(null);
    setSobre(null);
  };

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
      <div className="grid min-w-[760px] grid-cols-4 gap-3">
        {ETAPAS.map((col, ci) => {
          const itens = leads.filter((l) => l.etapa === col.id);
          return (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault();
                setSobre(col.id);
              }}
              onDragLeave={() => setSobre(null)}
              onDrop={(e) => soltar(e, col.id)}
              className={`min-h-[380px] rounded-xl border p-2.5 transition-colors ${
                sobre === col.id ? "border-gold/60 bg-gold/[0.05]" : "border-white/[0.07] bg-white/[0.02]"
              }`}
            >
              <p className="flex items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {col.t} <span className="rounded-full bg-white/[0.06] px-2 py-0.5 tabular-nums">{itens.length}</span>
              </p>
              <div className="mt-2.5 space-y-2">
                {itens.map((l) => (
                  <div
                    key={l.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", String(l.id));
                      setArrastando(l.id);
                    }}
                    onDragEnd={() => setArrastando(null)}
                    className={`cursor-grab rounded-lg border bg-[#11161A] p-3 transition-all animate-in fade-in active:cursor-grabbing ${
                      arrastando === l.id ? "opacity-40" : "border-white/10 hover:border-gold/50"
                    }`}
                  >
                    <p className="text-sm font-medium">{l.empresa}</p>
                    <p className="text-xs text-muted-foreground">{l.contato}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded-full bg-[#155E75]/40 px-2 py-0.5 text-[10px] text-[#9fe3f2]">{l.origem}</span>
                      {ci < ETAPAS.length - 1 && (
                        <button
                          type="button"
                          onClick={() => onMover(l.id, ETAPAS[ci + 1].id)}
                          className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px] text-gold hover:bg-gold/10"
                          aria-label={`Avançar ${l.empresa} para ${ETAPAS[ci + 1].t}`}
                        >
                          Avançar <ArrowRight className="size-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WhatsApp com SDR de IA (roteirizado)                                */
/* ------------------------------------------------------------------ */

type Msg = { de: "lead" | "ia"; t: string };

const RESPOSTAS: { chave: RegExp; resp: string; acao?: "reuniao" | "followup" }[] = [
  {
    chave: /(sim|pode|marca|marcar|reuni|fechado|bora|ok|combinado|amanh)/i,
    resp: "Perfeito! Reunião marcada para amanhã às 10h com nosso especialista. Já te mandei o convite. 📅",
    acao: "reuniao",
  },
  {
    chave: /(pre[cç]o|valor|quanto|custa|plano)/i,
    resp: "Os planos começam em R$ 219 por mês. Para ver qual faz sentido para vocês, posso marcar 20 minutos com um especialista. Amanhã às 10h funciona?",
  },
  {
    chave: /(tempo|corrid|depois|agora n|ocupad|semana que vem)/i,
    resp: "Entendo, Carla. Te mando um resumo por aqui e retomo na quinta às 15h, pode ser?",
    acao: "followup",
  },
  {
    chave: /(entender|como funciona|o que [eé]|explica|saber mais|detalhe)/i,
    resp: "O Pulse junta funil, WhatsApp, discador e cadências num lugar só e mostra os sinais vitais do comercial. Hoje o maior gargalo de vocês é volume de contatos ou retorno dos leads?",
  },
  {
    chave: /(retorno|resposta|lead|volume|contato|liga)/i,
    resp: "Faz sentido. É exatamente onde a cadência e o follow-up automático ajudam. Quer ver isso com seus números? Posso marcar amanhã às 10h.",
  },
];

const SUGESTOES = ["Quanto custa?", "Quero entender melhor", "Agora não tenho tempo", "Pode marcar a reunião"];

function WhatsappIA({ onReuniao, onFollowup }: { onReuniao: () => void; onFollowup: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { de: "ia", t: "Oi, Carla! Aqui é o assistente da PO2. Vi que a Metalúrgica Aurora está estruturando o comercial. Posso te fazer uma pergunta rápida?" },
  ]);
  const [digitando, setDigitando] = useState(false);
  const [texto, setTexto] = useState("");
  const fim = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);

  useEffect(() => {
    fim.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [msgs, digitando]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const enviar = (t: string) => {
    const limpo = t.trim().slice(0, 240);
    if (!limpo || digitando) return;
    setMsgs((m) => [...m, { de: "lead", t: limpo }]);
    setTexto("");
    setDigitando(true);
    track("pulse_demo_whatsapp");
    const r = RESPOSTAS.find((x) => x.chave.test(limpo));
    timer.current = window.setTimeout(() => {
      setDigitando(false);
      setMsgs((m) => [
        ...m,
        { de: "ia", t: r?.resp ?? "Entendi! Para eu te ajudar melhor: hoje vocês prospectam mais por ligação ou por WhatsApp?" },
      ]);
      if (r?.acao === "reuniao") onReuniao();
      if (r?.acao === "followup") onFollowup();
    }, 1300);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    enviar(texto);
  };

  return (
    <div className="mx-auto flex h-[440px] max-w-xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#07090A]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="grid size-9 place-items-center rounded-full bg-[#25D366]/15 text-sm font-semibold text-[#25D366]">CM</span>
        <span className="min-w-0">
          <span className="block truncate text-sm">Carla Menezes · Metalúrgica Aurora</span>
          <span className="block text-[11px] text-muted-foreground">você está no lugar da Carla</span>
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-gold/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
          <Sparkles className="size-3" /> SDR de IA
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4" aria-live="polite">
        {msgs.map((m, i) => (
          <p
            key={i}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug animate-in fade-in slide-in-from-bottom-1 ${
              m.de === "ia" ? "rounded-tl-sm bg-white/[0.07] text-foreground" : "ml-auto rounded-tr-sm bg-[#D8FF36] text-[#101314]"
            }`}
          >
            {m.t}
          </p>
        ))}
        {digitando && (
          <p className="flex w-14 items-center justify-center gap-1 rounded-2xl rounded-tl-sm bg-white/[0.07] px-3 py-3" aria-label="SDR de IA digitando">
            <span className="pdi-ponto size-1.5 rounded-full bg-white/70" />
            <span className="pdi-ponto size-1.5 rounded-full bg-white/70" style={{ animationDelay: ".2s" }} />
            <span className="pdi-ponto size-1.5 rounded-full bg-white/70" style={{ animationDelay: ".4s" }} />
          </p>
        )}
        <div ref={fim} />
      </div>

      <div className="flex gap-2 overflow-x-auto px-3 pb-2">
        {SUGESTOES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => enviar(s)}
            disabled={digitando}
            className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 p-3">
        <label htmlFor="pdi-msg" className="sr-only">Responder como lead</label>
        <input
          id="pdi-msg"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={240}
          autoComplete="off"
          placeholder="Responda como se fosse o lead…"
          className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/60"
        />
        <button type="submit" disabled={digitando} className="grid size-10 shrink-0 place-items-center rounded-full bg-[#25D366] text-[#08130c] disabled:opacity-40" aria-label="Enviar">
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cadência                                                            */
/* ------------------------------------------------------------------ */

const PASSOS = [
  { id: "wpp", dia: "Dia 1", t: "WhatsApp de abertura", icon: MessageCircle, canal: "WhatsApp" },
  { id: "liga1", dia: "Dia 1", t: "Ligação pelo discador", icon: Phone, canal: "Ligação" },
  { id: "mail", dia: "Dia 2", t: "E-mail com conteúdo", icon: Mail, canal: "E-mail" },
  { id: "follow", dia: "Dia 3", t: "Follow-up no WhatsApp", icon: MessageCircle, canal: "WhatsApp" },
  { id: "linkedin", dia: "Dia 5", t: "Conexão no LinkedIn", icon: Linkedin, canal: "LinkedIn" },
  { id: "liga2", dia: "Dia 6", t: "Ligação final", icon: Phone, canal: "Ligação" },
];

function Cadencia() {
  const [ativos, setAtivos] = useState<Record<string, boolean>>(Object.fromEntries(PASSOS.map((p) => [p.id, true])));
  const [atual, setAtual] = useState<number>(-1);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const lista = PASSOS.filter((p) => ativos[p.id]);
  const canais = new Set(lista.map((p) => p.canal)).size;
  const dias = lista.length ? Number(lista[lista.length - 1].dia.replace(/\D/g, "")) : 0;

  const simular = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setAtual(-1);
    lista.forEach((_, i) => timers.current.push(window.setTimeout(() => setAtual(i), 300 + i * 650)));
    timers.current.push(window.setTimeout(() => setAtual(lista.length), 300 + lista.length * 650));
    track("pulse_demo_cadencia");
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
      <ol className="relative space-y-2">
        <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-gold/60 via-white/10 to-transparent" />
        {PASSOS.map((p) => {
          const on = ativos[p.id];
          const idx = lista.findIndex((x) => x.id === p.id);
          const aqui = on && idx === atual;
          const feito = on && atual > idx && idx >= 0;
          return (
            <li key={p.id}>
              <div
                className={`relative flex items-center gap-4 rounded-xl border p-3 transition-all duration-300 ${
                  aqui ? "border-gold bg-gold/[0.08] shadow-[0_0_30px_-10px_rgba(216,255,54,.5)]" : on ? "border-white/10 bg-white/[0.02]" : "border-white/[0.05] opacity-45"
                }`}
              >
                <span className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full border ${feito || aqui ? "border-gold bg-gold text-gold-foreground" : "border-white/20 bg-[#0B0D0E] text-muted-foreground"}`}>
                  <p.icon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.dia}</span>
                  <span className={`block truncate text-sm ${on ? "" : "line-through"}`}>{p.t}</span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={`${on ? "Desligar" : "Ligar"} ${p.t}`}
                  onClick={() => setAtivos((a) => ({ ...a, [p.id]: !a[p.id] }))}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-gold" : "bg-white/15"}`}
                >
                  <span className={`absolute top-0.5 size-4 rounded-full bg-[#101314] transition-transform ${on ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Resumo</p>
        <dl className="mt-3 space-y-3">
          {[
            ["Passos", lista.length],
            ["Canais", canais],
            ["Duração", `${dias} dias`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between">
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="font-display text-2xl tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={simular}
          disabled={lista.length === 0}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-medium text-gold-foreground disabled:opacity-40"
        >
          <Play className="size-4" /> Simular um lead
        </button>
        <p className="mt-3 min-h-[2.5rem] text-xs leading-relaxed text-muted-foreground" aria-live="polite">
          {atual >= 0 && atual < lista.length && `Lead no passo: ${lista[atual].t}`}
          {atual >= lista.length && lista.length > 0 && "Cadência concluída. Se o lead responder em qualquer passo, ele anda no funil."}
        </p>
      </div>
    </div>
  );
}
