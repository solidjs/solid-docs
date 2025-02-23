import { Index, Show, createEffect, createSignal, on } from "solid-js";
import {
	useCurrentPageData,
	TableOfContentsItemData,
} from "@kobalte/solidbase/client";
import { createEventListener } from "@solid-primitives/event-listener";
import { isServer } from "solid-js/web";

import { useI18n } from "~/i18n/i18n-context";

export const TableOfContents = () => {
	const data = useCurrentPageData();
	const toc = () => data().toc;

	const i18n = useI18n();

	const [currentSection, setCurrentSection] = createSignal<string>();

	const [headingElements, setHeadingElements] = createSignal<
		Array<{ href: string; el?: HTMLElement }>
	>([]);

	createEffect(
		on(toc, (toc) => {
			if (!toc) return [];
			setHeadingElements(
				toc
					.map(flattenData)
					.flat()
					.map((href) => {
						const el = document.getElementById(href.slice(1)) ?? undefined;

						return { href, el };
					})
			);
		})
	);

	if (!isServer)
		createEventListener(window, "scroll", () => {
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
				{i18n.t("toc.this.page")}
			</span>
			<ol
				role="list"
				class="text-sm list-none mt-2 p-0 flex flex-col pl-2.5 space-y-2"
			>
				<li class="pl-0 mt-0 mb-0">
					<span>
						<a
							href="#_top"
							classList={{
								"dark:text-slate-300": currentSection() !== undefined,
								"text-blue-800 dark:text-blue-300 font-bold hover:text-slate-700 dark:hover:text-slate-200":
									currentSection() === undefined,
							}}
							class="no-underline hover:text-slate-800"
						>
							{i18n.t("toc.overview")}
						</a>
					</span>
				</li>
				<Index each={toc()}>
					{(section) => (
						<li class="pl-0 pt-0 space-y-2">
							<span>
								<a
									href={section().href}
									classList={{
										"dark:text-slate-300": currentSection() !== section().href,
										"text-blue-800 dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200 font-bold":
											currentSection() === section().href,
									}}
									class="no-underline hover:text-slate-700 dark:hover:text-blue-300"
								>
									{section().title}
								</a>
							</span>
							<Show when={section().children.length !== 0}>
								<ol
									role="list"
									class="pl-2.5 text-slate-500 dark:text-slate-300 list-none active:font-bold hover:text-slate-700 dark:hover:text-blue-200 font-bold active:text-blue-600 space-y-2"
								>
									<Index each={section().children}>
										{(subSection) => (
											<li>
												<a
													href={subSection().href}
													classList={{
														"dark:text-slate-300":
															currentSection() !== subSection().href,
														"text-blue-800 dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200 font-bold":
															currentSection() === subSection().href,
													}}
													class="no-underline hover:text-blue-700 dark:hover:text-blue-300"
												>
													{subSection().title}
												</a>
											</li>
										)}
									</Index>
								</ol>
							</Show>
						</li>
					)}
				</Index>
			</ol>
		</aside>
	);
};

function flattenData(data: TableOfContentsItemData): Array<string> {
	return [data?.href, ...(data?.children ?? []).flatMap(flattenData)].filter(
		Boolean
	);
}
