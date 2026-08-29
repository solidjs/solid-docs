import { ParentComponent, Show } from "solid-js";

import { MainNavigation } from "./layout/main-navigation";
import { MainHeader } from "./layout/main-header";
import { Hero } from "./layout/hero";
import { DocsLayout } from "./docs-layout";
import { SidePanel } from "./layout/side-panel";
import { useOsmiumThemeFrontmatter } from "../frontmatter";

export const Layout: ParentComponent<{ isError?: boolean }> = (props) => {
	const frontmatter = useOsmiumThemeFrontmatter();

	return (
		<div class="bg-canvas text-text relative min-h-screen overflow-x-clip">
			<a
				href="#main-content"
				onClick={() => document.getElementById("main-content")?.focus()}
				class="focus:bg-surface-raised focus:text-text focus:ring-focus sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:px-3 focus:py-2 focus:shadow-lg focus:ring-2"
			>
				Skip to main content
			</a>
			<MainHeader />
			<Show when={frontmatter()?.hero}>
				<Hero />
			</Show>
			<div class="custom-scrollbar relative mx-auto w-full max-w-[96rem] pt-4 lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)_15.5rem]">
				<Show when={!props.isError}>
					<div class="hidden lg:block">
						<div class="border-border sticky top-16 h-[calc(100vh-4rem)] border-r px-4 pt-1">
							<MainNavigation />
						</div>
					</div>
				</Show>
				<main
					id="main-content"
					tabIndex={-1}
					aria-live="polite"
					class="prose prose-slate dark:prose-invert text-text-muted w-full max-w-none min-w-0 px-5 pt-1 md:pb-16 lg:px-6"
					classList={{ "lg:col-span-3": props.isError }}
				>
					<Show when={!props.isError} fallback={<>{props.children}</>}>
						<DocsLayout>{props.children}</DocsLayout>
					</Show>
				</main>
				<Show when={!props.isError}>
					<div class="prose prose-slate dark:prose-invert text-text-muted hidden px-5 lg:block">
						<div class="custom-scrollbar sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
							<SidePanel />
						</div>
					</div>
				</Show>
			</div>
		</div>
	);
};
