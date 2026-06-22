// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  devToolbar: { enabled: false },
  integrations: [react()],
  site: "https://symbol-builder.s46e.com",
});
