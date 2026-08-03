import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Check,
  AlertTriangle,
  Minus,
  ArrowLeft,
  ArrowRight,
  Phone,
  Sparkles,
  Timer,
  ClipboardCheck,
} from "lucide-react";
import logo from "@/assets/po2-logo.png";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico gratuito · PO2" },
      { name: "description", content: "10 perguntas para mapear sua máquina de prospecção ativa." },
      { property: "og:url", content: "https://www.prospeccaodeouropo2.com/diagnostico" },
    ],
    links: [{ rel: "canonical", href: "https://www.prospeccaodeouropo2.com/diagnostico" }],
  }),
  component: DiagnosticoPage,
});

const WHATSAPP_NUMBER = "5551989218827";

type Score = 2 | 1 | 0;
interface Option {
  label: string;
  score: Score;
}
interface Question {
  title: string;
  helper: string;
  options: Option[];
}

type RoleKey = "bdr" | "sdr" | "inside_sales" | "closer" | "empresario";

interface RoleInfo {
  key: RoleKey;
  label: string;
  sublabel: string;
  desc: string;
}

const ROLES: RoleInfo[] = [
  {
    key: "empresario",
    label: "Empresário / Founder",
    sublabel: "Visão completa",
    desc: "Radiografia da operação inteira — BDR, SDR e Closer numa visão só, com relatório em PDF.",
  },
  {
    key: "bdr",
    label: "BDR",
    sublabel: "Outbound",
    desc: "Prospecção ativa — gera reunião com lead frio.",
  },
  {
    key: "sdr",
    label: "SDR",
    sublabel: "Inbound",
    desc: "Qualifica quem já demonstrou interesse (marketing).",
  },
  {
    key: "inside_sales",
    label: "Inside Sales",
    sublabel: "Condução",
    desc: "Reunião, proposta e negociação remota.",
  },
  {
    key: "closer",
    label: "Closer",
    sublabel: "Fechamento",
    desc: "Negociação final e fechamento de contrato.",
  },
];

