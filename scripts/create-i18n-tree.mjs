import { existsSync } from "fs";
import path from "path";
import { COLLECTIONS_ROOT } from "./collections/index.mjs";
import { getFrontMatterData } from "./collections/utils/get-frontamtter.mjs";

/**
 * @typedef {Object} Leaf
 * @property {"markdown"} type - The type of the child item.
 * @property {string} file - The markdown file associated with the child item.
 * @property {string} path - The path to the child item.
 * @property {string} slug - The slug for the child item.
 * @property {string} parent - The parent section of the child item.
 * @property {string} title - The title of the child item.
 */

/**
 * @typedef {Object} Branch
 * @property {"section" | "markdown"} type - The type of reference item.
 * @property {string} title - The title of the reference section.
 * @property {string[]} pages - List of pages related to the section.
 * @property {(Leaf | Branch)[]} children - List of child items under the section.
 */

/**
 * @typedef {Object} Tree
 * @property {Branch[]} reference - List of reference items.
 * @property {Branch[]} learn - List of learn items.
 */

/**
 *
 * @param {Branch["children"]} children
 */
function traverseTree(children) {
	for (const child of children) {
		if (child.type === "section") {
			return traverseTree(child.children);
		} else {
			/**
			 * check if exist i18n
			 */
			return child;
		}
	}
}

/**
 *
 * @param {Tree["reference" | "learn"]} entryList
 * @param {string} locale
 */
export async function createI18nTree(entryList, locale) {
	const entries = [];

	for (const entry of entryList) {
		if (entry.type === "section") {
			const nested = await createI18nTree(entry.children, locale);
			entries.push({
				...entry,
				children: nested.filter(Boolean),
			});
		} else {
			const i18nEntryPath = path.join(
				process.cwd(),
				COLLECTIONS_ROOT,
				locale,
				entry.path.endsWith("/") ? entry.path + "index" : entry.path
			);
			if (existsSync(i18nEntryPath + ".mdx")) {
				const { title } = await getFrontMatterData(i18nEntryPath + ".mdx");
				entries.push({
					...entry,
					isTranslated: true,
					title,
				});
			} else {
				entries.push({
					...entry,
					isTranslated: false,
				});
			}
		}
	}
	return entries;
}
