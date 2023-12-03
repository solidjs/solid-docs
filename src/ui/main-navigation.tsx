import { For, Show, Suspense } from "solid-js"
import { getEntries } from "~/data/get-entries"

type Entry = {
	title: string
	path: string
	children?: Entry[]
}
function DirList(props: { list: Entry[] }) {
	return (
		<ul class="px-2">
			<For each={props.list}>
				{(item) => {
					if (Array.isArray(item.children)) {
						return (
							<li>
								<strong>{item.title}</strong>
								<DirList list={item.children} />
							</li>
						)
					} else {
						return (
							<li>
								<a href={item.path}>{item.title}</a>
							</li>
						)
					}
				}}
			</For>
		</ul>
	)
}

export function MainNavigation() {
	const entries = getEntries()

	return (
		<nav class="px-5">
			<h1>Our content entries:</h1>
			<Suspense fallback={"getting entries"}>
				<Show when={entries()} fallback={<p>No routes found...</p>}>
					{(entriesList) => {
						return <DirList list={entriesList().children} />
					}}
				</Show>
			</Suspense>
		</nav>
	)
}