const BASE_QUESTIONS: Record<Exclude<RoleKey, "empresario">, Question[]> = {
  bdr: [
    {
      title: "Você tem um Perfil Ideal de Cliente definido por escrito?",
      helper: "Quais empresas, cargos e dores você quer atingir.",
      options: [
        { label: "Sim, documentado e usado por todo o time", score: 2 },
        { label: "Tenho na cabeça, mas nada formalizado", score: 1 },
        { label: "Não, prospectamos qualquer empresa", score: 0 },
      ],
    },
    {
      title: "Sua equipe estuda o cliente antes de cada contato?",
      helper: "Pesquisar a empresa, o decisor e o momento dele.",
      options: [
        { label: "Sempre — temos um roteiro de preparação", score: 2 },
        { label: "Às vezes, depende do vendedor", score: 1 },
        { label: "Nunca, vamos direto para o contato", score: 0 },
      ],
    },
    {
      title: "Vocês usam vários canais de forma organizada?",
      helper: "E-mail, LinkedIn, ligação e WhatsApp em sequência planejada.",
      options: [
        { label: "Sim, com sequência definida e medida", score: 2 },
        { label: "Usamos os canais, mas sem ordem clara", score: 1 },
        { label: "Cada vendedor faz do seu jeito", score: 0 },
      ],
    },
    {
      title: "Como são as ligações de prospecção?",
      helper: "Conversa com contexto x script decorado.",
      options: [
        { label: "Consultivas, com perguntas e diagnóstico", score: 2 },
        { label: "Depende do vendedor — mistura os dois", score: 1 },
        { label: "Script decorado, sem leitura do cliente", score: 0 },
      ],
    },
    {
      title: "Vocês registram e trabalham as objeções recebidas?",
      helper: "Mapear o motivo real do 'não' e ajustar o discurso.",
      options: [
        { label: "Sim, temos uma lista viva de objeções", score: 2 },
        { label: "Conversamos em reunião, sem registro", score: 1 },
        { label: "Não tratamos objeções de forma estruturada", score: 0 },
      ],
    },
    {
      title: "Existe um padrão para qualificar os leads?",
      helper: "Critérios claros para saber se vale avançar.",
      options: [
        { label: "Sim, critérios padronizados por etapa", score: 2 },
        { label: "Conhecemos, mas aplicamos solto", score: 1 },
        { label: "Não temos critérios definidos", score: 0 },
      ],
    },
    {
      title: "Vocês acompanham números em cada etapa do funil?",
      helper: "Volume, conexão, agendamento e conversão por canal.",
      options: [
        { label: "Sim, indicadores revistos toda semana", score: 2 },
        { label: "Olhamos números soltos, sem rotina", score: 1 },
        { label: "Não temos clareza dos números", score: 0 },
      ],
    },
    {
      title: "Os primeiros 15 segundos do contato têm um roteiro?",
      helper: "Abertura, contexto, diagnóstico e próximo passo.",
      options: [
        { label: "Sim, treinamos e revisamos a abordagem", score: 2 },
        { label: "Existe, mas cada um adapta como quer", score: 1 },
        { label: "Não temos abordagem padrão", score: 0 },
      ],
    },
    {
      title: "Vocês usam sistema de vendas (CRM) e automações?",
      helper: "Ferramentas que sustentam a operação no dia a dia.",
      options: [
        { label: "Sim, bem integrado e disciplinado", score: 2 },
        { label: "Temos CRM, mas pouco organizado", score: 1 },
        { label: "Trabalhamos em planilhas soltas", score: 0 },
      ],
    },
    {
      title: "Existe uma reunião semanal para revisar e melhorar?",
      helper: "Ajustar perfil de cliente, abordagem e números.",
      options: [
        { label: "Sim, ritual fixo com plano de ação", score: 2 },
        { label: "Acontece de vez em quando", score: 1 },
        { label: "Não revisamos, apenas executamos", score: 0 },
      ],
    },
  ],
  sdr: [
    {
      title: "Existe um critério de lead scoring definido?",
      helper: "Pontuação por perfil (fit) e comportamento (intenção).",
      options: [
        { label: "Sim, documentado e usado por marketing e vendas", score: 2 },
        { label: "Existe uma noção, mas não é formal", score: 1 },
        { label: "Não, tratamos todo lead do mesmo jeito", score: 0 },
      ],
    },
    {
      title: "Qual o tempo médio de resposta a um lead novo?",
      helper: "Velocidade é o maior preditor de conversão inbound.",
      options: [
        { label: "Minutos — temos SLA definido e cumprido", score: 2 },
        { label: "Algumas horas, sem meta formal", score: 1 },
        { label: "Um dia ou mais, sem controle", score: 0 },
      ],
    },
    {
      title: "A qualificação por chamada ou chat segue um roteiro?",
      helper: "Consultivo, não interrogatório.",
      options: [
        { label: "Sim, roteiro claro e treinado", score: 2 },
        { label: "Existe, mas cada SDR adapta", score: 1 },
        { label: "Não, cada conversa é diferente", score: 0 },
      ],
    },
    {
      title: "Existe critério claro pra passar de MQL/PQL para SAL?",
      helper: "Filtro mínimo de fit antes de vendas aceitar o lead.",
      options: [
        { label: "Sim, critério objetivo e respeitado", score: 2 },
        { label: "Existe, mas é flexível demais", score: 1 },
        { label: "Não, passamos tudo pra frente", score: 0 },
      ],
    },
    {
      title: "O handoff pro closer é estruturado?",
      helper: "Cliente não deveria repetir a própria história.",
      options: [
        { label: "Sim, contexto completo é registrado e passado", score: 2 },
        { label: "Passamos o nome e pouco mais", score: 1 },
        { label: "Não existe processo — o closer se vira", score: 0 },
      ],
    },
    {
      title: "Existe cadência de nutrição pra quem não está pronto?",
      helper: "Reengajamento de leads frios, sem descartar cedo demais.",
      options: [
        { label: "Sim, cadência estruturada e automatizada", score: 2 },
        { label: "Fazemos de vez em quando, sem rotina", score: 1 },
        { label: "Não, quem não fecha na hora é descartado", score: 0 },
      ],
    },
    {
      title: "Objeções de quem já demonstrou interesse são documentadas?",
      helper: "Contexto muda a resposta — mapear o padrão ajuda.",
      options: [
        { label: "Sim, lista viva e usada no treinamento", score: 2 },
        { label: "Conversamos informalmente sobre isso", score: 1 },
        { label: "Não registramos nada", score: 0 },
      ],
    },
    {
      title: "Vocês acompanham a conversão por estágio do funil?",
      helper: "Lead → MQL → SAL → SQL → Venda, toda semana.",
      options: [
        { label: "Sim, dashboard revisto semanalmente", score: 2 },
        { label: "Olhamos números soltos, sem rotina", score: 1 },
        { label: "Não temos clareza dos números", score: 0 },
      ],
    },
    {
      title: "Marketing e vendas usam o mesmo CRM, integrado?",
      helper: "Sem planilha paralela nem retrabalho.",
      options: [
        { label: "Sim, integração completa e confiável", score: 2 },
        { label: "Existe integração, mas falha ou é manual", score: 1 },
        { label: "Cada time usa sua própria ferramenta", score: 0 },
      ],
    },
    {
      title: "Existe reunião semanal entre marketing e vendas?",
      helper: "Alinhar qualidade de lead, critério e gargalos.",
      options: [
        { label: "Sim, ritual fixo com plano de ação", score: 2 },
        { label: "Acontece de vez em quando", score: 1 },
        { label: "Não, os times não conversam sobre isso", score: 0 },
      ],
    },
  ],
  inside_sales: [
    {
      title: "As reuniões seguem um roteiro de descoberta?",
      helper: "Perguntas estruturadas, não uma apresentação de slide solta.",
      options: [
        { label: "Sim, roteiro claro e treinado com o time", score: 2 },
        { label: "Existe, mas cada vendedor adapta bastante", score: 1 },
        { label: "Não, cada reunião é do jeito que der", score: 0 },
      ],
    },
    {
      title: "Vocês usam um critério de qualificação na call (BANT/CHAMP/SPIN)?",
      helper: "Saber se vale investir tempo em proposta.",
      options: [
        { label: "Sim, aplicado de forma consistente", score: 2 },
        { label: "Conhecemos o critério, mas aplicamos solto", score: 1 },
        { label: "Não usamos nenhum framework", score: 0 },
      ],
    },
    {
      title: "As propostas saem com prazo e próximos passos claros?",
      helper: "Sem 'te mando e você vê com calma'.",
      options: [
        { label: "Sim, sempre com data de retorno combinada", score: 2 },
        { label: "Às vezes, depende do vendedor", score: 1 },
        { label: "Raramente — a proposta vai e some", score: 0 },
      ],
    },
    {
      title: "Existe follow-up sistemático pós-reunião?",
      helper: "Cadência de retorno, não só 'fico no aguardo'.",
      options: [
        { label: "Sim, cadência definida e cumprida", score: 2 },
        { label: "Fazemos, mas sem rotina fixa", score: 1 },
        { label: "Não, quem não responde é esquecido", score: 0 },
      ],
    },
    {
      title: "Existe playbook de objeções (preço, prazo, concorrência)?",
      helper: "Resposta pensada, não improvisada na hora.",
      options: [
        { label: "Sim, documentado e usado no treinamento", score: 2 },
        { label: "Trocamos ideia informalmente sobre isso", score: 1 },
        { label: "Não, cada um responde do seu jeito", score: 0 },
      ],
    },
    {
      title: "O forecast do pipeline é confiável?",
      helper: "Estágios bem definidos, sem 'quase fechado' eterno.",
      options: [
        { label: "Sim, estágios claros e revisados", score: 2 },
        { label: "Existe, mas often não bate com a realidade", score: 1 },
        { label: "Não temos forecast estruturado", score: 0 },
      ],
    },
    {
      title: "O CRM é atualizado a cada interação?",
      helper: "Sem retrabalho nem informação perdida.",
      options: [
        { label: "Sim, disciplina alta, dado confiável", score: 2 },
        { label: "Atualizamos, mas com atraso ou falha", score: 1 },
        { label: "Trabalhamos soltos, fora do CRM", score: 0 },
      ],
    },
    {
      title: "Vocês acompanham a taxa reunião → proposta → fechamento?",
      helper: "Saber onde o funil realmente trava.",
      options: [
        { label: "Sim, métrica revisada toda semana", score: 2 },
        { label: "Olhamos de vez em quando", score: 1 },
        { label: "Não temos essa visão", score: 0 },
      ],
    },
    {
      title: "O ciclo médio de vendas é medido?",
      helper: "Do primeiro contato até o fechamento.",
      options: [
        { label: "Sim, medimos e buscamos reduzir", score: 2 },
        { label: "Temos uma ideia, sem medir de fato", score: 1 },
        { label: "Não sabemos qual é o ciclo médio", score: 0 },
      ],
    },
    {
      title: "Existe reunião semanal de revisão de pipeline?",
      helper: "Ritual pra destravar negociações paradas.",
      options: [
        { label: "Sim, ritual fixo com plano de ação", score: 2 },
        { label: "Acontece de vez em quando", score: 1 },
        { label: "Não revisamos pipeline em grupo", score: 0 },
      ],
    },
  ],
  closer: [
    {
      title: "Existe um roteiro estruturado de fechamento?",
      helper: "Não é 'vamos ver o que o cliente decide'.",
      options: [
        { label: "Sim, etapas claras até a assinatura", score: 2 },
        { label: "Existe uma ideia geral, sem estrutura", score: 1 },
        { label: "Não, cada fechamento é diferente", score: 0 },
      ],
    },
    {
      title: "Vocês sabem identificar quando é hora de fechar ou nutrir mais?",
      helper: "Critério, não instinto.",
      options: [
        { label: "Sim, sinais claros e usados pelo time", score: 2 },
        { label: "Temos uma noção, mas é subjetivo", score: 1 },
        { label: "Não, decidimos no improviso", score: 0 },
      ],
    },
    {
      title: "Objeções finais (preço, urgência, autoridade) estão documentadas?",
      helper: "Resposta pensada antes da negociação esquentar.",
      options: [
        { label: "Sim, playbook vivo e usado no time", score: 2 },
        { label: "Trocamos experiência informalmente", score: 1 },
        { label: "Não, cada closer resolve do seu jeito", score: 0 },
      ],
    },
    {
      title: "Propostas paradas recebem follow-up ativo?",
      helper: "Não deixar esfriar até o cliente esquecer.",
      options: [
        { label: "Sim, cadência de reengajamento definida", score: 2 },
        { label: "Fazemos, mas sem rotina", score: 1 },
        { label: "Não, quem não responde fica parado", score: 0 },
      ],
    },
    {
      title: "Existe margem de negociação definida (desconto, condições)?",
      helper: "Sem decisão de improviso durante a call.",
      options: [
        { label: "Sim, política clara de até onde ceder", score: 2 },
        { label: "Existe um teto informal", score: 1 },
        { label: "Não, cada closer negocia como acha melhor", score: 0 },
      ],
    },
    {
      title: "Contrato e onboarding do cliente seguem um processo padrão?",
      helper: "Do 'sim' à entrega, sem espaço pra ruído.",
      options: [
        { label: "Sim, processo documentado e replicável", score: 2 },
        { label: "Existe, mas com falhas frequentes", score: 1 },
        { label: "Não, cada venda vira uma reinvenção", score: 0 },
      ],
    },
    {
      title: "A taxa de conversão proposta → fechamento é acompanhada?",
      helper: "Saber se o problema é volume ou conversão.",
      options: [
        { label: "Sim, métrica revisada toda semana", score: 2 },
        { label: "Olhamos de vez em quando", score: 1 },
        { label: "Não temos essa visão", score: 0 },
      ],
    },
    {
      title: "O ciclo médio de fechamento é medido?",
      helper: "Da proposta enviada até a assinatura.",
      options: [
        { label: "Sim, medimos e buscamos reduzir", score: 2 },
        { label: "Temos uma ideia, sem medir de fato", score: 1 },
        { label: "Não sabemos qual é o ciclo médio", score: 0 },
      ],
    },
    {
      title: "O CRM reflete o estágio real da negociação?",
      helper: "Sem 'na minha cabeça está quase fechado'.",
      options: [
        { label: "Sim, atualizado a cada contato relevante", score: 2 },
        { label: "Atualizamos, mas com atraso", score: 1 },
        { label: "Não, o CRM não reflete a realidade", score: 0 },
      ],
    },
    {
      title: "Existe reunião semanal de revisão de forecast?",
      helper: "Ritual pra destravar negociações críticas.",
      options: [
        { label: "Sim, ritual fixo com plano de ação", score: 2 },
        { label: "Acontece de vez em quando", score: 1 },
        { label: "Não revisamos forecast em grupo", score: 0 },
      ],
    },
  ],
};

