import { Show, Suspense } from "solid-js";
import { usePrevNext } from "@kobalte/solidbase/client";
import { RelativePageConfig, useOsmiumThemeFrontmatter } from "../frontmatter";

type Pagination = {};
export function Pagination(_props: Pagination) {
	const frontmatter = useOsmiumThemeFrontmatter();
	const prevNext = usePrevNext();

	const hasPrev = () =>
		(prevNext.prevLink() && frontmatter()?.prev !== false) ||
		frontmatter()?.prev;

	const hasNext = () =>
		(prevNext.nextLink() && frontmatter()?.next !== false) ||
		frontmatter()?.next;

	const customTitle = (r?: RelativePageConfig) =>
		typeof r === "string" ? r : typeof r === "object" ? r.text : undefined;

	const customLink = (r?: RelativePageConfig) =>
		typeof r === "object" ? r.link : undefined;

	return (
		<Suspense>
			<nav
				aria-label="Documentation pagination"
				class="mt-10 flex flex-col gap-6 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between dark:border-slate-800"
			>
				<div class="max-w-full min-w-0 sm:max-w-[48%]">
					<Show when={hasPrev()}>
						<span class="font-display text-sm font-medium text-slate-900 dark:text-white">
							Previous
						</span>
						<a
							class="block max-w-full text-base font-medium [overflow-wrap:anywhere] text-slate-500 no-underline hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
							href={customLink(frontmatter()?.prev) ?? prevNext.prevLink().link}
						>
							← {customTitle(frontmatter()?.prev) ?? prevNext.prevLink().title}
						</a>
					</Show>
				</div>
				<Show when={hasNext()}>
					<div class="max-w-full min-w-0 self-end text-right sm:ml-auto sm:max-w-[48%]">
						<span class="font-display text-sm font-medium text-slate-900 dark:text-white">
							Next
						</span>
						<a
							class="block max-w-full text-base font-medium [overflow-wrap:anywhere] text-slate-500 no-underline hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
							href={customLink(frontmatter()?.next) ?? prevNext.nextLink().link}
						>
							{customLink(frontmatter()?.next) ?? prevNext.nextLink().title} →
						</a>
					</div>
				</Show>
			</nav>
		</Suspense>
	);
}
