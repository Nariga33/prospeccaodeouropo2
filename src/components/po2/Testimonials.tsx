import { Star } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const TESTIMONIALS = [
  {
    name: "Diego Martins",
    role: "CEO",
    quote:
      "A PO2 reorganizou completamente nossa operação comercial. Em cerca de cinco meses, já tínhamos um fluxo previsível de oportunidades e um crescimento consistente na receita. O método realmente funciona quando é executado com disciplina.",
  },
  {
    name: "Jonathan Alves",
    role: "Diretor Comercial",
    quote:
      "A mentoria trouxe clareza para todo o time. Melhoramos abordagem, qualificação e acompanhamento das oportunidades. Hoje nossa equipe vende com muito mais confiança e organização.",
  },
  {
    name: "Felipe Andrade",
    role: "CMO",
    quote:
      "Além da prospecção, recebemos feedbacks extremamente valiosos para marketing. Ajustamos campanhas, ICP e comunicação, e percebemos uma melhora significativa na qualidade dos leads gerados.",
  },
  {
    name: "Carlos Henrique",
    role: "CEO",
    quote:
      "O investimento na PO2 retornou rapidamente. A metodologia implantada trouxe previsibilidade ao comercial e impactou diretamente o faturamento da empresa.",
  },
  {
    name: "Thiago Oliveira",
    role: "Diretor Comercial",
    quote:
      "Já contratamos outras consultorias antes, mas nenhuma entregou tanta profundidade na operação. A PO2 participou da construção dos processos e treinou nossa equipe na prática.",
  },
  {
    name: "Rafael Costa",
    role: "CEO",
    quote:
      "O diferencial foi o acompanhamento próximo. Não recebemos apenas um playbook, tivemos uma consultoria que realmente ajudou a executar e corrigir cada etapa da operação comercial.",
  },
  {
    name: "Gustavo Ribeiro",
    role: "CMO",
    quote:
      "As reuniões de alinhamento entre marketing e vendas passaram a fazer sentido. Os feedbacks da PO2 melhoraram nossa geração de demanda e aumentaram a conversão das campanhas.",
  },
  {
    name: "Lucas Fernandes",
    role: "Diretor Comercial",
    quote:
      "Conseguimos estruturar uma operação outbound do zero. Hoje temos processos claros, métricas bem definidas e uma equipe muito mais produtiva.",
  },
  {
    name: "Bruno Carvalho",
    role: "CEO",
    quote:
      "A PO2 nos mostrou que crescimento comercial é consequência de processo. Em poucos meses percebemos aumento na geração de oportunidades e uma evolução clara na receita recorrente.",
  },
  {
    name: "Eduardo Mendes",
    role: "CMO",
    quote:
      "Foi uma parceria estratégica. Recebemos direcionamentos que melhoraram nosso posicionamento, nossas campanhas e a integração entre marketing e comercial. O impacto foi sentido por toda a empresa.",
  },
  {
    name: "Gabriel Moraes",
    role: "BDR",
    quote:
      "Antes da mentoria da PO2 eu fazia ligações sem estratégia e dependia muito da sorte. Hoje consigo estruturar minhas abordagens, quebrar objeções com segurança e conduzir conversas muito mais qualificadas.",
  },
  {
    name: "Vinícius Ferreira",
    role: "BDR",
    quote:
      "A mentoria mudou completamente minha forma de enxergar prospecção. Aprendi a estudar o cliente, personalizar abordagens e construir cadências que realmente geram respostas.",
  },
];

function initials(name: string) {
  const parts = name.trim().split(" ");
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-white/10 bg-card/70 p-6 md:w-[360px]">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-gold text-gold" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-display text-sm text-gold">
          {initials(t.name)}
        </div>
        <div>
          <div className="text-sm font-bold text-foreground">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const track = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="border-b border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Depoimentos <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Quem já passou pelo{" "}
            <span className="font-display font-normal italic text-gold">método.</span>
          </h2>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-32" />
        <div className="po2-marquee flex w-max gap-5 px-6">
          {track.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
