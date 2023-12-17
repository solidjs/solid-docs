import { waitForDebugger } from "inspector";
import { ParentComponent, Show, createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { useLocation, useMatch } from "solid-start";
import entries from "solid:collection/tree";
import { TableOfContents } from "./layout/table-of-contents";

export interface PageStore {
	pageTitle: string;
	section: string | null;
}

function getEntryData(isReference: boolean, pathname: string) {
	const segments = pathname.split("/").reverse().filter(Boolean);
	const parentSection = segments[1] ?? "";
	const entrySlug = segments[0];
	const group = isReference ? entries.references : entries.learn;
	let parentIdx: number;
	let section: any;

	if (segments.length > 2) {
		const grandparentTitle = segments[2];
		const grandParent = group.find(
			(i) => i.type === "section" && grandparentTitle === i.title.toLowerCase()
		);

		section =
			grandParent?.type === "section" &&
			grandParent.children.find(
				(i) => i.type === "section" && parentSection === i.title.toLowerCase()
			);
	} else {
		section = group.find(
			(i) => i.type === "section" && parentSection === i.title.toLowerCase()
		);
	}

	if (section?.type === "section") {
		let currentEntry;
		let currentEntryIndex = 0;

		for (const item of section.children) {
			if (item.type === "markdown" && item.slug === entrySlug) {
				currentEntry = item;
				break;
			}
			currentEntryIndex += 1;
		}

		return {
			sectionTitle: section.title,
			routesInSection: section.pages,
			currentEntry,
			currentEntryIndex,
		};
	}
}

export const DocsLayout: ParentComponent = (props) => {
	const location = useLocation();
	const paths = () => location.pathname.split("/").reverse();
	const sectionTitle = () => paths()[1].replaceAll("-", " ");
	const entryTitle = () => paths()[0].replaceAll("-", " ");

	const [pageStore, setPageStore] = createStore<PageStore>({
		pageTitle: "",
		section: null,
	});

	return (
		<div class="flex">
			<div class="min-w-0 max-w-2xl flex-auto pb-16 lg:max-w-none">
				<article class="prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 px-10">
					<header class="mb-9 capitalize">
						<p class="text-sm font-medium text-sky-500 my-1">
							{sectionTitle()}
						</p>

						<h1 class="prose-headings:text-3xl text-slate-900 dark:text-white">
							{entryTitle()}
						</h1>
					</header>
					{props.children}
				</article>
			</div>
			<TableOfContents />
		</div>
	);
};
