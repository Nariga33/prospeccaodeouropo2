import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Plus, X } from "lucide-react";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import fotoMatheus from "@/assets/sobre-matheus.webp";
import fotoVictor from "@/assets/sobre-victor.webp";

const GRADIENTE =
  "bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent";

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.3em] ${
        dark ? "text-[#155E75]" : "text-gold"
      }`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Problema x método                                                  */
/* ------------------------------------------------------------------ */

const PARES = [
  {
    antes: "Listas feitas no chute",
    depois: "ICP documentado",
    texto:
      "Com o ICP escrito e compartilhado, cada etapa sabe quem vale o esforço. O pipeline fica mais enxuto e muito mais previsível.",
  },
  {
    antes: "Abordagem genérica",
    depois: "Abordagem consultiva",
    texto:
      "Cada contato nasce do contexto real do lead: empresa, cargo e momento. A reunião já começa validada.",
  },
  {
    antes: "Cadência sem estratégia",
    depois: "Cadência estruturada",
    texto:
      "E-mail, LinkedIn, ligação e WhatsApp entram em uma ordem que conta uma história, até a resposta acontecer.",
  },
  {
    antes: "Número sem análise",
    depois: "Ritual de métricas",
    texto:
      "Métrica revisada toda semana, por etapa do funil, mostra onde está o gargalo. A decisão vira dado, não achismo.",
  },
];

export function ProblemaMetodo() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <Eyebrow>O problema</Eyebrow>
      <h2 className="mt-4 max-w-4xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
        Sua operação comercial não falha por falta de esforço. Falha por falta de{" "}
        <span className={GRADIENTE}>método</span>.
      </h2>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Empresas com bons produtos e bons vendedores continuam sem previsibilidade quando cada etapa, do primeiro
        contato ao fechamento, acontece no improviso.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {PARES.map((p) => (
          <div key={p.depois} className="rounded-2xl border border-white/10 bg-card p-7">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground line-through decoration-white/30">
                <X className="size-4 text-red-400/80" /> {p.antes}
              </span>
              <ArrowRight className="size-4 text-gold" />
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <Check className="size-4 text-gold" /> {p.depois}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Funil por etapas (como calcular / onde olhar quando trava)         */
/* ------------------------------------------------------------------ */

const ETAPAS = [
  {
    nome: "Prospecção",
    calc: "Leads = reuniões agendadas ÷ taxa de agendamento",
    olhar: ["ICP", "Lista", "Canais", "Cadência"],
  },
  {
    nome: "Agendamento",
    calc: "Agendadas = reuniões realizadas ÷ comparecimento",
    olhar: ["Pitch", "CTA", "Confirmação", "No-show"],
  },
  {
    nome: "Reunião",
    calc: "Realizadas = qualificados ÷ taxa de qualificação",
    olhar: ["Discovery", "Critérios", "Fit"],
  },
  {
    nome: "Qualificação",
    calc: "Qualificados = fechamentos ÷ taxa de fechamento",
    olhar: ["Proposta", "Decisor", "Objeções"],
  },
  {
    nome: "Fechamento",
    calc: "Fechamentos = meta ÷ ticket médio",
    olhar: ["Negociação", "Margem", "Onboarding"],
  },
];

// altura (em % da caixa) na borda esquerda de cada etapa; a última é a borda direita final
const ALTURAS = [100, 86, 72, 58, 44, 34];

export function FunilEtapas() {
  const [ativa, setAtiva] = useState(2);
  return (
    <section className="bg-[#F4F5F0] text-[#101314]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Eyebrow dark>Método PO2 · Funil</Eyebrow>
        <h2 className="mt-4 max-w-4xl text-balance font-display text-3xl font-normal leading-[1.1] md:text-6xl">
          Meta de vendas vira rotina quando a conta é{" "}
          <span className="text-[#155E75]">decomposta por etapa</span>.
        </h2>
        <p className="mt-5 max-w-2xl text-[#101314]/70">
          Partimos do resultado que você quer e voltamos etapa por etapa: quantos leads, quantas reuniões, quantas
          propostas. Quando uma etapa trava, sabemos onde olhar. Toque em uma etapa para ver.
        </p>

        <div className="mt-14 grid gap-3 md:grid-cols-5 md:gap-1">
          {ETAPAS.map((e, i) => {
            const on = i === ativa;
            const a = ALTURAS[i] / 2;
            const b = ALTURAS[i + 1] / 2;
            return (
              <div key={e.nome} className="flex flex-col">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAtiva(i)}
                  style={{
                    clipPath: `polygon(0 ${50 - a}%, 100% ${50 - b}%, 100% ${50 + b}%, 0 ${50 + a}%)`,
                  }}
                  className={`hidden h-44 items-center justify-center px-3 text-center font-display text-lg transition-colors md:flex ${
                    on ? "bg-[#101314] text-[#F4F5F0]" : "bg-[#DAD9D2] text-[#101314] hover:bg-[#CFCEC6]"
                  }`}
                >
                  {e.nome}
                </button>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAtiva(i)}
                  className={`rounded-xl px-5 py-4 text-left font-display text-lg md:hidden ${
                    on ? "bg-[#101314] text-[#F4F5F0]" : "bg-[#DAD9D2] text-[#101314]"
                  }`}
                >
                  {e.nome}
                </button>

                <div className="mt-5 px-1 md:px-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#101314]/50">Como calcular</p>
                  <p className={`mt-2 min-h-[3.75rem] text-sm leading-snug ${on ? "font-medium" : "text-[#101314]/70"}`}>
                    {e.calc}
                  </p>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#101314]/50">
                    Onde olhar quando trava
                  </p>
                  {on && (
                    <span className="mt-2 inline-block rounded-full border border-[#101314]/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em]">
                      Gargalo
                    </span>
                  )}
                  <ul className={`mt-2 space-y-1 text-sm ${on ? "font-semibold" : "text-[#101314]/70"}`}>
                    {e.olhar.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-12 max-w-2xl text-xs leading-relaxed text-[#101314]/55">
          As taxas acima são as mesmas que o PO2 Pulse acompanha no funil: agendamento, no-show, comparecimento,
          qualificação e fechamento.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Matriz do diagnóstico                                              */
/* ------------------------------------------------------------------ */

const QUADRANTES = [
  {
    t: "Agora",
    s: "Alto impacto · viável já",
    itens: ["ICP sem critério", "Cadência sem narrativa", "Pitch genérico"],
    destaque: true,
  },
  {
    t: "Depois",
    s: "Alto impacto · exige preparo",
    itens: ["CRM e integrações", "Contratação do time", "Playbook por conta"],
  },
  {
    t: "Monitorar",
    s: "Baixo impacto · baixo esforço",
    itens: ["Taxa de no-show", "Follow-up pós-reunião"],
  },
  {
    t: "Descartar",
    s: "Baixo impacto · alto esforço",
    itens: ["Ferramenta nova sem processo", "Relatório que ninguém usa"],
    riscado: true,
  },
];

export function MatrizDiagnostico() {
  return (
    <section className="bg-[#0B0D0E]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <Eyebrow>Diagnóstico estrutural</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-4xl font-normal leading-[1.1] md:text-5xl">
            O diagnóstico separa o que resolver{" "}
            <span className={GRADIENTE}>agora</span> do que esperar.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            A leitura da operação sempre encontra mais problemas do que o time consegue resolver ao mesmo tempo.
            Cruzamos impacto no resultado com esforço e dependência para focar no que gera retorno rápido.
          </p>
          <p className="mt-8 border-l border-white/20 pl-5 font-display text-xl text-foreground">
            Priorizar também é escolher o que deixar de fora.
          </p>
        </div>

        <div>
          <div className="flex gap-3">
            <p className="hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl] rotate-180 sm:block">
              Impacto no resultado
            </p>
            <div className="grid flex-1 grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {QUADRANTES.map((q) => (
                <div key={q.t} className={`min-h-[13rem] p-6 ${q.destaque ? "bg-[#161A1C]" : "bg-[#0B0D0E]"}`}>
                  <h3
                    className={`font-display text-3xl ${
                      q.destaque ? "text-foreground" : "text-foreground/55"
                    } ${q.riscado ? "line-through decoration-1" : ""}`}
                  >
                    {q.t}
                  </h3>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{q.s}</p>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {q.itens.map((it) => (
                      <li key={it} className="flex items-center gap-3">
                        <span
                          className={`size-2.5 shrink-0 rounded-full ${
                            q.destaque ? "bg-gold" : "border border-white/40"
                          }`}
                        />
                        <span className={q.destaque ? "text-foreground" : "text-muted-foreground"}>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-right text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Esforço e dependência
          </p>
          <p className="mt-1 text-right text-xs text-muted-foreground">
            Exemplo ilustrativo. Cada ponto é um problema encontrado na leitura da operação.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Plano em 3 etapas                                                  */
/* ------------------------------------------------------------------ */

const PLANO = [
  {
    n: "01",
    t: "Diagnóstico e mapeamento",
    d: "Reunião de descoberta, mapeamento do funil atual e definição inicial do ICP, antes de qualquer proposta.",
  },
  {
    n: "02",
    t: "Base estruturada",
    d: "ICP documentado, cadência montada, scripts e critério de qualificação definidos. A base fica pronta.",
  },
  {
    n: "03",
    t: "Operação e ajuste semanal",
    d: "Operação rodando de verdade, com ajuste semanal baseado em métrica real, não em achismo.",
  },
];

export function PlanoEtapas() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <Eyebrow>O plano</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
        O que acontece depois do <span className={GRADIENTE}>sim</span>
      </h2>
      <div className="relative mt-12 grid gap-4 md:grid-cols-3">
        {PLANO.map((p) => (
          <div key={p.n} className="rounded-2xl border border-white/10 bg-card p-7">
            <span className="font-display text-5xl text-gold">{p.n}</span>
            <h3 className="mt-5 font-display text-xl font-medium">{p.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pitch de 4 blocos                                                  */
/* ------------------------------------------------------------------ */

const PITCH = [
  ["Pattern interrupt", "Quebrar o padrão da ligação fria e abrir atenção."],
  ["Elevator pitch", "Contextualizar o motivo do contato de forma rápida."],
  ["Diagnóstico consultivo", "Investigar dor, cenário e impacto com as perguntas certas."],
  ["CTA de baixo atrito", "Conduzir para uma conversa simples, sem pressão."],
];

export function PitchBlocos() {
  return (
    <section className="border-t border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Eyebrow>Como abordamos</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
          O pitch de 4 blocos: vender <span className={GRADIENTE}>diagnóstico</span> antes de vender solução
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Os primeiros 15 segundos definem se quem está do outro lado vai ouvir uma conversa relevante.
        </p>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PITCH.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border border-white/10 bg-card p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-medium">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Para quem é                                                        */
/* ------------------------------------------------------------------ */

const SIM = [
  "Já vende, mas depende de esforço individual para gerar oportunidade",
  "Tem, ou quer ter, ao menos 1 pessoa dedicada à prospecção ou às vendas",
  "Quer processo replicável, sem depender de sorte comercial",
  "Aceita ser guiado por diagnóstico antes de qualquer proposta fechada",
];
const NAO = [
  "Busca resultado sem mudar nada do processo atual",
  "Não tem verba para estruturar ao menos 1 posição comercial",
  "Quer solução mágica, sem acompanhamento nem disciplina de execução",
  "Já tem operação madura, com método documentado e funcionando",
];

export function ParaQuemE() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <Eyebrow>Para quem é</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
        Empresas B2B que querem vender com <span className={GRADIENTE}>previsibilidade</span>
      </h2>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-gold/30 bg-gold/5 p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">É para você se</p>
          <ul className="mt-5 space-y-3">
            {SIM.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-card p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Não é para você se</p>
          <ul className="mt-5 space-y-3">
            {NAO.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground">
                <X className="mt-0.5 size-4 shrink-0 text-red-400/70" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Frentes e responsáveis                                             */
/* ------------------------------------------------------------------ */

type Resp = "matheus" | "victor";

const FRENTES: { t: string; d: string; resp: Resp; to?: "/pulse" | "/academy" | "/solucoes" }[] = [
  {
    t: "Estruturação comercial",
    d: "ICP, lista, diagnóstico estrutural, cadência multicanal e pitch alinhado, com acompanhamento até o resultado.",
    resp: "victor",
    to: "/solucoes",
  },
  {
    t: "Aceleração de vendas",
    d: "Rotinas e estratégias de geração de demanda e vendas consultivas que aumentam a conversão.",
    resp: "victor",
    to: "/solucoes",
  },
  {
    t: "Terceirização de pré-vendas",
    d: "A PO2 assume a prospecção ativa e a qualificação (BDR e SDR) e entrega oportunidades para o seu time.",
    resp: "matheus",
    to: "/solucoes",
  },
  {
    t: "Tecnologia: PO2 Pulse",
    d: "CRM próprio da PO2 com prospecção, cadências, funil, metas, playbooks, propostas e contratos.",
    resp: "matheus",
    to: "/pulse",
  },
  {
    t: "Mentoria e capacitação",
    d: "Acompanhamento prático, sessão a sessão, e trilhas de SDR, BDR, closer e gestor na PO2 Academy.",
    resp: "matheus",
    to: "/academy",
  },
];

const RESP = {
  matheus: { nome: "Matheus Staruck", cargo: "Fundador e CEO", foto: fotoMatheus },
  victor: { nome: "Victor Nogueira", cargo: "Cofundador", foto: fotoVictor },
} as const;

export function Frentes() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <Eyebrow>Frentes e responsáveis</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
        Cada frente tem um <span className={GRADIENTE}>fundador</span> à frente
      </h2>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Você não fala com um intermediário: quem constrói o método também conduz a entrega.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FRENTES.map((f) => {
          const r = RESP[f.resp];
          return (
            <article key={f.t} className="flex flex-col rounded-2xl border border-white/10 bg-card p-7">
              <h3 className="font-display text-xl font-medium">{f.t}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <img
                  src={r.foto}
                  alt={r.nome}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="size-11 rounded-full border border-gold/40 object-cover object-top"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{r.nome}</p>
                  <p className="text-xs text-muted-foreground">{r.cargo}</p>
                </div>
                {f.to && (
                  <Link
                    to={f.to}
                    aria-label={`Conhecer ${f.t}`}
                    className="flex size-9 items-center justify-center rounded-full border border-white/15 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-gold-foreground"
                  >
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            </article>
          );
        })}
        <div className="flex flex-col justify-between rounded-2xl border border-gold/30 bg-gradient-to-br from-[#155E75]/40 to-card p-7">
          <div>
            <h3 className="font-display text-xl font-medium">Não sabe por onde começar?</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Comece pelo diagnóstico: mapeamos o seu funil e mostramos qual frente faz mais sentido agora.
            </p>
          </div>
          <a
            href={PO2_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 self-start rounded-xl bg-gold px-5 py-3 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
          >
            Falar com o time <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "O que é SDR e BDR terceirizado?",
    a: "É quando a qualificação de leads (SDR) ou a prospecção ativa (BDR) é feita por uma equipe externa, com processo, ferramentas e gestão próprios, em vez de contratar e treinar esses profissionais dentro de casa. A PO2 estrutura o processo e pode executá-lo diretamente.",
  },
  {
    q: "Qual a diferença entre time interno e terceirizado?",
    a: "O time interno é contratado, treinado e gerenciado por você, com curva de aprendizado e custo fixo. O terceirizado já vem com processo, ferramentas e gestão prontos, e costuma entrar em operação mais rápido, com alinhamento constante de ICP e critério de qualificação.",
  },
  {
    q: "Já tenho time comercial. Por que contratar a PO2?",
    a: "A PO2 não substitui o seu time: estrutura o método que ele executa, com ICP, cadência, script e métricas. Time sem processo vende menos do que poderia, independente do tamanho.",
  },
  {
    q: "Para que tamanho de empresa a PO2 é indicada?",
    a: "Empresas B2B que já vendem, mas dependem de esforço individual para gerar oportunidade: de times de 1 vendedor a operações com vários BDRs, SDRs e closers.",
  },
  {
    q: "O que diferencia a PO2 de uma consultoria comum?",
    a: "Não entregamos só um relatório. Participamos da execução, com acompanhamento prático e correção de rota junto com o time, e ainda oferecemos tecnologia própria (PO2 Pulse) para rodar o processo.",
  },
  {
    q: "Quanto tempo leva para aparecer resultado?",
    a: "Depende da maturidade da operação. A maioria dos clientes vê um fluxo mais previsível de oportunidades entre 60 e 90 dias de implementação do método.",
  },
  {
    q: "Vocês garantem resultado de vendas?",
    a: "Não prometemos número de vendas, porque isso depende de produto, preço e mercado. Garantimos a estruturação do método. Na mentoria, você tem garantia de 7 dias caso ela não seja para você.",
  },
  {
    q: "A PO2 atende empresas de todo o Brasil?",
    a: "Sim. A PO2 fica em Porto Alegre (RS), mas atende empresas B2B de qualquer estado: a operação de prospecção roda remota, por telefone, e-mail, LinkedIn e WhatsApp.",
  },
];

export function FaqPo2() {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <Eyebrow>Dúvidas</Eyebrow>
      <h2 className="mt-4 text-balance font-display text-3xl font-normal leading-[1.15] md:text-5xl">
        Tire suas dúvidas <span className={GRADIENTE}>antes de começar</span>
      </h2>
      <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {FAQS.map((f, i) => {
          const on = aberta === i;
          return (
            <div key={f.q}>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setAberta(on ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-lg font-medium">{f.q}</span>
                <Plus className={`size-5 shrink-0 text-gold transition-transform ${on ? "rotate-45" : ""}`} />
              </button>
              {on && <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
