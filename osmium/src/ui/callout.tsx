import { Icon } from "solid-heroicons";
import { createUniqueId, mergeProps, type JSX, Show, untrack } from "solid-js";
import {
	lightBulb,
	exclamationTriangle,
	xCircle,
	puzzlePiece,
	bookOpen,
} from "solid-heroicons/outline";

const styles = {
	note: {
		container:
			"border-l-emerald-500 bg-emerald-500/10 dark:border-l-emerald-400 dark:bg-emerald-800/10",
		title: "text-emerald-900 dark:text-emerald-300",
	},
	tip: {
		container:
			"border-l-violet-900 bg-violet-800/10 dark:border-l-violet-400 dark:bg-violet-800/10",
		title: "text-violet-900 dark:text-violet-300",
	},
	advanced: {
		container:
			"border-l-blue-600 bg-blue-400/10 dark:border-l-blue-400 dark:bg-blue-400/10",
		title: "text-blue-700 dark:text-blue-300",
	},
	caution: {
		container:
			"border-l-amber-600 bg-amber-400/10 dark:border-l-amber-400 dark:bg-amber-400/10",
		title: "text-amber-900 dark:text-amber-400",
	},
	danger: {
		container:
			"border-l-red-600 bg-red-400/10 dark:border-l-red-400 dark:bg-red-400/10",
		title: "text-red-900 dark:text-red-400",
	},
};

const icons = {
	note: (props: { class?: string }) => (
		<Icon
			aria-hidden="true"
			path={bookOpen}
			class={`${props.class} text-emerald-800 dark:text-emerald-300`}
		/>
	),
	tip: (props: { class?: string }) => (
		<Icon
			aria-hidden="true"
			path={lightBulb}
			class={`${props.class} text-violet-900 dark:text-violet-300`}
		/>
	),
	advanced: (props: { class?: string }) => (
		<Icon
			aria-hidden="true"
			path={puzzlePiece}
			class={`${props.class} text-blue-700 dark:text-blue-300`}
		/>
	),
	caution: (props: { class?: string }) => (
		<Icon
			aria-hidden="true"
			path={exclamationTriangle}
			class={`${props.class} text-amber-500 dark:text-amber-400`}
		/>
	),
	danger: (props: { class?: string }) => (
		<Icon
			aria-hidden="true"
			path={xCircle}
			class={`${props.class} text-red-500 dark:text-red-400`}
		/>
	),
};

type CalloutType = keyof typeof styles;

export type CalloutProps = {
	title?: string;
	children: JSX.Element;
	type?: CalloutType;
};

export function Callout(props: CalloutProps) {
	const mergedProps = mergeProps({ type: "note" as CalloutType }, props);
	const titleId = createUniqueId();

	const iconType = untrack(() => mergedProps.type);

	const IconComponent = icons[iconType];

	return (
		<div
			role="note"
			aria-labelledby={titleId}
			class={`not-prose my-5 grid w-full grid-cols-[auto_1fr] gap-x-2.5 rounded-md border border-l-4 border-slate-200 px-3 py-2.5 dark:border-slate-700 ${
				styles[mergedProps.type].container
			}`}
		>
			<IconComponent class="mt-0.5 h-4.5 w-4.5 flex-none" />
			<div class="min-w-0">
				<Show
					when={props.title}
					fallback={
						<span
							id={titleId}
							class={`text-base leading-6 font-semibold capitalize ${
								styles[mergedProps.type].title
							}`}
						>
							{props.type || "Note"}
						</span>
					}
				>
					<span
						id={titleId}
						class={`text-base leading-6 font-semibold ${
							styles[mergedProps.type].title
						}`}
					>
						{mergedProps.title}
					</span>
				</Show>
				<div class="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 [&>*:first-child]:mt-1 [&>*:last-child]:mb-0">
					{mergedProps.children}
				</div>
			</div>
		</div>
	);
}
