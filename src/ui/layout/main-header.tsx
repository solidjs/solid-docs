import { Show, createSignal, onCleanup, onMount } from "solid-js";
import { A } from "~/ui/i18n-anchor";
import { isServer } from "solid-js/web";

import { Logo, GitHubIcon, DiscordIcon } from "~/ui/logo";
import { ThemeSelector } from "./theme-selector";
import { MobileNavigation } from "./mobile-navigation";
import { useMatch } from "@solidjs/router";
import { SUPPORTED_LOCALES } from "~/i18n/config";
import { LanguageSelector } from "./language-selector";

export function MainHeader() {
	const [isScrolled, setIsScrolled] = createSignal(false);
	const notSolidCore = useMatch(() => "/:project/*", {
		project: ["solid-router", "solid-start", "solid-metadata"],
	});
	const translatedLocale = useMatch(() => "/:locale/:project/*", {
		locale: SUPPORTED_LOCALES,
		project: ["solid-router", "solid-start", "solid-metadata"],
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

	return (
		<header
			class="sticky top-0 z-50 flex items-center justify-between bg-blue-50/80 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none backdrop-blur"
			classList={{
				"dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75":
					isScrolled(),
				"dark:bg-transparent bg-transparent": !isScrolled(),
			}}
		>
			<div class="grid grid-cols-[1fr,2fr,1fr] py-2 px-4 items-center w-full max-w-8xl mx-auto ">
				<div class="flex md:hidden">
					<MobileNavigation />
				</div>
				<A href="/" aria-label="Home page" addLocale>
					<Logo class="h-9" />
				</A>

				<ul class="flex gap-5 justify-center">
					<li>
						<A
							href="/"
							class={`text-slate-200 relative overflow-hidden drop-shadow-[0_35px_35px_rgba(1,1,1,1.75)] px-2 `}
							classList={{
								"border-b-2 border-b-blue-500 dark:bottom-b-blue-500 transition-all duration-250":
									!notSolidCore() && !translatedLocale(),
							}}
							addLocale
						>
							Solid Core
							<span class="absolute w-full h-1 left-0 bottom-0 drop-shadow-[0_35px_35px_rgba(1,1,1,1.75)] " />
						</A>
					</li>
					<li>
						<A
							href="/solid-router"
							class="text-slate-200 px-2"
							activeClass="border-b-2 border-b-blue-500 dark:bottom-b-blue-500 transition-all duration-250"
							addLocale
						>
							Solid-Router
						</A>
					</li>
					<li>
						<span class="text-slate-400">
							SolidStart
							<span>
								<abbr
									title="coming soon"
									class="text-[0.5em] relative -top-2 left-1 no-underline text-slate-200 border py-px px-1 rounded-md border-slate-300"
								>
									soon
								</abbr>
							</span>
						</span>
					</li>
					<li>
						<span class="text-slate-400">
							Solid-Meta
							<span>
								<abbr
									title="coming soon"
									class="text-[0.5em] relative -top-2 left-1 no-underline text-slate-200 border py-px px-1 rounded-md border-slate-300"
								>
									soon
								</abbr>
							</span>
						</span>
					</li>
				</ul>

				<div class="flex basis-0 gap-4 justify-end">
					<A
						href="https://github.com/solidjs/solid"
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
