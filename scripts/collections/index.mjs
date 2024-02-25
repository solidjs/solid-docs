import { createNavTree } from "./create-nav-tree.mjs";
import { createSolidCollectionDir } from "./utils/create-dir.mjs";
import { writeFile } from "./utils/write-file.mjs";
import { createFlatEntryList } from "./create-flat-entry-list.mjs";
import { createI18nEntries } from "../create-i18n-entries.mjs";
import { createI18nTree } from "../create-i18n-tree.mjs";

export const languages = ["pt-br"];
export const COLLECTIONS_ROOT = "src/routes";

(async () => {
	const tree = await createNavTree(COLLECTIONS_ROOT);
	await createSolidCollectionDir();

	const defaultFlatEntries = {
		learn: createFlatEntryList(tree.learn, []),
		reference: createFlatEntryList(tree.reference, []),
	};

	for (const locale of languages) {
		const entryTitles = await createI18nEntries(defaultFlatEntries, locale);
		writeFile(`flat-entries-${locale}.ts`, entryTitles);
		writeFile(`tree-${locale}.ts`, {
			learn: await createI18nTree(tree.learn, locale),
			reference: await createI18nTree(tree.reference, locale),
		});
	}

	await Promise.all([
		writeFile("tree.ts", tree),
		writeFile("entriesList.js", defaultFlatEntries, true),
		writeFile("entries.ts", defaultFlatEntries),
	]);
})();
