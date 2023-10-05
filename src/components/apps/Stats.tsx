import { For, Match, Switch, createRoot, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Collapsible, Link } from "@kobalte/core";

import styles from "./Stats.module.css";

const UseIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement> & { name: string; size?: number }) => {
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
			class={`lucide lucide-${props.name} ${props.class}`}
			{...props}
		>
			<use href={`#lucide-${props.name}`} />
		</svg>
	);
};

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
								type: "file",
								ext: ".svg",
								name: "logo.svg",
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

const getFileHref = (base: string, file: File) => {
	let temp: string = file.name;
	if (file.ext === ".html") {
		temp = temp.replace(/.html/g, "");
		return temp === "index" ? `${base}` : `${base}/${temp}`;
	} else {
		return `${base}/${temp}`;
	}
};

const getFileIconStroke = (file: File) => {
	switch (file.ext) {
		case ".html":
			return "#E34F26";

		case ".css":
			return "#1572B6";

		case ".js":
			return "#F7DF1E";

		case ".svg":
			return "#FFB13B";

		default:
			return "currentColor";
	}
};

const FILE_AUDIO: string[] = [];
const FILE_CODE: string[] = [".html", ".css", ".js"];
const FILE_IMAGE: string[] = [".png", ".svg"];
const FILE_VIDEO: string[] = [];

const getFileIconName = (file: File) => {
	const { ext } = file;
	if (FILE_AUDIO.includes(ext)) return "file-audio";
	if (FILE_CODE.includes(ext)) return "file-code";
	if (FILE_IMAGE.includes(ext)) return "file-image";
	if (FILE_VIDEO.includes(ext)) return "file-video";
	return "file";
};

const RenderFile = (props: { data: File; base: string }) => {
	return (
		<Link.Root href={getFileHref(props.base, props.data)} class={styles.link__root} target="_blank">
			<UseIcon name={getFileIconName(props.data)} size={14} stroke={getFileIconStroke(props.data)} />
			<div class="file-name flex-grow text-left">{props.data.name}</div>
			<div class="file-size flex-grow text-right">{props.data.size}</div>
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

const getDirectoryIconName = (open?: boolean) => {
	return open ? "folder-open" : "folder-closed";
};

const RenderDirectory = (props: { data: Directory; base: string }) => {
	const base = () => `${props.base}/${props.data.name}`;

	const [open, setOpen] = useDirectoryState(base());

	return (
		<Collapsible.Root open={open()} onOpenChange={setOpen} class={styles.collapsible__root}>
			<Collapsible.Trigger class={styles.collapsible__trigger}>
				<UseIcon name={getDirectoryIconName(open())} size={14} />
				<div class="flex-grow text-left">{props.data.name}</div>
				<UseIcon name="chevron-down" size={16} class={styles["collapsible__trigger-icon"]} />
			</Collapsible.Trigger>
			<Collapsible.Content class={styles.collapsible__content}>
				<For each={props.data.children}>
					{(item) => (
						<Switch>
							<Match when={isDirectory(item)}>
								<RenderDirectory data={item as Directory} base={base()} />
							</Match>
							<Match when={isFile(item)}>
								<RenderFile data={item as File} base={base()} />
							</Match>
						</Switch>
					)}
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
				<For each={data()}>
					{(item) => (
						<Switch>
							<Match when={isDirectory(item)}>
								<RenderDirectory data={item as Directory} base={base()} />
							</Match>
							<Match when={isFile(item)}>
								<RenderFile data={item as File} base={base()} />
							</Match>
						</Switch>
					)}
				</For>
			</div>
		</div>
	);
};

export default Stats;
