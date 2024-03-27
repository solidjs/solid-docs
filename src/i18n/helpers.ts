import { useLocation, useMatch } from "@solidjs/router";
import { SUPPORTED_LOCALES } from "./config";
import { useCurrentRouteMetaData } from "~/ui/layout";

export function getLocaleFromPathname(pathname: string) {
	return pathname.split("/")[1];
}

export function isValidLocale(
	locale: string
): locale is (typeof SUPPORTED_LOCALES)[number] {
	// TS is being annoying.
	// we are actually narrowing string here.
	// @ts-ignore
	return SUPPORTED_LOCALES.includes(locale);
}

export function getValidLocaleFromPathname(pathname: string) {
	const locale = getLocaleFromPathname(pathname);

	return isValidLocale(locale) ? locale : null;
}



export function getEntryFileName() {
	const pathname = useLocation().pathname;
	const CurrentRouteMetaData = useCurrentRouteMetaData();

	if (CurrentRouteMetaData.isProjectRoot) {
		return `${pathname}/index`.replace("//", "/");
	} else {
		// Trim trailing slash
		return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
	}
}

export const isExternalURL = (url: string) => /^https?:\/\//.test(url);
