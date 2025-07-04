import { Show, onMount, JSX } from "solid-js";
import { useLocation } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { coreEntries } from "solid:collection";
import { Pagination } from "~/ui/pagination";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";
import { useProjectTitle } from "./use-project";

interface DocsLayoutProps {
	entries: typeof coreEntries;
	children: JSX.Element;
}

export const DocsLayout = (props: DocsLayoutProps) => {
	const location = useLocation();
	const projectTitle = useProjectTitle();

	const collection = () =>
		location.pathname.includes("/reference/")
			? props.entries.reference
			: props.entries.learn;

	const entryIndex = () =>
		collection()!.findIndex((element) => location.pathname === element.path);

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
					{(title) => <Title>{`${title()} - ${projectTitle()}`}</Title>}
				</Show>
				<article class="expressive-code-overrides mx-auto w-full max-w-2xl overflow-hidden pb-16">
					<Show when={titles()?.parent}>
						{(t) => (
							<span class="my-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
								{t()}
							</span>
						)}
					</Show>
					<Show when={titles()?.title}>
						{(t) => (
							<h1 class="text-slate-900 prose-headings:text-[2.8rem] dark:text-white">
								{t()}
							</h1>
						)}
					</Show>
					<span class="-mt-[15px] block text-sm xl:hidden">
						<EditPageLink />
					</span>
					<div class="w-full">{props.children}</div>
					<span class="text-sm xl:hidden">
						<PageIssueLink />
					</span>
					<Pagination currentIndex={entryIndex()} collection={collection()} />
				</article>
			</>
		</Show>
	);
};
