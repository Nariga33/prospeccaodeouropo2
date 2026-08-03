import { Check, ShieldCheck, MessageCircle } from "lucide-react";
import { PO2_WHATSAPP_URL } from "@/lib/contact";

const goldRule = "h-px w-12 bg-gold/60";

const STACK = [
  {
    title: "Diagnóstico ao vivo individual",
    desc: "Sessão de imersão na sua operação — funil, cadência e onde o dinheiro está travando.",
    value: "R$ 697",
  },
  {
    title: "8 módulos completos da mentoria",
    desc: "Do pitch de 4 blocos à gestão de indicadores — ao vivo, com gravação.",
    value: "R$ 1.497",
  },
  {
    title: "Templates e planilhas práticas",
    desc: "Call guide, matriz de cadência, matriz de objeções e mais.",
    value: "R$ 397",
  },
  {
    title: "Acompanhamento prático",
    desc: "Correção de rota entre sessões — não é só teoria gravada.",
    value: "R$ 497",
  },
  {
    title: "Comunidade PO2",
    desc: "Acesso contínuo, grupo temático e rede de quem já passou pelo método.",
    value: "Inestimável",
  },
];

const TOTAL = "R$ 3.088";
const PRICE = "R$ 497";
const INSTALLMENT = "12x de R$ 41,42";

export function MentoriaOffer() {
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> A oferta <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Veja tudo o que você{" "}
            <span className="font-display font-normal italic text-gold">vai receber.</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-card/70">
          <div className="divide-y divide-white/5">
            {STACK.map((item) => (
              <div key={item.title} className="flex items-start justify-between gap-6 p-6">
                <div className="flex gap-4">
                  <Check className="mt-1 size-4 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-md bg-white/5 px-2.5 py-1 text-xs font-semibold text-muted-foreground line-through">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gold/20 bg-gradient-to-b from-gold/10 to-card/90 p-8 text-center">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Valor total
            </div>
            <div className="mt-1 font-display text-2xl text-muted-foreground line-through decoration-red-400/70">
              {TOTAL}
            </div>

            <div className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-gold">
              Mas hoje você garante por
            </div>
            <div className="mt-2 font-display text-6xl text-foreground">{PRICE}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              ou {INSTALLMENT} · vaga individual
            </div>

            <a
              href={PO2_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_50px_rgba(197,160,89,0.45)] active:scale-[0.98]"
            >
              <MessageCircle className="size-4" /> Quero garantir minha vaga
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Vagas limitadas — acompanhamento é individual, não escalável em massa.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-gold/30 bg-card/50 p-8 text-center">
          <span className="flex size-16 items-center justify-center rounded-full border-2 border-gold/50 bg-gold/10 text-gold">
            <ShieldCheck className="size-7" />
          </span>
          <h3 className="font-display text-2xl text-foreground">
            Ou vale a pena, ou seu dinheiro de volta.
          </h3>
          <p className="max-w-md text-sm text-muted-foreground">
            7 dias de garantia. Se por qualquer motivo você achar que a mentoria não é pra você,
            devolvemos o valor investido — sem burocracia.
          </p>
        </div>
      </div>
    </section>
  );
}
