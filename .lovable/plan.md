## Mudanças na LP

### 1) Nova seção "Mentoria" (com gráfico ICP)

Adicionar `Mentoria()` em `src/routes/index.tsx`, renderizada entre `Method` e `Pitch`, com ID `#mentoria` e link no nav.

Conteúdo:
- Eyebrow dourada "Mentoria com Matheus Staruck".
- Headline: "Não é curso. É operação que você executa junto."
- Subtítulo curto sobre o programa de mentoria 1:1 / em grupo.
- Card destaque com **stat** "3,2× mais reuniões qualificadas" + **gráfico de barras** Sem ICP vs Com ICP documentado (Recharts, mesmas cores `GOLD` / `RED` do StepInsightDialog) e os 3 bullets já existentes do insight 01.
- Bloco lateral com 3-4 entregas da mentoria (ex.: diagnóstico ao vivo, ICP construído junto, scripts revisados, ritual semanal de métricas).
- CTA dourado abrindo o `DiagnosticDialog`.

### 2) Legendas do gráfico em dourado

Em `StepInsightDialog.tsx`, mudar `XAxis stroke="#666"` / `YAxis stroke="#666"` e os `tick` dos eixos para o dourado `#C5A059`. Aplicar nas três variantes (bars, line; o donut não tem eixos). O mesmo gráfico reaproveitado em Mentoria herda o estilo.

### 3) Metodologias clicáveis com resumo

Em `src/routes/index.tsx`, `Methodologies()`:
- Adicionar `summary` longo a cada item do array `ms` (3-4 frases por metodologia: o que é, quando aplicar, exemplo de pergunta/ação).
- Trocar cada `<div>` por `<button>` que abre um `Dialog` (shadcn) ou popover com título + descrição curta + resumo.
- Implementação leve: um único `MethodologyDialog` controlado por estado local em `Methodologies` exibindo o item selecionado.

Resumos curtos:
- **CHAMP**: Challenges, Authority, Money, Prioritization. Qualifica pela dor antes do orçamento.
- **Challenger Sale**: Ensina, customiza e assume controle — provoca uma nova visão do problema.
- **LAER**: Listen, Acknowledge, Explore, Respond — método para tratar objeções sem reatividade.
- **SPIN**: Situation, Problem, Implication, Need-payoff — perguntas que constroem urgência.
- **Gap Selling**: Vende o gap entre estado atual e desejado, quantificando o custo de não agir.
- **BANT**: Budget, Authority, Need, Timing — qualificação clássica para leads maduros.

### 4) Tooltip de jargão (componente `<Jargon>`)

Novo arquivo `src/components/po2/Jargon.tsx`:
- Recebe `term` (string) como children.
- Renderiza o termo + asterisco dourado pequeno (`*` em `text-gold`).
- No hover/focus/clique mobile, abre `Tooltip` (shadcn) ou `Popover` curto com definição.
- Dicionário interno `JARGON_DEFINITIONS` com 16 termos:

| Termo | Definição curta |
|---|---|
| ICP | Ideal Customer Profile — perfil de cliente que mais compra e melhor retém. |
| BDR | Business Development Representative — gera reunião com lead frio (outbound). |
| SDR | Sales Development Representative — qualifica lead já interessado (inbound). |
| MRR | Monthly Recurring Revenue — receita recorrente mensal. |
| DIAL | Valor anual de proposta em discussão (Deal In Active Lead). |
| CAC | Custo de Aquisição de Cliente. |
| CHAMP | Challenges, Authority, Money, Prioritization. |
| SPIN | Situation, Problem, Implication, Need-payoff. |
| BANT | Budget, Authority, Need, Timing. |
| LAER | Listen, Acknowledge, Explore, Respond. |
| Gap Selling | Vender o gap entre estado atual e desejado. |
| Challenger Sale | Provocar nova visão do problema do cliente. |
| Outbound | Prospecção ativa — você procura o cliente, não espera. |
| Pipeline | Funil de oportunidades em andamento. |
| Cadência | Sequência planejada de toques (e-mail, ligação, LinkedIn). |
| Pitch | Discurso de apresentação inicial. |

- Substituir as ocorrências dos termos nos textos visíveis da LP (Hero, Problem, Consequences, Method, Pitch, Methodologies, Mentoria, Cases) envolvendo em `<Jargon>…</Jargon>` na primeira ocorrência de cada seção (evita poluir). No `Footer` e em sub-bullets de cards, ignorar.

### 5) Painel hero animado (contador)

Em `src/routes/index.tsx`, `Hero()`:
- Criar hook `useCountUp(target, duration)` em `src/hooks/use-count-up.ts` que, ao entrar no viewport (`IntersectionObserver`), incrementa de 0 até `target` em ~1,5s com easing.
- Suportar formato: prefixo (`+R$`, `+`), número, sufixo (`M`, `k`).
- Aplicar a `+R$ 2M`, `+100k`, `+5k`, `+1k`. Mesma lógica também no bloco `Founder` (stats com `+`).

## Fora do escopo

- Não mexer em diagnóstico, cronômetro, modelo C.R.E.S.C.E.R. ou cases.
- Não criar admin / backend para os números.

## Detalhes técnicos

Arquivos:
- editar `src/routes/index.tsx` (nova seção Mentoria, nav, Methodologies clicável, contador, Jargon nas frases)
- editar `src/components/po2/StepInsightDialog.tsx` (cor dourada nos eixos)
- criar `src/components/po2/Jargon.tsx` (+ dicionário)
- criar `src/components/po2/MethodologyDialog.tsx`
- criar `src/hooks/use-count-up.ts`

Componentes shadcn: `Tooltip` e `Popover` já disponíveis (`src/components/ui/tooltip.tsx`, `popover.tsx`) — usar `Popover` para funcionar bem em mobile.
