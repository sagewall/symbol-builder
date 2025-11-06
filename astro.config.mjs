// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

const { VITE_BASE_NAME } = loadEnv(
  process.env.NODE_ENV || "/",
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: {
    base: VITE_BASE_NAME,
    build: {
      chunkSizeWarningLimit: 5600,
    },
  },
});
