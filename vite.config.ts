import { type PluginOption } from "vite";
import { defineConfig } from "@solidjs/start/config";
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

// @ts-ignore missing types
import pkg from "@vinxi/plugin-mdx";

const { default: vinxiMdx } = pkg;

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
		async load(id: string) {
			if (id === resolveVirtualModuleId) {
				const tree = await import(`${process.cwd()}/.solid/tree`);
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
		async load(id: string) {
			if (id === resolveVirtualModuleId) {
				const entries = await import(`${process.cwd()}/.solid/entries`);

				return `export default ${JSON.stringify(entries, null, 2)}`;
			}
		},
	};
}

export default defineConfig({
	start: {
		server: {
			preset: process.env.GITHUB_ACTIONS ? "node" : "netlify",
		},
		extensions: ["mdx", "md"],
		routesDir: "../content",
		solid: {
			extensions: ["mdx", "md"],

			ssr: {
				noExternal: ["@kobalte/core", "@internationalized/message"],
			},
		},
	},
	plugins: [
		docsTree(),
		docsEntries(),
		vinxiMdx.withImports({})({
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
		{ enforce: "pre" },
	],
});
