import {Aside} from '~/components/configurable/Aside'

<Title>Static Site Generation (SSG)</Title>

<Aside type="advanced">
  This is a low level API intended for use by library authors. If you would like to use static site generation in your application we suggest making use of [Solid Start](https://start.solidjs.com/getting-started/what-is-solidstart) our meta-framework that makes adding server side rendering to your application extremely easy.
</Aside>

In this section we will be talking about static site generation and how you can implement it in Solid.

## What is Static Site Generation?

Static site generation is the process of generating a static (never changing) HTML website based on raw data through the use of web development frameworks like Solid.

Static sites are made up of HTML that loads up the same way every time, in opposition to dynamic website where data on the site can change based on the user input or changes in fetched data.

## How does Solid implement SSG?

Solid makes use of the [`renderToStringAsync`](/references/concepts/ssr/async-ssr) function in order to load all the asynchronous data and generate the HTML required.

You might be wondering what makes this any different from Async SSR then? Well the key difference between this and Async SSR is that in Async SSR the server runs the Solid app while in SSG the Solid app is compiled and has it's ouput stored ahead of time. Meaning the Solid code isn't touched again aside from in build time during updates.

This might sound a little vague and hard to understand so here's an example of how it looks in action.

## How to use SSG in Solid?

<Aside type="general"> This process of implementing SSG in Solid is more complicated when compared to implementing other forms of SSR in Solid, so please follow along carefully </Aside>

In order to make use of SSG in Solid you'll need to have a compiler that helps in compiling JS code. In this example we will be making use of Rollup.

```js
// rollup.config.js
import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import manifest from "rollup-route-manifest";

export default [
  {
    input: "App.jsx",
    output: [
      {
        dir: "public/js",
        format: "esm"
      }
    ],
    preserveEntrySignatures: false,
    plugins: [
      nodeResolve({ exportConditions: ["solid"], extensions: [".js", ".jsx", ".ts", ".tsx"] }),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true }]]
      }),
      terser()
    ]
  },
  {
    input: "index.js",
    output: [
      {
        dir: "lib",
        exports: "auto",
        format: "cjs"
      }
    ],
    external: ["solid-js", "solid-js/web", "node-fetch"],
    plugins: [
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ["solid"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "ssr", hydratable: true, async: true }]]
      }),
      json()
    ]
  }
];
```

In the code above we're setting up rollup to help us compile our code by turning all the jsx we have into compiled javascript that we'll be able to later run using `node`

Next let's create our `App.jsx`

```jsx
// App.jsx
export default function App() {
  return (
    <div>
      <h1>This is a header</h1>
      <p>This is a simple description</p>
    </div>
  )
}
```

Above is a simple component. You can make use of asynchronous data if you would like to since we'll be making use of the `renderToStringAsync` function all asynchronous data will be fetched and put in place before building the site.

Now we'll be creating an index.js file which rollup will be compiling and turning into a CommonJS file with all the jsx and tsx code transformed, compiled and ready to run.

```js
// index.js
import fetch from "node-fetch";
import { renderToStringAsync } from "solid-js/web";
import App from "./App";

globalThis.fetch = fetch;

// entry point for server render
export default req => {
  return renderToStringAsync(() => <App/>);
};
```

In the above code we're taking in our Solid component and rendering it into a string using the `renderToStringAsync` function.

Last but not least we will be creating a script that will help us generate and organize our static files.

```js
// generate.js
const path = require("path");
const renderStatic = require("solid-ssr/static");

const PAGES = ["index"];
const pathToServer = path.resolve(__dirname, "lib/index.js");
const pathToPublic = path.resolve(__dirname, "public");

renderStatic(
  PAGES.map(p => ({
    entry: pathToServer,
    output: path.join(pathToPublic, `${p}.html`),
    url: p === "index" ? `/` : `/${p}`
  }))
);
```

This will help us generate our static files using the `renderStatic` function provided by the `solid-ssr` package.

Now all that's left is to compile our code, run our script and serve our static site.

```bash
npx rollup -c rollup.config.js && node generate.js #compile and generate the site
npx serve public -l 8080 #serve the site
```

<Aside type="general">
  For more information on SSG and SSR with solid check out the [solid-ssr-workbench](https://github.com/ryansolid/solid-ssr-workbench) repo and the [solid-ssr](https://github.com/solidjs/solid/tree/main/packages/solid-ssr) repo.
</Aside>

## Limitations and benefits of SSG

#### Limitations

The main limitation of SSG in general is that it is completely static, meaning that there will be little to no user interactions and site data can only be updated if the site is completely rebuilt. This is why it is advised to use static site generation only in cases where a user will not be interacting with the site or if user interactions will be minimal.

#### Benefits

The main benefit of SSG is that static sites load significantly faster than dynamic sites due to the fact that they do not run any javascript and are pure HTML and CSS. Another benefit is that you won't have to worry about search engine crawling and indexing since there's no javascript to run and your site renders the same way everytime with the same data everytime, which makes it extremely good for blogs.
