import { Index, JSX, createSignal, onMount } from "solid-js";

// Check if children are elements
const isArrayOfElements = (arr: any[]): arr is Element[] => {
	return arr.every((item) => item instanceof Element);
};

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

type Props = { children: JSX.Element };

export const TabsCodeBlocks = (props: Props) => {
	const [tabs, setTabs] = createSignal<Element[]>();
	const [activeTab, setActiveTab] = createSignal(0);

	onMount(() => {
		let children = props.children;

		// Check if children are an array
		if (!Array.isArray(children))
			throw new Error("TabsCodeBlocks children must be an array");

		if (!isArrayOfElements(children))
			throw new Error("TabsCodeBlocks children must be an array of elements");

		// Check if all elements have ids
		const allElementsHaveIds = children.every((child) => "id" in child);

		if (!allElementsHaveIds)
			throw new Error("All TabsCodeBlocks children must have an id");

		setTabs(children);
	});

	return (
		<div>
			<nav class="mb-2 border-b-2 border-slate-800">
				<Index each={tabs()}>
					{(tab, idx) => (
						<button
							classList={{
								"font-bold dark:text-slate-300 text-blue-500 border-b-2 border-blue-400":
									activeTab() === idx,
								"px-5 py-1 relative top-0.5 transition-colors duration-300":
									true,
							}}
							onclick={() => setActiveTab(idx)}
						>
							{tab().id}
						</button>
					)}
				</Index>
			</nav>

			<Index each={tabs()}>
				{(tab, idx) => (
					<div classList={{ hidden: activeTab() !== idx }}>{tab()}</div>
				)}
			</Index>
		</div>
	);
};
