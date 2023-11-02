import { defineConfig } from "vitest/config";

import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid()],
	test: {
		environment: "jsdom",
		include: ["src/**/*.test.[jt]s?(x)"],
		setupFiles: "./vitest.setup.ts",
		deps: { inline: [/solid-js/, /@solidjs\/router/] },
	},
});
