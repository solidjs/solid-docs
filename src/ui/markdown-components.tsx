import { type ParentProps, children, splitProps } from "solid-js";
import { A } from "~/ui/i18n-anchor";
import { isServer } from "solid-js/web";
import { Callout, CalloutProps } from "~/ui/callout";
import { TabsCodeBlocks } from "~/ui/tab-code-blocks";
import { QuickLinks, QuickLinksProps } from "~/ui/quick-links";
import { ImageLinks, ImageLinksProps } from "~/ui/image-links";
import { clientOnly } from "@solidjs/start";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";

const EraserLink = clientOnly(() => import("./eraser-link/index"));

export default {
	strong: (props: ParentProps) => (
		<span class="font-semibold leading-relaxed">{props.children}</span>
	),
	EditPageLink: () => <EditPageLink />,
	PageIssueLink: () => <PageIssueLink />,
	Callout: (props: CalloutProps) => (
		<Callout title={props.title} type={props.type}>
			{props.children}
		</Callout>
	),
	EraserLink: (props: ParentProps<{ href: string; preview: string }>) => {
		const [, rest] = splitProps(props, ["children"]);

		if (!isServer) {
			return <EraserLink {...rest} />;
		} else {
			return (
				<a
					aria-hidden={true}
					tabIndex="-1"
					href={props.href}
					class={`no-underline shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#38bdf8),inset_0_calc(-1*(var(--tw-prose-underline-size,2px)+2px))_0_0_var(--tw-prose-underline,theme(colors.blue.400))] hover:[--tw-prose-underline-size:4px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.blue.800))] dark:hover:[--tw-prose-underline-size:6px] dark:text-blue-400 text-blue-700 font-semibold`}
					rel="noopener noreferrer"
				>
					View on Eraser
					<img src={props.preview} />
				</a>
			);
		}
	},
	TabsCodeBlocks: (props: ParentProps) => (
		<TabsCodeBlocks>{props.children}</TabsCodeBlocks>
	),
	QuickLinks: (props: QuickLinksProps) => (
		<QuickLinks title={props.title} icon={props.icon} href={props.href}>
			{props.children}
		</QuickLinks>
	),
	ImageLinks: (props: ImageLinksProps) => (
		<ImageLinks title={props.title} href={props.href} logo={props.logo} />
	),
	ssr: (props: ParentProps) => <>{props.children}</>,
	spa: () => <></>,
	h1: (props: ParentProps) => (
		<h1
			{...props}
			class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
		>
			{props.children}
		</h1>
	),
	h2: (props: ParentProps) => {
		return (
			<>
				<hr class="dark:prose-hr:border-slate-800 border-slate-400 my-8" />
				<h2
					{...props}
					class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
				>
					{props.children}
				</h2>
			</>
		);
	},
	h3: (props: ParentProps) => {
		return (
			<h3
				{...props}
				class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
			>
				{props.children}
			</h3>
		);
	},
	h4: (props: ParentProps) => {
		return (
			<h4
				{...props}
				class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
			>
				{props.children}
			</h4>
		);
	},
	h5: (props: ParentProps) => {
		return (
			<h5
				{...props}
				class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
			>
				{props.children}
			</h5>
		);
	},
	h6: (props: ParentProps) => (
		<h6
			{...props}
			class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
		>
			{props.children}
		</h6>
	),
	a: (props: ParentProps & { href: string }) => {
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
					class={`no-underline shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#38bdf8),inset_0_calc(-1*(var(--tw-prose-underline-size,2px)+2px))_0_0_var(--tw-prose-underline,theme(colors.blue.400))] hover:[--tw-prose-underline-size:4px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.blue.500))] dark:hover:[--tw-prose-underline-size:6px] dark:text-blue-300 text-blue-800 font-semibold`}
					{...rest}
				>
					{resolved()}
				</A>
			);
		}
	},
	p: (props: ParentProps) => (
		<p {...props} class="my-4">
			{props.children}
		</p>
	),
	li: (props: ParentProps) => (
		<li
			{...props}
			class="mb-2 marker:text-slate-600 dark:marker:text-slate-300"
		>
			{props.children}
		</li>
	),
	ul: (props: ParentProps) => (
		<ul {...props} class="pl-6 mb-2 list-disc">
			{props.children}
		</ul>
	),
	ol: (props: ParentProps) => (
		<ol {...props} class="list-decimal pl-8 mb-2">
			{props.children}
		</ol>
	),
	nav: (props: ParentProps) => <nav {...props}>{props.children}</nav>,
	TesterComponent: () => (
		<p>
			Remove This Now!!! If you see this it means that markdown custom
			components does work
		</p>
	),
	pre: (props: ParentProps) => {
		return (
			<pre
				{...props}
				class="[&>code]:bg-white dark:[&>code]:!bg-slate-950 [&>code]:p-0 [&>code]:text-sm [&>code]:leading-normal custom-scroll-bar"
			>
				{props.children}
			</pre>
		);
	},
	code: (props: ParentProps) => {
		return (
			<code
				class="inline-block not-prose !font-mono font-medium bg-blue-200 dark:bg-slate-600/60 text-slate-900 dark:text-white px-1 py-0.5 rounded-lg text-[0.8em] leading-snug"
				{...props}
			>
				{props.children}
			</code>
		);
	},
	table: (props: ParentProps) => <table>{props.children}</table>,
	th: (props: ParentProps) => <th>{props.children}</th>,
	thead: (props: ParentProps) => <thead>{props.children}</thead>,
	td: (props: ParentProps) => <td>{props.children}</td>,
	tr: (props: ParentProps) => <tr>{props.children}</tr>,
	hr: (props: ParentProps) => {
		return <hr {...props} class="dark:prose-hr:border-slate-900" />;
	},
	response: (props: ParentProps) => {
		return <span>{props.children}</span>;
	},
	void: (props: ParentProps) => {
		return <span>{props.children}</span>;
	},
	unknown: (props: ParentProps) => {
		return <span>{props.children}</span>;
	},
};
