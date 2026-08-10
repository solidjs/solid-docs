import {
	ComponentProps,
	For,
	Show,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import { isServer } from "solid-js/web";

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
	return (
		<a
			class="relative overflow-hidden border-b-2 px-1 text-sm whitespace-nowrap text-slate-900 drop-shadow-[0_35px_35px_rgba(1,1,1,1.75)] transition-all duration-250 lg:px-2 lg:text-base dark:text-slate-200"
			classList={{
				"border-b-blue-500 dark:border-b-blue-500": props.active,
				"border-transparent": !props.active,
			}}
			{...props}
		>
			{props.children}
		</a>
	);
}

interface MainHeaderProps {}

export function MainHeader(_props: MainHeaderProps) {
	const [isScrolled, setIsScrolled] = createSignal(false);

	const config = useRouteConfig();

	const project = useProject();

	const { setNavOpen } = useOsmiumThemeState();

	if (!isServer) {
		const onScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		onMount(() => {
			onScroll();
			window.addEventListener("scroll", onScroll, { passive: true });
		});

		onCleanup(() => {
			window.removeEventListener("scroll", onScroll);
		});
	}

	return (
		<header
			class="sticky top-0 z-50 block bg-blue-50/80 shadow-md shadow-slate-900/5 backdrop-blur transition duration-500 dark:shadow-none"
			classList={{
				"dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75":
					isScrolled(),
				"dark:bg-transparent bg-transparent": !isScrolled(),
			}}
		>
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
						<ul class="order-2 col-span-2 mx-auto flex w-fit flex-nowrap items-center justify-center gap-4 pt-1 lg:col-span-1 lg:w-auto lg:gap-5 lg:pt-0">
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
						<GitHubIcon class="h-6 w-6 fill-slate-800 dark:fill-slate-200 dark:group-hover:fill-slate-300" />
					</a>
					<a
						href={config().themeConfig?.discord}
						class="group flex size-11 shrink-0 items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none lg:size-auto dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-900"
						aria-label="Discord"
						target="_blank"
						rel="noopener noreferrer"
					>
						<DiscordIcon class="h-6 w-6 fill-slate-800 dark:fill-slate-200 dark:group-hover:fill-slate-300" />
					</a>
					<ThemeSelector />
					<LanguageSelector />
				</div>
			</div>
			<MobileTableOfContents />
		</header>
	);
}
