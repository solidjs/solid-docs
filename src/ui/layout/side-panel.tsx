import { Component, ResolvedChildren } from "solid-js";
import { Contribute } from "./contribute";
import { TableOfContents } from "./table-of-contents";

export const SidePanel: Component<{ children: ResolvedChildren }> = (props) => {
	return (
		<div class="h-full relative">
			<TableOfContents children={props.children} />
			<Contribute />
		</div>
	);
};
