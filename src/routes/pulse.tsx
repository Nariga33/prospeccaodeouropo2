import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  MessageCircle,
  Workflow,
  Filter,
  Target,
  Users,
  Sparkles,
  FileText,
  FileSignature,
  Phone,
} from "lucide-react";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import pulseImg from "@/assets/pulse-dashboard.webp";
import telaProspectar from "@/assets/pulse-prospectar.webp";
import telaPlaybooks from "@/assets/pulse-playbooks.webp";
import telaSala from "@/assets/pulse-sala-de-guerra.webp";

export const Route = createFileRoute("/pulse")({
  head: () => ({
    meta: [
      { title: "PO2 Pulse - O pulso da sua operação comercial" },
      {
        name: "description",
        content:
          "PO2 Pulse: acompanhe indicadores, receba recomendações e conte com mentorias periódicas. Consultoria, tecnologia e acompanhamento contínuo.",
      },
      { property: "og:title", content: "PO2 Pulse" },
      { property: "og:url", content: "https://pulsepo2.com/pulse" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/pulse" }],
  }),
  component: PulsePage,
});

type Tela = { id: string; t: string; d: string; img?: string; video?: string; poster?: string };

const TELAS: Tela[] = [
  { id: "leads", t: "Leads", d: "Cadastre a empresa e o contato e acompanhe cada oportunidade pelo funil.", video: "/videos/pulse-leads.mp4", poster: "/videos/pulse-leads.webp" },
  { id: "atividades", t: "Atividades", d: "Follow-ups e tarefas dos leads, das ligações e das cadências em lista e calendário.", video: "/videos/pulse-atividades.mp4", poster: "/videos/pulse-atividades.webp" },
  { id: "funil", t: "Funil", d: "Métricas comerciais por etapa: agendamento, qualificação e fechamento.", video: "/videos/pulse-funil.mp4", poster: "/videos/pulse-funil.webp" },
  { id: "cadencias", t: "Cadências", d: "Sequências multicanal com esperas e condições, com modelos prontos para você ajustar.", video: "/videos/pulse-cadencias.mp4", poster: "/videos/pulse-cadencias.webp" },
  { id: "prospectar", t: "Prospectar", d: "Encontre pessoas e empresas por cargo, porte, estado e segmento e crie o lead sem sair do CRM.", img: telaProspectar },
  { id: "playbooks", t: "Playbooks", d: "A metodologia PO2 como base e um adendo para cada conta-cliente.", img: telaPlaybooks },
  { id: "sala", t: "Sala de guerra", d: "Meta contratual, diagnóstico, plano de 30 dias e pauta de alinhamento com o cliente.", img: telaSala },
];

function Telas() {
  const [atual, setAtual] = useState(TELAS[0].id);
  const tela = TELAS.find((x) => x.id === atual) ?? TELAS[0];
  return (
    <section id="telas" className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Por dentro do Pulse</p>
      <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
        Veja a plataforma em ação
      </h2>
      <div role="tablist" className="mt-8 flex flex-wrap gap-2">
        {TELAS.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={x.id === atual}
            onClick={() => setAtual(x.id)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              x.id === atual
                ? "border-gold bg-gold text-gold-foreground"
                : "border-white/15 text-foreground hover:border-gold hover:text-gold"
            }`}
          >
            {x.t}
          </button>
        ))}
      </div>
      <p className="mt-5 max-w-2xl text-muted-foreground">{tela.d}</p>
      {tela.video ? (
        <video
          key={tela.id}
          src={tela.video}
          poster={tela.poster}
          width={1440}
          height={900}
          controls
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-label={`Vídeo da tela ${tela.t} do PO2 Pulse`}
          className="mt-6 w-full rounded-3xl border border-white/10 bg-black"
        />
      ) : (
        <img
          key={tela.id}
          src={tela.img}
          alt={`Tela ${tela.t} do PO2 Pulse`}
          width={1800}
          height={1100}
          loading="lazy"
          className="mt-6 w-full rounded-3xl border border-white/10"
        />
      )}
    </section>
  );
}

const INDICADORES = [
  ["Taxa de agendamento", "Leads com reunião agendada sobre os leads criados."],
  ["Taxa de no-show", "Reuniões agendadas em que o lead não compareceu."],
  ["Comparecimento", "Reuniões realizadas sobre as agendadas."],
  ["Taxa de qualificação", "Leads qualificados (SQL) sobre as reuniões realizadas."],
  ["Taxa de fechamento", "Fechamentos sobre os leads qualificados."],
  ["Conversão total", "Fechamentos sobre os leads criados no período."],
];

function track(name: string) {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, { page: "pulse" });
  } catch {
    /* sem analytics */
  }
}

const RECURSOS = [
  {
    icon: Search,
    t: "Prospecte",
    d: "Busque pessoas e empresas por cargo, porte, estado e segmento, filtre só decisores, crie o lead e ligue sem sair do CRM. Importe também de planilha Excel.",
  },
  {
    icon: Filter,
    t: "Funil e métricas",
    d: "Leads, SAL, SQL e Fechamento, com taxa de agendamento, no-show, comparecimento, qualificação e conversão total.",
  },
  {
    icon: MessageCircle,
    t: "WhatsApp e Instagram",
    d: "Espelhe o WhatsApp no CRM, converse com os leads e mantenha as mensagens ligadas ao card. Campanhas e avisos no mesmo lugar.",
  },
  {
    icon: Phone,
    t: "Ligações com dashboard",
    d: "Ligue pelo CRM e acompanhe as ligações do time em um painel de estatísticas.",
  },
  {
    icon: Workflow,
    t: "Cadências multicanal",
    d: "E-mail, WhatsApp, Instagram, ligação e LinkedIn montados em fluxo, com esperas, condições e modelos prontos de outbound, no-show e pós-reunião.",
  },
  {
    icon: Target,
    t: "Metas e sala de guerra",
    d: "Defina a meta contratual do mês, gere o diagnóstico de prospecção e o plano de 30 dias e monte a pauta de alinhamento com o cliente.",
  },
  {
    icon: Users,
    t: "Alinhe projetos com o time",
    d: "Chat da equipe com menções, atividades e follow-ups em calendário e aprovações de ICP, personas, scripts e cadências.",
  },
  {
    icon: Sparkles,
    t: "Playbooks a partir do site",
    d: "Informe o site da empresa e a IA monta um rascunho de playbook com a metodologia PO2, por conta-cliente. Você revisa antes de salvar.",
  },
  {
    icon: FileText,
    t: "Propostas a partir da call",
    d: "Do diagnóstico da call ao rascunho revisável e ao PDF final, com a base de serviços da PO2.",
  },
  {
    icon: FileSignature,
    t: "Contratos revisados",
    d: "Parta do modelo de 3, 6 ou 12 meses, traga a proposta e aprove as diferenças antes de alterar o contrato.",
  },
];

function PulsePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="bg-[#F4F5F0] px-6 py-16 text-[#101314] md:px-12 md:py-24 lg:px-16">
            <div className="mx-auto max-w-xl lg:ml-auto lg:mr-0">
              <span className="inline-block rounded-md bg-[#D8FF36] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#101314]">
                PO2 Pulse
              </span>
              <h1 className="mt-8 text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
                PO2 Pulse: <span className="text-[#155E75]">O pulso da sua operação comercial</span>
              </h1>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#101314]/80">
                <p>
                  Prospecte, venda, defina metas e alinhe projetos com o time, tudo em um só lugar. Com o{" "}
                  <strong className="text-[#101314]">PO2 Pulse</strong> você acompanha indicadores, recebe
                  recomendações e conta com mentorias periódicas.
                </p>
                <p>
                  Uma conexão entre consultoria, tecnologia e acompanhamento contínuo para construir uma relação de
                  longo prazo com a sua operação comercial.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={PO2_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("pulse_cta_whatsapp")}
                  className="inline-flex items-center gap-6 rounded-xl bg-[#101314] px-7 py-4 text-sm font-medium text-[#F4F5F0] transition-all hover:bg-[#155E75]"
                >
                  Falar com o time <ArrowRight className="size-4" />
                </a>
                <a
                  href="#recursos"
                  onClick={() => track("pulse_cta_recursos")}
                  className="inline-flex items-center gap-6 rounded-xl border border-[#101314]/30 px-7 py-4 text-sm font-medium transition-colors hover:border-[#155E75] hover:text-[#155E75]"
                >
                  Ver o que tem no Pulse <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
          <img
            src={pulseImg}
            alt="Painel do PO2 Pulse em um notebook, com nota geral, evolução e indicadores de processos, conversão, gestão e atividades"
            width={810}
            height={1080}
            className="h-full max-h-[720px] w-full object-cover lg:max-h-none"
          />
        </section>

        <section id="indicadores" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Indicadores</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            O pulso da operação, em números
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            O Pulse mede cada etapa do funil comercial e mostra onde a operação perde ou ganha ritmo.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDICADORES.map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-[#155E75]/30 p-6">
                <div className="flex items-end gap-1" aria-hidden="true">
                  <span className="h-3 w-1.5 rounded-sm bg-gold" />
                  <span className="h-5 w-1.5 rounded-sm bg-gold" />
                  <span className="h-8 w-1.5 rounded-sm bg-gold" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-gold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <Telas />

        <section id="recursos" className="mx-auto max-w-7xl px-6 pb-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">O que tem dentro do Pulse</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Da prospecção ao contrato, na mesma plataforma
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RECURSOS.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-gold/40">
                <span className="flex size-12 items-center justify-center rounded-xl border border-gold/50 text-[#22C5E6]">
                  <Icon className="size-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
