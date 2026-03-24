import { Show, onMount, JSX } from "solid-js";
import { useLocation } from "@solidjs/router";
import { Pagination } from "./pagination";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";
import { useOsmiumThemeFrontmatter } from "../frontmatter";

interface DocsLayoutProps {
	children: JSX.Element;
}

export const DocsLayout = (props: DocsLayoutProps) => {
	const frontmatter = useOsmiumThemeFrontmatter();

	return (
		<article class="expressive-code-overrides mx-auto w-full max-w-2xl overflow-hidden pb-16">
			<Show when={frontmatter()?.category}>
				{(t) => (
					<span class="my-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
						{t()}
					</span>
				)}
			</Show>
			<h1 class="text-slate-900 prose-headings:text-[2.8rem] dark:text-white">
				{frontmatter()?.title}
			</h1>
			<span class="-mt-[15px] block text-sm xl:hidden">
				<EditPageLink />
			</span>
			<div class="w-full px-1">{props.children}</div>
			<span class="text-sm xl:hidden">
				<PageIssueLink />
			</span>
			<Pagination />
		</article>
	);
};
