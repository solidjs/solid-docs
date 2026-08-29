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
				class="border-border mt-10 flex flex-col gap-3 border-t pt-2 sm:flex-row sm:justify-between"
			>
				<div class="max-w-full min-w-0 sm:max-w-[48%]">
					<Show when={hasPrev()}>
						<span class="font-display text-text-subtle text-xs font-semibold tracking-wide uppercase">
							Previous
						</span>
						<a
							class="border-border bg-surface-raised text-text hover:border-border-strong hover:text-action focus-visible:ring-focus focus-visible:ring-offset-canvas mt-1 block max-w-full rounded border px-4 py-3 text-base font-semibold [overflow-wrap:anywhere] no-underline shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
							href={customLink(frontmatter()?.prev) ?? prevNext.prevLink().link}
						>
							← {customTitle(frontmatter()?.prev) ?? prevNext.prevLink().title}
						</a>
					</Show>
				</div>
				<Show when={hasNext()}>
					<div class="max-w-full min-w-0 self-end text-right sm:ml-auto sm:max-w-[48%]">
						<span class="font-display text-text-subtle text-xs font-semibold tracking-wide uppercase">
							Next
						</span>
						<a
							class="border-border bg-surface-raised text-text hover:border-border-strong hover:text-action focus-visible:ring-focus focus-visible:ring-offset-canvas mt-1 block max-w-full rounded border px-4 py-3 text-base font-semibold [overflow-wrap:anywhere] no-underline shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
