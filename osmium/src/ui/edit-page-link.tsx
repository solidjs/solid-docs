import { Component, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/outline";
import { useCurrentPageData } from "@kobalte/solidbase/client";

export const EditPageLink: Component = () => {
	const data = useCurrentPageData();

	return (
		<Show when={data()?.editLink}>
			{(editLink) => (
				<a
					class="not-prose text-text-muted hover:text-action focus-visible:ring-focus flex min-h-8 items-center rounded no-underline focus-visible:ring-2 focus-visible:outline-none lg:rounded-none"
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
