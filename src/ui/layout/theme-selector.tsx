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
					class="flex cursor-pointer select-none items-center rounded-[0.625rem] p-1 hover:bg-slate-200 hover:dark:bg-slate-600 group kb-selected:bg-slate-200 kb-selected:dark:bg-slate-700 kb-selected:font-semibold outline-none"
					item={props.item}
				>
					<Select.ItemLabel>
						<Icon
							class="inline-block h-6 w-6 mr-2 rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5 fill-slate-700 dark:fill-slate-200 kb-selected:fill-slate-800 kb-selected:dark:fill-white"
							path={props.item.rawValue.icon}
						/>
						<span class="prose prose-slate text-sm group-hover:dark:text-white text-slate-700 dark:text-slate-300 kb-selected:text-blue-500 kb-selected:group-hover:dark:text-white">
							{props.item.rawValue.label}
						</span>
					</Select.ItemLabel>
				</Select.Item>
			)}
		>
			<Select.Trigger
				class="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-slate-800 dark:ring-inset dark:ring-white/60 shrink-0"
				aria-label="Change theme mode"
			>
				<Select.Value<ThemeOption>>
					{(state) => (
						<RefreshOnMount aria-label={state.selectedOption().label}>
							<Icon
								class="w-4 h-4 fill-slate-700 dark:fill-slate-200"
								path={state.selectedOption().icon}
							/>
						</RefreshOnMount>
					)}
				</Select.Value>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content class="z-50 w-36 space-y-1 rounded-xl bg-white p-2 text-sm shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
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
