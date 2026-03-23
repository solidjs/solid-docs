import {
	ComponentProps,
	For,
	Show,
	createMemo,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import { isServer } from "solid-js/web";

import { Logo, GitHubIcon, DiscordIcon } from "~/ui/logo";
import { ThemeSelector } from "./theme-selector";
import { MobileNavigation } from "./mobile-navigation";
import { useMatch } from "@solidjs/router";
import { LanguageSelector } from "./language-selector";

import { clientOnly } from "@solidjs/start";
import { useProject } from "~/ui/use-project";
import { useRouteConfig } from "~/utils";
import { useLocale } from "@kobalte/solidbase/client";
import { useOsmiumThemeState } from "~/context";

const ClientSearch = clientOnly(() =>
	import("../search").then((m) => ({ default: m.Search }))
);

interface NavLinkProps extends ComponentProps<"a"> {
	active?: boolean;
}

function NavLink(props: NavLinkProps) {
	return (
		<a
			class="duration-250 relative overflow-hidden border-b-2 px-2 text-slate-900 drop-shadow-[0_35px_35px_rgba(1,1,1,1.75)] transition-all dark:text-slate-200"
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

interface Entry {
	title: string;
	path: string;
	children?: Entry[];
	mainNavExclude: boolean;
	isTranslated?: boolean;
}

interface MainHeaderProps {}

export function MainHeader(props: MainHeaderProps) {
	const [isScrolled, setIsScrolled] = createSignal(false);
	const project = useProject();

	const config = useRouteConfig();
	const locale = useLocale();

	const {
		tocOpen,
		setTocOpen,
		setSidebarOpen,
		frontmatter,
		navOpen,
		setNavOpen,
	} = useOsmiumThemeState();

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

	const homePageUrl = createMemo(() => {
		switch (project()) {
			case "solid-start":
				return "/solid-start/";
			case "solid-router":
				return "/solid-router/";
			case "solid-meta":
				return "/solid-meta/";
			default:
				return "/";
		}
	});

	return (
		<header
			class="sticky top-0 z-50 flex items-center justify-between bg-blue-50/80 shadow-md shadow-slate-900/5 backdrop-blur transition duration-500 dark:shadow-none"
			classList={{
				"dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75":
					isScrolled(),
				"dark:bg-transparent bg-transparent": !isScrolled(),
			}}
		>
			<div class="mx-auto grid w-full max-w-8xl grid-cols-2 items-center px-4 py-2 lg:grid-cols-[1fr,2fr,1fr]">
				<div class="flex justify-start gap-2">
					<div class="flex lg:hidden">
						<MobileNavigation />
					</div>
					<a href={homePageUrl()} aria-label="Home page">
						<Logo class="h-9" />
					</a>
				</div>

				<Show when={config().themeConfig?.nav}>
					{(nav) => (
						<For each={nav()}>
							{(item) => {
								const match = useMatch(() =>
									locale.applyPathPrefix(
										`${item.activeMatch ?? item.link}/*rest`
									)
								);

								return (
									<li>
										<NavLink
											href={locale.applyPathPrefix(item.link)}
											data-matched={match() !== undefined ? true : undefined}
											onClick={() => setNavOpen(false)}
										>
											{item.text}
										</NavLink>{" "}
									</li>
								);
							}}
						</For>
					)}
				</Show>

				<div class="order- flex basis-0 items-center justify-end gap-4 lg:order-2">
					<ClientSearch />
					<a
						href={`https://github.com/solidjs`}
						class="group"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon class="h-6 w-6 fill-slate-800 dark:fill-slate-200 dark:group-hover:fill-slate-300" />
					</a>
					<a
						href="https://discord.com/invite/solidjs"
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
