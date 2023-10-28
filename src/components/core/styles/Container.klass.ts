import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: "container",
	variants: {
		center: {
			true: "mx-auto",
		},
		max: {
			xs: "max-w-screen-xs",
			sm: "max-w-screen-sm",
			md: "max-w-screen-md",
			lg: "max-w-screen-lg",
			xl: "max-w-screen-xl",
		},
	},
	defaultVariants: {
		center: true,
	},
});

export type { Variants };
export { Root };
