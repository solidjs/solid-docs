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
		<article class="expressive-code-overrides mx-auto w-full max-w-[52rem] overflow-hidden pb-16">
			<header class="mb-8 px-1">
				<Show when={frontmatter()?.category}>
					{(t) => (
						<span class="text-action mb-2 block text-sm font-semibold">
							{t()}
						</span>
					)}
				</Show>
				<h1 class="font-display text-text m-0! text-[2.25rem] leading-10 font-semibold text-balance [overflow-wrap:anywhere] sm:text-[2.5rem] sm:leading-11">
					{frontmatter()?.title}
				</h1>
			</header>
			<div class="w-full px-1">{props.children}</div>
			<Show when={frontmatter()?.lastUpdated}>
				<span class="mt-6 block w-full text-right text-sm">
					Last updated:{" "}
					<Show when={!Number.isNaN(pageData()?.lastUpdated)} fallback="?">
						{formatter().format(date())}
					</Show>
				</span>
			</Show>
			<div class="mt-6 flex flex-col gap-1 text-sm lg:hidden">
				<EditPageLink />
				<PageIssueLink />
			</div>
			<Pagination />
		</article>
	);
};
