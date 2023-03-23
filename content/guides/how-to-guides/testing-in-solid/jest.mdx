import { IfTS } from "~/components/configurable/IfConfig";
import { CodeTabs } from "~/components/Tabs";
import JestCounterJS from "./snippets/jest-counter-js.mdx";
import JestCounterTS from "./snippets/jest-counter-ts.mdx";
import JestCounterTestJS from "./snippets/jest-counter-test-js.mdx";
import JestCounterTestTS from "./snippets/jest-counter-test-ts.mdx";
import JestLoremJS from "./snippets/jest-lorem-js.mdx";
import JestLoremTS from "./snippets/jest-lorem-ts.mdx";
import JestLoremTestJS from "./snippets/jest-lorem-test-js.mdx";
import JestLoremTestTS from "./snippets/jest-lorem-test-ts.mdx";
import JestClickOutsideJS from "./snippets/jest-clickoutside-js.mdx";
import JestClickOutsideTS from "./snippets/jest-clickoutside-ts.mdx";
import JestClickOutsideTestJS from "./snippets/jest-clickoutside-test-js.mdx";
import JestClickOutsideTestTS from "./snippets/jest-clickoutside-test-ts.mdx";

<Title>Jest</Title>

Jest is a feature-rich integrated unit test suite written by Facebook including a test runner, support for different environments, extendable assertion library, mocking facilities and coverage measurement.

<IfTS>
## Starter Template

In the official [vite starter templates](../get-ready-for-solid/installation-and-setup), there is also a `ts-jest` template that already installs Jest and most of the other requirements:

```bash
npx degit solidjs/templates/ts-jest my-solid-project
cd my-solid-project
npm install # or pnpm install or yarn install
```

If you have installed it, continue with the <a href="#ignoring-certain-files" target="_self">extended Setup</a>.
</IfTS>

## Installation

We first need to install the `jest` package:

```bash
npm install --save-dev jest
pnpm i --dev jest           # Using pnpm
yarn add --dev jest         # Using yarn
```

## Setup

To test Solid code with Jest, you need to set it up. The setup can be done in the `"jest"` field of `package.json` or as a separate `jest.config.js` file. The latter allows having different setups, for testing both client-side and server-side code, and for programmatically augment existing presets.

At the time of writing, Jest only officially supports the <a class="footnote" id="cjs-module-format" href="#fn-cjs-module-format" target="_self">CJS module format</a> directly and uses a transformation pipeline to run other formats and transpiled JS. Since Solid uses transpiled code, we need to set it up.

Because Jest runs all imported code as CJS, we either need to transform files that are not valid CJS or make Jest ignore them.

### Solid code transformation

There are several ways to transform Solid code: the preferred method is a <a class="footnote" id="jest-preset" href="#fn-jest-preset" target="_self">preset</a> called `solid-jest` that contains the configuration for the transformation of Solid JSX to CJS. We first need to install it<IfTS>, unless we want to use `ts-jest` to transform TypeScript (see below)</IfTS>:

```bash
npm install --save-dev solid-jest
pnpm i --dev solid-jest           # Using pnpm
yarn add --dev solid-jest         # Using yarn
```

To add it to our Jest configuration, we need to add the correct export for client-side or server-side testing to the `preset` property of the configuration (in `package.json#jest` or `jest.config.js`):

```js
{ "preset": "solid-jest/preset/browser" }
// or
{ "preset": "solid-jest/preset/node" }
```

<IfTS>
### TypeScript code transformation

#### Alternative 1: Using babel to transform TypeScript

If we are using <a class="footnote" id="babel" href="#fn-babel" target="_self">babel</a> to transform TypeScript, we need to install `@babel/preset-typescript`:

```bash
npm install --save-dev @babel/preset-typescript
pnpm i --dev @babel/preset-typescript           # Using pnpm
yarn add --dev @babel/preset-typescript         # Using yarn
```

We also need to set up a babel configuration if not already present:

```bash
cat > .babelrc <<- EOF
{
  "presets": [
    "@babel/preset-env",
    "babel-preset-solid",
    "@babel/preset-typescript"
  ]
}
EOF
```

### Alternative 2: Using ts-jest to transform TypeScript

This does not require `solid-jest`. Instead of solely using the babel-transform, we can use the TypeScript compiler to transform the tests. This means that the tests are statically type-checked before running them. While this will reduce the speed of running tests, it may catch errors in the tests' code.

To use it, we first need to install it:

```bash
npm install --save-dev ts-jest
pnpm i --dev ts-jest           # Using pnpm
yarn add --dev ts-jest         # Using yarn
```

Then we need to configure Jest to use it in `package.json#jest` or `jest.config.js`:

```js
{ 
  "preset": "ts-jest",
  "globals": {
    "ts-jest": {
      "tsconfig": "tsconfig.json",
      "babelConfig": {
        "presets": [
          "babel-preset-solid",
          "@babel/preset-env"
        ]
      }
    }
  }
}
```

If we want to test the code as it would run in the browser, we also need to alias the solid-modules to the correct version because ts-jest unfortunately cannot detect the browser mode. Add the following to the previous configuration:

