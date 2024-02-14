import { redirect } from "@solidjs/router";
import { type FetchEvent } from "@solidjs/start/server/types";

/**
 * Redirect Map
 * [origin, destination]
 */
const LEGACY_ROUTES = new Map([
	[
		"/references/api-reference/control-flow/Suspense",
		"/reference/components/suspense",
	],
] as const);

function isLegacyRoute(
	path: string
): path is Parameters<(typeof LEGACY_ROUTES)["get"]>[number] {
	return LEGACY_ROUTES.has(path);
}

export const handleLegacyRoutes = (event: FetchEvent) => {
	const { pathname } = new URL(event.request.url);

	if (isLegacyRoute(pathname)) {
		return redirect(LEGACY_ROUTES.get(pathname)!, 308);
	}
};
