import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

import { createSolidBase } from "@kobalte/solidbase/config";
import { osmium } from "solidbase-osmium";
import {
	createFilesystemSidebar,
	type SidebarItemWithMeta,
} from "@kobalte/solidbase/config/sidebar";

const solidBase = createSolidBase(osmium);
const siteUrl =
	process.env.SITE_URL ??
	process.env.DEPLOY_PRIME_URL ??
	"https://docs.solidjs.com";
const isProductionSite =
	new URL(siteUrl).hostname.toLowerCase() === "docs.solidjs.com";

// Reference groups are named by import specifier, which the filesystem
// sidebar would otherwise title-case (e.g. "Solid Js").
const REFERENCE_PACKAGE_TITLES: Record<string, string> = {
	"Solid Js": "solid-js",
	"Solid Web": "@solidjs/web",
	"Solid Router": "@solidjs/router",
	"Solid Meta": "@solidjs/meta",
	"Vite Plugin Solid": "vite-plugin-solid",
	"Filesystem Routing": "filesystem-routing",
};

function transformSidebarItem(item: SidebarItemWithMeta): SidebarItemWithMeta {
	if (!("items" in item)) return item;
	const packageTitle = REFERENCE_PACKAGE_TITLES[item.title];
	if (packageTitle && item.filePath?.includes("/reference/")) {
		return { ...item, title: packageTitle };
	}
	if (item.title === "Advanced") {
		return { ...item, collapsed: true };
	}
	if (item.title === "Jsx Properties") {
		return { ...item, title: "JSX properties" };
	}
	return item;
}

export default defineConfig({
	resolve: {
		dedupe: ["@solidjs/start", "@kobalte/solidbase"], // TODO: Remove once start vite 8 releases (mismatch caused by preview release)
	},
	plugins: [
		tailwindcss(),
		solidBase.plugin({
			title: "SolidJS Documentation",
			description:
				"Documentation for the Solid 2.0 release candidate, including reactivity, web rendering, routing, metadata, and Vite integration.",
			siteUrl,
			// TODO: point back at main when this branch becomes main
			editPath: "https://github.com/solidjs/solid-docs/edit/v2-rebuild/:path",
			themeConfig: {
				sidebar: createFilesystemSidebar("./src/routes/", {
					transform: transformSidebarItem,
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
				rules: isProductionSite
					? [
							{
								userAgent: "*",
								allow: ["/"],
								disallow: ["/i18n-status/"],
							},
						]
					: [{ userAgent: "*", disallow: ["/"] }],
			},
		}),
		solidStart(
			solidBase.startConfig({ middleware: "./src/middleware/index.ts" })
		),
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
