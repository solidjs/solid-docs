import { type Component, lazy } from "solid-js";
import directory from "./directory.json";
import aliases from "./aliases.json";

export type LessonLookup = (typeof directory)[number];
export interface LessonFiles {
	files: { name: string; type?: string; content: string }[];
}
interface LessonSource {
	lesson: LessonFiles;
	solved: LessonFiles;
}

const sources = import.meta.glob<{ default: LessonSource }>([
	"./*.json",
	"!./directory.json",
	"!./aliases.json",
]);
const descriptions = import.meta.glob<{ default: Component }>("./*.mdx");

export const tutorialDirectory = directory;
export const firstTutorialId = directory[0].internalName;

/** Maps a solidjs.com/tutorial lesson id to its lesson here. */
export function canonicalTutorialId(id: string) {
	return (aliases as Record<string, string>)[id] ?? id;
}

/** Starter and solved files; plain data, so the server's answer hydrates. */
export async function getTutorialFiles(id: string) {
	const source = sources[`./${id}.json`];
	if (!source) throw new Error(`Unknown tutorial: ${id}`);
	return (await source()).default;
}

// Lesson text as lazy components, so hydration waits for the same module.
const lessonText = Object.fromEntries(
	Object.entries(descriptions).map(([path, load]) => [
		path.slice(2, -4),
		lazy(load),
	])
);

export function getTutorialText(id: string): Component {
	const text = lessonText[id];
	if (!text) throw new Error(`Unknown tutorial: ${id}`);
	return text;
}
