import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: "root inline-block relative overflow-hidden border-none cursor-pointer select-none outline-none outline-1 outline-offset-1",
	variants: {
		color: {
			neutral: "root__color-neutral text-neutral-11 focus-visible:outline-neutral-11",
			primary: "root__color-primary text-primary-11 focus-visible:outline-primary-11",
		},
		size: {
			md: "h-7 p-px",
		},
	},
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});

type InnerVariants = VariantsOf<typeof Inner>;

const Inner = klass({
	base: "inner block relative overflow-hidden w-full h-full",
	variants: {
		color: {
			neutral: "inner__color-neutral",
			primary: "inner__color-primary",
		},
	},
	defaultVariants: {
		color: "neutral",
	},
});

type ChildVariants = VariantsOf<typeof Child>;

const Child = klass({
	base: "inline-flex relative justify-center items-center w-full h-full text-base font-medium",
	variants: {
		font: {
			sans: "font-sans",
			mono: "font-mono",
		},
		size: {
			md: "px-4 py-0.5",
		},
	},
	defaultVariants: {
		font: "sans",
		size: "md",
	},
});

export type { Variants, InnerVariants, ChildVariants };
export { Root, Inner, Child };
