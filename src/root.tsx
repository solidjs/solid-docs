// @refresh reload
import {
	Routes,
	Meta,
	Link,
	FileRoutes,
	Scripts,
	Html,
	Head,
	Body,
	Title,
} from "solid-start";
import { MDXProvider } from "solid-mdx";
import { Suspense } from "solid-js";

import Md from "~/ui/markdown-components";
import { Layout } from "~/ui/layout";
import "~/styles.css";

export default function Root() {
	return (
		<Suspense>
			<Html lang="en" class="h-full antialiased dark">
				<Head>
					<Title>Solid Docs</Title>
					<Meta charset="utf-8" />
					<Meta name="viewport" content="width=device-width, initial-scale=1" />
					<Link rel="shortcut icon" href="/favicon.ico" />
				</Head>
				<Body class="flex min-h-full bg-white dark:bg-slate-900 subpixel-antialiased">
					<Layout>
						<MDXProvider components={Md}>
							<Routes>
								<FileRoutes />
							</Routes>
						</MDXProvider>
					</Layout>
					<Scripts />
				</Body>
			</Html>
		</Suspense>
	);
}
