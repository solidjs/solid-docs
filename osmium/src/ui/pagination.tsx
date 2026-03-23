import { A } from "~/ui/i18n-anchor";
import { Show, Suspense } from "solid-js";
import { usePrevNext } from "@kobalte/solidbase/client";
import { RelativePageConfig, useOsmiumThemeFrontmatter } from "~/frontmatter";

type Pagination = {};
export function Pagination(props: Pagination) {
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
			<nav class="mt-10 flex justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
				<Show when={hasPrev()}>
					<div>
						<span class="font-display text-sm font-medium text-slate-900 dark:text-white">
							Previous
						</span>
						<A
							class="flex flex-row-reverse items-center gap-x-1 text-base font-medium text-slate-500 no-underline hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
							href={customLink(frontmatter()?.prev) ?? prevNext.prevLink().link}
						>
							← {customTitle(frontmatter()?.prev) ?? prevNext.prevLink().title}
						</A>
					</div>
				</Show>
				<Show when={hasNext()}>
					<div>
						<span class="font-display text-sm font-medium text-slate-900 dark:text-white">
							Next
						</span>
						<A
							class="flex flex-row-reverse items-center gap-x-1 text-base font-medium text-slate-500 no-underline hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
							href={customLink(frontmatter()?.next) ?? prevNext.nextLink().link}
						>
							{customLink(frontmatter()?.next) ?? prevNext.nextLink().title} →
						</A>
					</div>
				</Show>
			</nav>
		</Suspense>
	);
}
