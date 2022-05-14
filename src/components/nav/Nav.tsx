import { NavLink, Route, Routes, useLocation } from "solid-app-router";
import { NavHeader } from "./NavHeader";
import { NavGroup, NavItem } from "./NavSection";
import { Accordion } from "solid-headless";
import { createEffect, createSignal, For, on, Show } from "solid-js";

export default function Nav(props: { docsMode: "start" | "regular" }) {
  const [showMenu, setShowMenu] = createSignal(false);
  const location = useLocation();

  createEffect((prev) => {
    if (location.pathname !== prev) {
      setShowMenu(false);
    }
    return location.pathname;
  });

  return (
    <div class="lg:max-h-screen lg:sticky lg:top-0 no-bg-scrollbar py-0 lg:max-w-xs w-full shadow lg:shadow-none z-50 overflow-y-scroll">
      <NavHeader
        docsMode={props.docsMode}
        showMenu={showMenu()}
        setShowMenu={setShowMenu}
      />
      <div
        classList={{
          hidden: !showMenu(),
          "lg:block": true,
        }}
      >
        <Show when={props.docsMode === "regular"} fallback={<StartMenu />}>
          <TopMenu />
        </Show>
      </div>
    </div>
  );
}

function TopMenu() {
  return (
    <aside class="w-full pt-4 lg:max-w-xs">
      <nav
        role="navigation"
        class="scrolling-touch scrolling-gpu"
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
    link: "/start/getting-started",
    subsections: [
      { header: "What is SolidStart?", link: "/what-is-solidstart" },
      { header: "Motivation & goals", link: "/motivation-and-goals" },
      { header: "Project setup", link: "/project-setup" },
    ],
  },
  {
    header: "Core concepts",
    link: "/start/core-concepts",
    subsections: [
      { header: "Routing & pages", link: "/routing-and-pages" },
      { header: "Assets, metadata, and CSS", link: "/assets-metadata-css" },
      { header: "Data fetching", link: "/data-fetching" },
      { header: "Actions", link: "/actions" },
      { header: "Server-only code", link: "/server-only-code" },
      { header: "State management", link: "/state-management" },
      { header: "Request lifecycle", link: "/request-lifecycle" },
      { header: "Middleware", link: "/middleware" },
      {
        header: "Environments & deployment",
        link: "/environments-and-deployment",
      },
    ],
  },
  {
    header: "Advanced concepts",
    link: "/start/advanced",
    subsections: [
      { header: "Streaming", link: "/streaming" },
      { header: "Caching", link: "/caching" },
      { header: "API routes", link: "/api-routes" },
      { header: "Usage with databases", link: "/databases" },
      { header: "Authentication", link: "/authentication" },
      { header: "Testing", link: "/testing" },
      { header: "Internationalization", link: "/i18n" },
      { header: "Static site generation", link: "/ssg" },
    ],
  },
  {
    header: "API",
    link: "/start/api",
    subsections: [
      { header: "Error boundary", link: "/error-boundary" },
      { header: "Files", link: "/files" },
      { header: "Forms", link: "/forms" },
      { header: "Head", link: "/head" },
      { header: "Router", link: "/router" },
      { header: "Server", link: "/server" },
      { header: "Session", link: "/session" },
    ],
  },
];

function StartMenu() {
  return (
    <ul class="m-5">
      <For each={START_SECTIONS}>
        {(section) => (
          <li class="mb-6">
            <span class="font-bold mb-2 block">{section.header}</span>
            <ul>
              <For each={section.subsections}>
                {(subsection) => (
                  <li class="px-2 my-1 py-0">
                    <NavLink
                      style="font-size: 0.95rem"
                      class="hover:underline"
                      activeClass="underline"
                      href={section.link + subsection.link}
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

const allStartSections: Record<"title" | "link", string>[] = [];
for (const section of START_SECTIONS) {
  for (const subsection of section.subsections) {
    allStartSections.push({
      link: section.link + subsection.link,
      title: `${section.header} — ${subsection.header}`,
    });
  }
}

export function getStartSection(pathname: string) {
  const current = allStartSections.findIndex((section) =>
    pathname.startsWith(section.link)
  );
  if (current === allStartSections.length - 1 || current === -1) {
    return undefined;
  }
  return allStartSections[current + 1];
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
