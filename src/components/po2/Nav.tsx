import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, Phone } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ctaPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]";

const METHOD_ITEMS = [
  { href: "/bdr", label: "BDR", sub: "Outbound" },
  { href: "/sdr", label: "SDR", sub: "Inbound" },
  { href: "/inside-sales", label: "Inside Sales", sub: "Condução" },
  { href: "/closer", label: "Closer", sub: "Fechamento" },
];

const RESOURCE_ITEMS = [
  { href: "/eventos", label: "Eventos", sub: "Masterclasses ao vivo" },
  { href: "/materiais", label: "Materiais", sub: "Conteúdo gratuito" },
  { href: "/parceiros", label: "Parceiros", sub: "Rede PO2" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-[var(--po2-banner-h,0px)] z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex shrink-0 items-center">
          <img src={logo} alt="PO2" className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 outline-none transition-colors hover:text-gold data-[state=open]:text-gold">
              Método <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[240px] border-white/10 bg-background/95 backdrop-blur-xl"
            >
              {METHOD_ITEMS.map((s) => (
                <DropdownMenuItem key={s.label} asChild className="cursor-pointer">
                  <Link to={s.href} className="flex items-center justify-between px-2 py-2.5">
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{s.sub}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <div className="my-1 border-t border-white/10" />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/metodologias" className="px-2 py-2.5 font-semibold text-foreground">
                  Metodologias
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="/#casos" className="transition-colors hover:text-gold">
            Resultados
          </a>

          <Link
            to="/mentoria"
            className="transition-colors hover:text-gold"
            activeProps={{ className: "text-gold" }}
          >
            Mentoria
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 outline-none transition-colors hover:text-gold data-[state=open]:text-gold">
              Recursos <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[220px] border-white/10 bg-background/95 backdrop-blur-xl"
            >
              {RESOURCE_ITEMS.map((s) => (
                <DropdownMenuItem key={s.label} asChild className="cursor-pointer">
                  <Link to={s.href} className="flex items-center justify-between px-2 py-2.5">
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{s.sub}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <div className="my-1 border-t border-white/10" />
              <DropdownMenuItem asChild className="cursor-pointer">
                <a href="/#fundador" className="px-2 py-2.5 font-semibold text-foreground">
                  Sobre
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
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
                  <img src={logo} alt="PO2" className="h-10 w-auto" />
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-1 flex-col gap-1 text-base font-medium">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  Método
                </div>
                {METHOD_ITEMS.map((s) => (
                  <SheetClose asChild key={s.label}>
                    <Link
                      to={s.href}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                    >
                      {s.label}
                      <span className="text-xs text-muted-foreground">{s.sub}</span>
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/metodologias"
                    className="rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    Metodologias
                  </Link>
                </SheetClose>

                <div className="mt-3 border-t border-white/10 pt-3" />

                <SheetClose asChild>
                  <a
                    href="/#casos"
                    className="rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    Resultados
                  </a>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    to="/mentoria"
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    Mentoria
                    <span className="text-xs text-muted-foreground">Acompanhamento</span>
                  </Link>
                </SheetClose>

                <div className="mt-3 border-t border-white/10 pt-3" />

                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  Recursos
                </div>
                {RESOURCE_ITEMS.map((s) => (
                  <SheetClose asChild key={s.label}>
                    <Link
                      to={s.href}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                    >
                      {s.label}
                      <span className="text-xs text-muted-foreground">{s.sub}</span>
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a
                    href="/#fundador"
                    className="rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    Sobre
                  </a>
                </SheetClose>
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
