// @refresh reload
import { A, Router } from "@solidjs/router";
import { FileRoutes, HttpStatusCode } from "@solidjs/start";
import { MDXProvider } from "solid-mdx";
import { ErrorBoundary, Suspense } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";

import Md from "~/ui/markdown-components";
import { Layout } from "~/ui/layout";
import "~/styles.css";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>Solid Docs</Title>
					<ErrorBoundary
						fallback={(e) => {
							return (
								<>
									<Title>404 - SolidDocs</Title>
									<Layout isError={!!e}>
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
	);
}
