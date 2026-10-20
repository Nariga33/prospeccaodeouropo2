import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Phone } from "lucide-react";
import logoBranco from "@/assets/po2-logo-branco.svg";
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
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(216,255,54,0.35)] active:scale-[0.98]";

const ctaOutline =
  "inline-flex items-center gap-3 rounded-xl border border-gold px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-gold hover:text-gold-foreground";

// Menu do rebrand (mockup PO2): Sobre | Soluções | Pulse | Cases
const NAV_ITEMS: { label: string; to?: string; href?: string }[] = [
  { label: "Sobre", to: "/sobre" },
  { label: "Soluções", to: "/solucoes" },
  { label: "Pulse", to: "/pulse" },
  { label: "Cases", to: "/cases" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-[var(--po2-banner-h,0px)] z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1450px] items-center justify-between px-6 py-3">
        <Link to="/" className="flex shrink-0 items-center">
          <img src={logoBranco} alt="PO2" className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-foreground lg:flex">
          {NAV_ITEMS.map((n) =>
            n.to ? (
              <Link key={n.label} to={n.to} className="transition-colors hover:text-gold">
                {n.label}
              </Link>
            ) : (
              <a key={n.label} href={n.href} className="transition-colors hover:text-gold">
                {n.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <a href={PO2_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={ctaOutline}>
              Falar com o time <ArrowRight className="size-4" />
            </a>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menu"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2.5 text-foreground transition-colors hover:bg-white/10 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[85vw] max-w-sm flex-col overflow-y-auto border-white/10 bg-background sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle className="text-left">
                  <img src={logoBranco} alt="PO2" className="h-10 w-auto" />
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-1 flex-col gap-1 text-base font-medium">
                {NAV_ITEMS.map((n) => (
                  <SheetClose asChild key={n.label}>
                    {n.to ? (
                      <Link
                        to={n.to}
                        className="rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                      >
                        {n.label}
                      </Link>
                    ) : (
                      <a
                        href={n.href}
                        className="rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                      >
                        {n.label}
                      </a>
                    )}
                  </SheetClose>
                ))}
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
                <a href={PO2_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${ctaOutline} w-full justify-center`}>
                  Falar com o time <ArrowRight className="size-4" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
