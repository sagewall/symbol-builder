// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_BASE, PUBLIC_SITE } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  base: PUBLIC_BASE || "/",
  devToolbar: { enabled: false },
  integrations: [react()],
  site: PUBLIC_SITE || "http://localhost:4321",
  adapter: cloudflare(),
});
