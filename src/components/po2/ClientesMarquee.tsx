import hub7 from "@/assets/clientes/hub7.webp";
import estrela from "@/assets/clientes/estrela.webp";
import nummy from "@/assets/clientes/nummy.webp";
import anel from "@/assets/clientes/anel.webp";
import cr from "@/assets/clientes/cr-advocacias.webp";
import sunnyhub from "@/assets/clientes/sunnyhub.webp";
import sebrae from "@/assets/clientes/sebrae.webp";

const CLIENTES = [
  { src: anel, alt: "O2 Inc", h: "h-9" },
  { src: cr, alt: "CR Advocacias", h: "h-12" },
  { src: estrela, alt: "CollaborAI", h: "h-10" },
  { src: hub7, alt: "Hub7", h: "h-12" },
  { src: nummy, alt: "Nummy", h: "h-9" },
  { src: sebrae, alt: "Sebrae", h: "h-11" },
  { src: sunnyhub, alt: "SunnyHub", h: "h-7" },
];

export function ClientesMarquee() {
  const row = (suffix: string, hidden = false) =>
    CLIENTES.map((c) => (
      <img
        key={c.alt + suffix}
        src={c.src}
        alt={hidden ? "" : c.alt}
        aria-hidden={hidden || undefined}
        loading="lazy"
        className={`${c.h} mx-8 w-auto shrink-0 object-contain opacity-70 transition-opacity hover:opacity-100 md:mx-12`}
      />
    ));
  return (
    <section id="clientes" aria-label="Clientes que confiam" className="border-b border-white/5 bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground md:text-xs">
          Clientes que confiam
        </div>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="po2-marquee flex w-max items-center">
          {row("a")}
          {row("b", true)}
        </div>
      </div>
    </section>
  );
}
