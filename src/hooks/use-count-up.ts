import { useEffect, useRef, useState } from "react";

/**
 * Parses a display value like "+R$ 2M", "+100k", "+1k" into
 * { prefix, target, suffix } so we can animate just the number.
 */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(\D*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value, decimals: 0 };
  const [, prefix, num, suffix] = match;
  const normalized = num.replace(/\./g, "").replace(",", ".");
  const target = parseFloat(normalized);
  const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0;
  return { prefix, target, suffix, decimals };
}

function format(n: number, decimals: number) {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function useCountUp(value: string, duration = 1500) {
  const { prefix, target, suffix, decimals } = parse(value);
  const [display, setDisplay] = useState(`${prefix}${format(0, decimals)}${suffix}`);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = target * eased;
              setDisplay(`${prefix}${format(current, decimals)}${suffix}`);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(`${prefix}${format(target, decimals)}${suffix}`);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [prefix, target, suffix, decimals, duration]);

  return { ref, display };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
