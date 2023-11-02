import type { JSX, ParentProps } from "solid-js";

import { Box, Center, Flex, Separator, Text } from "~/components/core/index.ts";

import styles from "./Section.module.css";

export const Root = (props: ParentProps<{ title: string }>) => {
	return (
		<Box>
			<Text family="mono" size="4" weight="6">
				{props.title}
			</Text>

			<Box p="2">{props.children}</Box>
		</Box>
	);
};

export const Block = (props: { left: JSX.Element; right: JSX.Element }) => {
	return (
		<Flex ai="-:-" jc="between" gap="2" px="8" py="6" class={styles["section-block-root"]}>
			<Center p="2" class={styles["section-block-left"]}>
				{props.left}
			</Center>
			<Separator orientation="vertical" />
			<Box p="2" class={styles["section-block-right"]}>
				{props.right}
			</Box>
		</Flex>
	);
};

export const colors = [
	["bg-cn-1", "bg-cn-2", "bg-cn-3", "bg-cn-4", "bg-cn-5", "bg-cn-6", "bg-cn-7", "bg-cn-8", "bg-cn-9", "bg-cn-10", "bg-cn-11", "bg-cn-12"],
	["bg-cp-1", "bg-cp-2", "bg-cp-3", "bg-cp-4", "bg-cp-5", "bg-cp-6", "bg-cp-7", "bg-cp-8", "bg-cp-9", "bg-cp-10", "bg-cp-11", "bg-cp-12"],
	["bg-cs-1", "bg-cs-2", "bg-cs-3", "bg-cs-4", "bg-cs-5", "bg-cs-6", "bg-cs-7", "bg-cs-8", "bg-cs-9", "bg-cs-10", "bg-cs-11", "bg-cs-12"],
	["bg-ci-1", "bg-ci-2", "bg-ci-3", "bg-ci-4", "bg-ci-5", "bg-ci-6", "bg-ci-7", "bg-ci-8", "bg-ci-9", "bg-ci-10", "bg-ci-11", "bg-ci-12"],
	["bg-cw-1", "bg-cw-2", "bg-cw-3", "bg-cw-4", "bg-cw-5", "bg-cw-6", "bg-cw-7", "bg-cw-8", "bg-cw-9", "bg-cw-10", "bg-cw-11", "bg-cw-12"],
	["bg-cd-1", "bg-cd-2", "bg-cd-3", "bg-cd-4", "bg-cd-5", "bg-cd-6", "bg-cd-7", "bg-cd-8", "bg-cd-9", "bg-cd-10", "bg-cd-11", "bg-cd-12"],
];
