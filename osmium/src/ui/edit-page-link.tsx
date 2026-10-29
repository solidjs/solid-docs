import { Component, Show } from "solid-js";
import { Icon } from "./icon";
import pencilSquare from "~icons/heroicons/pencil-square";
import { useCurrentPageData } from "@kobalte/solidbase/client";

export const EditPageLink: Component = () => {
	const data = useCurrentPageData();

	return (
		<Show when={data()?.editLink}>
			{(editLink) => (
				<a
					class="not-prose flex no-underline hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
					href={editLink()}
					target="_blank"
				>
					<Icon aria-hidden="true" class="mr-1 w-3.75" path={pencilSquare} />
					Edit this page
				</a>
			)}
		</Show>
	);
};
