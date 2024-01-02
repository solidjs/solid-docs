import { ParentComponent, Show } from "solid-js";
import { A } from "solid-start";

/**
 * @todo
 * keeping track of the logos is not the responsibility of this file
 * we can probably move this to a data folder or something like that
 */
export const logos = {
	tailwind: { file: "tailwind.svg" },
	aws: { file: "aws.svg" },
};

export type ImageLinksProps = {
	title: string;
	logo: keyof typeof logos;
	href: string;
};

export const ImageLinks: ParentComponent<ImageLinksProps> = (props) => {
	const { file } = logos[props.logo];

	return (
		<div class="group relative rounded-xl border border-sky-600 dark:border-sky-800 bg-sky-50/90">
			<div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.200)),var(--quick-links-hover-bg,theme(colors.sky.200)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
			<div class="relative overflow-hidden rounded-xl p-6">
				<div class="flex flex-col items-center">
					<img
						src={`/assets/${file}`}
						alt={props.title}
						loading="lazy"
						decoding="async"
						height={64}
						width={64}
					/>
					<div class="text-lg text-slate-900 dark:text-white capitalize no-underline pl-3">
						<Show
							when={props.href.match(/https?:\/\//)}
							fallback={
								<A href={props.href} class="no-underline font-semibold">
									<span class="absolute -inset-px rounded-xl" />
									{props.title}
								</A>
							}
						>
							<a
								href={props.href}
								class="no-underline font-semibold bg-gradient-to-br from-sky-400 to-sky-700 inline-block text-transparent bg-clip-text"
							>
								<span class="absolute -inset-px rounded-xl" />
								{props.title}
							</a>
						</Show>
					</div>
				</div>
			</div>
		</div>
	);
};
