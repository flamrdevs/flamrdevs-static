import * as SharedStyle from "./_shared.style.ts";

import styles from "./Checkbox.module.css";

const Root = `${styles.root}`;

const Input = `${styles.input}`;

const Control = `${styles.control} ${SharedStyle.Border1pxSolidTransparent} ${SharedStyle.Outline1pxSolidTransparent} filter-noise-layer`;

const Indicator = `${styles.indicator}`;

const Icon = `${styles.icon}`;

const Label = `${styles.label}`;

export { Root, Input, Control, Indicator, Icon, Label };
