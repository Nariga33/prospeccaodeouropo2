import { ExternalLink, Sparkles } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

export function Partners() {
  const partners = [
    {
      key: "nex",
      name: "Clube NEX",
      wordmark: "NEX",
      tag: "Rede & Mentoria",
      url: "https://clubenex.com.br/",
      desc: "Clube fechado de empresários, por aplicação. Encontros semanais, eventos presenciais trimestrais e mentoria entre pares — networking estratégico, não troca de cartão.",
      fit: "Indicado se você já vende bem, mas cresce sozinho e sente falta de gente que já passou pelos mesmos gargalos.",
    },
    {
      key: "vendasteam",
      name: "Vendas.team",
      wordmark: "vendas.team",
      tag: "Plataforma & Tecnologia",
      url: "https://www.vendas.team/",
      desc: "Plataforma comercial com IA nativa — CRM, cadências, enriquecimento de leads e dashboards num só lugar, do primeiro contato ao fechamento.",
      fit: "Indicado se o método já está definido (é aí que entra a PO2) e falta a tecnologia pra rodar isso em escala.",
    },
  ];
  return (
    <section id="parceiros" className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              <span className={goldRule} /> Parceiros
            </div>
            <h2 className="max-w-2xl text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              A PO2 estrutura o método.{" "}
              <span className="font-display font-normal italic text-gold">
                Eles completam o resto.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Indicações de confiança pra quem quer ir além do método — rede pra crescer e plataforma
            pra executar em escala.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {partners.map((p) => (
            <a
              key={p.key}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-white/10 bg-card/70 p-8 transition-all hover:-translate-y-1 hover:border-gold/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                  {p.tag}
                </span>
                <ExternalLink className="size-4 text-muted-foreground transition-colors group-hover:text-gold" />
              </div>

              <div className="mt-6 font-display text-3xl text-foreground">{p.wordmark}</div>

              <p className="mt-4 text-sm text-muted-foreground">{p.desc}</p>

              <div className="mt-5 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <Sparkles className="mt-0.5 size-3.5 shrink-0 text-gold" />
                <p className="text-xs text-foreground/80">{p.fit}</p>
              </div>

              <span className="mt-6 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 transition-colors group-hover:text-gold">
                Visitar {p.name} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
