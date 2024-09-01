import fs from "fs/promises";
import matter from "gray-matter";
/**
 * returns data from the frontmatter of an mdx file
 *
 * @param {string} entryPath
 * @returns {Promise<{ title: string; mainNavExclude?: boolean }>}
 */
export async function getFrontMatterData(entryPath) {
	const file = await fs.readFile(entryPath, "utf-8");

	return matter(file).data;
}
