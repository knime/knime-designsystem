import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["packages/*"],
    globals: true,
    reporters: ["default", "junit"],
    outputFile: {
      // needed for Bitbucket Pipeline
      // see https://support.atlassian.com/bitbucket-cloud/docs/test-reporting-in-pipelines/
      junit: "test-results/junit.xml",
    },
    coverage: {
      all: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/.DS_Store",
        "coverage/",
        "documentation/",
        "packages/styles/",
        "test-results/**",
        "**/dist/**",
        "**/types/**/*.ts",
        "**/*.d.ts",
        "**/types.ts",
        "**/*.stories.ts",
        "**/vitest.setup.ts",
        "**/*.config.{js,cjs,mjs,ts}",
        "**/.{eslint,prettier,stylelint}rc.{js,cjs,yml}",
      ],
      reporter: ["html", "text", "lcov"],
      reportsDirectory: "./coverage/unit",
    },
  },
});
