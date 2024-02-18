import { createSignal, ParentComponent, Show, createEffect } from "solid-js";
import { useLocation, useMatch } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import flatEntries from "solid:collection/entries";
import { Pagination } from "~/ui/pagination";
import { usePageState } from "~/data/page-state";
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
			<div id="rr" class="flex relative mx-auto justify-center">
				<article class="w-fit overflow-hidden pb-16 md:px-10 expressive-code-overrides lg:max-w-none ">
					<Show when={titles().parent}>
						{(t) => (
							<span class="text-sm font-semibold tracking-[1.4px] text-blue-800 dark:text-blue-300 my-1 opacity-[65%]">
								{t()}
							</span>
						)}
					</Show>
					<Show when={titles().title}>
						{(t) => (
							<h1 class="prose-headings text-[2.85rem] text-blue-950 tracking-wider dark:text-white mb-[24px]">
								{t()}
							</h1>
						)}
					</Show>
					<span class="block -mt-[23px] pl-[2px] text-sm opacity-90 font-xs tracking-wider hover:opacity-1 transition-all [&>a>svg]:w-[12px] xl:hidden">
						<EditPageLink />
					</span>
					<div class="max-w-prose w-full overflow-y-auto">{props.children}</div>
					<span class="xl:hidden text-sm">
						<PageIssueLink />
					</span>
					<Pagination currentIndex={entryIndex()} collection={collection()} />
				</article>
			</div>
		</>
	);
};
