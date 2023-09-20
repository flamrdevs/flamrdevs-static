import type { APIRoute, GetStaticPaths } from "astro";

import { HOST } from "~/utils/exports";

export const getStaticPaths: GetStaticPaths = async () => {
	return ["light", "dark"].map((theme) => ({
		params: { slug: theme },
		props: { theme },
	}));
};

export const GET: APIRoute<{ theme: string }> = async ({ props }) => {
	return new Response(await fetch(HOST.IMAGE(`badge/${props.theme}`)).then((res) => res.arrayBuffer() as Promise<ArrayBuffer>));
};
