export type SECTION_LEAF_PAGE = {
  name: string;
  link: string;
};

export type SECTION_PAGE = {
  name: string;
  pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
  link?: string;
};

export type SECTIONS = {
  [key: string]: {
    name: string;
    // If this exists, then when the user clicks on the name of the section, it will direct here
    link?: string;
    pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
  };
};

export const REFERENCE_SECTIONS: SECTIONS = {
  references: {
    name: "Welcome",
    pages: [
      {
        name: "Introduction",
        link: "/references",
      },
    ],
  },
  concepts: {
    name: "Concepts",
    pages: [
      {
        name: "Reactivity",
        pages: [
          {
            name: "What is Reactivity",
            link: "/references/concepts/reactivity",
          },
          {
            name: "Tracking",
            link: "/references/concepts/reactivity/tracking",
          },
        ],
      },
      // {
      //   name: "State Management",
      //   pages: [
      //     {
      //       name: "Context",
      //       link: "/references/concepts/state-management/context",
      //     },
          // {
          //   name: "Store",
          //   link: "/references/concepts/state-management/store",
          // },
      //   ],
      // },
      {
        name: "Server Side Rendering (SSR)",
        pages: [
          {
            name: "Simple/Client-fetching SSR",
            link: "/references/concepts/ssr/simple-client-fetching-ssr",
          },
          {
            name: "Async SSR",
            link: "/references/concepts/ssr/async-ssr",
          },
          {
            name: "Streaming",
            link: "/references/concepts/ssr/streaming",
          },
          {
            name: "Static Site Generation (SSG)",
            link: "/references/concepts/ssr/ssg",
          },
          {
            name: "Hydration",
            link: "/references/concepts/ssr/hydration",
          },
        ],
      },
    ],
  },
  api: {
    name: "API",
    pages: [
      {
        name: "Reactivity Functions",
        pages: [
          {
            name: "createSignal",
            link: "/references/api-reference/basic-reactivity/createSignal",
          },
          {
            name: "createEffect",
            link: "/references/api-reference/basic-reactivity/createEffect",
          },
          {
            name: "createMemo",
            link: "/references/api-reference/basic-reactivity/createMemo",
          },
          {
            name: "createResource",
            link: "/references/api-reference/basic-reactivity/createResource",
          },
        ],
      },
      {
        name: "Lifecycles",
        pages: [
          {
            name: "onMount",
            link: "/references/api-reference/lifecycles/onMount",
          },
          {
            name: "onCleanup",
            link: "/references/api-reference/lifecycles/onCleanup",
          },
          {
            name: "onError (Deprecated)",
            link: "/references/api-reference/lifecycles/onError",
          },
        ],
      },
      {
        name: "Reactive Utilities",
        pages: [
          {
            name: "untrack",
            link: "/references/api-reference/reactive-utilities/untrack",
          },
          {
            name: "batch",
            link: "/references/api-reference/reactive-utilities/batch",
          },
          {
            name: "on",
            link: "/references/api-reference/reactive-utilities/on",
          },
          {
            name: "createRoot",
            link: "/references/api-reference/reactive-utilities/createRoot",
          },
          {
            name: "getOwner",
            link: "/references/api-reference/reactive-utilities/getOwner",
          },
          {
            name: "runWithOwner",
            link: "/references/api-reference/reactive-utilities/runWithOwner",
          },
          {
            name: "mergeProps",
            link: "/references/api-reference/reactive-utilities/mergeProps",
          },
          {
            name: "splitProps",
            link: "/references/api-reference/reactive-utilities/splitProps",
          },
          {
            name: "useTransition",
            link: "/references/api-reference/reactive-utilities/useTransition",
          },
          {
            name: "startTransition",
            link: "/references/api-reference/reactive-utilities/regularstartTransition",
          },
          {
            name: "observable",
            link: "/references/api-reference/reactive-utilities/observable",
          },
          {
            name: "from",
            link: "/references/api-reference/reactive-utilities/from",
          },
          {
            name: "mapArray",
            link: "/references/api-reference/reactive-utilities/mapArray",
          },
          {
            name: "indexArray",
            link: "/references/api-reference/reactive-utilities/indexArray",
          },
          {
            name: "catchError",
            link: "/references/api-reference/reactive-utilities/catchError",
          },
        ],
      },
      {
        name: "Stores",
        pages: [
          {
            name: "Using Stores",
            link: "/references/api-reference/stores/using-stores",
          },
          {
            name: "Store Utilities",
            link: "/references/api-reference/stores/store-utilities",
          },
        ],
      },
      {
        name: "Component APIs",
        pages: [
          {
            name: "createContext",
            link: "/references/api-reference/component-apis/createContext",
          },
          {
            name: "useContext",
            link: "/references/api-reference/component-apis/useContext",
          },
          {
            name: "children",
            link: "/references/api-reference/component-apis/children",
          },
          {
            name: "lazy",
            link: "/references/api-reference/component-apis/lazy",
          },
          {
            name: "createUniqueId",
            link: "/references/api-reference/component-apis/createUniqueId",
          },
        ],
      },
      {
        name: "Secondary Primitives",
        pages: [
          {
            name: "createDeferred",
            link: "/references/api-reference/secondary-primitives/createDeferred",
          },
          {
            name: "createComputed",
            link: "/references/api-reference/secondary-primitives/createComputed",
          },
          {
            name: "createRenderEffect",
            link: "/references/api-reference/secondary-primitives/createRenderEffect",
          },
          {
            name: "createReaction",
            link: "/references/api-reference/secondary-primitives/createReaction",
          },
          {
            name: "createSelector",
            link: "/references/api-reference/secondary-primitives/createSelector",
          },
        ],
      },
      {
        name: "Rendering",
        pages: [
          {
            name: "render",
            link: "/references/api-reference/rendering/render",
          },
          {
            name: "hydrate",
            link: "/references/api-reference/rendering/hydrate",
          },
          {
            name: "renderToString",
            link: "/references/api-reference/rendering/renderToString",
          },
          {
            name: "renderToStringAsync",
            link: "/references/api-reference/rendering/renderToStringAsync",
          },
          {
            name: "renderToStream",
            link: "/references/api-reference/rendering/renderToStream",
          },
          {
            name: "isServer",
            link: "/references/api-reference/rendering/isServer",
          },
          {
            name: "DEV",
            link: "/references/api-reference/rendering/DEV",
          },
          {
            name: "HydrationScript",
            link: "/references/api-reference/rendering/HydrationScript",
          },
        ],
      },
      {
        name: "Control Flow",
        pages: [
          {
            name: "<For>",
            link: "/references/api-reference/control-flow/For",
          },
          {
            name: "<Show>",
            link: "/references/api-reference/control-flow/Show",
          },
          {
            name: "<Switch> and <Match>",
            link: "/references/api-reference/control-flow/Switch-and-Match",
          },
          {
            name: "<Index>",
            link: "/references/api-reference/control-flow/Index",
          },
          {
            name: "<ErrorBoundary>",
            link: "/references/api-reference/control-flow/ErrorBoundary",
          },
          {
            name: "<Suspense>",
            link: "/references/api-reference/control-flow/Suspense",
          },
          {
            name: "<SuspenseList>",
            link: "/references/api-reference/control-flow/SuspenseList",
          },
          {
            name: "<Dynamic>",
            link: "/references/api-reference/control-flow/Dynamic",
          },
          {
            name: "<Portal>",
            link: "/references/api-reference/control-flow/Portal",
          },
        ],
      },
      {
        name: "Special JSX Attributes",
        pages: [
          {
            name: "ref",
            link: "/references/api-reference/special-jsx-attributes/ref",
          },
          {
            name: "classList",
            link: "/references/api-reference/special-jsx-attributes/classList",
          },
          {
            name: "style",
            link: "/references/api-reference/special-jsx-attributes/style",
          },
          {
            name: "innerHTML/textContent",
            link: "/references/api-reference/special-jsx-attributes/innerHTML-or-textContent",
          },
          {
            name: "on*",
            link: "/references/api-reference/special-jsx-attributes/on_",
          },
          {
            name: "on:* and oncapture:*",
            link: "/references/api-reference/special-jsx-attributes/on_-and-oncapture_",
          },
          {
            name: "use:*",
            link: "/references/api-reference/special-jsx-attributes/use_",
          },
          {
            name: "prop:*",
            link: "/references/api-reference/special-jsx-attributes/prop_",
          },
          {
            name: "attr:*",
            link: "/references/api-reference/special-jsx-attributes/attr_",
          },
          {
            name: "/*@once*/",
            link: "/references/api-reference/special-jsx-attributes/once",
          },
        ],
      },
    ],
  },
};

