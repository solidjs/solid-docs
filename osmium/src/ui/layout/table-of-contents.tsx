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

const desktopTableOfContentsLinkClass =
	"not-prose flex min-h-8 items-center border-l-2 px-2 py-1 text-sm leading-5 font-medium no-underline focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none";

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
			const { top } = heading.el.getBoundingClientRect();
			if (top < threshold) {
				current = heading.href;
			} else if (top < window.innerHeight) {
				current = heading.href;
				break;
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
		<aside aria-label="table of contents" class="w-full pt-2">
			<span class="text-xs font-semibold tracking-wide text-text-subtle uppercase">
				On this page
			</span>
			<ol role="list" class="mt-2 list-none p-0">
				<li class="not-prose m-0 p-0">
					<a
						href="#_top"
						aria-current={
							currentSection() === undefined ? "location" : undefined
						}
						class={desktopTableOfContentsLinkClass}
						classList={{
							"border-transparent text-text-subtle hover:border-border-strong hover:text-text":
								currentSection() !== undefined,
							"border-action bg-action-muted text-action":
								currentSection() === undefined,
						}}
					>
						Overview
					</a>
				</li>
				<Index each={toc()}>
					{(section) => (
						<li class="not-prose m-0 p-0">
							<a
								href={section().href}
								aria-current={
									currentSection() === section().href ? "location" : undefined
								}
								class={desktopTableOfContentsLinkClass}
								classList={{
									"border-transparent text-text-subtle hover:border-border-strong hover:text-text":
										currentSection() !== section().href,
									"border-action bg-action-muted text-action":
										currentSection() === section().href,
								}}
							>
								{section().title}
							</a>
							<Show when={section().children.length !== 0}>
								<ol role="list" class="m-0 list-none p-0 pl-3">
									<Index each={section().children}>
										{(subSection) => (
											<li class="not-prose m-0 p-0">
												<a
													href={subSection().href}
													aria-current={
														currentSection() === subSection().href
															? "location"
															: undefined
													}
													class={desktopTableOfContentsLinkClass}
													classList={{
														"border-transparent text-text-subtle hover:border-border-strong hover:text-text":
															currentSection() !== subSection().href,
														"border-action bg-action-muted text-action":
															currentSection() === subSection().href,
													}}
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
			<div class="relative w-full border-t border-border lg:hidden">
				<Dialog open={open()} onOpenChange={setOpen} modal={false}>
					<div class="max-w-8xl mx-auto flex min-h-11 w-full items-center justify-end px-2">
						<Dialog.Trigger
							type="button"
							class="flex min-h-11 items-center gap-1 rounded px-2 text-sm font-semibold text-text focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none [&[data-expanded]>svg]:rotate-180"
						>
							On this page
							<Icon
								path={chevronDown}
								aria-hidden="true"
								class="h-4 w-4 transition-transform"
							/>
						</Dialog.Trigger>
					</div>
					<Dialog.Content class="absolute inset-x-0 top-full z-60 max-h-[calc(100dvh-10rem)] overflow-y-auto border-y border-border bg-surface-raised p-4 text-text shadow-lg">
						<Dialog.Title class="text-base font-semibold text-text">
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
							class="flex min-h-11 items-center rounded text-action no-underline hover:text-action-hover focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none"
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
