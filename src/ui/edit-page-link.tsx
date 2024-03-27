import { Component, createMemo } from "solid-js";
import { Icon } from "solid-heroicons";
import { pencilSquare } from "solid-heroicons/outline";
import { useLocation } from "@solidjs/router";
import { getEntryFileName } from "~/i18n/helpers";
import { useI18n } from "~/i18n/i18n-context";

export const EditPageLink: Component = () => {
	const i18n = useI18n();
	const currentPath = createMemo(() => {
		const pathname = useLocation().pathname;

		switch (pathname) {
			case "/":
				return "/index";
			case "/solid-router":
			case "/solid-router/":
				return "/solid-router/index";
			case "/solid-start":
			case "/solid-start/":
				return "/solid-start/index";
			default:
				return pathname;
		}
	});

	const srcPath = createMemo(() => {
		return `https://github.com/solidjs/solid-docs-next/edit/main/src/routes${getEntryFileName(currentPath())}.mdx`.replace(
			"/.mdx",
			"/index.mdx"
		);
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
