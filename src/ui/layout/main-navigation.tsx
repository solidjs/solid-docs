import { A, useMatch } from "@solidjs/router";
import { For, Show } from "solid-js";
import { useLocation } from "solid-start";
import { Tabs } from "@kobalte/core";
import nav from "solid:collection/tree";
import { Icon } from "solid-heroicons";
import { chevronDown } from "solid-heroicons/solid";

type Entry = {
	title: string;
	path: string;
	children?: Entry[];
};

function ListItemLink(props: { item: Entry }) {
	const location = useLocation();
	const linkStyles = () =>
		location.pathname === props.item.path.replace(/\\/g, "/")
			? "font-semibold text-sky-500 before:bg-sky-500 before:block"
			: "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-200 dark:hover:text-slate-200";
	return (
		<li class="relative">
			<A
				href={props.item.path}
				class={`block w-full text-sm pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full ${linkStyles()}`}
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
							<span class="font-display font-semibold text-slate-500 dark:text-slate-100 text-sm">
								{item.title}
							</span>
							<ul
								role="list"
								class="mt-2 space-y-2 border-l-2 border-slate-300 dark:border-slate-700 lg:mt-4 lg:space-y-4 lg:border-slate-300"
							>
								<For each={item.children}>
									{(child) =>
										Array.isArray(child.children) ? (
											<li>
												<button class="relative flex justify-between hover:cursor-pointer w-full pl-3.5 text-slate-400 dark:text-slate-300 text-sm">
													<span class="font-display font-semibold text-slate-500 dark:text-slate-100 text-sm">
														{child.title}
													</span>
													<Icon path={chevronDown} class="h-4 my-auto" />
												</button>
												<ul
													role="list"
													class="ml-4 mt-2 space-y-2 border-l-2 border-slate-300 dark:border-slate-700 lg:mt-4 lg:space-y-3 dark:lg:border-slate-700 text-sm"
												>
													<DirList list={child.children} />
												</ul>
											</li>
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
		<nav>
			<Tabs.Root defaultValue={isReference() ? "reference" : "learn"}>
				<Tabs.List class="w-full relative pb-6">
					<Tabs.Trigger
						value="learn"
						class="inline-block px-4 py-2 outline-none hover:bg-sky-500/30 dark:hover:bg-sky-800 dark:focus-visible:bg-sky-800"
					>
						<span class="prose prose-slate dark:prose-invert">Learn</span>
					</Tabs.Trigger>
					<Tabs.Trigger
						value="reference"
						class="inline-block px-4 py-2 outline-none hover:bg-sky-500/30 dark:hover:bg-sky-800 dark:focus-visible:bg-sky-800"
					>
						<span class="prose prose-slate dark:prose-invert">Reference</span>
					</Tabs.Trigger>
					<Tabs.Indicator class="absolute bg-sky-500 dark:bg-sky-500 transition-all duration-250 h-px" />
				</Tabs.List>
				<Tabs.Content value="learn">
					<Show when={learn()} fallback={<p>No routes found...</p>}>
						{(learnList) => (
							<ul role="list" class="space-y-6">
								<DirList list={learnList()} />
							</ul>
						)}
					</Show>
				</Tabs.Content>
				<Tabs.Content value="reference">
					<Show when={references()} fallback={<p>No routes found...</p>}>
						{(referenceList) => (
							<ul role="list" class="space-y-4">
								<DirList list={referenceList()} />
							</ul>
						)}
					</Show>
				</Tabs.Content>
			</Tabs.Root>
		</nav>
	);
}
