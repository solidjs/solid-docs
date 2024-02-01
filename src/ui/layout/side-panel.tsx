import { Component } from "solid-js";
import { Contribute } from "./contribute";
import { TableOfContents } from "./table-of-contents";

export const SidePanel: Component = () => {
	return (
		<div class="hidden fixed top-0lg:-mr-6 lg:block lg:h-[calc(100vh-4.75rem)] lg:flex-none lg:overflow-y-auto">
			<TableOfContents />
			<Contribute />
		</div>
	);
};
