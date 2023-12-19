import { passthroughImageService } from "astro/config";
import type { AstroUserConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

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
		replacement(),
		stats({
			exts: ["html", "css", "js", "json", "png", "svg", "ico", "ttf"],
		}),
	],
	image: { service: passthroughImageService() },
	server: { host: true, port: 4000 },
	vite: {
		ssr: {
			noExternal: ["@kobalte/core"],
		},
	},
} as AstroUserConfig;
