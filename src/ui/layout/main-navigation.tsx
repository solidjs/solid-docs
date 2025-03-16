import { For, Show, Suspense, createSignal } from "solid-js";
import { useBeforeLeave, useLocation, useMatch } from "@solidjs/router";
import { Collapsible, Tabs } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";
import { setIsOpen } from "./mobile-navigation";
import { A } from "~/ui/i18n-anchor";
import { Dynamic } from "solid-js/web";
import { useI18n } from "~/i18n/i18n-context";

interface Entry {
	title: string;
	path: string;
	children?: Entry[];
	mainNavExclude: boolean;
	isTranslated?: boolean;
	isDeprecated?: boolean;
}

type EntryList = { learn: Entry[]; reference: Entry[] };

interface NavProps {
	tree: {
		learn: Entry[];
		reference: Entry[];
	};
}

// gets an array of entries and orders it alphabeticaly
const getAlphabeticalyOrderedList = (list: Entry[]) =>
	list.slice().sort((firstChild, secondChild) => {
		return firstChild.title
			.toLowerCase()
			.localeCompare(secondChild.title.toLowerCase());
	});

// check if every item on the list has mainNavExclude as true
const shouldHideNavItem = (list: EntryList["learn" | "reference"]) =>
	list.filter(({ mainNavExclude }) => mainNavExclude).length === list.length;

function ListItemLink(props: { item: Entry }) {
	const location = useLocation();
	const linkStyles = () =>
		location.pathname === props.item.path.replace(/\\/g, "/")
			? "font-semibold text-blue-700 before:bg-blue-700 dark:before:bg-blue-200 dark:text-blue-300 before:block"
			: "text-slate-700 before:hidden before:bg-blue-600 before:dark:bg-blue-200 hover:text-blue-700 hover:before:block dark:text-slate-300 ";
	return (
		<Show when={!props.item.mainNavExclude}>
			<li class="relative">
				<Dynamic
					component={props.item.isTranslated ? A : "a"}
					onClick={() => setIsOpen(false)}
					href={props.item.path}
					class={`hover:text-blue-700 dark:hover:text-blue-300 block w-full lg:text-sm pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full ${linkStyles()}`}
				>
					{props.item.title}
					<Show when={props.item.isDeprecated}> (deprecated)</Show>
					<Show when={!props.item.isTranslated}>
						<span>
							<abbr
								title="english"
								class="text-[0.7em] relative -top-2 left-2 no-underline  text-neutral-400 "
							>
								EN
							</abbr>
						</span>
					</Show>
				</Dynamic>
			</li>
		</Show>
	);
}

function DirList(props: { list: Entry[]; sortAlphabeticaly?: boolean }) {
	return (
		<For each={props.list}>
			{(item) => {
				if (Array.isArray(item.children)) {
					const itemChildren = props.sortAlphabeticaly
						? getAlphabeticalyOrderedList(item.children)
						: item.children;
					return (
						<li>
							<span class="font-semibold text-slate-800 dark:text-slate-100">
								{item.title}
							</span>
							<ul
								role="list"
								class="ml-2 mt-2 space-y-3 border-l-[1px] border-slate-400 dark:border-slate-700 lg:border-slate-400"
							>
								<For each={itemChildren}>
									{(child) => {
										if (
											Array.isArray(child.children) &&
											shouldHideNavItem(child.children)
										)
											return null;

										return Array.isArray(child.children) ? (
											<>
												<li>
													<Collapsible.Root defaultOpen={true}>
														<Collapsible.Trigger class="relative flex justify-between hover:cursor-pointer w-full pl-3.5 dark:text-slate-300 group">
															<span class="font-semibold dark:text-slate-100">
																{child.title}
															</span>
															<Icon
																aria-hidden="true"
																path={chevronDown}
																class="h-4 my-auto transition-transform  kb-group-closed:rotate-180"
															/>
														</Collapsible.Trigger>
														<Collapsible.Content class="navigation_collapsible">
															<ul
																role="list"
																class="ml-4 mt-3 space-y-3 border-l-[1px] border-slate-400 dark:border-slate-700 dark:lg:border-slate-700"
															>
																<DirList
																	sortAlphabeticaly={props.sortAlphabeticaly}
																	list={child.children}
																/>
															</ul>
														</Collapsible.Content>
													</Collapsible.Root>
												</li>
											</>
										) : (
											<ListItemLink item={child} />
										);
									}}
								</For>
							</ul>
						</li>
					);
				} else {
					return <ListItemLink item={item} />;
				}
			}}
		</For>
	);
}

export function MainNavigation(props: NavProps) {
	const i18n = useI18n();

	const learn = () => props.tree.learn;
	const reference = () => props.tree.reference;

	const isReference = useMatch(() => "/:project?/reference/*?", {
		project: ["solid-router", "solid-meta", "solid-start"],
	});

	const initialTab = () => (isReference() ? "reference" : "learn");

	const [selectedTab, setSelectedTab] = createSignal(initialTab());

	/**
	 * Re-syncs the selected tab with the chosen route.
	 */
	useBeforeLeave(({ to }) => {
		if (typeof to === "number") return;

		if (to.includes("reference")) {
			setSelectedTab("reference");
		} else if (to.includes("learn")) {
			setSelectedTab("learn");
		}
	});

	return (
		<Suspense>
			<Show when={i18n.t}>
				<nav class="overflow-y-auto custom-scrollbar h-full md:h-[calc(100vh-7rem)] pb-20">
					<Tabs.Root value={selectedTab()}>
						<Tabs.List class="sticky top-0 grid grid-cols-2 w-full z-10 md:dark:bg-slate-900 md:bg-slate-50">
							<Tabs.Trigger
								value="learn"
								class="inline-block py-3 outline-none hover:bg-blue-500/30 focus-visible:bg-blue-500/40 dark:hover:bg-blue-300/20 dark:focus-visible:bg-blue-800 dark:text-slate-100 font-medium"
								onClick={() => {
									setSelectedTab("learn");
								}}
							>
								{i18n.t("main.nav.tab.learn")}
							</Tabs.Trigger>
							<Tabs.Trigger
								value="reference"
								class="inline-block py-3 outline-none hover:bg-blue-500/30 focus-visible:bg-blue-500/40 dark:hover:bg-blue-300/20 dark:focus-visible:bg-blue-800 dark:text-slate-100 font-medium"
								onClick={() => {
									setSelectedTab("reference");
								}}
							>
								{i18n.t("main.nav.tab.reference")}
							</Tabs.Trigger>
							<Tabs.Indicator class="absolute bottom-0 bg-blue-500 dark:bg-blue-500 transition-all duration-250 h-[2px]" />
						</Tabs.List>
						<Tabs.Content value="learn" class="w-full relative mt-5">
							<Show
								when={learn()}
								fallback={
									<p class="text-white">{i18n.t("main.nav.no.routes")}</p>
								}
							>
								<ul role="list" class="space-y-3 px-4">
									<DirList list={learn()} />
								</ul>
							</Show>
						</Tabs.Content>
						<Tabs.Content value="reference" class="w-full relative top-8">
							<Show
								when={reference()}
								fallback={<p>{i18n.t("main.nav.no.routes")}</p>}
							>
								<ul role="list" class="space-y-3 px-4">
									<DirList sortAlphabeticaly list={reference()} />
								</ul>
							</Show>
						</Tabs.Content>
					</Tabs.Root>
				</nav>
			</Show>
		</Suspense>
	);
}
