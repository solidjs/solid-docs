import { Component, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/outline";
import { useCurrentPageData } from "@kobalte/solidbase/client";

import { useI18n } from "~/i18n/i18n-context";

export const EditPageLink: Component = () => {
	const i18n = useI18n();
	const data = useCurrentPageData();

	return (
		<Show when={data()?.editLink}>
			{(editLink) => (
				<a
					class="flex no-underline hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300 "
					href={editLink()}
					target="_blank"
				>
					<Icon class="mr-1 w-[16px]" path={pencilSquare} />
					{i18n.t("contribute.edit")}
				</a>
			)}
		</Show>
	);
};
