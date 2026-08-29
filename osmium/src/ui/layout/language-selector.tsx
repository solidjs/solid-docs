import { Component, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { language } from "solid-heroicons/solid";
import { ResolvedLocale, useLocale } from "@kobalte/solidbase/client";
import { Select } from "@kobalte/core/select";
import { OsmiumThemeConfig } from "../..";

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
								class="group text-text hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:ring-focus ui-selected:border-action ui-selected:bg-action-muted ui-selected:text-action flex min-h-11 cursor-pointer items-center rounded border-l-2 border-transparent px-3 py-1 font-medium select-none focus-visible:ring-2 focus-visible:outline-none lg:min-h-8"
								item={props.item}
							>
								<Select.ItemLabel class="text-sm">
									{props.item.rawValue.config.label}
								</Select.ItemLabel>
							</Select.Item>
						)}
					>
						<Select.Trigger
							class="text-text-muted hover:bg-surface-muted hover:text-text focus-visible:ring-focus focus-visible:ring-offset-surface flex size-11 shrink-0 items-center justify-center rounded text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:size-8"
							aria-label="Change language"
						>
							<Icon class="size-4 shrink-0 fill-current" path={language} />
						</Select.Trigger>
						<Select.Portal>
							<Select.Content class="border-border bg-surface-raised text-text z-50 w-44 space-y-1 rounded border p-1 text-sm shadow-lg">
								<Select.Listbox />
							</Select.Content>
						</Select.Portal>
					</Select>
				);
			}}
		</Show>
	);
};