const QUESTIONS_BY_ROLE: Record<RoleKey, Question[]> = {
  ...BASE_QUESTIONS,
  empresario: [
    ...BASE_QUESTIONS.bdr.slice(0, 5),
    ...BASE_QUESTIONS.sdr.slice(0, 5),
    ...BASE_QUESTIONS.closer.slice(0, 5),
  ],
};

interface PlaybookTier {
  title: string;
  items: string[];
}

const PLAYBOOKS: Record<
  Exclude<RoleKey, "empresario">,
  { baixa: PlaybookTier; media: PlaybookTier; alta: PlaybookTier }
> = {
  bdr: {
    baixa: {
      title: "Playbook: sair do improviso",
      items: [
        "Escreva o ICP em uma página — 3 critérios de empresa, 2 cargos-alvo, 1 dor central.",
        "Defina uma cadência simples de 4 toques (e-mail, LinkedIn, ligação, WhatsApp) em 7 dias.",
        "Crie um roteiro de abertura de 15 segundos e treine com o time antes da próxima leva de ligações.",
        "Abra uma planilha (ou CRM) só pra registrar objeções recebidas — comece hoje.",
      ],
    },
    media: {
      title: "Playbook: fechar as lacunas",
      items: [
        "Audite sua cadência atual — meça taxa de resposta por canal e corte o que não converte.",
        "Padronize o critério de qualificação em uma etapa objetiva (CHAMP ou BANT).",
        "Implemente uma reunião semanal fixa de 30 min só pra revisar números do funil.",
        "Documente as 5 objeções mais comuns e a resposta padrão de cada uma.",
      ],
    },
    alta: {
      title: "Playbook: otimização fina",
      items: [
        "Teste variações de abertura (A/B) por segmento de ICP e meça impacto na taxa de agendamento.",
        "Automatize o handoff pro closer com contexto completo, sem perder tempo em transição.",
        "Crie um dashboard vivo de indicadores por vendedor, revisado semanalmente.",
        "Comece a testar expansão de ICP adjacente — sua base está madura pra isso.",
      ],
    },
  },
  sdr: {
    baixa: {
      title: "Playbook: sair do improviso",
      items: [
        "Defina um SLA simples: responder todo lead novo em até 15 minutos.",
        "Escreva um roteiro básico de qualificação — 4 perguntas que definem se o lead vale a pena.",
        "Combine com vendas um critério mínimo de handoff (o que precisa saber antes de aceitar o lead).",
        "Comece a registrar, mesmo que numa planilha, o motivo de cada lead desqualificado.",
      ],
    },
    media: {
      title: "Playbook: fechar as lacunas",
      items: [
        "Implemente lead scoring básico — combine 2-3 critérios de fit com 1-2 de comportamento.",
        "Crie uma cadência de nutrição de 3 toques pra leads que não estão prontos ainda.",
        "Estruture o handoff com um formulário/checklist fixo pro closer, não depende de memória.",
        "Marque uma reunião quinzenal com marketing pra revisar qualidade do lead que chega.",
      ],
    },
    alta: {
      title: "Playbook: otimização fina",
      items: [
        "Automatize o lead scoring dentro do CRM, com atualização em tempo real.",
        "Teste reduzir seu SLA de resposta ainda mais — cada minuto a menos aumenta conversão.",
        "Crie um dashboard de conversão por estágio (Lead→MQL→SAL→SQL→Venda) revisado semanalmente.",
        "Comece a segmentar cadências de nutrição por motivo de não-conversão.",
      ],
    },
  },
  inside_sales: {
    baixa: {
      title: "Playbook: sair do improviso",
      items: [
        "Escreva um roteiro de descoberta com 5 perguntas fixas pra toda reunião.",
        "Escolha um framework de qualificação (BANT é o mais simples pra começar) e aplique sempre.",
        "Toda proposta sai com data de retorno combinada — sem exceção.",
        "Crie um lembrete fixo de follow-up 48h depois de cada reunião.",
      ],
    },
    media: {
      title: "Playbook: fechar as lacunas",
      items: [
        "Documente as 5 objeções mais comuns em proposta e a resposta padrão de cada uma.",
        "Padronize os estágios do seu funil no CRM — defina o que precisa acontecer em cada um.",
        "Implemente uma cadência fixa de follow-up (não deixar proposta esfriar sem contato).",
        "Meça seu ciclo médio de vendas nas últimas 10 negociações fechadas.",
      ],
    },
    alta: {
      title: "Playbook: otimização fina",
      items: [
        "Analise onde o funil mais perde conversão (reunião→proposta ou proposta→fechamento) e foque ali.",
        "Teste reduzir seu ciclo de vendas com gatilhos de urgência genuínos (não pressão artificial).",
        "Crie um playbook de negociação por perfil de cliente (preço-sensível vs. urgência-sensível).",
        "Compartilhe seus melhores roteiros com o time — vire referência interna.",
      ],
    },
  },
  closer: {
    baixa: {
      title: "Playbook: sair do improviso",
      items: [
        "Escreva as etapas do seu processo de fechamento, do 'interesse confirmado' até a assinatura.",
        "Defina uma margem de negociação clara antes de entrar em qualquer call de fechamento.",
        "Documente as 3 objeções finais mais recorrentes (preço, prazo, autoridade) com resposta pronta.",
        "Crie um checklist simples de onboarding pra não perder nada na entrega.",
      ],
    },
    media: {
      title: "Playbook: fechar as lacunas",
      items: [
        "Implemente uma cadência de follow-up pra propostas paradas há mais de 5 dias.",
        "Padronize o processo de contrato e onboarding — elimine retrabalho na entrega.",
        "Meça sua taxa de conversão proposta→fechamento nas últimas 10 negociações.",
        "Alinhe com o time de qualificação o que precisa vir junto no handoff pra você fechar mais rápido.",
      ],
    },
    alta: {
      title: "Playbook: otimização fina",
      items: [
        "Analise seu ciclo médio de fechamento por segmento de cliente e ataque o mais lento.",
        "Crie playbooks de negociação diferentes por perfil (preço-sensível vs. urgência-sensível).",
        "Documente seus melhores contornos de objeção e treine o restante do time com eles.",
        "Teste ajustar sua margem de negociação com base em dados reais de fechamento, não instinto.",
      ],
    },
  },
};