export const GUIDES_SECTIONS: SECTIONS = {
  foundations: {
    name: "Foundations",
    pages: [
      {
        name: "Why Solid?",
        link: "/guides/foundations/why-solid",
      },
      {
        name: "Thinking Solid",
        link: "/guides/foundations/thinking-solid",
      },
      {
        name: "JavaScript for Solid",
        link: "/guides/foundations/javascript-for-solid",
      },
      {
        name: "Solid Primitives",
        link: "/guides/foundations/solid-primitives",
      },
      {
        name: "Typescript for Solid",
        link: "/guides/foundations/typescript-for-solid",
      },
      {
        name: "Understanding Components",
        link: "/guides/foundations/understanding-components",
      },
    ],
  },
  "how-to-guides": {
    name: "How-To Guides",
    pages: [
      {
        name: "Get Ready for Solid",
        pages: [
          {
            name: "Welcome",
            link: "/guides/how-to-guides/get-ready-for-solid/",
          },
          {
            name: "Installation & Setup",
            link: "/guides/how-to-guides/get-ready-for-solid/installation-and-setup",
          },
          {
            name: "Linting",
            link: "/guides/how-to-guides/get-ready-for-solid/linting",
          },
          {
            name: "Solid Best Practices",
            link: "/guides/how-to-guides/get-ready-for-solid/solid-best-practices",
          },
        ],
      },
      {
        name: "Styling In Solid",
        pages: [
          {
            name: "Introduction",
            link: "/guides/how-to-guides/styling-in-solid",
          },
          {
            name: "CSS Modules",
            link: "/guides/how-to-guides/styling-in-solid/css-modules",
          },
          {
            name: "Sass",
            link: "/guides/how-to-guides/styling-in-solid/sass",
          },
          {
            name: "Less",
            link: "/guides/how-to-guides/styling-in-solid/less",
          },
          {
            name: "Tailwind CSS",
            link: "/guides/how-to-guides/styling-in-solid/tailwind-css",
          },
          {
            name: "UnoCSS",
            link: "/guides/how-to-guides/styling-in-solid/unocss",
          },
          {
            name: "WindiCSS",
            link: "/guides/how-to-guides/styling-in-solid/windicss",
          },
        ],
      },
      {
        name: "Accessibility in Solid",
        pages: [
          {
            name: "Introduction",
            link: "/guides/how-to-guides/accessibility-in-solid",
          },
          {
            name: "Best Practices",
            link: "/guides/how-to-guides/accessibility-in-solid/best-practices",
          },
          {
            name: "Solid Aria",
            link: "/guides/how-to-guides/accessibility-in-solid/solid-aria",
          },
        ],
      },
      {
        name: "Routing in Solid",
        pages: [
          {
            name: "Solid Router",
            link: "/guides/how-to-guides/routing-in-solid/solid-router",
          },
        ],
      },
      {
        name: "Deployment",
        pages: [
          {
            name: "Introduction",
            link: "/guides/how-to-guides/deployment/",
          },
          {
            name: "Deploying To Vercel",
            link: "/guides/how-to-guides/deployment/deploying-to-vercel",
          },
          {
            name: "Deploying To Netlify",
            link: "/guides/how-to-guides/deployment/deploying-to-netlify",
          },
          {
            name: "Deploying To Firebase",
            link: "/guides/how-to-guides/deployment/deploying-to-firebase",
          },
          {
            name: "Deploying To Cloudflare",
            link: "/guides/how-to-guides/deployment/deploying-to-cloudflare",
          },
          {
            name: "Deploying To Railway",
            link: "/guides/how-to-guides/deployment/deploying-to-railway",
          },
        ],
      },
      {
        name: "Animations in Solid",
        pages: [
          {
            name: "MotionOne for Solid",
            link: "/guides/how-to-guides/animations-in-solid/motionone-for-solid",
          },
          {
            name: "Solid Transition Group",
            link: "/guides/how-to-guides/animations-in-solid/solid-transition-group",
          },
        ],
      },
      {
        name: "Testing in Solid",
        pages: [
          {
            name: "Vitest",
            link: "/guides/how-to-guides/testing-in-solid/vitest",
          },
          {
            name: "Jest",
            link: "/guides/how-to-guides/testing-in-solid/jest",
          },
          {
            name: "Uvu",
            link: "/guides/how-to-guides/testing-in-solid/uvu",
          },
        ],
      },
      {
        name: "Comparison",
        pages: [
          {
            name: "React",
            link: "/guides/how-to-guides/comparison/react",
          },
          {
            name: "Vue",
            link: "/guides/how-to-guides/comparison/vue",
          },
          {
            name: "Preact",
            link: "/guides/how-to-guides/comparison/preact",
          },
          {
            name: "Svelte",
            link: "/guides/how-to-guides/comparison/svelte",
          },
          {
            name: "Angular",
            link: "/guides/how-to-guides/comparison/angular",
          },
          {
            name: "Qwik",
            link: "/guides/how-to-guides/comparison/qwik",
          },
          {
            name: "Marko",
            link: "/guides/how-to-guides/comparison/marko",
          },
        ],
      },
    ],
  },
  tutorials: {
    name: "Tutorials",
    pages: [
      {
        name: "Getting Started with Solid",
        // navigating to /guides/getting-started-with-solid takes you to /guides/getting-started-with-solid/welcome
        pages: [
          {
            name: "Welcome",
            link: "/guides/tutorials/getting-started-with-solid/welcome",
          },
          {
            name: "Installing Solid",
            link: "/guides/tutorials/getting-started-with-solid/installing-solid",
          },
          {
            name: "Building UI with Components",
            link: "/guides/tutorials/getting-started-with-solid/building-ui-with-components",
          },
          {
            name: "Adding Interactivity with State",
            link: "/guides/tutorials/getting-started-with-solid/adding-interactivity-with-state",
          },
          {
            name: "Control Flow",
            link: "/guides/tutorials/getting-started-with-solid/control-flow",
          },
          {
            name: "Fetching Data",
            link: "/guides/tutorials/getting-started-with-solid/fetching-data",
          },
        ],
      },
    ],
  },
  "troubleshooting&faq": {
    name: "Troubleshooting & FAQ",
    pages: [
      {
        name: "Frequently Encountered Errors (FEE)",
        link: "/guides/troubleshooting-and-faq/frequently-encountered-errors",
      },
      {
        name: "Frequently Asked Questions (FAQ)",
        link: "/guides/troubleshooting-and-faq/faq",
      },
    ],
  },
};
