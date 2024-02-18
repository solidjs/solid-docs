import { Component } from "solid-js";
import { EditPageLink } from "../edit-page-link";
import { PageIssueLink } from "../page-issue-link";

export const Contribute: Component = () => {
	return (
		<>
			<span class="font-display font-medium text-blue-925 dark:text-white">
				Contribute
			</span>
			<ol role="list" class="text-sm list-none p-0 mt-1 flex flex-col pl-[10px]">
				<li class="pl-0 my-[5px]">
					<span class="[&>a]:gap-x-[5px]">
						<EditPageLink />
					</span>
				</li>
				<li class="pl-0 my-[5px]">
					<span class="[&>a]:gap-x-[5px]">
						<PageIssueLink />
					</span>
				</li>
			</ol>
		</>
	);
};
