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
			class={`sticky top-0 z-10 flex flex-none flex-wrap items-center justify-between px-4 py-2 bg-sky-100/40  
				shadow-md dark:shadow-slate-900/5 dark:shadow-none sm:px-6 lg:px-8 backdrop-blur ${
					isScrolled()
						? "dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75"
						: "dark:bg-transparent bg-transparent"
				}`}
		>
			<div class="mr-6 flex lg:hidden">{/* <MobileNavigation /> */}</div>
			<div class="relative flex flex-grow basis-0 items-center">
				<A href="/" aria-label="Home page">
					<Logo class="h-9 w-auto" />
				</A>
			</div>
			<div class="-my-5 mr-6 sm:mr-8 md:mr-0">{/* <Search /> */}</div>
			<div class="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
				<ThemeSelector />
				<A href="https://github.com" class="group" aria-label="GitHub">
					<GitHubIcon class="h-6 w-6 dark:fill-slate-400 group-hover:dark:fill-slate-500 dark:group-hover:fill-slate-300" />
				</A>
			</div>
		</header>
	);
}
