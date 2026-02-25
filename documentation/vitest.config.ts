import path from "node:path";
import { fileURLToPath } from "node:url";

import vue from "@vitejs/plugin-vue";
import { playwright } from "@vitest/browser-playwright";
import { coverageConfigDefaults, defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import svgLoader from "vite-svg-loader";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ svgo: false }),
    // The plugin will run tests for the stories defined in your Storybook config
    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    storybookTest({
      configDir: path.join(dirname, ".storybook"),
    }),
  ],
  test: {
    name: "storybook",
    testTimeout: 30000,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
    setupFiles: [".storybook/vitest.setup.ts"],
    reporters: ["default", "junit"],
    outputFile: {
      junit: "test-results/junit.xml",
    },
    coverage: {
      provider: "v8",
      reporter: ["html", "text", "lcov"],
      reportsDirectory: "coverage/storybook",
      include: ["**/*.{vue,ts}"],
      allowExternal: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        "../packages/styles/",
        "**/*.d.ts",
        "**/{index,types,enums}.ts",
        "**/*.stories.*",
        ".storybook/**",
        "test-results/**",
        "test-utils/**",
      ],
    },
  },
});
