## Objetivo

Na seção **Mentoria**, hoje o gráfico da esquerda ("3,2× mais reuniões qualificadas") é estático. Vou fazê-lo reagir ao slide ativo do carrossel "O que você recebe" à direita — cada entrega passa a mostrar uma métrica própria que ilustra o impacto daquela entrega.

## Mudanças

Arquivo único: `src/routes/index.tsx`, função `Mentoria()`.

1. **Enriquecer cada slide** com um bloco `chart`:
   - `headline` (ex.: "3,2×")
   - `subtitle` (a frase de impacto)
   - `axisLabel` (título do gráfico)
   - `unit` (`%`, `dias`, `x`, `R$`)
   - `data`: `[{ name, value, bad? }, ...]` — comparação antes/depois
   - `bullets`: 3 frases curtas contextuais

   Exemplos por slide:
   - Diagnóstico ao vivo → tempo até primeiro insight acionável (30 dias → 7 dias)
   - ICP construído junto → reuniões qualificadas (6% → 19%) *(métrica atual)*
   - Scripts e cadência → taxa de resposta (4% → 12%)
   - Ritual semanal → previsibilidade de pipeline (baixa → alta em nº de deals no forecast)
   - Estruturação de pipeline → ciclo de venda em dias (72 → 41)
   - Treinamento de objeções → conversão reunião → proposta (18% → 34%)
   - Playbook de outbound → ramp-up de novo SDR em dias (90 → 30)
   - Acompanhamento pós-mentoria → retenção do método após 60 dias (%)

2. **Refatorar o painel do gráfico** para ler `slides[active].chart` em vez de constantes fixas:
   - Headline, subtítulo, título do eixo, bullets e dados do `BarChart` derivam do slide ativo.
   - Envolver o bloco em `<div key={active} className="animate-fade-in">` para transição suave ao trocar de slide (mesma classe já usada no card da direita).
   - `Tooltip formatter` usa `chart.unit`.

3. **Sem novos arquivos, sem novas dependências.** Recharts, ícones e `animate-fade-in` já estão em uso.

## Fora de escopo

- Nenhuma mudança em backend, rotas, WhatsApp, certificado, countdown ou admin.
- Sem redesign do gráfico (continua `BarChart` com 2 colunas antes/depois).
- Sem alterar o layout geral da seção.
