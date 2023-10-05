type LinkOptions = {
	disabled?: boolean;
};
type LinkAttrs = LinkOptions & {
	tabindex?: number;
	"aria-disabled"?: boolean;
	"data-disabled"?: "";
};
const getLinkAttrs = (options: LinkOptions) => {
	const result: LinkAttrs = { ...options };

	if (options.disabled) {
		result.tabindex = -1;
		result["aria-disabled"] = true;
		result["data-disabled"] = "";
	}

	return result;
};

export type { LinkOptions, LinkAttrs };
export { getLinkAttrs };
