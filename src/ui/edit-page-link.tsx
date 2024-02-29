import { Component, createMemo } from "solid-js";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/solid";
import { useLocation } from "@solidjs/router";
import { getValidLocaleFromPathname } from "~/i18n/helpers";

export const EditPageLink: Component = () => {
	const { pathname } = useLocation();

	const path = createMemo(() => {
		const locale = getValidLocaleFromPathname(pathname);

		if (locale) {
			return pathname.endsWith(locale) ? `${pathname}/index` : pathname;
		} else {
			return pathname !== "/" ? pathname : "/index";
		}
	});
	return (
		<a
			class="flex no-underline hover:font-bold hover:text-blue-700 dark:hover:text-blue-300 dark:text-slate-300 "
			href={`https://github.com/solidjs/solid-docs-next/edit/main/src/routes${path()}.mdx`}
		>
			<Icon class="mr-1" path={pencilSquare} style="width: 16px;" />
			Edit this page
		</a>
	);
};
