import { Show, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { A } from "~/ui/i18n-anchor";
import { isServer } from "solid-js/web";

import { Logo, GitHubIcon, DiscordIcon } from "~/ui/logo";
import { ThemeSelector } from "./theme-selector";
import { MobileNavigation } from "./mobile-navigation";
import { useMatch } from "@solidjs/router";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { LanguageSelector } from "./language-selector";

import { Search } from "../search";
import { useCurrentRouteMetaData } from "~/utils/route-metadata-helper";

interface Entry {
	title: string;
	path: string;
	children?: Entry[];
	mainNavExclude: boolean;
	isTranslated?: boolean;
}

type EntryList = { learn: Entry[]; reference: Entry[] };

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

				<ul class="order-2 col-span-2 lg:col-span-1 flex pt-6 lg:pt-0 lg:w-auto w-full gap-5 justify-center">
					<li>
						<A
							href="/"
							class="text-slate-900 dark:text-slate-200 relative overflow-hidden drop-shadow-[0_35px_35px_rgba(1,1,1,1.75)] px-2"
							classList={{
								"border-b-2 border-b-blue-500 dark:bottom-b-blue-500 transition-all duration-250":
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
							class="text-slate-900 dark:text-slate-200 px-2"
							activeClass="border-b-2 border-b-blue-500 dark:bottom-b-blue-500 transition-all duration-250"
							addLocale
						>
							Router
						</A>
					</li>
					<li>
						<A
							href="/solid-start"
							class="text-slate-900 dark:text-slate-200 px-2"
							activeClass="border-b-2 border-b-blue-500 dark:bottom-b-blue-500 transition-all duration-250"
							addLocale
						>
							SolidStart
						</A>
					</li>
					<li>
						<A
							href="/solid-meta"
							class="text-slate-900 dark:text-slate-200 px-2"
							activeClass="border-b-2 border-b-blue-500 dark:bottom-b-blue-500 transition-all duration-250"
							addLocale
						>
							Meta
						</A>
					</li>
				</ul>

				<div class="lg:order-2 flex basis-0 gap-4 items-center justify-end order-">
					<Search />
					<A
						href={`https://github.com/solidjs${currentRouteMetaData().project ? currentRouteMetaData().project : "/solid"}`}
						class="group"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon class="h-6 w-6 fill-slate-800 dark:fill-slate-200 group-hover:dark:fill-white dark:group-hover:fill-slate-300" />
					</A>
					<A
						href="https://discord.com/invite/solidjs"
						class="group"
						aria-label="Discord"
						target="_blank"
						rel="noopener noreferrer"
					>
						<DiscordIcon class="h-6 w-6 fill-slate-800 dark:fill-slate-200 group-hover:dark:fill-white dark:group-hover:fill-slate-300" />
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