interface Lead {
  nome: string;
  email: string;
  telefone: string;
  faturamento: string;
  plan?: string;
  ticket?: string;
  metaContratos?: string;
  ticketValor?: number;
  metaValor?: number;
}

function DiagnosticoPage() {
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [role, setRole] = useState<RoleKey | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(15).fill(null));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? sessionStorage.getItem("po2-lead") : null;
    if (!raw) {
      navigate({ to: "/" });
      return;
    }
    try {
      setLead(JSON.parse(raw));
    } catch {
      navigate({ to: "/" });
    }
  }, [navigate]);

  const QUESTIONS = role ? QUESTIONS_BY_ROLE[role] : QUESTIONS_BY_ROLE.bdr;
  const total = QUESTIONS.length;
  const progress = ((finished ? total : step) / total) * 100;

  function pick(optionIdx: number) {
    const next = [...answers];
    next[step] = optionIdx;
    setAnswers(next);
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setFinished(true);
    }, 220);
  }

  const score = useMemo(
    () =>
      answers.reduce<number>(
        (sum, a, i) => sum + (a !== null ? QUESTIONS[i].options[a].score : 0),
        0,
      ),
    [answers, QUESTIONS],
  );
  const maxScore = total * 2;
  const pct = Math.round((score / maxScore) * 100);

  const tierOf = (p: number): "baixa" | "media" | "alta" =>
    p >= 75 ? "alta" : p >= 45 ? "media" : "baixa";
  const tierKey = tierOf(pct);
  const playbook = role && role !== "empresario" ? PLAYBOOKS[role][tierKey] : null;

  const empresarioSections = useMemo(() => {
    if (role !== "empresario") return null;
    const segs: { key: "bdr" | "sdr" | "closer"; label: string }[] = [
      { key: "bdr", label: "BDR (Outbound)" },
      { key: "sdr", label: "SDR (Inbound)" },
      { key: "closer", label: "Closer (Fechamento)" },
    ];
    return segs.map((s, idx) => {
      const start = idx * 5;
      const subAnswers = answers.slice(start, start + 5);
      const subScore = subAnswers.reduce<number>(
        (sum, a, i) => sum + (a !== null ? QUESTIONS[start + i].options[a].score : 0),
        0,
      );
      const subPct = Math.round((subScore / 10) * 100);
      const subTier = tierOf(subPct);
      return {
        key: s.key,
        label: s.label,
        score: subScore,
        pct: subPct,
        tier: subTier,
        playbook: PLAYBOOKS[s.key][subTier],
      };
    });
  }, [role, answers, QUESTIONS]);

  const verdict = useMemo(() => {
    if (pct >= 75)
      return {
        tag: "Operação madura",
        desc: "Sua máquina de prospecção tem fundamentos sólidos. O próximo salto é otimização fina e escala.",
      };
    if (pct >= 45)
      return {
        tag: "Operação em construção",
        desc: "Você tem peças importantes, mas a previsibilidade ainda escapa. Hora de fechar lacunas críticas.",
      };
    return {
      tag: "Operação no improviso",
      desc: "A prospecção depende de esforço pessoal, não de método. Estruturar agora destrava receita rápido.",
    };
  }, [pct]);

  const moneyGap = useMemo(() => {
    const ticket = lead?.ticketValor ?? 0;
    const meta = lead?.metaValor ?? 0;
    const potencialMensal = ticket * meta;
    const gapMensal = Math.round(potencialMensal * (1 - pct / 100));
    const gapAnual = gapMensal * 12;
    return { ticket, meta, potencialMensal, gapMensal, gapAnual };
  }, [lead, pct]);

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  function buildWhatsAppUrl() {
    if (!lead) return "#";
    const roleInfo = ROLES.find((r) => r.key === role);
    const lines = [
      "Olá! Acabei de concluir o diagnóstico PO2.",
      "",
      `Nome: ${lead.nome}`,
      `E-mail: ${lead.email}`,
      `Telefone: ${lead.telefone}`,
      `Faturamento: ${lead.faturamento}`,
    ];
    if (roleInfo) lines.push(`Perfil: ${roleInfo.label} (${roleInfo.sublabel})`);
    if (lead.plan) lines.push(`Plano de interesse: ${lead.plan}`);
    if (moneyGap.potencialMensal > 0) {
      lines.push(
        `Ticket médio: ${fmt(moneyGap.ticket)}`,
        `Meta de contratos/mês: ${moneyGap.meta}`,
        `Potencial mensal: ${fmt(moneyGap.potencialMensal)}`,
        `Gap mensal estimado: ${fmt(moneyGap.gapMensal)}  |  Anual: ${fmt(moneyGap.gapAnual)}`,
      );
    }
    lines.push("", `Resultado: ${score}/${maxScore} (${pct}%) — ${verdict.tag}`, "", "Respostas:");

    QUESTIONS.forEach((q, i) => {
      const a = answers[i];
      lines.push(`${i + 1}. ${q.title}`);
      lines.push(`   → ${a !== null ? q.options[a].label : "—"}`);
    });
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  if (!lead) return null;

  if (!role) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-white/5">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
            <a href="/">
              <img src={logo} alt="PO2" className="h-8 w-auto" />
            </a>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Diagnóstico
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Qual é o seu <span className="text-gold">papel na operação</span>?
          </h1>
          <p className="mt-4 text-muted-foreground">
            O diagnóstico e o playbook são diferentes pra cada função — escolhe o que mais se parece
            com o que você faz hoje.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ROLES.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className="group rounded-2xl border border-white/10 bg-card/70 p-6 text-left transition-all hover:-translate-y-1 hover:border-gold/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-foreground">{r.label}</span>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                    {r.sublabel}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 transition-colors group-hover:text-gold">
                  Escolher →
                </span>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/5">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <a href="/">
            <img src={logo} alt="PO2" className="h-8 w-auto" />
          </a>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Diagnóstico
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10">
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Quanto sua empresa <span className="text-gold">deixa de faturar</span> dependendo só de
            leads de marketing?
          </h1>
          <p className="mt-4 text-muted-foreground">
            Responda 10 perguntas e receba um diagnóstico estratégico da sua máquina de prospecção
            ativa — com a leitura honesta de onde está o gargalo e o caminho para virar o jogo.
          </p>
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!finished ? (
          <div className="rounded-3xl border border-white/10 bg-card/70 p-8 shadow-2xl shadow-black/30">
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              Pergunta {step + 1} de {total}
            </div>
            <h2 className="mt-3 font-display text-3xl text-foreground">{q.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{q.helper}</p>

            <div className="mt-8 space-y-3">
              {q.options.map((opt, i) => {
                const selected = answers[step] === i;
                const Icon = opt.score === 2 ? Check : opt.score === 1 ? Minus : AlertTriangle;
                const tone =
                  opt.score === 2
                    ? "text-gold border-gold/40"
                    : opt.score === 1
                      ? "text-amber-300 border-amber-400/30"
                      : "text-red-300 border-red-400/30";
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className={`group flex w-full items-center justify-between gap-4 rounded-xl border bg-background/40 px-5 py-4 text-left transition-all hover:border-gold/40 hover:bg-background/70 ${selected ? "border-gold bg-gold/5" : "border-white/10"}`}
                  >
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${tone}`}
                    >
                      <Icon className="size-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between text-xs">
              <button
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
              >
                <ArrowLeft className="size-3.5" /> Voltar
              </button>
              <span className="text-muted-foreground">
                Escolha a opção mais sincera — o diagnóstico depende disso.
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-gold/40 bg-gradient-to-b from-gold/10 to-card/80 p-10 shadow-[0_0_80px_-20px_rgba(197,160,89,0.45)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              <Sparkles className="size-3" /> Diagnóstico pronto
            </div>
            <h2 className="mt-5 font-display text-4xl text-foreground md:text-5xl">
              {verdict.tag}.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">{verdict.desc}</p>

            <CountdownBanner nome={lead.nome} />

            {moneyGap.potencialMensal > 0 && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-gold/40 bg-background/60 p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  Quanto você está deixando de faturar
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-5xl text-gold md:text-6xl">
                    {fmt(moneyGap.gapMensal)}
                  </span>
                  <span className="text-sm text-muted-foreground">por mês</span>
                </div>
                <div className="mt-1 text-sm text-foreground/80">
                  Até <span className="font-bold text-gold">{fmt(moneyGap.gapAnual)}</span> por ano
                  que não entram no caixa.
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <MiniStat label="Ticket médio" value={fmt(moneyGap.ticket)} />
                  <MiniStat label="Meta de contratos/mês" value={`${moneyGap.meta}`} />
                  <MiniStat label="Potencial mensal" value={fmt(moneyGap.potencialMensal)} />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Cálculo: ticket médio × meta de novos contratos × lacuna de maturidade da operação
                  ({100 - pct}%).
                </p>
              </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-background/40 p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Pontuação
                </div>
                <div className="mt-2 font-display text-4xl text-gold">
                  {score}
                  <span className="text-xl text-muted-foreground">/{maxScore}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-background/40 p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Maturidade
                </div>
                <div className="mt-2 font-display text-4xl text-gold">{pct}%</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-background/40 p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Próximo passo
                </div>
                <div className="mt-2 text-sm text-foreground">
                  Conversa de 30 min com o time PO2.
                </div>
              </div>
            </div>

            {empresarioSections && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  <ClipboardCheck className="size-3.5" /> Radiografia por função
                </div>
                {empresarioSections.map((s) => (
                  <div
                    key={s.key}
                    className="rounded-2xl border border-white/10 bg-background/50 p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-display text-xl text-foreground">{s.label}</h4>
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                          s.tier === "alta"
                            ? "border-gold/40 bg-gold/10 text-gold"
                            : s.tier === "media"
                              ? "border-amber-400/30 text-amber-300"
                              : "border-red-400/30 text-red-300"
                        }`}
                      >
                        {s.pct}% de maturidade
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gold">{s.playbook.title}</p>
                    <ul className="mt-3 space-y-2">
                      {s.playbook.items.map((item, i) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <span className="mt-0.5 text-gold">{i + 1}.</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <PlaybookPdfButton lead={lead} sections={empresarioSections} />
              </div>
            )}

            {playbook && (
              <div className="mt-8 rounded-2xl border border-gold/40 bg-background/60 p-6">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  <ClipboardCheck className="size-3.5" /> Seu playbook ·{" "}
                  {ROLES.find((r) => r.key === role)?.label}
                </div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{playbook.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Passos priorizados pra sua faixa de maturidade atual ({pct}%). Comece pelo topo.
                </p>
                <ul className="mt-5 space-y-3">
                  {playbook.items.map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-[11px] font-bold text-gold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold text-gold-foreground transition-all hover:shadow-[0_0_50px_rgba(197,160,89,0.45)] active:scale-[0.98]"
            >
              <Phone className="size-4" /> Falar com o time PO2 <ArrowRight className="size-4" />
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Vamos te enviar a leitura completa diretamente pelo nosso canal de atendimento.
            </p>
          </div>
        )}
      </main>

      <footer className="py-10 text-center text-xs text-muted-foreground">
        Diagnóstico PO2 · Prospecção de Ouro 2.0
      </footer>
    </div>
  );
}

function PlaybookPdfButton({
  lead,
  sections,
}: {
  lead: Lead;
  sections: {
    label: string;
    pct: number;
    playbook: { title: string; items: string[] };
  }[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function download() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/public/playbook-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.nome,
          sections: sections.map((s) => ({
            label: s.label,
            pct: s.pct,
            playbookTitle: s.playbook.title,
            items: s.playbook.items,
          })),
        }),
      });
      if (!res.ok) throw new Error("Falha ao gerar PDF");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "playbook-po2.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={download}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3.5 text-sm font-bold text-gold transition-all hover:bg-gold/20 disabled:opacity-60"
      >
        {loading ? (
          "Gerando PDF…"
        ) : (
          <>
            <ClipboardCheck className="size-4" /> Baixar playbook em PDF
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-center text-xs text-red-300">
          Não foi possível gerar o PDF agora — tenta de novo em alguns segundos.
        </p>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card/40 p-3">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-display text-xl text-foreground">{value}</div>
    </div>
  );
}

const COUNTDOWN_MS = 2 * 60 * 60 * 1000;
const COUNTDOWN_KEY = "po2-diag-deadline";

function CountdownBanner({ nome }: { nome: string }) {
  const [remaining, setRemaining] = useState<number>(() => {
    if (typeof window === "undefined") return COUNTDOWN_MS;
    const stored = sessionStorage.getItem(COUNTDOWN_KEY);
    const deadline = stored ? Number(stored) : Date.now() + COUNTDOWN_MS;
    if (!stored) sessionStorage.setItem(COUNTDOWN_KEY, String(deadline));
    return Math.max(0, deadline - Date.now());
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      const stored = Number(sessionStorage.getItem(COUNTDOWN_KEY) ?? 0);
      setRemaining(Math.max(0, stored - Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const expired = remaining <= 0;
  const totalSec = Math.floor(remaining / 1000);
  const hh = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  const firstName = nome.trim().split(" ")[0] || "você";

  return (
    <div
      className={`mt-6 overflow-hidden rounded-2xl border p-5 ${expired ? "border-red-500/40 bg-red-500/10" : "border-gold/40 bg-background/60"}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div
            className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] ${expired ? "text-red-300" : "text-gold"}`}
          >
            <Timer className="size-3.5" />{" "}
            {expired ? "Oportunidade expirada" : "Janela exclusiva aberta"}
          </div>
          <p className="mt-2 text-sm text-foreground">
            {firstName}, você acaba de receber um{" "}
            <span className="font-bold text-gold">diagnóstico gratuito com Matheus Staruck</span>.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {expired
              ? "O tempo acabou. Recarregue para iniciar um novo diagnóstico — sem garantia de nova janela."
              : "Se sair desta tela, a vaga é liberada para outra empresa. Garanta sua conversa antes do tempo acabar."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <TimeBox value={hh} label="hrs" expired={expired} />
          <span className={`font-display text-2xl ${expired ? "text-red-300" : "text-gold"}`}>
            :
          </span>
          <TimeBox value={mm} label="min" expired={expired} />
          <span className={`font-display text-2xl ${expired ? "text-red-300" : "text-gold"}`}>
            :
          </span>
          <TimeBox value={ss} label="seg" expired={expired} />
        </div>
      </div>
    </div>
  );
}

function TimeBox({ value, label, expired }: { value: string; label: string; expired: boolean }) {
  return (
    <div
      className={`min-w-[54px] rounded-lg border px-2 py-1.5 text-center ${expired ? "border-red-500/40 bg-red-500/10" : "border-gold/30 bg-gold/5"}`}
    >
      <div
        className={`font-display text-2xl tabular-nums ${expired ? "text-red-200" : "text-gold"}`}
      >
        {value}
      </div>
      <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
