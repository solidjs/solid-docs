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
			class="not-prose text-text-muted hover:text-action focus-visible:ring-focus flex min-h-8 items-center rounded no-underline focus-visible:ring-2 focus-visible:outline-none lg:rounded-none"
			href={reportLink()}
			target="_blank"
		>
			<Icon aria-hidden="true" class="mr-1 w-4" path={exclamationTriangle} />
			Report an issue with this page
		</a>
	);
};
