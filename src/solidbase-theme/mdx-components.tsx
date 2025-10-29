import {
	For,
	Match,
	type ParentProps,
	Switch,
	children,
	createMemo,
	splitProps,
} from "solid-js";
import { isServer } from "solid-js/web";

import { A } from "~/ui/i18n-anchor";
import { Callout } from "~/ui/callout";
import { Tabs, TabList, TabPanel, Tab } from "~/ui/tabs";

export { EditPageLink } from "~/ui/edit-page-link";
export { PageIssueLink } from "~/ui/page-issue-link";
export { Callout } from "~/ui/callout";
export { QuickLinks } from "~/ui/quick-links";
export { ImageLinks } from "~/ui/image-links";

type CalloutType = "note" | "tip" | "advanced" | "caution" | "danger";

export const DirectiveContainer = (
	props: {
		type: "tab-group" | "tab" | CalloutType;
		title?: string;
		codeGroup?: string;
		tabNames?: string;
	} & ParentProps
) => {
	const _children = children(() => props.children).toArray();
	const tabNames = createMemo(() => props.tabNames?.split("\0") ?? []);

	return (
		<Switch
			fallback={
				<Callout
					type={props.type as CalloutType}
					title={props.title}
					children={_children}
				/>
			}
		>
			<Match when={props.type === "tab"}>{_children}</Match>
			<Match when={props.type === "tab-group"}>
				<Tabs>
					<TabList>
						<For each={tabNames()}>
							{(title) => <Tab value={title}>{title}</Tab>}
						</For>
					</TabList>
					<For each={tabNames()}>
						{(title, idx) => (
							<TabPanel value={title} forceMount={true}>
								{_children[idx()]}
							</TabPanel>
						)}
					</For>
				</Tabs>
			</Match>
		</Switch>
	);
};

export const strong = (props: ParentProps) => (
	<b class="font-semibold">{props.children}</b>
);
export const ssr = (props: ParentProps) => <>{props.children}</>;
export const spa = () => <></>;
export const h1 = (props: ParentProps) => (
	<h1 {...props} class="prose-headings:font-normal">
		{props.children}
	</h1>
);
export const h2 = (props: ParentProps) => {
	return (
		<h2
			{...props}
			class="prose-headings:scroll-mt-28 prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
		>
			{props.children}
		</h2>
	);
};
export const h3 = (props: ParentProps) => {
	return (
		<h3
			{...props}
			class="prose-headings:scroll-mt-28 prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
		>
			{props.children}
		</h3>
	);
};
export const h4 = (props: ParentProps) => {
	return (
		<h4
			{...props}
			class="prose-headings:scroll-mt-28 prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
		>
			{props.children}
		</h4>
	);
};
export const h5 = (props: ParentProps) => {
	return (
		<h5
			{...props}
			class="prose-headings:scroll-mt-28 prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
		>
			{props.children}
		</h5>
	);
};
export const h6 = (props: ParentProps) => (
	<h6
		{...props}
		class="prose-headings:scroll-mt-28 prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
	>
		{props.children}
	</h6>
);
export const a = (props: ParentProps & { href: string }) => {
	const [, rest] = splitProps(props, ["children"]);
	const resolved = children(() => props.children);
	const resolvedArray = resolved.toArray();

	// Check if the link is a code block
	if (
		// Server side
		(isServer &&
			resolvedArray[0] &&
			typeof resolvedArray[0] === "object" &&
			"t" in resolvedArray[0] &&
			typeof resolvedArray[0].t === "string" &&
			resolvedArray[0].t.substring(0, 5) === "<code") ||
		// Client side
		(!isServer &&
			resolvedArray[0] instanceof Element &&
			resolvedArray[0].nodeName === "CODE")
	) {
		return (
			<A
				addLocale
				class="[&>code]:shadow-[0_0_0_1.5px_#2563eb] hover:[&>code]:shadow-[0_0_0_2px_#1e3a8a] dark:[&>code]:shadow-[0_0_0_1.5px_#38bdf8] dark:hover:[&>code]:shadow-[0_0_0_2px_#7dd3fc]"
				{...rest}
			>
				{resolved()}
			</A>
		);
	} else {
		return (
			<A
				addLocale
				class="font-semibold text-blue-800 no-underline shadow-[inset_0_calc(-1*(var(--tw-prose-underline-size,0.5px)+2px))_0_0_var(--tw-prose-underline,theme(colors.blue.400))] [--tw-prose-background:theme(colors.slate.50)] hover:[--tw-prose-underline-size:4px] dark:text-blue-300 dark:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.blue.500))] dark:[--tw-prose-background:theme(colors.slate.900)] dark:hover:[--tw-prose-underline-size:6px]"
				{...rest}
			>
				{resolved()}
			</A>
		);
	}
};
export const p = (props: ParentProps) => (
	<p {...props} class="my-4">
		{props.children}
	</p>
);
export const li = (props: ParentProps) => (
	<li {...props} class="mb-2 marker:text-slate-600 dark:marker:text-slate-300">
		{props.children}
	</li>
);
export const ul = (props: ParentProps) => (
	<ul {...props} class="mb-2 list-disc pl-6">
		{props.children}
	</ul>
);
export const ol = (props: ParentProps) => (
	<ol {...props} class="mb-2 list-decimal pl-8">
		{props.children}
	</ol>
);
export const nav = (props: ParentProps) => (
	<nav {...props}>{props.children}</nav>
);
export const TesterComponent = () => (
	<p>
		Remove This Now!!! If you see this it means that markdown custom components
		does work
	</p>
);
export const pre = (props: ParentProps) => {
	return (
		<pre
			{...props}
			class="custom-scrollbar [&>code]:bg-white [&>code]:p-0 [&>code]:text-sm [&>code]:leading-normal dark:[&>code]:!bg-slate-950"
		>
			{props.children}
		</pre>
	);
};
export const code = (props: ParentProps) => {
	return (
		<code
			class="not-prose inline-block rounded-lg bg-blue-200 px-1 py-0.5 !font-mono text-[0.8em] font-semibold leading-snug text-slate-900 dark:bg-slate-600/60 dark:text-white"
			{...props}
		>
			{props.children}
		</code>
	);
};
export const table = (props: ParentProps) => <table>{props.children}</table>;
export const th = (props: ParentProps) => <th>{props.children}</th>;
export const thead = (props: ParentProps) => <thead>{props.children}</thead>;
export const td = (props: ParentProps) => <td>{props.children}</td>;
export const tr = (props: ParentProps) => <tr>{props.children}</tr>;
export const hr = (props: ParentProps) => {
	return <hr {...props} class="dark:prose-hr:border-slate-900" />;
};
export const response = (props: ParentProps) => {
	return <span>{props.children}</span>;
};
// export const void = (props: ParentProps) => {
// 	return <span>{props.children}</span>;
// }
export const unknown = (props: ParentProps) => {
	return <span>{props.children}</span>;
};

export function Steps(props: ParentProps) {
	return <div class="steps">{props.children}</div>;
}

export function Step(props: ParentProps) {
	return <div class="step">{props.children}</div>;
}
