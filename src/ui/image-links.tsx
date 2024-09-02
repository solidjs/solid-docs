import { ParentComponent, Show } from "solid-js";
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
	zerops: {file: "zerops.svg"},
	sass: { file: "sass.svg" },
	less: { file: "less.svg" },
	cssmodules: { file: "css-modules.svg", style: "invert" },
	macaron: { file: "macaron.svg" },
	tailwind: { file: "tailwind.svg" },
	stormkit: { file: "stormkit.svg" },
	uno: { file: "uno.svg" },
};

export type ImageLinksProps = {
	title: string;
	logo: keyof typeof logos;
	href: string;
};

export const ImageLinks: ParentComponent<ImageLinksProps> = (props) => {
	const { file, style } = logos[props.logo];

	return (
		<div class="group relative rounded-xl  dark:border-blue-800 dark:bg-transparent">
			<div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.200)),var(--quick-links-hover-bg,theme(colors.sky.200)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
			<div class="relative overflow-hidden rounded-xl p-6">
				<div class="flex flex-col items-center">
					<div class="bg-black dark:bg-transparent border border-slate-700  h-16 w-16 rounded-full flex justify-center items-center">
						<img
							class={`${style} h-10 w-10 not-prose`}
							src={`/assets/${file}`}
							alt={props.title}
							loading="lazy"
							decoding="async"
						/>
					</div>
					<div class="text-lg pt-1 text-slate-900 dark:text-white no-underline ">
						<Show
							when={props.href.match(/https?:\/\//)}
							fallback={
								<A
									href={props.href}
									class="no-underline text-center font-semibold bg-gradient-to-br from-blue-400 to-blue-700 inline-block text-transparent bg-clip-text"
								>
									<span class="absolute -inset-px rounded-xl" />
									{props.title}
								</A>
							}
						>
							<a
								href={props.href}
								class="no-underline text-center font-semibold bg-gradient-to-br from-blue-400 to-blue-700 inline-block text-transparent bg-clip-text"
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
