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
import { Show, Suspense } from "solid-js"

import Md from "~/ui/markdown-components"
import { MainNavigation } from "~/ui/main-navigation"
import { MainFooter } from "~/ui/main-footer"
import { MainHeader } from "~/ui/main-header"
import "~/styles.css"

export default function Root() {
	const isRoot = useMatch(() => "/")
	const grid = () =>
		isRoot() ? "grid-rows-[auto_1fr_auto]" : "grid-rows-[1fr_auto]"

	return (
		<Html lang="en" class="h-full antialiased dark">
			<Head>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<Body class="flex min-h-full bg-white dark:bg-slate-900">
				<Suspense>
					<div class="flex w-full flex-col">
						<MainHeader />

						<Show when={isRoot()} keyed>
							{/* Hero */}
						</Show>

						<div class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
							<div class="hidden lg:relative lg:block lg:flex-none">
								<div class="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
								<div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
								<div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
								<div class="sticky top-[4.75rem]  h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-1 pr-8 xl:w-72 xl:pr-16">
									<MainNavigation />
								</div>
							</div>

							<main class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
								{/* <MainNavigation /> */}
								<MDXProvider components={Md}>
									<div
										class="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 
									prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal 
									lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 
									prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline 
									prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] 
									hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] 
									dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] 
									dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg 
									dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 
									dark:prose-hr:border-slate-800"
									>
										<Routes>
											<FileRoutes />
										</Routes>
									</div>
								</MDXProvider>
							</main>
						</div>

						<MainFooter />
					</div>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	)
}
