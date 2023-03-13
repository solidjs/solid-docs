import { For, Show, createSignal } from "solid-js"
import { usePageState } from "../context/PageStateContext";
import Dot from "../Dot";
import IconChevron from "~icons/heroicons-outline/chevron-right";
import { useRouteData } from "solid-start";

function SectionTitle(props: { title: string | Element }) {
    return props.title instanceof HTMLElement ? props.title.innerText : props.title
}

export default function Summary(props: {collapsed?: boolean}) {
    const { sections } = usePageState();
    const [collapsed, setCollapsed] = createSignal(props.collapsed || false);

    return (
        <div class="py-2 px-4 border border-solidlightitem rounded-md md:(p-4 max-h-[95vh] overflow-auto border-none bg-transparent) max-h-[50vh] bg-solid-light z-50 dark:(bg-solid-dark md:bg-transparent border-solid-darkitem)">
            <button
                onClick={() => setCollapsed((prev) => !prev)}
                aria-controls="preferences"
                type="button"
                class="w-full md:text-2xl font-bold flex items-center justify-between md:pointer-events-none"
            >
                Summary
                <IconChevron
                    class={`md:hidden w-6 h-6 text-solid-lightaction dark:text-solid-darkaction transform transition ${
                    !collapsed() ? "rotate-90" : ""
                    }`}
                />
            </button>
            <For each={sections()}>
                {(item, index) => (
                <li class="text-base py-2 hidden md:flex items-center gap-2 rounded hover:bg-solid-light hover:dark:bg-solid-darkbg px-2">
                    <Dot number={index() + 1} />
                    <a class="font-semibold" onClick={() => setCollapsed(true)} href={"#" + item.href}>
                    {Array.isArray(item.title) ? <For each={item.title}>{(title) => <SectionTitle title={title} />}</For> : <SectionTitle title={item.title} />}
                    </a>
                </li>
                )}
            </For>
            <Show when={!collapsed()}>
                <ol class="mt-2 md:hidden list-none space-y-1">
                <For each={sections()}>
                    {(item, index) => (
                    <li class="text-base py-2 flex items-center gap-2 rounded hover:bg-solid-light hover:dark:bg-solid-darkbg px-2">
                        <Dot number={index() + 1} />
                        <a class="font-semibold" onClick={() => setCollapsed(true)} href={"#" + item.href}>
                        {Array.isArray(item.title) ? <For each={item.title}>{(title) => <SectionTitle title={title} />}</For> : <SectionTitle title={item.title} />}
                        </a>
                    </li>
                    )}
                </For>
                </ol>
            </Show>
        </div>
    )
}