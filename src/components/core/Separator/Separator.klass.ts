import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	base: "root block border-none border-0",
	variants: {
		margin: {
			"0": "root__margin-0",
			"1": "root__margin-1",
			"2": "root__margin-2",
			"3": "root__margin-3",
			"4": "root__margin-4",
		},
	},
	defaultVariants: {
		margin: "1",
	},
});

export type { Variants };
export { Root };
