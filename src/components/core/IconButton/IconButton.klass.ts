import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import style from "./IconButton.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [
		style.root,
		"inline-flex relative items-center justify-center select-none cursor-pointer",
		"border border-solid border-transparent",
		"outline outline-1 outline-offset-2 outline-transparent",
	],
	variants: {
		color: {
			neutral: "vars-neutral",
			primary: "vars-primary",
			success: "vars-success",
			info: "vars-info",
			warning: "vars-warning",
			danger: "vars-danger",
		},
		size: {
			md: "w-8 h-8 p-0.5 text-z3 font-w5",
		},
	},
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});

export type { Variants };
export { Root };
