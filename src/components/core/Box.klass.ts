import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	variants: {
		inline: {
			true: "inline-block",
			false: "block",
		},
	},
	defaultVariants: {
		inline: false,
	},
});

export type { Variants };
export { Root };
