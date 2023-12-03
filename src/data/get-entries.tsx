import { createServerData$ } from "solid-start/server"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

type DirInfo = {
	path: string
	title?: string
	order?: number
}

/**
 *
 * Reads the `data.json` for each section.
 * If `data` is empty, returns just the path.
 * If file doesn't exists, it throws and is caught.
 *
 * @todo Every section should have `data.json`.
 * Actually throwing is a good idea if this happens on build-time.
 */
async function getDirInfo(dirPath: string): Promise<DirInfo> {
	try {
		const data = await fs.readFile(path.resolve(dirPath, "data.json"), "utf-8")

		if (data) {
			return {
				path: dirPath,
				...JSON.parse(data),
			}
		} else {
			return {
				path: dirPath,
			}
		}
	} catch {
		return {
			path: dirPath,
		}
	}
}

type File = {
	title: string
	order: number
	content: string
}

type Dir = {
	title: string
	order: number
	children: Dir[] | File[]
}

type FileTreeItem = File | Dir

/**
 *
 * Needs some type-guards to findout if it's File or Dir so we can annotate ReturnType.
 * Promise<FileTreeItem[]>
 */
export async function buildFileTree(entry: string): Promise<any> {
	const entryPath = path.resolve(process.cwd(), entry)
	const stats = await fs.stat(entryPath)

	if (stats.isDirectory()) {
		const info = await getDirInfo(entryPath)
		const files = await fs.readdir(entryPath)
		const nested = await Promise.all(
			files.map(async (file) => {
				const tree = buildFileTree(path.join(entryPath, file))
				if (tree) return tree
			})
		)
		return {
			title: info.title,
			order: info.order,
			children: nested.filter(Boolean).sort((a, b) => a.order - b.order),
		}
	} else if (!entryPath.includes("data.json")) {
		const file = await fs.readFile(entryPath, "utf-8")
		const { data } = matter(file)

		return {
			path:
				"/" +
				path
					.relative(path.join(process.cwd(), "content"), entryPath)
					.replace(/\.mdx?/, ""),
			slug: path.basename(entryPath, path.extname(entryPath)),
			...data,
		}
	}
}

export function getEntries() {
	return createServerData$(async () => {
		const directories = await buildFileTree("content")

		return directories
	})
}
