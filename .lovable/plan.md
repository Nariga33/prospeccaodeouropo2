
Abaixo está o **prompt completo** (em português) para você colar em uma nova conversa e recriar este projeto de forma idêntica — do design system aos textos, componentes, cálculos, dicionário de jargões, cases reais e cronômetro. Copie tudo do bloco a seguir.

---

## PROMPT — Recriar o projeto "PO2 — Prospecção de Ouro 2.0"

Crie uma landing page em **TanStack Start (React 19 + Vite + Tailwind v4 + shadcn/ui)** para uma assessoria de prospecção B2B chamada **PO2 — Prospecção de Ouro 2.0**, do fundador **Matheus Staruck**. Estilo: **dark, dourado, editorial, tipografia serifada em itálico para acentos**. Sem clichês de SaaS roxo/gradient.

### 1. Design system (src/styles.css)

- Fontes via `<link>` no `src/routes/__root.tsx`: `Plus Jakarta Sans` (400/500/600/700/800) para sans; `Instrument Serif` para display (headings em itálico dourado).
- Tokens (oklch):
  - `--background: oklch(0.165 0.012 260)` (quase preto azulado)
  - `--foreground: oklch(0.98 0.005 80)`
  - `--card: oklch(0.205 0.012 260)`
  - `--surface: oklch(0.225 0.014 260)`
  - `--muted-foreground: oklch(0.70 0.012 260)`
  - `--gold: oklch(0.78 0.115 80)` (dourado #C5A059 aprox.)
  - `--gold-foreground: oklch(0.16 0.012 260)`
  - `--border: oklch(1 0 0 / 8%)`
  - `--radius: 0.875rem`
- Mapear no `@theme inline` como `--color-gold`, `--color-gold-foreground`, `--color-surface`, `--color-primary: var(--gold)` etc.
- `selection:bg-gold selection:text-gold-foreground`.
- Constantes de CTA no topo do index:
  - `ctaPrimary = "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] active:scale-[0.98]"`
  - `ctaSecondary = "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/10"`
  - `goldRule = "h-px w-12 bg-gold/60"` (linha decorativa antes de eyebrows)
- OG image e favicon: usar logo da PO2 (`src/assets/po2-logo.png`).

### 2. Rotas

- `/` — `src/routes/index.tsx` (landing).
- `/diagnostico` — `src/routes/diagnostico.tsx` (quiz de 10 perguntas com cronômetro e cálculo de gap).
- `__root.tsx` com meta/OG/Twitter completos, título "PO2 — Prospecção de Ouro 2.0 | Assessoria de Prospecção B2B".

### 3. Estrutura da landing (ordem exata das seções)

`<Nav /> <Hero /> <Founder /> <Problem /> <Consequences /> <Thesis /> <Method /> <Mentoria /> <Pitch /> <Methodologies /> <Cases /> <Pricing /> <FinalCta /> <Footer />`

Nav sticky com blur, logo à esquerda, links: **Método, Mentoria, Metodologias, Resultados, Planos**, CTA dourado "Diagnóstico gratuito" que abre o `DiagnosticDialog`.

### 4. Hero

- Eyebrow com bolinha dourada pulsante: "Assessoria de Prospecção B2B".
- H1 grande (até `text-7xl`): `Prospecção ativa com [método], [inteligência] e [previsibilidade].` — as três palavras destacadas em `font-display italic text-gold`.
- Parágrafo com jargões (usar componente `<Jargon>`): "Do primeiro contato à reunião qualificada. Estruturamos sua operação **Outbound** com **ICP**, **Cadência**, abordagem consultiva e métricas..."
- CTAs: "Realizar o diagnóstico gratuito" (primary) + "Ver o método PO2" (link para `#metodo`).
- **Card lateral "Painel · Resultado acumulado"**: Receita gerada `+R$ 2M` (grande, dourado, animado com CountUp) + "em +30 negócios fechados". Grid 3 cols: `+100k Ligações`, `+5k Empresas`, `+1k Agendas` — todos animados.
- Glow dourado `blur-[140px]` atrás.

### 5. Founder

Bloco escuro. Título "Matheus Staruck" (font-display 5xl). Subtítulo: "Fundador da PO2. Especialista em operações outbound B2B — método validado em campo, não em teoria."
Grid de stats (2/3 cols) todos com **CountUp** animado:
- 24 · Anos de idade
- +4 · Anos em ops outbound
- +100k · Ligações realizadas
- +5k · Empresas prospectadas
- +1k · Agendas qualificadas
- +R$2M · Receita gerada

### 6. Problem — "Outbound não falha por falta de esforço. Falha por falta de método."

4 cards em grid (Sem ICP · Abordagem Genérica · Cadência Sem Estratégia · Número Sem Análise), cada um com ícone dourado (`Target, MessageSquare, Layers, BarChart3`).

### 7. Consequences — "O preço de continuar operando no escuro."

Layout 2 cols: título/parágrafo à esquerda; lista de 4 itens à direita (`Pipeline Fraco, Reuniões Sem Qualidade, CAC Mais Alto, Dependência de Indicação`) com ícones (`LineChart, Users, Wallet, ShieldCheck`).

### 8. Thesis

Blockquote central, `font-display text-3xl md:text-5xl`:
> "Outbound não é sobre ligar mais. É sobre *ligar melhor*, para as pessoas certas, com a mensagem certa, no momento certo — e com controle dos números."

Assinatura: "Prospecção não é dom. É processo, repetição inteligente e melhoria contínua."

### 9. Method (#metodo) — 7 etapas clicáveis

Título: "Prospecção de Ouro 2.0 — *7 etapas* que viram receita." Cada card é um botão que abre `StepInsightDialog` com **gráfico Recharts** (bars/donut/line) + stat grande dourado + 3 bullets + CTA "Quero diagnóstico gratuito".

Passos (n, ícone, título, descrição curta):
1. `01 Target` — ICP & Listas — Definição de empresas-alvo, cargos e critérios de qualificação.
2. `02 Search` — Estudo de Lead — Pesquisa prévia de empresa, dores e decisores antes do contato.
3. `03 Layers` — Cadência Multicanal — Sequência progressiva por e-mail, LinkedIn, cold call e WhatsApp.
4. `04 Headphones` — Cold Call Consultiva — Abordagem com contexto, não script decorado.
5. `05 ShieldCheck` — Gestão de Objeções — Documentar, entender raiz e ajustar discurso.
6. `06 Filter` — Qualificação — Aplicação de CHAMP, SPIN ou Gap Selling conforme o lead.
7. `07 BarChart3` — Métricas & Melhoria — Volume, conexão, agendamento e conversão por canal.

Dicionário completo `STEP_INSIGHTS` em `src/components/po2/StepInsightDialog.tsx` — para cada etapa: `statBig`, `statLabel`, `chart: "bars"|"donut"|"line"`, `data[]`, `chartLegend`, `bullets[]`. Exemplos:
- **01**: `3,2×` mais reuniões qualificadas · bars: Sem ICP 6% vs Com ICP 19%.
- **02**: `72%` decisores ignoram sem contexto · donut Com pesquisa 41 vs Genérica 9.
- **03**: `80%` respostas entre 5º-8º toque · bars 1/3/5/8 toques → 4/11/22/34.
- **04**: `2,7×` mais agendamentos consultivos · bars script 7 vs consultiva 19.
- **05**: `44%` vendas após 5ª objeção tratada · line 8/14/22/33/44.
- **06**: `−38%` no ciclo de venda com critério · bars feeling 11 vs CHAMP/SPIN/Gap 28.
- **07**: `+47%` em receita previsível · line 100/112/126/138/147.

**Cores do gráfico**: `GOLD = "#C5A059"`, `RED = "#c0524a"`, `MUTED = "#3a3a3a"`. **Eixos X e Y em dourado** (`stroke={GOLD}`, `tick fill={GOLD}`).

### 10. Mentoria (#mentoria) — NOVA seção

Eyebrow "Mentoria com Matheus Staruck". H2: "Não é curso. É *operação* que você executa junto."
Chip lateral: "Formato · 1:1 ou em grupo · semanal".
Grid 2 cols:
- **Esquerda**: card dourado com `3,2×` grande + parágrafo com `<Jargon term="ICP">ICP</Jargon>` + gráfico BarChart Recharts (Sem ICP 6% vs Com ICP 19%, eixos dourados) + 3 bullets sobre alinhamento de time.
- **Direita**: 4 entregas com ícones (`ClipboardList, Target, Headphones, Activity`): Diagnóstico ao vivo · ICP construído junto · Scripts e cadência revisados · Ritual semanal de métricas. CTA "Quero a mentoria" abre `DiagnosticDialog`.

### 11. Pitch — "O Pitch de 4 Blocos PO2"

Eyebrow "Os primeiros 15 segundos". Grid de 4: `01 Pattern Interrupt (Zap)`, `02 Elevator Pitch (Compass)`, `03 Diagnóstico Consultivo (Brain)`, `04 CTA de Baixo Atrito (ListChecks)`.
Callout final com borda dourada esquerda: "A abordagem da PO2 vende *diagnóstico* antes de vender solução."

### 12. Methodologies (#metodologias) — 6 cards clicáveis

Cada card abre `MethodologyDialog` com **título grande, acronym, "O que é", "Quando aplicar", "Exemplo na prática"** (bloco italicizado). Metodologias com esses textos exatos:

- **CHAMP** — Challenges · Authority · Money · Prioritization. Framework que inverte BANT: começa pela dor. Use em descoberta inicial. Exemplo: "Hoje, qual desses três pontos mais impacta o resultado do seu time: volume, qualificação ou conversão?"
- **Challenger Sale** — Teach · Tailor · Take control. Provocar nova visão do problema com insight. Use em mercados maduros. Exemplo: "A maioria dos times achava que o problema era volume. Em 80% dos casos, era ICP errado. Posso te mostrar?"
- **LAER** — Listen · Acknowledge · Explore · Respond. Tratamento de objeções em 4 passos. Exemplo: "Entendi sua preocupação. É o valor em si ou o momento da empresa?"
- **SPIN** — Situation · Problem · Implication · Need-payoff. Constrói urgência. Exemplo: "Se esse gargalo continuar 6 meses, qual o impacto no faturamento do trimestre?"
- **Gap Selling** — Estado atual · Estado desejado · Custo do gap. Exemplo: "Você está em X reuniões/mês e quer chegar em Y. Quanto de receita não realizada isso representa?"
- **BANT** — Budget · Authority · Need · Timing. Framework IBM. Exemplo: "Orçamento previsto, quem mais decide, janela de implantação — podemos passar pelos três?"

Depois dos cards, renderizar `<EvolutionModel />` (ver §14).

### 13. Cases (#casos) — casos reais

Eyebrow "Casos reais". H2: "Empresas prospectadas pelo *Matheus Staruck.*" Grid 2 cols, cada card com número, ícone `Building2`, tag (C-Level/Em proposta), empresa, contato, contexto e stat dourado:

1. **Mansão Maromba** — Diretor Thiago (Toguro) — "Contato direto com o diretor. Agenda realizada para fechar parceria." — `Parceria` agendada com C-Level. Tag: C-Level.
2. **Comil Ônibus** — Diretoria executiva — "Conversa direta com diretores sobre uso de I.A. na operação." — `+R$ 40K` MRR em proposta avançada. Tag: Em proposta.
3. **Kabum** — Setor financeiro — "Agenda realizada para falar com o setor financeiro." — `+R$ 100K` DIAL em proposta avançada. Tag: Em proposta.
4. **Volpato** — Time de tecnologia — "Agenda realizada para falar sobre tecnologia." — `+R$ 12K` MRR em proposta avançada. Tag: Em proposta.

### 14. EvolutionModel — Modelo PO2 (dentro de Metodologias)

Componente `src/components/po2/EvolutionModel.tsx`. Duas colunas:

**Esquerda — JourneyTimeline**: eyebrow "Jornada de evolução". H3: "Da *mentalidade* ao resultado." Ol com borda dourada esquerda, 5 níveis (ícone Lucide, título, tag em parênteses, desc):
1. `Brain` · Mentalidade · (Como penso) · Desenvolvemos líderes comerciais — crenças, prosperidade e relação com vendas.
2. `Eye` · Consciência · (O que enxergo) · Diagnosticamos a realidade e revelamos o problema real, não o aparente.
3. `MapIcon` · Caminho · (O que decido) · Construímos o plano estratégico — processos, prioridades e metas.
4. `Footprints` · Jornada · (O que executo) · Acompanhamos com disciplina, indicadores e evolução contínua.
5. `Trophy` · Resultado · (O que construo) · Receita previsível e crescimento sustentável.

Abaixo, dois cards Antes/Depois:
- Antes: "Ninguém responde minhas mensagens" → Depois: "Minha abordagem ainda não gera curiosidade suficiente".
- Antes: "Falta lead" → Depois: "Falta conversão — a consciência revela o problema real".

**Direita — CrescerCycle** (INTERATIVO): eyebrow "Filosofia oficial PO2". H3: "Método *C.R.E.S.C.E.R.*". Legenda: "Um ciclo contínuo — não uma linha reta. Clique em cada letra para entender o que ela significa."

SVG circular 380×380 com 7 círculos douradas nas posições `(i/7)*2π - π/2`, raio 135. Cada círculo é clicável e mostra a letra grande + label ao redor. Item ativo: fill escuro, stroke dourado 2.5, drop-shadow dourado. Centro: ícone Infinity + "Ciclo PO2 · Repetir é evoluir".

Setas ChevronLeft/ChevronRight + dots de paginação abaixo. Suporte a teclado (setas). Card inferior mostra a letra ativa, "N de 7", label e desc.

Ciclo (7 letras):
- **C** Consciência — Enxergar a realidade da operação antes de agir. Diagnóstico honesto.
- **R** Responsabilidade — Assumir o problema. Parar de terceirizar culpa.
- **E** Estratégia — Desenhar o plano com ICP, cadência, abordagem e prioridade.
- **S** Sistema — Processo replicável e documentado.
- **C** Constância — Execução diária com disciplina.
- **E** Evolução — Medir, ajustar e repetir.
- **R** Resultado — Receita previsível como consequência do método.

### 15. Pricing (#planos) — 3 planos

Título centralizado com goldRule dos dois lados. Grid de 3 cards; o do meio destacado (`highlight: true`) com badge "Mais escolhido" e gradiente dourado.

- **PO2 Core** · Organizar · 1 mês · **R$ 8.000** — Diagnóstico comercial, ICP e personas, Playbook de prospecção, Scripts e cadências (base), Listas direcionais, Treinamento BDR/SDR — 1 encontro, Acompanhamento pontual.
- **PO2 Growth** · Rodar · 3 meses · **R$ 12.000** *(highlight)* — Tudo do Core, Scripts/cadências completos, Construção de listas, Treinamento BDR/SDR recorrente, Acompanhamento semanal, Gestão de indicadores, Otimização de pitch, Dashboard comercial básico.
- **PO2 Enterprise** · Escalar · 6 meses · **R$ 45.000** — Tudo do Growth, Scripts/cadências avançados, Treinamento contínuo, Acompanhamento estratégico semanal, Dashboard completo, Otimização contínua de pitch e ICP.

Cada CTA abre `DiagnosticDialog` passando `plan={p.name}`.

### 16. FinalCta e Footer

Bloco final centralizado com glow dourado, logo, H2 "Pronto para tirar a prospecção *do improviso?*", CTA "Realizar o diagnóstico gratuito" e microcopy "Vagas limitadas por mês".
Footer minimal: logo + "Assessoria de Prospecção B2B · Matheus Staruck" + copyright.

### 17. Jargon component (`src/components/po2/Jargon.tsx`)

Componente `<Jargon term="...">texto</Jargon>` que renderiza o filho sublinhado tracejado dourado + asterisco `*` dourado sobrescrito. Ao clicar abre `Popover` shadcn no lado top, mostrando cabeçalho `TERMO · Full name` em dourado e a definição. Dicionário `JARGON_DEFINITIONS`:

- **ICP** (Ideal Customer Profile) — Perfil de cliente ideal — tipo de empresa que mais compra, melhor paga e mais retém.
- **BDR** (Business Development Representative) — Prospecção ativa outbound; gera reunião com lead frio.
- **SDR** (Sales Development Representative) — Qualifica leads inbound antes do closer.
- **MRR** (Monthly Recurring Revenue) — Receita recorrente mensal.
- **DIAL** — Valor anual de proposta em discussão ativa.
- **CAC** (Custo de Aquisição de Cliente) — Quanto se gasta em média para conquistar um cliente.
- **CHAMP** — Challenges, Authority, Money, Prioritization.
- **SPIN** — Situation, Problem, Implication, Need-payoff.
- **BANT** — Budget, Authority, Need, Timing.
- **LAER** — Listen, Acknowledge, Explore, Respond.
- **Gap Selling** — Vender o gap entre estado atual e desejado.
- **Challenger Sale** — Provocar nova visão do problema.
- **Outbound** — Prospecção ativa — você procura o cliente.
- **Pipeline** — Funil de oportunidades em andamento.
- **Cadência** — Sequência planejada de toques (e-mail, ligação, LinkedIn, WhatsApp).
- **Pitch** — Discurso de apresentação inicial.

Espalhar `<Jargon>` nos textos das seções Hero, Method, Pitch, Methodologies e Mentoria (não repetir em toda ocorrência).

### 18. CountUp (`src/hooks/use-count-up.tsx`)

Hook `useCountUp(value: string, duration=1500)`:
- Parse `+R$ 2M` → prefix `+R$ `, target `2`, suffix `M`, decimals `0` (aceita vírgula ptBR).
- Ao entrar no viewport via `IntersectionObserver` threshold 0.3, anima com easing cubic-out (`1 - (1-t)^3`).
- Formata com `toLocaleString("pt-BR")`.
Exportar componente `<CountUp value="+100k" />`. Aplicar no Hero (Receita + 3 stats) e no Founder (todas as stats).

### 19. StepInsightDialog (`src/components/po2/StepInsightDialog.tsx`)

Dialog shadcn largo (`max-w-2xl`), com badge "Etapa NN · Insight de mercado", título display, subtítulo, card dourado com stat grande, card com gráfico Recharts (bars/donut/line conforme insight), bullets com bolinha dourada, CTA final scroll-to-`#diagnostico`. Todos os eixos e ticks em dourado `#C5A059`. Tooltip com fundo `#0e0e10` e borda dourada 0.3.

### 20. MethodologyDialog (`src/components/po2/MethodologyDialog.tsx`)

Dialog `max-w-xl` controlado por props. Badge "Metodologia aplicada". Título display + acronym em uppercase dourado + descrição curta. Três blocos: "O que é", "Quando aplicar", "Exemplo na prática" (este último em card com borda dourada e texto italicizado com aspas).

### 21. DiagnosticDialog (`src/components/po2/DiagnosticDialog.tsx`)

Dialog com formulário validado por **Zod**: nome, email, telefone, faturamento (Select com 5 faixas: até R$ 50k/mês; 50–200k; 200–500k; 500k–1M; acima de 1M), ticket médio (R$), meta de novos contratos/mês. Aceita prop `plan?` (nome do plano vindo do Pricing).

Ao submeter: parseia números (`5.000` → 5000), guarda `{ ...form, plan, ticketValor, metaValor }` em `sessionStorage("po2-lead")` e navega para `/diagnostico`.

### 22. Página `/diagnostico`

- Lê `sessionStorage("po2-lead")`; se não existir, redireciona para `/`.
- Header minimalista com logo.
- H1: "Quanto sua empresa **deixa de faturar** dependendo só de leads de marketing?" + subtítulo + barra de progresso dourada.
- **10 perguntas** (uma por vez, com transição). Cada uma tem 3 opções pontuadas 0/1/2 com ícones (Check dourado, Minus âmbar, AlertTriangle vermelho). Botão Voltar disponível a partir da 2ª. As 10 perguntas são exatamente:
  1. ICP definido por escrito? (documentado / na cabeça / não).
  2. Estudam o cliente antes de cada contato? (sempre / às vezes / nunca).
  3. Vários canais organizados? (sequência definida / sem ordem / cada um do seu jeito).
  4. Como são as ligações? (consultivas / mistas / script decorado).
  5. Registram objeções? (lista viva / conversamos sem registrar / não).
  6. Padrão de qualificação? (padronizado / solto / não).
  7. Números por etapa do funil? (revistos semanalmente / soltos / não).
  8. Roteiro dos primeiros 15s? (treinado / cada um adapta / não existe).
  9. CRM e automações? (integrado / pouco organizado / planilhas).
  10. Reunião semanal de melhoria? (ritual fixo / às vezes / não).

- Ao terminar: card dourado com veredito por faixa de %:
  - ≥75: "Operação madura".
  - 45–74: "Operação em construção".
  - <45: "Operação no improviso".
- **Cálculo do gap financeiro**: `potencial = ticket × meta`; `gapMensal = potencial × (1 - pct/100)`; `gapAnual = gap × 12`. Mostrar em card destaque com stat gigante dourado + 3 mini stats (Ticket, Meta, Potencial) + explicação da fórmula.
- 3 cards: Pontuação `score/maxScore`, Maturidade `pct%`, Próximo passo "Conversa de 30 min com o time PO2".
- **CountdownBanner**: cronômetro de **2h** (`sessionStorage("po2-diag-deadline")`), atualizando a cada segundo (HH:MM:SS em `TimeBox` dourados). Estado "expirado" fica vermelho. Copy: "Fulano, você acaba de receber um diagnóstico gratuito com Matheus Staruck. Se sair desta tela, a vaga é liberada..."
- CTA final abre WhatsApp `https://wa.me/5551989218827` com mensagem pré-preenchida contendo: dados do lead, plano, ticket/meta/potencial/gap, pontuação, veredito e todas as respostas numeradas.

### 23. Regras técnicas obrigatórias

- Toda cor via tokens semânticos (`text-gold`, `bg-card`, `text-muted-foreground`) — nunca `text-white`/`bg-black`/hex hardcoded em componentes (exceto dentro do SVG do CrescerCycle e nos props do Recharts, onde `#C5A059`/`#c0524a` são necessários).
- shadcn: `Dialog, Popover, Select, Input, Label` já instalados via generator padrão.
- Recharts para os gráficos.
- Ícones `lucide-react`.
- Zod para validação do formulário.
- Sem backend / sem Lovable Cloud — tudo client-side (sessionStorage).
- TanStack Router: rotas em `src/routes/*.tsx` (não editar `routeTree.gen.ts` à mão).

Ao final, publique com meta OG apontando para o logo PO2 e favicon do mesmo asset.

---

Esse é o prompt completo. Colando ele em uma sessão nova de Lovable, o projeto será reconstruído com os mesmos textos, cores, cálculos, dicionário de jargões, gráficos, cronômetro e cases reais.
