import {
	createSignal,
	ParentComponent,
	Show,
	createResource,
	onMount,
	Suspense,
	createEffect,
	JSX,
} from "solid-js";
import { cache, createAsync, useLocation, useMatch } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import flatEntries from "solid:collection/flat-entries";
import { Pagination } from "~/ui/pagination";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { getValidLocaleFromPathname } from "~/i18n/helpers";
import { PathMatch } from "@solidjs/router/dist/types";

const PROJECTS = ["solid-router"];

// const getEntries = cache(
// 	async (
// 		isFirstMatch: PathMatch | undefined,
// 		isTranslatedProject: PathMatch | undefined
// 	) => {
// 		"use server";
// 		if (!isFirstMatch && !isTranslatedProject) return flatEntries;

// 		const { path } = (isFirstMatch || isTranslatedProject) as PathMatch;
// 		const locale = getValidLocaleFromPathname(path);

// 		if (path.includes("solid-router")) {
// 			if (SUPPORTED_LOCALES.some((lang) => lang === locale)) {
// 				return (
// 					await import(`../../.solid/solid-router-flat-entries-${locale}.ts`)
// 				).default;
// 			}

// 			return (await import("../../.solid/solid-router-flat-entries")).default;
// 		}

// 		if (SUPPORTED_LOCALES.some((lang) => lang === locale)) {
// 			return (await import(`../../.solid/flat-entries-${locale}.ts`)).default;
// 		} else {
// 			return flatEntries;
// 		}
// 	},
// 	"stuff"
// );

// type GenericEntry = Readonly<{
// 	type: "markdown" | "section";
// 	file: string;
// 	path: string;
// 	slug: string;
// 	parent: string;
// 	title: string;
// 	mainNavExclude?: boolean;
// 	isTranslated: boolean;
// 	children?: string[];
// 	pages?: string[];
// }>;

// type GenericFlatEntries = Readonly<{
// 	learn: GenericEntry[];
// 	reference: GenericEntry[];
// }>;

export const [trackHeading, setTrackHeading] = createSignal("");

interface DocsLayoutProps {
	entries: typeof flatEntries;
	children: JSX.Element;
}

export const DocsLayout = (props: DocsLayoutProps) => {
	const location = useLocation();
	const isReference = useMatch(() => "/reference/*");

	// const isTranslatedProject = useMatch(() => "/:locale/:project/*", {
	// 	locale: [...SUPPORTED_LOCALES, ...PROJECTS],
	// 	project: PROJECTS,
	// });

	// is english main
	// is i18n main
	// is en project
	// const isFirstMatch = useMatch(() => "/:locale/*", {
	// 	locale: [...SUPPORTED_LOCALES, ...PROJECTS],
	// });
	// const entries = createAsync<typeof flatEntries>(() =>
	// 	getEntries(isFirstMatch(), isTranslatedProject())
	// );

	const lastSegmentPath = () => location.pathname.split("/").reverse()[0];
	const collection = () =>
		isReference() ? props.entries.reference : props.entries.learn;

	const entryIndex = () => {
		// console.log(paths()[0]);
		const e = collection()!.findIndex((element) => {
			const idx = lastSegmentPath() === element.slug;
			// console.log("lastSegmentPath::", lastSegmentPath());
			// console.log("element.slug::", element.slug);
			// console.log("element.title::", element.title);
			return idx;
		});
		// console.log(e);
		return e;
	};

	const titles = () => {
		const fullEntry = collection
			? collection()![entryIndex()]
			: { parent: undefined, title: undefined };
		if (fullEntry) {
			return {
				parent: fullEntry?.parent !== "root" ? fullEntry.parent : undefined,
				title: fullEntry?.title,
			};
		}
	};

	onMount(() => document.dispatchEvent(new CustomEvent("docs-layout-mounted")));

	return (
		<Show when={props.entries} keyed>
			{(e) => (
				<>
					<Show when={titles()?.title} fallback={<Title>SolidDocs</Title>}>
						{(title) => <Title>{`${title()} - SolidDocs`}</Title>}
					</Show>
					<div id="rr" class="flex relative">
						<article class="w-fit overflow-hidden px-2 pb-16 md:px-10 expressive-code-overrides lg:max-w-none lg:min-w-[730px]">
							<Show when={titles()?.parent}>
								{(t) => (
									<span class="text-sm font-semibold text-blue-700 dark:text-blue-300 my-1">
										{t()}
									</span>
								)}
							</Show>
							<Show when={titles()?.title}>
								{(t) => (
									<h1 class="prose-headings:text-3xl text-slate-900 dark:text-white">
										{t()}
									</h1>
								)}
							</Show>
							<span class="xl:hidden text-sm">
								<EditPageLink />
							</span>
							<div class="max-w-prose w-full">{props.children}</div>
							<span class="xl:hidden text-sm">
								<PageIssueLink />
							</span>
							<Pagination
								currentIndex={entryIndex()}
								collection={collection()}
							/>
						</article>
					</div>
				</>
			)}
		</Show>
	);
};
