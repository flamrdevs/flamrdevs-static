import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import styles from "./Loader.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	variants: {
		color: {
			neutral: "stroke-neutral-9",
			primary: "stroke-primary-9",
		},
		size: {
			sm: "w-8 h-8",
			md: "w-10 h-10",
			lg: "w-12 h-12",
		},
	},
	defaultVariants: {
		color: "primary",
		size: "md",
	},
});

export const G = styles.g;

export const Circle = styles.circle;

export type { Variants };
export { Root };
