import { Component, createMemo } from "solid-js";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/outline";
import { useI18n } from "~/i18n/i18n-context";
import { getEntryFileName } from "~/i18n/helpers";

export const EditPageLink: Component = () => {
	const i18n = useI18n();

	const srcPath = createMemo(() => {
		return `https://github.com/solidjs/solid-docs-next/edit/main/src/routes${getEntryFileName()}.mdx`;
	});
	return (
		<a
			class="flex no-underline hover:font-bold hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300 "
			href={srcPath()}
			target="_blank"
		>
			<Icon class="mr-1 w-[16px]" path={pencilSquare} />
			{i18n.t("contribute.edit")}
		</a>
	);
};
