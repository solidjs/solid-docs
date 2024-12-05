import { useLocation } from "@solidjs/router";
import { SUPPORTED_LOCALES } from "./config";
import { useCurrentRouteMetaData } from "~/utils/route-metadata-helper";

export function getLocaleFromPathname(pathname: string) {
	return pathname.split("/")[1];
}

export function isValidLocale(
	locale: string
): locale is (typeof SUPPORTED_LOCALES)[number] {
	return SUPPORTED_LOCALES.includes(locale);
}

export function getValidLocaleFromPathname(pathname: string) {
	const locale = getLocaleFromPathname(pathname);

	return isValidLocale(locale) ? locale : null;
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
