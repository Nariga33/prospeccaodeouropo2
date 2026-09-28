import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import matheusPhoto from "@/assets/matheus-staruck.jpg";
import joaoPhoto from "@/assets/joao-victor-acunha.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Person = {
  key: string;
  tab: string;
  name: string;
  role: string;
  photo: string;
  width: number;
  height: number;
  alt: string;
  body: ReactNode;
};

const strong = "font-semibold text-foreground";

const PEOPLE: Person[] = [
  {
    key: "matheus",
    tab: "Matheus Staruck",
    name: "Matheus Staruck",
    role: "Founder & CEO — PO2 Prospecção de Ouro 2.0",
    photo: matheusPhoto,
    width: 748,
    height: 935,
    alt: "Matheus Staruck, Founder & CEO da PO2",
    body: (
      <>
        <p>
          Nasci em Torres, Rio Grande do Sul, mas fui criado em Arroio do Sal. Sou filho de um
          construtor civil e de uma professora que, ao longo do tempo, se tornou empresária no
          segmento de eventos — foi acompanhando essa trajetória que aprendi desde cedo sobre
          relacionamento com clientes, negociação e fechamento de contratos.
        </p>
        <p>
          Meu lado empreendedor começou muito cedo: desde os 12 anos eu buscava maneiras de ganhar
          dinheiro fazendo pequenos serviços e negociando produtos no Marketplace do Facebook — o
          "Brick", como a gente chama aqui no sul. Depois vieram os estudos em Tecnologia da
          Informação e a manutenção de computadores pra conhecidos e familiares, até passar pelo
          varejo.
        </p>
        <p>
          Foi na Hub7 que mergulhei de vez no universo da prospecção B2B, outbound e desenvolvimento
          comercial — participando da construção de operações comerciais, estruturação de processos,
          criação de cadências, treinamento de equipes e negociações estratégicas.
        </p>
        <p>
          Toda essa experiência resultou na criação da PO2, onde hoje ajudo empresas a criarem
          operações comerciais previsíveis através de metodologia, processos, tecnologia e
          inteligência comercial.
        </p>
      </>
    ),
  },
  {
    key: "joao",
    tab: "João Victor Acunha",
    name: "João Victor Acunha",
    role: "Vendas consultivas · Geração de demanda · Global Markets",
    photo: joaoPhoto,
    width: 800,
    height: 1000,
    alt: "João Victor Acunha, especialista em vendas consultivas, geração de demanda e Global Markets",
    body: (
      <>
        <p>
          <span className={strong}>João Victor Acunha</span> é especialista em{" "}
          <span className={strong}>vendas consultivas, geração de demanda e Global Markets</span>.
        </p>
        <p>
          Já atuou em operações <span className={strong}>high-ticket</span> e, durante sua passagem
          pela <span className={strong}>ExitLag</span>, gerou{" "}
          <span className={strong}>+200 reuniões com ICP definido e decisores corretos</span>, além
          de participar da construção de parcerias com grandes marcas, como{" "}
          <span className={strong}>Banco Inter</span>, e contribuir para mais de{" "}
          <span className={strong}>US$ 3 milhões em receita previsível</span>.
        </p>
        <p>
          Hoje, leva essa experiência para ajudar profissionais e empresas a{" "}
          <span className={strong}>
            gerar oportunidades qualificadas, acessar decisores e transformar prospecção em receita
          </span>
          .
        </p>
      </>
    ),
  },
];

export function FounderCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [heights, setHeights] = useState<number[]>([]);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cada slide tem a própria altura — o container se ajusta ao slide ativo pra não sobrar
  // espaço vazio embaixo do texto mais curto.
  useEffect(() => {
    const measure = () => setHeights(slideRefs.current.map((el) => el?.offsetHeight ?? 0));
    measure();
    const ro = new ResizeObserver(measure);
    slideRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4 md:mb-8">
        <div className="flex flex-wrap gap-2">
          {PEOPLE.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-current={selected === i}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                selected === i
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.tab}
            </button>
          ))}
        </div>

        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={selected === 0}
            aria-label="Anterior"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:text-gold disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={selected === PEOPLE.length - 1}
            aria-label="Próximo"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:text-gold disabled:opacity-30"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <p
        className={`mb-6 text-xs text-muted-foreground md:hidden ${selected === 0 ? "" : "invisible"}`}
        aria-hidden={selected !== 0}
      >
        Arraste pro lado → conheça o João Victor
      </p>

      <div
        className="overflow-hidden transition-[height] duration-300 motion-reduce:transition-none"
        style={{ height: heights[selected] || undefined }}
      >
        <Carousel setApi={setApi} opts={{ align: "start", loop: false }}>
          <CarouselContent className="ml-0 items-start" style={{ touchAction: "pan-y pinch-zoom" }}>
            {PEOPLE.map((p, i) => (
              <CarouselItem
                key={p.key}
                className="pl-0"
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
              >
                <div className="grid gap-12 bg-[radial-gradient(ellipse_at_50%_20%,rgba(197,160,89,0.10),transparent_55%)] px-1 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:bg-[radial-gradient(ellipse_at_22%_45%,rgba(197,160,89,0.10),transparent_50%)]">
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                      <img
                        src={p.photo}
                        alt={p.alt}
                        width={p.width}
                        height={p.height}
                        loading={i === 0 ? undefined : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-5xl text-foreground">{p.name}</h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                      {p.role}
                    </p>
                    <div className="mt-6 space-y-4 text-muted-foreground">{p.body}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
