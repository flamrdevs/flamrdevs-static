import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import * as Classes from "../classes.ts";
import * as Polymorphic from "../polymorphic.ts";

import * as klass from "./styles/_/klass.ts";
import * as reklass from "./styles/_/reklass.ts";

type TextOptions = Classes.WithProps<
	{
		family?: klass.TypographyVariants["ff"];
		size?: klass.TypographyVariants["fz"];
		weight?: klass.TypographyVariants["fw"];
		align?: klass.TypographyVariants["ta"];
	} & reklass.MarginVariants &
		reklass.PaddingVariants
>;

const TextKeys = ["family", "size", "weight", "align"] as const;

const Text = ((props) => {
	const [polymorphic, classes, local, margin, padding, rest] = splitProps(props, Polymorphic.Keys, Classes.Keys, TextKeys, reklass.Margin.rvk, reklass.Padding.rvk);

	return (
		<Dynamic
			component={polymorphic.as ?? "div"}
			{...rest}
			class={Classes.x(
				[
					klass.Typography({
						ff: local.family ?? "sans",
						fz: local.size ?? "3",
						fw: local.weight ?? "4",
						ta: local.align ?? ":--",
					}),
					reklass.Margin(margin),
					reklass.Padding(padding),
				],
				classes
			)}
		/>
	);
}) as Polymorphic.Component<"div", TextOptions>;

export type { TextOptions };
export { Text };
