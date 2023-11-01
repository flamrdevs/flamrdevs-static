import { splitProps } from "solid-js";

import { Link as KobalteLink } from "@kobalte/core";

import * as Classes from "../classes.ts";
import * as Polymorphic from "../polymorphic.ts";

import * as LinkStyle from "./styles/Link.style.ts";

type LinkOptions = Classes.WithProps<KobalteLink.LinkRootOptions>;

const Link = ((props) => {
	const [classes, rest] = splitProps(props, Classes.Keys);
	return <KobalteLink.Root {...rest} class={Classes.x(LinkStyle.Root, classes)} />;
}) as Polymorphic.Component<typeof KobalteLink.Root, LinkOptions>;

export type { LinkOptions };
export { Link };
