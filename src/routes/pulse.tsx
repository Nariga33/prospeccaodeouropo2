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
      { property: "og:url", content: "https://www.prospeccaoodeouropo2.com/pulse" },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaoodeouropo2.com/pulse" }],
  }),
  component: PulsePage,
});

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
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-md bg-gold px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-foreground">
              PO2 Pulse
            </span>
            <h1 className="mt-8 text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
              PO2 Pulse:{" "}
              <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
                O pulso da sua operação comercial
              </span>
            </h1>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Prospecte, venda, defina metas e alinhe projetos com o time, tudo em um só lugar. Com o{" "}
                <strong className="text-foreground">PO2 Pulse</strong> você acompanha indicadores, recebe
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
                className="inline-flex items-center gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
              >
                Falar com o time <ArrowRight className="size-4" />
              </a>
              <a
                href="#recursos"
                className="inline-flex items-center gap-6 rounded-xl border border-white/20 px-7 py-4 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
              >
                Ver o que tem no Pulse <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
          <img
            src={pulseImg}
            alt="Painel do PO2 Pulse em um notebook, com nota geral, evolução e indicadores de processos, conversão, gestão e atividades"
            width={810}
            height={1080}
            className="mx-auto w-full max-w-md rounded-3xl border border-white/10 lg:max-w-none"
          />
        </section>

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
