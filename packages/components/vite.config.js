import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

import { svgoConfig } from "@knime/utils/config/svgo.config";

export default defineConfig({
  plugins: [vue(), svgLoader({ svgoConfig })],
});
