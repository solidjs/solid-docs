// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MDXProvider } from "solid-mdx";
import { ErrorBoundary, Suspense, createEffect } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import Md from "~/ui/markdown-components";
import { Layout } from "~/ui/layout";
import { ThemeProvider, useThemeContext } from "./data/theme-provider";
import { I18nProvider } from "@kobalte/core";
import { NotFound } from "./ui/not-found";
import "~/styles.css";
import { DynamicImage, OpenGraph } from "@solid-mediakit/og";

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
									<OpenGraph origin="">
										<DynamicImage>
											{/* <div></div> */}
											<div
												style={{
													width: "100%",
													height: "100%",
													display: "flex",
													"align-items": "center",
													"justify-content": "center",
													"font-size": "128px",
													"background": "rgb(15 23 42)",
												}}
											>
												Solid Docs
											</div>
										</DynamicImage>
									</OpenGraph>
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
