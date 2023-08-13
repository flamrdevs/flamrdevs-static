import { cxs } from "@klass/core";
import type { ClassValue } from "@klass/core";

type ClassesProps = {
	class?: string | null;
	"class:list"?: string | Record<string, boolean> | Record<any, any> | Iterable<string> | Iterable<any>;
};

const getRootClassesx = <P extends ClassesProps>(props: P) => {
	const { class: className, "class:list": classList, ...rest } = props;
	return [(...classes: ClassValue[]) => cxs(classes, className, classList), rest] as const;
};

export type { ClassesProps };
export { getRootClassesx };
