import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { A, useBeforeLeave, useLocation, useMatch } from "@solidjs/router";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";
import { setIsOpen } from "./mobile-navigation";
import { Dynamic } from "solid-js/web";
import {
	SidebarItem,
	SidebarItemLink,
	useLocale,
	useSidebar,
} from "@kobalte/solidbase/client";
import { Collapsible } from "@kobalte/core/collapsible";
import { Tabs } from "@kobalte/core/tabs";
import { useRouteConfig, useSolidBaseContext } from "../../utils";

interface Entry {
	title: string;
	path: string;
	children?: Entry[];
	mainNavExclude: boolean;
	isTranslated?: boolean;
	isDeprecated?: boolean;
}

interface MainNavigationProps {}

function ListItemLink(props: { item: SidebarItemLink; prefix?: string }) {
	const location = useLocation();
	const locale = useLocale();

	const linkStyles = () =>
		location.pathname === props.item.link.replace(/\\/g, "/")
			? "font-semibold text-blue-700 before:bg-blue-700 dark:before:bg-blue-200 dark:text-blue-300 before:block"
			: "text-slate-700 before:hidden before:bg-blue-600 before:dark:bg-blue-200 hover:text-blue-700 hover:before:block dark:text-slate-300 ";
	return (
		<li class="relative">
			<a
				onClick={() => setIsOpen(false)}
				href={locale.applyPathPrefix(
					`${props.prefix === "/" ? "" : (props.prefix ?? "")}${props.item.link === "/" ? "" : props.item.link}`
				)}
				class={`block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full hover:text-blue-700 lg:text-sm dark:hover:text-blue-300 ${linkStyles()}`}
			>
				{props.item.title}
			</a>
		</li>
	);
}

function DirList(props: { items: SidebarItem[] }) {
	return (
		<For each={props.items}>
			{(child) => {
				if ("items" in child) {
					return (
						<>
							<li>
								<Collapsible defaultOpen={true}>
									<Collapsible.Trigger class="group relative flex w-full justify-between pl-3.5 hover:cursor-pointer dark:text-slate-300">
										<span class="font-semibold dark:text-slate-100">
											{child.title}
										</span>
										<Icon
											aria-hidden="true"
											path={chevronDown}
											class="kb-group-closed:rotate-180 my-auto h-4 transition-transform"
										/>
									</Collapsible.Trigger>
									<Collapsible.Content class="navigation_collapsible">
										<ul
											role="list"
											class="mt-3 ml-4 space-y-3 border-l border-slate-400 dark:border-slate-700 dark:lg:border-slate-700"
										>
											<DirList items={child.items} />
										</ul>
									</Collapsible.Content>
								</Collapsible>
							</li>
						</>
					);
				}

				if ("link" in child) {
					return <ListItemLink item={child} />;
				}

				return "";
			}}
		</For>
	);
}

interface NavigationProps {
	sidebar: { prefix: string; items: SidebarItem[] };
}
interface NavigationItemProps {
	prefix: string;
	item: SidebarItem;
	depth?: number;
}

export function MainNavigation(props: MainNavigationProps) {
	const isReference = useMatch(() => "*/reference/*?");

	const initialTab = () => (isReference() ? "reference" : "learn");

	const [selectedTab, setSelectedTab] = createSignal(initialTab());

	const sidebar = useSidebar();

	const sidebarEntries = createMemo(() => {
		const projects = useSolidBaseContext().config().themeConfig?.projects ?? [];
		const projectNames = projects.map((p) => p.name.replaceAll(" ", ""));

		return sidebar().items.filter(
			(i) =>
				!projectNames.includes(i.title.replaceAll(" ", "")) &&
				(!("link" in i) || i.link !== "/")
		);
	});

	createEffect(() => console.log(sidebar(), sidebarEntries()));

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
		<nav class="custom-scrollbar h-full overflow-y-auto pb-20 md:h-[calc(100vh-7rem)]">
			<Tabs value={selectedTab()}>
				<Tabs.List class="sticky top-0 z-10 grid w-full grid-cols-2 md:bg-slate-50 md:dark:bg-slate-900">
					<Tabs.Trigger
						value="learn"
						class="inline-block py-3 font-medium outline-none hover:bg-blue-500/30 focus-visible:bg-blue-500/40 dark:text-slate-100 dark:hover:bg-blue-300/20 dark:focus-visible:bg-blue-800"
						onClick={() => {
							setSelectedTab("learn");
						}}
					>
						Learn
					</Tabs.Trigger>
					<Tabs.Trigger
						value="reference"
						class="inline-block py-3 font-medium outline-none hover:bg-blue-500/30 focus-visible:bg-blue-500/40 dark:text-slate-100 dark:hover:bg-blue-300/20 dark:focus-visible:bg-blue-800"
						onClick={() => {
							setSelectedTab("reference");
						}}
					>
						Reference
					</Tabs.Trigger>
					<Tabs.Indicator class="absolute bottom-0 h-[2px] bg-blue-500 transition-all duration-250 dark:bg-blue-500" />
				</Tabs.List>
				<Tabs.Content value="learn" class="relative mt-5 w-full">
					<Show
						when={true}
						fallback={<p class="text-white">No routes found</p>}
					>
						<ul role="list" class="space-y-3 px-4">
							<DirList
								items={sidebarEntries().filter((e) => e.title !== "Reference")}
							/>
						</ul>
					</Show>
				</Tabs.Content>
				<Tabs.Content value="reference" class="relative top-8 w-full">
					<Show
						when={true}
						fallback={<p class="text-white">No routes found</p>}
					>
						<ul role="list" class="space-y-3 px-4">
							<DirList
								items={sidebarEntries().flatMap((e) =>
									e.title === "Reference" && "items" in e ? e.items : []
								)}
							/>
						</ul>
					</Show>
				</Tabs.Content>
			</Tabs>
		</nav>
	);
}
