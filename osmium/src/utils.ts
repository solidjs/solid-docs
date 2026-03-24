import {
	useRouteSolidBaseConfig as _useRouteConfig,
	useSolidBaseContext as _useSolidBaseContext,
} from "@kobalte/solidbase/client";
import { OsmiumThemeConfig, ProjectConfig } from "./index.jsx";
import { Accessor, createMemo } from "solid-js";
import { SolidBaseResolvedConfig } from "@kobalte/solidbase/config";
import { useLocation } from "@solidjs/router";

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

export function useCurrentProject() {
	const location = useLocation();
	const projects = createMemo(() => {
		const p = useSolidBaseContext().config().themeConfig?.projects ?? [];

		return p.map((p) => ({
			name: p.name,
			path: p.path.startsWith("/") ? p.path : `/${p.path}`,
		})) as ProjectConfig[];
	});

	return createMemo(() => {
		for (const project of projects().filter((p) => p.path !== "/")) {
			if (
				location.pathname.includes(`${project.path}/`) ||
				location.pathname.endsWith(project.path)
			) {
				return project;
			}
		}

		return projects().find((p) => p.path === "/");
	});
}
