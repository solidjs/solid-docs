import { Contribute } from "./contribute";
import { TableOfContents } from "./table-of-contents";

export const SidePanel = () => {
	return (
		<div class="relative h-full">
			<TableOfContents />
			<Contribute />
		</div>
	);
};
