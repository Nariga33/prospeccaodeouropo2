import { MessageCircle } from "lucide-react";
import { PO2_WHATSAPP_URL } from "@/lib/contact";

// Canal de contato de baixo atrito, sempre visível, em cima do formulário de
// diagnóstico. Quem só quer mandar uma mensagem rápida não precisa preencher
// formulário nenhum para isso.
export function WhatsAppFloat() {
  return (
    <a
      href={PO2_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a PO2"
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-bold text-[#0b1a0f] shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-all hover:pr-5 hover:shadow-[0_10px_34px_rgba(37,211,102,0.4)] active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-5 shrink-0" strokeWidth={2.25} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
        Falar no WhatsApp
      </span>
    </a>
  );
}
