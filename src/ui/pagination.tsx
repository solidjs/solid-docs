import { A } from "@solidjs/router";
import { Show } from "solid-js";
import flatEntries from "solid:collection/entries";

/**
 * temporary until we have proper types inside collections
 */
type ReferenceCollection = (typeof flatEntries)["references"];
type LearnCollection = (typeof flatEntries)["learn"];

type Pagination = {
	collection: ReferenceCollection | LearnCollection;
	currentIndex: number;
};
export function Pagination(props: Pagination) {
	const previous = () => {
		if (props.currentIndex > 0) {
			return props.collection[props.currentIndex - 1];
		} else {
			return null;
		}
	};

	const next = () => {
		if (props.currentIndex < props.collection.length) {
			return props.collection[props.currentIndex + 1];
		} else {
			return null;
		}
	};

	return (
		<nav class="flex justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
			<Show when={previous()}>
				{(entry) => (
					<div>
						<span class="font-display text-sm font-medium text-slate-900 dark:text-white">
							Previous
						</span>
						<A
							class="flex items-center gap-x-1 text-base font-medium text-slate-500 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 flex-row-reverse no-underline"
							href={entry().path}
						>
							← {entry().title}
						</A>
					</div>
				)}
			</Show>
			<Show when={next()}>
				{(entry) => (
					<div>
						<span class="font-display text-sm font-medium text-slate-900 dark:text-white">
							Next
						</span>
						<A
							class="flex items-center gap-x-1 text-base font-medium text-slate-500 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300 flex-row-reverse no-underline"
							href={entry().path}
						>
							{entry().title} →
						</A>
					</div>
				)}
			</Show>
		</nav>
	);
}
