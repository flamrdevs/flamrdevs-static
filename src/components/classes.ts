import clsx from "clsx";
import type { ClassValue } from "@klass/core";

type ClassesProps = {
	class?: string | null;
};

const getRootClassesx = <P extends ClassesProps>(props: P) => {
	const { class: className, ...rest } = props;
	return [(...classes: ClassValue[]) => clsx(classes, className), rest] as const;
};

export type { ClassesProps };
export { getRootClassesx };
