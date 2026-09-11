import { Icon } from "solid-heroicons";
import {
	chevronRight,
	lightBulb,
	magnifyingGlassCircle,
} from "solid-heroicons/solid";
import type { JSX } from "solid-js";

export type DeepDiveProps = {
	title?: string;
	/**
	 * `deep-dive` (default) holds skippable background. `solution` holds the
	 * answer to a "Try it" exercise, so the reader can attempt it first.
	 */
	kind?: "deep-dive" | "solution";
	children: JSX.Element;
};

const LABELS = {
	"deep-dive": { eyebrow: "Deep dive", fallback: "How this works" },
	solution: { eyebrow: "Solution", fallback: "Show the solution" },
} as const;

/**
 * Collapsed by default. Holds material most readers can skip: how something
 * works under the hood, why a rule exists, or an integrator-only detail.
 * Keep headings out of the body so the page outline stays flat.
 */
export function DeepDive(props: DeepDiveProps) {
	const kind = () => props.kind ?? "deep-dive";
	return (
		<details class="group my-6 w-full rounded-3xl border border-slate-400/60 bg-slate-100/60 open:bg-slate-100 dark:border-slate-600 dark:bg-slate-800/40 dark:open:bg-slate-800/60">
			<summary class="flex cursor-pointer list-none items-start gap-3 p-4 marker:content-none [&::-webkit-details-marker]:hidden">
				<Icon
					aria-hidden="true"
					path={kind() === "solution" ? lightBulb : magnifyingGlassCircle}
					class="mt-1 h-6 w-8 flex-none fill-slate-600 dark:fill-slate-300"
				/>
				<span class="flex w-full flex-col px-1">
					<span class="text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-400">
						{LABELS[kind()].eyebrow}
					</span>
					<span class="text-xl font-semibold text-slate-900 dark:text-white">
						{props.title ?? LABELS[kind()].fallback}
					</span>
				</span>
				<Icon
					aria-hidden="true"
					path={chevronRight}
					class="mt-2 h-5 w-5 flex-none fill-slate-500 transition-transform group-open:rotate-90 dark:fill-slate-400"
				/>
			</summary>
			<div class="prose dark:prose-invert px-4 pb-4 pl-16 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
				{props.children}
			</div>
		</details>
	);
}
