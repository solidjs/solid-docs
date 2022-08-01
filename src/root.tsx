// @refresh reload
import {
  Routes,
  Meta,
  Link,
  FileRoutes,
  Scripts,
  Html,
  Head,
  Body,
} from "solid-start";
import { parseCookie } from "solid-start/session";
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
import { HttpHeader, ServerContext } from "solid-start/server";
import { isServer } from "solid-js/web";
import { useLocation } from "solid-start";

function useCookies() {
  const context = useContext(ServerContext);
  const cookies = isServer
    ? context.request.headers.get("Cookie")
    : document.cookie;

  return parseCookie(cookies ?? "");
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
    <Html lang="en" class={"h-full " + config.mode}>
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <Link rel="shortcut icon" href="/favicon.ico" />
        <Link rel="stylesheet" href="/main.css" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
        <HttpHeader name="x-robots-tag" value="nofollow" />
      </Head>
      <Body class="font-sans antialiased text-lg bg-white dark:bg-solid-darkbg text-black dark:text-white leading-base min-h-screen lg:flex lg:flex-row">
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
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </Main>
              </MDXProvider>
            </PageStateProvider>
          </ConfigProvider>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
