import { type PluginOption, defineConfig } from "vite";
import solid from "solid-start/vite";
import netlify from "solid-start-netlify";
import node from "solid-start-node";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import { nodeTypes } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

import tree from ".solid/tree";

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

const adapter = process.env.GITHUB_ACTIONS ? node() : netlify();
export default defineConfig({
	plugins: [
		{
			...mdx({
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "solid-mdx",
				rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
				remarkPlugins: [remarkFrontmatter, remarkGfm],
			}),
			enforce: "pre",
		} as PluginOption,
		solid({
			adapter,
			extensions: [".mdx", ".md"],
			routesDir: "../content",
		}),
		docsTree(),
	],
	ssr: {
		noExternal: ["@kobalte/core", "@internationalized/message"],
	},
});
