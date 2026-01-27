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
      include: ["packages/**/src/**/**.{js,jsx,ts,tsx,vue}"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "packages/styles/",
        "**/*.d.ts",
        "**/types.ts",
        "**/*.stories.ts",
      ],
      reporter: ["html", "text", "lcov"],
      reportsDirectory: "./coverage/unit",
    },
  },
});
