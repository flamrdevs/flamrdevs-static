import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

const __variants = "variants";
const __defaultVariants = "defaultVariants";

const __color = "color";

const __neutral = "neutral";
const __primary = "primary";
const __success = "success";
const __info = "info";
const __warning = "warning";
const __danger = "danger";

const DEFAULT_COLORS_VARIANTS = {
	[__color]: __neutral,
} as const;

type Color2Variants = VariantsOf<typeof Color2>;

const Color2 = klass({
	[__variants]: {
		[__color]: {
			[__neutral]: "va-n",
			[__primary]: "va-p",
		},
	},
	[__defaultVariants]: DEFAULT_COLORS_VARIANTS,
});

type Color6Variants = VariantsOf<typeof Color6>;

const Color6 = klass({
	[__variants]: {
		[__color]: {
			[__neutral]: "va-n",
			[__primary]: "va-p",
			[__success]: "va-s",
			[__info]: "va-i",
			[__warning]: "va-w",
			[__danger]: "va-d",
		},
	},
	[__defaultVariants]: DEFAULT_COLORS_VARIANTS,
});

type TypographyVariants = VariantsOf<typeof Typography>;

const Typography = klass({
	[__variants]: {
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
