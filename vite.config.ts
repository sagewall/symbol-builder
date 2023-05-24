import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/symbol-builder/",
  build: {
    chunkSizeWarningLimit: 2200
  },
  plugins: [react()]
});
