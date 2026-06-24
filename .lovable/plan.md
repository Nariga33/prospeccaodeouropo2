# Adicionar "Modelo PO2 de Evolução Comercial" na seção Metodologias

Vou criar uma nova subseção visual logo após o bloco atual de "Metodologias aplicadas" (CHAMP, Challenger, LAER, SPIN, Gap Selling, BANT), apresentando o **Modelo PO2 de Evolução Comercial** como a jornada/filosofia da PO2.

## O que será construído

Um bloco editorial dentro da mesma seção `#metodologias`, com dois componentes visuais lado a lado em desktop e empilhados em mobile:

### 1. Jornada de 5 níveis (Mentalidade → Resultado)
Uma timeline vertical em "trilha dourada" com 5 estágios, cada um como um cartão escuro com:
- Ícone (lucide-react): `Brain` (Mentalidade), `Eye` (Consciência), `Map` (Caminho), `Footprints` (Jornada), `Trophy` (Resultado)
- Tag curta entre parênteses ("Como penso", "O que enxergo", "O que decido", "O que executo", "O que construo")
- Título grande na fonte display
- 1 frase de aplicação na PO2 (ex.: Mentalidade → "Desenvolvemos líderes comerciais")
- Linha vertical dourada conectando os cartões com pequenos nós/círculos numerados

Sob a timeline, exemplos curtos em formato "❌ ✅" para Mentalidade e Consciência, em 2 cartões compactos:
- ❌ "Ninguém responde minhas mensagens" / ✅ "Minha abordagem ainda não gera curiosidade suficiente"
- ❌ "Falta lead" / ✅ "Falta conversão — a consciência revela o problema real"

### 2. Ciclo C.R.E.S.C.E.R. (filosofia oficial)
Ao lado da timeline (ou abaixo em mobile), um **círculo de repetições** representando o método contínuo:
- SVG circular com 7 nós distribuídos ao redor (Consciência → Responsabilidade → Estratégia → Sistema → Constância → Evolução → Resultado)
- Setas curvas conectando os nós no sentido horário, indicando ciclo contínuo
- No centro do círculo: ícone `RefreshCw` ou `Infinity` em dourado + label "Método C.R.E.S.C.E.R."
- Legenda abaixo: "A filosofia oficial PO2 — um ciclo, não uma linha reta."

## Onde entra

- Arquivo: `src/routes/index.tsx`, seção `#metodologias` — novo bloco adicionado **abaixo** do grid atual das 6 metodologias (CHAMP etc.), separado por um divisor sutil dourado e um eyebrow "Filosofia PO2".
- Sem alterar nav, hero, planos, diagnóstico ou qualquer outro fluxo.
- Usa tokens existentes (`text-gold`, `bg-card`, `border-white/10`, fonte `font-display`) — sem novos tokens nem dependências.

## Detalhes técnicos

- Componente novo: `src/components/po2/EvolutionModel.tsx` exportando dois subcomponentes internos (`JourneyTimeline`, `CrescerCycle`) renderizados juntos no grid `lg:grid-cols-[1.1fr_1fr]`.
- Ícones de `lucide-react` (já no projeto).
- Círculo C.R.E.S.C.E.R. desenhado em SVG inline (sem libs novas): círculo base + 7 `<g>` rotacionados via `transform`, com `<text>` para os labels e pequenos `<circle>` dourados como nós.
- Animação leve: rotação contínua suave do anel externo do SVG via CSS `@keyframes spin` 60s linear infinite (opcional, respeitando `prefers-reduced-motion`).
- Sem mudança em backend, rotas, ou diagnóstico.
