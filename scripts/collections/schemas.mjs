import { z } from "zod";

export const pages = z.array(z.string());

export const sectionSchema = z.object({
	type: z.literal("section"),
	title: z.string(),
	// children: z.array(z.string()),
	pages,
});
export const entrySchema = z.object({
	type: z.literal("markdown"),
	path: z.string(),
	slug: z.string(),
	titles: z.string(),
});

export const sectionData = z.object({
	title: z.string(),
	pages,
});

export const frontMatterSchema = z.object({
	title: z.string(),
});
