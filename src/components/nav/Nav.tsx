import { NavLink, Route, Routes, useLocation } from "solid-app-router";
import { NavHeader } from "./NavHeader";
import { NavGroup, NavItem } from "./NavSection";
import { Accordion } from "solid-headless";
import { For, Show } from "solid-js";

export default function Nav(props: { docsMode: "start" | "regular" }) {
  return (
    <div class="no-bg-scrollbar lg:min-h-screen h-auto lg:h-[calc(100%-40px)] lg:overflow-y-scroll fixed flex flex-row lg:flex-col py-0 left-0 right-0 lg:max-w-xs w-full shadow lg:shadow-none z-50">
      <NavHeader docsMode={props.docsMode} />
      <Show when={props.docsMode === "regular"} fallback={<StartMenu />}>
        <TopMenu />
      </Show>
    </div>
  );
}

function TopMenu() {
  return (
    <aside
      class="lg:grow lg:flex flex-col w-full pt-4 lg:max-w-xs fixed lg:sticky z-10 sm:top-16"
      classList={{
        "lg:block hidden": true,
        "block z-40": false,
      }}
      aria-hidden="false"
    >
      <nav
        role="navigation"
        class="w-full h-screen lg:h-auto grow overflow-y-scroll lg:overflow-y-auto scrolling-touch scrolling-gpu"
        style="--bg-opacity:0.2;"
      >
        <Routes>
          <Route path="/reference/**/*" component={ApiNav} />
          <Route path="/guides/**/*" component={GuidesNav} />
          <Route path="/**/*" component={HomeNav} />
        </Routes>
      </nav>
    </aside>
  );
}

const HomeSections = {
  // Foundations: {
  //   header: "Foundations",
  //   link: "/guides/foundations",
  //   inSubsections: (p) => p.startsWith("/api/files"),
  // },
  // Forms: {
  //   header: "Forms",
  //   link: "/api/forms",
  //   inSubsections: (p) => p.startsWith("/api/forms"),
  // },
  // "Server Functions": {
  //   header: "Server Functions",
  //   link: "/api/server",
  //   inSubsections: (p) => p.startsWith("/api/server"),
  // },
  // Router: {
  //   header: "Router",
  //   link: "/api/router",
  //   inSubsections: (p) => p.startsWith("/api/router"),
  // },
  // Session: {
  //   header: "Session",
  //   link: "/api/session",
  //   inSubsections: (p) => p.startsWith("/api/session"),
  // },
};

const START_SECTIONS = [
  {
    header: "Getting started",
    subsections: [
      {
        header: "What is SolidStart?",
        link: "/start/getting-started/what-is-solidstart",
      },
      { header: "Motivations", link: "/start/getting-started/motivations" },
      { header: "Project setup", link: "/start/core-concepts/project-setup" },
    ],
  },
  {
    header: "Core concepts",
    subsections: [
      {
        header: "Request lifecycle",
        link: "/start/core-concepts/request-lifecycle",
      },
      { header: "Pages", link: "/start/core-concepts/pages" },
      {
        header: "Assets, metadata, and CSS",
        link: "/start/core-concepts/assets-metadata-css",
      },
      { header: "Routing", link: "/start/core-concepts/routing" },
      { header: "Data fetching", link: "/start/core-concepts/data-fetching" },
      { header: "Actions", link: "/start/core-concepts/actions" },
      { header: "Middleware", link: "/start/core-concepts/middleware" },
      {
        header: "Server-only code",
        link: "/start/core-concepts/server-only-code",
      },
      {
        header: "State management",
        link: "/start/core-concepts/state-management",
      },
    ],
  },
  {
    header: "Advanced concepts",
    subsections: [
      { header: "Streaming", link: "/start/advanced/streaming" },
      { header: "Caching", link: "/start/advanced/caching" },
      { header: "API routes", link: "/start/advanced/api-routes" },
      { header: "Usage with databases", link: "/start/advanced/databases" },
      { header: "Authentication", link: "/start/advanced/authentication" },
      { header: "Testing", link: "/start/advanced/testing" },
      { header: "Internationalization", link: "/start/advanced/i18n" },
      { header: "Static site generation", link: "/start/advanced/ssg" },
    ],
  },
  {
    header: "API",
    subsections: [
      { header: "Error boundary", link: "/start/api/error-boundary" },
      { header: "Files", link: "/start/api/files" },
      { header: "Forms", link: "/start/api/forms" },
      { header: "Head", link: "/start/api/head" },
      { header: "Router", link: "/start/api/router" },
      { header: "Server", link: "/start/api/server" },
      { header: "Session", link: "/start/api/session" },
    ],
  },
];

