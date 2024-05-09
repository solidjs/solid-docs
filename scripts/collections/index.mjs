import { createNavTree } from "./create-nav-tree.mjs";
import { createSolidCollectionDir } from "./utils/create-dir.mjs";
import { writeFile } from "./utils/write-file.mjs";
import { createFlatEntryList } from "./create-flat-entry-list.mjs";
import { createI18nEntries } from "../create-i18n-entries.mjs";
import { createI18nTree } from "../create-i18n-tree.mjs";

export const languages = ["pt-br"];
const projects = ["solid-router", "solid-start", "solid-meta"];
export const COLLECTIONS_ROOT = "src/routes";

(async () => {
	const tree = await createNavTree(COLLECTIONS_ROOT);
	await createSolidCollectionDir();

	const defaultFlatEntries = {
		learn: createFlatEntryList(tree.learn, []),
		reference: createFlatEntryList(tree.reference, []),
	};
	const projectTrees = {};
	const projectFlatEntries = {};

	for (const project of projects) {
		projectTrees[project] = await createNavTree(
			`${COLLECTIONS_ROOT}/${project}`
		);

		projectFlatEntries[project] = {
			learn: await createFlatEntryList(projectTrees[project].learn, []),
			reference: await createFlatEntryList(projectTrees[project].reference, []),
		};

		writeFile(`${project}-tree.ts`, projectTrees[project]);
		writeFile(`${project}-flat-entries.ts`, projectFlatEntries[project]);

		for (const locale of languages) {
			const entryTitles = await createI18nEntries(
				projectFlatEntries[project],
				locale,
				project
			);

			writeFile(`${project}-flat-entries-${locale}.ts`, entryTitles);
			writeFile(`${project}-tree-${locale}.ts`, {
				learn: await createI18nTree(
					projectTrees[project].learn,
					locale,
					project
				),
				reference: await createI18nTree(
					projectTrees[project].reference,
					locale,
					project
				),
			});
		}
	}

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
		writeFile("flat-entries.ts", defaultFlatEntries),
		Object.keys(projectTrees).forEach((project) =>
			writeFile(`${project}-entries.ts`, projectTrees[project])
		),
	]);
})();
