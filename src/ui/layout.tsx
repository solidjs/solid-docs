import { Match, ParentComponent, Show, Switch } from "solid-js";

import { MainNavigation } from "~/ui/layout/main-navigation";
import { MainFooter } from "~/ui/layout/main-footer";
import { MainHeader } from "~/ui/layout/main-header";
import { useMatch } from "solid-start";
import { DocsLayout } from "./docs-layout";

export const Layout: ParentComponent = (props) => {
	const isRoot = useMatch(() => "/");

	return (
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
				<main class="min-w-0 max-w-3xl flex-auto py-16 lg:max-w-none lg:pr-0 prose prose-slate dark:prose-invert dark:text-slate-400">
					<Show when={!isRoot()} keyed>
						<DocsLayout>{props.children}</DocsLayout>
					</Show>
				</main>
			</div>
			<MainFooter />
		</div>
	);
};
