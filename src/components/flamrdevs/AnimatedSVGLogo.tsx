import { mergeProps, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import * as AnimatedSVGLogoStyle from "./styles/AnimatedSVGLogo.style.ts";

import * as Classes from "../classes.ts";

type AnimatedSVGLogoProps = JSX.IntrinsicElements["svg"] & {
	size?: number;
};

const defaultProps: AnimatedSVGLogoProps = {
	size: 500,
};

const AnimatedSVGLogo = (props: AnimatedSVGLogoProps) => {
	props = mergeProps(defaultProps, props);
	const [classes, local, rest] = splitProps(props, Classes.Keys, ["size"]);

	return (
		<svg
			{...rest}
			class={Classes.x(AnimatedSVGLogoStyle.Root, classes)}
			width={local.size}
			height={local.size}
			viewBox="0 0 900 900"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path class={AnimatedSVGLogoStyle.Filled} d="M188.809 432.401L71.7813 402.929L692.158 47.1566L614.238 216.952L188.809 432.401Z"></path>
			<path
				class={AnimatedSVGLogoStyle.Filled}
				d="M150.877 745.996L249.245 441.94L344.262 396.561L337.407 432.564L493.403 341.079L470.748 442.571L317.052 539.468L252.607 877.938L150.877 745.996Z"
			></path>
			<path class={AnimatedSVGLogoStyle.Filled} d="M346.11 700.984L662.817 481.78L698.921 196.202L575.158 306.483L565.147 446.062L381.728 559.066L346.11 700.984Z"></path>
			<path
				class={AnimatedSVGLogoStyle.StrokeLeft}
				d="M62.2705 374.228L178.538 403.509L601.203 189.459L678.617 20.7665L62.2705 374.228ZM238.581 412.986L140.853 715.066L241.922 846.151L332.981 367.901L238.581 412.986ZM326.17 403.671L481.153 312.78L458.646 413.612L305.948 509.88L326.17 403.671ZM370.204 529.351L334.817 670.347L649.466 452.567L685.336 168.844L562.377 278.408L552.431 417.081L370.204 529.351Z"
			></path>
			<path
				class={AnimatedSVGLogoStyle.StrokeRight}
				d="M109.465 360.461L225.733 389.742L648.398 175.692L725.812 6.99993L109.465 360.461ZM285.776 399.219L188.047 701.3L289.116 832.384L380.175 354.134L285.776 399.219ZM373.365 389.904L528.348 299.014L505.84 399.846L353.143 496.113L373.365 389.904ZM417.399 515.584L382.011 656.58L696.661 438.8L732.531 155.077L609.572 264.642L599.626 403.314L417.399 515.584Z"
			></path>
		</svg>
	);
};

export type { AnimatedSVGLogoProps };
export default AnimatedSVGLogo;
