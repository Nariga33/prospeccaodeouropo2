import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Check, Download, FileText, RotateCcw, Table } from "lucide-react";
import { PO2_WHATSAPP_NUMBER } from "@/lib/contact";
import { submitMaterialLead } from "@/lib/materials.functions";
import { FATURAMENTOS_MENSAIS } from "@/lib/faturamento";
import { enviarLeadCrm } from "@/lib/crm-lead.functions";

const GRADIENTE =
  "bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent";

/* ------------------------------------------------------------------ */
/* Perguntas: 4 áreas x 2 perguntas, 4 respostas (0 a 3 pontos)        */
/* ------------------------------------------------------------------ */

type Pergunta = { area: number; texto: string; opcoes: string[] };

const AREAS = [
  {
    grupo: "oxigenio",
    nome: "Lista e ICP",
    ajustes: ["Documentar ICP e persona", "Montar e validar a lista de prospecção"],
    dica: "Defina o ICP e a persona e monte uma lista segmentada e validada. Sem isso, o time liga para quem não compra.",
  },
  {
    grupo: "oxigenio",
    nome: "Abordagem",
    ajustes: ["Dedicar alguém ao primeiro contato", "Definir roteiro e meta diária de abordagens"],
    dica: "Coloque alguém dedicado ao primeiro contato, com roteiro testado e meta diária de ligações e abordagens.",
  },
  {
    grupo: "pulso",
    nome: "Cadência e ritmo",
    ajustes: ["Definir cadência multicanal com dias e canais", "Seguir cada lead até responder ou descartar"],
    dica: "Monte uma cadência multicanal com dias e canais definidos, para nenhum lead ficar esquecido.",
  },
  {
    grupo: "pulso",
    nome: "Qualificação e CRM",
    ajustes: ["Definir critérios de qualificação", "Registrar todo contato no CRM"],
    dica: "Crie critérios claros de qualificação e use o CRM todo dia, para decidir com número e não com feeling.",
  },
];

const PERGUNTAS: Pergunta[] = [
  {
    area: 0,
    texto: "Você sabe exatamente quem é o seu cliente ideal (ICP)?",
    opcoes: [
      "Não, vendemos para quem aparece",
      "Tenho uma ideia, mas nada documentado",
      "ICP definido, mas a lista é montada sem critério",
      "ICP e persona documentados, lista segmentada por eles",
    ],
  },
  {
    area: 0,
    texto: "Como é a sua lista de prospecção hoje?",
    opcoes: [
      "Não tenho lista, prospecto por indicação",
      "Planilha antiga, sem atualização",
      "Lista boa, mas com contatos sem validar",
      "Segmentada, validada e atualizada com frequência",
    ],
  },
  {
    area: 1,
    texto: "Quem faz o primeiro contato com o decisor?",
    opcoes: [
      "Ninguém dedicado, é quando sobra tempo",
      "Um vendedor que também fecha",
      "Um SDR ou BDR, mas sem script ou método",
      "Time dedicado, com método e roteiro testado",
    ],
  },
  {
    area: 1,
    texto: "Você mede quantas ligações e abordagens são feitas por dia?",
    opcoes: [
      "Não medimos",
      "Sabemos mais ou menos",
      "Medimos, mas sem meta",
      "Medimos com meta diária e acompanhamento",
    ],
  },
  {
    area: 2,
    texto: "Existe uma cadência multicanal (ligação, WhatsApp, e-mail, LinkedIn)?",
    opcoes: [
      "Não, cada um faz do seu jeito",
      "Usamos um canal só",
      "Vários canais, sem sequência definida",
      "Cadência definida, com dias e canais",
    ],
  },
  {
    area: 2,
    texto: "O que acontece com o lead que não responde?",
    opcoes: [
      "Esquecemos",
      "Tentamos uma ou duas vezes",
      "Voltamos a falar, mas sem prazo",
      "Segue a cadência até responder ou ser descartado",
    ],
  },
  {
    area: 3,
    texto: "Como você qualifica o lead antes de passar para o closer?",
    opcoes: [
      "Não qualificamos",
      "Por feeling",
      "Perguntas padrão, sem registro",
      "Critérios claros, registrados no CRM",
    ],
  },
  {
    area: 3,
    texto: "Você enxerga o funil em um CRM, com os dados do dia?",
    opcoes: [
      "Não temos CRM",
      "Temos, mas ninguém atualiza",
      "Atualizamos, mas sem olhar os números",
      "Usamos no dia a dia para decidir",
    ],
  },
];

