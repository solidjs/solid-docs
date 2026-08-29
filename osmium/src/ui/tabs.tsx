import type { PolymorphicProps } from "@kobalte/core";
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
	return <KobalteTabs {...props} />;
}

export type TabListProps = PolymorphicProps<
	"div",
	Omit<KobalteTabsListProps, "as">
>;

export function TabList(props: TabListProps) {
	return (
		<div class="content-tabs-scroll custom-scrollbar border-border mb-2 flex overflow-x-auto border-b">
			<KobalteTabs.List {...props} class="content-tabs-list flex min-w-max" />
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
			class="content-tab text-text-subtle hover:text-text focus-visible:outline-focus aria-selected:border-action aria-selected:text-action relative top-px inline-flex min-h-11 shrink-0 items-center rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] lg:min-h-9 lg:py-1"
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
			class="content-tab-panel kb-selected:block hidden"
		/>
	);
}
