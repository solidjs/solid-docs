import { Alert } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { mergeProps, type JSX, Show, untrack } from "solid-js";
import {
	lightBulb,
	exclamationTriangle,
	xCircle,
	puzzlePiece,
	bookOpen,
} from "solid-heroicons/solid";

const styles = {
	info: {
		container:
			"bg-emerald-500/20 border-emerald-500 dark:border-emerald-400 dark:bg-emerald-800/20 dark:border-emerald-900",
		title: "text-emerald-900 dark:text-emerald-300",
	},
	tip: {
		container:
			"bg-violet-800/20 border-violet-900 dark:border-violet-400 dark:bg-violet-800/10 dark:border-violet-900",
		title: "text-violet-900 dark:text-violet-300",
	},
	advanced: {
		container:
			"bg-blue-400/20 border-blue-600 dark:border-blue-400 dark:bg-blue-400/20 dark:border-blue-600",
		title: "text-blue-700 dark:text-blue-300",
	},
	caution: {
		container:
			"bg-amber-400/30 border-amber-600 dark:border-amber-400 dark:bg-amber-400/20 dark:border-amber-600",
		title: "text-amber-900 dark:text-amber-400",
	},
	danger: {
		container:
			"bg-red-400/30 border-red-600 dark:border-red-400 dark:bg-red-400/20 dark:border-red-600",
		title: "text-red-900 dark:text-red-400",
	},
};

const icons = {
	tip: (props: { class?: string }) => (
		<Icon
			path={lightBulb}
			class={`${props.class} fill-violet-900 dark:fill-violet-300`}
		/>
	),
	info: (props: { class?: string }) => (
		<Icon
			path={bookOpen}
			class={`${props.class} fill-emerald-800 dark:fill-emerald-300`}
		/>
	),
	advanced: (props: { class?: string }) => (
		<Icon
			path={puzzlePiece}
			class={`${props.class} fill-blue-700 dark:fill-blue-300`}
		/>
	),
	caution: (props: { class?: string }) => (
		<Icon
			path={exclamationTriangle}
			class={`${props.class} fill-amber-500 dark:fill-amber-400`}
		/>
	),
	danger: (props: { class?: string }) => (
		<Icon
			path={xCircle}
			class={`${props.class} fill-red-500 dark:fill-red-400`}
		/>
	),
};

export type CalloutProps = {
	title?: string;
	children: JSX.Element;
	type?: keyof typeof styles;
};

export function Callout(props: CalloutProps) {
	const mergedProps = mergeProps(
		{ type: "info" as keyof typeof styles },
		props
	);

	const iconType = untrack(() => mergedProps.type);

	const IconComponent = icons[iconType];

	return (
		<Alert.Root
			class={`my-6 rounded-3xl flex p-4 border w-full ${
				styles[mergedProps.type].container
			}`}
		>
			<IconComponent class="h-6 w-8 pt-1 flex-none" />
			<div class={`m-0 pb-1 px-4 w-full ${styles[mergedProps.type].title}`}>
				<Show
					when={props.title}
					fallback={
						<span class="capitalize font-semibold text-xl">
							{props.type || "Info"}:{" "}
						</span>
					}
				>
					<span class="font-semibold text-xl">{mergedProps.title}</span>
				</Show>
				<div class="dark:prose-invert prose pr-7 [&>*:first-child]:mt-1">
					{mergedProps.children}
				</div>
			</div>
		</Alert.Root>
	);
}
