import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

import coloradix, { gray, violet, green, blue, yellow, red } from "@coloradix/tailwindcss";

const { colors, plugin } = coloradix({
	gray,
	violet,
	green,
	blue,
	yellow,
	red,
})
	.alias({
		neutral: "gray",
		primary: "violet",
		success: "green",
		info: "blue",
		warning: "yellow",
		danger: "red",
	})
	.build();

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
	content: ["src/**/*.{astro,ts,tsx}", "src/components/core/.{klass,reklass}.ts"],
	safelist: [
		...responsive(
			...["hidden", "block", "inline-block", "flex", "inline-flex", "grid", "inline-grid"],
			...["items-start", "items-center", "items-end", "items-stretch"],
			...["justify-center", "justify-center", "justify-end", "justify-stretch", "justify-around", "justify-between", "justify-evenly"],
			...space("gap")
		),
		...responsive(
			...["relative", "absolute", "fixed", "static", "sticky"],
			...["z-0", "z-10", "z-20", "z-30", "z-40", "z-50"],
			...space("top"),
			...space("right"),
			...space("bottom"),
			...space("left")
		),
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
		colors: {
			transparent: "transparent",
			current: "currentColor",
			...colors,
		},
		fontFamily: {
			sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
			mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
		},
		extend: {
			scale: {
				"96": "0.96",
				"97": "0.97",
				"98": "0.98",
				"99": "0.99",
				"101": "1.01",
				"102": "1.02",
				"103": "1.03",
				"104": "1.04",
			},
			spacing: {
				112: "28rem",
				128: "32rem",
				144: "36rem",
				160: "40rem",
			},
			width: {
				screen: "100dvw",
			},
			height: {
				screen: "100dvh",
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [plugin],
} satisfies Config;
