import { ParentComponent, Show } from "solid-js";

import { MainNavigation } from "~/ui/layout/main-navigation";
import { MainHeader } from "./layout/main-header";
import { Hero } from "./layout/hero";
import { useMatch } from "@solidjs/router";
import { DocsLayout } from "./docs-layout";
import { PageStateProvider } from "~/data/page-state";

export const Layout: ParentComponent = (props) => {
	const isRoot = useMatch(() => "/");

	return (
		<PageStateProvider>
			<div class="flex flex-col w-full lg:w-screen">
				<MainHeader />

				<Show when={isRoot()} keyed>
					<Hero />
				</Show>

				<div class="relative mx-auto flex max-w-8xl flex-auto justify-center custom-scrollbar">
					<div class="hidden md:relative md:block lg:flex-none top-8">
						<div class="absolute inset-y-0 right-0 w-[50vw] dark:hidden" />
						<div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
						<div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
						<div class="sticky top-[4.75rem] h-[calc(100vh-4.75rem)] w-64 mt-10 py-6 pl-0.5 pr-2 xl:w-72">
							<MainNavigation />
						</div>
					</div>
					<main class="w-screen md:max-w-2xl flex-auto px-4 pt-20 md:pb-16 lg:max-w-none prose prose-slate dark:prose-invert dark:text-slate-400">
						<Show
							when={!isRoot()}
							keyed
							fallback={
								<article class="px-2 md:px-10 expressive-code-overrides overflow-y-auto custom-scrollbar">
									{props.children}
								</article>
							}
						>
							<DocsLayout>{props.children}</DocsLayout>
						</Show>
					</main>
				</div>
			</div>
		</PageStateProvider>
	);
};
