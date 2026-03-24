import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";

import { createSolidBase } from "@kobalte/solidbase/config";
import { osmium } from "solidbase-osmium";

const solidBase = createSolidBase(osmium);

export default defineConfig({
	plugins: [
		solidBase.plugin({
			title: "SolidJS Documentation",
			description:
				"Documentation for SolidJS, the signals-powered UI framework",
			siteUrl: "https://docs.solidjs.com",
			editPath: "https://github.com/solidjs/solid-docs/edit/main/:path",
			themeConfig: {
				projects: [
					{
						path: "/",
						name: "Solid",
					},
					{
						path: "solid-router",
						name: "Solid Router",
					},
					{
						path: "solid-start",
						name: "SolidStart",
					},
					{
						path: "solid-meta",
						name: "Solid Meta",
					},
				],
				reportPagePath:
					"https://github.com/solidjs/solid-docs-next/issues/new?assignees=ladybluenotes&labels=improve+documentation%2Cpending+review&projects=&template=CONTENT.yml&title=[Content]:&subject=:path&page=:url",
			},
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
							remove: "npm remove :content",
							update: "npm update :content",
							run: "npm run :content",
							exec: "npx :content",
							create: "npm init :content",
						},
						pnpm: {
							install: "pnpm i :content",
							"install-dev": "pnpm i :content -D",
							"install-global": "pnpm i :content -g",
							"install-local": "pnpm i",
							remove: "pnpm remove :content",
							update: "pnpm update :content",
							run: "pnpm :content",
							exec: "pnpx :content",
							create: "pnpm create :content",
						},
						yarn: {
							install: "yarn add :content",
							"install-dev": "yarn add :content -D",
							"install-global": "yarn add :content -g",
							"install-local": "yarn i",
							remove: "yarn remove :content",
							update: "yarn upgrade :content",
							run: "yarn :content",
							exec: "yarn dlx :content",
							create: "yarn create :content",
						},
						bun: {
							install: "bun i :content",
							"install-dev": "bun i :content -d",
							"install-global": "bun i :content -g",
							"install-local": "bun i",
							remove: "bun remove :content",
							update: "bun update :content",
							run: "bun run :content",
							exec: "bunx :content",
							create: "bun create :content",
						},
						deno: {
							install: "deno add npm::content",
							"install-dev": "deno add npm::content -D",
							"install-global": "deno add npm::content -g",
							"install-local": "deno i",
							remove: "deno remove npm::content",
							update: "deno update npm::content",
							run: "deno run :content",
							exec: "dpx :content",
							create: "deno init --npm :content",
						},
					},
				},
			},
			llms: true,
			sitemap: true,
			robots: {
				rules: [
					{
						userAgent: "*",
						allow: ["/"],
						disallow: ["/i18n-status/"],
					},
				],
			},
		}),
		solidStart(solidBase.startConfig()),
		nitro({
			preset: "netlify",
			prerender: {
				crawlLinks: true,
				autoSubfolderIndex: false,
				failOnError: true,
				// eslint-disable-next-line no-useless-escape
				ignore: [/\{\getPath}/, /.*?emojiSvg\(.*/],
			},
		}),
	],
});
