import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

export default defineConfig({
  site: "https://flamrdevs.pages.dev",
  integrations: [tailwind(), compress()],
  server: { host: true, port: 4000 },
});
