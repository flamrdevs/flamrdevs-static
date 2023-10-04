import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import style from "./Button.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [style.root, "inline-block relative overflow-hidden border-none cursor-pointer select-none outline-none outline-1 outline-offset-1"],
	variants: {
		color: {
			neutral: "vars-neutral text-neutral-11 focus-visible:outline-neutral-11",
			primary: "vars-primary text-primary-11 focus-visible:outline-primary-11",
		},
		size: {
			md: "h-8 p-px",
		},
	},
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});

type InnerVariants = VariantsOf<typeof Inner>;

const Inner = klass({
	base: [style.inner, "block relative overflow-hidden w-full h-full"],
	variants: {
		color: {
			neutral: "vars-neutral",
			primary: "vars-primary",
		},
	},
	defaultVariants: {
		color: "neutral",
	},
});

type ChildVariants = VariantsOf<typeof Child>;

const Child = klass({
	base: "inline-flex relative justify-center items-center w-full h-full text-z3 font-w5",
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
