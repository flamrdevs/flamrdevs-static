import type { APIRoute } from "astro";

import { HOST } from "~/utils/exports.ts";

export const GET: APIRoute = () => {
	return new Response(
		`
User-agent: *
Allow: /

Sitemap: ${HOST.STATIC("sitemap-index.xml")}
`.trim(),
		{
			headers: {
				"Content-Type": "text/plain",
			},
		}
	);
};
