import { Icon } from "solid-heroicons";
import { JSXElement, ParentComponent, Show } from "solid-js";

import {
	academicCap,
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
		<div class="group relative rounded-xl border border-blue-600 dark:border-blue-800 dark:bg-transparent">
			<div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,var(--color-sky-200)),var(--quick-links-hover-bg,var(--color-sky-200)))_padding-box,linear-gradient(to_top,var(--color-indigo-400),var(--color-cyan-400),var(--color-sky-500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:var(--color-slate-800)]" />
			<div class="relative overflow-hidden rounded-xl px-5 py-4">
				<div class="flex items-center">
					<Icon
						aria-hidden="true"
						path={icons[props.icon as keyof typeof icons]}
						class="h-7 w-7 fill-blue-500"
					/>
					<div class="pl-3 text-xl text-slate-900 capitalize no-underline dark:text-white">
						<Show
							when={props.href.includes("://")}
							fallback={
								<a href={props.href} class="font-semibold no-underline">
									<span class="absolute -inset-px rounded-xl" />
									{props.title}
								</a>
							}
						>
							<a
								href={props.href}
								class="inline-block bg-linear-to-br from-blue-400 to-blue-700 bg-clip-text font-semibold text-transparent no-underline"
							>
								<span class="absolute -inset-px rounded-xl" />
								{props.title}
							</a>
						</Show>
					</div>
				</div>

				<p class="-mb-2 pl-1 text-[0.91rem] text-balance text-slate-800 dark:text-slate-300">
					{props.children}
				</p>
			</div>
		</div>
	);
};
