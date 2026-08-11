import { readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = resolve(ROOT, process.argv[2] ?? "dist");
const SITE_ORIGIN = new URL(
	process.env.SITE_URL ??
		process.env.DEPLOY_PRIME_URL ??
		"https://docs.solidjs.com"
);
const INDEX_PATH = resolve(OUTPUT_DIR, "llms.txt");
const FULL_PATH = resolve(OUTPUT_DIR, "llms-full.txt");

const DOCUMENT_LINK = /^- \[([^\]]+)\]\(([^)]+\.md)\)(?:: .*)?$/gm;

function toAbsoluteUrl(target) {
	return new URL(target, SITE_ORIGIN).toString();
}

function absolutizeMarkdownLinks(content) {
	return content.replace(
		/\]\((\/[^)]+)\)/g,
		(_, target) => `](${toAbsoluteUrl(target)})`
	);
}

function resolveDocumentPath(target) {
	const url = new URL(target, SITE_ORIGIN);
	if (url.origin !== SITE_ORIGIN.origin) {
		throw new Error(
			`Cannot include an external document in llms-full.txt: ${target}`
		);
	}

	const filePath = resolve(OUTPUT_DIR, `.${decodeURIComponent(url.pathname)}`);
	const outputRelativePath = relative(OUTPUT_DIR, filePath);
	if (
		outputRelativePath === ".." ||
		outputRelativePath.startsWith(`..${sep}`) ||
		resolve(filePath) === OUTPUT_DIR
	) {
		throw new Error(`Document path escapes the output directory: ${target}`);
	}

	return filePath;
}

function parseDocuments(index) {
	return [...index.matchAll(DOCUMENT_LINK)].map((match) => ({
		title: match[1],
		target: match[2],
	}));
}

function curateIndex(index) {
	const lines = index.trimEnd().split("\n");
	if (!lines[0]?.startsWith("# ")) {
		throw new Error("llms.txt must start with a level-one heading");
	}

	const summaryIndex = lines.findIndex(
		(line, index) => index > 0 && line.trim()
	);
	if (summaryIndex === -1 || lines[summaryIndex].startsWith("## ")) {
		throw new Error("llms.txt must include a summary after its title");
	}

	lines[summaryIndex] = `> ${lines[summaryIndex].replace(/^>\s*/, "")}`;

	const firstSectionIndex = lines.findIndex((line) => line.startsWith("## "));
	if (firstSectionIndex === -1) {
		throw new Error("llms.txt must include at least one document section");
	}

	const fullCorpusUrl = new URL("/llms-full.txt", SITE_ORIGIN).toString();
	if (!lines.some((line) => line.includes(fullCorpusUrl))) {
		lines.splice(
			firstSectionIndex,
			0,
			`For a single-file corpus, use [llms-full.txt](${fullCorpusUrl}).`,
			""
		);
	}

	return `${absolutizeMarkdownLinks(lines.join("\n"))}\n`;
}

async function buildFullCorpus(title, documents) {
	const sections = await Promise.all(
		documents.map(async (document) => {
			const content = absolutizeMarkdownLinks(
				(await readFile(resolveDocumentPath(document.target), "utf8")).trim()
			);
			const source = toAbsoluteUrl(document.target);

			return [`# ${document.title}`, "", `Source: ${source}`, "", content].join(
				"\n"
			);
		})
	);

	return [
		`# ${title}: full documentation corpus`,
		"",
		"> Complete Markdown content for the documents listed in llms.txt.",
		"",
		`Source index: ${new URL("/llms.txt", SITE_ORIGIN)}`,
		"",
		...sections.flatMap((section, index) =>
			index === 0 ? [section] : ["---", "", section]
		),
		"",
	].join("\n");
}

const generatedIndex = await readFile(INDEX_PATH, "utf8");
const documents = parseDocuments(generatedIndex);
if (documents.length === 0) {
	throw new Error("llms.txt does not contain any Markdown document links");
}

const title = generatedIndex.match(/^# (.+)$/m)?.[1];
if (!title) {
	throw new Error("llms.txt does not contain a title");
}

const [curatedIndex, fullCorpus] = await Promise.all([
	Promise.resolve(curateIndex(generatedIndex)),
	buildFullCorpus(title, documents),
]);

await Promise.all([
	writeFile(INDEX_PATH, curatedIndex, "utf8"),
	writeFile(FULL_PATH, fullCorpus, "utf8"),
]);

console.log(
	`Generated llms.txt and llms-full.txt from ${documents.length} documents.`
);
