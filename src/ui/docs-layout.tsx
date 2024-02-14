import { createSignal, ParentComponent, Show, createEffect } from "solid-js";
import { useLocation, useMatch } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import flatEntries from "solid:collection/entries";
import { Pagination } from "~/ui/pagination";
import { usePageState } from "~/data/page-state";
import { SidePanel } from "./layout/side-panel";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";

export const [trackHeading, setTrackHeading] = createSignal("");

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
		}
	});

	return (
		<>
			<Title>{`${titles().title} - SolidDocs`}</Title>
			<div id="rr" class="flex relative">
				<article class="w-fit px-2 pb-16 md:px-10 expressive-code-overrides lg:max-w-none lg:min-w-[730px]">
					<Show when={titles().parent}>
						{(t) => (
							<span class="text-sm font-semibold text-blue-700 dark:text-blue-300 my-1">
								{t()}
							</span>
						)}
					</Show>
					<Show when={titles().title}>
						{(t) => (
							<h1 class="prose-headings:text-3xl text-slate-900 dark:text-white">
								{t()}
							</h1>
						)}
					</Show>
					<span class="xl:hidden text-sm">
						<EditPageLink />
					</span>
					<div class="max-w-prose w-full overflow-y-auto">{props.children}</div>
					<span class="xl:hidden text-sm">
						<PageIssueLink />
					</span>
					<Pagination currentIndex={entryIndex()} collection={collection()} />
				</article>
				<SidePanel />
			</div>
		</>
	);
};
