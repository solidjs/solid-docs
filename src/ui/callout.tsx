import { Alert } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { mergeProps, type JSXElement, Show } from "solid-js";
import {
	lightBulb,
	exclamationCircle,
	puzzlePiece,
	bookOpen,
} from "solid-heroicons/solid";

const styles = {
	info: {
		container:
			"bg-emerald-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10",
		title: "text-emerald-900 dark:text-emerald-400",
		body: "text-emerald-800 [--tw-prose-background:theme(colors.emerald.50)] prose-a:text-emerald-900 prose-code:text-emerald-900 dark:text-slate-300 dark:prose-code:text-slate-300",
	},
	tip: {
		container:
			"bg-violet-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10",
		title: "text-violet-900 dark:text-violet-400",
		body: "text-violet-800 [--tw-prose-background:theme(colors.violet.50)] prose-a:text-violet-900 prose-code:text-violet-900 dark:text-slate-300 dark:prose-code:text-slate-300",
	},
	advanced: {
		container:
			"bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10",
		title: "text-sky-900 dark:text-sky-400",
		body: "text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300",
	},
	warning: {
		container:
			"bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10",
		title: "text-amber-900 dark:text-amber-500",
		body: "text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300",
	},
};

const icons = {
	tip: (props: { class?: string }) => (
		<Icon path={lightBulb} class={`${props.class} fill-violet-500`} />
	),
	info: (props: { class?: string }) => (
		<Icon path={bookOpen} class={`${props.class} fill-emerald-500`} />
	),
	advanced: (props: { class?: string }) => (
		<Icon path={puzzlePiece} class={`${props.class} fill-sky-500`} />
	),
	warning: (props: { class?: string }) => (
		<Icon path={exclamationCircle} class={`${props.class} fill-amber-500`} />
	),
};

export type CalloutProps = {
	title?: string;
	children: JSXElement;
	type?: keyof typeof styles;
};

export function Callout(props: CalloutProps) {
	const mergedProps = mergeProps(
		{ type: "info" as keyof typeof styles },
		props
	);

	let IconComponent = icons[mergedProps.type];

	return (
		<Alert.Root
			class={`my-8 flex rounded-3xl p-6 ${styles[mergedProps.type].container}`}
		>
			<IconComponent class="h-6 w-8 mt-1 flex-none" />
			<div class="ml-4 flex-auto">
				<Show when={props.title}>
					<p
						class={`m-0 mb-2.5 font-display text-xl ${
							styles[mergedProps.type].title
						}`}
					>
						{mergedProps.title}
					</p>
				</Show>
				<div
					class={`prose ${
						styles[mergedProps.type].body
					} [&>*:first-child]:mt-0`}
				>
					{mergedProps.children}
				</div>
			</div>
		</Alert.Root>
	);
}
