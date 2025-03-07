import { Contribute } from "./contribute";
import { TableOfContents } from "./table-of-contents";

export const SidePanel = () => {
	return (
		<div class="h-full relative">
			<TableOfContents />
			<Contribute />
		</div>
	);
};
