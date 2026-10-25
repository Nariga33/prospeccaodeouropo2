import { useEffect, useState } from "react";
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
  "group inline-flex items-center gap-3 rounded-xl border border-gold px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-gold hover:text-gold-foreground hover:shadow-[0_0_30px_rgba(216,255,54,0.3)]";

// Menu do rebrand (mockup PO2): Sobre | Soluções | Pulse | Cases
const NAV_ITEMS: { label: string; to?: string; href?: string }[] = [
  { label: "Sobre", to: "/sobre" },
  { label: "Soluções", to: "/solucoes" },
  { label: "Pulse", to: "/pulse" },
  { label: "Cases", to: "/cases" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "relative rounded-full px-4 py-2 text-foreground/75 transition-all duration-300 hover:bg-white/[0.06] hover:text-foreground";
  const linkAtivo =
    "!bg-white/[0.08] !text-foreground after:absolute after:-bottom-[3px] after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-gold after:shadow-[0_0_8px_rgba(216,255,54,0.9)]";

  return (
    <header
      className={`sticky top-[var(--po2-banner-h,0px)] z-50 transition-all duration-500 ${
        rolou ? "bg-[#05090B]/85 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl" : "bg-[#05090B]/40 backdrop-blur-md"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1450px] items-center justify-between px-6 transition-all duration-500 ${
          rolou ? "py-2.5" : "py-4"
        }`}
      >
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src={logoBranco}
            alt="PO2"
            className={`w-auto transition-all duration-500 ${rolou ? "h-10" : "h-12"}`}
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:flex">
          {NAV_ITEMS.map((n) =>
            n.to ? (
              <Link key={n.label} to={n.to} className={linkBase} activeProps={{ className: linkAtivo }}>
                {n.label}
              </Link>
            ) : (
              <a key={n.label} href={n.href} className={linkBase}>
                {n.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <a href={PO2_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={ctaOutline}>
              Falar com o time <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
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
                        activeProps={{ className: "bg-white/[0.06] !text-gold" }}
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
      <div
        aria-hidden="true"
        className={`h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-500 ${
          rolou ? "opacity-100" : "opacity-60"
        }`}
      />
    </header>
  );
}
