import { Component } from "solid-js";
import { EditPageLink } from "../edit-page-link";
import { PageIssueLink } from "../page-issue-link";

export const Contribute: Component = () => {
	return (
		<>
			<span class="font-display text-base font-medium tracking-wide text-slate-900 dark:text-white">
				Contribute
			</span>
			<ol role="list" class="text-sm list-none p-0 mt-1.5 flex flex-col pl-2.5 prose-a:text-slate-600 prose-li:my-1">
				<li class="pl-0">
					<span class="[&>a]:gap-x-1 [&>a>svg]:w-[15px]">
						<EditPageLink />
					</span>
				</li>
				<li class="pl-0">
					<span class="[&>a]:gap-x-1 [&>a>svg]:w-[15px]">
						<PageIssueLink />
					</span>
				</li>
			</ol>
		</>
	);
};
