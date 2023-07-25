import type { APIRoute } from "astro";

import { HOST } from "~/utils/exports";

export const get: APIRoute = () => {
	return {
		body: `
User-agent: *
Allow: /

Sitemap: ${HOST.STATIC("sitemap-index.xml")}
`.trim(),
	};
};
