import {
	createEffect,
	createMemo,
	createSignal,
	Errored,
	For,
	Loading,
	Show,
	untrack,
} from "solid-js";
import { clientOnly, dynamic } from "@solidjs/web";
import { useLocation, useNavigate, useParams } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { getTheme } from "@kobalte/solidbase/client";
import type { ReplStorage, Tab } from "solid-repl";

import {
	canonicalTutorialId,
	firstTutorialId,
	getTutorialFiles,
	getTutorialText,
	tutorialDirectory,
	type LessonFiles,
} from "../../tutorials";

const Repl = clientOnly(() => import("../../tutorials/repl"));

// "Section/Lesson" entries, grouped for the lesson menu.
const sections = Object.entries(
	Object.groupBy(
		tutorialDirectory.map((entry, index) => {
			const [section, name] = entry.lessonName.split("/");
			return { id: entry.internalName, section, name, index };
		}),
		(entry) => entry.section
	)
);

function toTabs(fileset: LessonFiles): Tab[] {
	return fileset.files.map((file) => ({
		name: `${file.name}.${file.type ?? "jsx"}`,
		source: file.content,
	}));
}

// The REPL only opens the entry file on its own; open every lesson file as a tab,
// with the entry file active and the preview below.
function lessonLayout(tabs: Tab[]): ReplStorage {
	const files = tabs.map((tab) => `name:${tab.name}`);
	const entry = files.find((id) => id === "name:main.jsx") ?? files[0];
	return {
		getLayout: () => ({
			grid: {
				root: {
					type: "branch",
					data: [
						{
							type: "leaf",
							data: { views: files, activeView: entry, id: "1" },
							size: 400,
						},
						{
							type: "leaf",
							data: {
								views: ["Preview", "Output"],
								activeView: "Preview",
								id: "2",
							},
							size: 250,
						},
					],
					size: 480,
				},
				width: 1600,
				height: 480,
				// Dockview's Orientation.VERTICAL; dockview is not a direct dependency.
				orientation: "VERTICAL" as never,
			},
			activeGroup: "1",
			panels: {
				Preview: {
					id: "Preview",
					contentComponent: "preview",
					tabComponent: "default",
					renderer: "always",
				},
				Output: {
					id: "Output",
					contentComponent: "output",
					tabComponent: "default",
				},
				...Object.fromEntries(
					tabs.map((tab) => [
						`name:${tab.name}`,
						{
							id: `name:${tab.name}`,
							title: tab.name,
							tabComponent: "file",
							contentComponent: "editor",
						},
					])
				),
			},
		}),
	};
}

export default function Tutorial() {
	const params = useParams<{ id?: string }>();
	const location = useLocation();
	const navigate = useNavigate();

	// Old solidjs.com lesson ids render their new lesson; the host redirects them.
	const id = () => canonicalTutorialId(params.id || firstTutorialId);
	const solved = () => new URLSearchParams(location.search).has("solved");
	const index = () =>
		tutorialDirectory.findIndex((entry) => entry.internalName === id());
	const entryAt = (i: number) => {
		const entry = tutorialDirectory[i];
		return (
			entry && { id: entry.internalName, name: entry.lessonName.split("/")[1] }
		);
	};
	const previous = () => entryAt(index() - 1);
	const next = () => entryAt(index() + 1);

	const lesson = createMemo(() => getTutorialFiles(id()));
	const Markdown = dynamic(() => getTutorialText(id()));
	// Follows the lesson and the solved toggle; edits in the editor write it.
	const [tabs, setTabs] = createSignal(() =>
		toTabs(solved() ? lesson().solved : lesson().lesson)
	);

	// Read here first: SolidBase sets up its theme listener on the first read,
	// which must not happen inside the editor's settled callback.
	const dark = createMemo(() => getTheme() === "dark");

	let markdownPane: HTMLDivElement | undefined;
	createEffect(id, () => {
		markdownPane?.scrollTo({ top: 0 });
	});

	return (
		<>
			<Title>{`${entryAt(index())?.name ?? "Tutorial"} | Solid Tutorial`}</Title>
			<div class="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(22rem,2fr)_3fr] md:grid-rows-1">
				<section class="flex min-h-0 flex-col border-slate-200 md:border-r dark:border-slate-800">
					<div class="border-b border-slate-200 px-6 py-3 dark:border-slate-800">
						<label class="sr-only" for="tutorial-lesson">
							Lesson
						</label>
						<select
							id="tutorial-lesson"
							class="w-full rounded-lg bg-white px-2 py-1.5 font-semibold text-slate-900 ring-1 ring-black/10 dark:bg-slate-800 dark:text-slate-100 dark:ring-white/20"
							value={id()}
							onChange={(e) => navigate(`/tutorial/${e.currentTarget.value}`)}
						>
							<For each={sections}>
								{([section, entries], s) => (
									<optgroup label={`${s() + 1}. ${section}`}>
										<For each={entries}>
											{(entry) => (
												<option value={entry.id}>
													{`${entry.index + 1}. ${entry.name}`}
												</option>
											)}
										</For>
									</optgroup>
								)}
							</For>
						</select>
					</div>
					<div
						ref={(el) => (markdownPane = el)}
						class="prose prose-slate dark:prose-invert max-w-none flex-1 overflow-y-auto px-6 py-4 dark:text-slate-300"
					>
						<Loading fallback={<p>Loading lesson…</p>}>
							<Markdown />
						</Loading>
					</div>
					<nav
						aria-label="Lesson"
						class="flex items-center justify-between gap-4 border-t border-slate-200 px-6 py-3 text-sm dark:border-slate-800"
					>
						<a
							class="rounded-lg bg-blue-600 px-3 py-1.5 font-semibold text-white hover:bg-blue-700"
							href={`/tutorial/${id()}${solved() ? "" : "?solved"}`}
						>
							{solved() ? "Reset" : "Solve"}
						</a>
						<div class="flex gap-4">
							<Show when={previous()}>
								{(entry) => (
									<a
										class="text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
										href={`/tutorial/${entry().id}`}
									>
										← {entry().name}
									</a>
								)}
							</Show>
							<Show when={next()}>
								{(entry) => (
									<a
										class="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300"
										href={`/tutorial/${entry().id}`}
									>
										{entry().name} →
									</a>
								)}
							</Show>
						</div>
					</nav>
				</section>
				<section class="min-h-0 min-w-0" aria-label="Editor and preview">
					<Errored
						fallback={
							<p class="p-6 text-slate-700 dark:text-slate-300">
								The editor failed to load. It needs a browser with Web Workers.
							</p>
						}
					>
						<Loading>
							{/* Remount per lesson and on Solve/Reset so the open tabs follow the files. */}
							<Show when={`${id()}${solved() ? "?solved" : ""}`} keyed>
								{(_key) => (
									<Repl
										id="tutorial"
										vertical
										dark={dark()}
										tabs={tabs()}
										setTabs={setTabs}
										storage={lessonLayout(untrack(tabs))}
										reset={() =>
											setTabs(
												toTabs(solved() ? lesson().solved : lesson().lesson)
											)
										}
										fallback={<p class="p-6 text-slate-500">Loading editor…</p>}
									/>
								)}
							</Show>
						</Loading>
					</Errored>
				</section>
			</div>
		</>
	);
}
