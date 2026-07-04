import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
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

export const Route = createFileRoute("/api/public/certificate/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const token = params.token;
        if (!token || token.length < 8) return new Response("Not found", { status: 404 });

        const supabase = publicClient();
        const { data: reg, error } = await supabase
          .from("event_registrations")
          .select("id, name, event_id, events(title, starts_at, ends_at, status)")
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

        const pdfBytes = await buildCertificatePdf({
          name: reg.name,
          eventTitle: ev.title,
          startsAt: ev.starts_at,
          endsAt: ev.ends_at,
        });

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

async function buildCertificatePdf(params: {
  name: string;
  eventTitle: string;
  startsAt: string | null;
  endsAt: string | null;
}): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  // A4 landscape (in points): 842 x 595
  const page = pdf.addPage([842, 595]);
  const { width, height } = page.getSize();

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const times = await pdf.embedFont(StandardFonts.TimesRomanItalic);

  const black = rgb(0.04, 0.04, 0.06);
  const gold = rgb(0.78, 0.62, 0.29);
  const goldSoft = rgb(0.55, 0.44, 0.22);
  const white = rgb(0.98, 0.96, 0.92);

  // Background
  page.drawRectangle({ x: 0, y: 0, width, height, color: black });

  // Double gold border
  const drawFrame = (inset: number, thickness: number, color = gold) => {
    page.drawRectangle({
      x: inset,
      y: inset,
      width: width - inset * 2,
      height: height - inset * 2,
      borderColor: color,
      borderWidth: thickness,
      color: undefined,
    });
  };
  drawFrame(22, 1.5, gold);
  drawFrame(30, 0.6, goldSoft);

  // Top: PO2 monogram
  const drawCentered = (
    text: string,
    y: number,
    size: number,
    font = helv,
    color = white,
  ) => {
    const w = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - w) / 2, y, size, font, color });
  };

  drawCentered("PO2", height - 90, 44, helvBold, gold);
  drawCentered("PROSPECÇÃO DE OURO 2.0", height - 112, 9, helv, goldSoft);

  // Ornamental divider
  const centerX = width / 2;
  page.drawLine({
    start: { x: centerX - 120, y: height - 135 },
    end: { x: centerX - 20, y: height - 135 },
    thickness: 0.6,
    color: goldSoft,
  });
  page.drawLine({
    start: { x: centerX + 20, y: height - 135 },
    end: { x: centerX + 120, y: height - 135 },
    thickness: 0.6,
    color: goldSoft,
  });
  drawCentered("◆", height - 139, 8, helv, gold);

  // Title
  drawCentered("CERTIFICADO", height - 190, 40, helvBold, gold);
  drawCentered("de participação", height - 220, 14, times, white);

  // Body
  drawCentered("Certificamos que", height - 275, 12, helv, white);

  // Name (participant)
  const nameSize = 32;
  const displayName = params.name.toUpperCase();
  const nameW = times.widthOfTextAtSize(displayName, nameSize);
  const nameX = (width - nameW) / 2;
  page.drawText(displayName, {
    x: nameX,
    y: height - 320,
    size: nameSize,
    font: times,
    color: white,
  });
  // Underline the name
  page.drawLine({
    start: { x: nameX, y: height - 328 },
    end: { x: nameX + nameW, y: height - 328 },
    thickness: 0.7,
    color: gold,
  });

  // Event summary
  const duration = durationLabel(params.startsAt, params.endsAt);
  const date = formatDatePt(params.startsAt);
  const line1 = "participou da masterclass";
  drawCentered(line1, height - 360, 12, helv, white);

  const titleClean = params.eventTitle.length > 80
    ? params.eventTitle.slice(0, 77) + "…"
    : params.eventTitle;
  drawCentered(`" ${titleClean} "`, height - 385, 15, times, gold);

  const meta = [
    duration ? `com duração de ${duration}` : "",
    date ? `realizada em ${date}` : "",
  ].filter(Boolean).join(" · ");
  if (meta) drawCentered(meta, height - 412, 11, helv, white);

  // Signature
  const sigY = 100;
  const sigX = width / 2;
  page.drawLine({
    start: { x: sigX - 110, y: sigY },
    end: { x: sigX + 110, y: sigY },
    thickness: 0.6,
    color: goldSoft,
  });
  const sigName = "Matheus Staruck";
  const sigSize = 22;
  const sigW = times.widthOfTextAtSize(sigName, sigSize);
  page.drawText(sigName, {
    x: sigX - sigW / 2,
    y: sigY + 10,
    size: sigSize,
    font: times,
    color: white,
  });
  drawCentered("Fundador · PO2", sigY - 15, 9, helv, goldSoft);

  // Footer id
  drawCentered("prospeccaoodeouropo2.com", 45, 8, helv, goldSoft);

  const bytes = await pdf.save();
  return bytes;
}
