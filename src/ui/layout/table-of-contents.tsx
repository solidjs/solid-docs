import {
	Component,
	Index,
	Show,
	createEffect,
	onCleanup,
	createSignal,
} from "solid-js";
import { usePageState } from "~/data/page-state";

export const TableOfContents: Component = () => {
	const { pageSections } = usePageState();
	const [currentSection, setCurrentSection] = createSignal("");

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

	return (
		<aside aria-label="table of contents" class="w-full pb-[42px]">
			<span class="font-display text-base text-blue-925 font-medium tracking-[0.3px] dark:text-white">
				On this page
			</span>
			<ol role="list" class="text-sm list-none mt-2 p-0 flex flex-col ml-[10px]">
				<li class="pl-0 mt-0 mb-0">
					<span>
						<a
							href={`#_top`}
							classList={{
								"dark:text-blue-200 hover:text-blue-700 dark:hover:text-blue-200":
									currentSection() !== "",
								"text-blue-700 dark:text-blue-300 font-semibold dark:hover:text-slate-200":
									currentSection() === "",
							}}
							class="no-underline hover:font-semibold hover:text-slate-700 tracking-[0.3px] text-blue-350 "
						>
							Overview
						</a>
					</span>
				</li>
				<Index each={pageSections.sections}>
					{(section) => (
						<li class="pl-0 mb-0 mt-[5px]">
							<span class="">
								<a
									href={`#${section().id}`}
									classList={{
										"dark:text-slate-300": currentSection() !== section().id,
										"text-blue-700 font-semibold dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200":
											currentSection() === section().id,
									}}
									class="no-underline hover:font-semibold hover:text-blue-700 dark:hover:text-blue-300 text-blue-350 tracking-[0.3px]"
								>
									{section().text}
								</a>
							</span>
							<Show when={section().children.length !== 0}>
								<ol
									role="list"
									class="pl-[10px] text-slate-500 dark:text-slate-300 list-none active:font-semibold hover:text-blue-700 dark:hover:text-blue-200 font-semibold active:text-blue-600 m-0"
								>
									<Index each={section().children}>
										{(subSection) => (
											<li class="py-0 mb-0">
												<a
													href={`#${subSection().id}`}
													classList={{
														"dark:text-slate-300":
															currentSection() !== subSection().id,
														"text-blue-700 dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200 font-semibold":
															currentSection() === subSection().id,
													}}
													class="no-underline hover:font-semibold hover:text-blue-700 dark:hover:text-blue-300 text-blue-350 tracking-[0.3px]"
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
