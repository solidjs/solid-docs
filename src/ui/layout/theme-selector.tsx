import { Component, For } from "solid-js";
import { DropdownMenu } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { useThemeContext } from "~/data/theme-provider";

export const ThemeSelector: Component = () => {
	const ctx = useThemeContext();
	const selectedTheme = ctx.selectedTheme;
	const setSelectedTheme = ctx.setSelectedTheme;
	return (
		<DropdownMenu.Root gutter={10}>
			<DropdownMenu.Trigger class="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-slate-800 dark:ring-inset dark:ring-white/60 shrink-0">
				<Icon
					class="w-4 h-4 fill-slate-700 dark:fill-slate-200"
					path={selectedTheme()!.icon}
				/>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content class="z-50 w-36 space-y-1 rounded-xl bg-white p-2 text-sm shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
					<For each={ctx.themes}>
						{(theme) => (
							<DropdownMenu.Item
								class="flex cursor-pointer select-none items-center rounded-[0.625rem] p-1 hover:bg-slate-200 hover:dark:bg-slate-600 group"
								classList={{
									"bg-slate-200 dark:bg-slate-700 font-semibold":
										selectedTheme()!.name === theme.name,
								}}
								closeOnSelect={true}
								onSelect={() => {
									setSelectedTheme(theme);
								}}
							>
								<Icon
									class={`h-6 w-6 mr-2 rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5 `}
									classList={{
										"fill-slate-800 dark:fill-white":
											selectedTheme()!.name === theme.name,
										"fill-slate-700 dark:fill-slate-200":
											selectedTheme()!.name !== theme.name,
									}}
									path={theme.icon}
								/>
								<span
									class="prose prose-slate text-sm group-hover:dark:text-white"
									classList={{
										"text-blue-500 group-hover:dark:text-white":
											selectedTheme()!.name === theme.name,
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
