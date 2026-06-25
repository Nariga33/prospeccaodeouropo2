## O que fazer

Tornar cada um dos 7 cards da seção "Prospecção de Ouro 2.0 — 7 etapas" clicável. Ao clicar, abre um **modal (dialog)** com um conteúdo de "insight de mercado" sobre aquele tema: um dado-chave em destaque, um mini gráfico visual e 2–3 bullets explicando o impacto na operação comercial. Sem chamadas externas — conteúdo curado, estático, fiel ao tom PO2.

## Conteúdo por etapa

1. **ICP & Listas** — Gráfico de barras comparando *com ICP* vs *sem ICP* (taxa de conversão em reuniões). Mensagem: empresas sem ICP desperdiçam ~60% do esforço de prospecção falando com quem nunca vai comprar.
2. **Estudo de Lead** — Donut "com pesquisa prévia" vs "abordagem genérica". Mensagem: sem munição não há cold call consultiva — é só interrupção.
3. **Cadência Multicanal** — Barras empilhadas mostrando resposta em 1 canal vs 3+ canais coordenados. Mensagem: a maioria dos decisores só responde após o 5º toque.
4. **Cold Call Consultiva** — Comparativo "script decorado" vs "abordagem consultiva" em taxa de agendamento. Mensagem: contexto vende, script afasta.
5. **Gestão de Objeções** — Gráfico de funil: objeções registradas viram playbook, ignoradas viram perda recorrente.
6. **Qualificação** — Barras CHAMP/SPIN/Gap Selling vs "feeling". Mensagem: critério claro corta o pipeline inflado.
7. **(7º card)** — Conferir no código qual é (provavelmente "Otimização contínua / reuniões semanais"). Gráfico de evolução mostrando equipes com ritual semanal x sem ritual.

Cada modal tem:
- Tag dourada com o número da etapa
- Título grande + subtítulo
- Bloco de estatística em destaque (número grande dourado + descrição)
- Mini gráfico SVG inline (sem libs externas — Recharts já está no projeto e pode ser usado)
- 2–3 bullets de impacto prático
- Botão "Quero diagnóstico gratuito" reaproveitando o `DiagnosticDialog`

## Como construir

- Criar `src/components/po2/StepInsightDialog.tsx` com o conteúdo dos 7 insights em um array tipado (`id`, `stat`, `chart`, `bullets`).
- Editar a seção das 7 etapas no `src/routes/index.tsx`: cada card vira `<button>` que abre o `Dialog` (shadcn) com o conteúdo do step correspondente. Manter aparência atual + leve hover dourado já existente.
- Gráficos: usar **Recharts** (já é dependência shadcn) com `BarChart` / `PieChart` em paleta `gold` + neutros, sem labels poluentes.
- Acessibilidade: `<button>` semântico, foco visível dourado, `aria-label`, Esc fecha (Dialog já cobre).

## Fora do escopo

- Não puxar notícias reais de API (sem fonte confiável e gratuita garantida; o conteúdo vai ser curado).
- Não mexer no diagnóstico, cronômetro ou demais seções.

Posso seguir?
