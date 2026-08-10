import { ComponentProps, For, Show, splitProps } from "solid-js";

import { ProjectLogo, GitHubIcon, DiscordIcon } from "../logo";
import { ThemeSelector } from "./theme-selector";
import { MobileNavigation } from "./mobile-navigation";
import { LanguageSelector } from "./language-selector";
import { MobileTableOfContents } from "./table-of-contents";

import { clientOnly } from "@solidjs/start";
import { useProject, useRouteConfig } from "../../utils";
import { useOsmiumThemeState } from "../../context";

const ClientSearch = clientOnly(() =>
	import("../search").then((m) => ({ default: m.Search }))
);

interface NavLinkProps extends ComponentProps<"a"> {
	active?: boolean;
}

function NavLink(props: NavLinkProps) {
	const [local, anchorProps] = splitProps(props, ["active", "children"]);

	return (
		<a
			{...anchorProps}
			aria-current={local.active ? "page" : undefined}
			class="relative inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 px-2 text-sm whitespace-nowrap transition-[color,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none lg:min-h-0 lg:min-w-0 lg:py-2 lg:text-base dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900"
			classList={{
				"border-b-blue-600 text-blue-700 dark:border-b-blue-400 dark:text-blue-300":
					local.active,
				"border-transparent text-slate-700 hover:border-slate-300 hover:text-slate-950 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white":
					!local.active,
			}}
		>
			{local.children}
		</a>
	);
}

interface MainHeaderProps {}

export function MainHeader(_props: MainHeaderProps) {
	const config = useRouteConfig();

	const project = useProject();

	const { setNavOpen } = useOsmiumThemeState();

	return (
		<header class="sticky top-0 z-50 block border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
			<div class="max-w-8xl mx-auto grid w-full grid-cols-[auto_1fr] items-center px-2 py-1 lg:grid-cols-[1fr_2fr_1fr] lg:px-4 lg:py-2">
				<div class="flex items-center justify-start lg:gap-2">
					<div class="flex lg:hidden">
						<MobileNavigation />
					</div>
					<a
						href={`/${project().projects[project().current].path}`}
						aria-label="Home page"
						class="flex size-11 shrink-0 items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none lg:h-auto lg:w-auto dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900 [&>div]:py-0 lg:[&>div]:py-2"
					>
						<ProjectLogo class="h-9" />
					</a>
				</div>

				<Show when={project().projects}>
					{(projects) => (
						<nav
							aria-label="Products"
							class="order-2 col-span-2 min-w-0 overflow-x-auto pt-1 lg:col-span-1 lg:overflow-visible lg:pt-0"
						>
							<ul class="mx-auto flex w-fit flex-nowrap items-center justify-center gap-4 lg:w-auto lg:gap-5">
								<For each={Object.entries(projects())}>
									{([p, conf]) => {
										return (
											<li>
												<NavLink
													href={`/${conf.path}${p === "start" ? "/v2" : ""}`}
													onClick={() => setNavOpen(false)}
													active={project()?.current === p}
												>
													{conf.label}
												</NavLink>
											</li>
										);
									}}
								</For>
							</ul>
						</nav>
					)}
				</Show>

				<div class="flex min-w-0 items-center justify-end lg:order-2 lg:gap-4">
					<ClientSearch />
					<a
						href={`${config().themeConfig?.github}/${project().projects[project().current].path || "solid"}`}
						class="group flex size-11 shrink-0 items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none lg:size-auto dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon class="h-6 w-6 fill-slate-800 transition-colors group-hover:fill-slate-600 dark:fill-slate-200 dark:group-hover:fill-slate-300" />
					</a>
					<a
						href={config().themeConfig?.discord}
						class="group flex size-11 shrink-0 items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none lg:size-auto dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900"
						aria-label="Discord"
						target="_blank"
						rel="noopener noreferrer"
					>
						<DiscordIcon class="h-6 w-6 fill-slate-800 transition-colors group-hover:fill-slate-600 dark:fill-slate-200 dark:group-hover:fill-slate-300" />
					</a>
					<ThemeSelector />
					<LanguageSelector />
				</div>
			</div>
			<MobileTableOfContents />
		</header>
	);
}
