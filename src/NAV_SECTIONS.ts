export type SECTION_LEAF_PAGE = {
  name: string;
  link: string;
};

export type SECTION_PAGE = {
  name: string;
  pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
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
  concepts: {
    name: "Concepts",
    pages: [
      {
        name: "Reactivity",
        pages: [
          {
            name: "Reactivity Basics",
            link: "/references/concepts/reactivity",
          },
          { name: "Tracking", link: "/references/concepts/tracking" },
        ],
      },
    ],
  },
  api: {
    name: "API",
    pages: [
      {
        name: "API Reference",
        pages: [{ name: "Coming Soon", link: "/references/api-reference" }],
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
      }
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
    pages: []
  },
};
