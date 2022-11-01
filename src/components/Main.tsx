import { NavLink, useLocation } from "@solidjs/router";
import { Show } from "solid-js";
import { Title as MetaTitle } from "@solidjs/meta";
import Footer from "./footer/Footer";
import { getNextPrevPages, getStartSection } from "./nav/Nav";
import Summary from "./nav/Summary";
import { NextSection, PrevNextSection, PrevSection } from "./NextSection";
import { createStore } from "solid-js/store";
import {
  GUIDES_SECTIONS,
  REFERENCE_SECTIONS,
  SECTION_LEAF_PAGE,
} from "~/NAV_SECTIONS";

export function Main(props) {
  const location = useLocation();
  const [pages, setPages] = createStore(() => {
    let prevPage: SECTION_LEAF_PAGE, nextPage: SECTION_LEAF_PAGE;

    if (location.pathname.startsWith("/references")) {
      [prevPage, nextPage] = getNextPrevPages(
        location.pathname,
        REFERENCE_SECTIONS
      );
    } else if (location.pathname.startsWith("/guides")) {
      [prevPage, nextPage] = getNextPrevPages(
        location.pathname,
        GUIDES_SECTIONS
      );
    } else {
      return null;
    }
    return { prevPage, nextPage };
  });

  // const nextStartSection = () => getStartSection(location.pathname);

  return (
    <main class="flex flex-col md:flex-row items-start justify-between flex-grow">
      <div class="pt-4 md:pt-10 w-full lg:max-w-xs sticky z-50 top-0 md:hidden">
        <Summary collapsed={true} />
      </div>
      <article class="min-w-0 w-full md:max-w-4xl lg:max-w-3xl mx-auto">
        <div class="flex justify-start">
          <div class="flex w-full flex-col min-h-screen md:px-5 sm:px-12">
            <div
              ref={props.ref}
              class="w-full flex-grow ml-0 flex justify-center"
            >
              <div class="w-full">{props.children}</div>
            </div>
            <div>
              {/* <Show when={!!nextStartSection()}>
                <NavLink
                  class="hover:underline block mt-20 mb-10 text-center"
                  href={nextStartSection().link}
                >
                  Next up: {nextStartSection().title} &raquo;
                </NavLink>
              </Show> */}
              <Show when={pages() !== null}>
                <PrevNextSection>
                  <Show when={pages().prevPage?.link}>
                    <PrevSection
                      title={pages().prevPage.name}
                      href={pages().prevPage.link}
                    />
                  </Show>
                  <Show when={pages().nextPage?.link}>
                    <NextSection
                      title={pages().nextPage.name}
                      href={pages().nextPage.link}
                    />
                  </Show>
                </PrevNextSection>
              </Show>
              <Footer />
            </div>
          </div>
        </div>
      </article>
      <div class="pt-4 md:pt-10 w-full lg:max-w-xs sticky z-50 top-0 hidden md:block">
        <Summary />
      </div>
    </main>
  );
}

export function Title(props) {
  return (
    <h1 class="heading mt-10 text-primary dark:text-primary-dark -mx-.5 break-words text-5xl font-bold leading-tight">
      {props.children}
      <MetaTitle>{props.children}</MetaTitle>
      <a
        href="#undefined"
        aria-label="Link for this heading"
        title="Link for this heading"
        class="jsx-1906412371 anchor hidden"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 13 13"
          xmlns="http://www.w3.org/2000/svg"
          class="jsx-1906412371 text-gray-70 ml-2 h-5 w-5"
        >
          <g fill="currentColor" fill-rule="evenodd" class="jsx-1906412371">
            <path
              d="M7.778 7.975a2.5 2.5 0 0 0 .347-3.837L6.017 2.03a2.498 2.498 0 0 0-3.542-.007 2.5 2.5 0 0 0 .006 3.543l1.153 1.15c.07-.29.154-.563.25-.773.036-.077.084-.16.14-.25L3.18 4.85a1.496 1.496 0 0 1 .002-2.12 1.496 1.496 0 0 1 2.12 0l2.124 2.123a1.496 1.496 0 0 1-.333 2.37c.16.246.42.504.685.752z"
              class="jsx-1906412371"
            ></path>
            <path
              d="M5.657 4.557a2.5 2.5 0 0 0-.347 3.837l2.108 2.108a2.498 2.498 0 0 0 3.542.007 2.5 2.5 0 0 0-.006-3.543L9.802 5.815c-.07.29-.154.565-.25.774-.036.076-.084.16-.14.25l.842.84c.585.587.59 1.532 0 2.122-.587.585-1.532.59-2.12 0L6.008 7.68a1.496 1.496 0 0 1 .332-2.372c-.16-.245-.42-.503-.685-.75z"
              class="jsx-1906412371"
            ></path>
          </g>
        </svg>
      </a>
    </h1>
  );
}

export function DocsSectionLink() {
  return (
    <div class="flex mb-3 mt-0.5 items-center">
      <a
        class="text-link dark:text-link-dark text-sm tracking-wide font-bold uppercase mr-1 hover:underline"
        href="/apis"
      >
        API Reference
      </a>
      <span class="inline-block mr-1 text-link dark:text-link-dark text-lg">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.86612 13.6161C6.37796 14.1043 6.37796 14.8957 6.86612 15.3839C7.35427 15.872 8.14572 15.872 8.63388 15.3839L13.1339 10.8839C13.622 10.3957 13.622 9.60428 13.1339 9.11612L8.63388 4.61612C8.14572 4.12797 7.35427 4.12797 6.86612 4.61612C6.37796 5.10428 6.37796 5.89573 6.86612 6.38388L10.4822 10L6.86612 13.6161Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    </div>
  );
}
