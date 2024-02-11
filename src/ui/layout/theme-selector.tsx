import {
	Component,
	For,
	createEffect,
	createMemo,
	createSignal,
	onMount,
} from "solid-js";
import { sun, moon, computerDesktop } from "solid-heroicons/solid";
import { DropdownMenu } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { isServer } from "solid-js/web";

interface Theme {
	name: string;
	value: string;
	icon: {
		path: JSX.Element;
		outline?: boolean;
		mini?: boolean;
	};
	theme: string;
}

export const ThemeSelector: Component = () => {
	const systemTheme =
		!isServer && window.matchMedia("(prefers-color-scheme: dark)").matches
			? { value: "dark", theme: "material-theme-ocean" }
			: { value: "light", theme: "min-light" };

	const themes: Theme[] = [
		{ name: "Light", value: "light", icon: sun, theme: "min-light" },
		{ name: "Dark", value: "dark", icon: moon, theme: "material-theme-ocean" },
		{
			name: "System",
			value: systemTheme.value,
			icon: computerDesktop,
			theme: systemTheme.theme,
		},
	];

	const [selectedTheme, setSelectedTheme] = createSignal<Theme>(themes[2]);

	createEffect(() => {
		document.documentElement.className = selectedTheme()!.value;
		document.documentElement.dataset.theme = selectedTheme()!.theme;
	});
	return (
		<DropdownMenu.Root modal={true} gutter={10}>
			<DropdownMenu.Trigger
				aria-label="theme"
				class="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-500 dark:ring-inset dark:ring-white/20"
			>
				<Icon class="w-4 h-4" path={selectedTheme()!.icon} />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content class="z-50 w-36 space-y-1 rounded-xl bg-white p-2 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
					<For each={themes}>
						{(theme) => (
							<DropdownMenu.Item
								class="flex cursor-pointer select-none items-center rounded-[0.625rem] p-1 hover:bg-slate-200"
								classList={{
									"bg-slate-100 dark:bg-slate-900/40":
										selectedTheme()!.name === theme.name,
								}}
								closeOnSelect={true}
								onSelect={() => {
									console.log(theme);
									setSelectedTheme(theme);
								}}
							>
								<Icon
									class={`h-6 w-6 mr-2 rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5 `}
									classList={{
										"fill-sky-400": selectedTheme()!.name === theme.name,
										"fill-slate-400": selectedTheme()!.name !== theme.name,
									}}
									path={theme.icon}
								/>
								<span
									class="font-semibold prose prose-slate text-sm"
									classList={{
										"text-sky-500": selectedTheme()!.name === theme.name,
										"text-slate-700 dark:text-slate-300":
											selectedTheme()!.value !== theme.name,
									}}
								>
									{theme.name}
								</span>
							</DropdownMenu.Item>
						)}
					</For>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
