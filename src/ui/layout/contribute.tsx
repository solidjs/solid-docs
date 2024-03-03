import { Component } from "solid-js";
import { useI18n } from "~/i18n/i18n-context";
import { EditPageLink } from "../edit-page-link";
import { PageIssueLink } from "../page-issue-link";

export const Contribute: Component = () => {
	const i18n = useI18n();

	return (
		<>
			<span class="font-display text-base font-medium text-slate-900 dark:text-white">
				{i18n.t("contribute.title")}
			</span>
			<ol role="list" class="text-sm list-none p-0 mt-2 flex flex-col">
				<li class="pl-0">
					<EditPageLink />
				</li>
				<li class="pl-0">
					<PageIssueLink />
				</li>
			</ol>
		</>
	);
};
