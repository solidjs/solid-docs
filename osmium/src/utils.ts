import {
	useRouteSolidBaseConfig as _useRouteConfig,
	useSolidBaseContext as _useSolidBaseContext,
	useSolidBaseRoute,
} from "@kobalte/solidbase/client";
import { OsmiumThemeConfig } from "./index.jsx";
import { Accessor, createMemo } from "solid-js";
import { SolidBaseResolvedConfig } from "@kobalte/solidbase/config";

export interface SolidBaseContextValue {
	config: Accessor<SolidBaseResolvedConfig<OsmiumThemeConfig>>;
	metaTitle: Accessor<string>;
}

export function useSolidBaseContext(): SolidBaseContextValue {
	return _useSolidBaseContext<OsmiumThemeConfig>();
}

export function useRouteConfig() {
	return _useRouteConfig<OsmiumThemeConfig>();
}

export function useProject() {
	const config = useRouteConfig();

	return createMemo(() => {
		const projectConfig = config().routes?.project ?? {};

		return {
			current: useSolidBaseRoute()().project,
			projects: ("values" in projectConfig
				? projectConfig.values
				: []) as Record<string, { path: string; label: string }>,
		};
	});
}
