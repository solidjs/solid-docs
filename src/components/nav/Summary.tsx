import { For, Show, createSignal } from "solid-js"
import { usePageState } from "../context/PageStateContext"
import IconChevron from "~icons/heroicons-outline/chevron-right"

export default function Summary(props: { collapsed?: boolean }) {
	const { sections } = usePageState()
	const [collapsed, setCollapsed] = createSignal(false)

	return (
		<div class="py-2 px-4 border-1 border-solid-lightitem rounded-md md:(p-4 max-h-[95vh] overflow-auto border-none bg-transparent) max-h-[50vh] bg-solid-light z-50 dark:(bg-solid-dark md:bg-transparent border-solid-darkitem)">
			<button
				class="w-full md:text-2xl font-semibold flex items-center justify-between md:pointer-events-none"
				onClick={() => setCollapsed((prev) => !prev)}
				aria-controls="preferences"
			>
				Summary
				<IconChevron
					class={`md:hidden w-4 h-4 text-solid-lightaction dark:text-solid-darkaction transform transition ${
						!collapsed() ? "rotate-90" : ""
					}`}
				/>
			</button>
			<div class="hidden md:flex md:flex-col overflow-auto">
				<For each={sections()}>
					{(item) => (
						<li class="list-none">
							<a
								class="w-full py-1 text-sm tracking-wide md:flex items-center gap-2 hover:bg-solid-lightaction hover:dark:bg-solid-darkaction border-solid-darkitem dark:border-solid-lightitem border-l-2"
								classList={{
									"pl-4": item.level === 2,
									"pl-10": item.level === 3,
									"pl-16": item.level === 4,
								}}
								onClick={() => setCollapsed(true)}
								href={"#" + item.href}
							>
								{item.title}
							</a>
						</li>
					)}
				</For>
			</div>

			<Show when={!collapsed()}>
				<ol class="mt-2 md:hidden list-none space-y-1">
					<For each={sections()}>
						{(item) => (
							<li class="text-sm flex items-center gap-2 hover:bg-solid-lightaction hover:dark:bg-solid-darkaction pl-4 pr-2">
								<a onClick={() => setCollapsed(true)} href={"#" + item.href}>
									{item.title}
								</a>
							</li>
						)}
					</For>
				</ol>
			</Show>
		</div>
	)
}
