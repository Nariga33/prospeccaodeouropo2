// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      // O build da Cloudflare (via bun) estava resolvendo "tslib" pro bundle
      // UMD/CJS dele, que se autodetecta como "ambiente CommonJS" e marca
      // __esModule=true em cima de si mesmo sem virar ESM de verdade — isso
      // engana o __toESM do bundler (ele espera achar .default e não acha),
      // e quebrava a geração do PDF em produção com "Cannot destructure
      // property '__extends' of '__toESM(...).default'". Forçando a versão
      // ESM nativa do tslib, esse problema de interop desaparece.
      alias: {
        tslib: "tslib/tslib.es6.js",
      },
    },
    ssr: {
      noExternal: ["pdf-lib", "tslib"],
    },
  },
});
