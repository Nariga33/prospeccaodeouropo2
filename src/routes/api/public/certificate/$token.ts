import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { SimplePdf } from "@/lib/simple-pdf";

function publicClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

function formatDatePt(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function durationLabel(startsAt: string | null, endsAt: string | null): string {
  if (!startsAt || !endsAt) return "";
  const mins = Math.max(
    30,
    Math.round((new Date(endsAt).getTime() - new Date(startsAt).getTime()) / 60000),
  );
  if (mins >= 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
  }
  return `${mins} min`;
}

// Fontes padrão (WinAnsi) não sabem desenhar setas, bullets, emoji, etc.
function sanitizeForPdf(text: string): string {
  return (
    text
      .replace(/[\u2192\u2794\u27A1]/g, ">")
      .replace(/[\u2190]/g, "<")
      .replace(/[\u2022\u25CF\u25E6]/g, "-")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2026]/g, "...")
      // eslint-disable-next-line no-control-regex
      .replace(/[^\u0000-\u017F\u20AC\u2013\u2014\u2018\u2019\u201C\u201D]/g, "")
  );
}

interface CertParams {
  name: string;
  eventTitle: string;
  startsAt: string | null;
  endsAt: string | null;
  token: string;
  signatureName: string;
  signatureTitle: string;
}

export const Route = createFileRoute("/api/public/certificate/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const token = params.token;
        if (!token || token.length < 8) return new Response("Not found", { status: 404 });

        const supabase = publicClient();
        const { data: reg, error } = await supabase
          .from("event_registrations")
          .select(
            "id, name, event_id, events(title, starts_at, ends_at, status, certificate_signature_name, certificate_signature_title)",
          )
          .eq("certificate_token", token)
          .maybeSingle();

        if (error || !reg || !reg.events) {
          return new Response("Certificado não encontrado", { status: 404 });
        }

        const ev = reg.events as any;
        if (ev.ends_at && new Date(ev.ends_at).getTime() > Date.now()) {
          return new Response("O certificado ficará disponível após o término do evento.", {
            status: 403,
          });
        }

        let pdfBytes: Uint8Array;
        try {
          pdfBytes = buildCertificatePdf({
            name: sanitizeForPdf(reg.name),
            eventTitle: sanitizeForPdf(ev.title),
            startsAt: ev.starts_at,
            endsAt: ev.ends_at,
            token,
            signatureName: ev.certificate_signature_name
              ? sanitizeForPdf(ev.certificate_signature_name)
              : "Matheus Staruck",
            signatureTitle: ev.certificate_signature_title
              ? sanitizeForPdf(ev.certificate_signature_title)
              : "Fundador · PO2",
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("Erro ao gerar certificado PDF:", msg);
          return new Response(`Erro ao gerar o certificado: ${msg}`, { status: 500 });
        }

        return new Response(pdfBytes as unknown as BodyInit, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="certificado-po2-${token}.pdf"`,
            "Cache-Control": "private, max-age=0, must-revalidate",
          },
        });
      },
    },
  },
});

function buildCertificatePdf(params: CertParams): Uint8Array {
  const PAGE_W = 842;
  const PAGE_H = 595;
  const pdf = new SimplePdf(PAGE_W, PAGE_H);

  const black: [number, number, number] = [0.04, 0.04, 0.06];
  const gold: [number, number, number] = [0.78, 0.62, 0.29];
  const goldSoft: [number, number, number] = [0.55, 0.44, 0.22];
  const white: [number, number, number] = [0.98, 0.96, 0.92];

  // Fundo + moldura dupla
  pdf.fillRect(0, 0, PAGE_W, PAGE_H, black);
  pdf.strokeRect(22, 22, PAGE_W - 44, PAGE_H - 44, gold, 1.5);
  pdf.strokeRect(30, 30, PAGE_W - 60, PAGE_H - 60, goldSoft, 0.6);

  pdf.drawCentered("PO2", PAGE_H - 90, 44, "F2", gold);
  pdf.drawCentered("PROSPECÇÃO DE OURO 2.0", PAGE_H - 112, 9, "F1", goldSoft);

  const centerX = PAGE_W / 2;
  pdf.drawLine(centerX - 120, PAGE_H - 135, centerX - 20, PAGE_H - 135, goldSoft, 0.6);
  pdf.drawLine(centerX + 20, PAGE_H - 135, centerX + 120, PAGE_H - 135, goldSoft, 0.6);
  pdf.drawCentered("*", PAGE_H - 139, 10, "F2", gold);

  pdf.drawCentered("CERTIFICADO", PAGE_H - 190, 40, "F2", gold);
  pdf.drawCentered("de participação", PAGE_H - 220, 14, "F3", white);

  pdf.drawCentered("Certificamos que", PAGE_H - 275, 12, "F1", white);

  const nameSize = 32;
  const displayName = params.name.toUpperCase();
  const nameW = pdf.estimateWidth(displayName, nameSize, "F3");
  const nameX = (PAGE_W - nameW) / 2;
  pdf.drawText(displayName, nameX, PAGE_H - 320, nameSize, "F3", white);
  pdf.drawLine(nameX, PAGE_H - 328, nameX + nameW, PAGE_H - 328, gold, 0.7);

  const duration = durationLabel(params.startsAt, params.endsAt);
  const date = formatDatePt(params.startsAt);
  pdf.drawCentered("participou da masterclass", PAGE_H - 360, 12, "F1", white);

  const titleClean =
    params.eventTitle.length > 80 ? params.eventTitle.slice(0, 77) + "..." : params.eventTitle;
  pdf.drawCentered(`" ${titleClean} "`, PAGE_H - 385, 15, "F3", gold);

  const metaParts: string[] = [];
  if (duration) metaParts.push(`com duração de ${duration}`);
  if (date) metaParts.push(`realizada em ${date}`);
  const meta = metaParts.join("  ·  ");
  if (meta) pdf.drawCentered(meta, PAGE_H - 412, 11, "F1", white);

  const sigY = 100;
  const sigX = PAGE_W / 2;
  pdf.drawLine(sigX - 110, sigY, sigX + 110, sigY, goldSoft, 0.6);
  const sigName = params.signatureName;
  const sigSize = 22;
  const sigW = pdf.estimateWidth(sigName, sigSize, "F3");
  pdf.drawText(sigName, sigX - sigW / 2, sigY + 10, sigSize, "F3", white);
  pdf.drawCentered(params.signatureTitle, sigY - 15, 9, "F1", goldSoft);

  pdf.drawCentered("prospeccaoodeouropo2.com/verificar-certificado", 52, 8, "F1", goldSoft);
  pdf.drawCentered(`Código de verificação: ${params.token}`, 38, 7, "F1", goldSoft);

  return pdf.save();
}