```js
{
  "moduleNameMapper": {
    "solid-js/web": "<rootDir>/node_modules/solid-js/web/dist/web.cjs",
    "solid-js": "<rootDir>/node_modules/solid-js/dist/solid.cjs"
  }
}
```

</IfTS>

### Ignoring certain files

As already mentioned, Jest will treat anything imported (including CSS, images) as CJS. This may lead to errors. To make Jest ignore them, create an empty file:

```bash
touch .empty.js
```

And then create an alias for any file that might lead to errors in your Jest configuration:

```js
{
  "moduleNameMapper": {
    ".*\\.(css|jpe?g|png|svg)$": "<rootDir>/.empty.js"
  }
}
```

However, this might change the behavior of your code. If you need to test for HTML class names provided by CSS modules, that would not work.

### Other transformations

There are several transformations for other file types available.

* CSS modules: `jest-css-modules-transform`
* SCSS: `jest-scss-transform`
* Path import for plain files: `jest-file-loader`
* JSON5: `@talabes/json5-jest`
* GraphQL: `@graphql-tools/jest-transform`
* Web Worker: `jest-webworker`
* more on [npmjs](https://www.npmjs.com/search?q=jest+transform)

If the search for a matching transformation is without result, the solution may be a <a class="footnote" id="custom-transform" href="#fn-custom-transform" target="_self">custom transform</a>.

We can simply install their packages like before, just replace `[transform-module]` with the above module name:

```bash
npm install --save-dev [transform-module]
pnpm i --dev [transform-module]       # Using pnpm
yarn add --dev [transform-module]     # Using yarn
```

The easiest way to use them is to augment the existing preset in a `jest.config.js` file. Otherwise, we need to merge the contents of the preset and the additional transformations manually:

```js
// jest.config.js
const jestConfig = require("solid-jest/preset/browser");
jestConfig.transform["\\.module\\.css$"] =
  "jest-css-modules-transform";
modules.export = jestConfig;
```

In case we want to stick with the configuration in `package.json#jest`, we need to copy the included transform for `.jsx` and `.tsx` files into the transform declarations:

```js
{
  "transform": {
    "\\.[jt]s$": "babel-jest",
    "\\.module\\.css$": "jest-css-modules-transform"
  }
}
```

## Environment

Solid.js can run both in the browser and on the server. By default, Jest tests everything in a node-environment. To test browser code with Jest without an actual browser, we need a DOM environment. The <a class="footnote" id="jsdom" href="#fn-jsdom" target="_self">de-facto standard is `jsdom`</a>. To use it, we first need to install it together with the Jest environment:

```bash
npm install --save-dev jest-environment-jsdom
pnpm i --dev jest-environment-jsdom           # Using pnpm
yarn add --dev jest-environment-jsdom         # Using yarn
```

We also need to add the environment to the Jest configuration in `package.json#jest` or `jest.config.js`:

```js
{ "testEnvironment": "jsdom" }
```

## Running your tests

Finally, we can add the following script to package.json to call <a class="footnote" href="#fn-jest-cli" name="jest-cli" target="_self">Jest's command-line-interface</a>:

```js
{
  "scripts": {
    "test": "jest"
  }
}
```

If our test works, the output looks something like:

```bash
> jest

 PASS  src/testing.test.tsx
  ✓ changes text on click (53 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.012 s
Ran all test suites.
```

## Testing your code with testing-library

The undisputed gold standard for component testing is now defined by <a class="footnote" id="testing-library" href="#fn-testing-library" target="_self">Kent C. Dodds' Testing Library</a>, which is originally written for React, but there are multiple ports for other libraries, and Solid is no exception.

### Setup

To test with `@solidjs/testing-library`, we first need to install it:

```bash
npm install --save-dev @solidjs/testing-library
pnpm i --dev @solidjs/testing-library      # Using pnpm
yarn add --dev @solidjs/testing-library    # Using yarn
```

Testing-library also provides a small, helpful extension for jest's built-in assertions called `@testing-library/jest-dom` that we can also install:

```bash
npm install --save-dev @testing-library/jest-dom
pnpm i --dev @testing-library/jest-dom     # Using pnpm
yarn add --dev @testing-library/jest-dom   # Using yarn
```

Now we need to run it in advance of our test, so we can use the extended assertions. We could either include it manually in our tests, or more convenient, include it in the `setupFiles` of our Jest configuration:

```js
{
  "setupFiles": [
    "node_modules/@testing-library/jest-dom/extend-expect"
  ]
}
```

There is another useful addition from Testing Library for testing user events: `@testing-library/user-events`. It tries to replicate the actual events that will typically happen in a user situation, for example, they will focus input fields before typing into them. If we want to test complex interactivity, we should install it, too.

```bash
npm install --save-dev @testing-library/user-events
pnpm i --dev @testing-library/user-events    # Using pnpm
yarn add --dev @testing-library/user-events  # Using yarn
```

### Testing components

Let us test our most basic example: the counter. Consider the following component that you may have seen in the playground:

<CodeTabs
  js={[{ name: "counter.jsx", component: JestCounterJS }]}
  ts={[{ name: "counter.tsx", component: JestCounterTS }]}
/>

We want to test if there is a button that counts up on click; to make sure that it is working more than one time, we will try it a second time, so this is what our test looks like:

<CodeTabs
  js={[{ name: "counter.test.jsx", component: JestCounterTestJS }]}
  ts={[{ name: "counter.test.tsx", component: JestCounterTestTS }]}
/>

To use `toHaveTextContent`, we need to have `@testing-library/jest-dom` installed; otherwise, we need to replace that with

```ts
expect(button).toHaveProperty("textContent", "1");
```

which is a bit less legible and if it fails, the error message will be slightly less helpful.

If we want not to use `userEvent`, we can also use `fireEvent` from `@solidjs/testing-library`, which is synchronous, but be aware that these events are less like actual user events and may in some cases yield different results depending on the context.

### Testing re-usable logic

Re-usable logic, also known as <a class="footnote" href="#fn-primitives" id="primitives" target="_self">hooks or primitives</a>, can also be tested using `@solidjs/testing-library`, by using the `renderHook` function.

Let us consider a hook that gives us a "Lorem ipsum" text with a certain number of words. We want to test it with 3, 2 and 5 words to make sure it works (select lorem.test.<IfTS fallback="js">ts</IfTS>):

<CodeTabs
  js={[
    { name: "lorem.js", component: JestLoremJS },
    { name: "lorem.test.js", component: JestLoremTestJS }
  ]}
  ts={[
    { name: "lorem.ts", component: JestLoremTS },
    { name: "lorem.test.ts", component: JestLoremTestTS }
  ]}
/>

### Testing custom directives

Solid.js has the useful ability to not only make logic, but also DOM interactions re-usable, through so-called custom directives. Obviously, we want the same convenience testing those as we have with hooks, so our testing library comes with a `renderDirective` utility.

The primitive we want to test is `onClickOutside`, which calls a function given in its argument, and we need to test it by clicking both inside and outside and check whether our function had been called:

<CodeTabs
  js={[
    { name: "click-outside.js", component: JestClickOutsideJS },
    { name: "click-outside.test.js", component: JestClickOutsideTestJS }
  ]}
  ts={[
    { name: "click-outside.ts", component: JestClickOutsideTS },
    { name: "click-outside.test.ts", component: JestClickOutsideTestTS }
  ]}
/>

<hr/>
<section role="doc-endnotes">
## Notes

<ol>
<li id="fn-cjs-module-format">Originally, JS libraries exposed their functionality as global declarations to be synchronously loaded within a script tag. To be more flexible, projects like [require.js](https://requirejs.org/) introduced module formats like [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) (Asynchronous Module Definition) that allowed asynchronous loading into scoped variables. [Node.js](https://nodejs.org/) started supporting only the [CJS](https://en.wikipedia.org/wiki/CommonJS) (Common JS) format. This is slowly being superseded by the newer [ESM](https://tc39.es/ecma262/#sec-modules) (ECMAScript Modules) format. <a href="#cjs-module-format">back</a></li>
<li id="fn-jest-preset">Jest allows augmenting the configuration by a predefined set of configuration, a so-called [preset](https://jestjs.io/docs/configuration#preset-string). <a href="#jest-preset">back</a></li>
<IfTS>
<li id="fn-babel">[Babel](https://babeljs.io/) is a versatile utility to convert one kind of JS code into another one. It is currently the de-facto standard to convert Solid JSX into JS. <a href="#babel">back</a></li>
</IfTS>
<li id="fn-custom-transform">The [API definition](https://jestjs.io/docs/code-transformation#writing-custom-transformers) might initially seem daunting, but a transform is merely an object with either a `process` method that receives the source, the path, and an optional options object and returns an object containing a code property with the result or a `processAsync` method that returns the same in a `Promise`. <a href="#custom-transform">back</a></li>
<li id="fn-jsdom">While [jsdom](https://github.com/jsdom/jsdom) is the de-facto standard for a virtualized DOM environment, there are other contenders like [happy-dom](https://github.com/capricorn86/happy-dom) and [linkedom](https://github.com/WebReflection/linkedom), which both are less feature-rich, but faster. To minimize support requests due to lack of feature-support, they are purposefully left out; please only use them if you know what you are doing. <a href="#jsdom">back</a></li>
<li id="fn-jest-cli">A command-line-interface or CLI is a program that runs inside a text terminal and can be controlled by optional parameters. Jest has a whole set of [CLI options](https://jestjs.io/docs/cli) that allow overwriting configuration and change the output or the behavior. <a href="#jest-cli">back</a></li>
<li id="fn-testing-library">[Testing Library](https://testing-library.com/) provides a set of tools aimed at encouraging good testing practices and at the same time discourage code which is not adhering to accessibility standards, since it will make it harder to test. <a href="#testing-library">back</a></li>
<li id="fn-primitives">In many frameworks, hooks/primitives are named `use[Something]`. Solid uses `create` as a prefix for its reactive primitives to denote that these are only called once inside the component. <a href="#primitives">back</a></li>
</ol>
</section>
