import { type PluginOption, defineConfig } from "vite";
import solid from "solid-start/vite";
import netlify from "solid-start-netlify";
import node from "solid-start-node";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import { nodeTypes } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkExpressiveCode, {
	ExpressiveCodeTheme,
} from "remark-expressive-code";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";

import tree from ".solid/tree";
import entries from ".solid/entries";

function docsTree() {
	const virtualModuleId = "solid:collection/tree";
	const resolveVirtualModuleId = "\0" + virtualModuleId;

	return {
		name: "solid:collection/tree",
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolveVirtualModuleId;
			}
		},
		load(id: string) {
			if (id === resolveVirtualModuleId) {
				return `export default ${JSON.stringify(tree, null, 2)}`;
			}
		},
	};
}

function docsEntries() {
	const virtualModuleId = "solid:collection/entries";
	const resolveVirtualModuleId = "\0" + virtualModuleId;

	return {
		name: "solid:collection/entries",
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolveVirtualModuleId;
			}
		},
		load(id: string) {
			if (id === resolveVirtualModuleId) {
				return `export default ${JSON.stringify(entries, null, 2)}`;
			}
		},
	};
}

const adapter = process.env.GITHUB_ACTIONS ? node() : netlify();

export default defineConfig({
	plugins: [
		{
			...mdx({
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "solid-mdx",
				rehypePlugins: [
					[
						rehypeRaw,
						{
							passThrough: nodeTypes,
						},
					],
					[rehypeSlug],
					[rehypeAutoLinkHeadings],
				],
				remarkPlugins: [
					remarkFrontmatter,
					remarkGfm,
					[
						remarkExpressiveCode,
						{
							themes: ["min-light", "material-theme-ocean"],
							themeCSSSelector: (theme: ExpressiveCodeTheme) =>
								`[data-theme="${theme.name}"]`,
						},
					],
				],
			}),
			enforce: "pre",
		} as PluginOption,
		solid({
			adapter,
			extensions: [".mdx", ".md", "tsx"],
			routesDir: "../content",
		}),
		docsTree(),
		docsEntries(),
	],
	ssr: {
		noExternal: ["@kobalte/core", "@internationalized/message"],
	},
});
