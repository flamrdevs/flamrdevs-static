import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import * as Classes from "../classes.ts";

import * as LoaderKlass from "./styles/Loader.klass.ts";
import * as klass from "./styles/.klass.ts";

type LoaderProps = Classes.WithProps<JSX.IntrinsicElements["svg"] & LoaderKlass.Variants & klass.Color2Variants>;

const Loader = (props: LoaderProps) => {
	const [classes, recipe, color, rest] = splitProps(props, Classes.Keys, LoaderKlass.Root.vk, klass.Color2.vk);

	return (
		<svg {...rest} class={Classes.x([LoaderKlass.Root(recipe), klass.Color2(color)], classes)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<g class={LoaderKlass.G}>
				<circle class={LoaderKlass.Circle} cx="12" cy="12" r="9.5" fill="none" stroke-width="2" />
			</g>
		</svg>
	);
};

export { Loader };
