import { existsSync } from "fs";
import path from "path";
import { COLLECTIONS_ROOT } from "./collections/index.mjs";
import { getFrontMatterData } from "./collections/utils/get-frontmatter.mjs";
import { cwd } from "process";

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
 * @param {string} locale
 * @param {string | undefined} project
 */
async function buildSectionList(entryList = [], locale, project = "") {
	const sectionList = [];

	for (const entry of entryList) {
		const entryPath = entry.path.endsWith("/")
			? entry.path + "index"
			: entry.path;
		const i18nEntryPath = path.join(
			cwd(),
			COLLECTIONS_ROOT,
			project,
			locale,
			entryPath
		);

		if (existsSync(i18nEntryPath + ".mdx")) {
			const { title, isDeprecated } = await getFrontMatterData(
				i18nEntryPath + ".mdx"
			);

			sectionList.push({
				...entry,
				path: path.join(locale, entry.path),
				title,
				isDeprecated,
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
 * @param {string} project
 */
export async function createI18nEntries(defaultEntries, locale, project) {
	const referenceLearn = await Promise.all([
		buildSectionList(defaultEntries.learn, locale, project),
		buildSectionList(defaultEntries.reference, locale, project),
	]);

	return {
		learn: referenceLearn[0],
		reference: referenceLearn[1],
	};
}
