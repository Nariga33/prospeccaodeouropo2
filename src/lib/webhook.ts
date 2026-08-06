const WEBHOOK_URL = "https://api.4send.me/api/webhooks/ingest/bl0keq34ljaJpb7c";

/**
 * Envia o evento de preenchimento de formulário pro 4send.
 * Nunca lança erro — se o webhook falhar, não deve derrubar o
 * cadastro do lead no Supabase, que é o fluxo principal.
 */
export async function sendToWebhook(event: string, data: Record<string, unknown>) {
  console.warn(`Webhook 4send: iniciando envio (${event})`);
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        source: "prospeccaoodeouropo2.com",
        timestamp: new Date().toISOString(),
        data,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `Webhook 4send recusou (${event}): status ${res.status} — ${body.slice(0, 500)}`,
      );
    } else {
      console.warn(`Webhook 4send OK (${event}): status ${res.status}`);
    }
  } catch (err) {
    console.error(`Falha ao enviar webhook (${event}):`, err instanceof Error ? err.message : err);
  }
}
