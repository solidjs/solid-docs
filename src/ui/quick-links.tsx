import { Icon } from "solid-heroicons";
import { JSXElement, ParentComponent, Show } from "solid-js";
import { A } from "~/ui/i18n-anchor";
import { isExternalURL } from "~/i18n/helpers";

import {
	academicCap,
	codeBracketSquare,
	pencilSquare,
	userGroup,
} from "solid-heroicons/solid";

export type QuickLinksProps = {
	icon: "learn" | "contribute" | "template" | "community";
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
			<div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.200)),var(--quick-links-hover-bg,theme(colors.sky.200)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
			<div class="relative overflow-hidden rounded-xl p-6">
				<div class="flex">
					<Icon path={icons[props.icon]} class="h-7 w-7 fill-blue-500" />
					<div class="text-lg text-slate-900 dark:text-white capitalize no-underline pl-3">
						<Show
							when={isExternalURL(props.href)}
							fallback={
								<A
									href={props.href}
									class="no-underline font-semibold"
									addLocale
								>
									<span class="absolute -inset-px rounded-xl" />
									{props.title}
								</A>
							}
						>
							<a
								href={props.href}
								class="no-underline font-semibold bg-gradient-to-br from-blue-400 to-blue-700 inline-block text-transparent bg-clip-text"
							>
								<span class="absolute -inset-px rounded-xl" />
								{props.title}
							</a>
						</Show>
					</div>
				</div>

				<p class="mt-1 text-sm text-slate-800 dark:text-slate-300 -mb-2">
					{props.children}
				</p>
			</div>
		</div>
	);
};
