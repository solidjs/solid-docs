import { createServerData$ } from "solid-start/server"
import fs from "fs/promises"
import path from "path"
import matter, { GrayMatterFile } from "gray-matter"
import { z } from "zod"

type Section = {
	type: "section"
	title: string
	children: (Section | EntryFile)[]
	pages: string[]
}

type FrontMatter = GrayMatterFile<string> & {
	data: { title: string; }
}

type EntryFile = {
	type: "markdown"
	path: string
	slug: string
	title: FrontMatter["data"]["title"]
}


const dirDataSchema = z.object({
	title: z.string(),
	pages: z.array(z.string())
})

type DirData = z.infer<typeof dirDataSchema>

async function getDirData(dirPath: string): Promise<DirData> {
	try {
		const data = JSON.parse(await fs.readFile(path.resolve(dirPath, "data.json"), "utf-8"))

		if (!dirDataSchema.safeParse(data).success) {
			throw new Error("failed to parse")
		}

		return data
	} catch {
		throw new Error(`failed to parse directory info. Does ${dirPath} has a data.json?`)
	}
}

export async function buildFileTree(
	entry: string
): Promise<EntryFile | Section | void> {
	const entryPath = path.resolve(process.cwd(), entry)
	const stats = await fs.stat(entryPath)

	if (stats.isDirectory()) {
		const info = await getDirData(entryPath)

		const nested = await Promise.all(
			info.pages.map(async (file) => {
				return buildFileTree(path.join(entryPath, file))
			})
		)

		return {
			type: "section",
			title: info.title,
			pages: info.pages,
			children: nested.filter(Boolean) as (Section | EntryFile)[]
		}
	} else if (!entryPath.includes("data.json")) {
		const file = await fs.readFile(entryPath, "utf-8")
		const { data } = matter(file) as FrontMatter

		return {
			type: "markdown",
			path:
				"/" +
				path
					.relative(path.join(process.cwd(), "content"), entryPath)
					.replace(/\.mdx?/, ""),
			slug: path.basename(entryPath, path.extname(entryPath)),
			title: data.title,
		} satisfies EntryFile
	} else {
		console.error(`WARNING: \n ${entry} was not found.\n Please fix it!\n` )
		return
	}
}

export function getEntries() {
	return createServerData$(async () => {
		const nav = await buildFileTree("content")
		const references = await buildFileTree("content/reference" )

		if (nav && nav.type === "section" && references && references.type === "section")  {
			return {
				references: references.children,
				learn: nav.children,
			}
		}
	})
}
