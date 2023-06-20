import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

import { stats } from "./astro.integrations";

export default defineConfig({
	site: "https://flamrdevs.pages.dev",
	integrations: [tailwind(), solid(), sitemap(), compress({ logger: 1 }), stats()],
	server: { host: true, port: 4000 },
});
