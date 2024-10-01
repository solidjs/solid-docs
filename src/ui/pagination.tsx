import { A } from "~/ui/i18n-anchor";
import { Show, Suspense, createMemo } from "solid-js";
import { coreEntries } from "solid:collection";
import { useI18n } from "~/i18n/i18n-context";

/**
 * temporary until we have proper types inside collections
 */
type ReferenceCollection = (typeof coreEntries)["reference"];
type LearnCollection = (typeof coreEntries)["learn"];

type Pagination = {
	collection: ReferenceCollection | LearnCollection;
	currentIndex: number;
};
export function Pagination(props: Pagination) {
	const previous = createMemo(() => {
		if (props.currentIndex > 0) {
			return props.collection[props.currentIndex - 1];
		} else {
			return null;
		}
	});

	const next = createMemo(() => {
		if (props.currentIndex < props.collection.length) {
			return props.collection[props.currentIndex + 1];
		} else {
			return null;
		}
	});

	const i18n = useI18n();

	return (
		<Suspense>
			<Show when={i18n.t}>
				<nav class="flex justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
					<Show when={previous()}>
						{(entry) => (
							<div>
								<span class="font-display text-sm font-medium text-slate-900 dark:text-white">
									{i18n.t("pagination.previous")}
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
									{i18n.t("pagination.next")}
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
			</Show>
		</Suspense>
	);
}
