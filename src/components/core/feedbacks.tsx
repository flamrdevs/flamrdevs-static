import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import * as Classes from "../classes.ts";

import * as LoaderKlass from "./styles/Loader.klass.ts";

type LoaderProps = Classes.WithProps<JSX.IntrinsicElements["svg"] & LoaderKlass.Variants>;

const LoaderKeys = ["color", "size"] as const;

const Loader = (props: LoaderProps) => {
	const [classes, recipe, rest] = splitProps(props, Classes.Keys, LoaderKeys);

	return (
		<svg {...rest} class={Classes.x(LoaderKlass.Root(recipe), classes)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<g class={LoaderKlass.G}>
				<circle class={LoaderKlass.Circle} cx="12" cy="12" r="9.5" fill="none" stroke-width="2" />
			</g>
		</svg>
	);
};

export { Loader };
