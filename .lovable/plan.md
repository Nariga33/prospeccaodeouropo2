## Problema

Todas as páginas (inclusive a home) retornam 500 com "This page didn't load". Logs do Worker mostram:

```
TypeError: Cannot destructure property '__extends' of '__toESM(...).default' as it is undefined.
```

É o erro típico de interop CJS/ESM do `tslib` quando `pdf-lib` é bundleado no SSR do Cloudflare Workers. O import no topo de `src/routes/api/public/certificate/$token.ts` faz o módulo ser carregado junto com a árvore de rotas, quebrando o init do SSR inteiro.

## Correção

1. **Lazy-load `pdf-lib` dentro do handler** de `src/routes/api/public/certificate/$token.ts`:
   - Remover `import { PDFDocument, StandardFonts, rgb } from "pdf-lib"` do topo.
   - Dentro da função `buildCertificatePdf` (que só roda em resposta ao GET), fazer `const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib")`.
   - Isso tira `pdf-lib` do grafo de import do SSR entry — ele só é resolvido quando a rota `/api/public/certificate/*` é de fato chamada.

2. **Verificar `pdf-lib` em runtime**: se mesmo lazy o Worker reclamar de `tslib` (pdf-lib depende dele), adicionar `optimizeDeps.include: ["pdf-lib", "tslib"]` no `vite.config.ts` para forçar pré-bundle com interop correto. Só aplico se o passo 1 sozinho não resolver.

3. **Validar**: após o deploy, abrir `/` e checar Server Logs — o erro `__extends` deve sumir e a home volta a renderizar. Testar também `/api/public/certificate/<token-válido>` para garantir que o PDF ainda é gerado.

Nada de UI muda. É só o import que é reorganizado para desbloquear o SSR.
