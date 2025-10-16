import { type PolymorphicProps } from "@kobalte/core";
import {
	Tabs as KobalteTabs,
	type TabsRootProps as KobalteTabsRootProps,
	type TabsListProps as KobalteTabsListProps,
	type TabsTriggerProps as KobalteTabsTriggerProps,
	type TabsContentProps as KobalteTabsContentProps,
} from "@kobalte/core/tabs";

export type TabsProps = PolymorphicProps<
	"div",
	Omit<KobalteTabsRootProps, "as">
>;

export function Tabs(props: TabsProps) {
	return <KobalteTabs class="mt-6" {...props} />;
}

export type TabListProps = PolymorphicProps<
	"div",
	Omit<KobalteTabsListProps, "as">
>;

export function TabList(props: TabListProps) {
	return (
		<div class="custom-scrollbar flex overflow-x-auto overflow-y-hidden">
			<KobalteTabs.List
				{...props}
				class="z-1 flex w-full border-b border-blue-200 dark:border-slate-800"
			/>
		</div>
	);
}

export type TabProps = PolymorphicProps<
	"button",
	Omit<KobalteTabsTriggerProps, "as">
>;

export function Tab(props: TabProps) {
	return (
		<KobalteTabs.Trigger
			{...props}
			class="z-2 aria-selected-before:w-full aria-selected:before:border-blue relative top-0.5 appearance-none bg-none px-[16px] py-[4px] outline-none transition-colors duration-150 aria-selected:h-full aria-selected:bg-slate-200 aria-selected:text-black aria-selected:before:absolute aria-selected:before:inset-0 aria-selected:before:border-t aria-selected:before:border-blue-600 aria-selected:dark:bg-slate-800 aria-selected:dark:text-white aria-selected:before:dark:border-blue-200"
		/>
	);
}

export type TabPanelProps = PolymorphicProps<
	"div",
	Omit<KobalteTabsContentProps, "as">
>;

export function TabPanel(props: TabPanelProps) {
	return (
		<KobalteTabs.Content
			{...props}
			class="hidden rounded-b-md bg-white data-[selected]:block dark:bg-slate-950"
		/>
	);
}
