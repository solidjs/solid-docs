import { existsSync } from "fs";
import path from "path";
import { COLLECTIONS_ROOT } from "./collections/index.mjs";
import { getFrontMatterData } from "./collections/utils/get-frontamtter.mjs";
/**
 * @typedef {Object} DocsEntry
 * @property {string} type - The type of reference.
 * @property {string} file - The file associated with the reference.
 * @property {string} path - The path to the reference.
 * @property {string} slug - The slug of the reference.
 * @property {string} parent - The parent reference.
 * @property {string} title - The title of the reference.
 */

/**
 * @typedef {Object} DefaultEntries
 * @property {DocsEntry[]} reference - An array of references.
 * @property {DocsEntry[]} learn - An array of learn items.
 */

/**
 *
 * @param {DocsEntry[]} entryList
 */
async function buildSectionList(entryList = [], locale) {
	const sectionList = [];

	for (const entry of entryList) {
		const entryPath = entry.path.endsWith("/")
			? entry.path + "index"
			: entry.path;
		const i18nEntryPath = path.join(
			process.cwd(),
			COLLECTIONS_ROOT,
			locale,
			entryPath
		);

		if (existsSync(i18nEntryPath + ".mdx")) {
			const { title } = await getFrontMatterData(i18nEntryPath + ".mdx");

			sectionList.push({
				...entry,
				path: path.join(locale, entry.path),
				title,
				isTranslated: true,
			});
		} else {
			sectionList.push({
				...entry,
				isTranslated: false,
			});
		}
	}
	return sectionList;
}

/**
 * @param {DefaultEntries} defaultEntries
 * @param {string} locale
 */
export async function createI18nEntries(defaultEntries, locale) {
	const referenceLearn = await Promise.all([
		buildSectionList(defaultEntries.learn, locale),
		buildSectionList(defaultEntries.reference, locale),
	]);

	return referenceLearn.flat();
}
