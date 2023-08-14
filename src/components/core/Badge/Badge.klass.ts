import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import style from "./Badge.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [style.root, "inline-block relative overflow-hidden border-none cursor-pointer select-none"],
	variants: {
		color: {
			neutral: [style["root__color-neutral"], "text-neutral-11"],
			primary: [style["root__color-primary"], "text-primary-11"],
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
	base: "inline-flex relative justify-center items-center w-full h-full text-sm font-medium",
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
