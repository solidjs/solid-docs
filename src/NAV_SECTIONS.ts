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
            name: "onError",
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

export const LEARN_SECTIONS: SECTIONS = {
  introduction: {
    name: "Introduction",
    pages: [
      {
        name: "Overview",
        link: "/learn/introduction/overview",
      },
      {
        name: "Core Principles",
        link: "/learn/introduction/core-principles",
      },
      {
        name: "Getting Started",
        link: "/learn/introduction/getting-started",
      },
      {
        name: "Installation & Setup",
        link: "/learn/introduction/installation-and-setup",
      },
      {
        name: "FAQ",
        link: "/learn/introduction/faq",
      }
    ],
  },
  essentials: {
    name: "Essentials",
    pages: [
      {
        name: "Understanding JSX Syntax",
        link: "/learn/essentials/understanding-jsx-syntax",
      },
      {
        name: "Intro to Reactivity",
        link: "/learn/essentials/intro-to-reactivity",
      },
      {
        name: "Components & Props",
        link: "/learn/essentials/components-and-props",
      },
      {
        name: "Bindings",
        link: "/learn/essentials/bindings",
      },
      {
        name: "Signals",
        link: "/learn/essentials/signals",
      },
      {
        name: "Managing Side Effects",
        link: "/learn/essentials/managing-side-effects",
      },
      {
        name: "Computed Values",
        link: "/learn/essentials/computed-values",
      },
      {
        name: "Conditional Rendering",
        link: "/learn/essentials/conditional-rendering",
      },
      {
        name: "List Rendering",
        link: "/learn/essentials/list-rendering",
      },
      {
        name: "Event Handling",
        link: "/learn/essentials/event-handling",
      }
    ],
  },
  tutorials: {
    name: "Tutorials",
    pages: [
      {
        name: "Beginner Tutorial",
        link: "/learn/tutorials/beginner-tutorial",
      },
    ],
  },
  guides: {
    name: "Guides",
    pages: [
      {
        name: "Styling your Components",
        link: "/learn/guides/styling-your-components",
      },
      {
        name: "Routing & Navigation",
        link: "/learn/guides/routing-and-navigation",
      },
      {
        name: "Fetching Data",
        link: "/learn/guides/fetching-data",
      },
      {
        name: "State Management",
        link: "/learn/guides/state-management",
      },
      {
        name: "Deploying your App",
        link: "/learn/guides/deploying-your-app",
      },
      {
        name: "TypeScript for Solid",
        link: "/learn/guides/typescript-for-solid",
      },
      {
        name: "Testing",
        link: "/learn/guides/testing",
      }
    ]
  },
  additonalResources: {
    name: "Additional Resources",
    pages: [
      {
        name: "Ecosystem",
        link: "/learn/additional-resources/ecosystem",
      },
      {
        name: "Contribution Guide",
        link: "#",
      },
      {
        name: "Community & Support",
        link: "/learn/additional-resources/community-and-support",
      }
    ]
  }
};
