import {
	Component,
	Index,
	Show,
	createEffect,
	onCleanup,
	createSignal,
	onMount,
	type ResolvedChildren,
} from "solid-js";
import { useLocation } from "@solidjs/router";
import { ParentSection, usePageState } from "~/data/page-state";
import { useI18n } from "~/i18n/i18n-context";

export const TableOfContents: Component<{ children: ResolvedChildren }> = (
	props
) => {
	const location = useLocation();
	const { setPageSections, pageSections } = usePageState();
	const [currentSection, setCurrentSection] = createSignal("");
	const i18n = useI18n();

	const onScroll = () => {
		const headings = document.querySelectorAll("main h2, main h3");
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

	function getHeaders(children: ResolvedChildren) {
		if (children) {
			if (!Array.isArray(children)) return;
			const firstElement = children.find(
				(child) => child instanceof HTMLElement
			) as HTMLElement | null;
			// if any of the child elements are not connected to the DOM the page contents haven't mounted yet
			if (firstElement && !firstElement.isConnected) return;
		}

		const headings = document.querySelectorAll("main h2, main h3");
		const sections: ParentSection[] = [];

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

	createEffect(() => getHeaders(props.children));

	onMount(() => {
		document.addEventListener("docs-layout-mounted", () =>
			getHeaders(props.children)
		);
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
								"dark:text-slate-300": currentSection() !== "",
								"text-blue-800 dark:text-blue-300 font-bold hover:text-slate-700 dark:hover:text-slate-200":
									currentSection() === "",
							}}
							class="no-underline hover:text-slate-800"
						>
							{i18n.t("toc.overview")}
						</a>
					</span>
				</li>
				<Index each={pageSections.sections}>
					{(section) => (
						<li class="pl-0 pt-0 space-y-2">
							<span>
								<a
									href={`#${section().id}`}
									classList={{
										"dark:text-slate-300": currentSection() !== section().id,
										"text-blue-800 dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200 font-bold":
											currentSection() === section().id,
									}}
									class="no-underline hover:text-slate-700 dark:hover:text-blue-300"
								>
									{section().text}
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
													href={`#${subSection().id}`}
													classList={{
														"dark:text-slate-300":
															currentSection() !== subSection().id,
														"text-blue-800 dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200 font-bold":
															currentSection() === subSection().id,
													}}
													class="no-underline hover:text-blue-700 dark:hover:text-blue-300"
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
