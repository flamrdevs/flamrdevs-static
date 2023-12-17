import type { AstroUserConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

import { replacement, stats } from "./astro.integrations";

import { STATIC_PROD } from "./src/const/host.ts";

export default {
	site: STATIC_PROD,
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
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
