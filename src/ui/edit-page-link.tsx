import { Component, createMemo } from "solid-js";
import { usePageState } from "~/data/page-state";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/solid";
import { useLocale } from "@kobalte/core";
import { useLocation } from "@solidjs/router";

export const EditPageLink: Component = () => {
	const location = useLocation();
	const path = createMemo(() => {
		return location.pathname !== "/" ? location.pathname : "/index";
	});
	return (
		<a
			class="flex no-underline hover:text-slate-700 dark:hover:text-slate-300 dark:text-slate-400 "
			href={`https://github.com/solidjs/solid-docs-next/edit/main/src/routes${path()}.mdx`}
		>
			<Icon class="mr-1" path={pencilSquare} style="width: 12px;" />
			Edit this page
		</a>
	);
};
