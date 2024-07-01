import react from "@vitejs/plugin-react";
import { bundleStats } from "rollup-plugin-bundle-stats";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_NAME,
    build: {
      chunkSizeWarningLimit: 2500
    },
    plugins: [
      bundleStats({
        baseline: true
      }),
      react(),
      visualizer({
        brotliSize: true,
        filename: "./dist/stats.html",
        gzipSize: true,
        open: true,
        template: "sunburst"
      })
    ]
  };
});
