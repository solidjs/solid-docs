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
        ],
      },
      {
        name: "Comparison",
        pages: [
          {
            name: "Vue",
            link: "/guides/how-to-guides/comparison/vue",
          },
        ],
      },
    ],
  },
};
