import { Errored } from "solid-js";

import { Layout } from "./ui/layout";
import { NotFound } from "./ui/not-found";
import { SidebarProvider, useThemeListener } from "@kobalte/solidbase/client";
import { usePace } from "@kobalte/solidbase/default-theme/pace.js";
import { useRouteConfig } from "./utils";
import { OsmiumThemeStateProvider } from "./context";
import { ParentProps } from "solid-js";

export default function (props: ParentProps) {
	const config = useRouteConfig();
	useThemeListener();
	usePace();

	return (
		<OsmiumThemeStateProvider>
			<SidebarProvider config={config().themeConfig?.sidebar}>
				<Errored fallback={() => <NotFound />}>
					<Layout>{props.children}</Layout>
				</Errored>
			</SidebarProvider>
		</OsmiumThemeStateProvider>
	);
}
