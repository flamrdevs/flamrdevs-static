import { Show, splitProps } from "solid-js";

import { Checkbox as KobalteCheckbox, Switch as KobalteSwitch } from "@kobalte/core";

import * as Children from "../children.ts";
import * as Classes from "../classes.ts";

import * as CheckboxStyle from "./styles/Checkbox/style.ts";
import * as SwitchStyle from "./styles/Switch/style.ts";
import * as klass from "./styles/_/klass.ts";

import { Lucide } from "../icons/index.ts";

type CheckboxProps = Children.WithoutProps<
	KobalteCheckbox.CheckboxRootProps & {
		label?: string;
	} & klass.Color2Variants
>;

const CheckboxLocalKeys = ["label"] as const;

const Checkbox = (props: CheckboxProps) => {
	const [classes, local, color, rest] = splitProps(props, Classes.Keys, CheckboxLocalKeys, klass.Color2.vk);

	return (
		<KobalteCheckbox.Root {...rest} class={Classes.x([CheckboxStyle.Root, klass.Color2(color)], classes)}>
			<KobalteCheckbox.Input class={CheckboxStyle.Input} />
			<KobalteCheckbox.Control class={CheckboxStyle.Control}>
				<KobalteCheckbox.Indicator class={CheckboxStyle.Indicator}>
					<Lucide.Icon i="Check" class={CheckboxStyle.Icon} />
				</KobalteCheckbox.Indicator>
			</KobalteCheckbox.Control>
			<Show when={local.label}>{(label) => <KobalteCheckbox.Label class={CheckboxStyle.Label}>{label()}</KobalteCheckbox.Label>}</Show>
		</KobalteCheckbox.Root>
	);
};

type SwitchProps = Children.WithoutProps<
	KobalteSwitch.SwitchRootProps & {
		label?: string;
	} & klass.Color2Variants
>;

const SwitchLocalKeys = ["label"] as const;

const Switch = (props: SwitchProps) => {
	const [classes, local, color, rest] = splitProps(props, Classes.Keys, SwitchLocalKeys, klass.Color2.vk);

	return (
		<KobalteSwitch.Root {...rest} class={Classes.x([SwitchStyle.Root, klass.Color2(color)], classes)}>
			<KobalteSwitch.Input class={SwitchStyle.Input} />
			<KobalteSwitch.Control class={SwitchStyle.Control}>
				<KobalteSwitch.Thumb class={SwitchStyle.Thumb} />
			</KobalteSwitch.Control>
			<Show when={local.label}>{(label) => <KobalteSwitch.Label class={SwitchStyle.Label}>{label()}</KobalteSwitch.Label>}</Show>
		</KobalteSwitch.Root>
	);
};

export type { CheckboxProps, SwitchProps };
export { Checkbox, Switch };
