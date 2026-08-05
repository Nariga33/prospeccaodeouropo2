// Gerador de PDF mínimo, sem dependências externas — evita completamente
// o bug de empacotamento (tslib/pdf-lib) no runtime do Cloudflare Workers.
// Suporta: retângulos preenchidos, retângulos com borda, linhas, texto
// centralizado/posicionado, usando as 14 fontes padrão (sem precisar embutir).

type RGB = [number, number, number];

interface TextOp {
  kind: "text";
  text: string;
  x: number;
  y: number;
  size: number;
  font: "F1" | "F2" | "F3";
  color: RGB;
}
interface RectOp {
  kind: "rect";
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: RGB;
  stroke?: RGB;
  strokeWidth?: number;
}
interface LineOp {
  kind: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: RGB;
  width: number;
}

type Op = TextOp | RectOp | LineOp;

// Larguras médias aproximadas (fração do tamanho da fonte) por família —
// não é a métrica exata de cada glifo, mas fica visualmente muito próxima
// pra fins de centralização de texto num certificado.
const AVG_WIDTH: Record<TextOp["font"], number> = {
  F1: 0.55, // Helvetica
  F2: 0.6, // Helvetica-Bold
  F3: 0.5, // Times-Italic
};

function escapePdfText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

// PDF (sem stream comprimido/UTF-16) espera texto em WinAnsi: 1 byte por
// caractere. Diferente de TextEncoder (UTF-8), que quebraria acentos.
// PDF (sem stream comprimido/UTF-16) espera texto em WinAnsi: 1 byte por
// caractere. Diferente de TextEncoder (UTF-8), que quebraria acentos.
const WIN_ANSI_SPECIAL: Record<number, number> = {
  0x20ac: 0x80, // €
  0x2018: 0x91, // '
  0x2019: 0x92, // '
  0x201c: 0x93, // "
  0x201d: 0x94, // "
  0x2013: 0x96, // –
  0x2014: 0x97, // —
};

function latin1Bytes(s: string): Uint8Array {
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if (code <= 0xff) bytes[i] = code;
    else bytes[i] = WIN_ANSI_SPECIAL[code] ?? 0x3f; // fora do alcance vira "?"
  }
  return bytes;
}

export class SimplePdf {
  private ops: Op[] = [];
  constructor(
    public width: number,
    public height: number,
  ) {}

  estimateWidth(text: string, size: number, font: TextOp["font"] = "F1"): number {
    return text.length * size * AVG_WIDTH[font];
  }

  drawCentered(
    text: string,
    y: number,
    size: number,
    font: TextOp["font"] = "F1",
    color: RGB = [0.98, 0.96, 0.92],
  ) {
    const w = this.estimateWidth(text, size, font);
    this.ops.push({ kind: "text", text, x: (this.width - w) / 2, y, size, font, color });
  }

  drawText(
    text: string,
    x: number,
    y: number,
    size: number,
    font: TextOp["font"] = "F1",
    color: RGB = [0.98, 0.96, 0.92],
  ) {
    this.ops.push({ kind: "text", text, x, y, size, font, color });
  }

  fillRect(x: number, y: number, w: number, h: number, color: RGB) {
    this.ops.push({ kind: "rect", x, y, w, h, fill: color });
  }

  strokeRect(x: number, y: number, w: number, h: number, color: RGB, width = 1) {
    this.ops.push({ kind: "rect", x, y, w, h, stroke: color, strokeWidth: width });
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, color: RGB, width = 1) {
    this.ops.push({ kind: "line", x1, y1, x2, y2, color, width });
  }

  private buildContentStream(): string {
    const lines: string[] = [];
    for (const op of this.ops) {
      if (op.kind === "rect") {
        if (op.fill) {
          lines.push(`${op.fill[0]} ${op.fill[1]} ${op.fill[2]} rg`);
          lines.push(`${op.x} ${op.y} ${op.w} ${op.h} re f`);
        }
        if (op.stroke) {
          lines.push(`${op.stroke[0]} ${op.stroke[1]} ${op.stroke[2]} RG`);
          lines.push(`${op.strokeWidth ?? 1} w`);
          lines.push(`${op.x} ${op.y} ${op.w} ${op.h} re S`);
        }
      } else if (op.kind === "line") {
        lines.push(`${op.color[0]} ${op.color[1]} ${op.color[2]} RG`);
        lines.push(`${op.width} w`);
        lines.push(`${op.x1} ${op.y1} m ${op.x2} ${op.y2} l S`);
      } else {
        lines.push("BT");
        lines.push(`/${op.font} ${op.size} Tf`);
        lines.push(`${op.color[0]} ${op.color[1]} ${op.color[2]} rg`);
        lines.push(`${op.x} ${op.y} Td`);
        lines.push(`(${escapePdfText(op.text)}) Tj`);
        lines.push("ET");
      }
    }
    return lines.join("\n");
  }

  save(): Uint8Array {
    const content = this.buildContentStream();

    const objects: string[] = [];
    objects.push("<< /Type /Catalog /Pages 2 0 R >>");
    objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.width} ${this.height}] ` +
        `/Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>`,
    );
    objects.push(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    );
    objects.push(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    );
    objects.push(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>",
    );
    const contentBytesLen = latin1Bytes(content).length;
    objects.push(`<< /Length ${contentBytesLen} >>\nstream\n${content}\nendstream`);

    let pdf = "%PDF-1.4\n";
    const offsets: number[] = [];
    objects.forEach((obj, i) => {
      offsets.push(latin1Bytes(pdf).length);
      pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
    });

    const xrefStart = latin1Bytes(pdf).length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    for (const off of offsets) {
      pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

    return latin1Bytes(pdf);
  }
}
