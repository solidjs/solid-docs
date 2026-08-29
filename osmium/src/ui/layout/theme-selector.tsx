import {
	Component,
	ComponentProps,
	createSignal,
	JSX,
	onMount,
	Show,
} from "solid-js";
import { computerDesktop, moon, sun } from "solid-heroicons/solid";
import { Select } from "@kobalte/core/select";
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
		<Select<ThemeOption>
			options={THEME_OPTIONS}
			optionValue="value"
			optionTextValue="label"
			value={selectedTheme()}
			onChange={(option) => {
				setTheme(option?.value);
			}}
			allowDuplicateSelectionEvents
			gutter={10}
			sameWidth={false}
			placement="bottom-end"
			itemComponent={(props) => (
				<Select.Item
					class="group text-text hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:ring-focus kb-selected:border-action kb-selected:bg-action-muted kb-selected:text-action flex min-h-11 cursor-pointer items-center rounded border-l-2 border-transparent px-3 py-1 font-medium outline-none select-none focus-visible:ring-2 lg:min-h-8"
					item={props.item}
				>
					<Select.ItemLabel>
						<Icon
							class="mr-2 inline-block size-5 fill-current"
							path={props.item.rawValue.icon}
						/>
						<span class="text-sm">{props.item.rawValue.label}</span>
					</Select.ItemLabel>
				</Select.Item>
			)}
		>
			<Select.Trigger
				class="text-text-muted hover:bg-surface-muted hover:text-text focus-visible:ring-focus focus-visible:ring-offset-surface flex size-11 shrink-0 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:size-8"
				aria-label="Change theme mode"
			>
				<Select.Value<ThemeOption>>
					{(state) => (
						<RefreshOnMount aria-label={state.selectedOption().label}>
							<Icon
								class="size-4 fill-current"
								path={state.selectedOption().icon}
							/>
						</RefreshOnMount>
					)}
				</Select.Value>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content class="border-border bg-surface-raised text-text z-50 w-36 space-y-1 rounded border p-1 text-sm shadow-lg">
					<Select.Listbox />
				</Select.Content>
			</Select.Portal>
		</Select>
	);
};

function RefreshOnMount(props: ComponentProps<"div">) {
	// incorrect value on server with no runtime, refresh on mount to update possibly incorrect label
	const [refresh, setRefresh] = createSignal(false);
	onMount(() => {
		setRefresh(true);
	});

	return (
		<Show
			when={refresh()}
			fallback={
				<div {...props}>
					<div>{props.children}</div>
				</div>
			}
			keyed
		>
			<div {...props}>{props.children}</div>
		</Show>
	);
}
