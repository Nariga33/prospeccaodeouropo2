import logo from "@/assets/po2-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-4">
          <img src={logo} alt="PO2" className="h-10 w-auto" />
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <p className="text-xs text-muted-foreground">Assessoria de Prospecção B2B · Matheus Staruck</p>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} PO2 — Prospecção de Ouro 2.0
        </div>
      </div>
    </footer>
  );
}
