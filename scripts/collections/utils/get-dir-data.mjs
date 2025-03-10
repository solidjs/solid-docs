import fs from "fs/promises";
import path from "path";
import { sectionData } from "../schemas.mjs";
import { languages } from "../index.mjs";
import { cwd } from "process";

/**
 *
 * @param {string} path
 */
function formatDirPath(path) {
	for (const lang of languages) {
		if (path.includes(lang)) {
			return path.replace("/" + lang, "");
		}
	}

	return path;
}

export async function getDirData(dirPath = cwd()) {
	const dir = formatDirPath(dirPath);
	try {
		const data = JSON.parse(
			await fs.readFile(path.resolve(dir, "data.json"), "utf-8")
		);

		if (!sectionData.safeParse(data).success) {
			// throw new Error("failed to parse")
			console.error("failed to parse::", data);
		}

		return data;
	} catch (e) {
		console.error("\n");
		console.error("\n");
		console.error(e);
		throw new Error(
			`failed to parse directory info. Does ${dir} have a data.json?`
		);
	}
}
