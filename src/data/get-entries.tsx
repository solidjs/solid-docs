import { createServerData$ } from "solid-start/server"
import fs from "fs/promises"
import path from "path"
import matter, { GrayMatterFile } from "gray-matter"
import { z } from "zod"

type Section = {
	type: "section"
	title: string
	order: number
	children: (Section | EntryFile)[]
}

type FrontMatter = GrayMatterFile<string> & {
	data: { title: string; order: number }
}

type EntryFile = {
	type: "markdown"
	path: string
	slug: string
	title: FrontMatter["data"]["title"]
	order: FrontMatter["data"]["order"]
}
type DirInfo = {
	path: string
	title: string
	order: number
}

const sectionSchema = z.object({
	title: z.string(),
	order: z.number(),
})

async function getDirInfo(dirPath: string): Promise<DirInfo> {
	try {
		const data = await fs.readFile(path.resolve(dirPath, "data.json"), "utf-8")

		return {
			path: dirPath,
			...sectionSchema.parse(JSON.parse(data))
		}
	} catch {
		if (dirPath.endsWith("content")) {
			return {
				path: dirPath,
				title: "root",
				order: 0
			}
		}
		throw new Error(`failed to parse directory info. Does ${dirPath} has a data.json?`)
	}
}

export async function buildFileTree(
	entry: string
): Promise<EntryFile | Section | void> {
	const entryPath = path.resolve(process.cwd(), entry)
	const stats = await fs.stat(entryPath)

	if (stats.isDirectory()) {
		const info = await getDirInfo(entryPath)
		const files = await fs.readdir(entryPath)

		const nested = await Promise.all(
			files.map(async (file) => {
				return buildFileTree(path.join(entryPath, file))
			})
		)

		return {
			type: "section",
			title: info.title,
			order: info.order,
			children: (nested.filter(Boolean) as Section[]).sort(
				(a, b) => a.order - b.order
			),
		} satisfies Section
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
			order: data.order,
		} satisfies EntryFile
	} else {
		console.error(`WARNING: \n ${entry} was not found.\n Please fix it!\n` )
		return
	}
}

export function getEntries() {
	return createServerData$(async () => {
		const nav = await buildFileTree("content")

		if (nav && nav.type === "section")  {
			const referencesIndex: number = nav.children.findIndex(({ title }) => {
				if (typeof title === "string") {
					return title.toLowerCase() === "reference"
				}
			})

			const references = (nav.children.splice(referencesIndex, 1)[0] as Section).children

			return {
				references,
				learn: nav.children,
			}
		}
	})
}
