/**
 * An array of locales
 * language (ISO 639-1 - set 1): https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
 * country code (ISO 3166-1 alpha-2): https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 * E.g.: Canadian French would be: `fr-ca`
 */
export const SUPPORTED_LOCALES = ["pt-br"];

export function missingTranslationMessage(path: string) {
	switch (path) {
		case "pt-br":
		case "pt-pt":
			return "Esta seção ainda não foi traduzida.";
		default:
			return "This section has not yet been translated.";
	}
}

export function getLocaleFromPathname(pathname: string) {
	return pathname.split("/")[1];
}

export function isValidLocale(
	locale: string
): locale is (typeof SUPPORTED_LOCALES)[number] {
	return SUPPORTED_LOCALES.includes(locale);
}
