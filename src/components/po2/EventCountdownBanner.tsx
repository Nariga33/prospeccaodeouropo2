import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getPublishedEvents } from "@/lib/events.functions";
import { Calendar, X } from "lucide-react";

const STORAGE_KEY = "po2-countdown-dismissed";
const BANNER_HEIGHT_VAR = "--po2-banner-h";

function useCountdown(target: string | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return useMemo(() => {
    if (!target) return null;
    const diff = new Date(target).getTime() - now;
    if (diff <= 0) return null;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  }, [target, now]);
}

export function EventCountdownBanner() {
  const list = useServerFn(getPublishedEvents);
  const { data } = useQuery({
    queryKey: ["public-events"],
    queryFn: () => list(),
    staleTime: 60_000,
  });

  const nextEvent = useMemo(() => {
    const upcoming = (data ?? [])
      .filter((e) => e.starts_at && new Date(e.starts_at).getTime() > Date.now())
      .sort((a, b) => new Date(a.starts_at!).getTime() - new Date(b.starts_at!).getTime());
    return upcoming[0] ?? null;
  }, [data]);

  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (typeof sessionStorage === "undefined") return;
    setDismissed(sessionStorage.getItem(STORAGE_KEY) === (nextEvent?.id ?? ""));
  }, [nextEvent?.id]);

  const cd = useCountdown(nextEvent?.starts_at ?? null);
  const visible = Boolean(nextEvent && cd && !dismissed);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!visible) {
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, "0px");
      return;
    }
    const el = barRef.current;
    if (!el) return;
    const setHeight = () =>
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, `${el.offsetHeight}px`);
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, "0px");
    };
  }, [visible]);

  if (!visible || !nextEvent || !cd) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      ref={barRef}
      className="sticky top-0 z-[60] border-b border-gold/30 bg-black/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] md:text-xs">
        <a
          href="#eventos"
          className="flex flex-1 items-center gap-3 truncate font-medium text-gold hover:text-gold/80"
        >
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Calendar className="size-3.5" />
            <span className="uppercase tracking-[0.2em] text-gold/70">Próximo evento</span>
          </span>
          <span className="truncate font-[Instrument_Serif] text-sm text-foreground/90 md:text-base">
            {nextEvent.title}
          </span>
          <span className="ml-auto flex items-center gap-1 font-mono tabular-nums text-gold">
            <TimeBlock label="d" value={pad(cd.d)} />
            <span className="opacity-40">:</span>
            <TimeBlock label="h" value={pad(cd.h)} />
            <span className="opacity-40">:</span>
            <TimeBlock label="m" value={pad(cd.m)} />
            <span className="opacity-40">:</span>
            <TimeBlock label="s" value={pad(cd.s)} />
          </span>
        </a>
        <button
          onClick={() => {
            sessionStorage.setItem(STORAGE_KEY, nextEvent.id);
            setDismissed(true);
          }}
          aria-label="Fechar aviso"
          className="rounded-full p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span>{value}</span>
      <span className="text-[9px] uppercase text-gold/60">{label}</span>
    </span>
  );
}
