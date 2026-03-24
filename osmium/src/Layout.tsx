import { RouteSectionProps } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";

import { Layout } from "~/ui/layout";
import { NotFound } from "~/ui/not-found";
import { useThemeListener } from "@kobalte/solidbase/client";
import { usePace } from "@kobalte/solidbase/default-theme/pace.js";

export default function (props: RouteSectionProps) {
	useThemeListener();
	usePace();

	return (
		<ErrorBoundary fallback={() => <NotFound />}>
			<Layout>{props.children}</Layout>
		</ErrorBoundary>
	);
}
