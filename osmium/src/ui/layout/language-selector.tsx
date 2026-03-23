import { Component, For, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { language } from "solid-heroicons/solid";
import { ResolvedLocale, useLocale } from "@kobalte/solidbase/client";
import { Select } from "@kobalte/core/select";
import { OsmiumThemeConfig } from "~/index";

export const LanguageSelector: Component = () => {
	const { locales, currentLocale, setLocale } = useLocale();

	return (
		<Show when={locales.length > 1}>
			{(_) => {
				return (
					<Select<ResolvedLocale<OsmiumThemeConfig>>
						value={currentLocale()}
						options={locales}
						optionValue="code"
						optionTextValue={(v) => v.config.label}
						allowDuplicateSelectionEvents
						onChange={(option) => option && setLocale(option)}
						gutter={8}
						sameWidth={false}
						placement="bottom"
						itemComponent={(props) => (
							<Select.Item
								class="ui-selected:bg-slate-200 ui-selected:dark:bg-slate-700 ui-selected:font-medium group flex cursor-pointer select-none items-center rounded-[0.625rem] p-1 hover:bg-slate-200 hover:dark:bg-slate-600"
								item={props.item}
							>
								<Select.ItemLabel class="prose prose-slate pl-1 text-sm text-slate-700 dark:text-slate-300 group-hover:dark:text-white">
									{props.item.rawValue.config.label}
								</Select.ItemLabel>
							</Select.Item>
						)}
					>
						<Select.Trigger
							class="flex h-6 w-[4.5rem] items-center rounded-lg text-left shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-slate-800 dark:ring-inset dark:ring-white/60"
							aria-label="change locale"
						>
							<Icon
								class="w-4 fill-slate-700 pl-1 dark:fill-slate-200"
								path={language}
							/>
							<Select.Value<
								ResolvedLocale<OsmiumThemeConfig>
							> class="prose prose-slate w-16 truncate pl-1 text-sm text-slate-700 dark:text-slate-300">
								{(state) => state.selectedOption().config.label}
							</Select.Value>
						</Select.Trigger>
						<Select.Portal>
							<Select.Content class="z-50 w-44 space-y-1 rounded-xl bg-white p-2 text-sm shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
								<Select.Listbox />
							</Select.Content>
						</Select.Portal>
					</Select>
				);
			}}
		</Show>
	);
};
