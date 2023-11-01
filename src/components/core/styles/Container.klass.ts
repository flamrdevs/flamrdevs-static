import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: "container mx-auto",
	variants: {
		max: {
			xs: "max-w-screen-xs",
			sm: "max-w-screen-sm",
			md: "max-w-screen-md",
			lg: "max-w-screen-lg",
			xl: "max-w-screen-xl",
		},
	},
});

export type { Variants };
export { Root };
