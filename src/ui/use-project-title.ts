import { type Accessor, createEffect, createSignal } from "solid-js";
import { useMatch } from "@solidjs/router";

const SOLID_START_TITLE = "SolidStart Docs";
const SOLID_ROUTER_TITLE = "Solid Router Docs";
const SOLID_META_TITLE = "Solid Meta Docs";
const SOLID_TITLE = "Solid Docs";

type ProjectTitle =
	| typeof SOLID_START_TITLE
	| typeof SOLID_ROUTER_TITLE
	| typeof SOLID_META_TITLE
	| typeof SOLID_TITLE;

export function useProjectTitle(): Accessor<ProjectTitle> {
	const [title, setTitle] = createSignal<ProjectTitle>(SOLID_TITLE);

	const isStart = useMatch(() => "/solid-start/*");
	const isRouter = useMatch(() => "/solid-router/*");
	const isMeta = useMatch(() => "/solid-meta/*");

	createEffect(() => {
		if (isStart()) {
			setTitle(SOLID_START_TITLE);
		} else if (isRouter()) {
			setTitle(SOLID_ROUTER_TITLE);
		} else if (isMeta()) {
			setTitle(SOLID_META_TITLE);
		} else {
			setTitle(SOLID_TITLE);
		}
	});

	return title;
}
