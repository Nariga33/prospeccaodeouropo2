import { useState } from "react";
import { Plus } from "lucide-react";

const goldRule = "h-px w-12 bg-gold/60";

const FAQS = [
  {
    q: "Como terceirizar o time comercial da minha empresa com a PO2?",
    a: "Não terceirizamos vendas — estruturamos a operação de prospecção B2B que seu time já tem (ICP, cadência, script e métricas). Pra quem ainda não tem time formado, também atuamos direto na prospecção ativa enquanto o processo é implementado. É por isso que empresas buscam terceirizar o time comercial com a PO2: método aplicado, não um relatório genérico.",
  },
  {
    q: "Pra que tamanho de empresa a PO2 é indicada?",
    a: "Empresas B2B que já vendem, mas dependem de esforço individual pra gerar oportunidade — de times de 1 vendedor a operações com múltiplos BDR, SDR e closers.",
  },
  {
    q: "Já tenho time comercial. Por que contratar a PO2?",
    a: "A PO2 não substitui seu time — estrutura o método que ele executa: ICP, cadência, script e métricas. Time sem processo vende menos do que poderia, independente do tamanho.",
  },
  {
    q: "Como funciona pro meu segmento?",
    a: "O método se adapta ao ciclo de venda e ao ICP do seu negócio. O diagnóstico gratuito mapeia isso antes de qualquer proposta — sem diagnóstico, sem promessa genérica.",
  },
  {
    q: "O que diferencia a PO2 de uma consultoria comum?",
    a: "Não entregamos só um relatório e vamos embora — participamos da execução, com acompanhamento prático e correção de rota junto com o time.",
  },
  {
    q: "Quanto tempo leva pra aparecer resultado?",
    a: "Depende da maturidade da operação. A maioria dos clientes vê um fluxo mais previsível de oportunidades entre 60 e 90 dias de implementação do método.",
  },
  {
    q: "Vocês garantem resultado de vendas?",
    a: "Não prometemos número de vendas — isso depende de fatores fora do nosso controle, como produto, preço e mercado. O que garantimos é a estruturação do método. Na Mentoria, especificamente, você tem garantia de 7 dias caso ela não seja pra você.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-b border-white/5 bg-surface/40">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <span className={goldRule} /> Dúvidas <span className={goldRule} />
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Tire suas dúvidas{" "}
            <span className="font-display font-normal italic text-gold">antes de começar.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-white/10 bg-card/70 transition-colors hover:border-gold/30"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <Plus
                    className={`size-5 shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
