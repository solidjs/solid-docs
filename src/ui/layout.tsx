import { ParentComponent, Show, children, Suspense } from "solid-js";

import { MainNavigation } from "~/ui/layout/main-navigation";
import { MainHeader } from "./layout/main-header";
import { Hero } from "./layout/hero";
import { cache, createAsync, useMatch } from "@solidjs/router";
import { DocsLayout } from "./docs-layout";
import { PageStateProvider } from "~/data/page-state";
import { Alert } from "@kobalte/core";
import { SidePanel } from "./layout/side-panel";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { getValidLocaleFromPathname } from "~/i18n/helpers";
import flatEntries from "solid:collection/flat-entries";
import englishNav from "solid:collection/tree";
import { PathMatch } from "@solidjs/router/dist/types";

const PROJECTS = ["solid-router", "solid-start", "solid-meta"];

const getProjectFromUrl = (path: string) => {
	for (const project of PROJECTS) {
		if (path.includes(project)) {
			return project;
		}
	}
	return null;
};

const getDocsMetadata = cache(
	async (
		isFirstMatch: PathMatch | undefined,
		isI18nOrProject: PathMatch | undefined,
		isCore: PathMatch | undefined
	) => {
		"use server";

		if (!isFirstMatch && !isI18nOrProject)
			return {
				tree: englishNav,
				entries: flatEntries,
			};

		const { path } = (isFirstMatch || isI18nOrProject || isCore) as PathMatch;

		const locale = getValidLocaleFromPathname(path);
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
				tree: (await import(`../../.solid/${project}-tree.ts`)).default,
				entries: (await import(`../../.solid/${project}-flat-entries.ts`))
					.default,
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
				tree: englishNav,
				entries: flatEntries,
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

	console.log("isError", props.isError);

	// is i18n main
	// is en project
	const isI18nOrProject = useMatch(() => "/:localeOrProject/*", {
		localeOrProject: [...SUPPORTED_LOCALES, ...PROJECTS],
	});

	const isCore = useMatch(() => "/*");

	const isRoot = useMatch(() => "/:localeOrProject?", {
		localeOrProject: [...SUPPORTED_LOCALES, ...PROJECTS],
	});

	console.log("isRoot", isRoot());

	const entries = createAsync(() =>
		getDocsMetadata(isI18nOrProject(), isTranslatedProject(), isCore())
	);

	const resolved = children(() => props.children);

	return (
		<Suspense>
			<PageStateProvider>
				<div class="relative dark:bg-slate-900 bg-slate-50">
					<Alert.Root class="dark:text-slate-900 text-white text-center p-1 font-semibold border-blue-50 dark:border-blue-600 bg-[rgb(14,142,231)] dark:bg-[rgb(162,222,255)]">
						These docs are currently in Beta!{" "}
						<a
							class="underline"
							href="https://shr.link/pna6n"
							rel="noopener noreferrer"
						>
							Share your feedback with us!
						</a>
					</Alert.Root>
					<Show when={entries()}>
						{(data) => <MainHeader tree={data().tree} />}
					</Show>
					{/* <Show when={isRoot()} keyed>
						<Hero />
					</Show> */}
					<div class="relative mx-auto flex max-w-8xl flex-auto justify-center custom-scrollbar pt-10">
						<Show when={!props.isError}>
							<div class="hidden md:relative md:block lg:flex-none ">
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
						<main class="w-full md:max-w-2xl flex-auto px-4 pt-2 md:pb-16 lg:max-w-none prose prose-slate dark:prose-invert dark:text-slate-300">
							<Show
								when={!isRoot()}
								keyed
								fallback={
									<article class="px-2 md:px-10 expressive-code-overrides overflow-y-auto">
										{resolved()}
									</article>
								}
							>
								<Show when={!props.isError} fallback={<>{resolved()}</>}>
									<Suspense>
										<Show when={entries()}>
											{(data) => (
												<DocsLayout entries={data().entries}>
													{resolved()}
												</DocsLayout>
											)}
										</Show>
									</Suspense>
								</Show>
							</Show>
						</main>
						<Show when={!props.isError}>
							<div class="hidden xl:block prose prose-slate dark:prose-invert dark:text-slate-300">
								<div class="sticky top-[4.75rem] h-[calc(100vh-7rem)] overflow-y-auto pr-4 w-64 xl:w-72 custom-scrollbar">
									<SidePanel children={resolved()} />
								</div>
							</div>
						</Show>
					</div>
				</div>
			</PageStateProvider>
		</Suspense>
	);
};
