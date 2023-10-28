import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Separator as KobalteSeparator } from "@kobalte/core";

import * as Classes from "../classes.ts";
import * as Polymorphic from "../polymorphic.ts";

import * as SeparatorKlass from "./styles/Separator.klass.ts";

type SeparatorProps = Classes.WithProps<
	Polymorphic.PropsWithoutAsChild<Omit<JSX.IntrinsicElements["hr"], "orientation"> & KobalteSeparator.SeparatorRootOptions & SeparatorKlass.Variants>
>;

const SeparatorKeys = ["margin"] as const;

const Separator = (props: SeparatorProps) => {
	const [classes, recipe, rest] = splitProps(props, Classes.Keys, SeparatorKeys);
	return <KobalteSeparator.Root {...rest} class={Classes.x(SeparatorKlass.Root(recipe), classes)} />;
};

export { Separator };
