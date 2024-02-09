import { Component } from "solid-js";
import { EditPageLink } from "../edit-page-link";
import { PageIssueLink } from "../page-issue-link";

export const Contribute: Component = () => {
	return (
		<>
			<span class="font-display text-base font-medium text-slate-900 dark:text-white">
				Contribute
			</span>
			<ol role="list" class="text-sm list-none p-0 mt-2 flex flex-col">
				<li class="pl-0">
					<span>
						<EditPageLink />
					</span>
				</li>
				<li class="pl-0">
					<span>
						<PageIssueLink />
					</span>
				</li>
			</ol>
		</>
	);
};
