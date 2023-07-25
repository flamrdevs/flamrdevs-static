import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import style from "./IconButton.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [style.root, "inline-block relative overflow-hidden border-none cursor-pointer select-none outline-none outline-1 outline-offset-1"],
	variants: {
		color: {
			neutral: [style["root__color-neutral"], "text-neutral-11 focus-visible:outline-neutral-11"],
			primary: [style["root__color-primary"], "text-primary-11 focus-visible:outline-primary-11"],
		},
		size: {
			md: "w-8 h-8 p-px",
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
			neutral: style["inner__color-neutral"],
			primary: style["inner__color-primary"],
		},
	},
	defaultVariants: {
		color: "neutral",
	},
});

type ChildVariants = VariantsOf<typeof Child>;

const Child = klass({
	base: "inline-flex relative justify-center items-center w-full h-full",
	variants: {
		size: {
			md: "p-0.5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type { Variants, InnerVariants, ChildVariants };
export { Root, Inner, Child };
