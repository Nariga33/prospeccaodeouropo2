# Eventos PO2 — Convite, Preço, Contagem & Certificado

## 1. WhatsApp — aceitar qualquer formato
No admin e no `registerForEvent`, normalizar `whatsapp_url`:
- `https://chat.whatsapp.com/XYZ` → mantém
- `chat.whatsapp.com/XYZ` (sem https) → prefixa
- número puro (`5541999999999`) → `https://wa.me/5541999999999`
- vazio → botão mostra "em breve"
Substituir o `z.string().url()` por validador tolerante + função `toWhatsappUrl()` compartilhada.

## 2. Adicionar à agenda
Ao confirmar inscrição, além do botão do Meet, mostrar:
- **Google Calendar** (link `https://calendar.google.com/calendar/render?action=TEMPLATE&...` construído no client a partir do evento).
- **Baixar .ics** (server fn `getEventIcs({eventId})` retorna string ICS; download via blob).
Mesmos botões também no email de confirmação.

## 3. Preço com desconto (nunca "gratuito")
**Migration:** adicionar `price_full_cents integer` e `price_promo_cents integer` em `events`; manter `is_free`/`price_cents` para compat mas parar de usar na UI.
No admin: dois campos "Valor cheio" e "Valor promocional (cortesia PO2)".
Na vitrine e no dialog: `R$ 297` (riscado) · **`R$ 0` Cortesia PO2** (ou o valor promo definido). Se apenas um valor existir, mostra só ele.
Remover badge "Gratuito" e o `<Gift />`.

## 4. Convite lindo (redesign do card + dialog)
Renderizar a descrição como **markdown** (adicionar `react-markdown` + `remark-gfm`) com tipografia caprichada (Instrument Serif nos títulos, hierarquia de seções, bullets dourados, divisor ornamental, selo "Convite oficial PO2").
Card ganha selo "Vagas limitadas", data em destaque estilo save-the-date, e o dialog vira um convite em duas colunas com: cabeçalho brasão dourado, "Você está convidado(a)", subtítulo, corpo em markdown, seção "O que você vai aprender" (bullets estilizados), preço, e o formulário no lado direito com aparência de RSVP.
Descrição atual do seed é reformatada em markdown limpo (5 blocos com headings).

## 5. Contagem regressiva — banner fixo no topo
Novo componente `<EventCountdownBanner />` renderizado no `__root.tsx` acima do `<Nav>`:
- Faixa dourada fina (bg preto, borda dourada, texto dourado).
- Puxa o próximo evento publicado (`starts_at > now()`), mostra `Próximo evento: <título> — 03d 12h 42m 10s`, clique rola para `#eventos`.
- Ticker por `setInterval(1000)`. Some quando não há evento futuro.
- Botão "x" fecha durante a sessão (sessionStorage).

## 6. Certificado PO2
### Assets necessários (upload do usuário — pendente)
- Logo PO2 em PNG transparente
- Assinatura de Matheus em PNG transparente
Se não enviados, uso a logo já usada no site + gero uma assinatura manuscrita placeholder (Instrument Serif) até você enviar.

### Geração
- Server fn `getCertificatePdf({registrationId})` protegido por token (o registration id + email hash) — usa **pdf-lib** (compatível com Worker) para montar PDF A4 paisagem preto, moldura dourada dupla, logo PO2 no topo, título "CERTIFICADO", corpo "Certificamos que **NOME** participou da Masterclass **TÍTULO** com duração de **X horas**, realizada em **DATA**.", assinatura + "Matheus Staruck · PO2".
- Retorna `application/pdf`.

### Entrega
- **No site:** após `ends_at`, o card do evento e a página de sucesso mostram botão "Baixar meu certificado" que abre um mini form (email usado na inscrição) → chama a server fn e faz download.
- **Por email:** cron `pg_cron` horário → rota `/api/public/hooks/send-certificates` procura inscrições de eventos encerrados sem `certificate_sent_at`, envia email com link único de download (assinado) e marca como enviado.
- **Pré-requisito:** para o envio automático precisamos de **Lovable Emails configurado com um domínio próprio** (ex.: `notify.po2.com`). Se ainda não tiver, monto tudo pronto e deixo o job desligado até você confirmar o domínio — o download manual continua funcionando.

### Migration
- `event_registrations`: adicionar `certificate_sent_at timestamptz`, `certificate_token text unique` (gerado no insert).

## Detalhes técnicos
- Novos arquivos: `src/components/po2/EventCountdownBanner.tsx`, `src/lib/whatsapp.ts`, `src/lib/ics.ts`, `src/lib/certificate.functions.ts`, `src/routes/api/public/hooks/send-certificates.ts`.
- Pacotes: `pdf-lib`, `react-markdown`, `remark-gfm`.
- Editados: `Eventos.tsx` (redesign + calendar + preço), `admin/eventos.tsx` (novos campos + validador WhatsApp), `events.functions.ts` (retornar preços, gerar token), `__root.tsx` (banner), migração SQL.

## Perguntas
1. Envia agora **logo PO2** e **assinatura** em PNG transparente? (Sem elas eu uso fallback e você troca depois.)
2. Confirma que o **domínio de envio de email** para os certificados é `po2.com` (ou outro)? Se preferir, deixo o envio automático como opcional e habilitamos quando o domínio estiver pronto.
