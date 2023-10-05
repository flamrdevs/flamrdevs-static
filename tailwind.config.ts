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

const screens = {
	xs: "640px",
	sm: "768px",
	md: "1024px",
	lg: "1280px",
	xl: "1536px",
};

const breakpoints = Object.keys(screens) as (keyof typeof screens)[];
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
			...["justify-start", "justify-center", "justify-end", "justify-stretch", "justify-around", "justify-between", "justify-evenly"],
			...space("gap")
		),
		...responsive(
			...["relative", "absolute", "fixed", "static", "sticky"],
			...["-z-10", "z-0", "z-10", "z-20", "z-30", "z-40", "z-50"],
			...space("top"),
			...space("right"),
			...space("bottom"),
			...space("left")
		),
		...responsive(...space("m"), ...space("mx"), ...space("my"), ...space("mt"), ...space("mr"), ...space("mb"), ...space("ml")),
		...responsive(...space("p"), ...space("px"), ...space("py"), ...space("pt"), ...space("pr"), ...space("pb"), ...space("pl")),
	],
	theme: {
		screens,
		colors: {
			transparent: "transparent",
			current: "currentColor",
			...colors,
		},
		borderRadius: {
			"0": "0",
			"1": "0.0625rem",
			"2": "0.125rem",
			"3": "0.1875rem",
			"4": "0.25rem",
			"5": "0.3125rem",
			"6": "0.375rem",
			"7": "0.4375rem",
			"8": "0.5rem",
			"9": "0.5625rem",
			"10": "0.625rem",
			"11": "0.6875rem",
			"12": "0.75rem",
			"13": "0.8125rem",
			"14": "0.875rem",
			"15": "0.9375rem",
			"16": "1rem",
			"18": "1.125rem",
			"20": "1.25rem",
			"22": "1.375rem",
			"24": "1.5rem",
			"28": "1.75rem",
			"32": "2rem",
			full: "9999px",
		},
		fontFamily: {
			sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
			mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
		},
		fontSize: {
			z1: defaultTheme.fontSize.xs,
			z2: defaultTheme.fontSize.sm,
			z3: defaultTheme.fontSize.base,
			z4: defaultTheme.fontSize.lg,
			z5: defaultTheme.fontSize.xl,
			z6: defaultTheme.fontSize["2xl"],
			z7: defaultTheme.fontSize["3xl"],
			z8: defaultTheme.fontSize["4xl"],
			z9: defaultTheme.fontSize["5xl"],
			z10: defaultTheme.fontSize["6xl"],
			z11: defaultTheme.fontSize["7xl"],
			z12: defaultTheme.fontSize["8xl"],
			z13: defaultTheme.fontSize["9xl"],
		},
		fontWeight: {
			w2: defaultTheme.fontWeight.extralight,
			w3: defaultTheme.fontWeight.light,
			w4: defaultTheme.fontWeight.normal,
			w5: defaultTheme.fontWeight.medium,
			w6: defaultTheme.fontWeight.semibold,
			w7: defaultTheme.fontWeight.bold,
			w8: defaultTheme.fontWeight.extrabold,
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
			borderWidth: {
				3: "3px",
				5: "3px",
			},
			outlineWidth: {
				3: "3px",
				5: "3px",
			},
			outlineOffset: {
				3: "3px",
				5: "3px",
			},
			ringWidth: {
				3: "3px",
				5: "3px",
			},
			ringOffsetWidth: {
				3: "3px",
				5: "3px",
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [plugin],
} satisfies Config;
