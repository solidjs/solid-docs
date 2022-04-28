import { NavLink, Route, Routes, useLocation } from "solid-app-router";
import { NavHeader, SearchBar } from "./NavHeader";
import { NavGroup } from "./NavSection";
import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  useHeadlessSelectOptionChild,
} from "solid-headless";
import { For } from "solid-js";

export default function Nav() {
  return (
    <div class="no-bg-scrollbar bg-wash dark:bg-wash-dark lg:min-h-screen h-auto lg:h-[calc(100%-40px)] lg:overflow-y-scroll fixed flex flex-row lg:flex-col py-0 left-0 right-0 lg:max-w-xs w-full shadow lg:shadow-none z-50">
      <NavHeader />
      <TopMenu />
    </div>
  );
}

function TopMenu() {
  return (
    <aside
      class="lg:grow lg:flex flex-col w-full pt-4 pb-8 lg:pb-0 lg:max-w-xs fixed lg:sticky bg-wash dark:bg-wash-dark z-10 sm:top-16"
      classList={{
        "lg:block hidden": true,
        "block z-40": false,
      }}
      aria-hidden="false"
    >
      <div class="px-5 pt-16 sm:pt-10 lg:pt-0">
        <SearchBar />
      </div>
      <nav
        role="navigation"
        class="w-full h-screen lg:h-auto grow pr-0 lg:pr-5 pt-6 pb-44 lg:pb-0 lg:py-6 md:pt-4 lg:pt-4 overflow-y-scroll lg:overflow-y-auto scrolling-touch scrolling-gpu"
        style="--bg-opacity:0.2;"
      >
        <Routes>
          <Route path="/api/**/*" component={ApiNav} />
          <Route path="/learn/**/*" component={LearnNav} />
          <Route path="/**/*" component={HomeNav} />
        </Routes>
      </nav>
    </aside>
  );
}

const HomeSections = {
  // Foundations: {
  //   header: "Foundations",
  //   link: "/learn/foundations",
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

const LEARN_SECTIONS = {
  GettingStartedWithSolid: {
    header: "Getting Started With Solid",
    link: "/learn/getting-started",
    inSubsections: (p) => p.startsWith("/learn/getting-started-with-solid"),
    subsections: {
      Welcome: {
        header: "Welcome",
        link: "/learn/getting-started-with-solid/welcome",
      },
      "Installing Solid": {
        header: "Installing Solid",
        link: "/learn/getting-started-with-solid/installing-solid",
      },
      "Building UI with Components": {
        header: "Building UI with Components",
        link: "/learn/getting-started-with-solid/building-ui-with-components",
      },
      "Adding Interactivity with State": {
        header: "Adding Interactivity with State",
        link: "/learn/getting-started-with-solid/adding-interactivity-with-state",
      },
      "Control Flow": {
        header: "Control Flow",
        link: "/learn/getting-started-with-solid/control-flow",
      },
    },
  },
  Foundations: {
    header: "Foundations",
    link: "/learn/foundations",
    subsections: {
      "Why Solid?": {
        header: "Why Solid?",
        link: "/learn/getting-started-with-solid/why-solid",
      },
      "JavaScript for Solid": {
        header: "JavaScript for Solid",
        link: "/learn/getting-started-with-solid/javascript-for-solid",
      },
    },
    inSubsections: (p) => p.startsWith("/learn/foundations"),
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

function LearnNav() {
  return <SectionNav sections={LEARN_SECTIONS} />;
}

function NavItem(props) {
  return (
    <li>
      <NavLink
        class="p-2 pr-2 w-full rounded-none lg:rounded-r-lg text-left relative flex items-center justify-between pl-5 text-base"
        {...props}
        inactiveClass="text-secondary dark:text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800"
        activeClass="text-link dark:text-link-dark bg-highlight dark:bg-highlight-dark border-blue-40 hover:bg-highlight hover:text-link dark:hover:bg-highlight-dark dark:hover:text-link-dark active"
      >
        {props.children}
      </NavLink>
    </li>
  );
}
