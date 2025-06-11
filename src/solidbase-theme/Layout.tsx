import { RouteSectionProps } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";

import { Layout } from "~/ui/layout";
import { NotFound } from "~/ui/not-found";
import { I18nProvider } from "~/i18n/i18n-context";
import { useThemeListener } from "@kobalte/solidbase/client";
import { usePace } from "@kobalte/solidbase/default-theme/pace.js";
import { Title } from "@solidjs/meta";
import { useProjectTitle } from "~/ui/use-project";

export default function (props: RouteSectionProps) {
	useThemeListener();
	usePace();
	const projectTitle = useProjectTitle();

	return (
		<I18nProvider>
			<Title>{projectTitle()}</Title>
			<ErrorBoundary fallback={() => <NotFound />}>
				<Layout>{props.children}</Layout>
			</ErrorBoundary>
		</I18nProvider>
	);
}
