import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Revela o conteúdo com fade + subida quando entra na tela.
 * SSR e sem JS: conteúdo sempre visível. Só esconde o que está abaixo da dobra
 * no momento da montagem, então nada "pisca". Respeita prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<"livre" | "oculto" | "visivel">("livre");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setEstado("oculto");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEstado("visivel");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    estado === "oculto"
      ? { opacity: 0, transform: "translateY(28px)" }
      : estado === "visivel"
        ? {
            opacity: 1,
            transform: "none",
            transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
          }
        : undefined;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/** Halo de luz petróleo + grade sutil com máscara radial, para fundos de seção. */
export function Halo({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[900px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#155E75]/25 blur-[140px]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, #000 30%, transparent 75%)",
          maskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, #000 30%, transparent 75%)",
        }}
      />
    </div>
  );
}
