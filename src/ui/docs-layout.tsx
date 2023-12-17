import { ParentComponent } from "solid-js";
import { useLocation, useMatch } from "solid-start";
import flatEntries from "solid:collection/entries";

import { TableOfContents } from "./layout/table-of-contents";

export interface PageStore {
	pageTitle: string;
	section: string | null;
}

export const DocsLayout: ParentComponent = (props) => {
	const location = useLocation();
	const paths = () => location.pathname.split("/").reverse();
	const isReference = useMatch(() => "/reference");
	const titles = () => {
		const collection = Boolean(isReference())
			? flatEntries.references
			: flatEntries.learn;

		const fullEntry = collection.find((element) => paths()[0] === element.slug);

		return {
			parent: fullEntry?.parent,
			title: fullEntry?.title as string,
		};
	};
	const entryTitle = () => paths()[0].replaceAll("-", " ");

	return (
		<div class="flex">
			<div class="min-w-0 max-w-2xl flex-auto pb-16 lg:max-w-none">
				<article class="prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 px-10">
					<header class="mb-9 capitalize">
						<p class="text-sm font-medium text-sky-500 my-1">
							{titles().parent}
						</p>

						<h1 class="prose-headings:text-3xl text-slate-900 dark:text-white">
							{titles().title}
						</h1>
					</header>
					{props.children}
				</article>
			</div>
			<TableOfContents />
		</div>
	);
};
