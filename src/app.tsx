// @refresh reload
import { Router } from "@solidjs/router";
import { SolidBaseRoot } from "@kobalte/solidbase/client";
import { FileRoutes } from "@solidjs/start/router";
import { createEffect } from "solid-js";
import { ThemeProvider, useThemeContext } from "./data/theme-provider";
import "~/styles.css";

export default function App() {
	return (
		<ThemeProvider>
			{(() => {
				const ctx = useThemeContext();

				createEffect(() => {
					const html = document.documentElement;
					html.classList.remove("light", "dark");
					html.classList.add(ctx.selectedTheme()!.value);
					html.dataset.theme = ctx.selectedTheme()!.theme;
				});

				return (
					<Router root={SolidBaseRoot}>
						<FileRoutes />
					</Router>
				);
			})()}
		</ThemeProvider>
	);
}
