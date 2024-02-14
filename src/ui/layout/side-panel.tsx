import { Component } from "solid-js";
import { Contribute } from "./contribute";
import { TableOfContents } from "./table-of-contents";

export const SidePanel: Component = () => {
	return (
		<div class="hidden shrink-0 fixed right-4 xl:block">
				<TableOfContents />
				<Contribute />
			</div>
		</div>
	);
};
