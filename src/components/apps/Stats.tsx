import { For, createRoot, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Collapsible, Link } from "@kobalte/core";

import styles from "./Stats.module.css";

const createUseIcon = (name: string) => {
	const id = `lucide-${name}`;
	return (props: { size?: number; class?: string }) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={props.size ?? 24}
				height={props.size ?? 24}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width={2}
				stroke-linecap="round"
				stroke-linejoin="round"
				class={`lucide ${id} ${props.class}`}
			>
				<use href={`#${id}`} />
			</svg>
		);
	};
};

const UseFolderIcon = createUseIcon("folder");
const UseFileIcon = createUseIcon("file");
const UseChevronDownIcon = createUseIcon("chevron-down");

type Directory = {
	type: "directory";
	name: string;
	children: Child[];
};

type File = {
	type: "file";
	name: string;
	ext: string;
	size: string;
};

type Child = Directory | File;

const isDirectory = (child: Child): child is Directory => child.type === "directory";
const isFile = (child: Child): child is File => child.type === "file";

const fetcher = async (host: string) => {
	try {
		if (import.meta.env.DEV) throw new Error("DEV");
		const res = await fetch(`${host}/stats.json`);
		return (await res.json()) as Child[];
	} catch {
		return [
			{
				type: "directory",
				name: "about",
				children: [
					{
						type: "file",
						ext: ".css",
						name: "main.css",
						size: "1.25 KB",
					},
					{
						type: "file",
						ext: ".js",
						name: "main.js",
						size: "0.75 KB",
					},
					{
						type: "file",
						ext: ".html",
						name: "index.html",
						size: "7.75 KB",
					},
				],
			},
			{
				type: "directory",
				name: "assets",
				children: [
					{
						type: "file",
						ext: ".css",
						name: "globals.css",
						size: "1.25 KB",
					},
					{
						type: "directory",
						name: "image",
						children: [
							{
								type: "file",
								ext: ".png",
								name: "bg-1.png",
								size: "1.25 KB",
							},
							{
								type: "file",
								ext: ".png",
								name: "bg-2.png",
								size: "1.25 KB",
							},
							{
								type: "file",
								ext: ".png",
								name: "bg-3.png",
								size: "1.25 KB",
							},
							{
								type: "directory",
								name: "og",
								children: [
									{
										type: "file",
										ext: ".png",
										name: "post-1.png",
										size: "1.25 KB",
									},
									{
										type: "file",
										ext: ".png",
										name: "post-2.png",
										size: "1.25 KB",
									},
									{
										type: "file",
										ext: ".png",
										name: "post-3.png",
										size: "1.25 KB",
									},
								],
							},
						],
					},
				],
			},
			{
				type: "file",
				ext: ".html",
				name: "index.html",
				size: "11.75 KB",
			},
		] as Child[];
	}
};

const RenderFile = (props: { data: File; base: string }) => {
	return (
		<Link.Root href={`${props.base}/${props.data.name}`} class={styles.link__root}>
			<UseFileIcon size={14} />
			<div class="flex-grow text-left">{props.data.name}</div>
			<div class="flex-grow text-right">{props.data.size}</div>
		</Link.Root>
	);
};

const useDirectoryState = createRoot(() => {
	const [state, setState] = createSignal<Record<string, boolean>>({});

	return (key: string) => {
		const open = () => state()[key] ?? true;

		const setOpen = (value: boolean) => {
			setState((record) => ({ ...record, [key]: Boolean(value) }));
		};

		return [open, setOpen] as const;
	};
});

const RenderDirectory = (props: { data: Directory; base: string }) => {
	const base = () => `${props.base}/${props.data.name}`;

	const [open, setOpen] = useDirectoryState(base());

	return (
		<Collapsible.Root open={open()} onOpenChange={setOpen} class={styles.collapsible__root}>
			<Collapsible.Trigger class={styles.collapsible__trigger}>
				<UseFolderIcon size={14} />
				<div class="flex-grow text-left">{props.data.name}</div>
				<UseChevronDownIcon class={styles["collapsible__trigger-icon"]} />
			</Collapsible.Trigger>
			<Collapsible.Content class={styles.collapsible__content}>
				<For each={props.data.children}>
					{(item) => (isDirectory(item) ? <RenderDirectory data={item} base={base()} /> : isFile(item) ? <RenderFile data={item} base={base()} /> : null)}
				</For>
			</Collapsible.Content>
		</Collapsible.Root>
	);
};

const Stats = (props: JSX.IntrinsicElements["div"] & { host: string }) => {
	const [local, rest] = splitProps(props, ["host"]);

	const [data, setData] = createSignal<Child[]>([]);

	fetcher(local.host).then((data) => setData(() => data));

	const base = () => props.host;

	return (
		<div {...rest}>
			<div>
				<For each={data()}>{(item) => (isDirectory(item) ? <RenderDirectory data={item} base={base()} /> : isFile(item) ? <RenderFile data={item} base={base()} /> : null)}</For>
			</div>
		</div>
	);
};

export default Stats;
