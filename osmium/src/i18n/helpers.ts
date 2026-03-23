import { useLocation, useMatch } from "@solidjs/router";
import { useCurrentRouteMetaData } from "~/utils/route-metadata-helper";

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
