import { For, ParentComponent, Show, createSignal, onMount } from "solid-js"

/**
 *  This is a code blocks component that can be used to divide code blocks into seperate tabs. Here's an example of how to use it in JSX and mdx:
 * @example
 * //jsx
 * <TabsCodeBlocks>
 * 	<div id="npm">
 * 		<pre>
 * 			<code>npm install</code>
 * 		</pre>
 * 	</div>
 * 	...
 * </TabsCodeBlocks>
 *
 * @example
 * //jsx
 * <TabsCodeBlocks>
 * 	<div id="npm">
 * 		\```bash
 * 			npm install
 * 		\```
 * 	</div>
 * 	<div id="yarn">
 * 		\```bash
 * 			yarn install
 * 		\```
 * 	</div>
 * 	...
 * </TabsCodeBlocks>
 */
export const TabsCodeBlocks: ParentComponent = (props) => {
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
