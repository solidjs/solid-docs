// @refresh reload
import { A, Router } from "@solidjs/router";
import { FileRoutes, HttpStatusCode } from "@solidjs/start";
import { MDXProvider } from "solid-mdx";
import { ErrorBoundary, Suspense, createEffect } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";

import Md from "~/ui/markdown-components";
import { Layout } from "~/ui/layout";
import "~/styles.css";
import { ThemeProvider, useThemeContext } from "./data/theme-provider";

export default function App() {
	return (
		<ThemeProvider>
			{(() => {
				const ctx = useThemeContext();

				return (
					<div
						class={ctx.selectedTheme().value}
						data-theme={ctx.selectedTheme().value}
					>
						<div>
							<Router
								root={(props) => (
									<MetaProvider>
										<Title>Solid Docs</Title>
										<ErrorBoundary
											fallback={(e) => {
												return (
													<>
														<Title>404 - SolidDocs</Title>
														<Layout isError={Boolean(e)}>
															<HttpStatusCode code={404} />
															<div class="flex flex-col items-center">
																<h1 class="inline pb-1 bg-gradient-to-r from-indigo-200 via-blue-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
																	Page Not Found
																</h1>
																<A href="/">Take me back.</A>
															</div>
														</Layout>
													</>
												);
											}}
										>
											<Layout>
												<MDXProvider components={Md}>
													<Suspense>{props.children}</Suspense>
												</MDXProvider>
											</Layout>
										</ErrorBoundary>
									</MetaProvider>
								)}
							>
								<FileRoutes />
							</Router>
						</div>
					</div>
				);
			})()}
		</ThemeProvider>
	);
}
