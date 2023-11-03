import type { AstroUserConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

import { replacement, stats } from "./astro.integrations";

export default {
	site: "https://flamrdevs.pages.dev",
	integrations: [
		tailwind(),
		solid(),
		sitemap(),
		compress({
			Logger: 0,
			Exclude: ["icons.svg"],
		}),
		replacement(),
		stats({
			exts: ["html", "css", "js", "json", "png", "svg", "ico", "ttf"],
		}),
	],
	server: { host: true, port: 4000 },
	vite: {
		ssr: {
			noExternal: ["@kobalte/core"],
		},
	},
} as AstroUserConfig;
