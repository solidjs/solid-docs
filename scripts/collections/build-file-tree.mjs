import path from "path";
import matter from "gray-matter";
import fs from "fs/promises";
import { getDirData } from "./utils/get-dir-data.mjs";
import { COLLECTIONS_ROOT } from "./index.mjs";

/**
 *
 * @param {string} entry
 * @returns
 */
export async function buildFileTree(entry = COLLECTIONS_ROOT) {
	const entryPath = path.resolve(process.cwd(), entry);
	const parentSegment = path.parse(entryPath).dir;
	try {
		const stats = await fs.stat(entryPath);

		if (stats.isDirectory()) {
			const info = await getDirData(entryPath);

			const nested = await Promise.all(
				info.pages.map(async (file) => {
					return buildFileTree(path.join(entryPath, file));
				})
			);

			return {
				type: "section",
				title: info.title,
				pages: info.pages,
				children: nested.filter(Boolean),
			};
		} else if (!entryPath.includes("data.json")) {
			const file = await fs.readFile(entryPath, "utf-8");
			const parentSection = await getDirData(path.resolve(parentSegment));

			const { title, mainNavExclude } = matter(file).data;

			/**
			 * @todo
			 * parse frontmatter with Zod
			 */
			return {
				type: "markdown",
				file: path.basename(entryPath),
				path:
					"/" +
					path
						.relative(path.join(process.cwd(), COLLECTIONS_ROOT), entryPath)
						.replace(/\index\.mdx?/, "")
						.replace(/\.mdx?/, ""),
				slug: path.basename(entryPath, path.extname(entryPath)),
				parent: parentSection.title,
				title,
				mainNavExclude,
				isTranslated: true,
			};
		} else {
			console.error(`WARNING: \n ${entry} was not found.\n Please fix it!\n`);
			return;
		}
	} catch (e) {
		console.error("Failed creating tree", e);
		return;
	}
}
