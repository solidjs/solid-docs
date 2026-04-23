import { Component } from "solid-js";
import { EditPageLink } from "../edit-page-link";
import { PageIssueLink } from "../page-issue-link";

export const Contribute: Component = () => {
	return (
		<>
			<span class="text-base font-semibold text-slate-900 dark:text-white">
				Contribute
			</span>
			<ol
				role="list"
				class="prose-a:text-slate-600 prose-li:my-1 mt-1.5 flex list-none flex-col p-0 pl-2.5 text-sm"
			>
				<li class="pl-0">
					<span class="[&>a]:gap-x-1 [&>a>svg]:w-3.75">
						<EditPageLink />
					</span>
				</li>
				<li class="pl-0">
					<span class="[&>a]:gap-x-1 [&>a>svg]:w-3.75">
						<PageIssueLink />
					</span>
				</li>
			</ol>
		</>
	);
};
