import { Component, Show } from "solid-js";
import { A } from "@solidjs/router";

import { Icon } from "solid-heroicons";
import { arrowLeft, arrowRight } from "solid-heroicons/solid";

interface PageLinkProps {
	dir: "previous" | "next";
	title: string;
	href: string;
}

const PageLink: Component<PageLinkProps> = (props) => {
	return (
		<div {...props}>
			<dt class="font-display text-sm font-medium text-slate-900 dark:text-white">
				{props.dir === "next" ? "Next" : "Previous"}
			</dt>
			<dd class="mt-1">
				<A
					href={props.href}
					class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-300"
				>
					{props.title}
					<Show when={props.dir === "next"}>
						<Icon path={arrowRight} class="h-4 w-4 flex-none fill-current" />
					</Show>
					<Show when={props.dir === "previous"}>
						<Icon path={arrowLeft} class="h-4 w-4 flex-none fill-current" />
					</Show>
				</A>
			</dd>
		</div>
	);
};

export const PrevNextLinks: Component<PageLinkProps> = () => {
	return (
		<dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
			<Show when={previousPage}>
				<PageLink dir="previous" {...previousPage} />
			</Show>
			<Show when={nextPage}>
				<PageLink class="ml-auto text-right" {...nextPage} />
			</Show>
		</dl>
	);
};