function StartMenu() {
  return (
    <ul class="m-5">
      <For each={START_SECTIONS}>
        {(section) => (
          <li class="my-6">
            <span class="font-bold mb-2 block">{section.header}</span>
            <ul>
              <For each={section.subsections}>
                {(subsection) => (
                  <li class="px-2 my-1 py-0">
                    <NavLink
                      style="font-size: 0.95rem"
                      class="hover:underline"
                      activeClass="underline"
                      href={subsection.link}
                    >
                      {subsection.header}
                    </NavLink>
                  </li>
                )}
              </For>
            </ul>
          </li>
        )}
      </For>
    </ul>
  );
}

const GUIDES_SECTIONS = {
  GettingStartedWithSolid: {
    header: "Getting Started With Solid",
    link: "/guides/getting-started/welcome",
    inSubsections: (p) => p.startsWith("/guides/getting-started-with-solid"),
    subsections: {
      Welcome: {
        header: "Welcome",
        link: "/guides/getting-started-with-solid/welcome",
      },
      "Installing Solid": {
        header: "Installing Solid",
        link: "/guides/getting-started-with-solid/installing-solid",
      },
      "Building UI with Components": {
        header: "Building UI with Components",
        link: "/guides/getting-started-with-solid/building-ui-with-components",
      },
      "Adding Interactivity with State": {
        header: "Adding Interactivity with State",
        link: "/guides/getting-started-with-solid/adding-interactivity-with-state",
      },
      "Control Flow": {
        header: "Control Flow",
        link: "/guides/getting-started-with-solid/control-flow",
      },
      "Fetching Data": {
        header: "Fetching Data",
        link: "/guides/getting-started-with-solid/fetching-data",
      },
    },
  },
  Foundations: {
    header: "Foundations",
    link: "/guides/foundations/why-solid",
    subsections: {
      "Why Solid?": {
        header: "Why Solid?",
        link: "/guides/getting-started-with-solid/why-solid",
      },
      "JavaScript for Solid": {
        header: "JavaScript for Solid",
        link: "/guides/getting-started-with-solid/javascript-for-solid",
      },
    },
    inSubsections: (p) => p.startsWith("/guides/foundations"),
  },
};

function HomeNav() {
  return <SectionNav sections={HomeSections} />;
}

function ApiNav() {
  return <SectionNav sections={{}} />;
}

function SectionNav(props) {
  const location = useLocation();
  let section = Object.keys(props.sections).find(
    (k) =>
      location.pathname.startsWith(props.sections[k].link) ||
      props.sections[k].inSubsections(location.pathname)
  );

  return (
    <Accordion
      as="ul"
      toggleable
      defaultValue={section ? props.sections[section].header : undefined}
    >
      <For each={Object.keys(props.sections)}>
        {(header) => (
          <NavGroup
            href={props.sections[header].link}
            header={props.sections[header].header}
          >
            <For each={Object.keys(props.sections[header].subsections ?? {})}>
              {(subsection, i) => (
                <NavItem
                  href={props.sections[header].subsections[subsection].link}
                  title={props.sections[header].subsections[subsection].header}
                >
                  {props.sections[header].subsections[subsection].header}
                </NavItem>
              )}
            </For>
          </NavGroup>
        )}
      </For>
    </Accordion>
  );
}

function GuidesNav() {
  return <SectionNav sections={GUIDES_SECTIONS} />;
}

//dark:hover:bg-solid-darkLighterBg pointer-fine:hover:text-white pointer-fine:hover:bg-solid-medium dark:bg-solid-light text-white
