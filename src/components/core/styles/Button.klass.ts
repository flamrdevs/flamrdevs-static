import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import styles from "./Button.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [
		styles.root,
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
			md: "h-8 px-4 py-0.5 text-z3 font-w5",
		},
	},
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});

export type { Variants };
export { Root };
