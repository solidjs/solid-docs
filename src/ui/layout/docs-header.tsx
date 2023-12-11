import { Component, Show } from "solid-js";
import { DocsLayoutProps } from "../docs-layout";

export const DocsHeader: Component<DocsLayoutProps> = (props) => {
	return (
		<header class="mb-9 space-y-1">
			<Show when={props.section}>
				<p class="font-display text-sm font-medium text-sky-500">
					{props.section?.title}
				</p>
			</Show>
			<Show when={props.title}>
				<h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
					{props.title}
				</h1>
			</Show>
		</header>
	);
};
