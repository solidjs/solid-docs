import { ParentComponent } from "solid-js";
import { DocsHeader } from "./layout/docs-header";

export interface DocsLayoutProps {
	title?: string;
	section?: {
		title: string;
	};
}

export const DocsLayout: ParentComponent<DocsLayoutProps> = (props) => {
	return (
		<>
			<div class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<article>
					<DocsHeader title={props.title} section={props.section} />
					{props.children}
				</article>
			</div>
		</>
	);
};
