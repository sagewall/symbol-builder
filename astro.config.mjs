// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

const { PUBLIC_BASE } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  ""
);
const { PUBLIC_SITE } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  base: PUBLIC_BASE || "/",
  devToolbar: { enabled: false },
  integrations: [react()],
  site: PUBLIC_SITE || "http://localhost:4321",
});
