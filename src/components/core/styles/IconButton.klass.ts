import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import * as BaseButtonStyle from "./BaseButton.style.ts";

import styles from "./IconButton.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: `${BaseButtonStyle.Root} filter-noise-layer`,
	variants: {
		size: {
			sm: styles.sm,
			md: styles.md,
			lg: styles.lg,
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type { Variants };
export { Root };
