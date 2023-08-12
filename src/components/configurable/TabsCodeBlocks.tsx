import { For, ParentComponent, Show, createSignal, onMount } from "solid-js"

const TabsCodeBlocks: ParentComponent = (props) => {
	const [tabs, setTabs] = createSignal<[]>()
	const [selectedTab, setSelectedTab] = createSignal<string>()

	onMount(() => {
		const childArray = props.children as []
		setSelectedTab(childArray[0].id)
		setTabs(childArray)
	})

	return (
		<div>
			<For each={tabs()}>
				{(tab) => (
					<Show when={tab.id === selectedTab()}>
						<nav>
							<For each={tabs()}>
								{(tab) => (
									<button
										classList={{
											"dark:bg-black bg-white rounded-t-lg dark:text-blue-300 text-blue-400 font-bold":
												selectedTab() === tab.id,
											"p-2": true,
										}}
										onclick={() => setSelectedTab(tab.id)}
									>
										{tab.id}
									</button>
								)}
							</For>
						</nav>
						<div class="-mt-10">{tab}</div>
					</Show>
				)}
			</For>
		</div>
	)
}

export default TabsCodeBlocks
