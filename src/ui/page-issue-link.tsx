import { Component, createMemo } from "solid-js";
import { Icon } from "solid-heroicons";
import { exclamationTriangle } from "solid-heroicons/outline";
import { useLocation } from "@solidjs/router";
import { useI18n } from "~/i18n/i18n-context";
import { getEntryFileName } from "~/i18n/helpers";

export const PageIssueLink: Component = () => {
	const i18n = useI18n();
	const { pathname } = useLocation();

	const srcPath = createMemo(() => {
		return `https://github.com/solidjs/solid-docs-next/issues/new?assignees=ladybluenotes&labels=improve+documentation%2Cpending+review&projects=&template=CONTENT.yml&title=[Content]:&subject=${getEntryFileName(pathname)}.mdx`;
	});
	return (
		<a
			class="flex no-underline hover:font-bold hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300 "
			href={srcPath()}
		>
			<Icon class="mr-1 w-[16px]" path={exclamationTriangle} />
			{i18n.t("contribute.report")}
		</a>
	);
};
