import { For } from "solid-js";

import { ProjectLogo, GitHubIcon, DiscordIcon } from "./logo";

// Mirrors the footer on solidjs.com (solid-site/src/components/Footer.tsx and FOOTER_COLUMNS in src/site.ts).
// The marketing site's pages live on another origin, so those links are absolute.
const SITE = "https://www.solidjs.com";
const GITHUB = "https://github.com/solidjs";
const DISCORD = "https://discord.com/invite/solidjs";

const TAGLINE = "Simple and performant reactivity for building user interfaces.";

const COLUMNS = [
	{
		title: "Learn",
		links: [
			{ label: "Docs", href: "/" },
			{ label: "Tutorial", href: "/tutorial" },
			{ label: "Blog", href: `${SITE}/blog` },
		],
	},
	{
		title: "Community",
		links: [
			{ label: "Discord", href: DISCORD },
			{ label: "GitHub", href: GITHUB },
			{ label: "Reddit", href: "https://www.reddit.com/r/solidjs/" },
			{ label: "Team & Contributors", href: `${SITE}/team` },
			{ label: "Code of Conduct", href: `${SITE}/code-of-conduct` },
		],
	},
	{
		title: "Project",
		links: [
			{ label: "About", href: `${SITE}/about` },
			{ label: "Media & Brand", href: `${SITE}/media` },
			{ label: "npm", href: "https://www.npmjs.com/package/solid-js" },
			{ label: "Store", href: `${SITE}/store` },
			{
				label: "Sponsor on Open Collective",
				href: "https://opencollective.com/solid",
			},
			{
				label: "Docs source",
				href: "https://github.com/solidjs/solid-docs",
			},
		],
	},
];

const isExternal = (href: string) => /^https?:/.test(href);

const socialClass =
	"grid size-9 place-items-center rounded-md text-text-muted hover:bg-surface-hover hover:text-text";

/** Multi-column footer: brand and tagline, link columns, then copyright, licence and social links. */
export function Footer() {
	return (
		<footer class="border-border bg-bg-subtle mt-16 border-t pt-14 pb-8">
			<div class="max-w-8xl mx-auto px-4 lg:px-8">
				<div class="grid grid-cols-2 gap-10 pb-12 md:grid-cols-[minmax(16rem,1.6fr)_repeat(3,minmax(0,1fr))]">
					<div class="col-span-2 flex max-w-sm flex-col items-start gap-4 md:col-span-1">
						<a href="/" aria-label="Solid docs home">
							<ProjectLogo />
						</a>
						<p class="text-text-muted text-sm leading-6">{TAGLINE}</p>
						<span class="bg-brand-subtle text-brand-text rounded-full px-3 py-1 text-xs font-semibold">
							Solid 2.0 is live
						</span>
					</div>
					<For each={COLUMNS} keyed={(c) => c.title}>
						{(col) => (
							<nav aria-label={col().title}>
								<h2 class="mb-3.5 text-sm font-semibold tracking-normal text-text">
									{col().title}
								</h2>
								<ul class="m-0 grid list-none gap-2.5 p-0">
									<For each={col().links} keyed={(l) => l.href}>
										{(link) => (
											<li>
												<a
													href={link().href}
													class="text-text-muted hover:text-text text-sm no-underline hover:underline"
													{...(isExternal(link().href)
														? { target: "_blank", rel: "noopener noreferrer" }
														: {})}
												>
													{link().label}
												</a>
											</li>
										)}
									</For>
								</ul>
							</nav>
						)}
					</For>
				</div>
				<div class="border-border flex flex-wrap items-center justify-between gap-4 border-t pt-6">
					<p class="text-text-muted text-sm">
						© {new Date().getFullYear()} Solid Maintainers. Released under the{" "}
						<a
							href="https://github.com/solidjs/solid/blob/main/LICENSE"
							class="text-brand-text underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							MIT License
						</a>
						.
					</p>
					<ul class="m-0 flex list-none gap-1 p-0">
						<li>
							<a
								href={GITHUB}
								class={socialClass}
								aria-label="GitHub"
								target="_blank"
								rel="noopener noreferrer"
							>
								<GitHubIcon class="size-[18px] fill-current" />
							</a>
						</li>
						<li>
							<a
								href={DISCORD}
								class={socialClass}
								aria-label="Discord"
								target="_blank"
								rel="noopener noreferrer"
							>
								<DiscordIcon class="size-[18px] fill-current" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
