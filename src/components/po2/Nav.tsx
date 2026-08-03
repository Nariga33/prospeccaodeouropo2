import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Phone } from "lucide-react";
import logo from "@/assets/po2-logo.png";
import { DiagnosticDialog } from "@/components/po2/DiagnosticDialog";
import { PO2_PHONE_DISPLAY, PO2_WHATSAPP_URL } from "@/lib/contact";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

const LINKS = [
  { href: "/#metodo", label: "Método" },
  { href: "/mentoria", label: "Mentoria", isRoute: true },
  { href: "/eventos", label: "Eventos", isRoute: true },
  { href: "/#metodologias", label: "Metodologias" },
  { href: "/#fundador", label: "Sobre" },
  { href: "/#casos", label: "Resultados" },
  { href: "/parceiros", label: "Parceiros", isRoute: true },
  { href: "/#planos", label: "Planos" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="PO2" className="h-11 w-auto" />
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
          {LINKS.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="transition-colors hover:text-gold">
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <DiagnosticDialog
              trigger={
                <button className={ctaPrimary}>
                  Diagnóstico gratuito <ArrowRight className="size-4" />
                </button>
              }
            />
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menu"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2.5 text-foreground transition-colors hover:bg-white/10 md:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[85vw] max-w-sm flex-col border-white/10 bg-background sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle className="text-left">
                  <img src={logo} alt="PO2" className="h-9 w-auto" />
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-1 flex-col gap-1 text-base font-medium">
                {LINKS.map((link) =>
                  link.isRoute ? (
                    <SheetClose asChild key={link.label}>
                      <Link
                        to={link.href}
                        className="rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild key={link.label}>
                      <a
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ),
                )}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-5">
                <a
                  href={PO2_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <Phone className="size-4" /> {PO2_PHONE_DISPLAY}
                </a>
                <SheetClose asChild>
                  <DiagnosticDialog
                    trigger={
                      <button className={`${ctaPrimary} w-full justify-center`}>
                        Diagnóstico gratuito <ArrowRight className="size-4" />
                      </button>
                    }
                  />
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
