import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { useBeforeLeave, useLocation } from "@solidjs/router";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";
import { setIsOpen } from "./mobile-navigation";
import {
	SidebarItem,
	SidebarItemLink,
	useLocale,
	useSidebar,
} from "@kobalte/solidbase/client";
import { Collapsible } from "@kobalte/core/collapsible";
import { Tabs } from "@kobalte/core/tabs";
import VersionSelector from "./version-selector";

interface MainNavigationProps {}

function resolveSidebarHref(
	item: SidebarItemLink,
	prefix: string | undefined,
	applyPathPrefix: (path: string) => string
) {
	const path =
		`${prefix === "/" ? "" : (prefix ?? "")}${item.link === "/" ? "" : item.link}`
			.replace(/\\/g, "/")
			.replace(/\/{2,}/g, "/");

	return applyPathPrefix(path);
}

function sectionContainsPath(
	items: SidebarItem[],
	prefix: string | undefined,
	pathname: string,
	applyPathPrefix: (path: string) => string
): boolean {
	return items.some((item) => {
		if ("link" in item) {
			return pathname === resolveSidebarHref(item, prefix, applyPathPrefix);
		}

		return sectionContainsPath(
			item.items,
			`${prefix === "/" ? "" : (prefix ?? "")}${item.base ?? ""}`,
			pathname,
			applyPathPrefix
		);
	});
}

function ListItemLink(props: { item: SidebarItemLink; prefix?: string }) {
	const location = useLocation();
	const locale = useLocale();
	const href = () =>
		resolveSidebarHref(props.item, props.prefix, (path) =>
			locale.applyPathPrefix(path)
		);
	const isActive = () => location.pathname === href();

	const linkStyles = () =>
		isActive()
			? "bg-slate-100 text-blue-700 dark:bg-slate-800 dark:text-blue-300"
			: "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100";
	return (
		<li class="relative">
			<a
				onClick={() => setIsOpen(false)}
				href={href()}
				aria-current={isActive() ? "page" : undefined}
				class={`flex min-h-11 w-full items-center rounded-sm px-2 py-1 leading-normal font-medium hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-8 lg:px-1.5 lg:text-sm lg:leading-5 dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900 ${linkStyles()}`}
			>
				{props.item.title}
			</a>
		</li>
	);
}

function DirList(props: { items: SidebarItem[]; prefix?: string }) {
	const location = useLocation();
	const locale = useLocale();

	return (
		<For each={props.items}>
			{(child) => {
				if ("items" in child) {
					const sectionPrefix = `${props.prefix === "/" ? "" : (props.prefix ?? "")}${child.base ?? ""}`;
					const sectionIsActive = () =>
						sectionContainsPath(
							child.items,
							sectionPrefix,
							location.pathname,
							(path) => locale.applyPathPrefix(path)
						);
					let wasActive = sectionIsActive();
					const [open, setOpen] = createSignal(
						wasActive || child.collapsed !== true
					);

					createEffect(() => {
						const isActive = sectionIsActive();
						if (isActive && !wasActive) setOpen(true);
						wasActive = isActive;
					});

					return (
						<>
							<li>
								<Collapsible open={open()} onOpenChange={setOpen}>
									<Collapsible.Trigger class="group relative flex min-h-11 w-full items-center justify-between rounded-sm px-2 py-1 leading-normal text-slate-700 hover:cursor-pointer hover:bg-slate-100 hover:text-slate-950 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-8 lg:px-1.5 lg:text-sm lg:leading-5 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:bg-slate-800 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900">
										<span class="text-left font-semibold">{child.title}</span>
										<Icon
											aria-hidden="true"
											path={chevronDown}
											class="my-auto h-4 transition-transform"
											classList={{ "rotate-180": !open() }}
										/>
									</Collapsible.Trigger>
									<Collapsible.Content class="navigation_collapsible">
										<ul
											role="list"
											class="mt-0.5 ml-3 space-y-0.5 border-l border-slate-400 pl-2 dark:border-slate-700 dark:lg:border-slate-700"
										>
											<DirList items={child.items} prefix={sectionPrefix} />
										</ul>
									</Collapsible.Content>
								</Collapsible>
							</li>
						</>
					);
				}

				if ("link" in child) {
					return <ListItemLink item={child} prefix={props.prefix} />;
				}

				return "";
			}}
		</For>
	);
}

