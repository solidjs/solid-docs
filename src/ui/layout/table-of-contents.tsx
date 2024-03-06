import {
	Component,
	Index,
	Show,
	createEffect,
	onCleanup,
	createSignal,
} from "solid-js";
import { useLocation } from "@solidjs/router";
import { usePageState } from "~/data/page-state";
import { useI18n } from "~/i18n/i18n-context";

export const TableOfContents: Component = () => {
	const location = useLocation();
	const { setPageSections, pageSections } = usePageState();
	const [currentSection, setCurrentSection] = createSignal("");
	const i18n = useI18n();

	const onScroll = () => {
		const headings = document.querySelectorAll("h2, h3");
		let currentSection = "";
		headings.forEach((heading) => {
			if (heading.getBoundingClientRect().top < 300) {
				currentSection = heading.id;
			}
		});
		setCurrentSection(currentSection);
	};

	createEffect(() => {
		window.addEventListener("scroll", onScroll);
		onCleanup(() => {
			window.removeEventListener("scroll", onScroll);
		});
	});

	createEffect(() => {
		if (location.pathname !== pageSections.path) {
			const mainHeading = document.querySelector("h1");
			const headings = document?.querySelectorAll("h2, h3");
			const sections: any = [];

			// if mainHeading is not found the page is not ready
			if (!mainHeading) return;

			if (headings) {
				headings.forEach((heading) => {
					if (heading.tagName === "H2") {
						sections.push({
							text: heading.textContent,
							id: heading.id,
							level: 2,
							children: [],
						});
					} else if (heading.tagName === "H3") {
						sections[sections.length - 1].children.push({
							text: heading.textContent,
							id: heading.id,
							level: 3,
						});
					}
				});
			}

			setPageSections({
				path: location.pathname,
				sections: sections,
			});
		}
	});

	return (
		<aside aria-label="table of contents" class="w-full">
			<span class="font-display text-base font-medium text-slate-900 dark:text-white">
				{i18n.t("toc.this.page")}
			</span>
			<ol role="list" class="text-sm list-none mt-2 p-0 flex flex-col">
				<li class="pl-0 mt-0">
					<span>
						<a
							href={`#_top`}
							classList={{
								"dark:text-blue-200 hover:text-blue-700 dark:hover:text-blue-200":
									currentSection() !== "",
								"text-blue-800 dark:text-blue-300 font-bold hover:text-slate-700 dark:hover:text-slate-200":
									currentSection() === "",
							}}
							class="no-underline hover:font-bold hover:text-slate-800"
						>
							{i18n.t("toc.overview")}
						</a>
					</span>
				</li>
				<Index each={pageSections.sections}>
					{(section) => (
						<li class="pl-0">
							<span class="mt-2">
								<a
									href={`#${section().id}`}
									classList={{
										"dark:text-slate-300": currentSection() !== section().id,
										"text-blue-800 dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200 font-bold":
											currentSection() === section().id,
									}}
									class="no-underline hover:font-bold hover:text-slate-700 dark:hover:text-blue-300"
								>
									{section().text}
								</a>
							</span>
							<Show when={section().children.length !== 0}>
								<ol
									role="list"
									class="space-y-2 pl-5 text-slate-500 dark:text-slate-300 list-none active:font-bold hover:text-slate-700 dark:hover:text-blue-200 font-bold active:text-blue-600"
								>
									<Index each={section().children}>
										{(subSection) => (
											<li>
												<a
													href={`#${subSection().id}`}
													classList={{
														"dark:text-slate-300":
															currentSection() !== subSection().id,
														"text-blue-800 dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200 font-bold":
															currentSection() === subSection().id,
													}}
													class="no-underline hover:font-bold hover:text-blue-700 dark:hover:text-blue-300"
												>
													{subSection().text}
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
