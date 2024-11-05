import { Component, For, JSX, Show } from "solid-js";
import { computerDesktop, moon, sun } from "solid-heroicons/solid";
import { DropdownMenu } from "@kobalte/core";
import {
	getThemeVariant,
	setTheme,
	ThemeType,
} from "@kobalte/solidbase/client";
import { Icon } from "solid-heroicons";

interface ThemeOption {
	value: ThemeType | "system";
	label: string;
	icon: { path: JSX.Element; outline: boolean; mini: boolean };
}

const THEME_OPTIONS: ThemeOption[] = [
	{
		value: "light",
		label: "Light",
		icon: sun,
	},
	{
		value: "dark",
		label: "Dark",
		icon: moon,
	},
	{
		value: "system",
		label: "System",
		icon: computerDesktop,
	},
];

export const ThemeSelector: Component = () => {
	const selectedTheme = () =>
		THEME_OPTIONS.find((t) => t.value === getThemeVariant());

	return (
		<DropdownMenu.Root gutter={10}>
			<DropdownMenu.Trigger class="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-slate-800 dark:ring-inset dark:ring-white/60 shrink-0">
				<Show when={selectedTheme()} fallback={<></>} keyed>
					{(theme) => {
						return (
							<Icon
								class="w-4 h-4 fill-slate-700 dark:fill-slate-200"
								path={theme.icon}
							/>
						);
					}}
				</Show>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content class="z-50 w-36 space-y-1 rounded-xl bg-white p-2 text-sm shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
					<For each={THEME_OPTIONS}>
						{(theme) => (
							<DropdownMenu.Item
								class="flex cursor-pointer select-none items-center rounded-[0.625rem] p-1 hover:bg-slate-200 hover:dark:bg-slate-600 group"
								classList={{
									"bg-slate-200 dark:bg-slate-700 font-semibold":
										selectedTheme()!.value === theme.value,
								}}
								closeOnSelect={true}
								onSelect={() => {
									setTheme(theme.value);
								}}
							>
								<Icon
									class="h-6 w-6 mr-2 rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"
									classList={{
										"fill-slate-800 dark:fill-white":
											selectedTheme()!.value === theme.value,
										"fill-slate-700 dark:fill-slate-200":
											selectedTheme()!.value !== theme.value,
									}}
									path={theme.icon}
								/>
								<span
									class="prose prose-slate text-sm group-hover:dark:text-white"
									classList={{
										"text-blue-500 group-hover:dark:text-white":
											selectedTheme()!.value === theme.value,
										"text-slate-700 dark:text-slate-300":
											selectedTheme()!.value !== theme.value,
									}}
								>
									{theme.label}
								</span>
							</DropdownMenu.Item>
						)}
					</For>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
