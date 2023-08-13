import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	variants: {
		inline: {
			true: "inline-flex",
			false: "flex",
		},
	},
	defaultVariants: {
		inline: false,
	},
});

export type { Variants };
export { Root };
