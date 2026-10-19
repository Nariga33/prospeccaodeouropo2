import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Users,
  Target,
  Settings,
  GraduationCap,
  BadgeCheck,
  Cpu,
  CalendarDays,
  FileText,
} from "lucide-react";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { PO2_WHATSAPP_URL } from "@/lib/contact";
import academyImg from "@/assets/academy-plataforma.webp";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "PO2 Academy - Desenvolvimento comercial na prática" },
      {
        name: "description",
        content:
          "PO2 Academy: ambiente de aprendizagem com treinamentos, mentorias e certificações para profissionais e lideranças de vendas, com tecnologia e CRM próprios da PO2.",
      },
      { property: "og:title", content: "PO2 Academy" },
      { property: "og:url", content: "https://pulsepo2.com/academy" },
    ],
    links: [{ rel: "canonical", href: "https://pulsepo2.com/academy" }],
  }),
  component: AcademyPage,
});

function track(name: string) {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, { page: "academy" });
  } catch {
    /* sem analytics */
  }
}

const FUNCIONALIDADES = [
  {
    icon: GraduationCap,
    t: "Trilhas de formação",
    d: "Caminhos de aprendizagem para BDRs, SDRs, closers e gestores, do fundamento comercial à liderança.",
  },
  {
    icon: Users,
    t: "Cursos práticos e mentorias",
    d: "Conteúdo aplicado e mentorias com especialistas, para levar o método para a rotina do time.",
  },
  {
    icon: BadgeCheck,
    t: "Avaliações e certificações",
    d: "Avaliações e certificações profissionais, com certificado que pode ser verificado online.",
  },
];

const TRILHAS = [
  { icon: BarChart3, t: "Fundamentos comerciais" },
  { icon: Users, t: "SDRs" },
  { icon: Users, t: "BDRs" },
  { icon: Target, t: "Closers" },
  { icon: Settings, t: "Gestores" },
];

const ACESSOS = [
  { to: "/mentoria", icon: Users, t: "Mentoria", d: "Mentoria prática com Matheus Staruck para fundadores, gestores e times comerciais." },
  { to: "/eventos", icon: CalendarDays, t: "Eventos", d: "Encontros e masterclasses da PO2 sobre prospecção e vendas." },
  { to: "/materiais", icon: FileText, t: "Materiais", d: "Conteúdos e materiais para estudar e aplicar com o seu time." },
  { to: "/verificar-certificado", icon: BadgeCheck, t: "Verificar certificado", d: "Confira a autenticidade de um certificado emitido pela PO2." },
] as const;

function AcademyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="bg-[#F4F5F0] px-6 py-16 text-[#101314] md:px-12 md:py-24 lg:px-16">
            <div className="mx-auto max-w-xl lg:ml-auto lg:mr-0">
              <span className="inline-block rounded-md bg-[#D8FF36] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#101314]">
                PO2 Academy
              </span>
              <h1 className="mt-8 text-balance font-display text-4xl font-normal leading-[1.1] md:text-6xl">
                PO2 Academy: <span className="text-[#155E75]">desenvolvimento comercial na prática</span>
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-[#101314]/80">
                Ambiente de aprendizagem com <strong className="text-[#101314]">treinamentos, mentorias e
                certificações</strong> para profissionais e lideranças de vendas.
              </p>
              <ul className="mt-6 space-y-2 text-[#101314]/80">
                {FUNCIONALIDADES.map((f) => (
                  <li key={f.t} className="flex gap-2">
                    <span className="text-[#155E75]">•</span>
                    {f.t}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={PO2_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("academy_cta_whatsapp")}
                  className="inline-flex items-center gap-6 rounded-xl bg-[#101314] px-7 py-4 text-sm font-medium text-[#F4F5F0] transition-all hover:bg-[#155E75]"
                >
                  Falar com o time <ArrowRight className="size-4" />
                </a>
                <a
                  href="#tecnologia"
                  onClick={() => track("academy_cta_tecnologia")}
                  className="inline-flex items-center gap-6 rounded-xl border border-[#101314]/30 px-7 py-4 text-sm font-medium transition-colors hover:border-[#155E75] hover:text-[#155E75]"
                >
                  Conheça a tecnologia <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
          <img
            src={academyImg}
            alt="Plataforma PO2 Academy em um notebook, com trilhas de aprendizagem para fundamentos comerciais, SDRs, closers e gestores"
            width={1130}
            height={1080}
            className="h-full max-h-[720px] w-full object-cover lg:max-h-none"
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Principais funcionalidades</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Aprender, praticar e{" "}
            <span className="bg-gradient-to-r from-[#D8FF36] via-[#3EE6A0] to-[#22C5E6] bg-clip-text text-transparent">
              se certificar
            </span>
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {FUNCIONALIDADES.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-gold/40">
                <span className="flex size-12 items-center justify-center rounded-xl border border-gold/50 text-[#22C5E6]">
                  <Icon className="size-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-16 font-display text-xl font-semibold">Trilhas de aprendizagem</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {TRILHAS.map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#155E75]/30 p-5">
                <Icon className="size-7 text-gold" strokeWidth={1.5} />
                <span className="font-display text-base font-medium">{t}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="tecnologia" className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
          <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#155E75]/40 via-card to-card p-8 md:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="flex size-12 items-center justify-center rounded-xl border border-gold/50 text-gold">
                <Cpu className="size-6" strokeWidth={1.5} />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-gold">Tecnologia por trás</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                Tecnologia própria e CRM próprio da PO2
              </h2>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Por trás da Academy está a tecnologia que a PO2 desenvolve e usa na sua própria operação, incluindo o
                CRM próprio, que é disponibilizado para a sua operação comercial. O método ensinado vira rotina dentro
                da ferramenta.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/pulse"
                onClick={() => track("academy_cta_pulse")}
                className="inline-flex items-center justify-between gap-6 rounded-xl bg-gold px-7 py-4 text-sm font-medium text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)]"
              >
                Conheça o PO2 Pulse <ArrowRight className="size-4" />
              </Link>
              <a
                href={PO2_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("academy_cta_whatsapp_tec")}
                className="inline-flex items-center justify-between gap-6 rounded-xl border border-white/20 px-7 py-4 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
              >
                Falar com o time <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Comece por aqui</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACESSOS.map(({ to, icon: Icon, t, d }) => (
              <Link key={t} to={to} className="group rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-gold/40">
                <Icon className="size-6 text-gold" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold">
                  Abrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
