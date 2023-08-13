import { klass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type Variants = VariantsOf<typeof Root>;

const Root = klass({
	variants: {
		inline: {
			true: "inline-block",
			false: "block",
		},
		family: {
			sans: "font-sans",
			mono: "font-mono",
		},
		size: {
			xs: "text-xs",
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
			xl: "text-xl",
			x2l: "text-2xl",
			x3l: "text-3xl",
			x4l: "text-4xl",
			x5l: "text-5xl",
			x6l: "text-6xl",
			x7l: "text-7xl",
			x8l: "text-8xl",
			x9l: "text-9xl",
		},
		weight: {
			300: "font-light",
			400: "font-normal",
			500: "font-medium",
			600: "font-semibold",
			700: "font-bold",
		},
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
		},
	},
	defaultVariants: {
		inline: false,
		family: "sans",
		size: "md",
		weight: 400,
		align: "left",
	},
});

export type { Variants };
export { Root };
