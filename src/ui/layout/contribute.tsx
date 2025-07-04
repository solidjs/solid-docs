import { Component } from "solid-js";
import { useI18n } from "~/i18n/i18n-context";
import { EditPageLink } from "../edit-page-link";
import { PageIssueLink } from "../page-issue-link";

export const Contribute: Component = () => {
	const i18n = useI18n();

	return (
		<>
			<span class="text-base font-semibold text-slate-900 dark:text-white">
				{i18n.t("contribute.title")}
			</span>
			<ol
				role="list"
				class="mt-1.5 flex list-none flex-col p-0 pl-2.5 text-sm prose-a:text-slate-600 prose-li:my-1"
			>
				<li class="pl-0">
					<span class="[&>a>svg]:w-[15px] [&>a]:gap-x-1">
						<EditPageLink />
					</span>
				</li>
				<li class="pl-0">
					<span class="[&>a>svg]:w-[15px] [&>a]:gap-x-1">
						<PageIssueLink />
					</span>
				</li>
			</ol>
		</>
	);
};
