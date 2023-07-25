import type { APIRoute } from "astro";

import { HOST } from "~/utils/exports";

export const get: APIRoute = () => {
	return {
		body: [
			{
				name: "Plus Jakarta Sans",
				style: "normal",
				filename: "PlusJakartaSans-Regular",
			},
			{
				name: "Plus Jakarta Sans",
				style: "italic",
				filename: "PlusJakartaSans-Italic",
			},
			{
				name: "Source Code Pro",
				style: "normal",
				filename: "SourceCodePro-Regular",
			},
			{
				name: "Source Code Pro",
				style: "italic",
				filename: "SourceCodePro-Italic",
			},
		]
			.map(({ name, style, filename }) => {
				return `
@font-face {
  font-family: "${name}";
  font-style: ${style};
  font-weight: 1 999;
  src: url("${HOST.STATIC("fonts", filename)}.ttf") format("truetype-variations");
}
  
  `;
			})
			.join("\n"),
	};
};
