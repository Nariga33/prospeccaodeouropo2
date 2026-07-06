## Objetivo

Tirar a seção de Eventos da landing page e movê-la para uma rota dedicada `/eventos`, onde o visitante navega os eventos disponíveis e se inscreve. Na LP fica apenas um convite curto que direciona para a nova página.

## Mudanças

### 1. Nova rota `src/routes/eventos.tsx`
- `createFileRoute("/eventos")` com `head()` próprio (title/description/og específicos de eventos).
- Estrutura: `<Nav />` + `<main>` com um header curto da página ("Eventos ao vivo PO2") + `<Eventos />` (componente já existente, sem alterações) + `<Footer />`.
- Reaproveita `Nav` e `Footer` — extrair esses dois componentes de `src/routes/index.tsx` para `src/components/po2/Nav.tsx` e `src/components/po2/Footer.tsx` para poderem ser importados nas duas rotas.
- No `Nav`, o link "Eventos" passa a ser `<Link to="/eventos">` em vez do âncora `#eventos`. Demais itens continuam como âncoras da home (com `to="/"` + `hash` quando estivermos em outra rota).

### 2. `src/routes/index.tsx`
- Remover `<Eventos />` do `<main>` e o import correspondente.
- Substituir por uma seção curta `EventosTeaser` (novo bloco inline nesta mesma rota) com título, uma linha sobre masterclasses e um CTA `Ver eventos disponíveis` → `<Link to="/eventos">`. Mantém a âncora `#eventos` para o link do menu continuar funcionando na home.
- Ajustar imports de `Nav`/`Footer` para os novos módulos.

### 3. Countdown banner
- `EventCountdownBanner` continua no `__root.tsx` (topo global), então aparece tanto na LP quanto em `/eventos`. Sem mudança.

### 4. Componente `Eventos.tsx`
- Sem alterações de comportamento. Só perde o `id="eventos"` da LP? Não — mantemos `id="eventos"` para que âncoras antigas continuem funcionando dentro da nova página.

## Fora de escopo

- Sem mudanças em backend, server functions, migrations, admin, certificado, WhatsApp ou lógica de inscrição.
- Sem redesign dos cards de evento nem do diálogo de RSVP.
- Sem SEO/sitemap além do `head()` da nova rota.
