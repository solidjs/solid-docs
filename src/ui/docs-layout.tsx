import { ParentComponent, Show, createEffect, onMount } from "solid-js";
import { useLocation, useMatch } from "solid-start";
import flatEntries from "solid:collection/entries";
import { TableOfContents } from "./layout/table-of-contents";
import { Pagination } from "~/ui/pagination";
import { usePageState } from "~/data/page-state";

export const DocsLayout: ParentComponent = (props) => {
	const location = useLocation();
	const { setPageSections, pageSections } = usePageState();

	const paths = () => location.pathname.split("/").reverse();
	const isReference = useMatch(() => "/reference/*");
	const collection = () =>
		Boolean(isReference()) ? flatEntries.references : flatEntries.learn;
	const entryIndex = () =>
		collection().findIndex((element) => paths()[0] === element.slug);
	const titles = () => {
		const fullEntry = collection()[entryIndex()];
		return {
			parent: fullEntry?.parent !== "root" ? fullEntry.parent : undefined,
			title: fullEntry?.title,
		};
	};

	createEffect(() => {
		if (location.pathname !== pageSections.path) {
			const headings = document?.querySelectorAll("h2, h3");
			const sections: any = [];

			if (headings) {
				headings.forEach((heading) => {
					if (heading.tagName === "H2") {
						sections.push({
							text: heading.textContent,
							id: heading.id,
							level: 2,
							children: [],
						});
					} else if (heading.tagName === "H3") {
						sections[sections.length - 1].children.push({
							text: heading.textContent,
							id: heading.id,
							level: 3,
						});
					}
				});
			}
			setPageSections({
				path: location.pathname,
				sections: sections,
			});
			console.log(pageSections);
		}
	});

	return (
		<div class="flex">
			<div class="min-w-0 max-w-2xl flex-auto pb-16 lg:max-w-none">
				<article class="px-10 expressive-code-overrides">
					<header class="mb-9 capitalize">
						<Show when={titles().parent}>
							{(t) => (
								<p class="text-sm font-medium text-sky-500 my-1">{t()}</p>
							)}
						</Show>
						<Show when={titles().title}>
							{(t) => (
								<h1 class="prose-headings:text-3xl text-slate-900 dark:text-white">
									{t()}
								</h1>
							)}
						</Show>
					</header>
					{props.children}
					<Pagination currentIndex={entryIndex()} collection={collection()} />
				</article>
			</div>
			<TableOfContents />
		</div>
	);
};
