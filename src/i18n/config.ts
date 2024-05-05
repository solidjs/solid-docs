import { dictionaries } from "./dictionaries";

const locales = Object.keys(dictionaries);
locales.shift();

/**
 * An array of locales
 * language (ISO 639-1 - set 1): https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
 * country code (ISO 3166-1 alpha-2): https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 * E.g.: Canadian French would be: `fr-ca`
 */
export const SUPPORTED_LOCALES: string[] = locales as Array<
	keyof Omit<typeof dictionaries, "default">
>;
