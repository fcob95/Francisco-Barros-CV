import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // design-assets/ es read-only (no se lintea ni importa); el resto son
    // artefactos generados (build, cobertura, reportes/traces de Playwright).
    ignores: [
      "design-assets/**",
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      ".playwright/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
