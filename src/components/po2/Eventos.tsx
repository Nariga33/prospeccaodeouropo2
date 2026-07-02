import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPublishedEvents, registerForEvent, type PublicEvent } from "@/lib/events.functions";
import defaultCover from "@/assets/masterclass-po2.jpg";
import { Calendar, Gift, Sparkles, Loader2, ExternalLink, Users2, X } from "lucide-react";
import { toast } from "sonner";

function formatDate(iso: string | null) {
  if (!iso) return "Em breve";
  try {
    return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" });
  } catch { return "Em breve"; }
}

export function Eventos() {
  const list = useServerFn(getPublishedEvents);
  const { data, isLoading } = useQuery({ queryKey: ["public-events"], queryFn: () => list() });
  const [active, setActive] = useState<PublicEvent | null>(null);

  return (
    <section id="eventos" className="border-t border-white/5 bg-gradient-to-b from-black to-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <Sparkles className="size-3" /> Eventos ao vivo
          </div>
          <h2 className="mt-4 font-[Instrument_Serif] text-4xl leading-tight md:text-5xl">
            Aprenda com quem vive prospecção todos os dias.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Masterclasses online, gratuitas e limitadas. Inscreva-se para receber o link do Meet e do grupo no WhatsApp.
          </p>
        </div>

        <div className="mt-14">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Carregando eventos…
            </div>
          ) : (data?.length ?? 0) === 0 ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <Calendar className="mx-auto size-6 text-gold" />
              <p className="mt-3 text-sm text-muted-foreground">
                Nenhum evento agendado no momento. Em breve novas masterclasses.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data!.map((ev) => (
                <EventCard key={ev.id} event={ev} onOpen={() => setActive(ev)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {active && <RegisterDialog event={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function EventCard({ event, onOpen }: { event: PublicEvent; onOpen: () => void }) {
  const cover = event.image_url || defaultCover;
  return (
    <button
      onClick={onOpen}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left transition-all hover:border-gold/40 hover:shadow-[0_0_40px_rgba(197,160,89,0.15)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <img src={cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs backdrop-blur">
          {event.is_free ? <><Gift className="size-3 text-gold" /> <span className="text-gold">Gratuito</span></> : <span className="text-gold">{event.investment_label ?? "Investimento"}</span>}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3" /> {formatDate(event.starts_at)}
        </div>
        <h3 className="mt-2 font-[Instrument_Serif] text-2xl leading-tight">{event.title}</h3>
        {event.subtitle && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{event.subtitle}</p>}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
          Quero participar <ExternalLink className="size-3" />
        </span>
      </div>
    </button>
  );
}

function RegisterDialog({ event, onClose }: { event: PublicEvent; onClose: () => void }) {
  const register = useServerFn(registerForEvent);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [whatsapp, setWhatsapp] = useState("");
  const [result, setResult] = useState<{ meet_url: string | null; whatsapp_url: string | null } | null>(null);

  const mut = useMutation({
    mutationFn: () => register({ data: { eventId: event.id, name, email, whatsapp } }),
    onSuccess: (r: any) => setResult({ meet_url: r.meet_url, whatsapp_url: r.whatsapp_url }),
    onError: (e: any) => toast.error(e.message ?? "Não foi possível inscrever"),
  });

  const cover = event.image_url || defaultCover;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-background">
        <div className="relative">
          <img src={cover} alt="" className="h-48 w-full object-cover md:h-56" />
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-black/60 p-2 backdrop-blur"><X className="size-4" /></button>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-gold">
              {event.is_free ? <>Gratuito</> : <>{event.investment_label ?? "Investimento"}</>}
            </div>
            <h3 className="mt-2 font-[Instrument_Serif] text-2xl md:text-3xl">{event.title}</h3>
          </div>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            {event.subtitle && <p className="text-sm font-semibold text-gold">{event.subtitle}</p>}
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="size-3" /> {formatDate(event.starts_at)}
            </div>
            <div className="prose prose-invert mt-4 max-w-none whitespace-pre-wrap text-sm text-muted-foreground">
              {event.description}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            {!result ? (
              <>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  <Users2 className="size-3" /> Vagas limitadas
                </div>
                <h4 className="mt-2 text-lg font-semibold">Garanta sua vaga</h4>
                <p className="mt-1 text-xs text-muted-foreground">Preencha para receber o link do Meet e do grupo.</p>
                <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); mut.mutate(); }}>
                  <input required placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                  <input required type="email" placeholder="Seu melhor email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                  <input required placeholder="WhatsApp com DDD" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputCls} />
                  <button disabled={mut.isPending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-gold-foreground disabled:opacity-60">
                    {mut.isPending && <Loader2 className="size-4 animate-spin" />} Confirmar inscrição
                  </button>
                </form>
              </>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-emerald-400"><Sparkles className="size-4" /> <span className="text-sm font-semibold">Inscrição confirmada!</span></div>
                <p className="mt-2 text-xs text-muted-foreground">Salve os links abaixo — enviaremos também por email.</p>
                <div className="mt-4 space-y-3">
                  {result.meet_url ? (
                    <a href={result.meet_url} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-gold-foreground">
                      Entrar no Google Meet <ExternalLink className="size-4" />
                    </a>
                  ) : (
                    <div className="rounded-lg border border-white/10 p-3 text-xs text-muted-foreground">Link do Meet será enviado por email.</div>
                  )}
                  {result.whatsapp_url ? (
                    <a href={result.whatsapp_url} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-300">
                      Entrar no grupo do WhatsApp <ExternalLink className="size-4" />
                    </a>
                  ) : (
                    <div className="rounded-lg border border-white/10 p-3 text-xs text-muted-foreground">Grupo do WhatsApp em breve.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-gold/60";
