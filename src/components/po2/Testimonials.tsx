import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
      "Antes da mentoria da PO2 eu fazia ligações sem estratégia e dependia muito da sorte. Hoje consigo estruturar minhas abordagens, quebrar objeções com segurança e conduzir conversas muito mais qualificadas. Em menos de dois meses aumentei significativamente o número de reuniões agendadas e minha confiança em cada ligação.",
  },
  {
    name: "Vinícius Ferreira",
    role: "BDR",
    quote:
      "A mentoria mudou completamente minha forma de enxergar prospecção. Aprendi a estudar o cliente, personalizar abordagens e construir cadências que realmente geram respostas. O acompanhamento individual e os feedbacks práticos aceleraram muito minha evolução. Hoje me sinto preparado para gerar resultados consistentes em qualquer operação outbound.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const go = (delta: number) => {
    setActive((p) => (p + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[active];

  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Depoimentos <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Quem já passou pelo{" "}
            <span className="font-display font-normal italic text-gold">método.</span>
          </h2>
        </div>

        <div
          className="relative rounded-3xl border border-gold/20 bg-card/70 p-8 md:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="size-9 text-gold/30" />

          <p
            key={active}
            className="mt-6 min-h-[140px] text-balance font-[Instrument_Serif] text-xl leading-relaxed text-foreground/90 md:text-2xl"
          >
            "{current.quote}"
          </p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-lg text-gold">{current.name}</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {current.role}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Depoimento anterior"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-gold transition-colors hover:border-gold/40"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo depoimento"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-gold transition-colors hover:border-gold/40"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-1.5">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ir para depoimento de ${t.name}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
