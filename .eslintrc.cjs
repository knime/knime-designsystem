// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "@knime/eslint-config/vue3-typescript",
    "@knime/eslint-config/vitest",
  ],
  env: {
    node: true,
    browser: true,
  },
  globals: {
    consola: true,
  },
  ignorePatterns: ["packages/styles/src/tokens"],
};
