import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

import styles from "./Separator.module.css";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: [styles.root, "block border-none border-0"],
	variants: {
		margin: {
			"0": styles.m0,
			"1": styles.m1,
			"2": styles.m2,
			"3": styles.m3,
			"4": styles.m4,
		},
	},
	defaultVariants: {
		margin: "1",
	},
});

export type { Variants };
export { Root };
