import { mergeProps, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Image as KobalteImage, Progress as KobalteProgress } from "@kobalte/core";

import * as Children from "../children.ts";
import * as Classes from "../classes.ts";
import * as Polymorphic from "../polymorphic.ts";

import * as Icons from "./../icons/shared.ts";

import * as BadgeKlass from "./styles/Badge.klass.ts";
import * as ImageStyle from "./styles/Image.style.ts";
import * as KbdStyle from "./styles/Kbd.style.ts";
import * as ProgressStyle from "./styles/Progress.style.ts";
import * as klass from "./styles/_klass.ts";

type BadgeProps = Classes.WithProps<JSX.IntrinsicElements["span"] & BadgeKlass.Variants & klass.Color6Variants>;

const Badge = (props: BadgeProps) => {
	const [classes, root, color, rest] = splitProps(props, Classes.Keys, BadgeKlass.Root.vk, klass.Color6.vk);
	return <span {...rest} class={Classes.x([BadgeKlass.Root(root), klass.Color6(color)], classes)} />;
};

type IconProps = Omit<JSX.SvgSVGAttributes<SVGSVGElement>, keyof Icons.ComponentProps> & Icons.ComponentProps;

const DefaultIconProps = {
	i: Icons.DEFAULT_ICON,
	size: Icons.DEFAULT_SIZE,
	class: Icons.DEFAULT_CLASS,
} satisfies Icons.ComponentProps & { class: string };

const IconKeys = ["i", "class", "size"] as const;

const DimensionKeys = ["width", "height"] as const;

const Icon = (props: IconProps) => {
	const [local, dimension, other] = splitProps(mergeProps(DefaultIconProps, props), IconKeys, DimensionKeys);

	return (
		<svg
			viewBox="0 0 24 24"
			stroke="currentColor"
			{...mergeProps({ width: local.size, height: local.size } satisfies { [K in (typeof DimensionKeys)[number]]?: string | number }, dimension)}
			{...other}
			class={`lucide ${local.class}`}
		>
			<use href={`${Icons.href}${local.i}`} />
		</svg>
	);
};

type ImageProps = Polymorphic.PropsWithoutAsChild<KobalteImage.ImageRootProps & Pick<KobalteImage.ImageImgProps, "alt" | "src">>;

const ImageImgKeys = ["alt", "src"] as const;

const Image = (props: ImageProps) => {
	const [children, classes, img, rest] = splitProps(props, Children.Keys, Classes.Keys, ImageImgKeys);
	return (
		<KobalteImage.Root {...rest} class={Classes.x([ImageStyle.Root], classes)}>
			<KobalteImage.Img {...img} class={ImageStyle.Img} />
			<KobalteImage.Fallback {...children} class={ImageStyle.Fallback} />
		</KobalteImage.Root>
	);
};

type KbdProps = JSX.IntrinsicElements["kbd"] & klass.Color2Variants;

const Kbd = (props: KbdProps) => {
	const [classes, color, rest] = splitProps(props, Classes.Keys, klass.Color2.vk);
	return <kbd {...rest} class={Classes.x([KbdStyle.Root, klass.Color2(color)], classes)} />;
};

type ProgressProps = Children.WithoutProps<
	Polymorphic.PropsWithoutAsChild<
		KobalteProgress.ProgressRootProps & {
			label: string;
		} & klass.Color6Variants
	>
>;

const ProgressLocalKeys = ["label"] as const;

const Progress = (props: ProgressProps) => {
	const [classes, local, color, rest] = splitProps(props, Classes.Keys, ProgressLocalKeys, klass.Color6.vk);

	return (
		<KobalteProgress.Root {...rest} class={Classes.x([ProgressStyle.Root, klass.Color6(color)], classes)}>
			<div class={ProgressStyle.Container}>
				<KobalteProgress.Label class={ProgressStyle.Label}>{local.label}</KobalteProgress.Label>
				<KobalteProgress.ValueLabel class={ProgressStyle.Label} />
			</div>
			<KobalteProgress.Track class={ProgressStyle.Track}>
				<KobalteProgress.Fill class={ProgressStyle.Fill} />
			</KobalteProgress.Track>
		</KobalteProgress.Root>
	);
};

export type { BadgeProps, IconProps, ImageProps, KbdProps, ProgressProps };
export { Badge, Icon, Image, Kbd, Progress };
