import { isServer } from "solid-js/web";
import { createEffect } from "solid-js";
import { useThemeContext } from "~/data/theme-provider";

import { JSX as OramaJSX } from "@orama/wc-components";
import { defineCustomElements } from "@orama/wc-components/loader";
import "@orama/wc-components/dist/orama-ui/orama-ui.css";

export function useRegisterOramaComponents() {
	const ctx = useThemeContext();
	const selectedTheme = ctx.selectedTheme;

	if (!isServer) {
		createEffect(() => {
			/**
			 * These function calls create/register web components like
			 * orama-search-box and orama-search-button at runtime.
			 */
			const colorScheme = selectedTheme()?.value
				? (selectedTheme()!.value as "light" | "dark")
				: "system";

			const oramaSearchBox = document.querySelector("orama-search-box");
			if (oramaSearchBox) {
				oramaSearchBox.index = {
					api_key: import.meta.env.VITE_ORAMA_API_KEY,
					endpoint: import.meta.env.VITE_ORAMA_ENDPOINT,
				};
				oramaSearchBox.resultMap = {
					description: "content",
					section: "section",
				};
				oramaSearchBox.themeConfig = {
					colors: {
						dark: {
							"--border-color-accent": "rgb(147 197 253)",
							"--backdrop-background-color-primary": "rgb(19 20 24 / 75%)",
						},
					},
				};

				oramaSearchBox.colorScheme = colorScheme;
			}

			const oramaSearchButton = document.querySelector("orama-search-button");
			if (oramaSearchButton) {
				oramaSearchButton.colorScheme = colorScheme;
				oramaSearchButton.innerText = "Search";
			}

			defineCustomElements();
		});
	}
}

declare module "solid-js" {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements extends OramaJSX.IntrinsicElements {
			"orama-search-box": OramaJSX.OramaSearchBox &
				JSX.HTMLAttributes<HTMLOramaSearchBoxElement>;
			"orama-search-button": OramaJSX.OramaSearchButton &
				JSX.HTMLAttributes<HTMLOramaSearchButtonElement>;
		}
	}
}
