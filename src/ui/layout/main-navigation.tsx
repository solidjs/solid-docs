import { For, Show, Suspense } from "solid-js"
import { useLocation } from "solid-start"
import { getEntries } from "~/data/get-entries"


type Entry = {
	title: string
	path: string
	children?: Entry[]
}

function ListItemLink(props: { item: Entry }) {
	const location = useLocation()

	return (
		<li class="relative">
			<a
				href={props.item.path}
				class={`block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full
				${
		location.pathname === props.item.path
			? "font-semibold text-sky-500 before:bg-sky-500 before:block"
			: "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
		}}`}
			>
				{props.item.title}
			</a>
		</li>
	)
}

function DirList(props: { list: Entry[] }) {
	const location = useLocation()

	return (
		<For each={props.list}>
			{(item) => {
				if (Array.isArray(item.children)) {
					return (
						<li>
							<h2 class="font-display font-medium text-slate-900 dark:text-white">
								{item.title}
							</h2>
							<ul
								role="list"
								class="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
							>
								<For each={item.children}>
									{(child) =>
										Array.isArray(child.children) ? (
											<li>
												<div class="relative">
													<h3
														class="block w-full pl-3.5 font-display font-medium before:pointer-events-none text-slate-400 dark:text-slate-300"
													>
														{child.title}
													</h3>
												</div>
												<ul
													role="list"
													class="ml-4 mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
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
					)
				} else {
					return <ListItemLink item={item} />
				}
			}}
		</For>
	)
}

export function MainNavigation() {
	const entries = getEntries()

	console.log("entries", entries())

	return (
		<nav class="text-base lg:text-sm">
			<Suspense fallback={"getting entries"}>
				<Show when={entries()} fallback={<p>No routes found...</p>}>
					{(_entries) => {
						return (
							<ul role="list" class="space-y-9">
								<DirList list={_entries().children} />
							</ul>
						)
					}}
				</Show>
			</Suspense>
		</nav>
	)
}
