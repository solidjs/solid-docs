import { ParentComponent, Show } from "solid-js";

import { MainNavigation } from "~/ui/layout/main-navigation";
import { MainHeader } from "./layout/main-header";
import { Hero } from "./layout/hero";
import { useMatch } from "@solidjs/router";
import { DocsLayout } from "./docs-layout";
import { PageStateProvider } from "~/data/page-state";
import { Alert } from "@kobalte/core";

export const Layout: ParentComponent<{ isError?: boolean }> = (props) => {
	const isRoot = useMatch(() => "/");

	return (
		<PageStateProvider>
			<div class="relative">
				<Alert.Root class="dark:text-slate-900 text-white text-center bg-[#2c4f7c] dark:bg-[#a2deff] p-1 font-semibold border-blue-00  dark:border-blue-600">
					These docs are currently in Beta!{" "}
					<a class="underline" href="https://shr.link/pna6n">
						Share your feedback with us!
					</a>
				</Alert.Root>
				<MainHeader />
				<Show when={isRoot()} keyed>
					<Hero />
				</Show>
				<div class="relative mx-auto flex max-w-8xl flex-auto justify-center custom-scrollbar">
					<Show when={!props.isError}>
						<div class="hidden md:relative md:block lg:flex-none top-8">
							<div class="absolute inset-y-0 right-0 w-[50vw] dark:hidden" />
							<div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
							<div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
							<div class="sticky top-[4.75rem] h-[calc(100vh-4.75rem)] w-64 pt-16 pb-10 pl-0.5 pr-2 xl:w-72">
								<MainNavigation />
							</div>
						</div>
					</Show>
					<main class="w-full md:max-w-2xl flex-auto px-4 pt-20 md:pb-16 lg:max-w-none prose prose-slate dark:prose-invert dark:text-slate-300">
						<Show
							when={!isRoot()}
							keyed
							fallback={
								<article class="px-2 md:px-10 expressive-code-overrides overflow-y-auto custom-scrollbar">
									{props.children}
								</article>
							}
						>
							<Show when={!props.isError} fallback={<>{props.children}</>}>
								<DocsLayout>{props.children}</DocsLayout>
							</Show>
						</Show>
					</main>
				</div>
			</div>
		</PageStateProvider>
	);
};
