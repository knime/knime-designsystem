import { resolve } from "path";
import { fileURLToPath } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import svgLoader from "vite-svg-loader";

import { svgoConfig } from "@knime/styles/config/svgo.config";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ svgoConfig }),
    dts({
      include: ["src/**/*"],
      exclude: ["src/**/*.stories.ts", "src/**/__tests__/**/*"],
      tsconfigPath: "./tsconfig.build.json",
    }),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "KNIME Design System Components",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue", "@vueuse/core"],
      output: {
        globals: {
          vue: "Vue",
          "@vueuse/core": "VueUse",
        },
      },
    },
    target: "esnext",
    minify: false,
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: [fileURLToPath(new URL("vitest.setup.ts", import.meta.url))],
  },
});
