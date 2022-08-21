import { nodeTypes } from "@mdx-js/mdx";
import mdx from "@mdx-js/rollup";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import solid from "solid-start/vite";
import netlify from "solid-start-netlify";
import node from "solid-start-node";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";

const adapter = process.env.GITHUB_ACTIONS ? node() : netlify();

export default defineConfig({
  plugins: [
    Icons({
      compiler: "solid",
    }),
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        rehypePlugins: [rehypeSlug, [rehypeRaw, { passThrough: nodeTypes }]],
        remarkPlugins: [
          [
            remarkShikiTwoslash.default,
            {
              disableImplicitReactImport: true,
              includeJSDocInHover: true,
              // theme: "css-variables",
              themes: ["github-light", "github-dark"],
              defaultOptions: {
                lib: ["dom", "es2015"],
              },
              defaultCompilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                target: "ESNext",
                module: "ESNext",
                lib: ["dom", "es2015"],
                jsxImportSource: "solid-js",
                jsx: "preserve",
                types: ["vite/client"],
                paths: {
                  "~/*": ["./src/*"],
                },
              },
            },
          ],
        ],
      }),
      enforce: "pre",
    },
    {
      name: "twoslash-fix-lsp-linebreaks",
      transform: (code, id) => {
        if (id.endsWith(".md") || id.endsWith(".mdx")) {
          return {
            code: code.replace(/lsp="([^"]*)"/g, (match, p1) => {
              return `lsp={\`${p1.replaceAll("`", `\\\``)}\`}`;
            }),
          };
        }
        return { code };
      },
      enforce: "pre",
    },
    WindiCSS({
      config: {
        darkMode: "class",
        theme: {
          extend: {
            fontFamily: {
              sans: ["Gordita", "sans-serif"],
              mono: [
                "Source Code Pro",
                "ui-monospace",
                "SFMono-Regular",
                "Menlo",
              ],
            },
            boxShadow: {
              lg: "0px 0.8px 2px rgba(0,0,0,0.032),0px 2.7px 6.7px rgba(0,0,0,0.048),0px 12px 30px rgba(0,0,0,0.08)",
            },
            fontSize: {
              sm: "0.75rem",
              base: "0.9rem",
              lg: "1rem",
              code: "calc(1em - 20%)",
            },
            colors: {
              solid: {
                default: "#2c4f7c",
                darkbg: "#222222",
                darkLighterBg: "#444444",
                darkdefault: "#b8d7ff", //'#87b1e6',
                darkgray: "#252525",
                gray: "#414042",
                mediumgray: "#9d9d9d",
                lightgray: "#f3f5f7",
                dark: "#07254A",
                medium: "#446b9e",
                light: "#4f88c6",
                accent: "#0cdc73",
                secondaccent: "#0dfc85",
              },
            },
          },
        },
      },
    }),
    solid({
      adapter,

      extensions: [".mdx", ".md"],
      routesDir: "../content",
    }),
  ],
  optimizeDeps: {
    exclude: ["solid-headless"],
  },
  ssr: {
    noExternal: ["solid-headless", "solid-heroicons"],
  },
});
