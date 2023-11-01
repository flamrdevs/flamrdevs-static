import { THEME, THEME_KEY, THEME_DEFAULT, setDocumentThemeAttribute } from "~/styles/utils.ts";
import type { Theme } from "~/styles/types.ts";

import ixstoragest from "ixstoragest";
import ixbroadcastr from "ixbroadcastr";

const ThemeBroadcastChannel = ixbroadcastr<Theme>(THEME_KEY);

const ThemeStore = ixstoragest<Theme>(THEME_KEY, THEME_DEFAULT);

const changeTheme = (value: Theme) => {
	ThemeStore.set(ThemeBroadcastChannel.send(value));
};

const toggleTheme = () => {
	ThemeStore.set(ThemeBroadcastChannel.send(ThemeStore.get() === THEME[0] ? THEME[1] : THEME[0]));
};

const initTheme = () => {
	setDocumentThemeAttribute(ThemeStore.get());
	ThemeStore.sub(setDocumentThemeAttribute);
	return ThemeBroadcastChannel.listen(ThemeStore.set);
};

export { changeTheme, toggleTheme };
export { initTheme };
export { ThemeStore };
