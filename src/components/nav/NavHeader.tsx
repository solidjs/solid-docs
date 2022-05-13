import { useLocation } from "solid-app-router";
import { moon, sun } from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";
import { For, Show, useContext } from "solid-js";
import { ConfigContext } from "../ConfigContext";

function ActiveLink(props) {
  const location = useLocation();
  return (
    <a
      href={props.href}
      classList={{
        [props.className]: true,
        [props.activeClass]: props.isActive(location),
        [props.inactiveClass]: !props.isActive(location),
      }}
    >
      {props.children}
    </a>
  );
}

const sections = [
  { title: "Guides", href: "/guides" },
  { title: "Reference", href: "/reference" },
];

export const NavHeader = (props: { docsMode: "start" | "regular" }) => {
  const [, setConfig] = useContext(ConfigContext);

  return (
    <nav class="bg-white dark:bg-solid-darkbg sticky top-0 items-center w-full lg:px-5 pt-8 pb-4">
      <div class="w-full flex items-center justify-between">
        <a
          href="/"
          class="inline-flex space-x-1 text-xl font-normal items-center text-primary dark:text-primary-dark py-1 mr-0 sm:mr-3 whitespace-nowrap"
        >
          <Logo class="w-8 h-8 -mt-2 text-link dark:text-link-dark" />
          <span class="font-bold">
            Solid{props.docsMode === "start" ? "Start " : " "}
          </span>
          <span>Docs</span>
        </a>
        <div class="block dark:hidden">
          <button
            type="button"
            aria-label="Use Dark Mode"
            class="hidden lg:flex items-center w-10 h-10 pr-2 transform -translate-y-1"
            onClick={() => {
              setConfig((c) => ({ ...c, mode: "dark" }));
            }}
          >
            <Icon class="w-full h-full" path={moon} />
          </button>
        </div>
        <div
          class="hidden dark:block w-10 h-10"
          onClick={() => {
            setConfig((c) => ({ ...c, mode: "light" }));
          }}
        >
          <button
            type="button"
            aria-label="Use Light Mode"
            class="hidden lg:flex items-center pr-2"
          >
            <Icon class="w-full h-full" path={sun} />
          </button>
        </div>
      </div>

      <Show when={props.docsMode === "regular"}>
        <div class="px-0 pt-2 w-full 2xl:max-w-xs hidden lg:flex items-center self-center border-b-0 lg:border-b border-border dark:border-border-dark">
          <div class="w-full grid grid-cols-2">
            <For each={sections}>
              {({ title, href }) => (
                <ActiveLink
                  isActive={(loc) => loc.pathname.startsWith(href)}
                  activeClass="border-solid-default dark:border-solid-darkdefault font-bold"
                  class="border-transparent inline-flex w-full items-center border-2 rounded justify-center text-base leading-9 px-3 py-0.5 hover:text-link dark:hover:text-link-dark whitespace-nowrap"
                  href={href}
                >
                  {title}
                </ActiveLink>
              )}
            </For>
          </div>
        </div>
      </Show>
    </nav>
  );
};

export function Logo(props) {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 166 155.3"
    >
      <defs>
        <linearGradient
          id="a"
          gradientUnits="userSpaceOnUse"
          x1="27.5"
          y1="3"
          x2="152"
          y2="63.5"
        >
          <stop offset=".1" stop-color="#76b3e1" />
          <stop offset=".3" stop-color="#dcf2fd" />
          <stop offset="1" stop-color="#76b3e1" />
        </linearGradient>
        <linearGradient
          id="b"
          gradientUnits="userSpaceOnUse"
          x1="95.8"
          y1="32.6"
          x2="74"
          y2="105.2"
        >
          <stop offset="0" stop-color="#76b3e1" />
          <stop offset=".5" stop-color="#4377bb" />
          <stop offset="1" stop-color="#1f3b77" />
        </linearGradient>
        <linearGradient
          id="c"
          gradientUnits="userSpaceOnUse"
          x1="18.4"
          y1="64.2"
          x2="144.3"
          y2="149.8"
        >
          <stop offset="0" stop-color="#315aa9" />
          <stop offset=".5" stop-color="#518ac8" />
          <stop offset="1" stop-color="#315aa9" />
        </linearGradient>
        <linearGradient
          id="d"
          gradientUnits="userSpaceOnUse"
          x1="75.2"
          y1="74.5"
          x2="24.4"
          y2="260.8"
        >
          <stop offset="0" stop-color="#4377bb" />
          <stop offset=".5" stop-color="#1a336b" />
          <stop offset="1" stop-color="#1a336b" />
        </linearGradient>
      </defs>
      <path
        d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
        fill="#76b3e1"
      />
      <path
        d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
        opacity=".3"
        fill="url(#a)"
      />
      <path
        d="m52 35-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
        fill="#518ac8"
      />
      <path
        d="m52 35-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
        opacity=".3"
        fill="url(#b)"
      />
      <path
        d="M134 80a45 45 0 0 0-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z"
        fill="url(#c)"
      />
      <path
        d="M114 115a45 45 0 0 0-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z"
        fill="url(#d)"
      />
    </svg>
  );
}
