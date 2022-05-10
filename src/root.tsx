// @refresh reload
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import { StartContext } from "solid-start/entry-server";
import cookie from "cookie";

import "./code.css";
import "virtual:windi.css";

import { ConfigProvider, defaultConfig } from "./components/ConfigContext";
import { PageStateProvider } from "./components/PageStateContext";

import { MDXProvider } from "solid-mdx";
import Nav from "./components/nav/Nav";
import md from "./md";
import { useContext } from "solid-js";
import { Main } from "./components/Main";

export default function Root() {
  const ctx = useContext(StartContext);

  let config = defaultConfig;

  try {
    config = JSON.parse(
      cookie.parse(ctx.request?.headers.get("Cookie"))["docs_config"]
    );
  } catch (e) {
    console.log("Failed to parse user config");
  }

  let mainRef;

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
      <body
        classList={{
          "font-sans antialiased text-lg bg-white dark:bg-solid-darkbg text-black dark:text-white leading-base min-h-screen h-auto lg:h-screen flex flex-row":
            true,
          light: config.mode === "light",
          dark: config.mode === "dark",
        }}
      >
        <ConfigProvider initialConfig={config}>
          <PageStateProvider>
            <MDXProvider
              components={{
                ...md,
              }}
            >
              <button
                onClick={() => {
                  mainRef.querySelector("a").focus();
                }}
                class="skip-to-content-link"
              >
                Skip to content
              </button>
              <Nav />
              <Main ref={mainRef}>
                <Routes />
              </Main>
            </MDXProvider>
          </PageStateProvider>
        </ConfigProvider>
        <Scripts />
      </body>
    </html>
  );
}
