import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_NAME,
    build: {
      chunkSizeWarningLimit: 2200
    },
    plugins: [
      react(),
      visualizer({
        template: "treemap",
        open: true,
        gzipSize: true,
        filename: "analyze.html"
      })
    ]
  };
});
