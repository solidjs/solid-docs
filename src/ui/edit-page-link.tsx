import { Component, createMemo } from "solid-js";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/solid";
import { useLocation } from "@solidjs/router";
import { getEntryFileName } from "~/i18n/helpers";
import { useI18n } from "~/i18n/i18n-context";

export const EditPageLink: Component = () => {
	const i18n = useI18n();
	const { pathname } = useLocation();

	const srcPath = createMemo(() => {
		return `https://github.com/solidjs/solid-docs-next/edit/main/src/routes${getEntryFileName(pathname)}.mdx`.replace(
			"/.mdx",
			"/index.mdx"
		);
	});
	return (
		<a
			class="flex no-underline hover:font-bold hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300 "
			href={srcPath()}
		>
			<Icon class="mr-1" path={pencilSquare} style="width: 16px;" />
			{i18n.t("contribute.edit")}
		</a>
	);
};
