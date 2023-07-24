import { defineConfig } from "vite";
import solid from "solid-start/vite";
import netlify from "solid-start-netlify";
import node from "solid-start-node";
import mdx from "@mdx-js/rollup";
import WindiCSS from "vite-plugin-windicss";
import rehypeRaw from "rehype-raw";
import { nodeTypes } from "@mdx-js/mdx";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import rehypeSlug from "rehype-slug";
import Icons from "unplugin-icons/vite";
import colors from "windicss/colors";
import remarkGfm from "remark-gfm";

const adapter = process.env.GITHUB_ACTIONS ? node() : netlify();
const colorScheme = colors.neutral;

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
          remarkGfm,
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
              xs: "0.75rem",
              sm: "0.875rem",
              base: "0.9rem",
              lg: "1rem",
              code: "calc(1em - 20%)",
            },
            backgroundImage: {
              darkgradient: `linear-gradient(180deg, #162537 0%, #070c12 100%)`,
              lightgradient: `linear-gradient(180deg, #f2f5fa 0%, #e1eaf4 100%)`,
            },
            colors: {
              solid: {
                dark: "#000000",
                darkbg: "#18293c",
                darkitem: "#243e5a",
                darkaction: "#406e9f",
                darklink: "#528bc6",
                light: "#FFFFFF",
                lightbg: "#eef3f9",
                lightitem: "#96b9dd",
                lightaction: "#cbdcee",
                lightlink: "#3971ad",
                accent: "#2c4f7c",
                accentlight: "#446b9e",
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
