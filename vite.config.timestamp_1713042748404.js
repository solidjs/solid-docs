// vite.config.ts
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
var adapter = process.env.GITHUB_ACTIONS ? node() : netlify();
var colorScheme = colors.neutral;
var vite_config_default = defineConfig({
  plugins: [
    Icons({
      compiler: "solid"
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
                lib: ["dom", "es2015"]
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
                  "~/*": ["./src/*"]
                }
              }
            }
          ]
        ]
      }),
      enforce: "pre"
    },
    {
      name: "twoslash-fix-lsp-linebreaks",
      transform: (code, id) => {
        if (id.endsWith(".md") || id.endsWith(".mdx")) {
          return {
            code: code.replace(/lsp="([^"]*)"/g, (match, p1) => {
              return `lsp={\`${p1.replaceAll("`", `\\\``)}\`}`;
            })
          };
        }
        return { code };
      },
      enforce: "pre"
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
                "Menlo"
              ]
            },
            boxShadow: {
              lg: "0px 0.8px 2px rgba(0,0,0,0.032),0px 2.7px 6.7px rgba(0,0,0,0.048),0px 12px 30px rgba(0,0,0,0.08)"
            },
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              base: "0.9rem",
              lg: "1rem",
              code: "calc(1em - 20%)"
            },
            backgroundImage: {
              darkgradient: `radial-gradient(87.08% 158.02% at 50% 12.92%, ${colorScheme["800"]} 0%, ${colorScheme["900"]} 100%)`,
              lightgradient: `radial-gradient(87.08% 158.02% at 50% 12.92%, #FFFFFF 0%, ${colorScheme["100"]} 100%)`
            },
            colors: {
              solid: {
                dark: colorScheme["900"],
                darkbg: colorScheme["800"],
                darkitem: colorScheme["700"],
                darkaction: colorScheme["500"],
                light: "#FFFFFF",
                lightbg: colorScheme["100"],
                lightitem: colorScheme["200"],
                lightaction: colorScheme["400"],
                accent: "#2c4f7c",
                accentlight: "#85C4FF"
              }
            }
          }
        }
      }
    }),
    solid({
      adapter,
      extensions: [".mdx", ".md"],
      routesDir: "../content"
    })
  ],
  optimizeDeps: {
    exclude: ["solid-headless"]
  },
  ssr: {
    noExternal: ["solid-headless", "solid-heroicons"]
  }
});
export {
  vite_config_default as default
};
