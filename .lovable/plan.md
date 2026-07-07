## Diagnóstico

Os labels do círculo do "Ciclo PO2" (`src/components/po2/EvolutionModel.tsx`) estão corretos no código — "Estratégia", "Evolução", "Responsabilidade" etc. estão inteiros no array. O problema é puramente de renderização SVG: o `<svg viewBox="0 0 380 380">` recorta qualquer `<text>` que ultrapasse os limites.

Cálculo confirma o clipping:
- **Estratégia** (i=2, direita) fica em `x≈362`; com `text-anchor="middle"` estende até ~402 → cortado pelo lado direito (some o "ia").
- **Evolução** (i=5, esquerda) fica em `x≈17`; estende de ~-15 a ~39 → cortado pelo lado esquerdo (some o "E", vira "volução").
- **Responsabilidade** também raspa a borda direita em telas menores.

## Correção

Uma única mudança:

- `src/components/po2/EvolutionModel.tsx` (linha 126): adicionar `overflow-visible` ao `<svg>`, permitindo que os labels renderizem fora do viewBox sem alterar posições nem escala do círculo.

```tsx
<svg
  viewBox={`0 0 ${size} ${size}`}
  className="h-[380px] w-[380px] max-w-full overflow-visible"
>
```

Como o container pai (`.relative mt-8 flex items-center justify-center`) não tem `overflow-hidden`, os textos passam a aparecer completos sem quebrar o layout.

Nenhuma outra mudança necessária — dados, tipografia e responsividade permanecem.
