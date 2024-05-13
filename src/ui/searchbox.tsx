import { isServer } from "solid-js/web";
import {
	RegisterSearchBox,
	RegisterSearchButton,
	RegisterSearchBoxProps,
	RegisterSearchButtonProps,
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
			/**
			 * These function calls create/register web components like
			 * orama-searchbox and orama-search-button at runtime.
			 */
			RegisterSearchBox({
				summaryGeneration: import.meta.env.VITE_ORAMA_SECURE_PROXY,
				oramaInstance: client,
				colorScheme: selectedTheme().value,
				backdrop: true,
				resultsMap: {
					description: "content",
				},
			});
			RegisterSearchButton({
				colorScheme: selectedTheme().value,
			});
		});
	}

	return (
		<>
			<div class="fixed z-10">
				<orama-searchbox />
			</div>
			<orama-search-button />
		</>
	);
}

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"orama-searchbox": RegisterSearchBoxProps;
			"orama-search-button": RegisterSearchButtonProps;
		}
	}
}
