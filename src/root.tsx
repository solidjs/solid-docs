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
	useMatch,
} from "solid-start"
import { MDXProvider } from "solid-mdx"
import Md from "~/ui/markdown-components"
import { MainNavigation } from "~/ui/main-navigation"
import "~/styles.css"
import { Show, Suspense } from "solid-js"
import { MainFooter } from "~/ui/main-footer"

export default function Root() {
	const isRoot = useMatch(() => "/")
	const grid = () =>
		isRoot() ? "grid-rows-[auto_1fr_auto]" : "grid-rows-[1fr_auto]"

	return (
		<Html lang="en">
			<Head>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<Body>
				<Suspense>
					<main class={`grid ${grid()} h-screen w-full overflow-x-hidden`}>
						<Show when={isRoot()} keyed>
							<header class="h-80 w-full grid place-items-center">
								SolidJS
							</header>
						</Show>
						<div class="grid grid-cols-[auto_1fr]">
							<MainNavigation />
							<MDXProvider components={Md}>
								<div class="prose">
									<Routes>
										<FileRoutes />
									</Routes>
								</div>
							</MDXProvider>
						</div>
						<MainFooter />
					</main>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	)
}
