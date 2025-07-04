import { Show, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { A, type RouterLinkProps } from "~/ui/i18n-anchor";
import { isServer } from "solid-js/web";

import { Logo, GitHubIcon, DiscordIcon } from "~/ui/logo";
import { ThemeSelector } from "./theme-selector";
import { MobileNavigation } from "./mobile-navigation";
import { useMatch } from "@solidjs/router";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { LanguageSelector } from "./language-selector";

import { useCurrentRouteMetaData } from "~/utils/route-metadata-helper";
import { clientOnly } from "@solidjs/start";
import { useProject } from "~/ui/use-project";

const ClientSearch = clientOnly(() =>
	import("../search").then((m) => ({ default: m.Search }))
);

interface NavLinkProps extends RouterLinkProps {
	active?: boolean;
}

function NavLink(props: NavLinkProps) {
	return (
		<A
			class="duration-250 relative overflow-hidden border-b-2 px-2 text-slate-900 drop-shadow-[0_35px_35px_rgba(1,1,1,1.75)] transition-all dark:text-slate-200"
			classList={{
				"border-b-blue-500 dark:bottom-b-blue-500": props.active,
				"border-transparent": !props.active,
			}}
			addLocale
			{...props}
		>
			{props.children}
		</A>
	);
}

interface Entry {
	title: string;
	path: string;
	children?: Entry[];
	mainNavExclude: boolean;
	isTranslated?: boolean;
}

interface NavProps {
	tree: {
		learn: Entry[];
		reference: Entry[];
	};
}

export function MainHeader(props: NavProps) {
	const [isScrolled, setIsScrolled] = createSignal(false);
	const project = useProject();
	const translatedLocale = useMatch(() => "/:locale/:project/*", {
		locale: SUPPORTED_LOCALES,
		project: ["solid-router", "solid-start", "solid-meta"],
	});

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

	const currentRouteMetaData = createMemo(() => {
		return useCurrentRouteMetaData();
	});

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
						<MobileNavigation tree={props.tree} />
					</div>
					<A href={homePageUrl()} aria-label="Home page" addLocale>
						<Logo class="h-9" />
					</A>
				</div>

				<ul class="order-2 col-span-2 flex w-full justify-center gap-5 pt-6 lg:col-span-1 lg:w-auto lg:pt-0">
					<li>
						<NavLink
							href="/"
							active={project() === "solid" && !translatedLocale()}
						>
							Core
						</NavLink>
					</li>
					<li>
						<NavLink
							href="/solid-router/"
							active={project() === "solid-router"}
						>
							Router
						</NavLink>
					</li>
					<li>
						<NavLink href="/solid-start/" active={project() === "solid-start"}>
							SolidStart
						</NavLink>
					</li>
					<li>
						<NavLink href="/solid-meta/" active={project() === "solid-meta"}>
							Meta
						</NavLink>
					</li>
				</ul>

				<div class="order- flex basis-0 items-center justify-end gap-4 lg:order-2">
					<ClientSearch />
					<A
						href={`https://github.com/solidjs${currentRouteMetaData().project ? currentRouteMetaData().project : "/solid"}`}
						class="group"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon class="h-6 w-6 fill-slate-800 dark:fill-slate-200 dark:group-hover:fill-slate-300" />
					</A>
					<A
						href="https://discord.com/invite/solidjs"
						class="group"
						aria-label="Discord"
						target="_blank"
						rel="noopener noreferrer"
					>
						<DiscordIcon class="h-6 w-6 fill-slate-800 dark:fill-slate-200 dark:group-hover:fill-slate-300" />
					</A>
					<ThemeSelector />
					<Show when={SUPPORTED_LOCALES.length > 0}>
						<LanguageSelector />
					</Show>
				</div>
			</div>
		</header>
	);
}
