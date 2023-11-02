import * as SharedStyle from "./_shared.style.ts";

import styles from "./Switch.module.css";

const Root = `${styles.root}`;

const Input = `${styles.input}`;

const Control = `${styles.control} ${SharedStyle.Border1pxSolidTransparent} ${SharedStyle.Outline1pxSolidTransparent} filter-noise-layer`;

const Thumb = `${styles.thumb}`;

const Label = `${styles.label}`;

export { Root, Input, Control, Thumb, Label };