import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  // leaving svgo off so that src icons are not optimized, dist icons have been optimized already anyways
  plugins: [vue(), svgLoader({ svgo: false })],
});
