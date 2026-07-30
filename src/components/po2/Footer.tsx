import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/po2-logo.png";
import {
  PO2_EMAIL,
  PO2_INSTAGRAM_URL,
  PO2_LINKEDIN_URL,
  PO2_PHONE_DISPLAY,
  PO2_TEL_URL,
  PO2_WHATSAPP_URL,
} from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col flex-wrap items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="PO2" className="h-10 w-auto" />
            <div className="hidden h-8 w-px bg-white/10 md:block" />
            <p className="text-xs text-muted-foreground">
              Assessoria de Prospecção B2B · Matheus Staruck
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <a href="/#metodo" className="transition-colors hover:text-gold">
              Método
            </a>
            <Link to="/eventos" className="transition-colors hover:text-gold">
              Eventos
            </Link>
            <a href="/#planos" className="transition-colors hover:text-gold">
              Planos
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <a
              href={PO2_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground transition-colors hover:text-gold"
            >
              <MessageCircle className="size-4 text-gold" /> WhatsApp
            </a>
            <a
              href={PO2_TEL_URL}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
            >
              <Phone className="size-4" /> {PO2_PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${PO2_EMAIL}`}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
            >
              <Mail className="size-4" /> {PO2_EMAIL}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PO2_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={PO2_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/5 pt-6 md:flex-row md:items-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} PO2 — Prospecção de Ouro 2.0
          </div>
        </div>
      </div>
    </footer>
  );
}
