import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import style from "./Badge.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [style.root, "inline-flex relative items-center justify-center border-none select-none"],
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
			md: "h-4 px-1 text-z1 font-w4",
		},
	},
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});

export type { Variants };
export { Root };
