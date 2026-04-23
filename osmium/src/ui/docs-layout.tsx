import { Show, JSX, createMemo } from "solid-js";
import { Pagination } from "./pagination";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";
import { useOsmiumThemeFrontmatter } from "../frontmatter";
import { useRouteConfig } from "../utils";
import { useCurrentPageData } from "@kobalte/solidbase/client";

interface DocsLayoutProps {
	children: JSX.Element;
}

export const DocsLayout = (props: DocsLayoutProps) => {
	const frontmatter = useOsmiumThemeFrontmatter();

	const pageData = useCurrentPageData();
	const config = useRouteConfig();

	const formatter = createMemo(
		() => new Intl.DateTimeFormat(undefined, config()?.lastUpdated || undefined)
	);

	const date = createMemo(
		() =>
			new Date(
				Number.isNaN(pageData()?.lastUpdated)
					? 0
					: (pageData()?.lastUpdated ?? 0)
			)
	);

	return (
		<article class="expressive-code-overrides mx-auto w-full max-w-2xl overflow-hidden pb-16">
			<Show when={frontmatter()?.category}>
				{(t) => (
					<span class="my-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
						{t()}
					</span>
				)}
			</Show>
			<h1 class="prose-headings:text-[2.8rem] text-slate-900 dark:text-white">
				{frontmatter()?.title}
			</h1>
			<div class="w-full px-1">{props.children}</div>
			<Show when={frontmatter()?.lastUpdated}>
				<span class="mt-2 block w-full text-right text-sm">
					Last updated:{" "}
					<Show when={!Number.isNaN(pageData()?.lastUpdated)} fallback="?">
						{formatter().format(date())}
					</Show>
				</span>
			</Show>
			<span class="-mt-[15px] block text-sm xl:hidden">
				<EditPageLink />
			</span>
			<span class="text-sm xl:hidden">
				<PageIssueLink />
			</span>
			<Pagination />
		</article>
	);
};
