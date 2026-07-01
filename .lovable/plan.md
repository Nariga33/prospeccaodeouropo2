# Reordenar a landing no padrão FullSalesSystem

Hoje a página abre com o fundador logo após o Hero. Vamos seguir a lógica narrativa do FullSalesSystem: primeiro cutucar a **dor**, depois mostrar a **causa e a perda**, na sequência apresentar a **solução** e só então revelar **quem está por trás**.

## Nova ordem das seções em `src/routes/index.tsx` (função `LandingPage`)

```text
Hero
Problem          → a dor
Consequences     → a causa e o que se perde
Thesis           ┐
Method           │
Mentoria         │ → a solução (método PO2 + entregas)
Pitch            │
Methodologies    ┘
Founder          → quem está por trás (Matheus Staruck)
Cases            → prova social
Pricing
FinalCta
```

## Mudanças

1. **`LandingPage`**: mover `<Founder />` para depois de `<Methodologies />` e antes de `<Cases />`. Manter todos os outros componentes intactos.
2. **`Nav`**: adicionar um link âncora `#fundador` ("Fundador") entre "Metodologias" e "Resultados" para refletir a nova jornada.
3. **`Founder`**: garantir que a `<section>` tenha `id="fundador"` para o link do menu funcionar (adicionar o id se ainda não existir; sem outras mudanças de conteúdo ou estilo).

Nenhum outro arquivo é alterado. Sem mudanças de conteúdo, cópia ou visual — só reordenação e o id/link do menu.
