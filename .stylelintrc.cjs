module.exports = {
  extends: [
    "@knime/eslint-config/stylelint/vue",
    "stylelint-config-recess-order", // TODO move to @knime/eslint-config/stylelint
  ],
  plugins: ["stylelint-value-no-unknown-custom-properties"], // TODO move to @knime/eslint-config/stylelint
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