export function MainNavigation(_props: MainNavigationProps) {
	const location = useLocation();
	const isReference = () => location.pathname.includes("/reference/");
	const initialTab = () => (isReference() ? "reference" : "learn");

	const [selectedTab, setSelectedTab] = createSignal(initialTab());

	const sidebar = useSidebar();

	const sidebarEntries = createMemo(() => {
		return sidebar().items.sort((a, b) => {
			// @ts-expect-error: shorthand
			return !!a.items - !!b.items;
		});
	});

	/**
	 * Re-syncs the selected tab with the chosen route.
	 */
	useBeforeLeave(({ to }) => {
		if (typeof to === "number") return;

		if (to.includes("/reference/")) {
			setSelectedTab("reference");
		} else {
			setSelectedTab("learn");
		}
	});

	return (
		<nav
			aria-label="Documentation navigation"
			class="custom-scrollbar h-full scrollbar-gutter-stable overflow-y-auto pr-2 pb-20 md:h-[calc(100vh-7rem)]"
		>
			<VersionSelector />
			<Tabs value={selectedTab()} onChange={setSelectedTab}>
				<Tabs.List
					aria-label="Documentation section"
					class="relative sticky top-0 z-10 grid w-full grid-cols-2 rounded-md border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-800"
				>
					<Tabs.Trigger
						value="learn"
						class="relative z-10 flex min-h-11 items-center justify-center rounded-sm px-1 py-1 font-medium focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:outline-none focus-visible:ring-inset lg:min-h-8 lg:text-sm lg:leading-5 dark:focus-visible:ring-blue-300"
						classList={{
							"text-blue-700 dark:text-blue-300": selectedTab() === "learn",
							"text-slate-700 hover:bg-slate-200/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-700/70 dark:hover:text-slate-100":
								selectedTab() !== "learn",
						}}
					>
						Learn
					</Tabs.Trigger>
					<Tabs.Trigger
						value="reference"
						class="relative z-10 flex min-h-11 items-center justify-center rounded-sm px-1 py-1 font-medium focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:outline-none focus-visible:ring-inset lg:min-h-8 lg:text-sm lg:leading-5 dark:focus-visible:ring-blue-300"
						classList={{
							"text-blue-700 dark:text-blue-300": selectedTab() === "reference",
							"text-slate-700 hover:bg-slate-200/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-700/70 dark:hover:text-slate-100":
								selectedTab() !== "reference",
						}}
					>
						Reference
					</Tabs.Trigger>
					<Tabs.Indicator class="pointer-events-none absolute top-0.5 bottom-0.5 z-0 rounded-sm bg-white shadow-sm ring-1 ring-slate-200 transition-[transform,width] duration-250 dark:bg-slate-900 dark:ring-slate-700" />
				</Tabs.List>
				<Tabs.Content value="learn" class="mt-2 w-full">
					<Show
						when={true}
						fallback={<p class="text-white">No routes found</p>}
					>
						<ul role="list" class="space-y-0.5 px-2">
							<DirList
								items={sidebarEntries().filter((e) => e.title !== "Reference")}
								prefix={sidebar().prefix}
							/>
						</ul>
					</Show>
				</Tabs.Content>
				<Tabs.Content value="reference" class="mt-2 w-full">
					<Show
						when={true}
						fallback={<p class="text-white">No routes found</p>}
					>
						<ul role="list" class="space-y-0.5 px-2">
							<DirList
								items={sidebarEntries().flatMap((e) =>
									e.title === "Reference" && "items" in e ? e.items : []
								)}
								prefix={sidebar().prefix}
							/>
						</ul>
					</Show>
				</Tabs.Content>
			</Tabs>
		</nav>
	);
}
