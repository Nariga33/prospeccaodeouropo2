import { createFileRoute } from "@tanstack/react-router";

interface SectionInput {
  label: string;
  pct: number;
  playbookTitle: string;
  items: string[];
}

interface RequestBody {
  name: string;
  sections: SectionInput[];
}

export const Route = createFileRoute("/api/public/playbook-pdf")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: RequestBody;
        try {
          body = (await request.json()) as RequestBody;
        } catch {
          return new Response("JSON inválido", { status: 400 });
        }
        if (!body?.name || !Array.isArray(body.sections) || body.sections.length === 0) {
          return new Response("Dados incompletos", { status: 400 });
        }

        try {
          const pdfBytes = await buildPlaybookPdf(body);

          return new Response(pdfBytes as unknown as BodyInit, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename="playbook-po2-${slugify(body.name)}.pdf"`,
              "Cache-Control": "no-store",
            },
          });
        } catch (err) {
          // Loga completo pro painel de Logs da Cloudflare e devolve o motivo
          // real no corpo (só a mensagem do erro, nada sensível) pra dar pra
          // diagnosticar sem precisar de acesso ao dashboard.
          const message = err instanceof Error ? err.message : String(err);
          const stack = err instanceof Error ? err.stack : undefined;
          console.error("[playbook-pdf] falha ao gerar PDF:", message, stack);
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40) || "empresario"
  );
}

// Fontes padrão (WinAnsi) não sabem desenhar setas, bullets, emoji, etc.
// Troca por equivalentes ASCII simples pra nunca quebrar a geração do PDF.
function sanitizeForPdf(text: string): string {
  return (
    text
      .replace(/[\u2192\u2794\u27A1]/g, ">") // → ➔ ➡
      .replace(/[\u2190]/g, "<") // ←
      .replace(/[\u2022\u25CF\u25E6]/g, "-") // • ● ◦
      .replace(/[\u2018\u2019]/g, "'") // ' '
      .replace(/[\u201C\u201D]/g, '"') // " "
      .replace(/[\u2026]/g, "...") // …
      // eslint-disable-next-line no-control-regex
      .replace(/[^\u0000-\u017F\u20AC\u2013\u2014\u2018\u2019\u201C\u201D]/g, "")
  );
}

async function buildPlaybookPdf(rawBody: RequestBody): Promise<Uint8Array> {
  const body: RequestBody = {
    name: sanitizeForPdf(rawBody.name),
    sections: rawBody.sections.map((s) => ({
      label: sanitizeForPdf(s.label),
      pct: s.pct,
      playbookTitle: sanitizeForPdf(s.playbookTitle),
      items: s.items.map(sanitizeForPdf),
    })),
  };
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const times = await pdf.embedFont(StandardFonts.TimesRomanItalic);

  const black = rgb(0.04, 0.04, 0.06);
  const gold = rgb(0.78, 0.62, 0.29);
  const goldSoft = rgb(0.55, 0.44, 0.22);
  const white = rgb(0.98, 0.96, 0.92);
  const muted = rgb(0.68, 0.66, 0.62);

  const PAGE_W = 595;
  const PAGE_H = 842;

  function drawCentered(
    page: import("pdf-lib").PDFPage,
    text: string,
    y: number,
    size: number,
    font = helv,
    color = white,
  ) {
    const w = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (PAGE_W - w) / 2, y, size, font, color });
  }

  function drawFrame(page: import("pdf-lib").PDFPage) {
    page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: black });
    page.drawRectangle({
      x: 18,
      y: 18,
      width: PAGE_W - 36,
      height: PAGE_H - 36,
      borderColor: goldSoft,
      borderWidth: 0.7,
    });
  }

  // Cover page
  const cover = pdf.addPage([PAGE_W, PAGE_H]);
  drawFrame(cover);
  drawCentered(cover, "PO2", PAGE_H - 140, 46, helvBold, gold);
  drawCentered(cover, "PROSPECÇÃO DE OURO 2.0", PAGE_H - 164, 10, helv, goldSoft);
  cover.drawLine({
    start: { x: PAGE_W / 2 - 90, y: PAGE_H - 190 },
    end: { x: PAGE_W / 2 + 90, y: PAGE_H - 190 },
    thickness: 0.6,
    color: goldSoft,
  });
  drawCentered(cover, "PLAYBOOK COMERCIAL", PAGE_H - 280, 32, helvBold, gold);
  drawCentered(cover, "Radiografia de BDR, SDR e Closer", PAGE_H - 310, 13, times, white);
  drawCentered(cover, "Preparado para", PAGE_H - 400, 11, helv, muted);
  drawCentered(cover, body.name, PAGE_H - 430, 22, times, white);
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  drawCentered(cover, today, PAGE_H - 455, 10, helv, muted);
  drawCentered(cover, "www.prospeccaoodeouropo2.com", 40, 8, helv, goldSoft);

  // One page per section
  for (const section of body.sections) {
    const page = pdf.addPage([PAGE_W, PAGE_H]);
    drawFrame(page);

    let y = PAGE_H - 90;
    drawCentered(page, "PO2 · PLAYBOOK", y, 9, helv, goldSoft);
    y -= 40;
    drawCentered(page, section.label, y, 26, helvBold, gold);
    y -= 30;
    drawCentered(page, `Maturidade nessa frente: ${section.pct}%`, y, 12, helv, white);
    y -= 20;
    page.drawLine({
      start: { x: 60, y },
      end: { x: PAGE_W - 60, y },
      thickness: 0.5,
      color: goldSoft,
    });
    y -= 34;

    const titleW = times.widthOfTextAtSize(section.playbookTitle, 16);
    page.drawText(section.playbookTitle, {
      x: (PAGE_W - titleW) / 2,
      y,
      size: 16,
      font: times,
      color: white,
    });
    y -= 40;

    const maxWidth = PAGE_W - 140;
    section.items.forEach((item, i) => {
      const num = `${i + 1}.`;
      page.drawText(num, { x: 60, y, size: 11, font: helvBold, color: gold });
      const lines = wrapText(item, helv, 11, maxWidth);
      lines.forEach((line, li) => {
        page.drawText(line, { x: 85, y: y - li * 15, size: 11, font: helv, color: white });
      });
      y -= lines.length * 15 + 18;
    });

    drawCentered(page, "www.prospeccaoodeouropo2.com", 40, 8, helv, goldSoft);
  }

  return pdf.save();
}

function wrapText(
  text: string,
  font: import("pdf-lib").PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
