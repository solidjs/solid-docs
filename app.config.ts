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

const allEntries = [
	entries.learn, entries.reference,
	solidstartEntries.learn, solidstartEntries.reference,
	solidrouterEntries.learn, solidrouterEntries.reference,
	solidMetaEntries.learn, solidMetaEntries.reference,
].flat(Infinity).map(x => x.path.replace(/\\/g, '/')).sort()

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
					routes: allEntries,
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
				packageManagers: {
					presets: {
						npm: {
							install: "npm i :content",
							"install-dev": "npm i :content -D",
							"install-global": "npm i :content -g",
							"install-local": "npm i",
							run: "npm run :content",
							exec: "npx :content",
							create: "npm init :content",
						},
						pnpm: {
							install: "pnpm i :content",
							"install-dev": "pnpm i :content -D",
							"install-global": "pnpm i :content -g",
							"install-local": "pnpm i",
							run: "pnpm :content",
							exec: "pnpx :content",
							create: "pnpm create :content",
						},
						yarn: {
							install: "yarn add :content",
							"install-dev": "yarn add :content -D",
							"install-global": "yarn add :content -g",
							"install-local": "yarn i",
							run: "yarn :content",
							exec: "yarn dlx :content",
							create: "yarn create :content",
						},
						bun: {
							install: "bun i :content",
							"install-dev": "bun i :content -d",
							"install-global": "bun i :content -g",
							"install-local": "bun i",
							run: "bun run :content",
							exec: "bunx :content",
							create: "bun create :content",
						},
						deno: {
							install: "deno add npm::content",
							"install-dev": "deno add npm::content -D",
							"install-global": "deno add npm::content -g",
							"install-local": "deno i",
							run: "deno run :content",
							exec: "dpx :content",
							create: "deno init --npm :content",
						},
					},
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
