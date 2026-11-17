import { Callout } from "./callout";
import { EditPageLink } from "./edit-page-link";
import { PageIssueLink } from "./page-issue-link";

// Shown on pages whose frontmatter sets `review: wanted`. The flag marks a
// page that still needs a full editorial pass. Remove the flag from the
// frontmatter when a human edit of the page merges.
export const ReviewWanted = () => (
	<Callout type="note" title="This page needs an editorial pass">
		<p>
			The writing on this page has not had a full human edit yet, so parts of it
			may be longer or denser than they need to be. Suggestions and edits are
			welcome.
		</p>
		<div class="not-prose flex flex-col gap-1 text-sm sm:flex-row sm:gap-4">
			<EditPageLink />
			<PageIssueLink />
		</div>
	</Callout>
);
