import { For, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

const createUseIcon = (name: string, Node: () => JSX.Element) => {
	const id = `lucide-${name}`;
	return {
		Icon: () => {
			return (
				<svg style={{ display: "none" }}>
					<symbol id={id} viewBox="0 0 24 24">
						<Node />
					</symbol>
				</svg>
			);
		},
		Use: (props: { size?: number }) => {
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
					class={`lucide ${id}`}
				>
					<use href={`#${id}`} />
				</svg>
			);
		},
	};
};

const UseFolderIcon = createUseIcon("folder", () => (
	<>
		<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
	</>
));
const UseFileIcon = createUseIcon("file", () => (
	<>
		<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
		<polyline points="14 2 14 8 20 8" />
	</>
));

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

const fetcher = import.meta.env.PROD
	? async (url: string) => {
			const res = await fetch(url);
			return (await res.json()) as Child[];
	  }
	: async (_url: string) => {
			return Promise.resolve([
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
									name: "image.png",
									size: "1.25 KB",
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
			] as Child[]);
	  };

const RenderFile = (props: { data: File; base: string }) => {
	return (
		<div>
			<a
				href={`${props.base}/${props.data.name}`}
				class="flex items-center justify-between p-1 text-neutral-10 hover:bg-neutral-3 hover:text-neutral-12 outline-none focus-visible:text-neutral-11 focus-visible:ring-1 focus-visible:ring-neutral-7 rounded"
			>
				<div class="flex items-center gap-1.5">
					<UseFileIcon.Use size={14} />
					<span class="font-mono">{props.data.name}</span>
				</div>
				<span class="font-mono">{props.data.size}</span>
			</a>
		</div>
	);
};

const RenderDirectory = (props: { data: Directory; base: string }) => {
	const base = () => `${props.base}/${props.data.name}`;

	return (
		<div>
			<div class="flex items-center justify-between p-1">
				<div class="flex items-center gap-1.5">
					<UseFolderIcon.Use size={14} />
					<span class="font-mono">{props.data.name}</span>
				</div>
			</div>
			<div class="pl-4">
				<For each={props.data.children}>
					{(item) => {
						if (item.type === "directory") return <RenderDirectory data={item} base={base()} />;
						if (item.type === "file") return <RenderFile data={item} base={base()} />;
						return null;
					}}
				</For>
			</div>
		</div>
	);
};

const Stats = (props: JSX.IntrinsicElements["div"] & { host: string }) => {
	const [local, rest] = splitProps(props, ["host"]);

	const [data, setData] = createSignal<Child[]>([]);

	fetcher(`${local.host}/stats.json`).then((data) => {
		setData(() => data);
	});

	const base = () => props.host;

	return (
		<>
			<UseFolderIcon.Icon />
			<UseFileIcon.Icon />

			<div {...rest}>
				<div class="select-none">
					<For each={data()}>
						{(item) => {
							if (item.type === "directory") return <RenderDirectory data={item} base={base()} />;
							if (item.type === "file") return <RenderFile data={item} base={base()} />;
							return null;
						}}
					</For>
				</div>
			</div>
		</>
	);
};

export default Stats;
