import { NavLink, Route, Routes, useLocation } from "@solidjs/router";
import { NavHeader } from "./NavHeader";
import { NavPreferences } from "./NavPreferences";
import { Collapsible, NavItem } from "./NavSection";
import { createDeferred, createEffect, createMemo, createSignal, For, Show, useTransition } from "solid-js";
import {
  GUIDES_SECTIONS,
  REFERENCE_SECTIONS,
  SECTIONS,
  SECTION_LEAF_PAGE,
  SECTION_PAGE,
} from "~/NAV_SECTIONS";

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
    <div class="lg:max-h-screen lg:sticky lg:top-0 no-bg-scrollbar lg:min-w-[200px] lg:max-w-sm w-full shadow lg:shadow-none z-50 overflow-y-auto flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <NavHeader
          docsMode={props.docsMode}
          showMenu={showMenu()}
          setShowMenu={setShowMenu}
        />
      </div>
      {/* <div id="docsearch"></div> */}
      <div class="hidden md:block">
        <NavPreferences id="desktop" />
      </div>
      <div
        classList={{
          hidden: !showMenu(),
          "lg:block border-b md:border-none border-solid-lightitem dark:border-solid-darkitem pb-4":
            true,
        }}
      >
        <Show when={props.docsMode === "regular"} fallback={<StartMenu />}>
          <TopMenu />
        </Show>
      </div>
      {/* <div class="my-2" classList={{ hidden: props.docsMode == "regular" }}>
        <div id="docsearch" />
      </div> */}
      <div class="md:hidden">
        <NavPreferences id="mobile" />
      </div>
    </div>
  );
}

function TopMenu() {
  return (
    <aside class="w-full">
      <nav class="scrolling-touch scrolling-gpu" style="--bg-opacity:0.2;">
        <Routes>
          <Route
            path={"/references/**/*"}
            component={ReferenceNav}
          />
          <Route
            path={"/guides/**/*"}
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

export function getNextPrevPages(pathname: string, sections:SECTIONS) {
  const allGuidesSections = getAllSections(sections);
  let nextPrevPages:SECTION_LEAF_PAGE[] = []

  const currentPageIndex = allGuidesSections.findIndex(v => v.link.startsWith(pathname))
  const nextPage = allGuidesSections[currentPageIndex+1]
  const prevPage = allGuidesSections[currentPageIndex-1]

  nextPrevPages.push(...[prevPage, nextPage])

  return nextPrevPages;
}

function getAllSections(
  sections: SECTIONS | (SECTION_PAGE | SECTION_LEAF_PAGE)[]
):SECTION_LEAF_PAGE[] {
  let allSections:SECTION_LEAF_PAGE[] = [];

  for (const section in sections) {
    const doesSectionContainPages = sections[section].pages !== undefined;
    if (doesSectionContainPages) {
      for (const page of sections[section].pages) {
        const doesPageContainInnerPages =
          (page as SECTION_PAGE).pages !== undefined;
        if (doesPageContainInnerPages) {
          allSections.push(...getAllSections((page as SECTION_PAGE).pages));
        } else {
          allSections.push(page);
        }
      }
    } else {
      allSections.push(sections[section]);
    }
  }

  return allSections;
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
                {(subsection: any) => (
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
                          {(item: any) => (
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

  function isLeafPage(
    page: SECTION_PAGE | SECTION_LEAF_PAGE
  ): page is SECTION_LEAF_PAGE {
    return "link" in page;
  }

  const isCollapsed = (pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>, pathname:string) => {
    return !pages.some((page) => {
      return isLeafPage(page) && pathname == page?.link;
    });
  };

  return (
    <For each={props.pages}>
      {(subsection: SECTION_LEAF_PAGE | SECTION_PAGE) => (
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
                startCollapsed={() => isCollapsed((subsection as SECTION_PAGE).pages, location.pathname)}
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
    <ul class="flex flex-col gap-4">
      <For each={sectionNames}>
        {(name, i) => (
          <>
            <li>
              <h2 class="pl-2 text-solid-dark dark:text-white font-bold text-xl">
                {props.sections[name].name}
              </h2>
              <SectionsNavIterate pages={props.sections[name].pages} />
            </li>
            <Show when={i() !== sectionNames.length - 1}>
              <li>
                <hr class="w-full mb-2" />
              </li>
            </Show>
          </>
        )}
      </For>
    </ul>
  );
}
