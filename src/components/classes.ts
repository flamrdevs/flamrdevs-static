import clsx from "clsx";
import type { ClassValue } from "clsx";

type Props = {
	class?: ClassValue;
	classList?: ClassValue;
};

type WithProps<P> = Omit<P, keyof Props> & Props;

const Keys = ["class", "classList"] as const satisfies Readonly<(keyof Props)[]>;

const x = <T extends Props>(classValue: ClassValue, classes: T) => clsx(classValue, classes[Keys[0]], classes[Keys[1]]);

export type { WithProps };
export { Keys };
export { x };
