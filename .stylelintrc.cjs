module.exports = {
  extends: ["@knime/eslint-config/stylelint/vue"],
  rules: {
    "csstools/value-no-unknown-custom-properties": [
      true,
      {
        importFrom: [
          "packages/styles/dist/css/index.css",
          "packages/styles/dist/tokens/css/_variables.css",
        ],
      },
    ],
  },
};
