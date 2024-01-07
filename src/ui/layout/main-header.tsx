import { createSignal, onCleanup, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { isServer } from "solid-js/web";

import { Logo, GitHubIcon } from "~/ui/logo";
import { ThemeSelector } from "./theme-selector";

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
			class="sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-2 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8 backdrop-blur w-screen -mx-6"
			classList={{
				"dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75":
					isScrolled(),
				"dark:bg-transparent bg-transparent": !isScrolled(),
			}}
		>
			<div class="flex lg:hidden">{/* <MobileNavigation /> */}</div>
			<A href="/" aria-label="Home page" class="ml-6">
				<Logo class="h-9" />
			</A>
			<div class="flex basis-0">
				<ThemeSelector />
				<A href="https://github.com" class="group ml-3" aria-label="GitHub">
					<GitHubIcon class="h-6 w-6 dark:fill-slate-400 group-hover:dark:fill-slate-500 dark:group-hover:fill-slate-300" />
				</A>
			</div>
		</header>
	);
}
