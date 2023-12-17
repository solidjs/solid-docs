import { z } from "zod";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import matter from "gray-matter";

const pages = z.array(z.string());

const sectionSchema = z.object({
	type: z.literal("section"),
	title: z.string(),
	// children: z.array(z.string()),
	pages,
});
const entrySchema = z.object({
	type: z.literal("markdown"),
	path: z.string(),
	slug: z.string(),
	titles: z.string(),
});
const sectionData = z.object({
	title: z.string(),
	pages,
});

const frontMatterSchema = z.object({
	title: z.string(),
});

async function getDirData(dirPath = process.cwd()) {
	try {
		const data = JSON.parse(
			await fs.readFile(path.resolve(dirPath, "data.json"), "utf-8")
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
			`failed to parse directory info. Does ${dirPath} have a data.json?`
		);
	}
}

async function buildFileTree(entry = "content") {
	const entryPath = path.resolve(process.cwd(), entry);
	const parentSegment = path.parse(entryPath).dir.split(path.sep).pop();
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
			parent: parentSegment,
			children: nested.filter(Boolean),
		};
	} else if (!entryPath.includes("data.json")) {
		const file = await fs.readFile(entryPath, "utf-8");
		const { title } = matter(file).data;

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
					.relative(path.join(process.cwd(), "content"), entryPath)
					.replace(/\.mdx?/, ""),
			slug: path.basename(entryPath, path.extname(entryPath)),
			parent: parentSegment,
			title,
		};
	} else {
		console.error(`WARNING: \n ${entry} was not found.\n Please fix it!\n`);
		return;
	}
}

(async function createNavTree() {
	const [learn, references] = await Promise.all([
		buildFileTree("content"),
		buildFileTree("content/reference"),
	]);

	if (
		learn &&
		learn.type === "section" &&
		references &&
		references.type === "section"
	) {
		const result = {
			references: references.children,
			learn: learn.children,
		};

		const collectionDir = path.resolve(process.cwd(), ".solid");

		if (!existsSync(collectionDir)) {
			fs.mkdir(path.resolve(process.cwd(), ".solid"));
		}

		fs.writeFile(
			path.resolve(collectionDir, "tree.ts"),
			`export default ${JSON.stringify(result, null, 2)} as const`
		);
	}
})();
