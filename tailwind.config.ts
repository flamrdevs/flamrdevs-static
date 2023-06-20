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

const breakpoints = ["xs", "sm", "md", "lg", "xl"];
const responsive = (...classNames: string[]) => {
	let result: string[] = [];
	classNames.forEach((className) => result.push(className, ...breakpoints.map((breakpoint) => `${breakpoint}:${className}`)));
	return result;
};

const space = (property: string) => {
	return [
		`${property}-0`,
		`${property}-1`,
		`${property}-2`,
		`${property}-3`,
		`${property}-4`,
		`${property}-5`,
		`${property}-6`,
		`${property}-7`,
		`${property}-8`,
		`${property}-9`,
		`${property}-10`,
		`${property}-11`,
		`${property}-12`,
		`${property}-14`,
		`${property}-16`,
	];
};

export default {
	content: ["src/**/*.{astro,ts,tsx}"],
	safelist: [
		...responsive("items-start", "items-center", "items-end", "items-stretch"),
		...responsive("justify-center", "justify-center", "justify-end", "justify-around", "justify-between", "justify-evenly"),
		...responsive(...space("gap"), ...space("gap-x"), ...space("gap-y")),
		...responsive(...space("m"), ...space("mx"), ...space("my"), ...space("mt"), ...space("mr"), ...space("mb"), ...space("ml")),
		...responsive(...space("p"), ...space("px"), ...space("py"), ...space("pt"), ...space("pr"), ...space("pb"), ...space("pl")),
	],
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
