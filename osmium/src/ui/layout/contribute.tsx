import { Component } from "solid-js";
import { EditPageLink } from "../edit-page-link";
import { PageIssueLink } from "../page-issue-link";

export const Contribute: Component = () => {
	return (
		<>
			<span class="text-text-subtle mt-6 block text-xs font-semibold tracking-wide uppercase">
				Contribute
			</span>
			<ol
				role="list"
				class="prose-li:my-1 mt-1 flex list-none flex-col p-0 pl-2 text-sm"
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
