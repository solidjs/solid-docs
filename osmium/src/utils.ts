import {
	useRouteSolidBaseConfig as _useRouteConfig,
	useSolidBaseContext as _useSolidBaseContext,
} from "@kobalte/solidbase/client";
import { OsmiumThemeConfig } from "./index.jsx";
import { Accessor } from "solid-js";
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
