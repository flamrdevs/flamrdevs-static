import { For, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { FolderIcon, FileIcon } from "lucide-solid";

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
							name: "main",
							size: "1.25 KB",
						},
						{
							type: "file",
							ext: ".js",
							name: "main",
							size: "0.75 KB",
						},
						{
							type: "file",
							ext: ".html",
							name: "index",
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
							name: "globals",
							size: "1.25 KB",
						},
						{
							type: "directory",
							name: "image",
							children: [
								{
									type: "file",
									ext: ".png",
									name: "image",
									size: "1.25 KB",
								},
							],
						},
					],
				},
				{
					type: "file",
					ext: ".html",
					name: "index",
					size: "11.75 KB",
				},
			] as Child[]);
	  };

const RenderFile = (props: { data: File }) => {
	return (
		<div>
			<div class="flex items-center justify-between p-1 text-neutral-11 hover:bg-neutral-3 hover:text-neutral-12">
				<div class="flex items-center gap-1">
					<FileIcon size={14} />
					<span class="font-mono">{`${props.data.name}${props.data.ext}`}</span>
				</div>
				<span class="font-mono">{props.data.size}</span>
			</div>
		</div>
	);
};

const RenderDirectory = (props: { data: Directory }) => {
	return (
		<div>
			<div class="flex items-center justify-between p-1">
				<div class="flex items-center gap-1">
					<FolderIcon size={14} />
					<span class="font-mono">{props.data.name}</span>
				</div>
			</div>
			<div class="pl-4">
				<For each={props.data.children}>
					{(item) => {
						if (item.type === "directory") return <RenderDirectory data={item} />;
						if (item.type === "file") return <RenderFile data={item} />;
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

	return (
		<div {...rest}>
			<For each={data()}>
				{(item) => {
					if (item.type === "directory") return <RenderDirectory data={item} />;
					if (item.type === "file") return <RenderFile data={item} />;
					return null;
				}}
			</For>
		</div>
	);
};

export default Stats;
