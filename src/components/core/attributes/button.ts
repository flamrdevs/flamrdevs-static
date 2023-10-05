import type { HTMLTag } from "astro/types";

type ButtonOptions = {
	disabled?: boolean;
};
type ButtonAttrs = {
	[K in "role" | "type"]?: "button";
} & ButtonOptions & {
		tabindex?: number;
		"aria-disabled"?: boolean;
		"data-disabled"?: "";
	};
const getButtonAttrs = (options: ButtonOptions, tag?: HTMLTag) => {
	const result: ButtonAttrs = { ...options };

	if (options.disabled) {
		result.tabindex = -1;
		result["aria-disabled"] = true;
		result["data-disabled"] = "";
	}

	if (tag) {
		result[tag === "button" || tag === "input" ? "type" : "role"] = "button";
	}

	return result;
};

export type { ButtonOptions, ButtonAttrs };
export { getButtonAttrs };
