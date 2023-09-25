import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type TypographyVariants = VariantsOf<typeof Typography>;

const Typography = klass({
	variants: {
		ff: {
			sans: "font-sans",
			mono: "font-mono",
		},
		fz: {
			"1": "text-xs",
			"2": "text-sm",
			"3": "text-base",
			"4": "text-lg",
			"5": "text-xl",
			"6": "text-2xl",
			"7": "text-3xl",
			"8": "text-4xl",
			"9": "text-5xl",
			"10": "text-6xl",
			"11": "text-7xl",
			"12": "text-8xl",
			"13": "text-9xl",
		},
		fs: {
			n: "not-italic",
			i: "italic",
		},
		fw: {
			"2": "font-extralight",
			"3": "font-light",
			"4": "font-normal",
			"5": "font-medium",
			"6": "font-semibold",
			"7": "font-bold",
			"8": "font-extrabold",
		},
		ta: {
			":--": "text-left",
			"-:-": "text-center",
			"--:": "text-right",
		},
	},
});

export type { TypographyVariants };
export { Typography };
