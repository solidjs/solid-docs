import { createSignal, Show, onMount, JSX } from "solid-js";
import { useLocation, useMatch } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { coreEntries } from "solid:collection";
import { Pagination } from "~/ui/pagination";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";

export const [trackHeading, setTrackHeading] = createSignal("");

interface DocsLayoutProps {
	entries: typeof coreEntries;
	children: JSX.Element;
}

export const DocsLayout = (props: DocsLayoutProps) => {
	const location = useLocation();

	const lastSegmentPath = () => location.pathname.split("/").reverse()[0];
	const collection = () =>
		location.pathname.includes("/reference/")
			? props.entries.reference
			: props.entries.learn;

	const entryIndex = () =>
		collection()!.findIndex((element) => lastSegmentPath() === element.slug);

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
			<>
				<Show when={titles()?.title} fallback={<Title>SolidDocs</Title>}>
					{(title) => <Title>{`${title()} - SolidDocs`}</Title>}
				</Show>
				<div id="rr" class="flex relative justify-center">
					<article class="w-fit overflow-hidden px-2 pb-16 md:px-10 expressive-code-overrides lg:max-w-none lg:min-w-[65ch]">
						<Show when={titles()?.parent}>
							{(t) => (
								<span class="text-sm font-semibold text-blue-700 dark:text-blue-300 my-1">
									{t()}
								</span>
							)}
						</Show>
						<Show when={titles()?.title}>
							{(t) => (
								<h1 class="prose-headings:text-[2.8rem] text-slate-900 dark:text-white">
									{t()}
								</h1>
							)}
						</Show>
						<span class="xl:hidden text-sm -mt-[15px] block">
							<EditPageLink />
						</span>
						<div class="max-w-prose w-full">{props.children}</div>
						<span class="xl:hidden text-sm">
							<PageIssueLink />
						</span>
						<Pagination currentIndex={entryIndex()} collection={collection()} />
					</article>
				</div>
			</>
		</Show>
	);
};
