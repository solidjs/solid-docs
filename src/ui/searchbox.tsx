import { isServer } from "solid-js/web";
import {
	RegisterSearchBox,
	RegisterSearchButton,
} from "@orama/searchbox/dist/index.js";
import { OramaClient } from "@oramacloud/client";
import { createEffect } from "solid-js";
import { useThemeContext } from "~/data/theme-provider";
import "@orama/searchbox/dist/index.css";

const client = new OramaClient({
	endpoint: import.meta.env.VITE_ORAMA_ENDPOINT,
	api_key: import.meta.env.VITE_ORAMA_API_KEY,
});

export function SearchBox() {
	const ctx = useThemeContext();
	const selectedTheme = ctx.selectedTheme;

	if (!isServer) {
		createEffect(() => {
			RegisterSearchBox({
				summaryGeneration: import.meta.env.VITE_ORAMA_SECURE_PROXY,
				oramaInstance: client,
				colorScheme: selectedTheme().value,
				backdrop: true,
				resultsMap: {
					description: 'content'
				},
				themeConfig: {
					light: {},
					dark: {
						"--text-color-primary": "#fff",
						"--background-color-primary": "#040816",
						"--icon-color-primary": "#fff",
						"--border-color-accent": "rgb(147 197 253)",
					},
				},
			});
			RegisterSearchButton({
				colorScheme: selectedTheme().value,
				themeConfig: {
					light: {},
					dark: {
						"--search-btn-text-color": "#fff",
						"--search-btn-text-color-hover": "#fff",
						"--search-btn-text-color-focus": "#fff",
						"--search-btn-background-color": "#040816",
					},
				},
			});
		});
	}

	return (
		<>
			<div class="fixed">
				{/* @ts-ignore */}
				<orama-searchbox />
			</div>
			{/* @ts-ignore */}
			<orama-search-button />
		</>
	);
}
