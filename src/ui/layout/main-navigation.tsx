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
			? "font-semibold text-sky-500 before:bg-sky-500 before:block"
			: "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-200 dark:hover:text-slate-200";
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
							<span class="font-display font-semibold text-slate-500 dark:text-slate-100 lg:text-sm">
								{item.title}
							</span>
							<ul
								role="list"
								class="mt-2 space-y-2 border-l-2 border-slate-300 dark:border-slate-700 lg:mt-4 lg:space-y-4 lg:border-slate-300"
							>
								<For each={item.children}>
									{(child) =>
										Array.isArray(child.children) ? (
											<>
												<li>
													<Collapsible.Root defaultOpen={true}>
														<Collapsible.Trigger class="relative flex justify-between hover:cursor-pointer w-full pl-3.5 text-slate-400 dark:text-slate-300 lg:text-sm group">
															<span class="font-display font-semibold text-slate-500 dark:text-slate-100 lg:text-sm">
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
																class="ml-4 mt-2 space-y-2 border-l-2 border-slate-300 dark:border-slate-700 lg:mt-4 lg:space-y-3 dark:lg:border-slate-700 text-base lg:text-sm"
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
		<nav class="overflow-y-auto custom-scrollbar h-[calc(100vh-7rem)]">
			<Tabs.Root defaultValue={isReference() ? "reference" : "learn"}>
				<Tabs.List class="sticky top-0 w-full pb-4 z-10 dark:bg-slate-900 bg-blue-100">
					<Tabs.Trigger
						value="learn"
						class="inline-block ml-2 px-6 py-2 outline-none hover:bg-sky-500/30 dark:hover:bg-sky-800 dark:focus-visible:bg-sky-800"
					>
						<span class="prose prose-slate dark:prose-invert">Learn</span>
					</Tabs.Trigger>
					<Tabs.Trigger
						value="reference"
						class="inline-block px-6 py-2 outline-none hover:bg-sky-500/30 dark:hover:bg-sky-800 dark:focus-visible:bg-sky-800"
					>
						<span class="prose prose-slate dark:prose-invert">Reference</span>
					</Tabs.Trigger>
					<Tabs.Indicator class="absolute bg-sky-500 dark:bg-sky-500 transition-all duration-250 h-px" />
				</Tabs.List>
				<Tabs.Content value="learn" class="w-full relative mt-8 text-base">
					<Show when={learn()} fallback={<p>No routes found...</p>}>
						{(learnList) => (
							<ul role="list" class="space-y-6 px-4">
								<DirList list={learnList()} />
							</ul>
						)}
					</Show>
				</Tabs.Content>
				<Tabs.Content value="reference" class="w-full relative top-8">
					<Show when={references()} fallback={<p>No routes found...</p>}>
						{(referenceList) => (
							<ul role="list" class="space-y-6 px-4">
								<DirList list={referenceList()} />
							</ul>
						)}
					</Show>
				</Tabs.Content>
			</Tabs.Root>
		</nav>
	);
}
