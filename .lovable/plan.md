# LP da PO2 — Prospecção de Ouro 2.0

Vou construir uma landing page one-page em tema escuro com paleta dourada, usando o logo da PO2 (já preparado em `src/assets/po2-logo.png` com fundo transparente) no lugar do texto "PO2" em todos os pontos da marca.

## Direção visual

Direção **Gold Precision**: fundo escuro grafite (#0F1115), acentos em dourado (#C5A059), tipografia Plus Jakarta Sans + Instrument Serif para títulos editoriais. Estética B2B premium, sem clichês de SaaS.

## Estrutura de seções

1. **Nav** — logo PO2 à esquerda, links (Método · Metodologias · Planos · Resultados), CTA "Agendar diagnóstico"
2. **Hero** — headline "Prospecção ativa com método, inteligência e previsibilidade", subhead, CTA primário + secundário, painel lateral com mini-dashboard de KPIs (R$2M, +100k ligações, +1k agendas)
3. **Credibilidade do fundador** — Matheus Staruck, 24 anos, +4 anos em ops outbound, +100k ligações, +5k empresas, +1k agendas qualificadas, +R$2M de receita
4. **O Problema** — "Outbound não falha por falta de esforço. Falha por falta de método." + 4 cards (Sem ICP, Abordagem Genérica, Cadência Sem Estratégia, Número Sem Análise)
5. **O preço de operar no escuro** — 4 consequências (Pipeline Fraco, Reuniões Sem Qualidade, CAC Alto, Dependência de Indicação)
6. **A Tese PO2** — quote editorial em destaque com a tese do método
7. **Método PO2 — 7 etapas** — diagrama em grid das 7 etapas (ICP & Listas → Estudo de Lead → Cadência Multicanal → Cold Call Consultiva → Gestão de Objeções → Qualificação → Métricas e Melhoria Contínua)
8. **Pitch de 4 Blocos** — Pattern Interrupt · Elevator Pitch · Diagnóstico Consultivo · CTA de Baixo Atrito
9. **Metodologias aplicadas** — CHAMP, Challenger, LAER, SPIN, Gap Selling, BANT
10. **Casos de sucesso** — Tech Solutions (+40% reuniões), Inovação Digital (-25% CAC, pipeline 2x), Consultoria Estratégica (3 contas em 60d), Indústria 4.0 (+15% vendas)
11. **Planos & Investimento** — 3 cards comparativos: PO2 Core (R$8.000, 1 mês), PO2 Growth (R$12.000, 3 meses, destacado), PO2 Enterprise (R$45.000, 6 meses)
12. **CTA final** — "Pronto para tirar a prospecção do improviso?" + botão diagnóstico
13. **Footer** — logo, direitos reservados, contato

## Detalhes técnicos

- Rota: `src/routes/index.tsx` (substituir placeholder)
- Componentes em `src/components/po2/` (Nav, Hero, Stats, Problem, Method, Pitch, Methodologies, Cases, Pricing, CTA, Footer)
- Design tokens em `src/styles.css`: cores grafite/dourado em oklch, fontes Plus Jakarta Sans + Instrument Serif via `<link>` no `__root.tsx`
- SEO: title/description/og atualizados em `__root.tsx` e `index.tsx`
- Logo importado de `src/assets/po2-logo.png` (já com fundo transparente) — usado no header, footer e como elemento visual no hero
- Nenhuma menção ao NEX nesta entrega
- Sem backend nesta etapa (CTAs apontam para `mailto:` ou `#contato` — posso conectar Calendly/Lovable Cloud depois quando você indicar)
