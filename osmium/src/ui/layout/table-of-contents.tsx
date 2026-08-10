import {
	Index,
	Show,
	createEffect,
	createSignal,
	on,
	onCleanup,
} from "solid-js";
import {
	useCurrentPageData,
	TableOfContentsItemData,
} from "@kobalte/solidbase/client";
import { Dialog } from "@kobalte/core/dialog";
import { createEventListener } from "@solid-primitives/event-listener";
import { isServer } from "solid-js/web";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";

export const TableOfContents = () => {
	const data = useCurrentPageData();
	const toc = () => data()?.toc;

	const [currentSection, setCurrentSection] = createSignal<string>();

	const [headingElements, setHeadingElements] = createSignal<
		Array<{ href: string; el?: HTMLElement }>
	>([]);

	let scheduledFrame: number | undefined;

	const updateCurrentSection = () => {
		const threshold =
			(document.querySelector<HTMLElement>("header")?.getBoundingClientRect()
				.bottom ?? 0) + 24;
		let current;

		for (const heading of headingElements()) {
			if (!heading.el) continue;
			if (heading.el.getBoundingClientRect().top < threshold) {
				current = heading.href;
			}
		}

		setCurrentSection(current);
	};

	const scheduleUpdate = () => {
		if (isServer || scheduledFrame !== undefined) return;
		scheduledFrame = requestAnimationFrame(() => {
			scheduledFrame = undefined;
			updateCurrentSection();
		});
	};

	createEffect(
		on(toc, (toc) => {
			if (!toc) {
				setHeadingElements([]);
				scheduleUpdate();
				return;
			}
			setHeadingElements(
				toc
					.map(flattenData)
					.flat()
					.map((href) => {
						const el = document.getElementById(href.slice(1)) ?? undefined;

						return { href, el };
					})
			);
			scheduleUpdate();
		})
	);

	if (!isServer) {
		createEventListener(window, "scroll", scheduleUpdate);
		createEventListener(window, "resize", scheduleUpdate);
		onCleanup(() => {
			if (scheduledFrame !== undefined) cancelAnimationFrame(scheduledFrame);
		});
	}

	return (
		<aside aria-label="table of contents" class="w-full pt-5">
			<span class="text-base font-semibold text-slate-900 dark:text-white">
				On this page
			</span>
			<ol role="list" class="mt-2 flex list-none flex-col p-0 pl-2.5 text-sm">
				<li class="not-prose mt-0 mb-0 pl-0">
					<span>
						<a
							href="#_top"
							classList={{
								"dark:text-slate-300": currentSection() !== undefined,
								"text-blue-800 dark:text-blue-300 font-bold hover:text-slate-700 dark:hover:text-slate-200":
									currentSection() === undefined,
							}}
							class="not-prose no-underline hover:text-slate-700 dark:hover:text-blue-300"
						>
							Overview
						</a>
					</span>
				</li>
				<Index each={toc()}>
					{(section) => (
						<li class="not-prose mt-2 pt-0 pl-0">
							<span>
								<a
									href={section().href}
									classList={{
										"dark:text-slate-300": currentSection() !== section().href,
										"text-blue-800 dark:text-blue-200 hover:text-slate-700 dark:hover:text-slate-200 font-bold":
											currentSection() === section().href,
									}}
									class="not-prose no-underline hover:text-slate-700 dark:hover:text-blue-300"
								>
									{section().title}
								</a>
							</span>
							<Show when={section().children.length !== 0}>
								<ol
									role="list"
									class="mt-2 list-none pl-2.5 font-bold text-slate-500 hover:text-slate-700 active:font-bold active:text-blue-600 dark:text-slate-300 dark:hover:text-blue-200"
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
													class="not-prose no-underline hover:text-blue-700 dark:hover:text-blue-300"
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

export const MobileTableOfContents = () => {
	const data = useCurrentPageData();
	const toc = () => data()?.toc;
	const [open, setOpen] = createSignal(false);

	const close = () => {
		setOpen(false);
	};

	return (
		<Show when={toc()?.length}>
			<div class="relative w-full border-t border-slate-300 lg:hidden dark:border-slate-700">
				<Dialog open={open()} onOpenChange={setOpen} modal={false}>
					<div class="max-w-8xl mx-auto flex min-h-11 w-full items-center justify-end px-2">
						<Dialog.Trigger
							type="button"
							class="flex min-h-11 items-center gap-1 rounded px-2 text-sm font-semibold text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-white dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900 [&[data-expanded]>svg]:rotate-180"
						>
							On this page
							<Icon
								path={chevronDown}
								aria-hidden="true"
								class="h-4 w-4 transition-transform"
							/>
						</Dialog.Trigger>
					</div>
					<Dialog.Content class="absolute inset-x-0 top-full z-60 max-h-[calc(100dvh-10rem)] overflow-y-auto border-y border-slate-300 bg-slate-50 p-4 shadow-lg dark:border-slate-700 dark:bg-slate-900">
						<Dialog.Title class="text-base font-semibold text-slate-900 dark:text-white">
							On this page
						</Dialog.Title>
						<nav aria-label="On this page">
							<MobileTableOfContentsLinks
								items={toc() ?? []}
								onSelect={close}
							/>
						</nav>
					</Dialog.Content>
				</Dialog>
			</div>
		</Show>
	);
};

function MobileTableOfContentsLinks(props: {
	items: TableOfContentsItemData[];
	onSelect: () => void;
}) {
	return (
		<ol role="list" class="mt-2 list-none space-y-2 p-0 pl-3 text-sm">
			<Index each={props.items}>
				{(item) => (
					<li class="m-0 p-0">
						<a
							href={item().href}
							onClick={props.onSelect}
							class="flex min-h-11 items-center text-blue-800 no-underline hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
						>
							{item().title}
						</a>
						<Show when={item().children.length !== 0}>
							<MobileTableOfContentsLinks
								items={item().children}
								onSelect={props.onSelect}
							/>
						</Show>
					</li>
				)}
			</Index>
		</ol>
	);
}

function flattenData(data: TableOfContentsItemData): Array<string> {
	return [data?.href, ...(data?.children ?? []).flatMap(flattenData)].filter(
		Boolean
	);
}
