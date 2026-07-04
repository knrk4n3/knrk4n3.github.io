import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

// https://nuxt.com/docs/api/configuration/nuxt-config
const require = createRequire(import.meta.url);
const piniaEsmPath = resolve(
  dirname(require.resolve("pinia/package.json")),
  "dist/pinia.mjs",
);

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  alias: {
    // Force Pinia to resolve to its ESM build so SSR prerender does not
    // bundle the production CJS entry, which expects a Vue default export.
    pinia: piniaEsmPath,
  },
  modules: ["@pinia/nuxt"],
  app: {
    pageTransition: {
      name: "page-fade",
      mode: "out-in",
    },
  },
  css: ["./app/assets/styles.css"],
});
