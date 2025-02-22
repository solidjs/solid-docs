import { RouteSectionProps } from "@solidjs/router";
import { createEffect } from "solid-js";
import { getTheme } from "@kobalte/solidbase/client";

import { Layout } from "~/ui/layout";
import { NotFound } from "~/ui/not-found";

export default function (props: RouteSectionProps) {
	createEffect(() => {
		const html = document.documentElement;
		html.classList.remove("light", "dark");
		html.classList.add(getTheme());
	});

	return (
		<ErrorBoundary
			fallback={(e) => {
				console.error(e);
				return <NotFound />;
			}}
		>
			<Layout>{props.children}</Layout>
		</ErrorBoundary>
	);
}
