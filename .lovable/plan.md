# Mentoria — mais conteúdo + carrossel interativo

Hoje a Mentoria mostra 4 entregas em cards estáticos empilhados à direita do gráfico. Vou expandir para uma narrativa completa da mentoria e transformar essa lista em um **carrossel interativo** com slides mais ricos.

## Mudanças em `src/components/po2/Mentoria` (dentro de `src/routes/index.tsx`)

### 1. Novo bloco "Sobre a mentoria" (acima do grid)
Parágrafo curto + 3 chips com pilares:
- **Para quem é:** fundadores, gestores comerciais e times de <Jargon term="Outbound">prospecção ativa</Jargon> que já vendem mas dependem de esforço heróico.
- **Como funciona:** encontros semanais + tarefas de execução entre sessões + revisão de indicadores.
- **O que muda:** de vendedor artesanal para operação com <Jargon term="ICP">ICP</Jargon>, cadência, script e ritual de métricas.

### 2. Carrossel de "O que você recebe" (substitui a coluna de cards)
- 8 slides (expandindo os 4 atuais): Diagnóstico ao vivo, ICP construído junto, Scripts e cadência revisados, Ritual semanal de métricas, Estruturação de <Jargon term="Pipeline">pipeline</Jargon>, Treinamento de objeções, Playbook de <Jargon term="Outbound">outbound</Jargon>, Acompanhamento pós-mentoria.
- Cada slide tem: ícone dourado, título, descrição detalhada (2-3 linhas), e uma linha "Entrega prática" (ex.: "Documento ICP em PDF").
- Componente client-side com `useState` para índice ativo.
- Controles: setas ◀ ▶ dourado (mesmo estilo do `EvolutionModel` / `CrescerCycle`), dots clicáveis embaixo, suporte a teclado (←/→).
- Transição suave com `transition-all duration-300`, um slide visível por vez em mobile e um slide grande + preview do próximo em desktop (`lg:` com opacity reduzida).
- Contador "03 / 08" em canto superior.
- Nenhuma nova dependência — só React + Tailwind + lucide-react (ícones já usados).

### 3. Ajustes menores
- Manter gráfico + bullets do lado esquerdo intactos.
- CTA "Quero a mentoria" fica **abaixo do carrossel**, largura total dentro da coluna direita.
- Ordem visual final: header → grid (gráfico à esquerda | carrossel + CTA à direita) → bloco "Sobre a mentoria" com os 3 chips vai **acima do grid**, logo depois do header.

Nenhum outro arquivo é alterado. Sem instalação de pacote. Só edição da função `Mentoria`.
