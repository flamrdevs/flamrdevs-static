import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

import coloradix, { gray } from "@coloradix/tailwindcss";

const { colors, plugin } = coloradix({
	gray,
})
	.alias({
		neutral: "gray",
	})
	.overlay(true)
	.enable(true);

export default {
	content: ["src/**/*.{astro,ts,tsx}"],
	theme: {
		screens: {
			xs: "640px",
			sm: "768px",
			md: "1024px",
			lg: "1280px",
			xl: "1536px",
		},
		colors: colors,
		fontFamily: {
			sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
			mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
		},
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [plugin],
} satisfies Config;
