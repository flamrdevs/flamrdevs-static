import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import styles from "./Badge.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [styles.root, "inline-flex relative items-center justify-center select-none", "border border-solid border-transparent"],
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
