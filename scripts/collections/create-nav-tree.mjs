import { buildFileTree } from "./build-file-tree.mjs";

/**
 *
 * @param {string} rootDir
 * @returns
 */
export async function createNavTree(rootDir) {
	const [learn, references] = await Promise.all([
		buildFileTree(rootDir),
		buildFileTree(`${rootDir}/reference`),
	]);

	if (
		learn &&
		learn.type === "section" &&
		references &&
		references.type === "section"
	) {
		return {
			reference: references.children,
			learn: learn.children,
		};
	}
}
