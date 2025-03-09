import { defineConfig } from "@solidjs/start/config";

import { createWithSolidBase, defineTheme } from "@kobalte/solidbase/config";

import tree from "./.solid/tree";
import entries from "./.solid/flat-entries";
import solidstartEntries from "./.solid/solid-start-flat-entries";
import solidrouterEntries from "./.solid/solid-router-flat-entries";
import solidMetaEntries from "./.solid/solid-meta-flat-entries";
import solidrouterTree from "./.solid/solid-router-tree";
import solidStartTree from "./.solid/solid-start-tree";
import solidMetaTree from "./.solid/solid-meta-tree";

function docsData() {
	const virtualModuleId = "solid:collection";
	const resolveVirtualModuleId = "\0" + virtualModuleId;

	return {
		name: virtualModuleId,
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolveVirtualModuleId;
			}
		},
		async load(id: string) {
			if (id === resolveVirtualModuleId) {
				return `
				export const coreEntries = ${JSON.stringify(entries, null, 2)}
				export const routerEntries = ${JSON.stringify(solidrouterEntries, null, 2)}
				export const startEntries = ${JSON.stringify(solidstartEntries, null, 2)}
				export const metaEntries = ${JSON.stringify(solidMetaEntries, null, 2)}
				export const coreTree = ${JSON.stringify(tree, null, 2)}
				export const routerTree = ${JSON.stringify(solidrouterTree, null, 2)}
				export const startTree = ${JSON.stringify(solidStartTree, null, 2)}
				export const metaTree = ${JSON.stringify(solidMetaTree, null, 2)}
				`;
			}
		},
	};
}

const theme = defineTheme({
	componentsPath: import.meta.resolve("./src/solidbase-theme"),
});
export default defineConfig(
	createWithSolidBase(theme)(
		{
			ssr: true,
			middleware: "src/middleware/index.ts",
			server: {
				preset: "netlify",
				prerender: {
					crawlLinks: true,
					autoSubfolderIndex: false,
					failOnError: true,
					// eslint-disable-next-line no-useless-escape
					ignore: [/\{\getPath}/, /.*?emojiSvg\(.*/],
				},
			},
			vite: {
				plugins: [docsData(), heroCodeSnippet()],
			},
		},
		{
			title: "Solid Docs",
			description:
				"Documentation for SolidJS, the signals-powered UI framework",
			editPath: "https://github.com/solidjs/solid-docs/edit/main/:path",
			markdown: {
				expressiveCode: {
					themes: ["min-light", "material-theme-ocean"],
					themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
					frames: false,
					styleOverrides: {
						twoSlash: {
							cursorColor: "var(--twoslash-cursor)",
						},
					},
				},
				toc: {
					minDepth: 2,
				},
			},
		}
	)
);

import { readFile } from "node:fs/promises";
import { codeToHtml } from "shiki";

function heroCodeSnippet() {
	const virtualModuleId = "solid:hero-code-snippet";
	const resolveVirtualModuleId = "\0" + virtualModuleId;

	return {
		name: virtualModuleId,
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolveVirtualModuleId;
			}
		},
		async load(id: string) {
			if (id === resolveVirtualModuleId) {
				const snippet = await readFile(
					"./src/ui/layout/hero-code-snippet.code",
					"utf-8"
				);

				const highlightedCode = await codeToHtml(snippet.trim(), {
					lang: "tsx",
					theme: "material-theme-ocean",
				});

				return `export const highlightedCode = \`${highlightedCode}\``;
			}
		},
	};
}
