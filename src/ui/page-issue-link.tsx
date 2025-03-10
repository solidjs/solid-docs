import { Component, createMemo, createSignal, onMount } from "solid-js";
import { Icon } from "solid-heroicons";
import { exclamationTriangle } from "solid-heroicons/outline";
import { useI18n } from "~/i18n/i18n-context";
import { getEntryFileName } from "~/i18n/helpers";
import { useLocation } from "@solidjs/router";

export const PageIssueLink: Component = () => {
	const location = useLocation();
	const i18n = useI18n();

	const [mounted, setMounted] = createSignal(false);

	onMount(() => setMounted(true));

	const srcPath = createMemo(() => {
		return (
			"https://github.com/solidjs/solid-docs-next/issues/new" +
			"?assignees=ladybluenotes" +
			"&labels=improve+documentation%2Cpending+review" +
			"&projects=" +
			"&template=CONTENT.yml" +
			"&title=[Content]:" +
			`&subject=${getEntryFileName()}` +
			`&page=${mounted() ? window.location.href : ""}`
		);
	});

	return (
		<a
			class="flex no-underline hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300"
			href={srcPath()}
			target="_blank"
		>
			<Icon class="mr-1 w-[16px]" path={exclamationTriangle} />
			{i18n.t("contribute.report")}
		</a>
	);
};
