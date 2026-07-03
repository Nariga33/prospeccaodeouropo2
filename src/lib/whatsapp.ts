// Normalize any user input into a usable WhatsApp URL.
// Accepts:
//  - https://chat.whatsapp.com/XYZ           → returned as-is
//  - chat.whatsapp.com/XYZ                   → prefix https://
//  - https://wa.me/5541999999999             → returned as-is
//  - wa.me/5541999999999                     → prefix https://
//  - 5541999999999 / (41) 99999-9999 / etc.  → https://wa.me/<digits>
//  - empty/undefined                          → null
export function toWhatsappUrl(input: string | null | undefined): string | null {
  if (!input) return null;
  const raw = String(input).trim();
  if (!raw) return null;

  // Already a full URL
  if (/^https?:\/\//i.test(raw)) return raw;

  // Common no-protocol formats
  if (/^(chat\.whatsapp\.com|wa\.me|api\.whatsapp\.com)\//i.test(raw)) {
    return `https://${raw}`;
  }

  // Anything that is mostly digits → treat as phone number
  const digits = raw.replace(/\D+/g, "");
  if (digits.length >= 8) {
    return `https://wa.me/${digits}`;
  }

  // Fallback: try to prefix https:// if it looks like a domain
  if (/^[\w.-]+\.[a-z]{2,}\//i.test(raw)) return `https://${raw}`;

  return null;
}
