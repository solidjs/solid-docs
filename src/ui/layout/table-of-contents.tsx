import { Component, For, Index, Show, createEffect } from "solid-js";
import { A, useLocation } from "solid-start";
import { usePageState } from "~/data/page-state";

export const TableOfContents: Component = () => {
	const location = useLocation();
	const { pageSections } = usePageState();

	return (
		<div class="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-4">
			<nav aria-labelledby="on-this-page-title" class="w-56">
				<h2 class="font-display text-base font-medium text-slate-900 dark:text-white">
					On this page
				</h2>
				<ol role="list" class="text-sm list-none p-0">
					<Index each={pageSections.sections}>
						{(section) => (
							<li class="pl-0">
								<h3 class="mt-2">
									<A
										href={`${pageSections.path}#${section().id}`}
										activeClass="text-sky-500"
										class="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 no-underline text-sm"
									>
										{section().title}
									</A>
								</h3>
								<Show when={section().children.length !== 0}>
									<ol
										role="list"
										class="space-y-2 pl-5 text-slate-500 dark:text-slate-400 list-none"
									>
										<Index each={section().children}>
											{(subSection) => (
												<li>
													<A
														href={`${location.pathname}#${subSection().id}`}
														activeClass="text-sky-500"
														class="no-underline hover:text-slate-600 dark:hover:text-slate-300 text-sm"
													>
														{subSection().title}
													</A>
												</li>
											)}
										</Index>
									</ol>
								</Show>
							</li>
						)}
					</Index>
				</ol>
			</nav>
		</div>
	);
};
