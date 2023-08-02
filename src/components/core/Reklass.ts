import { reklass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

const CONDITIONS = {
	__: "",
	xs: "xs:",
	sm: "sm:",
	md: "md:",
	lg: "lg:",
	xl: "xl:",
} as const;

const DEFAULTCONDITION = "__" satisfies keyof typeof CONDITIONS;

const space = (property: string) => {
	return {
		"0": `${property}-0`,
		"1": `${property}-1`,
		"2": `${property}-2`,
		"3": `${property}-3`,
		"4": `${property}-4`,
		"5": `${property}-5`,
		"6": `${property}-6`,
		"7": `${property}-7`,
		"8": `${property}-8`,
		"9": `${property}-9`,
		"10": `${property}-10`,
		"11": `${property}-11`,
		"12": `${property}-12`,
		"14": `${property}-14`,
		"16": `${property}-16`,
	};
};

type DisplayVariants = VariantsOf<typeof Display>;
const Display = reklass({
	conditions: CONDITIONS,
	defaultCondition: DEFAULTCONDITION,
	variants: {
		d: {
			none: "hidden",
			block: "block",
			iblock: "inline-block",
			flex: "flex",
			iflex: "inline-flex",
		},
	},
});

type AlignVariants = VariantsOf<typeof Align>;
const Align = reklass({
	conditions: CONDITIONS,
	defaultCondition: DEFAULTCONDITION,
	variants: {
		ai: {
			start: "items-start",
			center: "items-center",
			end: "items-end",
			strect: "items-stretch",
		},
	},
});

type JustifyVariants = VariantsOf<typeof Justify>;
const Justify = reklass({
	conditions: CONDITIONS,
	defaultCondition: DEFAULTCONDITION,
	variants: {
		jc: {
			start: "justify-center",
			center: "justify-center",
			end: "justify-end",
			around: "justify-around",
			between: "justify-between",
			evenly: "justify-evenly",
		},
	},
});

type GapVariants = VariantsOf<typeof Gap>;
const Gap = reklass({
	conditions: CONDITIONS,
	defaultCondition: DEFAULTCONDITION,
	variants: {
		gap: space("gap"),
		gapx: space("gap-x"),
		gapy: space("gap-y"),
	},
});

type MarginVariants = VariantsOf<typeof Margin>;
const Margin = reklass({
	conditions: CONDITIONS,
	defaultCondition: DEFAULTCONDITION,
	variants: {
		m: space("m"),
		mx: space("mx"),
		my: space("my"),
		mt: space("mt"),
		mr: space("mr"),
		mb: space("mb"),
		ml: space("ml"),
	},
});

type PaddingVariants = VariantsOf<typeof Padding>;
const Padding = reklass({
	conditions: CONDITIONS,
	defaultCondition: DEFAULTCONDITION,
	variants: {
		p: space("p"),
		px: space("px"),
		py: space("py"),
		pt: space("pt"),
		pr: space("pr"),
		pb: space("pb"),
		pl: space("pl"),
	},
});

export const splitter = {
	display: Display.rvk,
	align: Align.rvk,
	justify: Justify.rvk,
	gap: Gap.rvk,
	margin: Margin.rvk,
	padding: Padding.rvk,
};

export type { DisplayVariants, AlignVariants, JustifyVariants, GapVariants, MarginVariants, PaddingVariants };
export { Display, Align, Justify, Gap, Margin, Padding };
