import { ErrorBoundary } from "solid-js";

import { Layout } from "./ui/layout";
import { NotFound } from "./ui/not-found";
import { SidebarProvider, useThemeListener } from "@kobalte/solidbase/client";
import { usePace } from "@kobalte/solidbase/default-theme/pace.js";
import { useRouteConfig } from "./utils";
import { OsmiumThemeStateProvider } from "./context";
import { ParentProps } from "solid-js";

import "./index.css";

export default function (props: ParentProps) {
	const config = useRouteConfig();
	useThemeListener();
	usePace();

	return (
		<OsmiumThemeStateProvider>
			<SidebarProvider config={config().themeConfig?.sidebar}>
				<ErrorBoundary fallback={() => <NotFound />}>
					<Layout>{props.children}</Layout>
				</ErrorBoundary>
			</SidebarProvider>
		</OsmiumThemeStateProvider>
	);
}
