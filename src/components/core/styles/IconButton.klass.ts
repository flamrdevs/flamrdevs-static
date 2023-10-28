import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import styles from "./IconButton.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [
		styles.root,
		"inline-flex relative items-center justify-center select-none cursor-pointer",
		"border border-solid border-transparent",
		"outline outline-1 outline-offset-2 outline-transparent",
	],
	variants: {
		size: {
			md: "w-8 h-8 p-0.5 text-z3 font-w5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type { Variants };
export { Root };
