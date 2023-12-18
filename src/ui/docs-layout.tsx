import { ParentComponent, Show } from "solid-js";
import { useLocation, useMatch } from "solid-start";
import flatEntries from "solid:collection/entries";
import { TableOfContents } from "./layout/table-of-contents";
import { Pagination } from "~/ui/pagination";

export const DocsLayout: ParentComponent = (props) => {
	const location = useLocation();
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
