import { NavLink, Route, Routes, useLocation } from "@solidjs/router";
import { NavHeader } from "./NavHeader";
import { Collapsible, NavItem, SectionHeader } from "./NavSection";
// import { Accordion } from "solid-headless";
import { createEffect, createSignal, For, on, Show } from "solid-js";
import {
  GUIDES_SECTIONS,
  REFERENCE_SECTIONS,
  SECTIONS,
  SECTION_LEAF_PAGE,
  SECTION_PAGE,
} from "~/NAV_SECTIONS";
import { Preferences } from "../Preferences";

export default function Nav(props: { docsMode: "start" | "regular" }) {
  const [showMenu, setShowMenu] = createSignal(false);
  const [showPreferences, setShowPreferences] = createSignal(false);
  const location = useLocation();

  createEffect((prev) => {
    if (location.pathname !== prev) {
      setShowMenu(false);
    }
    return location.pathname;
  });

  return (
    <div class="lg:max-h-screen lg:sticky lg:top-0 no-bg-scrollbar py-0 lg:max-w-xs w-full shadow lg:shadow-none z-50 overflow-y-auto">
      <NavHeader
        docsMode={props.docsMode}
        showMenu={showMenu()}
        setShowMenu={setShowMenu}
      />
      <div class="my-2" classList={{ hidden: props.docsMode == "regular" }}>
        <div id="docsearch" />
      </div>
      <SectionHeader
        collapsed={!showPreferences()}
        panelId="prefs"
        onClick={() => setShowPreferences((p) => !p)}
      >
        <span>
          <span class="text-lg mr-2">⚙</span>️Preferences
        </span>
      </SectionHeader>

      <Show when={showPreferences()}>
        <div class="px-5 text-sm">
          <Preferences questionClass="font-bold" />
        </div>
      </Show>
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
      <nav class="scrolling-touch scrolling-gpu" style="--bg-opacity:0.2;">
        <Routes>
          <Route
            path={["/concepts/**/*", "/api-reference/**/*"]}
            component={ReferenceNav}
          />
          <Route
            path={["/tutorial/**/*", "/how-to-guides/**/*"]}
            component={GuidesNav}
          />
          <Route path="/**/*" component={GuidesNav} />
        </Routes>
      </nav>
    </aside>
  );
}

const START_SECTIONS = [];

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

function StartMenu() {
  return (
    <ul class="m-5 nav">
      <For each={START_SECTIONS}>
        {(section) => (
          <li class="mb-6">
            <span class="font-bold mb-2 block">{section.header}</span>
            <ul>
              <For each={section.subsections}>
                {(subsection) => (
                  <>
                    <li class="px-2 my-1 py-0">
                      <NavLink
                        style="font-size: 0.95rem"
                        class="hover:underline"
                        activeClass="text-solid-default font-bold"
                        href={section.link + subsection.link}
                      >
                        {subsection.header}
                      </NavLink>
                    </li>
                    <Show when={subsection.subsections?.length}>
                      <ul class="px-2">
                        <For each={subsection.subsections}>
                          {(item) => (
                            <>
                              <li class="pl-4 my-1 py-0">
                                <NavLink
                                  style="font-size: 0.85rem"
                                  class="hover:underline"
                                  activeClass="text-solid-default font-bold"
                                  href={section.link + item.link}
                                >
                                  {item.header}
                                </NavLink>
                              </li>
                            </>
                          )}
                        </For>
                      </ul>
                    </Show>
                  </>
                )}
              </For>
            </ul>
          </li>
        )}
      </For>
    </ul>
  );
}

function ReferenceNav() {
  return <SectionNav sections={REFERENCE_SECTIONS} />;
}

function GuidesNav() {
  return <SectionNav sections={GUIDES_SECTIONS} />;
}

function SectionsNavIterate(props: {
  pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
}) {
  const location = useLocation();

  createEffect(() => {
    console.log(location.pathname);
  });

  function isLeafPage(
    page: SECTION_PAGE | SECTION_LEAF_PAGE
  ): page is SECTION_LEAF_PAGE {
    return "link" in page;
  }

  //Wouldn't work if we actually went recursive (where the next level would have the possibility of not having any links)
  const isCollapsed = (pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>) => {
    return !pages.some((page) => {
      return isLeafPage(page) && location.pathname == page?.link;
    });
  };

  return (
    <For each={props.pages}>
      {(subsection) => (
        <>
          <Show when={isLeafPage(subsection)}>
            <NavItem
              href={(subsection as SECTION_LEAF_PAGE).link}
              title={subsection.name}
            >
              {subsection.name}
            </NavItem>
          </Show>
          <Show when={(subsection as SECTION_PAGE).pages}>
            <ul>
              <Collapsible
                header={subsection.name}
                startCollapsed={isCollapsed((subsection as SECTION_PAGE).pages)}
              >
                <SectionsNavIterate
                  pages={(subsection as SECTION_PAGE).pages}
                />
              </Collapsible>
            </ul>
          </Show>
        </>
      )}
    </For>
  );
}

function SectionNav(props: { sections: SECTIONS }) {
  const sectionNames = Object.keys(props.sections);

  return (
    <ul class="list-none">
      <For each={sectionNames}>
        {(name, i) => (
          <li>
            <h2 class="pl-4 text-solid-dark dark:text-white font-bold text-xl">
              {props.sections[name].name}
            </h2>
            <SectionsNavIterate pages={props.sections[name].pages} />
            {i() !== sectionNames.length - 1 ? (
              <hr class="w-full mb-2" />
            ) : null}
          </li>
        )}
      </For>
    </ul>
  );
}
