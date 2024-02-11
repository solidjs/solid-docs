import { Component } from "solid-js";
import { Contribute } from "./contribute";
import { TableOfContents } from "./table-of-contents";

export const SidePanel: Component = () => {
	return (
		<div class="hidden xl:block relative">
			<div class="fixed">
				<TableOfContents />
				<Contribute />
			</div>
		</div>
	);
};
