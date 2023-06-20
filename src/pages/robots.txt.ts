import type { APIRoute } from "astro";

import * as HOST from "~/utils/host";

export const get: APIRoute = () => {
	return {
		body: `
User-agent: *
Allow: /

Sitemap: ${HOST.STATIC("sitemap-index.xml")}
`.trim(),
	};
};
