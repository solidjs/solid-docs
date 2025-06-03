import { Show, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { A } from "~/ui/i18n-anchor";
import { isServer } from "solid-js/web";

import { Logo, GitHubIcon, DiscordIcon } from "~/ui/logo";
import { ThemeSelector } from "./theme-selector";
import { MobileNavigation } from "./mobile-navigation";
import { useMatch } from "@solidjs/router";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { LanguageSelector } from "./language-selector";

import { useCurrentRouteMetaData } from "~/utils/route-metadata-helper";
import { clientOnly } from "@solidjs/start";

const ClientSearch = clientOnly(() =>
	import("../search").then((m) => ({ default: m.Search }))
);

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
	const notSolidCore = useMatch(() => "/:project/*", {
		project: ["solid-router", "solid-start", "solid-meta"],
	});
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

	return (
		<header
			class="sticky top-0 z-50 flex items-center justify-between bg-blue-50/80 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none backdrop-blur"
			classList={{
				"dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75":
					isScrolled(),
				"dark:bg-transparent bg-transparent": !isScrolled(),
			}}
		>
			<div class="grid lg:grid-cols-[1fr,2fr,1fr] grid-cols-2 py-2 px-4 items-center w-full max-w-8xl mx-auto ">
				<div class="flex justify-start gap-2">
					<div class="flex lg:hidden">
						<MobileNavigation tree={props.tree} />
					</div>
					<A href="/" aria-label="Home page" addLocale>
						<Logo class="h-9" />
					</A>
				</div>

				<ul class="order-2 col-span-2 lg:col-span-1 flex pt-6 lg:pt-0 lg:w-auto w-full gap-3 justify-center">
					<li>
						<A
							href="/"
							class="transition-all duration-250 rounded-lg dark:hover:bg-blue-500/10 text-slate-900 dark:text-slate-300 relative overflow-hidden drop-shadow-[0_35px_35px_rgba(1,1,1,1.75)] px-4 py-2"
							classList={{
								"dark:!text-slate-100 dark:!bg-blue-500/20":
									!notSolidCore() && !translatedLocale(),
							}}
							addLocale
						>
							Core
						</A>
					</li>
					<li>
						<A
							href="/solid-router"
							class="transition-all duration-250 rounded-lg dark:hover:bg-blue-500/10 text-slate-900 dark:text-slate-300 px-4 py-2"
							activeClass="dark:!text-slate-100 dark:!bg-blue-500/20"
							addLocale
						>
							Router
						</A>
					</li>
					<li>
						<A
							href="/solid-start"
							class="transition-all duration-250 rounded-lg dark:hover:bg-blue-500/10 text-slate-900 dark:text-slate-300 px-4 py-2"
							activeClass="dark:!text-slate-100 dark:!bg-blue-500/20"
							addLocale
						>
							SolidStart
						</A>
					</li>
					<li>
						<A
							href="/solid-meta"
							class="transition-all duration-250 rounded-lg dark:hover:bg-blue-500/10 text-slate-900 dark:text-slate-300 px-4 py-2"
							activeClass="dark:!text-slate-100 dark:!bg-blue-500/20"
							addLocale
						>
							Meta
						</A>
					</li>
				</ul>

				<div class="lg:order-2 flex basis-0 gap-4 items-center justify-end order-">
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
