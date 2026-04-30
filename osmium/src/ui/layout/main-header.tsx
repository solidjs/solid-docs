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
			class="relative overflow-hidden border-b-2 px-2 text-slate-900 drop-shadow-[0_35px_35px_rgba(1,1,1,1.75)] transition-all duration-250 dark:text-slate-200"
			classList={{
				"border-b-blue-500 dark:bottom-b-blue-500": props.active,
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
			class="sticky top-0 z-50 flex items-center justify-between bg-blue-50/80 shadow-md shadow-slate-900/5 backdrop-blur transition duration-500 dark:shadow-none"
			classList={{
				"dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75":
					isScrolled(),
				"dark:bg-transparent bg-transparent": !isScrolled(),
			}}
		>
			<div class="max-w-8xl mx-auto grid w-full grid-cols-2 items-center px-4 py-2 lg:grid-cols-[1fr_2fr_1fr]">
				<div class="flex items-center justify-start gap-2">
					<div class="flex lg:hidden">
						<MobileNavigation />
					</div>
					<a
						href={`/${project().projects[project().current].path}`}
						aria-label="Home page"
					>
						<ProjectLogo class="h-9" />
					</a>
				</div>

				<Show when={project().projects}>
					{(projects) => (
						<ul class="order-2 col-span-2 flex w-full justify-center gap-5 pt-6 lg:col-span-1 lg:w-auto lg:pt-0">
							<For each={Object.entries(projects())}>
								{([p, conf]) => {
									return (
										<li>
											<NavLink
												href={`/${conf.path}`}
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

				<div class="order- flex basis-0 items-center justify-end gap-4 lg:order-2">
					<ClientSearch />
					<a
						href={`${config().themeConfig?.github}/${project().projects[project().current].path || "solid"}`}
						class="group"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon class="h-6 w-6 fill-slate-800 dark:fill-slate-200 dark:group-hover:fill-slate-300" />
					</a>
					<a
						href={config().themeConfig?.discord}
						class="group"
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
		</header>
	);
}
