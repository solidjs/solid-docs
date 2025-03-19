import {
	Tabs as KobalteTabs,
	type TabsRootProps as KobalteTabsRootProps,
	type TabsListProps as KobalteTabsListProps,
	type TabsTriggerProps as KobalteTabsTriggerProps,
	type TabsContentProps as KobalteTabsContentProps,
} from "@kobalte/core/tabs";
import { ComponentProps } from "solid-js";

export type TabsProps = ComponentProps<"div"> &
	Omit<KobalteTabsRootProps, "as">;

export function Tabs(props: TabsProps) {
	return <KobalteTabs {...props} />;
}

export type TabListProps = ComponentProps<"div"> &
	Omit<KobalteTabsListProps, "as">;

export function TabList(props: TabListProps) {
	return (
		<KobalteTabs.List {...props} class="mb-2 border-b-2 border-slate-800" />
	);
}

export type TabProps = ComponentProps<"button"> &
	Omit<KobalteTabsTriggerProps, "as">;

export function Tab(props: TabProps) {
	return (
		<KobalteTabs.Trigger
			{...props}
			class="px-5 py-1 relative top-0.5 transition-colors duration-300 aria-selected:font-bold aria-selected:dark:text-slate-300 aria-selected:text-blue-500 aria-selected:border-b-2 aria-selected:border-blue-400"
		/>
	);
}

export type TabPanelProps = ComponentProps<"div"> &
	Omit<KobalteTabsContentProps, "id">;

export function TabPanel(props: TabPanelProps) {
	return (
		<KobalteTabs.Content {...props} class="hidden data-[selected]:block" />
	);
}
