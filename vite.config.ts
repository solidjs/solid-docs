import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

import { createSolidBase } from "@kobalte/solidbase/config";
import { osmium } from "solidbase-osmium";
import { createFilesystemSidebar } from "@kobalte/solidbase/config/sidebar";

const solidBase = createSolidBase(osmium);

export default defineConfig({
	resolve: {
		dedupe: ["@solidjs/start", "@kobalte/solidbase"], // TODO: Remove once start vite 8 releases (mismatch caused by preview release)
	},
	plugins: [
		tailwindcss(),
		solidBase.plugin({
			title: "SolidJS Documentation",
			description:
				"Documentation for SolidJS, the signals-powered UI framework",
			siteUrl: "https://docs.solidjs.com",
			editPath: "https://github.com/solidjs/solid-docs/edit/main/:path",
			routes: {
				path: "/{version}/{project}",
				project: {
					default: "solid",
					values: {
						solid: { path: "", label: "Solid" },
						router: { path: "solid-router", label: "Solid Router" },
						start: { path: "solid-start", label: "SolidStart" },
						meta: { path: "solid-meta", label: "Solid Meta" },
					},
				},
				version: {
					default: "latest",
					values: {
						latest: { path: "", label: "Latest" },
						v1: { path: "v1", label: "v1" },
					},
				},
				include: [
					{
						project: "solid",
						version: ["latest", "v1"],
					},
					{
						project: ["router", "start", "meta"],
						version: "latest",
					},
				],
			},
			overrides: [
				{
					project: "router",
					title: "Solid Router",
					themeConfig: {
						sidebar: createFilesystemSidebar("./src/routes/solid-router"),
					},
				},
				{
					project: "start",
					title: "SolidStart",
					themeConfig: {
						sidebar: createFilesystemSidebar("./src/routes/solid-start"),
					},
				},
				{
					project: "meta",
					title: "Solid Meta",
					themeConfig: {
						sidebar: createFilesystemSidebar("./src/routes/solid-meta"),
					},
				},
			],
			themeConfig: {
				sidebar: createFilesystemSidebar("./src/routes/", {
					filter: (item) => {
						return !["solid-router", "solid-start", "solid-meta"].some(
							(project) => item.filePath.includes(`/src/routes/${project}`)
						);
					},
				}),
				discord: "https://discord.com/invite/solidjs",
				github: "https://github.com/solidjs",
				reportPagePath:
					"https://github.com/solidjs/solid-docs/issues/new?assignees=ladybluenotes&labels=improve+documentation%2Cpending+review&projects=&template=CONTENT.yml&title=[Content]:&subject=:path&page=:url",
				missingPagePath:
					"https://github.com/solidjs/solid-docs/issues/new?title=[Search]+Missing+results+for+query+%22:path",
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
				// failOnError: true,
				// eslint-disable-next-line no-useless-escape
				ignore: [/\{\getPath}/, /.*?emojiSvg\(.*/],
			},
		}),
	],
});
