import { ParentComponent, Show } from "solid-js";

import { MainNavigation } from "~/ui/layout/main-navigation";
import { MainHeader } from "./layout/main-header";
import { Hero } from "./layout/hero";
import { DocsLayout } from "./docs-layout";
import { SidePanel } from "./layout/side-panel";
import { useOsmiumThemeFrontmatter } from "~/frontmatter";

export const Layout: ParentComponent<{ isError?: boolean }> = (props) => {
	const frontmatter = useOsmiumThemeFrontmatter();

	return (
		<div class="relative bg-slate-50 dark:bg-slate-900">
			<MainHeader />
			<Show when={frontmatter()?.hero}>
				<Hero />
			</Show>
			<div class="custom-scrollbar relative mx-auto flex max-w-8xl flex-auto justify-center pt-10">
				<Show when={!props.isError}>
					<div class="hidden md:relative lg:block lg:flex-none">
						<div class="absolute inset-y-0 right-0 w-[50vw] dark:hidden" />
						<div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
						<div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
						<div class="sticky top-[4.75rem] h-[calc(100vh-7rem)] w-64 pl-0.5 pr-2 xl:w-72">
							<MainNavigation />
						</div>
					</div>
				</Show>
				<main
					class="prose prose-slate w-full flex-auto px-4 pt-2 dark:prose-invert md:max-w-2xl md:pb-16 lg:max-w-none dark:text-slate-300"
					aria-live="polite"
				>
					<Show when={!props.isError} fallback={<>{props.children}</>}>
						<DocsLayout>{props.children}</DocsLayout>
					</Show>
				</main>
				<Show when={!props.isError}>
					<div class="prose prose-slate hidden w-56 shrink-0 pr-4 dark:prose-invert xl:block 2xl:w-72 dark:text-slate-300">
						<div class="custom-scrollbar sticky top-[4.75rem] h-[calc(100vh-7rem)] overflow-y-auto">
							<SidePanel />
						</div>
					</div>
				</Show>
			</div>
		</div>
	);
};
