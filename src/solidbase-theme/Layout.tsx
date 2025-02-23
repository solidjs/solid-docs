import { RouteSectionProps } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";

import { Layout } from "~/ui/layout";
import { NotFound } from "~/ui/not-found";
import { I18nProvider } from "~/i18n/i18n-context";
import { Title } from "@solidjs/meta";

export default function (props: RouteSectionProps) {
	return (
		<I18nProvider>
			<Title>Solid Docs</Title>
			<ErrorBoundary fallback={() => <NotFound />}>
				<Layout>{props.children}</Layout>
			</ErrorBoundary>
		</I18nProvider>
	);
}
