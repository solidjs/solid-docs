import { A, useMatch } from "@solidjs/router";
import { For, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import { Collapsible, Tabs } from "@kobalte/core";
import nav from "solid:collection/tree";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";
import { setIsOpen } from "./mobile-navigation";

type Entry = {
	title: string;
	path: string;
	children?: Entry[];
	mainNavExclude: boolean;
};

function ListItemLink(props: { item: Entry }) {
	if (props.item.mainNavExclude) return null;
	const location = useLocation();
	const linkStyles = () =>
		location.pathname === props.item.path.replace(/\\/g, "/")
			? "text-blue-700 before:bg-blue-700 dark:before:bg-blue-200 dark:text-blue-300 before:block"
			: "text-blue-450/90 before:hidden before:bg-blue-700 before:dark:bg-blue-200 hover:text-blue-700 hover:before:block dark:hover:text-blue-300 dark:text-slate-300 ";
	return (
		<li class="relative">
			<A
				onClick={() => setIsOpen(false)}
				href={props.item.path}
				class={`block w-full lg:text-sm pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full ${linkStyles()}`}
			>
				{props.item.title}
			</A>
		</li>
	);
}

function DirList(props: { list: Entry[] }) {
	return (
		<For each={props.list}>
			{(item) => {
				if (Array.isArray(item.children)) {
					return (
						<li>
							<span class="font-display font-semibold dark:text-slate-100 lg:text-sm text-blue-925 tracking-[0.2px]">
								{item.title}
							</span>
							<ul
								role="list"
								class="ml-2 mt-2 space-y-2 border-l-2 border-blue-150 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-blue-150"
							>
								<For each={item.children}>
									{(child) =>
										Array.isArray(child.children) ? (
											<>
												<li>
													<Collapsible.Root defaultOpen={true}>
														<Collapsible.Trigger class="relative flex justify-between hover:cursor-pointer w-full pl-3.5 dark:text-slate-300 dark:text-slate-300 lg:text-sm group">
															<span class="font-display font-semibold dark:text-slate-100 lg:text-sm text-blue-925/90 tracking-[0.2px]">
																{child.title}
															</span>
															<Icon
																path={chevronDown}
																class="h-4 my-auto transition-transform  kb-group-closed:rotate-180"
															/>
														</Collapsible.Trigger>
														<Collapsible.Content class="navigation_collapsible">
															<ul
																role="list"
																class="ml-4 mt-2 space-y-2 border-l-2 border-blue-150 dark:border-slate-800 lg:mt-4 lg:space-y-4 dark:lg:border-slate-800 text-base lg:text-sm"
															>
																<DirList list={child.children} />
															</ul>
														</Collapsible.Content>
													</Collapsible.Root>
												</li>
											</>
										) : (
											<ListItemLink item={child} />
										)
									}
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

export function MainNavigation() {
	const entries = nav;

	const learn = () => entries.learn;
	const references = () => entries.references;

	const isReference = useMatch(() => "/reference/*");

	return (
		<nav class="overflow-y-auto custom-scrollbar h-full md:h-[calc(100vh-7rem)] pb-20">
			<Tabs.Root defaultValue={isReference() ? "reference" : "learn"}>
				<Tabs.List class="sticky top-0 w-full z-10 dark:bg-slate-900 border-b-[1px] border-blue-150 dark:border-slate-800 mb-7 bg-blue-50">
					<Tabs.Trigger
						value="learn"
						class="inline-block px-1 py-4 outline-none w-[49.5%] hover:bg-blue-200/30 dark:hover:bg-blue-300  dark:focus-visible:bg-blue-800 dark:text-slate-100 hover:dark:text-slate-800 hover:font-bold transition-all"
					>
						Learn
					</Tabs.Trigger>
					<Tabs.Trigger
						value="reference"
						class="inline-block px-1 py-4 w-[49.5%] hover:bg-blue-200/30 dark:hover:bg-blue-300  dark:focus-visible:bg-blue-800 dark:text-slate-100 hover:dark:text-slate-800 hover:font-bold transition-all"
					>
						Reference
					</Tabs.Trigger>
					<Tabs.Indicator class="absolute bg-blue-700 dark:bg-blue-300 transition-all duration-250 h-[1.5px]" />
				</Tabs.List>
				<Tabs.Content value="learn" class="w-full relative mt-2 text-base">
					<Show when={learn()} fallback={<p>No routes found...</p>}>
						{(learnList) => (
							<ul role="list" class="space-y-5 px-4">
								<DirList list={learnList()} />
							</ul>
						)}
					</Show>
				</Tabs.Content>
				<Tabs.Content value="reference" class="w-full relative top-8">
					<Show when={references()} fallback={<p>No routes found...</p>}>
						{(referenceList) => (
							<ul role="list" class="space-y-5 px-4">
								<DirList list={referenceList()} />
							</ul>
						)}
					</Show>
				</Tabs.Content>
			</Tabs.Root>
		</nav>
	);
}
