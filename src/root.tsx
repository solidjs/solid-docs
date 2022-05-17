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
import { createRenderEffect, Suspense, useContext } from "solid-js";
import { Main } from "./components/Main";
import { StartContext } from "solid-start/server";
import { isServer } from "solid-js/web";
import { useLocation } from "solid-app-router";

function PageHeaders(props: { headers: Object }) {
  const ctx = useContext(StartContext);

  createRenderEffect(() => {
    if (isServer) {
      Object.entries(props.headers).forEach(([key, value]) => {
        ctx.responseHeaders.set(key, value);
      });
    }
  });

  return null;
}

function useCookies() {
  const context = useContext(StartContext);
  const cookies = isServer
    ? context.request.headers.get("Cookie")
    : document.cookie;

  return cookie.parse(cookies ?? "");
}

function useCookieConfig(): Config {
  const cookies = useCookies();
  return cookies?.["docs_config"]
    ? JSON.parse(cookies["docs_config"])
    : defaultConfig;
}

export default function Root() {
  const config = useCookieConfig();
  const location = useLocation();

  const docsMode = () =>
    /\/start/i.test(location.pathname) ? "start" : "regular";

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
        <PageHeaders headers={{ "x-robots-tag": "nofollow" }} />
      </head>
      <body class="font-sans antialiased text-lg bg-white dark:bg-solid-darkbg text-black dark:text-white leading-base min-h-screen lg:flex lg:flex-row">
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
                <Nav docsMode={docsMode()} />
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
