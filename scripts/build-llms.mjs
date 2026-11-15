// Post-processes the llms files that solidbase writes into the build output.
// The 1.x index is the canonical https://docs.solidjs.com/llms.txt; the first
// line under its title points tools at the Solid 2.0 files, which live on
// their own host until 2.0 is stable.
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = resolve(ROOT, process.argv[2] ?? "dist");
const V2_ORIGIN = "https://v2.solidjs.com";
const V2_POINTER = `> Solid 2.0 (release candidate) documentation for tools: ${V2_ORIGIN}/llms.txt and ${V2_ORIGIN}/llms-full.txt`;
const FILES = ["llms.txt", "llms-full.txt"];

async function readIfPresent(filePath) {
	try {
		return await readFile(filePath, "utf8");
	} catch (error) {
		if (error.code === "ENOENT") return undefined;
		throw error;
	}
}

// Inserts the pointer as a blockquote directly under the level-one heading,
// where the llms.txt convention keeps its summary line.
function addV2Pointer(fileName, content) {
	if (content.includes(V2_POINTER)) return content;

	const lines = content.split("\n");
	if (!lines[0]?.startsWith("# ")) {
		throw new Error(`${fileName} must start with a level-one heading`);
	}

	lines.splice(1, 0, "", V2_POINTER);
	return lines.join("\n");
}

const updated = [];
for (const fileName of FILES) {
	const filePath = resolve(OUTPUT_DIR, fileName);
	const content = await readIfPresent(filePath);
	if (content === undefined) continue;

	await writeFile(filePath, addV2Pointer(fileName, content), "utf8");
	updated.push(fileName);
}

if (updated.length === 0) {
	throw new Error(`No llms files found in ${OUTPUT_DIR}`);
}

console.log(`Added the Solid 2.0 pointer to ${updated.join(" and ")}.`);
