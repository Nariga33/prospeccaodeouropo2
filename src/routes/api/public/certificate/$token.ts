import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

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
// Troca por equivalentes ASCII simples pra nunca quebrar a geração do PDF.
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
          pdfBytes = await buildCertificatePdf({
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
              : "Fundador PO2",
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

async function buildCertificatePdf(params: CertParams): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();

  // Paisagem (landscape), em pontos — mesmas constantes fixas, sem chamar page.getSize()
  const PAGE_W = 842;
  const PAGE_H = 595;
  const page = pdf.addPage([PAGE_W, PAGE_H]);

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const times = await pdf.embedFont(StandardFonts.TimesRomanItalic);

  const black = rgb(0.04, 0.04, 0.06);
  const gold = rgb(0.78, 0.62, 0.29);
  const goldSoft = rgb(0.55, 0.44, 0.22);
  const white = rgb(0.98, 0.96, 0.92);

  function drawCentered(text: string, y: number, size: number, font = helv, color = white) {
    const w = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (PAGE_W - w) / 2, y, size, font, color });
  }

  function drawFrame() {
    page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: black });
    page.drawRectangle({
      x: 22,
      y: 22,
      width: PAGE_W - 44,
      height: PAGE_H - 44,
      borderColor: gold,
      borderWidth: 1.5,
    });
    page.drawRectangle({
      x: 30,
      y: 30,
      width: PAGE_W - 60,
      height: PAGE_H - 60,
      borderColor: goldSoft,
      borderWidth: 0.6,
    });
  }

  drawFrame();

  drawCentered("PO2", PAGE_H - 90, 44, helvBold, gold);
  drawCentered("PROSPECÇÃO DE OURO 2.0", PAGE_H - 112, 9, helv, goldSoft);

  const centerX = PAGE_W / 2;
  page.drawLine({
    start: { x: centerX - 120, y: PAGE_H - 135 },
    end: { x: centerX - 20, y: PAGE_H - 135 },
    thickness: 0.6,
    color: goldSoft,
  });
  page.drawLine({
    start: { x: centerX + 20, y: PAGE_H - 135 },
    end: { x: centerX + 120, y: PAGE_H - 135 },
    thickness: 0.6,
    color: goldSoft,
  });
  drawCentered("*", PAGE_H - 139, 10, helvBold, gold);

  drawCentered("CERTIFICADO", PAGE_H - 190, 40, helvBold, gold);
  drawCentered("de participacao", PAGE_H - 220, 14, times, white);

  drawCentered("Certificamos que", PAGE_H - 275, 12, helv, white);

  const nameSize = 32;
  const displayName = params.name.toUpperCase();
  const nameW = times.widthOfTextAtSize(displayName, nameSize);
  const nameX = (PAGE_W - nameW) / 2;
  page.drawText(displayName, {
    x: nameX,
    y: PAGE_H - 320,
    size: nameSize,
    font: times,
    color: white,
  });
  page.drawLine({
    start: { x: nameX, y: PAGE_H - 328 },
    end: { x: nameX + nameW, y: PAGE_H - 328 },
    thickness: 0.7,
    color: gold,
  });

  const duration = durationLabel(params.startsAt, params.endsAt);
  const date = formatDatePt(params.startsAt);
  drawCentered("participou da masterclass", PAGE_H - 360, 12, helv, white);

  const titleClean =
    params.eventTitle.length > 80 ? params.eventTitle.slice(0, 77) + "..." : params.eventTitle;
  drawCentered(`" ${titleClean} "`, PAGE_H - 385, 15, times, gold);

  const metaParts: string[] = [];
  if (duration) metaParts.push(`com duracao de ${duration}`);
  if (date) metaParts.push(`realizada em ${date}`);
  const meta = metaParts.join("  -  ");
  if (meta) drawCentered(meta, PAGE_H - 412, 11, helv, white);

  const sigY = 100;
  const sigX = PAGE_W / 2;
  page.drawLine({
    start: { x: sigX - 110, y: sigY },
    end: { x: sigX + 110, y: sigY },
    thickness: 0.6,
    color: goldSoft,
  });
  const sigName = params.signatureName;
  const sigSize = 22;
  const sigW = times.widthOfTextAtSize(sigName, sigSize);
  page.drawText(sigName, {
    x: sigX - sigW / 2,
    y: sigY + 10,
    size: sigSize,
    font: times,
    color: white,
  });
  drawCentered(params.signatureTitle, sigY - 15, 9, helv, goldSoft);

  drawCentered("prospeccaoodeouropo2.com/verificar-certificado", 52, 8, helv, goldSoft);
  drawCentered(`Codigo de verificacao: ${params.token}`, 38, 7, helv, goldSoft);

  return pdf.save();
}
