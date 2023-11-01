import { For, Show, createSignal } from "solid-js";
import type { JSX, ParentProps } from "solid-js";

import { Badge, Box, Button, Center, Checkbox, Flex, Icon, IconButton, Image, Kbd, Link, Loader, Progress, Separator, Switch, Text } from "~/components/core/index.ts";

import styles from "./Section.module.css";

const Section = (props: ParentProps<{ title: string }>) => {
	return (
		<Box>
			<Text family="mono" size="4" weight="6">
				{props.title}
			</Text>

			<Box p="2">{props.children}</Box>
		</Box>
	);
};

const SectionBlock = (props: { left: JSX.Element; right: JSX.Element }) => {
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

type Color2 = (typeof COLOR_2)[number];
type Color6 = (typeof COLOR_6)[number];
const COLOR_2 = ["neutral", "primary"] as const;
const COLOR_6 = [...COLOR_2, "success", "info", "warning", "danger"] as const;

const DEFAULT_COLOR = "neutral" satisfies Color2;

const createColor2 = () => createSignal<Color2>(DEFAULT_COLOR);
const createColor6 = () => createSignal<Color6>(DEFAULT_COLOR);
const createDisabled = () => createSignal<boolean>(false);

const Color2Select = (props: { color: Color2; setColor: (value: Color2) => void }) => (
	<Flex gap="1">
		<For each={COLOR_2}>
			{(color) => (
				<IconButton color={color} size="sm" onClick={() => props.setColor(color)}>
					<Show when={props.color === color}>
						<Icon i="Check" style={{ width: "80%", height: "80%" }} />
					</Show>
				</IconButton>
			)}
		</For>
	</Flex>
);
const Color6Select = (props: { color: Color6; setColor: (value: Color6) => void }) => (
	<Flex gap="1">
		<For each={COLOR_6}>
			{(color) => (
				<IconButton color={color} size="sm" onClick={() => props.setColor(color)}>
					<Show when={props.color === color}>
						<Icon i="Check" style={{ width: "80%", height: "80%" }} />
					</Show>
				</IconButton>
			)}
		</For>
	</Flex>
);
const DisabledSwitch = (props: { disabled: boolean; setDisabled: (value: boolean) => void }) => <Switch label="Disabled" checked={props.disabled} onChange={props.setDisabled} />;

const Divider = () => <Separator orientation="horizontal" />;

const SectionColor = () => {
	const colors = [
		["bg-cn-1", "bg-cn-2", "bg-cn-3", "bg-cn-4", "bg-cn-5", "bg-cn-6", "bg-cn-7", "bg-cn-8", "bg-cn-9", "bg-cn-10", "bg-cn-11", "bg-cn-12"],
		["bg-cp-1", "bg-cp-2", "bg-cp-3", "bg-cp-4", "bg-cp-5", "bg-cp-6", "bg-cp-7", "bg-cp-8", "bg-cp-9", "bg-cp-10", "bg-cp-11", "bg-cp-12"],
		["bg-cs-1", "bg-cs-2", "bg-cs-3", "bg-cs-4", "bg-cs-5", "bg-cs-6", "bg-cs-7", "bg-cs-8", "bg-cs-9", "bg-cs-10", "bg-cs-11", "bg-cs-12"],
		["bg-ci-1", "bg-ci-2", "bg-ci-3", "bg-ci-4", "bg-ci-5", "bg-ci-6", "bg-ci-7", "bg-ci-8", "bg-ci-9", "bg-ci-10", "bg-ci-11", "bg-ci-12"],
		["bg-cw-1", "bg-cw-2", "bg-cw-3", "bg-cw-4", "bg-cw-5", "bg-cw-6", "bg-cw-7", "bg-cw-8", "bg-cw-9", "bg-cw-10", "bg-cw-11", "bg-cw-12"],
		["bg-cd-1", "bg-cd-2", "bg-cd-3", "bg-cd-4", "bg-cd-5", "bg-cd-6", "bg-cd-7", "bg-cd-8", "bg-cd-9", "bg-cd-10", "bg-cd-11", "bg-cd-12"],
	];

	return (
		<Section title="Color">
			<For each={colors}>
				{(shades) => (
					<Flex py="1" gap="2">
						<For each={shades}>{(className) => <Box class={className} style={{ width: "3rem", height: "3rem" }} />}</For>
					</Flex>
				)}
			</For>
		</Section>
	);
};

const SectionBadge = () => {
	const [color, setColor] = createColor6();

	return (
		<Section title="Badge">
			<SectionBlock
				left={
					<Box>
						<Badge color={color()}>badge</Badge>
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<Color6Select color={color()} setColor={setColor} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionButton = () => {
	const [color, setColor] = createColor6();
	const [disabled, setDisabled] = createDisabled();

	return (
		<Section title="Button">
			<SectionBlock
				left={
					<Box>
						<Button color={color()} disabled={disabled()}>
							button
						</Button>
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<Color6Select color={color()} setColor={setColor} />
						<DisabledSwitch disabled={disabled()} setDisabled={setDisabled} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionCheckbox = () => {
	const [color, setColor] = createColor2();
	const [disabled, setDisabled] = createDisabled();

	return (
		<Section title="Checkbox">
			<SectionBlock
				left={
					<Box>
						<Checkbox label="Label" color={color()} disabled={disabled()} />
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<Color2Select color={color()} setColor={setColor} />
						<DisabledSwitch disabled={disabled()} setDisabled={setDisabled} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionIconButton = () => {
	const [color, setColor] = createColor6();
	const [disabled, setDisabled] = createDisabled();

	return (
		<Section title="IconButton">
			<SectionBlock
				left={
					<Box>
						<IconButton color={color()} disabled={disabled()}>
							<Icon i="Github" />
						</IconButton>
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<Color6Select color={color()} setColor={setColor} />
						<DisabledSwitch disabled={disabled()} setDisabled={setDisabled} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionImage = () => {
	return (
		<Section title="Image">
			<SectionBlock
				left={
					<Box>
						<Image alt="cover-ghost" src="https://flamrdevs.pages.dev/og/cover-ghost-1200x628-dark.png" style={{ width: "300px", height: "157px" }} />
					</Box>
				}
				right={null}
			/>
		</Section>
	);
};

const SectionKbd = () => {
	const [color, setColor] = createColor2();

	return (
		<Section title="Kbd">
			<SectionBlock
				left={
					<Box>
						<Kbd color={color()}>kbd</Kbd>
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<Color2Select color={color()} setColor={setColor} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionLink = () => {
	const [disabled, setDisabled] = createDisabled();

	return (
		<Section title="Link">
			<SectionBlock
				left={
					<Box>
						<Link href="#" disabled={disabled()}>
							link
						</Link>
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<DisabledSwitch disabled={disabled()} setDisabled={setDisabled} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionLoader = () => {
	const [color, setColor] = createColor6();

	return (
		<Section title="Loader">
			<SectionBlock
				left={
					<Box>
						<Loader color={color()} />
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<Color6Select color={color()} setColor={setColor} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionProgress = () => {
	const [color, setColor] = createColor6();

	return (
		<Section title="Progress">
			<SectionBlock
				left={
					<Box>
						<Progress label="Label" color={color()} value={50} />
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<Color6Select color={color()} setColor={setColor} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionSwitch = () => {
	const [color, setColor] = createColor2();
	const [disabled, setDisabled] = createDisabled();

	return (
		<Section title="Switch">
			<SectionBlock
				left={
					<Box>
						<Switch label="Label" color={color()} disabled={disabled()} />
					</Box>
				}
				right={
					<Flex gap="2" style={{ "flex-direction": "column" }}>
						<Color2Select color={color()} setColor={setColor} />
						<DisabledSwitch disabled={disabled()} setDisabled={setDisabled} />
					</Flex>
				}
			/>
		</Section>
	);
};

const SectionText = () => {
	return (
		<Section title="Text">
			<SectionBlock
				left={
					<Box>
						<Text>text</Text>
					</Box>
				}
				right={null}
			/>
		</Section>
	);
};

export default () => {
	return (
		<>
			<SectionColor />
			<Divider />
			<SectionBadge />
			<Divider />
			<SectionButton />
			<Divider />
			<SectionCheckbox />
			<Divider />
			<SectionIconButton />
			<Divider />
			<SectionImage />
			<Divider />
			<SectionKbd />
			<Divider />
			<SectionLink />
			<Divider />
			<SectionLoader />
			<Divider />
			<SectionProgress />
			<Divider />
			<SectionSwitch />
			<Divider />
			<SectionText />
		</>
	);
};
