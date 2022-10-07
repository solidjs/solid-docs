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
          { name: "Reactivity Basics", link: "/concepts/reactivity" },
          { name: "Tracking", link: "/concepts/tracking" },
        ],
      },
    ],
  },
  api: {
    name: "API",
    pages: [
      {
        name: "API Reference",
        pages: [{ name: "Coming Soon", link: "/api-reference" }],
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
            link: "/tutorials/getting-started-with-solid/welcome",
          },
          {
            name: "Installing Solid",
            link: "/tutorials/getting-started-with-solid/installing-solid",
          },
          {
            name: "Building UI with Components",
            link: "/tutorials/getting-started-with-solid/building-ui-with-components",
          },
          {
            name: "Adding Interactivity with State",
            link: "/tutorials/getting-started-with-solid/adding-interactivity-with-state",
          },
          {
            name: "Control Flow",
            link: "/tutorials/getting-started-with-solid/control-flow",
          },
          {
            name: "Fetching Data",
            link: "/tutorials/getting-started-with-solid/fetching-data",
          },
        ],
      },
    ],
  },
  howTos: {
    name: "How-To Guides",
    pages: [
      {
        name: "Get Ready for Solid",
        pages: [
          {
            name: "Welcome",
            link: "/how-to-guides/get-ready-for-solid/",
          },
          {
            name: "JavaScript for Solid",
            link: "/how-to-guides/get-ready-for-solid/javascript-for-solid",
          },
        ],
      },
      {
        name:'Styling In Solid',
        pages:[
          {
            name:'Introduction',
            link:'/how-to-guides/styling-in-solid/'
          },
          {
            name:'CSS Modules & SASS',
            link:'/how-to-guides/styling-in-solid/css-modules-and-sass' 
          },
          {
            name:'CSS Frameworks',
            link:'/how-to-guides/styling-in-solid/css-frameworks'
          }
        ]
      }
    ],
  },
};
