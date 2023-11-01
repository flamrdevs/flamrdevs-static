import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Separator as KobalteSeparator } from "@kobalte/core";

import * as Classes from "../classes.ts";
import * as Polymorphic from "../polymorphic.ts";

import * as SeparatorKlass from "./styles/Separator.klass.ts";

type SeparatorProps = Classes.WithProps<
	Polymorphic.PropsWithoutAsChild<Omit<JSX.IntrinsicElements["hr"], "orientation"> & KobalteSeparator.SeparatorRootOptions & SeparatorKlass.Variants>
>;

const Separator = (props: SeparatorProps) => {
	const [classes, root, rest] = splitProps(props, Classes.Keys, SeparatorKlass.Root.vk);
	return <KobalteSeparator.Root {...rest} class={Classes.x(SeparatorKlass.Root(root), classes)} />;
};

export type { SeparatorProps };
export { Separator };
