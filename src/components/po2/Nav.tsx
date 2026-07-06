import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/po2-logo.png";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="PO2" className="h-11 w-auto" />
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="/#metodo" className="transition-colors hover:text-gold">Método</a>
          <a href="/#mentoria" className="transition-colors hover:text-gold">Mentoria</a>
          <Link to="/eventos" className="transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>Eventos</Link>
          <a href="/#metodologias" className="transition-colors hover:text-gold">Metodologias</a>
          <a href="/#fundador" className="transition-colors hover:text-gold">Fundador</a>
          <a href="/#casos" className="transition-colors hover:text-gold">Resultados</a>
          <a href="/#planos" className="transition-colors hover:text-gold">Planos</a>
        </nav>

        <DiagnosticDialog trigger={<button className={ctaPrimary}>Diagnóstico gratuito <ArrowRight className="size-4" /></button>} />
      </div>
    </header>
  );
}