function nivel(oxigenio: number, pulso: number) {
  const ox = oxigenio >= 60;
  const pu = pulso >= 60;
  if (ox && pu) return { titulo: "Respiração forte", texto: "Oxigênio e pulso em dia. O ganho agora está em escalar e afinar a conversão." };
  if (ox) return { titulo: "Tem oxigênio, falta pulso", texto: "A operação recebe lista e abordagem, mas sem ritmo. O processo para e volta, sem cadência." };
  if (pu) return { titulo: "Tem pulso, falta oxigênio", texto: "Existe ritmo, mas pouco alimento: lista, ICP e abordagem ainda não sustentam o volume." };
  return { titulo: "Nos aparelhos", texto: "Pouco oxigênio e pulso baixo. A prospecção depende de sorte e não de método." };
}

/* ------------------------------------------------------------------ */
/* Valor animado (easing até o alvo, respeita prefers-reduced-motion)  */
/* ------------------------------------------------------------------ */

function useAnimado(alvo: number, ms = 1200) {
  const [v, setV] = useState(0);
  const atual = useRef(0);
  useEffect(() => {
    const reduz =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduz) {
      atual.current = alvo;
      setV(alvo);
      return;
    }
    const ini = atual.current;
    const t0 = performance.now();
    let raf = 0;
    const passo = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      const n = ini + (alvo - ini) * e;
      atual.current = n;
      setV(n);
      if (p < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [alvo, ms]);
  return v;
}

/* ------------------------------------------------------------------ */
/* Medidor                                                             */
/* ------------------------------------------------------------------ */

function Medidor({ valor, rotulo, sub }: { valor: number; rotulo: string; sub: string }) {
  const arco = (Math.max(0, Math.min(100, valor)) / 100) * 83.333;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]" aria-hidden={false}>
      <style>{`
        @keyframes po2-sweep { to { transform: rotate(360deg); } }
        @keyframes po2-respira { 0%,100% { transform: scale(1); opacity:.9 } 50% { transform: scale(1.025); opacity:1 } }
        .po2-sweep { animation: po2-sweep 6s linear infinite; }
        .po2-respira { animation: po2-respira 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .po2-sweep, .po2-respira { animation: none; } }
      `}</style>

      {/* varredura de radar */}
      <div className="po2-sweep absolute inset-[7%] rounded-full" style={{
        background: "conic-gradient(from 0deg, transparent 0deg 290deg, rgba(34,197,230,0.28) 350deg, rgba(216,255,54,0.35) 360deg)",
        WebkitMask: "radial-gradient(circle, transparent 58%, #000 59%)",
        mask: "radial-gradient(circle, transparent 58%, #000 59%)",
      }} />

      <svg viewBox="0 0 400 400" className="po2-respira absolute inset-0 h-full w-full" role="img"
        aria-label={`${rotulo}: ${Math.round(valor)} de 100`}>
        <defs>
          <linearGradient id="raiox-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#D8FF36" />
            <stop offset="55%" stopColor="#3EE6A0" />
            <stop offset="100%" stopColor="#22C5E6" />
          </linearGradient>
          <filter id="raiox-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ticks */}
        <g stroke="rgba(255,255,255,0.14)" strokeWidth="2">
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const r1 = i % 5 === 0 ? 176 : 181;
            return <line key={i} x1={200 + Math.cos(a) * r1} y1={200 + Math.sin(a) * r1} x2={200 + Math.cos(a) * 188} y2={200 + Math.sin(a) * 188} />;
          })}
        </g>
        <circle cx="200" cy="200" r="112" fill="none" stroke="rgba(255,255,255,0.07)" />
        <circle cx="200" cy="200" r="78" fill="none" stroke="rgba(255,255,255,0.05)" />
        <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.05)" />
        <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.05)" />

        {/* trilho e progresso (300 graus, abertura embaixo) */}
        <g transform="rotate(120 200 200)">
          <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="16"
            strokeLinecap="round" pathLength={100} strokeDasharray="83.333 100" />
          {valor > 0.4 && (
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#raiox-grad)" strokeWidth="16"
              strokeLinecap="round" pathLength={100} strokeDasharray={`${arco} 100`} filter="url(#raiox-glow)" />
          )}
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-7xl leading-none text-white sm:text-8xl">
          {rotulo === "?" ? "?" : Math.round(valor)}
        </span>
        <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">{sub}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Seção                                                               */
