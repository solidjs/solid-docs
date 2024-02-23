import { link } from "fs";
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

	const linkClasses = {
		inactive: 'text-slate-600 dark:text-slate-300',
		active: 'text-blue-700 dark:text-blue-300 font-semibold',
		default: 'prose-a:no-underline',
		hover: 'hover:text-blue-700 hover:font-semibold dark:hover:text-slate-200',
		get(...variantNames: ('inactive' | 'active' | 'default' | 'hover')[]) {
			return variantNames.map(name => this[name]).join(' ')
		}
	}

	return (
		<aside aria-label="table of contents" class={"w-full pt-5 pb-10 " + linkClasses.default}>
			<span class="font-display text-base font-medium text-slate-900 dark:text-white tracking-wide">
				On this page
			</span>
			<ol role="list" class="text-sm list-none mt-2 p-0 flex flex-col pl-2.5 tracking-[0.38px]">
				<li class="pl-0 mt-0 mb-0">
					<span>
						<a
							href={`#_top`}
							classList={{
								[linkClasses.get('active')]: currentSection() === "",
								[linkClasses.get('inactive', 'hover')]: currentSection() !== "",
							}}
						>
							Overview
						</a>
					</span>
				</li>
				<Index each={pageSections.sections}>
					{(section) => (
						<li class="pl-0 my-1">
							<span class="mt-0">
								<a
									href={`#${section().id}`}
									classList={{
										[linkClasses.get('active')]: currentSection() === section().id,
										[linkClasses.get('inactive', 'hover')]: currentSection() !== section().id,
									}}
								>
									{section().text}
								</a>
							</span>
							<Show when={section().children.length !== 0}>
								<ol
									role="list"
									class="space-y-1 pl-2.5 my-0 list-none"
								>
									<Index each={section().children}>
										{(subSection) => (
											<li>
												<a
													href={`#${subSection().id}`}
													classList={{
														[linkClasses.get('active')]: currentSection() === subSection().id,
														[linkClasses.get('inactive', 'hover')]: currentSection() !== subSection().id,
													}}
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
