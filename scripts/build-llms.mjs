import { readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { API_SECTIONS } from "./llms-small/api.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = resolve(ROOT, process.argv[2] ?? "dist");
const SITE_ORIGIN = new URL(
	process.env.SITE_URL ??
		process.env.DEPLOY_PRIME_URL ??
		"https://docs.solidjs.com"
);
const INDEX_PATH = resolve(OUTPUT_DIR, "llms.txt");
const FULL_PATH = resolve(OUTPUT_DIR, "llms-full.txt");
const SMALL_PATH = resolve(OUTPUT_DIR, "llms-small.txt");
const PRIMER_PATH = resolve(ROOT, "scripts/llms-small/primer.md");

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
	const smallCorpusUrl = new URL("/llms-small.txt", SITE_ORIGIN).toString();
	const pointers = [
		[
			fullCorpusUrl,
			`For a single-file corpus, use [llms-full.txt](${fullCorpusUrl}).`,
		],
		[
			smallCorpusUrl,
			`For a short primer with one line per solid-js export, use [llms-small.txt](${smallCorpusUrl}).`,
		],
	]
		.filter(([url]) => !lines.some((line) => line.includes(url)))
		.map(([, pointer]) => pointer);
	if (pointers.length > 0) {
		lines.splice(firstSectionIndex, 0, ...pointers, "");
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

// The primer source starts with an HTML comment naming where it was copied
// from; the comment is for editors of this repository, not for the file.
function stripLeadingComment(markdown) {
	return markdown.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
}

// Prettier pads Markdown table cells to the widest row; the padding is a
// third of the primer's tables, and llms-small.txt is read by tools, not
// people, so the cells shrink to one space on each side.
function compactTables(markdown) {
	return markdown
		.split("\n")
		.map((line) =>
			line.startsWith("|")
				? line.replace(/-{3,}/g, "---").replace(/ {2,}/g, " ")
				: line
		)
		.join("\n");
}

function renderApiTable() {
	return API_SECTIONS.map((section) =>
		[
			`### ${section.title}`,
			"",
			"| Export | Purpose |",
			"| --- | --- |",
			...section.exports.map(
				([name, purpose]) => `| \`${name}\` | ${purpose} |`
			),
		].join("\n")
	).join("\n\n");
}

async function buildSmallCorpus(title) {
	const primer = stripLeadingComment(await readFile(PRIMER_PATH, "utf8"))
		.trim()
		.split("\n");
	if (!primer[0]?.startsWith("# ")) {
		throw new Error("The primer must start with a level-one heading");
	}
	const primerTitle = primer[0].slice(2).trim();
	const primerBody = compactTables(primer.slice(1).join("\n").trim());

	return [
		`# ${title}: ${primerTitle}`,
		"",
		"> The short form for tools with a small context budget: the rules that differ from React and Solid 1.x, the 1.x to 2.0 corrections, and one line per `solid-js` export.",
		"",
		`Index: ${new URL("/llms.txt", SITE_ORIGIN)}`,
		`Full corpus: ${new URL("/llms-full.txt", SITE_ORIGIN)}`,
		"",
		primerBody,
		"",
		"## solid-js exports",
		"",
		"One line per public export of `solid-js`; the reference pages in the index carry the signatures.",
		"",
		renderApiTable(),
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

const [curatedIndex, fullCorpus, smallCorpus] = await Promise.all([
	Promise.resolve(curateIndex(generatedIndex)),
	buildFullCorpus(title, documents),
	buildSmallCorpus(title),
]);

await Promise.all([
	writeFile(INDEX_PATH, curatedIndex, "utf8"),
	writeFile(FULL_PATH, fullCorpus, "utf8"),
	writeFile(SMALL_PATH, smallCorpus, "utf8"),
]);

console.log(
	`Generated llms.txt and llms-full.txt from ${documents.length} documents, and llms-small.txt from the primer and ${API_SECTIONS.reduce((n, section) => n + section.exports.length, 0)} exports.`
);
