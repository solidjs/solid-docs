import { RouteSectionProps } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import { Layout } from "~/ui/layout";
import { NotFound } from "~/ui/not-found";

export default function (props: RouteSectionProps) {
	return (
		<ErrorBoundary fallback={<NotFound />}>
			<Layout>{props.children}</Layout>
		</ErrorBoundary>
	);
}
