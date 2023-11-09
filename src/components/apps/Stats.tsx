import { For, Match, Switch, createMemo, createRoot, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Collapsible, Link, RadioGroup } from "@kobalte/core";

import ixstorage from "ixstorage";

import { Icon } from "~/components/core/index.ts";

import styles from "./Stats.module.css";

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
					ext: ".txt",
					name: "text.txt",
					size: "1 KB",
				},
				{
					type: "file",
					ext: ".ttf",
					name: "font.ttf",
					size: "1 KB",
				},
				{
					type: "file",
					ext: ".json",
					name: "data.json",
					size: "1 KB",
				},
				{
					type: "file",
					ext: ".mp3",
					name: "audio.mp3",
					size: "100 KB",
				},
				{
					type: "file",
					ext: ".mp4",
					name: "video.mp4",
					size: "100 KB",
				},
				{
					type: "file",
					ext: ".html",
					name: "index.html",
					size: "7 KB",
				},
			],
			size: "300 KB",
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

const FILE_AUDIO: string[] = [".mp3"];
const FILE_CODE: string[] = [".html", ".css", ".js"];
const FILE_IMAGE: string[] = [".webp", ".png", ".svg"];
const FILE_JSON: string[] = [".json"];
const FILE_TEXT: string[] = [".txt"];
const FILE_TYPE: string[] = [".ttf"];
const FILE_VIDEO: string[] = [".webm", ".mp4"];

const getFileIconName = (file: File) => {
	const { ext } = file;
	if (FILE_AUDIO.includes(ext)) return "FileAudio";
	if (FILE_CODE.includes(ext)) return "FileCode";
	if (FILE_IMAGE.includes(ext)) return "FileImage";
	if (FILE_JSON.includes(ext)) return "FileJson";
	if (FILE_TEXT.includes(ext)) return "FileText";
	if (FILE_TYPE.includes(ext)) return "FileType";
	if (FILE_VIDEO.includes(ext)) return "FileVideo";
	return "File";
};

const RenderFile = (props: { child: File; base: string }) => {
	return (
		<Link.Root href={getFileHref(props.base, props.child)} class={styles.link__root} target="_blank">
			<Icon i={getFileIconName(props.child)} size="1rem" stroke={getFileIconStroke(props.child)} />
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
	return open ? "FolderOpen" : "FolderClosed";
};

const RenderDirectory = (props: { child: Directory; base: string }) => {
	const base = () => `${props.base}/${props.child.name}`;

	const [open, setOpen] = useDirectoryState(base());

	return (
		<Collapsible.Root open={open()} onOpenChange={setOpen} class={styles.collapsible__root}>
			<Collapsible.Trigger class={[styles.collapsible__trigger, open() && "group"].filter(Boolean).join(" ")}>
				<Icon i={getDirectoryIconName(open())} size="1rem" />
				<div class="flex-grow text-left">{props.child.name}</div>
				<div class={["flex-grow text-right", open() && "invisible group-hover:visible"].filter(Boolean).join(" ")}>{props.child.size}</div>
				<Icon i="ChevronDown" size="1.2rem" class={styles["collapsible__trigger-icon"]} />
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

const deepFilter = (child: Child[], filter: string): Child[] => {
	return child
		.map((item) => {
			if (item.type === "directory") {
				return {
					...item,
					children: deepFilter(item.children, filter),
				} as Directory;
			}

			if (item.ext === filter) {
				return item as File;
			}

			return null;
		})
		.filter((item) => item !== null && !(item.type === "directory" && item.children.length === 0)) as Child[];
};

const [filter, handleSetFilter] = createRoot(() => {
	const storage = ixstorage<string>("filter", "all", sessionStorage);
	const [filter, setFilter] = createSignal<string>(storage.get());
	const handleSetFilter = (value: string) => {
		setFilter(() => storage.set(value));
	};

	return [filter, handleSetFilter] as const;
});

const createFiltered = (child: Child[], filter: string) => {
	console.log({ filter });

	if (filter === "all") return child;

	if (filter === ".html" || filter === ".css" || filter === ".js") return deepFilter(child, filter);

	return [];
};

const createCount = (child: Child[]): number => {
	return child.reduce((result, item) => {
		if (item.type === "directory") {
			return result + createCount(item.children);
		}
		if (item.type === "file") {
			return result + 1;
		}
		return result;
	}, 0);
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

	const filtered = createMemo(() => createFiltered(children(), filter()));

	const count = createMemo(() => createCount(filtered()));

	return (
		<div {...rest}>
			<div class="flex justify-between font-w7 text-z5">
				<a href={props.host} class="text-cn-11 hover:text-cn-12 outline-none focus-visible:text-cn-12 focus-visible:underline">
					{local.name}
				</a>
				<span class="text-cn-11">{size()}</span>
			</div>

			<div class="flex items-center justify-between my-3 p-3 border border-solid border-transparent border-y-cn-6">
				<div class="text-z2 text-cn-12">{count()} files</div>
				<RadioGroup.Root value={filter()} onChange={handleSetFilter} class="flex items-center justify-center gap-1">
					<For
						each={[
							{ value: "all", label: "All" },
							{ value: ".html", label: "HTML" },
							{ value: ".css", label: "CSS" },
							{ value: ".js", label: "JS" },
						]}
					>
						{({ value, label }) => (
							<RadioGroup.Item value={value} class="relative px-1.5 py-0.5">
								<RadioGroup.ItemInput />
								<RadioGroup.ItemControl class="z-0 absolute inset-0 bg-cn-1 border border-solid border-cn-3">
									<RadioGroup.ItemIndicator class="w-full h-full bg-cn-3" />
								</RadioGroup.ItemControl>
								<RadioGroup.ItemLabel class="relative z-20 text-z1 text-cn-10 data-[checked]:text-cn-12">{label}</RadioGroup.ItemLabel>
							</RadioGroup.Item>
						)}
					</For>
				</RadioGroup.Root>
			</div>

			<div>
				<For each={filtered()}>
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
