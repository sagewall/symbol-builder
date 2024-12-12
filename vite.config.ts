import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_NAME,
    build: {
      chunkSizeWarningLimit: 2600,
      external: ["^@arcgis/", "^@esri/"]
    },
    plugins: [react()],
  };
});
