import { type PluginOption, defineConfig } from "vite"
import solid from "solid-start/vite"
import netlify from "solid-start-netlify"
import node from "solid-start-node"
import mdx from "@mdx-js/rollup"
import remarkFrontmatter from "remark-frontmatter"

const adapter = process.env.GITHUB_ACTIONS ? node() : netlify()
export default defineConfig({
	plugins: [
		{
			...mdx({
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "solid-mdx",
				remarkPlugins: [remarkFrontmatter],
			}),
			enforce: "pre",
		} as PluginOption,
		solid({
			adapter,
			extensions: [".mdx", ".md"],
			routesDir: "../content",
		}),
	],
	ssr: {
		noExternal: ["@kobalte/core", "@internationalized/message"],
	  },
})
