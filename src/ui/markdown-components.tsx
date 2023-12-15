import { Link } from "@solidjs/router";
import {
	createEffect,
	createUniqueId,
	ParentProps,
	mergeProps,
	type JSXElement,
} from "solid-js";
import { Callout, CalloutProps } from "~/ui/callout";
import { TabsCodeBlocks } from "~/ui/tab-code-blocks";

type DefaultProps = { children: JSXElement };

export default {
	strong: (props: DefaultProps) => (
		<span class="font-bold">{props.children}</span>
	),
	Callout: (props: CalloutProps) => (
		<Callout title={props.title} type={props.type}>
			{props.children}
		</Callout>
	),
	TabsCodeBlocks: (props: DefaultProps) => (
		<TabsCodeBlocks>{props.children}</TabsCodeBlocks>
	),
	ssr: (props: DefaultProps) => <>{props.children}</>,
	spa: () => <></>,
	h1: (props: DefaultProps) => (
		<h1
			{...props}
			class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
		>
			{props.children}
		</h1>
	),
	h2: (props: DefaultProps) => {
		return (
			<h2
				{...props}
				class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
			>
				{props.children}
			</h2>
		);
	},
	h3: (props: DefaultProps) => {
		return (
			<h3
				{...props}
				class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
			>
				{props.children}
			</h3>
		);
	},
	h4: (props: DefaultProps) => {
		return (
			<h4
				{...props}
				class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
			>
				{props.children}
			</h4>
		);
	},
	h5: (props: DefaultProps) => {
		return (
			<h5
				{...props}
				class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
			>
				{props.children}
			</h5>
		);
	},
	h6: (props: DefaultProps) => (
		<h6
			{...props}
			class="prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]"
		>
			{props.children}
		</h6>
	),
	p: (props: DefaultProps) => (
		<p {...props} class="my-4">
			{props.children}
		</p>
	),
	a: (props: DefaultProps<{ href: string }>) => (
		<a
			{...props}
			class="prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]"
		>
			{props.children}
		</a>
	),
	li: (props: DefaultProps) => (
		<li {...props} class="mb-2">
			{props.children}
		</li>
	),
	ul: (props: DefaultProps) => (
		<ul
			{...props}
			class="list-disc marker:text-solid-accent marker:dark:text-solid-accentlight marker:text-2xl pl-8 mb-2"
		>
			{props.children}
		</ul>
	),
	ol: (props: DefaultProps) => (
		<ol {...props} class="list-decimal pl-8 mb-2">
			{props.children}
		</ol>
	),
	nav: (props: DefaultProps) => <nav {...props}>{props.children}</nav>,
	TesterComponent: () => (
		<p>
			Remove This Now!!! If you see this it means that markdown custom
			components does work
		</p>
	),
	code: (props: DefaultProps) => {
		return (
			<code class="text-mono text-sm" {...props}>
				{props.children}
			</code>
		);
	},
	pre: (props: DefaultProps) => (
		<pre
			{...props}
			class="prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10"
		>
			{props.children}
		</pre>
	),
	table: (props: DefaultProps) => <table>{props.children}</table>,
	th: (props: DefaultProps) => <th>{props.children}</th>,
	thead: (props: DefaultProps) => <thead>{props.children}</thead>,
	td: (props: DefaultProps) => <td>{props.children}</td>,
	tr: (props: DefaultProps) => <tr>{props.children}</tr>,
	hr: (props: DefaultProps) => {
		return <hr {...props} class="dark:prose-hr:border-slate-800" />;
	},
	response: (props: DefaultProps) => {
		return <span>{props.children}</span>;
	},
	void: (props: DefaultProps) => {
		return <span>{props.children}</span>;
	},
	unknown: (props: DefaultProps) => {
		return <span>{props.children}</span>;
	},
};
