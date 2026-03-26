import storybook from "eslint-plugin-storybook";
import globals from "globals";

import knimeVitest from "@knime/eslint-config/vitest.js";
import createKnimeVueTSConfig from "@knime/eslint-config/vue3-typescript.js";

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
  {
    files: ["**/*.vue"],
    rules: {
      "vue/require-default-prop": "off",
      "vue/attribute-hyphenation": [
        "error",
        "always",
        { ignore: ["ariaLabel"] },
      ],
    },
  },
  {
    files: ["**/*.stories.ts"],
    rules: {
      "max-lines": "off",
      "no-magic-numbers": "off",
    },
  },
];
