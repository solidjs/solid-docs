import { redirect } from "@solidjs/router";
import { type FetchEvent } from "@solidjs/start/server/types";
import { LEGACY_ROUTES } from "./legacy-routes";

function isLegacyRoute(path: string): path is keyof typeof LEGACY_ROUTES {
	return path in LEGACY_ROUTES;
}

export const handleLegacyRoutes = (event: FetchEvent) => {
	const { pathname } = new URL(event.request.url);

	if (isLegacyRoute(pathname)) {
		return redirect(LEGACY_ROUTES[pathname], 308);
	}
};
