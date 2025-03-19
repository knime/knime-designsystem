import { fileURLToPath } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

import { svgoConfig } from "@knime/styles/config/svgo.config";

export default defineConfig({
  plugins: [vue(), svgLoader({ svgoConfig })],
  test: {
    environment: "jsdom",
    setupFiles: [fileURLToPath(new URL("vitest.setup.ts", import.meta.url))],
  },
});
