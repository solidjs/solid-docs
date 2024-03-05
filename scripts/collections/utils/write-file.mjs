import fs from "fs/promises";
import path from "path";
/**
 *
 * @param {string} fileName
 * @param {object} fileContent
 * @param {boolean} removeAsConst
 * @param {string} collectionDir
 */
export async function writeFile(
	fileName,
	fileContent,
	removeAsConst = false,
	collectionDir = ".solid"
) {
	return fs.writeFile(
		path.resolve(collectionDir, fileName),
		`export default ${JSON.stringify(fileContent, null, 2)} ${
			removeAsConst ? "" : "as const"
		}`
	);
}
