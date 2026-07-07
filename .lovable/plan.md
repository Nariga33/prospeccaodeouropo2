## Objetivo

No primeiro acesso do visitante, mostrar um fluxo de boas-vindas em 2 etapas antes do banner de countdown do evento:

1. **Card de segmentação** — "Você é Empresário(a) ou Pessoa Física?"
2. **Card de faturamento** (só se Empresário) — define trilha:
   - `0 – R$ 50k/mês` → **Mentoria**
   - `Acima de R$ 50k/mês` → **Assessoria**
3. **Lembrete final** — "Garanta já o seu acesso" com CTA para o diagnóstico gratuito (ou inscrição no próximo evento).

O resultado é salvo em `localStorage` para não repetir em acessos futuros, e usado para personalizar CTAs pela LP (ex.: badge "Recomendado para você: Mentoria/Assessoria" no bloco de planos).

## Arquivos

### Novos
- `src/components/po2/WelcomeGate.tsx` — modal (Dialog do shadcn) controlado por `localStorage["po2-welcome-v1"]`. Fluxo em passos internos:
  - Passo 1: Empresário / Pessoa Física (2 cards clicáveis grandes, estilo premium — border gold no hover).
  - Passo 2 (só empresário): faixa de faturamento (2 opções → mentoria / assessoria).
  - Passo 3: tela "Garanta já seu acesso" com CTA principal abrindo o `DiagnosticDialog` (com `plan` pré-preenchido: `mentoria` ou `assessoria`) e link secundário "Ver próximos eventos" → `/eventos`.
  - Para Pessoa Física: pula direto ao passo 3 com CTA focado em eventos (não em diagnóstico B2B).
- `src/hooks/use-visitor-profile.tsx` — hook fino que lê/salva o perfil (`{ type: "empresa"|"pessoa", track?: "mentoria"|"assessoria" }`) em localStorage e expõe `{ profile, setProfile, clear }`.

### Editados
- `src/routes/__root.tsx` — montar `<WelcomeGate />` uma vez, acima do `<EventCountdownBanner />` (o gate aparece antes do banner na hierarquia visual).
- `src/components/po2/EventCountdownBanner.tsx` — nenhum comportamento novo; continua igual. (Só documentar que o gate roda antes.)
- `src/components/po2/DiagnosticDialog.tsx` — já aceita `plan?: string`, então nada a mudar; o gate passa `plan="mentoria"` ou `plan="assessoria"`.
- (Opcional, pequeno) `src/routes/index.tsx` no bloco de planos: se `profile.track` existir, adicionar um badge discreto "Recomendado para você" no card correspondente. Fica leve — só uma linha condicional.

## Regras de exibição

- Gate abre uma vez, ~800ms após o primeiro paint (não bloqueia o LCP).
- Chave `localStorage["po2-welcome-v1"]` marcada ao concluir OU ao fechar (X). Não reabre.
- Se o usuário fechar sem responder, o banner de evento aparece normalmente.
- Respeita `prefers-reduced-motion` (sem animações agressivas).
- Mobile-first: cards em coluna no `<640px`, lado a lado no desktop.

## UX / visual

Segue a estética atual (fundo `bg-card`, borda `border-white/10`, acento `gold`, tipografia `font-display`):

```text
┌─────────────────────────────────────┐
│  BEM-VINDO À PO2                    │
│                                     │
│  Como podemos te ajudar melhor?     │
│                                     │
│  ┌──────────┐   ┌──────────┐        │
│  │ Empresa  │   │ Pessoa   │        │
│  │ /Gestor  │   │ Física   │        │
│  └──────────┘   └──────────┘        │
└─────────────────────────────────────┘
```

Passo 2 (empresa): dois cards de faixa. Passo 3: título "Garanta já o seu acesso" + resumo do que ele leva (diagnóstico gratuito / vaga em evento) + CTA gold.

## Perguntas em aberto (posso decidir sozinho, mas confirme se quiser)

- **Corte de faturamento**: assumi `0–50k → Mentoria` e `>50k → Assessoria`, exatamente como você descreveu. OK?
- **Pessoa Física**: sem trilha B2B — direciono para `/eventos`. OK, ou você quer também oferecer diagnóstico pra PF?
- **Reset**: se um mesmo visitante trocar de perfil no futuro, hoje não haverá como reabrir o gate. Quer que eu adicione um link discreto no footer tipo "Redefinir preferências"? (Posso deixar para depois.)
