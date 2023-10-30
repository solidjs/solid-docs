import { NavLink } from "@solidjs/router"
import IconChevron from "~icons/heroicons-outline/chevron-right"

import {
	ParentProps,
	Show,
	createSignal,
	createUniqueId,
	onMount,
} from "solid-js"

export function CollapsedIcon(props) {
	return <div class={"duration-100 ease-in transition" + props.class}>▼</div>
}

type CollapsibleProps = ParentProps<{
  startCollapsed?: () => boolean;
  header: string;
}>;

export function Collapsible(props: CollapsibleProps) {
	const [collapsed, setCollapsed] = createSignal(false)

	const id = createUniqueId()

	return (
		<li value={props.header}
		class="text-sm text-solid-dark dark:text-solid-light">
			<SectionHeader
				collapsed={collapsed()}
				onClick={() => setCollapsed(!collapsed())}
				panelId={id}
			>
				{props.header}
			</SectionHeader>
			<Show when={collapsed()}>
				<SectionPanel id={id}>{props.children}</SectionPanel>
			</Show>
		</li>
	)
}

export function SectionHeader(
	props: ParentProps<{
    collapsed: boolean;
    panelId: string;
    onClick: () => void;
  }>
) {
	return (
		<a class="flex flex-row items-center w-full hover:bg-solid-lightaction hover:dark:bg-solid-darkaction hover:cursor-pointer px-2 py-1"
			onClick={props.onClick}
			// aria-expanded={!props.collapsed}
			// aria-controls={props.panelId}
		>
			{props.children}
			<IconChevron
				class={`transition w-3 h-3 text-solid-lightaction dark:text-solid-white transform ml-2 mt-1 ${
					!props.collapsed ? "rotate-90" : "-rotate-90"
				}`}
			/>
		</a>
	)
}

function SectionPanel(props: ParentProps<{ id: string }>) {
	return (
		<ul
			id={props.id}
			class="opacity-100 md:border-l border-solid-darkitem dark:border-solid-lightitem ml-6 list-none transition: opacity 250ms ease-in-out 0s; animation: 250ms ease-in-out 0s 1 normal none running nav-fadein"
		>
			{props.children}
		</ul>
	)
}

export function NavItem(props) {
	
	return (
		<li class="ml-2">
			{props.href?.charAt(0) === "h" ? 
			<a
				href={props.href}
				class="px-2 py-1 w-full text-left relative flex items-center justify-between transition cursor-pointer text-sm"
				target="_blank"
			>
				{props.title}
			</a> 
			: <NavLink
				class="px-2 py-1 w-full text-left relative flex items-center justify-between transition cursor-pointer text-sm"
				{...props}
				inactiveClass="hover:bg-solid-lightaction hover:dark:bg-solid-darkaction"
				activeClass="text-black dark:text-white font-semibold bg-solid-lightitem dark:bg-solid-darkitem active"
				end={true}
			>
				{props.children}
			</NavLink>}
		</li>
	)
}
