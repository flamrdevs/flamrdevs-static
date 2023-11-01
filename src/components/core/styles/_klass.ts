import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

const DEFAULT_COLORS_VARIANTS = {
	color: "neutral",
} as const;

type Color2Variants = VariantsOf<typeof Color2>;

const Color2 = klass({
	variants: {
		color: {
			neutral: "vars-neutral",
			primary: "vars-primary",
		},
	},
	defaultVariants: DEFAULT_COLORS_VARIANTS,
});

type Color6Variants = VariantsOf<typeof Color6>;

const Color6 = klass({
	variants: {
		color: {
			neutral: "vars-neutral",
			primary: "vars-primary",
			success: "vars-success",
			info: "vars-info",
			warning: "vars-warning",
			danger: "vars-danger",
		},
	},
	defaultVariants: DEFAULT_COLORS_VARIANTS,
});

type TypographyVariants = VariantsOf<typeof Typography>;

const Typography = klass({
	variants: {
		ff: {
			sans: "font-sans",
			mono: "font-mono",
		},
		fz: {
			"1": "text-z1",
			"2": "text-z2",
			"3": "text-z3",
			"4": "text-z4",
			"5": "text-z5",
			"6": "text-z6",
			"7": "text-z7",
			"8": "text-z8",
			"9": "text-z9",
			"10": "text-z10",
			"11": "text-z11",
			"12": "text-z12",
			"13": "text-z13",
		},
		fw: {
			"2": "font-w2",
			"3": "font-w3",
			"4": "font-w4",
			"5": "font-w5",
			"6": "font-w6",
			"7": "font-w7",
			"8": "font-w8",
		},
		ta: {
			":--": "text-left",
			"-:-": "text-center",
			"--:": "text-right",
		},
	},
});

export type { Color2Variants, Color6Variants, TypographyVariants };
export { Color2, Color6, Typography };
