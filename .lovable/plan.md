# Página de Eventos PO2 + Painel Admin

## 1. Ativar Lovable Cloud
Habilita auth (email/senha), Postgres e Storage. Criar usuário admin com email definido pelo usuário e senha `mjunhy123` via SQL após provisioning. Signup público desabilitado.

## 2. Modelo de dados

**`events`**
- id, slug, title, subtitle, description (texto longo), image_url
- starts_at, ends_at, is_free bool, price_cents, investment_label
- meet_url, whatsapp_url, status ('draft'|'published'|'archived'), capacity
- created_at, updated_at

**`event_registrations`**
- id, event_id fk, name, email, whatsapp, created_at
- unique (event_id, email)

**`user_roles`** (padrão de segurança)
- enum app_role = ('admin')
- função has_role security definer
- seed: matheus como admin

**RLS + GRANTs**
- events: SELECT público onde status='published'; mutações só admin.
- event_registrations: INSERT anon; SELECT só admin.
- user_roles: SELECT authenticated; gerenciamento só admin.

**Storage bucket** `event-images` (leitura pública, upload só admin).

## 3. Seção pública "Eventos" na home
Novo componente `<Eventos />` em `src/routes/index.tsx` entre Mentoria e Pitch, com id `#eventos` e link no Nav.

- Server fn `getPublishedEvents` (publishable client server).
- Cards: imagem, título, data, badge "Gratuito"/preço, resumo, botão "Quero participar".
- Placeholder "Em breve" se lista vazia.
- Clique abre Dialog com descrição completa + formulário (nome, email, whatsapp) validado por zod.
- Ao enviar → `registerForEvent` salva inscrição e retorna { meet_url, whatsapp_url }.
- Tela de sucesso: botões "Entrar no Google Meet" e "Grupo do WhatsApp".

**Primeiro evento seedado**: Masterclass PO2 — Fundamentos da Prospecção Estratégica, gratuito, com toda a descrição fornecida (5 bullets: BDR, Mentalidade, Metodologias, Abordagens, Passagem de bastão). Meet/WhatsApp em branco até admin preencher; imagem placeholder gerada.

## 4. Painel Admin

Rotas:
- `src/routes/auth.tsx` — login email/senha, sem signup público.
- `src/routes/_authenticated/route.tsx` — layout gate managed.
- `src/routes/_authenticated/admin.tsx` — checa has_role('admin') senão redireciona.
- `src/routes/_authenticated/admin.eventos.tsx` — lista + CRUD.
- `src/routes/_authenticated/admin.eventos.$id.tsx` — editor.
- `src/routes/_authenticated/admin.inscricoes.tsx` — inscrições por evento, exportar CSV.

UI (shadcn): tabela de eventos (status, data, nº inscritos), botões Novo/Editar/Publicar/Arquivar. Formulário completo com upload de imagem para Storage.

## 5. Server functions

`src/lib/events.functions.ts` (públicas):
- getPublishedEvents, getEventBySlug, registerForEvent (zod).

`src/lib/admin-events.functions.ts` (requireSupabaseAuth + checa admin):
- listAllEvents, createEvent, updateEvent, deleteEvent, uploadEventImage, listRegistrations, exportRegistrationsCsv.

## 6. Estilo
Mantém identidade dourada (text-gold, bg preto, Playfair). Cards seguem a linguagem das seções existentes.

## 7. Nav
Ordem: Método • Mentoria • **Eventos** • Fundador • Cases • Investimento.

## Perguntas pendentes
- Qual email exato quer usar para o admin `matheusstaruck`? (ex.: matheus@po2.com)
- Confirmar imagem inicial do primeiro evento: gero uma arte dourada temática ou você envia?
