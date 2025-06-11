import { useLocation, useMatch } from "@solidjs/router";
import { useCurrentRouteMetaData } from "~/utils/route-metadata-helper";
import { SUPPORTED_LOCALES } from "./config";

export function getCurrentLocale() {
	const match = useMatch(() => "/:locale?/*", {
		locale: SUPPORTED_LOCALES,
	});
	return match()?.params.project ?? null;
}

export function getEntryFileName() {
	const pathname = useLocation().pathname;
	const currentRouteMetaData = useCurrentRouteMetaData();

	if (currentRouteMetaData.isProjectRoot) {
		return `${pathname}/index.mdx`.replace("//", "/");
	} else {
		// Trim trailing slash
		return (pathname.endsWith("/") ? pathname.slice(0, -1) : pathname) + ".mdx";
	}
}

export const isExternalURL = (url: string) => /^https?:\/\//.test(url);
