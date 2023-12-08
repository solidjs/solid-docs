import { Link } from "@solidjs/router"
import {
	createEffect,
	createUniqueId,
	ParentProps,
	mergeProps,
	type JSXElement,
} from "solid-js"
import { CalloutTip } from "~/ui/callout-tip"
import { TabsCodeBlocks } from "~/ui/tab-code-blocks"

type DefaultProps = { children: JSXElement }

function Anchor(props: ParentProps<{ id: string }>) {
	return (
		<a
			class="hover:underline text-solid-dark dark:text-solid-light decoration-solid-lightitem font-medium dark:decoration-solid-darkitem"
			href={`#${props.id}`}
		>
			{props.children}
		</a>
	)
}

export default {
	strong: (props: DefaultProps) => (
		<span class="font-bold">{props.children}</span>
	),
	CalloutTip: (props: DefaultProps) => (
		<CalloutTip>{props.children}</CalloutTip>
	),
	TabsCodeBlocks: (props: DefaultProps) => (
		<TabsCodeBlocks>{props.children}</TabsCodeBlocks>
	),
	h1: (props: DefaultProps) => (
		<h1
			{...props}
			class="heading mt-10 mb-6 -mx-.5 break-words text-4xl mdx-heading font-semibold dark:text-white"
		>
			<Anchor id={props.id}>{props.children}</Anchor>
		</h1>
	),
	ssr: (props: DefaultProps) => <>{props.children}</>,
	spa: () => <></>,
	h2: (props: DefaultProps) => {
		return (
			<h2
				{...props}
				class="heading text-3xl leading-10 my-3 mdx-heading text-solid-accent dark:text-solid-accentlight font-semibold"
			>
				<Anchor id={props.id}>{props.children}</Anchor>
			</h2>
		)
	},
	h3: (props: DefaultProps) => {
		return (
			<h3
				{...props}
				class="font-semibold heading text-2xl leading-9 my-3 mdx-heading text-solid-accent dark:text-solid-accentlight"
			>
				<Anchor id={props.id}>{props.children}</Anchor>
			</h3>
		)
	},
	h4: (props: DefaultProps) => {
		return (
			<h4
				{...props}
				class="heading text-xl font-medium my-2 mdx-heading text-solid-accent dark:text-solid-accentlight"
			>
				<Anchor id={props.id}>{props.children}</Anchor>
			</h4>
		)
	},
	h5: (props: DefaultProps) => {
		//
		//
		return (
			<h5
				{...props}
				class="text-xl my-3 font-medium mdx-heading text-solid-accent dark:text-solid-accentlight"
			>
				<Anchor id={props.id}>{props.children}</Anchor>
			</h5>
		)
	},
	h6: (props: DefaultProps) => (
		<h6
			{...props}
			class="text-xl font-medium mdx-heading text-solid-accent dark:text-solid-accentlight"
		>
			<Anchor id={props.id}>{props.children}</Anchor>
		</h6>
	),
	p: (props: DefaultProps) => (
		<p {...props} class="my-4">
			{props.children}
		</p>
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
	Link,
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
		)
	},
	pre: (props: DefaultProps) => {
		let ref: HTMLPreElement

		return (
			<div class="relative">
				<pre
					{...mergeProps(props, {
						get class() {
							return (
								props.className +
								" relative " +
								(props.bad ? "border-red-400 border-1" : "")
							)
						},
					})}
					ref={ref}
				>
					{props.children}
				</pre>
			</div>
		)
	},
	table: (props: DefaultProps) => (
		<table class="w-full max-w-full <sm:portrait:text-xs my-6 rounded-1xl dark:bg-[rgba(17,24,39,1)] shadow-lg text-left overflow-hidden">
			{props.children}
		</table>
	),
	th: (props: DefaultProps) => <th class="p-4 <sm:p-2">{props.children}</th>,
	thead: (props: DefaultProps) => (
		<thead class="dark:border-blue-400 border-b-1">{props.children}</thead>
	),
	td: (props: DefaultProps) => <td class="p-4 <sm:p-2">{props.children}</td>,
	tr: (props: DefaultProps) => (
		<tr class="dark:even-of-type:bg-[#23406e] light:even-of-type:bg-[#90C2E7]">
			{props.children}
		</tr>
	),
	"data-lsp": (props: DefaultProps) => {
		const id = createUniqueId()
		createEffect(() => {
			tippy(`[data-template="${id}"]`, {
				content() {
					const template = document.getElementById(id)
					return template.innerHTML
				},
				allowHTML: true,
			})
		})
		return (
			<span class={"data-lsp"} data-template={id}>
				{props.children}
				<div id={id} style={{ display: "none" }}>
					<pre class="text-white bg-transparent text-xs p-0 m-0 border-0">
						{props.lsp}
					</pre>
				</div>
			</span>
		)
	},
	"docs-error": (props: DefaultProps) => {
		return (
			<div class="docs-error">
				<p>
					<span class="text-red-500">Error:</span>
					{props.children}
				</p>
			</div>
		)
	},
	"docs-info": (props: DefaultProps) => {
		return (
			<div class="docs-error">
				<p>
					<span class="text-red-500">Error:</span>
					{props.children}
				</p>
			</div>
		)
	},
	response: (props: DefaultProps) => {
		return <span>{props.children}</span>
	},
	void: (props: DefaultProps) => {
		return <span>{props.children}</span>
	},
	unknown: (props: DefaultProps) => {
		return <span>{props.children}</span>
	},
}
