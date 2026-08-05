import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getPublishedEvents,
  registerForEvent,
  findCertificateByEmail,
  type PublicEvent,
} from "@/lib/events.functions";
import defaultCover from "@/assets/masterclass-po2.jpg";
import {
  Calendar,
  Sparkles,
  Loader2,
  ExternalLink,
  Users2,
  X,
  CalendarPlus,
  Download,
  Award,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { googleCalendarUrl, buildIcs, downloadIcs, formatPriceCents } from "@/lib/calendar";

function formatDate(iso: string | null) {
  if (!iso) return "Em breve";
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Em breve";
  }
}

function shortDate(iso: string | null) {
  if (!iso) return { day: "—", month: "" };
  const d = new Date(iso);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleString("pt-BR", { month: "short" }).replace(".", "").toUpperCase(),
  };
}

function isPast(iso: string | null) {
  if (!iso) return false;
  return new Date(iso).getTime() < Date.now();
}

export function Eventos() {
  const list = useServerFn(getPublishedEvents);
  const { data, isLoading } = useQuery({ queryKey: ["public-events"], queryFn: () => list() });
  const [active, setActive] = useState<PublicEvent | null>(null);
  const [certFor, setCertFor] = useState<PublicEvent | null>(null);

  return (
    <section
      id="eventos"
      className="border-t border-white/5 bg-gradient-to-b from-black to-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <Sparkles className="size-3" /> Convite oficial PO2
          </div>
          <h2 className="mt-4 font-[Instrument_Serif] text-4xl leading-tight md:text-5xl">
            Encontros ao vivo com quem vive prospecção todos os dias.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Masterclasses online, íntimas e limitadas. Inscreva-se para receber o link do Meet,
            adicionar à agenda e garantir seu certificado de participação.
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
                <EventCard
                  key={ev.id}
                  event={ev}
                  onOpen={() => setActive(ev)}
                  onCertificate={() => setCertFor(ev)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {active && <RegisterDialog event={active} onClose={() => setActive(null)} />}
      {certFor && <CertificateDialog event={certFor} onClose={() => setCertFor(null)} />}
    </section>
  );
}

function PriceTag({ event, size = "sm" }: { event: PublicEvent; size?: "sm" | "lg" }) {
  const full = formatPriceCents(event.price_full_cents);
  const promo = formatPriceCents(event.price_promo_cents);
  const note = event.price_note ?? "Cortesia PO2";

  if (!full && !promo) return null;

  const bigCls = size === "lg" ? "text-2xl font-bold text-gold" : "text-sm font-bold text-gold";
  const strikeCls =
    size === "lg"
      ? "text-base text-muted-foreground/80 line-through"
      : "text-[11px] text-muted-foreground/80 line-through";

  return (
    <div className="flex items-baseline gap-2">
      {full && promo && full !== promo && <span className={strikeCls}>{full}</span>}
      <span className={bigCls}>{promo ?? full}</span>
      {size === "lg" && note && (
        <span className="text-xs uppercase tracking-widest text-gold/70">· {note}</span>
      )}
    </div>
  );
}

function EventCard({
  event,
  onOpen,
  onCertificate,
}: {
  event: PublicEvent;
  onOpen: () => void;
  onCertificate: () => void;
}) {
  const cover = event.image_url || defaultCover;
  const d = shortDate(event.starts_at);
  const past = isPast(event.ends_at);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-gold/40 hover:shadow-[0_0_40px_rgba(197,160,89,0.15)]">
      <button
        onClick={onOpen}
        className="relative aspect-[16/9] overflow-hidden bg-black text-left"
      >
        <img
          src={cover}
          alt=""
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== defaultCover) e.currentTarget.src = defaultCover;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <div className="flex flex-col items-center rounded-md border border-gold/40 bg-black/70 px-2 py-1 text-gold backdrop-blur">
            <span className="font-[Instrument_Serif] text-lg leading-none">{d.day}</span>
            <span className="text-[9px] uppercase tracking-widest">{d.month}</span>
          </div>
          <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-gold/90 backdrop-blur">
            Vagas limitadas
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <PriceTag event={event} />
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3 text-gold" /> {formatDate(event.starts_at)}
        </div>
        <h3 className="mt-2 font-[Instrument_Serif] text-2xl leading-tight">{event.title}</h3>
        {event.subtitle && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{event.subtitle}</p>
        )}
        {event.location && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3 text-gold" /> {event.location}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={onOpen}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-gold-foreground"
          >
            Quero participar <ExternalLink className="size-3" />
          </button>
          {event.whatsapp_url && (
            <a
              href={event.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              title="Solicitar informações via WhatsApp"
              className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/5 px-3 py-2 text-xs font-semibold text-gold hover:bg-gold/10"
            >
              <MessageCircle className="size-3.5" />
            </a>
          )}
          {past && (
            <button
              onClick={onCertificate}
              title="Baixar certificado"
              className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/5 px-3 py-2 text-xs font-semibold text-gold hover:bg-gold/10"
            >
              <Award className="size-3.5" /> Certificado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InvitationHeader({ event }: { event: PublicEvent }) {
  return (
    <div className="relative border-b border-gold/20 bg-gradient-to-b from-black to-background px-8 py-10 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15),transparent_60%)]" />
      <div className="relative">
        <div className="mx-auto mb-4 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-8 bg-gold/50" /> Convite oficial PO2{" "}
          <span className="h-px w-8 bg-gold/50" />
        </div>
        <p className="font-[Instrument_Serif] text-xl italic text-white/70">
          Você está convidado(a) para a
        </p>
        <h3 className="mt-1 font-[Instrument_Serif] text-3xl leading-tight text-white md:text-4xl">
          {event.title}
        </h3>
        {event.subtitle && <p className="mt-3 text-sm text-gold/90">{event.subtitle}</p>}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/40 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
          <Calendar className="size-3.5 text-gold" /> {formatDate(event.starts_at)}
        </div>
        {event.location && (
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/40 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
            <MapPin className="size-3.5 text-gold" /> {event.location}
          </div>
        )}
      </div>
    </div>
  );
}

function RegisterDialog({ event, onClose }: { event: PublicEvent; onClose: () => void }) {
  const register = useServerFn(registerForEvent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [result, setResult] = useState<{
    meet_url: string | null;
    whatsapp_url: string | null;
    certificate_token: string | null;
  } | null>(null);
  const [whatsappGateOpen, setWhatsappGateOpen] = useState(false);

  const mut = useMutation({
    mutationFn: () => register({ data: { eventId: event.id, name, email, whatsapp } }),
    onSuccess: (r: any) => {
      setResult({
        meet_url: r.meet_url,
        whatsapp_url: r.whatsapp_url,
        certificate_token: r.certificate_token,
      });
      if (r.whatsapp_url) setWhatsappGateOpen(true);
    },
    onError: (e: any) => toast.error(e.message ?? "Não foi possível inscrever"),
  });

  const gcalUrl = useMemo(
    () =>
      event.starts_at
        ? googleCalendarUrl({
            title: event.title,
            description:
              (event.subtitle ? event.subtitle + "\n\n" : "") + (event.description ?? ""),
            location: "Google Meet",
            startsAt: event.starts_at,
            endsAt: event.ends_at ?? null,
          })
        : null,
    [event],
  );

  function handleIcs() {
    if (!event.starts_at) return;
    const ics = buildIcs({
      uid: `${event.id}@po2`,
      title: event.title,
      description: (event.subtitle ? event.subtitle + "\n\n" : "") + (event.description ?? ""),
      location: "Google Meet",
      startsAt: event.starts_at,
      endsAt: event.ends_at ?? null,
    });
    downloadIcs(`${event.slug}.ics`, ics);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
      {whatsappGateOpen && result?.whatsapp_url && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-emerald-500/30 bg-background p-7 text-center shadow-[0_0_80px_rgba(16,185,129,0.15)]">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              <MessageCircle className="size-5" />
            </div>
            <h4 className="mt-4 font-[Instrument_Serif] text-2xl">Presença confirmada!</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Entra no grupo do WhatsApp pra receber lembretes e avisos desse evento.
            </p>
            <a
              href={result.whatsapp_url}
              target="_blank"
              rel="noreferrer"
              onClick={() => setWhatsappGateOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-black hover:bg-emerald-400"
            >
              <MessageCircle className="size-4" /> Entrar no grupo do WhatsApp
            </a>
            <button
              onClick={() => setWhatsappGateOpen(false)}
              className="mt-3 w-full text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Já entrei, continuar
            </button>
          </div>
        </div>
      )}
      <div className="my-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/20 bg-background shadow-[0_0_80px_rgba(197,160,89,0.15)]">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 backdrop-blur hover:bg-black/80"
          >
            <X className="size-4" />
          </button>
          <InvitationHeader event={event} />
        </div>

        <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
              <span className="h-px w-6 bg-gold/50" /> O convite
            </div>
            <article className="prose prose-invert prose-sm max-w-none prose-headings:font-[Instrument_Serif] prose-headings:text-gold prose-h2:text-2xl prose-h3:text-xl prose-h3:mt-6 prose-p:text-muted-foreground prose-strong:text-white prose-li:marker:text-gold">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {event.description || "*Descrição em breve.*"}
              </ReactMarkdown>
            </article>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <PriceTag event={event} size="lg" />
              <div className="text-right text-xs text-muted-foreground">
                <div className="flex items-center gap-1 text-gold">
                  <Users2 className="size-3" /> Vagas limitadas
                </div>
                {event.capacity && <div className="mt-1">Máx. {event.capacity} participantes</div>}
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-gold/20 bg-white/[0.02] p-6">
            {!result ? (
              <>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  <Sparkles className="size-3" /> RSVP
                </div>
                <h4 className="mt-2 font-[Instrument_Serif] text-2xl">Confirme sua presença</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Preencha para receber o link do Meet, a agenda e o certificado.
                </p>
                <form
                  className="mt-5 space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    mut.mutate();
                  }}
                >
                  <input
                    required
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCls}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />
                  <input
                    required
                    placeholder="WhatsApp com DDD"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={inputCls}
                  />
                  <button
                    disabled={mut.isPending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-gold-foreground disabled:opacity-60"
                  >
                    {mut.isPending && <Loader2 className="size-4 animate-spin" />}
                    Confirmar inscrição
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground">
                    Ao se inscrever você concorda em receber comunicações da PO2 sobre este evento.
                  </p>
                </form>
              </>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Sparkles className="size-4" />
                  <span className="text-sm font-semibold">Presença confirmada!</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Salve os links abaixo — enviaremos também por email.
                </p>

                <div className="mt-4 space-y-3">
                  {result.meet_url ? (
                    <a
                      href={result.meet_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-gold-foreground"
                    >
                      Entrar no Google Meet <ExternalLink className="size-4" />
                    </a>
                  ) : (
                    <div className="rounded-lg border border-white/10 p-3 text-xs text-muted-foreground">
                      Link do Meet será enviado por email.
                    </div>
                  )}

                  {result.whatsapp_url ? (
                    <a
                      href={result.whatsapp_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-300"
                    >
                      Entrar no WhatsApp <ExternalLink className="size-4" />
                    </a>
                  ) : (
                    <div className="rounded-lg border border-white/10 p-3 text-xs text-muted-foreground">
                      Grupo do WhatsApp em breve.
                    </div>
                  )}

                  {gcalUrl && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <a
                        href={gcalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/90 hover:border-gold/40 hover:text-gold"
                      >
                        <CalendarPlus className="size-3.5" /> Google Agenda
                      </a>
                      <button
                        onClick={handleIcs}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/90 hover:border-gold/40 hover:text-gold"
                      >
                        <Download className="size-3.5" /> Baixar .ics
                      </button>
                    </div>
                  )}

                  {result.certificate_token && (
                    <div className="mt-3 rounded-xl border border-gold/20 bg-gold/5 p-3 text-xs text-white/80">
                      <div className="flex items-center gap-1.5 font-semibold text-gold">
                        <Award className="size-3.5" /> Seu certificado
                      </div>
                      <p className="mt-1 text-muted-foreground">
                        Após o término do evento, seu certificado ficará disponível para download
                        aqui.
                      </p>
                      {isPast(event.ends_at) && (
                        <a
                          href={`/api/public/certificate/${result.certificate_token}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-gold-foreground"
                        >
                          <Download className="size-3" /> Baixar agora
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function CertificateDialog({ event, onClose }: { event: PublicEvent; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const find = useServerFn(findCertificateByEmail);
  const [status, setStatus] = useState<"idle" | "loading" | "notfound">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await find({ data: { eventId: event.id, email } });
      if (!res.token) {
        setStatus("notfound");
        return;
      }
      window.open(`/api/public/certificate/${res.token}`, "_blank");
      onClose();
    } catch {
      setStatus("notfound");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gold/20 bg-background p-8 text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-black/60 p-2"
          aria-label="Fechar"
        >
          <X className="size-4" />
        </button>
        <Award className="mx-auto size-8 text-gold" />
        <h3 className="mt-3 font-[Instrument_Serif] text-2xl">Baixar meu certificado</h3>
        <p className="mt-1 text-sm text-muted-foreground">{event.title}</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            required
            type="email"
            placeholder="Email usado na inscrição"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
          <button
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-gold-foreground disabled:opacity-60"
          >
            {status === "loading" && <Loader2 className="size-4 animate-spin" />}
            <Download className="size-4" /> Gerar certificado
          </button>
          {status === "notfound" && (
            <p className="text-xs text-red-400">
              Não encontramos uma inscrição com esse email para este evento.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-gold/60";
