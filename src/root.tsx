// @refresh reload
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import cookie from "cookie";

import "./code.css";
import "virtual:windi.css";

import {
  Config,
  ConfigProvider,
  defaultConfig,
} from "./components/ConfigContext";
import { PageStateProvider } from "./components/PageStateContext";

import { MDXProvider } from "solid-mdx";
import Nav from "./components/nav/Nav";
import md from "./md";
import { createEffect, createResource, Show } from "solid-js";
import { Main } from "./components/Main";
import { createStore } from "solid-js/store";
import server from "solid-start/server";
import { isServer } from "solid-js/web";

export const [store, setStore] = createStore({
  darkMode: false,
});

async function getInitialConfig(): Promise<Config> {
  const cookies = isServer
    ? server(async () => server.request.headers.get("Cookie"))
    : async () => document.cookie;
  const parsed = cookie.parse(await cookies());
  return parsed?.["docs_config"]
    ? JSON.parse(parsed["docs_config"])
    : defaultConfig;
}

export default function Root() {
  const [data] = createResource(getInitialConfig);

  createEffect(() => {
    // setTimeout(() => {
    //   tippy("[data-template]", {
    //     content(reference) {
    //       const id = reference.getAttribute("data-template");
    //       const template = document.getElementById(id);
    //       return template.innerHTML;
    //     },
    //     allowHTML: true
    //   });
    // }, 50);

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setStore("darkMode", true);
    } else {
      document.documentElement.classList.add("light");
      setStore("darkMode", false);
    }
  });
  return (
    <html lang="en" class="h-full">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/main.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body class="font-sans antialiased text-lg bg-white dark:bg-solid-darkbg text-black dark:text-white leading-base min-h-screen h-auto lg:h-screen flex flex-row">
        <Show when={data()}>
          <ConfigProvider initialConfig={data()}>
            <PageStateProvider>
              <MDXProvider
                components={{
                  ...md,
                }}
              >
                <Nav />
                <Main>
                  <Routes />
                </Main>
              </MDXProvider>
            </PageStateProvider>
          </ConfigProvider>
        </Show>

        <Scripts />
      </body>
    </html>
  );
}
