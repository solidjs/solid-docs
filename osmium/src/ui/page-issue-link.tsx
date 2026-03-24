import { Component, createMemo } from "solid-js";
import { Icon } from "solid-heroicons";
import { exclamationTriangle } from "solid-heroicons/outline";
import { useLocation } from "@solidjs/router";
import { useCurrentPageData } from "@kobalte/solidbase/client";
import { useRouteConfig } from "../utils";

export const PageIssueLink: Component = () => {
	const location = useLocation();
	const config = useRouteConfig();
	const pageData = useCurrentPageData();

	const mdPath = createMemo(() => {
		const configPath = config().editPath;
		const editLink = pageData()?.editLink;
		const template =
			typeof configPath === "string" ? configPath : configPath?.(":path");
		if (!template || !editLink) return "";
		const [before, after] = template.split(":path");

		return editLink.slice(before.length, editLink.length - after.length);
	});

	const reportLink = createMemo(
		() =>
			config()
				.themeConfig?.reportPagePath?.replace(":path", mdPath)
				.replace(":url", location.pathname) ?? ""
	);

	return (
		<a
			class="not-prose flex no-underline hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
			href={reportLink()}
			target="_blank"
		>
			<Icon
				aria-hidden="true"
				class="mr-1 w-[16px]"
				path={exclamationTriangle}
			/>
			Report an issue with this page
		</a>
	);
};
