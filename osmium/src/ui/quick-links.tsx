import { Icon } from "solid-heroicons";
import { JSXElement, ParentComponent } from "solid-js";

import {
	academicCap,
	arrowRight,
	codeBracketSquare,
	pencilSquare,
	userGroup,
} from "solid-heroicons/solid";

export type QuickLinksProps = {
	icon: string;
	title: string;
	href: string;
	children: JSXElement;
};

const icons = {
	learn: academicCap,
	contribute: pencilSquare,
	community: userGroup,
	template: codeBracketSquare,
};

export const QuickLinks: ParentComponent<QuickLinksProps> = (props) => {
	return (
		<a
			href={props.href}
			class="group flex min-h-11 items-start gap-3 border-b border-slate-200 px-1 py-4 no-underline hover:border-blue-300 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:hover:border-blue-700 dark:hover:bg-slate-800/60 dark:focus-visible:bg-slate-800/60 dark:focus-visible:outline-blue-400"
		>
			<Icon
				aria-hidden="true"
				path={icons[props.icon as keyof typeof icons]}
				class="mt-0.5 h-6 w-6 shrink-0 fill-blue-600 dark:fill-blue-400"
			/>
			<span class="min-w-0 flex-1">
				<span class="block font-semibold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
					{props.title}
				</span>
				<span class="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-300">
					{props.children}
				</span>
			</span>
			<Icon
				aria-hidden="true"
				path={arrowRight}
				class="mt-1 h-4 w-4 shrink-0 fill-slate-400 group-hover:fill-blue-600 dark:fill-slate-500 dark:group-hover:fill-blue-400"
			/>
		</a>
	);
};
