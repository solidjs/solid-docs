import { ParentComponent, Show, Suspense } from "solid-js";
import {
	coreTree,
	routerTree,
	startTree,
	coreEntries,
	startEntries,
	routerEntries,
	metaTree,
	metaEntries,
} from "solid:collection";
import { PathMatch } from "@solidjs/router";

import { MainNavigation } from "~/ui/layout/main-navigation";
import { MainHeader } from "./layout/main-header";
import { Hero } from "./layout/hero";
import { query, createAsync, useMatch } from "@solidjs/router";
import { DocsLayout } from "./docs-layout";
import { SidePanel } from "./layout/side-panel";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { getCurrentLocale } from "~/i18n/helpers";
import { useCurrentRouteMetaData } from "~/utils/route-metadata-helper";

const PROJECTS = ["solid-router", "solid-start", "solid-meta"] as const;

function getDefaultTree(project: (typeof PROJECTS)[number]) {
	switch (project) {
		case "solid-router":
			return routerTree;
		case "solid-start":
			return startTree;
		case "solid-meta":
			return metaTree;
		default:
			return coreTree;
	}
}

function getDefaultEntries(project: (typeof PROJECTS)[number]) {
	switch (project) {
		case "solid-router":
			return routerEntries;
		case "solid-start":
			return startEntries;
		case "solid-meta":
			return metaEntries;
		default:
			return coreEntries;
	}
}

const getProjectFromUrl = (path: string) => {
	for (const project of PROJECTS) {
		if (path.includes(project)) {
			return project;
		}
	}
	return null;
};

const getDocsMetadata = query(
	async (
		isFirstMatch: PathMatch | undefined,
		isI18nOrProject: PathMatch | undefined,
		isCore: PathMatch | undefined
	) => {
		if (!isFirstMatch && !isI18nOrProject)
			return {
				tree: coreTree,
				entries: coreEntries,
			};

		const { path } = (isFirstMatch || isI18nOrProject || isCore) as PathMatch;

		const locale = getCurrentLocale();
		const project = getProjectFromUrl(path);

		if (project) {
			if (SUPPORTED_LOCALES.some((lang) => lang === locale)) {
				return {
					tree: (await import(`../../.solid/${project}-tree-${locale}.ts`))
						.default,
					entries: (
						await import(`../../.solid/${project}-flat-entries-${locale}.ts`)
					).default,
				};
			}

			return {
				tree: getDefaultTree(project),
				entries: getDefaultEntries(project),
			};
		}

		if (SUPPORTED_LOCALES.some((lang) => lang === locale)) {
			return {
				tree: (await import(`../../.solid/tree-${locale}.ts`)).default,
				entries: (await import(`../../.solid/flat-entries-${locale}.ts`))
					.default,
			};
		} else {
			return {
				tree: coreTree,
				entries: coreEntries,
			};
		}
	},
	"global-metadata"
);

export const Layout: ParentComponent<{ isError?: boolean }> = (props) => {
	const isTranslatedProject = useMatch(() => "/:locale/:project/*", {
		locale: [...SUPPORTED_LOCALES, ...PROJECTS],
		project: PROJECTS,
	});

	// is i18n main
	// is en project
	const isProjectContent = useMatch(() => "/:localeOrProject/*", {
		localeOrProject: [...SUPPORTED_LOCALES, ...PROJECTS],
	});

	const isCoreContent = useMatch(() => "/*");

	const entries = createAsync(
		() =>
			getDocsMetadata(
				isProjectContent(),
				isTranslatedProject(),
				isCoreContent()
			),
		{ deferStream: true }
	);

	return (
		<div class="relative bg-slate-50 dark:bg-slate-900">
			<Show when={entries()}>
				{(data) => <MainHeader tree={data().tree} />}
			</Show>
			<Show when={useCurrentRouteMetaData().isProjectRoot} keyed>
				<Hero />
			</Show>
			<div class="custom-scrollbar relative mx-auto flex max-w-8xl flex-auto justify-center pt-10">
				<Show when={!props.isError}>
					<div class="hidden md:relative lg:block lg:flex-none">
						<div class="absolute inset-y-0 right-0 w-[50vw] dark:hidden" />
						<div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
						<div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
						<Suspense>
							<Show when={entries()}>
								{(data) => (
									<div class="sticky top-[4.75rem] h-[calc(100vh-7rem)] w-64 pl-0.5 pr-2 xl:w-72">
										<MainNavigation tree={data().tree} />
									</div>
								)}
							</Show>
						</Suspense>
					</div>
				</Show>
				<main class="prose prose-slate w-full flex-auto px-4 pt-2 dark:prose-invert md:max-w-2xl md:pb-16 lg:max-w-none dark:text-slate-300">
					<Show
						when={!useCurrentRouteMetaData().isProjectRoot}
						keyed
						fallback={
							<article class="expressive-code-overrides overflow-y-auto px-2 md:px-10">
								{props.children}
							</article>
						}
					>
						<Show when={!props.isError} fallback={<>{props.children}</>}>
							<Suspense>
								<Show when={entries()}>
									{(data) => (
										<DocsLayout entries={data().entries}>
											{props.children}
										</DocsLayout>
									)}
								</Show>
							</Suspense>
						</Show>
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
