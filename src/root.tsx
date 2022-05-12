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
import { createResource, Show, Suspense, useContext } from "solid-js";
import { Main } from "./components/Main";
import server, { StartContext } from "solid-start/server";
import { isServer } from "solid-js/web";
// const cookies = isServer
//   ? server(async () => {
//       console.log(server.request);
//       console.log(server.request.headers);
//       return server.request.headers.get("Cookie");
//     })
//   : async () => document.cookie;
// async function getInitialConfig(): Promise<Config> {
//   // console.log(await cookies());
//   const parsed = cookie.parse((await cookies()) ?? "");
//   return parsed?.["docs_config"]
//     ? JSON.parse(parsed["docs_config"])
//     : defaultConfig;
// }

// async function getDocsMode() {
//   const path = isServer
//     ? server(async () => server.request.url)
//     : async () => document.location.href;
//   return /\/start/i.test(await path()) ? "start" : "regular";
// }

function useCookies() {
  const context = useContext(StartContext);
  const cookies = isServer
    ? context.request.headers.get("Cookie")
    : document.cookie;

  return cookie.parse(cookies);
}

function useCookieConfig(): Config {
  const cookies = useCookies();
  return cookies?.["docs_config"]
    ? JSON.parse(cookies["docs_config"])
    : defaultConfig;
}

export default function Root() {
  const config = useCookieConfig();
  const context = useContext(StartContext);
  const docsMode = () => {
    const path = isServer ? context.request.url : document.location.href;
    return /\/start/i.test(path) ? "start" : "regular";
  };

  let mainRef;

  return (
    <html lang="en" class={"h-full " + config.mode}>
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
        <Suspense>
          <ConfigProvider initialConfig={config}>
            <PageStateProvider>
              <MDXProvider components={{ ...md }}>
                <button
                  onClick={() => mainRef.querySelector("a").focus()}
                  class="skip-to-content-link"
                >
                  Skip to content
                </button>
                <Show when={docsMode() === "regular"} fallback={<>Start nav</>}>
                  <Nav />
                </Show>
                <Main ref={mainRef}>
                  <Routes />
                </Main>
              </MDXProvider>
            </PageStateProvider>
          </ConfigProvider>
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