/* ------------------------------------------------------------------ */

type Etapa = "intro" | "quiz" | "resultado";

export function RaioXHome() {
  const [etapa, setEtapa] = useState<Etapa>("intro");
  const [respostas, setRespostas] = useState<number[]>([]);
  const idx = respostas.length;

  const soma = respostas.reduce((a, b) => a + b, 0);
  const nota = respostas.length ? Math.round((soma / (respostas.length * 3)) * 100) : 0;
  const alvo = etapa === "intro" ? 0 : nota;
  const valor = useAnimado(alvo, etapa === "resultado" ? 1800 : 900);

  const porArea = AREAS.map((a, i) => {
    const qs = PERGUNTAS.map((p, j) => ({ p, r: respostas[j] })).filter((x) => x.p.area === i && x.r !== undefined);
    const pts = qs.reduce((s, x) => s + x.r, 0);
    return qs.length ? Math.round((pts / (qs.length * 3)) * 100) : 0;
  });
  const maisFraca = porArea.indexOf(Math.min(...porArea));
  const media = (g: string) => {
    const v = porArea.filter((_, i) => AREAS[i].grupo === g);
    return Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  };
  const pilaresCrm = Object.fromEntries(
    AREAS.map((a, i) => {
      const r = PERGUNTAS.map((p, j) => ({ p, r: respostas[j] })).filter((x) => x.p.area === i && x.r !== undefined);
      return [a.nome, r.length ? Math.round((r.reduce((s, x) => s + x.r, 0) / r.length) * 10) / 10 : 0];
    }),
  ) as Record<string, number>;
  const oxigenio = media("oxigenio");
  const pulso = media("pulso");

  const responder = (pts: number) => {
    const novo = [...respostas, pts];
    setRespostas(novo);
    if (novo.length === PERGUNTAS.length) setTimeout(() => setEtapa("resultado"), 450);
  };
  const voltar = () => setRespostas((r) => r.slice(0, -1));
  const refazer = () => {
    setRespostas([]);
    setEtapa("intro");
  };
  const materialLabel = `Raio-X | nota ${nota} | oxigênio ${oxigenio} | pulso ${pulso} | fraca: ${AREAS[maisFraca].nome}`;

  const n = nivel(oxigenio, pulso);
  const msg =
    `Olá! Fiz o Raio-X da Prospecção da PO2: minha nota foi ${nota}/100 e o ponto mais fraco é "${AREAS[maisFraca].nome}". Quero conversar com o time.`;
  const zap = `https://wa.me/${PO2_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <section
      id="raio-x"
      className="relative overflow-hidden border-t border-white/5 bg-[#05090B]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(21,94,117,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(21,94,117,0.10) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#155E75]/20 blur-[120px]" />
      <div className="relative mx-auto max-w-[1450px] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Raio-X da prospecção</p>
          <h2 className="mt-5 text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
            Sua prospecção tem <span className={GRADIENTE}>oxigênio</span> e <span className={GRADIENTE}>pulso</span>?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Oito perguntas, quatro áreas, resultado na hora. Responda e ganhe os materiais que a PO2 usa na operação dos clientes.
          </p>
        </div>

        {/* moldura com cantos */}
        <div className="relative mx-auto mt-14 max-w-6xl rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1B20]/80 to-[#071013]/90 p-6 shadow-[0_0_80px_rgba(21,94,117,0.25)] backdrop-blur md:p-12">
          {["left-3 top-3 border-l-2 border-t-2", "right-3 top-3 border-r-2 border-t-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={`pointer-events-none absolute size-6 rounded-sm border-gold/50 ${c}`} />
          ))}

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
            <Medidor
              valor={valor}
              rotulo={etapa === "intro" ? "?" : "Nota"}
              sub={etapa === "intro" ? "Qual é a sua nota?" : etapa === "quiz" ? "Nota parcial · de 0 a 100" : "Nota · de 0 a 100"}
            />
            </div>

            <div className="min-w-0">
              {etapa === "intro" && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Gratuito · 2 minutos</p>
                  <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                    Vamos medir o oxigênio e o pulso da sua prospecção.
                  </h3>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      { t: "Oxigênio", d: "O que alimenta a operação: lista, ICP e abordagem.", i: [0, 1] },
                      { t: "Pulso", d: "O ritmo que mantém viva: cadência, qualificação e CRM.", i: [2, 3] },
                    ].map((g) => (
                      <div key={g.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className={`font-display text-xl ${GRADIENTE}`}>{g.t}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{g.d}</p>
                        <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                          {g.i.map((k) => AREAS[k].nome).join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="size-4 text-gold" /> Guia para montar time de BDR, SDR e Closer</li>
                    <li className="flex items-center gap-2"><Check className="size-4 text-gold" /> Planilha de acompanhamento semanal de vendas</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => setEtapa("quiz")}
                    className="mt-8 inline-flex items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
                  >
                    Fazer o Raio-X <ArrowRight className="size-4" />
                  </button>
                  <p className="mt-4 text-xs text-muted-foreground">O resultado aparece na hora. Os materiais saem no final.</p>
                </div>
              )}

              {etapa === "quiz" && idx < PERGUNTAS.length && (
                <div key={idx} className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="font-bold text-gold">{AREAS[PERGUNTAS[idx].area].nome}</span>
                    <span>{idx + 1} de {PERGUNTAS.length}</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#D8FF36] to-[#22C5E6] transition-all duration-500"
                      style={{ width: `${(idx / PERGUNTAS.length) * 100}%` }}
                    />
                  </div>
                  <h3 className="mt-6 font-display text-2xl leading-snug md:text-3xl">{PERGUNTAS[idx].texto}</h3>
                  <div className="mt-6 grid gap-3">
                    {PERGUNTAS[idx].opcoes.map((o, pts) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => responder(pts)}
                        className="group flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left text-sm transition-all hover:border-gold/60 hover:bg-gold/[0.06] md:text-base"
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-white/20 text-[11px] text-muted-foreground group-hover:border-gold group-hover:text-gold">
                          {String.fromCharCode(65 + pts)}
                        </span>
                        {o}
                      </button>
                    ))}
                  </div>
                  {idx > 0 && (
                    <button type="button" onClick={voltar} className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="size-4" /> Voltar
                    </button>
                  )}
                </div>
              )}

              {etapa === "quiz" && idx >= PERGUNTAS.length && (
                <p className="text-muted-foreground">Calculando o seu resultado...</p>
              )}

              {etapa === "resultado" && (
                <div className="animate-in fade-in duration-500">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Seu resultado</p>
                  <h3 className={`mt-3 font-display text-3xl leading-tight md:text-4xl ${GRADIENTE}`}>{n.titulo}</h3>
                  <p className="mt-3 text-muted-foreground">{n.texto}</p>

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <Grupo nome="Oxigênio" valor={oxigenio} />
                    <Grupo nome="Pulso" valor={pulso} />
                  </div>

                  <div className="mt-6 space-y-4">
                    {AREAS.map((a, i) => (
                      <BarraArea key={a.nome} nome={a.nome} valor={porArea[i]} fraca={i === maisFraca} />
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/[0.05] p-5">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                      <Check className="size-4" /> Onde começar: {AREAS[maisFraca].nome}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base">{AREAS[maisFraca].dica}</p>
                  </div>

                  <GateMateriais
                    material={materialLabel}
                    diagnostico={{
                      nota,
                      pilares: pilaresCrm,
                      comecar: AREAS[maisFraca].nome,
                      recomendacao: AREAS[maisFraca].dica,
                      ajustes: AREAS[maisFraca].ajustes,
                    }}
                  />

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href={zap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
                    >
                      Falar com o time <ArrowRight className="size-4" />
                    </a>
                    <button type="button" onClick={refazer} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <RotateCcw className="size-4" /> Refazer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BarraArea({ nome, valor, fraca }: { nome: string; valor: number; fraca: boolean }) {
  const v = useAnimado(valor, 1400);
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className={fraca ? "text-gold" : "text-foreground"}>{nome}</span>
        <span className="tabular-nums text-muted-foreground">{Math.round(v)}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${fraca ? "bg-gold" : "bg-gradient-to-r from-[#3EE6A0] to-[#22C5E6]"}`}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

