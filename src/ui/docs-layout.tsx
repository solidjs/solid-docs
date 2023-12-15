import {
	ParentComponent,
	Show,
	createEffect,
	onCleanup,
	onMount,
} from "solid-js";
import { createStore } from "solid-js/store";

import { useLocation } from "solid-start";
import { EntryFile, Section, getEntries } from "~/data/get-nav";
import { TableOfContents } from "./layout/table-of-contents";

export interface PageStore {
	pageTitle: string;
	section: string | null;
	sectionData: Section | EntryFile[] | null;
	prevPage: EntryFile | null;
	nextPage: EntryFile | null;
}

export const DocsLayout: ParentComponent = (props) => {
	let location = useLocation();
	const entries = getEntries();

	const [pageStore, setPageStore] = createStore<PageStore>({
		location: location.pathname,
		pageTitle: "",
		section: null,
		sectionData:
			location[0] === "references" ? entries()?.references : entries()?.learn,
		prevPage: null,
		nextPage: null,
	});

	const find = (findMe: string, data) => {
		for (const section of data) {
			if (section.slug === findMe) {
				return setPageStore("pageTitle", section.title);
			}
			if (section.title.toLowerCase() === findMe.split("-").join(" ")) {
				return setPageStore({
					section: section.title,
					sectionData: section.children,
				});
			}
		}
	};

	const headerInfo = (page) => {
		const pathArr = page.split("/").splice(1);

		for (let i = 0; i < pathArr.length; i++) {
			if (Array.isArray(pageStore.sectionData)) {
				find(pathArr[i], pageStore.sectionData);
			}
		}
	};

	createEffect(() => {
		if (pageStore.location !== location.pathname) {
			setPageStore({
				location: location.pathname,
				pageTitle: "",
				section: null,
				sectionData:
					location[0] === "references"
						? entries()?.references
						: entries()?.learn,
				prevPage: null,
				nextPage: null,
			});
			headerInfo(location.pathname);
		}
	});

	return (
		<div class="flex">
			<div class="min-w-0 max-w-2xl flex-auto px-2 pb-16 lg:max-w-none lg:pl-4 lg:pr-0 xl:px-16">
				<article class="prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10">
					<header class="mb-9 capitalize">
						<Show when={pageStore.section}>
							<p class="text-sm font-medium text-sky-500 my-1">
								{pageStore.section}
							</p>
						</Show>
						<h1 class="prose-headings:text-3xl text-slate-900 dark:text-white">
							{pageStore.pageTitle}
						</h1>
					</header>
					{props.children}
				</article>
			</div>
			<TableOfContents />
		</div>
	);
};