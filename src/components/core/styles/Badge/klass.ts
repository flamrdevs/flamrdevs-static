import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import * as SharedStyle from "../_/shared/style.ts";

import styles from "./style.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: `${styles.root} ${SharedStyle.Border1pxSolidTransparent} filter-noise-layer`,
	variants: {
		size: {
			md: styles.md,
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type { Variants };
export { Root };
