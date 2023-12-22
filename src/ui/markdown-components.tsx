import {
	createEffect,
	createUniqueId,
	ParentProps,
	mergeProps,
	type JSXElement,
} from "solid-js";
import { Callout, CalloutProps } from "~/ui/callout";
import { TabsCodeBlocks } from "~/ui/tab-code-blocks";

export default {
	strong: (props: ParentProps) => (
		<span class="font-semibold leading-relaxed">{props.children}</span>
	),
	Callout: (props: CalloutProps) => (
		<Callout title={props.title} type={props.type}>
			{props.children}
		</Callout>
	),
	TabsCodeBlocks: (props: ParentProps) => (
		<TabsCodeBlocks>{props.children}</TabsCodeBlocks>
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
	a: (props: ParentProps) => {
		return (
			<a
				{...props}
				class={`no-underline shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#38bdf8),inset_0_calc(-1*(var(--tw-prose-underline-size,2px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.400))] hover:[--tw-prose-underline-size:4px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:[--tw-prose-underline-size:6px] dark:text-sky-400 text-sky-700 font-semibold`}
			>
				{props.children}
			</a>
		);
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
				class="[&>code]:bg-transparent [&>code]:p-0 [&>code]:text-sm [&>code]:leading-normal custom-scroll-bar"
			>
				{props.children}
			</pre>
		);
	},
	code: (props: ParentProps) => {
		return (
			<code
				class={`inline-block not-prose text-mono bg-slate-800/40 px-1.5 py-0.5 rounded-lg text-[0.8em] leading-snug text-slate-200`}
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
		return <hr {...props} class="dark:prose-hr:border-slate-800" />;
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
