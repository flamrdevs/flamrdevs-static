import { For, Match, Switch, createRoot, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Collapsible, Link } from "@kobalte/core";

import ixstorage from "ixstorage";

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
	size: string;
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

const fetcher = async (host: string): Promise<Directory> => {
	try {
		if (import.meta.env.DEV) throw new Error("DEV");
		const res = await fetch(`${host}/stats.json`);
		return (await res.json()) as Directory;
	} catch {
		return {
			type: "directory",
			name: "",
			children: [
				{
					type: "directory",
					name: "about",
					children: [
						{
							type: "file",
							ext: ".css",
							name: "main.css",
							size: "1 KB",
						},
						{
							type: "file",
							ext: ".js",
							name: "main.js",
							size: "1 KB",
						},
						{
							type: "file",
							ext: ".html",
							name: "index.html",
							size: "3 KB",
						},
					],
					size: "5 KB",
				},
				{
					type: "directory",
					name: "assets",
					children: [
						{
							type: "file",
							ext: ".css",
							name: "globals.css",
							size: "1 KB",
						},
						{
							type: "directory",
							name: "image",
							children: [
								{
									type: "file",
									ext: ".png",
									name: "bg-1.png",
									size: "1 KB",
								},
								{
									type: "file",
									ext: ".png",
									name: "bg-2.png",
									size: "1 KB",
								},
								{
									type: "file",
									ext: ".png",
									name: "bg-3.png",
									size: "1 KB",
								},
								{
									type: "file",
									ext: ".svg",
									name: "logo.svg",
									size: "1 KB",
								},
								{
									type: "directory",
									name: "og",
									children: [
										{
											type: "file",
											ext: ".png",
											name: "post-1.png",
											size: "1 KB",
										},
										{
											type: "file",
											ext: ".png",
											name: "post-2.png",
											size: "1 KB",
										},
										{
											type: "file",
											ext: ".png",
											name: "post-3.png",
											size: "1 KB",
										},
									],
									size: "3 KB",
								},
							],
							size: "7 KB",
						},
					],
					size: "8 KB",
				},
				{
					type: "file",
					ext: ".html",
					name: "index.html",
					size: "7 KB",
				},
			],
			size: "20 KB",
		} satisfies Directory;
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

const RenderFile = (props: { child: File; base: string }) => {
	return (
		<Link.Root href={getFileHref(props.base, props.child)} class={styles.link__root} target="_blank">
			<UseIcon name={getFileIconName(props.child)} size={14} stroke={getFileIconStroke(props.child)} />
			<div class="flex-grow text-left">{props.child.name}</div>
			<div class="flex-grow text-right">{props.child.size}</div>
		</Link.Root>
	);
};

const useDirectoryState = createRoot(() => {
	const storage = ixstorage<Record<string, boolean>>("directory-state", {}, sessionStorage);

	const [state, setState] = createSignal<Record<string, boolean>>(storage.get());

	return (key: string) => {
		const open = () => state()[key] ?? true;

		const setOpen = (value: boolean) => {
			setState((record) => storage.set({ ...record, [key]: Boolean(value) }));
		};

		return [open, setOpen] as const;
	};
});

const getDirectoryIconName = (open?: boolean) => {
	return open ? "folder-open" : "folder-closed";
};

const RenderDirectory = (props: { child: Directory; base: string }) => {
	const base = () => `${props.base}/${props.child.name}`;

	const [open, setOpen] = useDirectoryState(base());

	return (
		<Collapsible.Root open={open()} onOpenChange={setOpen} class={styles.collapsible__root}>
			<Collapsible.Trigger class={[styles.collapsible__trigger, "group"].join(" ")}>
				<UseIcon name={getDirectoryIconName(open())} size={14} />
				<div class="flex-grow text-left">{props.child.name}</div>
				<div class="flex-grow text-right invisible group-hover:visible">{props.child.size}</div>
				<UseIcon name="chevron-down" size={16} class={styles["collapsible__trigger-icon"]} />
			</Collapsible.Trigger>
			<Collapsible.Content class={styles.collapsible__content}>
				<For each={props.child.children}>
					{(child) => (
						<Switch>
							<Match when={isDirectory(child)}>
								<RenderDirectory child={child as Directory} base={base()} />
							</Match>
							<Match when={isFile(child)}>
								<RenderFile child={child as File} base={base()} />
							</Match>
						</Switch>
					)}
				</For>
			</Collapsible.Content>
		</Collapsible.Root>
	);
};

const Stats = (props: JSX.IntrinsicElements["div"] & { host: string; name: string }) => {
	const [local, rest] = splitProps(props, ["host", "name"]);

	const [children, setChildren] = createSignal<Child[]>([]);
	const [size, setSize] = createSignal<string>("");

	fetcher(local.host).then((data) => {
		setChildren(() => data.children);
		setSize(() => data.size);
	});

	const base = () => props.host;

	return (
		<div {...rest}>
			<div class="flex justify-between font-w7 text-z5">
				<span>{local.name}</span>
				<span>{size()}</span>
			</div>

			<div class="my-3 h-px bg-neutral-6" />

			<div>
				<For each={children()}>
					{(child) => (
						<Switch>
							<Match when={isDirectory(child)}>
								<RenderDirectory child={child as Directory} base={base()} />
							</Match>
							<Match when={isFile(child)}>
								<RenderFile child={child as File} base={base()} />
							</Match>
						</Switch>
					)}
				</For>
			</div>
		</div>
	);
};

export default Stats;
