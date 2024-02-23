import { Component, createMemo } from "solid-js";
import { Icon } from "solid-heroicons";
import { exclamationTriangle } from "solid-heroicons/solid";
import { useLocation } from "@solidjs/router";

export const PageIssueLink: Component = () => {
	const location = useLocation();
	const path = createMemo(() => {
		return location.pathname !== "/"
			? location.pathname.substring(1)
			: "/index";
	});
	return (
		<a
			class="flex no-underline hover:font-bold hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300 "
			href={`https://github.com/solidjs/solid-docs-next/issues/new?assignees=ladybluenotes&labels=improve+documentation%2Cpending+review&projects=&template=CONTENT.yml&title=[Content]:&subject=${path()}.mdx`}
		>
			<Icon class="mr-1" path={exclamationTriangle} style="width: 16px;" />
			Report an issue with this page
		</a>
	);
};
