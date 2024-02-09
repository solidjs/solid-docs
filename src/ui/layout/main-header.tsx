import { createSignal, onCleanup, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { isServer } from "solid-js/web";

import { Logo, GitHubIcon, DiscordIcon } from "~/ui/logo";
import { ThemeSelector } from "./theme-selector";
import { MobileNavigation } from "./mobile-navigation";

export function MainHeader() {
	const [isScrolled, setIsScrolled] = createSignal(false);

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
			class="sticky top-0 z-50 max-w-8xl mx-auto flex items-center justify-between bg-blue-100/80  shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none backdrop-blur"
			classList={{
				"dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75":
					isScrolled(),
				"dark:bg-transparent bg-transparent": !isScrolled(),
			}}
		>
			<div class="flex justify-between pt-4 px-4 items-center w-full">
				<div class="flex md:hidden">
					<MobileNavigation />
				</div>
				<A href="/" aria-label="Home page">
					<Logo class="h-9" />
				</A>

				<div class="flex basis-0 gap-4">
					<A
						href="https://github.com/solidjs/solid"
						class="group"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon class="h-6 w-6 dark:fill-slate-400 group-hover:dark:fill-slate-500 dark:group-hover:fill-slate-300" />
					</A>
					<A
						href="https://discord.com/invite/solidjs"
						class="group"
						aria-label="Discord"
						target="_blank"
						rel="noopener noreferrer"
					>
						<DiscordIcon class="h-6 w-6 dark:fill-slate-400 group-hover:dark:fill-slate-500 dark:group-hover:fill-slate-300" />
					</A>
					<ThemeSelector />
				</div>
			</div>
		</header>
	);
}
