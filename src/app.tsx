// @refresh reload
import { Router } from "@solidjs/router";
import { A } from "~/ui/i18n-anchor";
import { FileRoutes, HttpStatusCode } from "@solidjs/start";
import { MDXProvider } from "solid-mdx";
import { ErrorBoundary, Suspense, createEffect } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import Md from "~/ui/markdown-components";
import { Layout } from "~/ui/layout";
import "~/styles.css";
import { ThemeProvider, useThemeContext } from "./data/theme-provider";
import { I18nProvider } from "@kobalte/core";
import { NotFound } from "./ui/not-found";

export default function App() {
	return (
		<ThemeProvider>
			{(() => {
				const ctx = useThemeContext();

				createEffect(() => {
					const html = document.documentElement;
					html.classList.remove("light", "dark");
					html.classList.add(ctx.selectedTheme().value);
					html.dataset.theme = ctx.selectedTheme().theme;
				});

				return (
					<Router
						root={(props) => (
							<I18nProvider>
								<MetaProvider>
									<Title>Solid Docs</Title>
									<ErrorBoundary fallback={<NotFound />}>
										<Layout>
											<MDXProvider components={Md}>
												<Suspense>{props.children}</Suspense>
											</MDXProvider>
										</Layout>
									</ErrorBoundary>
								</MetaProvider>
							</I18nProvider>
						)}
					>
						<FileRoutes />
					</Router>
				);
			})()}
		</ThemeProvider>
	);
}
