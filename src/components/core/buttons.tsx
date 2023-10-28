import { splitProps } from "solid-js";

import { Button as KobalteButton } from "@kobalte/core";

import * as Classes from "../classes.ts";
import * as Polymorphic from "../polymorphic.ts";

import * as ButtonKlass from "./styles/Button.klass.ts";
import * as IconButtonKlass from "./styles/IconButton.klass.ts";

type ButtonOptions = Classes.WithProps<Polymorphic.PropsWithoutAsChild<KobalteButton.ButtonRootOptions & ButtonKlass.Variants>>;

const Button = ((props) => {
	const [classes, recipe, rest] = splitProps(props, Classes.Keys, ButtonKlass.Root.vk);
	return <KobalteButton.Root {...rest} class={Classes.x(ButtonKlass.Root(recipe), classes)} />;
}) as Polymorphic.Component<typeof KobalteButton.Root, ButtonOptions>;

type IconButtonOptions = Classes.WithProps<Polymorphic.PropsWithoutAsChild<KobalteButton.ButtonRootOptions & IconButtonKlass.Variants>>;

const IconButton = ((props) => {
	const [classes, recipe, rest] = splitProps(props, Classes.Keys, IconButtonKlass.Root.vk);
	return <KobalteButton.Root {...rest} class={Classes.x(IconButtonKlass.Root(recipe), classes)} />;
}) as Polymorphic.Component<typeof KobalteButton.Root, IconButtonOptions>;

export type { ButtonOptions, IconButtonOptions };
export { Button, IconButton };
