import { NavLink } from "@solidjs/router"
import { JSXElement, Show } from "solid-js"
import IconChevron from "~icons/heroicons-outline/chevron-right"


interface IPrevNextSectionProps {
  title: string;
  href: string;
}

interface IPrevNextSectionBaseProps extends IPrevNextSectionProps {
  type: "prev" | "next",
}

const PrevNextSectionBase = (props: IPrevNextSectionBaseProps) => {
	return <NavLink
		class="hover:bg-solid-lightaction hover:dark:bg-solid-darkbg flex items-center border border-solid-darklink dark:border-solid-darklink hover:dark:border-solid-lightaccent transition rounded-lg p-4 justify-between group flex-1"
		href={props.href}
	>
		<Show
			when={props.type === "prev"}
		>
			<IconChevron class="w-6 h-6 text-solid-darkaction dark:text-solid-darkaction transform transition group-hover:-translate-x-2 rotate-180"/>
		</Show>

		<div class="flex flex-col">
			<span class="uppercase text-neutral-700 dark:text-neutral-500 text-xs font-semibold">{props.type === "prev" ? "Previous" : "Next"}</span>
			{props.title}
		</div>
		<Show
			when={props.type === "next"}
		>
			<IconChevron class="w-6 h-6 text-solid-darkaction dark:text-solid-darkaction transform transition group-hover:translate-x-2"/>
		</Show>
	</NavLink>
}

export const NextSection = (props: IPrevNextSectionProps) => <PrevNextSectionBase type="next" title={props.title} href={props.href}/>
export const PrevSection = (props: IPrevNextSectionProps) => <PrevNextSectionBase type="prev" title={props.title} href={props.href}/>

export const PrevNextSection = (props: {children: JSXElement}) => (
	<div class="mt-10 flex flex-col md:flex-row gap-4">
		{props.children}
	</div>
)
