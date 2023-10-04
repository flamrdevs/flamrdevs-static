import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import style from "./Badge.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [style.root, "inline-block relative overflow-hidden border-none select-none"],
	variants: {
		color: {
			neutral: "vars-neutral text-neutral-11",
			primary: "vars-primary text-primary-11",
		},
		size: {
			md: "h-5 p-px",
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
	base: "inline-flex relative justify-center items-center w-full h-full text-z2 font-w5",
	variants: {
		font: {
			sans: "font-sans",
			mono: "font-mono",
		},
		size: {
			md: "px-1",
		},
	},
	defaultVariants: {
		font: "sans",
		size: "md",
	},
});

export type { Variants, InnerVariants, ChildVariants };
export { Root, Inner, Child };
