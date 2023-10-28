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

type LayoutVariants = VariantsOf<typeof Layout>;
const Layout = reklass({
	conditions: CONDITIONS,
	defaultCondition: DEFAULTCONDITION,
	variants: {
		disp: {
			none: "hidden",
			block: "block",
			iblock: "inline-block",
			flex: "flex",
			iflex: "inline-flex",
			grid: "grid",
			igrid: "inline-grid",
		},
		ai: {
			":--": "items-start",
			"-:-": "items-center",
			"--:": "items-end",
			":::": "items-stretch",
		},
		jc: {
			":--": "justify-center",
			"-:-": "justify-center",
			"--:": "justify-end",
			":::": "justify-stretch",
			around: "justify-around",
			between: "justify-between",
			evenly: "justify-evenly",
		},
		gap: space("gap"),
	},
});

type PositionVariants = VariantsOf<typeof Position>;
const Position = reklass({
	conditions: CONDITIONS,
	defaultCondition: DEFAULTCONDITION,
	variants: {
		posi: {
			rel: "relative",
			abs: "absolute",
			fix: "fixed",
			stc: "static",
			sty: "sticky",
		},
		zi: {
			"-1": "-z-10",
			"0": "z-0",
			"1": "z-10",
			"2": "z-20",
			"3": "z-30",
			"4": "z-40",
			"5": "z-50",
		},
		top: space("top"),
		right: space("right"),
		bottom: space("bottom"),
		left: space("left"),
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

export type { LayoutVariants, PositionVariants, MarginVariants, PaddingVariants };
export { Layout, Position, Margin, Padding };
