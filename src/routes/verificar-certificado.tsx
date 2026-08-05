import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/po2/Nav";
import { Footer } from "@/components/po2/Footer";
import { verifyCertificate } from "@/lib/certificate-verify.functions";
import { ShieldCheck, ShieldX, Loader2, Search } from "lucide-react";

export const Route = createFileRoute("/verificar-certificado")({
  head: () => ({
    meta: [
      { title: "Verificar Certificado — PO2" },
      {
        name: "description",
        content:
          "Confirme a autenticidade de um certificado emitido pela PO2 — Prospecção de Ouro 2.0.",
      },
    ],
  }),
  component: VerifyPage,
});

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "valid"; name: string; eventTitle: string; date?: string }
  | { state: "invalid"; reason?: "not_found" | "not_finished" };

function VerifyPage() {
  const verify = useServerFn(verifyCertificate);
  const [token, setToken] = useState("");
  const [result, setResult] = useState<Result>({ state: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;
    setResult({ state: "loading" });
    try {
      const r = await verify({ data: { token: token.trim() } });
      if (r.valid && r.name && r.eventTitle) {
        setResult({ state: "valid", name: r.name, eventTitle: r.eventTitle, date: r.date });
      } else {
        setResult({ state: "invalid", reason: r.reason });
      }
    } catch {
      setResult({ state: "invalid" });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      <Nav />
      <main>
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-xl px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <ShieldCheck className="size-3" /> Verificação de certificado
            </div>
            <h1 className="mt-4 font-[Instrument_Serif] text-4xl leading-tight md:text-5xl">
              Esse certificado é <span className="italic text-gold">autêntico?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Cola o código de verificação impresso no rodapé do certificado pra confirmar se ele
              foi emitido de verdade pela PO2.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Código de verificação"
                className="flex-1 rounded-full border border-white/10 bg-card/60 px-5 py-3 text-sm outline-none focus:border-gold/60"
              />
              <button
                type="submit"
                disabled={result.state === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] disabled:opacity-60"
              >
                {result.state === "loading" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}
                Verificar
              </button>
            </form>

            {result.state === "valid" && (
              <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/5 p-6 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-gold">
                  <ShieldCheck className="size-5" /> Certificado autêntico
                </div>
                <p className="mt-3 text-sm text-foreground/90">
                  <span className="font-bold">{result.name}</span> participou de{" "}
                  <span className="text-gold">"{result.eventTitle}"</span>
                  {result.date ? `, realizado em ${result.date}` : ""}, emitido pela PO2.
                </p>
              </div>
            )}

            {result.state === "invalid" && (
              <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-400/5 p-6 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-red-300">
                  <ShieldX className="size-5" /> Não foi possível validar
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {result.reason === "not_finished"
                    ? "Esse código existe, mas o certificado ainda não está disponível — o evento não terminou."
                    : "Código não encontrado. Confere se copiou certinho, sem espaços extras."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
