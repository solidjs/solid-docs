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
import { ProjectSelector } from "./project-selector";

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
			? "border-action bg-action-muted text-action"
			: "border-transparent text-text-muted hover:bg-surface-muted hover:text-text";
	return (
		<li class="relative">
			<a
				onClick={() => setIsOpen(false)}
				href={href()}
				aria-current={isActive() ? "page" : undefined}
				class={`focus-visible:bg-surface-muted focus-visible:ring-focus focus-visible:ring-offset-canvas flex min-h-11 w-full items-center rounded border-l-2 px-2 py-1 leading-normal font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-8 lg:rounded-none lg:px-1.5 lg:text-sm lg:leading-5 ${linkStyles()}`}
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

					if (child.collapsed !== true) {
						return (
							<li class="mt-3 first:mt-0">
								<span class="text-text-subtle flex min-h-8 w-full items-center px-1.5 pt-2 pb-1 text-xs leading-5 font-semibold tracking-wide uppercase">
									{child.title}
								</span>
								<ul role="list" class="ml-2 space-y-0.5">
									<DirList items={child.items} prefix={sectionPrefix} />
								</ul>
							</li>
						);
					}

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
							<li class="mt-2">
								<Collapsible open={open()} onOpenChange={setOpen}>
									<Collapsible.Trigger class="group text-text-muted hover:bg-surface-muted hover:text-text focus-visible:bg-surface-muted focus-visible:ring-focus focus-visible:ring-offset-canvas relative flex min-h-11 w-full items-center justify-between rounded px-2 py-1 leading-normal hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-8 lg:rounded-none lg:px-1.5 lg:text-sm lg:leading-5">
										<span class="text-left font-semibold">{child.title}</span>
										<Icon
											aria-hidden="true"
											path={chevronDown}
											class="my-auto h-4 transition-transform"
											classList={{ "rotate-180": open() }}
										/>
									</Collapsible.Trigger>
									<Collapsible.Content class="navigation_collapsible">
										<ul
											role="list"
											class="border-border-strong mt-0.5 ml-3 space-y-0.5 border-l pl-2"
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
			class="custom-scrollbar h-full scrollbar-gutter-stable overflow-y-auto pr-2 pb-20"
		>
			<div class="mb-4 space-y-2 px-1 lg:hidden">
				<ProjectSelector />
				<VersionSelector />
			</div>
			<Tabs value={selectedTab()} onChange={setSelectedTab}>
				<Tabs.List
					aria-label="Documentation section"
					class="border-border bg-canvas relative sticky top-0 z-10 grid w-full grid-cols-2 border-b"
				>
					<Tabs.Trigger
						value="learn"
						class="focus-visible:ring-focus relative z-10 flex min-h-11 items-center justify-center px-3 py-1 font-medium focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset lg:min-h-9 lg:text-sm lg:leading-5"
						classList={{
							"text-action": selectedTab() === "learn",
							"text-text-subtle hover:text-text": selectedTab() !== "learn",
						}}
					>
						Learn
					</Tabs.Trigger>
					<Tabs.Trigger
						value="reference"
						class="focus-visible:ring-focus relative z-10 flex min-h-11 items-center justify-center px-3 py-1 font-medium focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset lg:min-h-9 lg:text-sm lg:leading-5"
						classList={{
							"text-action": selectedTab() === "reference",
							"text-text-subtle hover:text-text": selectedTab() !== "reference",
						}}
					>
						Reference
					</Tabs.Trigger>
					<Tabs.Indicator class="bg-action pointer-events-none absolute bottom-0 z-0 h-0.5 transition-[transform,width] duration-250" />
				</Tabs.List>
				<Tabs.Content value="learn" class="mt-2 w-full">
					<Show when={true} fallback={<p class="text-text">No routes found</p>}>
						<ul role="list" class="space-y-0.5 px-1 pt-1">
							<DirList
								items={sidebarEntries().filter((e) => e.title !== "Reference")}
								prefix={sidebar().prefix}
							/>
						</ul>
					</Show>
				</Tabs.Content>
				<Tabs.Content value="reference" class="mt-2 w-full">
					<Show when={true} fallback={<p class="text-text">No routes found</p>}>
						<ul role="list" class="space-y-0.5 px-1 pt-1">
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
