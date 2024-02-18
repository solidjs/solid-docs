import { A } from "@solidjs/router";
import { Show } from "solid-js";
import flatEntries from "solid:collection/entries";

/**
 * temporary until we have proper types inside collections
 */
type ReferenceCollection = typeof flatEntries["references"];
type LearnCollection = typeof flatEntries["learn"];

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
		<nav class="flex justify-between mt-10 pt-4 border-t border-blue-150 dark:border-slate-800">
			<Show when={previous()}>
				{(entry) => (
					<A 
						class="flex items-center gap-5 no-underline border-[1px] border-transparent rounded-lg group hover:border-blue-150 dark:hover:border-blue-300 p-3 min-w-[200px] justify-start"
						href={entry().path}
					>
						<div class="text-xl text-blue-925/60 group-hover:text-blue-700 dark:group-hover:text-blue-300 dark:text-slate-600">←</div>
						<div class="w-max">
							<span class="font-display text-sm leading-tight font-medium text-blue-925/50 tracking-[0.2px] dark:text-slate-600 dark:group-hover:text-blue-300 group-hover:text-blue-700">
								Previous
							</span>
							<span
								class="w-max flex text-lg items-center leading-tight gap-x-1 text-base font-medium text-blue-925 group-hover:text-blue-300 group-hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300 flex-row-reverse no-underline"
							>
								{entry().title}
							</span>
						</div>
					</A>
				)}
			</Show>
			<Show when={next()}>
				{(entry) => (
					<A 
						class="flex items-center gap-5 no-underline border-[1px] border-transparent rounded-lg group hover:border-blue-150 dark:hover:border-blue-300 p-3 min-w-[200px] justify-end"
						href={entry().path}
					>
						<div class="w-max">
							<span class="font-display text-sm leading-tight font-medium text-blue-925/50 dark:text-slate-600 tracking-[0.2px] dark:group-hover:text-blue-300 group-hover:text-blue-700 text-right block">
								Next
							</span>
							<span
								class="w-max flex text-lg items-center gap-x-1 text-base leading-tight font-medium text-blue-925 group-hover:text-blue-700 dark:text-slate-300 dark:group-hover:text-blue-300 flex-row-reverse no-underline"
							>
								{entry().title}
							</span>
						</div>
						<div class="text-xl text-blue-925/60 group-hover:text-blue-700 dark:group-hover:text-blue-300 dark:text-slate-600">→</div>
					</A>
				)}
			</Show>
		</nav>
	);
}
