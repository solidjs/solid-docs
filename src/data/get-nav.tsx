import { GrayMatterFile } from "gray-matter";

export type Section = {
	type: "section";
	title: string;
	children: (Section | EntryFile)[];
	pages: string[];
};

type FrontMatter = GrayMatterFile<string> & {
	data: { title: string };
};

export type EntryFile = {
	type: "markdown";
	path: string;
	slug: string;
	title: FrontMatter["data"]["title"];
};
