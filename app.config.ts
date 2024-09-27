import { defineConfig } from "@solidjs/start/config";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import { nodeTypes } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkExpressiveCode, {
	ExpressiveCodeTheme,
} from "remark-expressive-code";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";

// @ts-expect-error missing types
import pkg from "@vinxi/plugin-mdx";

const { default: vinxiMdx } = pkg;
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
		name: "solid:collection",
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

export default defineConfig({
	middleware: "src/middleware/index.ts",
	server: {
		preset: "netlify",
		prerender: {
			crawlLinks: true,
			autoSubfolderIndex: false,
			failOnError: true,
			ignore: [/\{\getPath}/, /.*?emojiSvg\(.*/],
		},
	},
	extensions: ["mdx", "md", "tsx"],
	vite: () => ({
		plugins: [
			docsData(),
			vinxiMdx.withImports({})({
				define: {
					"import.meta.env": "'import.meta.env'",
				},
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
					[
						rehypeAutoLinkHeadings,
						{
							behavior: "wrap",
							properties: {
								className: "heading",
							},
						},
					],
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
	}),
});
