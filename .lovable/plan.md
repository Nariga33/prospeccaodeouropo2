## O que fazer

Três ajustes nas seções existentes da landing page:

### 1) Ciclo C.R.E.S.C.E.R. interativo (imagem 1)

Em `src/components/po2/EvolutionModel.tsx`, transformar o `CrescerCycle` (hoje só decorativo + rotação automática):

- **Texto dos rótulos sempre legível**: rotacionar apenas os círculos das letras na trilha, mas posicionar os rótulos ("Consciência", "Responsabilidade", etc.) na horizontal, fora do círculo, sem rotação que vire o texto de cabeça pra baixo.
- **Controle do usuário**: parar rotação automática. Botões de seta (← →) abaixo do ciclo + clique direto em cada letra avança/seleciona aquele item. Setas do teclado também navegam quando o ciclo está em foco.
- **Cada letra clicável**: ao clicar em uma letra (C, R, E, S, C, E, R), abrir card de detalhe abaixo do ciclo (sem modal) explicando o significado daquele item:
  - **C — Consciência**: enxergar a realidade da operação antes de agir.
  - **R — Responsabilidade**: assumir o problema, parar de terceirizar a culpa.
  - **E — Estratégia**: desenhar o plano com ICP, cadência e prioridade.
  - **S — Sistema**: processo replicável, não esforço heróico.
  - **C — Constância**: execução diária, sem improviso.
  - **E — Evolução**: medir, ajustar, repetir.
  - **R — Resultado**: receita previsível como consequência.
- Letra selecionada fica destacada (anel dourado mais grosso, brilho).

### 2) Enquadrar o 7º card "Métricas & Melhoria" (imagem 2)

Em `src/routes/index.tsx`, na grid das 7 etapas (linha 289): hoje o card 07 fica solto na 2ª coluna em lg. Mudar a grid para **3 colunas em lg** com o 7º card centralizado ocupando a coluna do meio na última linha (ou alterar para `md:grid-cols-2 lg:grid-cols-3` + `lg:col-start-2` no 7º), assim os 7 cards ficam visualmente equilibrados em duas linhas (3 + 3 + 1 centralizado) sem o card 07 parecendo deslocado.

### 3) Substituir cases fictícios por cases reais (imagem 3)

Em `src/routes/index.tsx`, função `Cases` (linha 401), trocar o array `cases` por:

1. **Mansão Maromba** — Contato direto com o Diretor Thiago (Toguro). Agenda realizada para fechar parceria. Métrica de destaque: "Parceria" / "Diretor C-Level".
2. **Comil Ônibus** — Contato direto com diretores sobre uso de IA. Avanço para proposta. Métrica: **+R$ 40.000 MRR** em proposta.
3. **Kabum** — Agenda com setor financeiro. Métrica: **+R$ 100.000 DIAL** em proposta.
4. **Volpato** — Agenda sobre tecnologia. Métrica: **+R$ 12.000 MRR** em proposta.

Layout do card de case ajustado para comportar: nome da empresa, contato/decisor alcançado, contexto da conversa, e métrica financeira em destaque dourado. Pequeno selo "Em proposta" / "Parceria" no canto.

Atualizar também o subtítulo da seção para refletir que são empresas reais já prospectadas pelo Matheus.

## Fora do escopo

- Não mexer em diagnóstico, cronômetro, modais de insight ou demais seções.
- Não adicionar logos das empresas (sem direito de uso confirmado) — somente texto + ícone.

Posso seguir?
