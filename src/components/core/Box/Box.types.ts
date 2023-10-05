import type * as Polymorphic from "./../../polymorphic";

import * as klass from "./../.klass";
import * as reklass from "./../.reklass";

export type BoxPolymorphicProps<As extends Polymorphic.As> = Polymorphic.Props<
	As,
	klass.TypographyVariants & reklass.LayoutVariants & reklass.PositionVariants & reklass.MarginVariants & reklass.PaddingVariants
>;