function Grupo({ nome, valor }: { nome: string; valor: number }) {
  const v = useAnimado(valor, 1400);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">{nome}</p>
      <p className={`mt-1 font-display text-4xl ${GRADIENTE}`}>{Math.round(v)}</p>
    </div>
  );
}

const MATERIAIS = [
  {
    icon: FileText,
    titulo: "Guia: como montar seu time de BDR, SDR e Closer",
    url: "/materiais/guia-estruturacao-contratacao-po2.pdf",
    arquivo: "guia-estruturacao-contratacao-po2.pdf",
  },
  {
    icon: Table,
    titulo: "Planilha de acompanhamento semanal de vendas",
    url: "/materiais/planilha-acompanhamento-vendas-po2.csv",
    arquivo: "planilha-acompanhamento-vendas-po2.csv",
  },
];


type DiagnosticoCrm = {
  nota: number;
  pilares: Record<string, number>;
  comecar: string;
  recomendacao: string;
  ajustes: string[];
};

function GateMateriais({ material, diagnostico }: { material: string; diagnostico: DiagnosticoCrm }) {
  const enviar = useServerFn(submitMaterialLead);
  const enviarCrm = useServerFn(enviarLeadCrm);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [zap, setZap] = useState("");
  const [fat, setFat] = useState("");
  const [estado, setEstado] = useState<"form" | "enviando" | "ok">("form");
  const [erro, setErro] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setEstado("enviando");
    try {
      await enviar({ data: { name: nome, email, whatsapp: zap, material: `${material} | fat/mês: ${fat}`.slice(0, 120) } });
      // CRM: não bloqueia a entrega dos materiais se falhar
      void enviarCrm({
        data: { nome, email, whatsapp: zap, faturamento: fat, url: window.location.href, diagnostico },
      }).catch(() => {});
      setEstado("ok");
    } catch {
      setEstado("form");
      setErro("Não deu para enviar agora. Confira os dados e tente de novo.");
    }
  };

  const campo =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none";

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#155E75]/30 to-transparent p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Ganhe os materiais da PO2</p>
      <ul className="mt-3 space-y-2 text-sm">
        {MATERIAIS.map((m) => (
          <li key={m.arquivo} className="flex items-start gap-2 text-muted-foreground">
            <m.icon className="mt-0.5 size-4 shrink-0 text-gold" /> {m.titulo}
          </li>
        ))}
      </ul>

      {estado !== "ok" ? (
        <form onSubmit={submit} className="mt-5 grid gap-3">
          <input className={campo} placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required minLength={2} autoComplete="name" />
          <input className={campo} type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          <input className={campo} type="tel" placeholder="WhatsApp (opcional)" value={zap} onChange={(e) => setZap(e.target.value)} autoComplete="tel" />
          <label className="grid gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Faturamento mensal da empresa
            <select className={`${campo} normal-case tracking-normal`} value={fat} onChange={(e) => setFat(e.target.value)} required>
              <option value="" disabled>Selecione a faixa por mês</option>
              {FATURAMENTOS_MENSAIS.map((f) => (
                <option key={f} value={f} className="bg-[#0B0D0E]">{f} por mês</option>
              ))}
            </select>
          </label>
          {erro && <p className="text-sm text-red-400">{erro}</p>}
          <button
            type="submit"
            disabled={estado === "enviando"}
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)] disabled:opacity-60"
          >
            {estado === "enviando" ? "Enviando..." : "Receber os materiais"} <ArrowRight className="size-4" />
          </button>
        </form>
      ) : (
        <div className="mt-5 space-y-3">
          <p className="text-sm text-foreground">Pronto! Baixe agora. Também registramos o envio para {email}.</p>
          {MATERIAIS.map((m) => (
            <a
              key={m.arquivo}
              href={m.url}
              download={m.arquivo}
              className="flex items-center justify-between gap-3 rounded-xl border border-gold/40 bg-gold/[0.06] px-4 py-3 text-sm transition-colors hover:bg-gold/[0.12]"
            >
              <span>{m.titulo}</span> <Download className="size-4 shrink-0 text-gold" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
