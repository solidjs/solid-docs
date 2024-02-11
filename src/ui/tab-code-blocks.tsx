import { For, ParentComponent, Show, createSignal, onMount } from "solid-js";

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
 * 		\```bash frame="none"
 * 			npm install
 * 		\```
 * 	</div>
 * 	<div id="yarn">
 * 		\```bash frame="none"
 * 			yarn install
 * 		\```
 * 	</div>
 * 	...
 * </TabsCodeBlocks>
 */
export const TabsCodeBlocks: ParentComponent = (props) => {
	const [tabs, setTabs] = createSignal<Element[]>();
	const [selectedTab, setSelectedTab] = createSignal<Element>();

	const selectTabById = (id: string) => {
		const tab = tabs()?.find((tab) => tab.id === id);
		if (tab) setSelectedTab(tab);
		else throw new Error(`Tab with id "${id}" not found`);
	};

	onMount(() => {
		let children = props.children;

		// Check if children are an array
		if (!Array.isArray(children))
			throw new Error("TabsCodeBlocks children must be an array");

		// Check if children are elements
		const isArrayOfElements = (arr: any[]): arr is Element[] => {
			return arr.every((item) => item instanceof Element);
		};

		if (!isArrayOfElements(children))
			throw new Error("TabsCodeBlocks children must be an array of elements");

		// Check if all elements have ids
		const allElementsHaveIds = children.every((child) => "id" in child);

		if (!allElementsHaveIds)
			throw new Error("All TabsCodeBlocks children must have an id");

		setSelectedTab(children[0]);
		setTabs(children);
	});

	return (
		<div>
			<nav class="mb-2 border-b-2 border-slate-800">
				<For each={tabs()}>
					{(tab) => (
						<button
							classList={{
								"font-bold dark:text-slate-300 text-blue-500 border-b-2 border-blue-400":
									selectedTab()?.id === tab.id,
								"px-5 py-1 relative top-0.5 transition-colors duration-300":
									true,
							}}
							onclick={() => selectTabById(tab.id)}
						>
							{tab.id}
						</button>
					)}
				</For>
			</nav>

			{selectedTab()}
		</div>
	);
};
