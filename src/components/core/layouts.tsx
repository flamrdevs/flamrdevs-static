import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import * as Classes from "../classes.ts";
import * as Polymorphic from "../polymorphic.ts";

import * as ContainerKlass from "./styles/Container.klass.ts";
import * as klass from "./styles/.klass.ts";
import * as reklass from "./styles/.reklass.ts";

type BoxOptions = Classes.WithProps<klass.TypographyVariants & reklass.LayoutVariants & reklass.PositionVariants & reklass.MarginVariants & reklass.PaddingVariants>;

const Box = ((props) => {
	const [polymorphic, classes, typography, layout, position, margin, padding, rest] = splitProps(
		props,
		Polymorphic.Keys,
		Classes.Keys,
		klass.Typography.vk,
		reklass.Layout.rvk,
		reklass.Position.rvk,
		reklass.Margin.rvk,
		reklass.Padding.rvk
	);

	return (
		<Dynamic
			component={polymorphic.as ?? "div"}
			{...rest}
			class={Classes.x([klass.Typography(typography), reklass.Layout(layout), reklass.Position(position), reklass.Margin(margin), reklass.Padding(padding)], classes)}
		/>
	);
}) as Polymorphic.Component<"div", BoxOptions>;

const BlockKeys = ["inline", "disp"] as const;

const Block = ((props) => {
	const [local, rest] = splitProps(props, BlockKeys);
	return <Box disp={local.disp ?? (local.inline ? "iblock" : "block")} {...(rest as BoxOptions)} />;
}) as Polymorphic.Component<typeof Box, BoxOptions & { inline?: boolean }>;

const FlexKeys = ["inline", "disp"] as const;

const Flex = ((props) => {
	const [local, rest] = splitProps(props, FlexKeys);
	return <Box disp={local.disp ?? (local.inline ? "iflex" : "flex")} {...(rest as BoxOptions)} />;
}) as Polymorphic.Component<typeof Box, BoxOptions & { inline?: boolean }>;

const CenterKeys = ["inline", "disp", "ai", "jc"] as const;

const Center = ((props) => {
	const [local, rest] = splitProps(props, CenterKeys);
	return <Box disp={local.disp ?? (local.inline ? "iflex" : "flex")} ai={local.ai ?? "-:-"} jc={local.jc ?? "-:-"} {...(rest as BoxOptions)} />;
}) as Polymorphic.Component<typeof Box, BoxOptions & { inline?: boolean }>;

const GridKeys = ["inline", "disp"] as const;

const Grid = ((props) => {
	const [local, rest] = splitProps(props, GridKeys);
	return <Box disp={local.disp ?? (local.inline ? "igrid" : "grid")} {...(rest as BoxOptions)} />;
}) as Polymorphic.Component<typeof Box, BoxOptions & { inline?: boolean }>;

type ContainerOptions = Classes.WithProps<ContainerKlass.Variants & reklass.MarginVariants & reklass.PaddingVariants>;

const Container = ((props) => {
	const [polymorphic, classes, recipe, margin, padding, rest] = splitProps(
		props,
		Polymorphic.Keys,
		Classes.Keys,
		ContainerKlass.Root.vk,
		reklass.Margin.rvk,
		reklass.Padding.rvk
	);
	return <Dynamic component={polymorphic.as ?? "div"} {...rest} class={Classes.x([ContainerKlass.Root(recipe), reklass.Margin(margin), reklass.Padding(padding)], classes)} />;
}) as Polymorphic.Component<"div", ContainerOptions>;

export { Box, Block, Flex, Center, Grid, Container };
