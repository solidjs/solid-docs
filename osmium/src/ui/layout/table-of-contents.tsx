import { For, Show, createEffect, createSignal } from "solid-js";
import type { JSX } from "@solidjs/web";
import {
	useCurrentPageData,
	TableOfContentsItemData,
} from "@kobalte/solidbase/client";
import { createEventListener } from "@solid-primitives/event-listener";
import { isServer } from "@solidjs/web";

export const TableOfContents = () => {
	const data = useCurrentPageData();
	const toc = () => data()?.toc;

	const [currentSection, setCurrentSection] = createSignal<string>();

	const [headingElements, setHeadingElements] = createSignal<
		Array<{ href: string; el?: HTMLElement }>
	>([]);

	createEffect(toc, (toc) => {
		if (!toc) return;
		setHeadingElements(
				toc
					.map(flattenData)
					.flat()
					.map((href) => {
						const el = document.getElementById(href.slice(1)) ?? undefined;

						return { href, el };
					})
		);
	});

	// Called on the server too (it no-ops there) so hydration ids line up.
	createEventListener(isServer ? [] : window, "scroll", () => {
			let current;

			for (const heading of headingElements()) {
				if (!heading.el) continue;
				if (heading.el.getBoundingClientRect().top < 300) {
					current = heading.href;
				}
			}

			setCurrentSection(current);
		});

	return (
		<aside aria-label="table of contents" class="w-full pt-5">
			<span class="text-base font-semibold text-slate-900 dark:text-white">
				On this page
			</span>
			<ol
				role="list"
				class="mt-3 flex list-none flex-col border-l border-slate-300 p-0 text-sm dark:border-slate-700"
			>
				<li class="not-prose mt-0 mb-0 pl-0">
					<TocLink href="#" active={currentSection() === undefined}>
						Overview
					</TocLink>
				</li>
				<For keyed={false} each={toc()}>
					{(section) => (
						<li class="not-prose mt-0 pt-0 pl-0">
							<TocLink
								href={section().href}
								active={currentSection() === section().href}
							>
								{section().title}
							</TocLink>
							<Show when={section().children.length !== 0}>
								<ol role="list" class="list-none p-0">
									<For keyed={false} each={section().children}>
										{(subSection) => (
											<li class="not-prose mt-0 pl-0">
												<TocLink
													href={subSection().href}
													active={currentSection() === subSection().href}
													nested
												>
													{subSection().title}
												</TocLink>
											</li>
										)}
									</For>
								</ol>
							</Show>
						</li>
					)}
				</For>
			</ol>
		</aside>
	);
};

// One rail for the whole list; the active entry colors its own segment of it.
const TocLink = (props: {
	href: string;
	active: boolean;
	nested?: boolean;
	children: JSX.Element;
}) => (
	<a
		href={props.href}
		aria-current={props.active ? "location" : undefined}
		class={[
			"not-prose -ml-px block border-l-2 py-1 leading-snug no-underline transition-colors",
			{
				"pl-6": props.nested,
				"pl-3": !props.nested,
				"border-blue-600 dark:border-blue-300 text-blue-800 dark:text-blue-200 font-semibold":
					props.active,
				"border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500":
					!props.active,
			},
		]}
	>
		{props.children}
	</a>
);

function flattenData(data: TableOfContentsItemData): Array<string> {
	return [data?.href, ...(data?.children ?? []).flatMap(flattenData)].filter(
		Boolean
	);
}
