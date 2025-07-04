import { ParentComponent, Show, untrack } from "solid-js";
import { A } from "~/ui/i18n-anchor";

/**
 * @todo
 * keeping track of the logos is not the responsibility of this file
 * we can probably move this to a data folder or something like that
 */
export const logos: { [key: string]: { file: string; style?: string } } = {
	cloudflare: { file: "cloudflare-pages.svg" },
	firebase: { file: "firebase.svg" },
	flightControl: { file: "flightcontrol.svg" },
	netlify: { file: "netlify.svg" },
	railway: { file: "railway.svg" },
	vercel: { file: "vercel.svg" },
	zerops: { file: "zerops.svg" },
	sass: { file: "sass.svg" },
	less: { file: "less.svg" },
	cssmodules: { file: "css-modules.svg", style: "invert" },
	macaron: { file: "macaron.svg" },
	tailwind: { file: "tailwind.svg" },
	stormkit: { file: "stormkit.svg" },
	sst: { file: "sst.svg" },
	uno: { file: "uno.svg" },
};

export type ImageLinksProps = {
	title: string;
	logo: keyof typeof logos;
	href: string;
};

export const ImageLinks: ParentComponent<ImageLinksProps> = (props) => {
	const logoImage = untrack(() => props.logo);
	const { file, style } = logos[logoImage];

	return (
		<div class="group relative rounded-xl dark:border-blue-800 dark:bg-transparent">
			<div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.200)),var(--quick-links-hover-bg,theme(colors.sky.200)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
			<div class="relative overflow-hidden rounded-xl p-6">
				<div class="flex flex-col items-center">
					<div class="flex h-16 w-16 items-center justify-center rounded-full border border-slate-700 bg-black dark:bg-transparent">
						<img
							class={`${style} not-prose h-10 w-10`}
							src={`/assets/${file}`}
							alt={props.title}
							loading="lazy"
							decoding="async"
						/>
					</div>
					<div class="pt-1 text-lg text-slate-900 no-underline dark:text-white">
						<Show
							when={props.href.match(/https?:\/\//)}
							fallback={
								<A
									href={props.href}
									class="inline-block bg-gradient-to-br from-blue-400 to-blue-700 bg-clip-text text-center font-semibold text-transparent no-underline"
								>
									<span class="absolute -inset-px rounded-xl" />
									{props.title}
								</A>
							}
						>
							<a
								href={props.href}
								class="inline-block bg-gradient-to-br from-blue-400 to-blue-700 bg-clip-text text-center font-semibold text-transparent no-underline"
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
