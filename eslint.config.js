import storybook from "eslint-plugin-storybook";
import globals from "globals";

import knimeVitest from "@knime/eslint-config/vitest.js";
import createKnimeVueTSConfig from "@knime/eslint-config/vue3-typescript.js";

/*
// get absolute path to tsconfig so that ide and cli both work
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tsconfigPath = path.resolve(__dirname, "tsconfig.eslint.json");
*/

export default [
  {
    ignores: [
      "packages/styles/src/tokens/*",
      "documentation/storybook-static/**",
    ],
  },
  ...createKnimeVueTSConfig(/* tsconfigPath */),
  ...knimeVitest,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        consola: true,
      },
    },
  },
  ...storybook.configs["flat/recommended"],
];
