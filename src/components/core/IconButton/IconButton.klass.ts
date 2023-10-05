import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import style from "./IconButton.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [style.root, "inline-flex relative items-center justify-center border-none outline-none outline-1 outline-offset-3 select-none cursor-pointer"],
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
