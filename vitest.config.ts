import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			mockReset: true,
			exclude: [
				// playwright (e2e)
				"./tests/**/*",
				"./node_modules/**/*",
			],
		},
	})
);
