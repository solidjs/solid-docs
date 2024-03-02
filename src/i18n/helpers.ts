import { SUPPORTED_LOCALES } from "./config";

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

export function getEntryFileName(pathname: string) {
	const locale = getValidLocaleFromPathname(pathname);

	if (locale) {
		return pathname.endsWith(locale) ? `${pathname}/index` : pathname;
	} else {
		return pathname !== "/" ? pathname : "/index";
	}
}

export const isExternalURL = (url: string) => /^https?:\/\//.test(url);
