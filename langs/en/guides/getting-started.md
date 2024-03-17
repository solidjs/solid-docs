# Getting Started

**We're working on new docs.** You can check out our new beginner tutorial [here](https://docs.solidjs.com/guides/tutorials/getting-started-with-solid/welcome), and join our efforts on [Discord!](http://discord.com/invite/solidjs)

## See Solid

For quick video overviews of Solid's core concepts, check out:

- [Solid in 100 seconds](https://youtu.be/hw3Bx5vxKl0)

## Try Solid

By far the easiest way to get started with Solid is to try it online. Our REPL at https://playground.solidjs.com is the perfect way to try out ideas. As is https://codesandbox.io/ where you can modify any of [our Examples](https://github.com/solidjs/solid/blob/main/documentation/resources/examples.md).

Alternatively, you can use our [Vite templates](https://github.com/solidjs/templates) by running these commands in your terminal:

```sh
> npx degit solidjs/templates/js my-app
> cd my-app
> npm i # or yarn or pnpm
> npm run dev # or yarn or pnpm
```

Or for TypeScript:

```sh
> npx degit solidjs/templates/ts my-app
> cd my-app
> npm i # or yarn or pnpm
> npm run dev # or yarn or pnpm
```

Or you can install the dependencies in your own project. To use Solid with JSX
(recommended), you need to install the `solid-js` NPM library and the
[Solid JSX compiler](https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions)
Babel plugin:

```sh
> npm install solid-js@1.7.x babel-preset-solid@1.7.x
```

Then add `babel-preset-solid` to your `.babelrc`, or to your Babel config in webpack or rollup:

```json
"presets": ["solid"]
```

For TypeScript, set your `tsconfig.json` to handle Solid's JSX as follows
(see the [TypeScript guide](https://www.solidjs.com/guides/typescript)
for more details):

```json
"compilerOptions": {
  "jsx": "preserve",
  "jsxImportSource": "solid-js",
}
```

## Learn Solid

Solid is all about small composable pieces that serve as building blocks for applications. These pieces are mostly functions which make up many shallow top-level APIs. Fortunately, you won't need to know about most of them to get started.

The two main types of building blocks you have at your disposal are Components and Reactive Primitives.

Components are functions that accept a props object and return JSX elements including native DOM elements and other components. They can be expressed as JSX Elements in PascalCase:

```jsx
function MyComponent(props) {
  return <div>Hello {props.name}</div>;
}

<MyComponent name="Solid" />;
```

Components are lightweight in that they are not stateful themselves and have no instances. Instead, they serve as factory functions for DOM elements and reactive primitives.

Solid's fine-grained reactivity is built on three core primitives: Signals, Memos, and Effects. Together, they form an auto-tracking synchronization engine that ensures your view stays up to date. Reactive computations take the form of function-wrapped expressions that execute synchronously.

```js
const [first, setFirst] = createSignal("JSON");
const [last, setLast] = createSignal("Bourne");

createEffect(() => console.log(`${first()} ${last()}`));
```

You can learn more about [Solid's Reactivity](/guides/reactivity) and [Solid's Rendering](/guides/rendering).

## Think Solid

Solid's design carries several opinions on what principles and values help us best build websites and applications. It is easier to learn and use Solid when you are aware of the philosophy behind it.

### 1. Declarative Data

Declarative data is the practice of tying the description of data’s behavior to its declaration. This allows for easy composition by packaging all aspects of data’s behavior in a single place.

### 2. Vanishing Components

It's hard enough to structure your components without taking updates into consideration. Solid updates are completely independent of the components. Component functions are called once and then cease to exist. Components exist to organize your code and not much else.

### 3. Read/Write segregation

Precise control and predictability make for better systems. We don't need true immutability to enforce unidirectional flow, just the ability to make the conscious decision which consumers may write and which may not.

### 4. Simple is better than easy

A lesson that comes hard for fine-grained reactivity. Explicit and consistent conventions even if they require more effort are worth it. The aim is to provide minimal tools to serve as the basis to build upon.

## Web Components

Solid was born with the desire to have Web Components as first class citizens. Over time its design has evolved and goals have changed. However, Solid is still a great way to author Web Components. [Solid Element](https://github.com/solidjs/solid/tree/main/packages/solid-element) allows you to write and wrap Solid's function components to produce small and performant Web Components. Inside Solid apps Solid Element is able to still leverage Solid's Context API, and Solid's Portals support Shadow DOM isolated styling.

## Server Rendering

Solid has a dynamic server side rendering solution that enables a truly isomorphic development experience. Through the use of our Resource primitive, async data requests are easily made and, more importantly, automatically serialized and synchronized between client and browser.

Since Solid supports asynchronous and stream rendering on the server, you get to write your code one way and have it execute on the server. This means that features like [render-as-you-fetch](https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense) and code splitting just work in Solid.

For more information, read the [Server guide](/guides/server#server-side-rendering).

## Buildless options

If you need or prefer to use Solid in non-compiled environments such as plain HTML files, https://codepen.io, etc, you can use [` html`` ` Tagged Template Literals](https://github.com/solidjs/solid/tree/main/packages/solid/html) or [HyperScript `h()` functions](https://github.com/solidjs/solid/tree/main/packages/solid/h) in plain JavaScript instead of Solid's compile-time-optimized JSX syntax.

You can run them straight from the browser using [Skypack](https://www.skypack.dev/), for example:

```html
<html>
  <body>
    <script type="module">
      import { onCleanup, createSignal } from "https://esm.sh/solid-js@1.8.1";
      import { render } from "https://esm.sh/solid-js@1.8.1/web";
      import html from "https://esm.sh/solid-js@1.8.1/html";

      const App = () => {
        const [count, setCount] = createSignal(0),
          timer = setInterval(() => setCount(count() + 1), 1000);
        onCleanup(() => clearInterval(timer));
        return html`<div>${count}</div>`;
        // or
        return h("div", {}, count);
      };
      render(App, document.body);
    </script>
  </body>
</html>

```

The advantages of going buildless come with tradeoffs:

- Expressions need to always be a wrapped in a getter function or they won't be reactive.
  The following will not update when the `first` or `last` values change because the values are not being accessed inside an effect that the template creates internally, therefore dependencies will not be tracked:
  ```js
  html` <h1>Hello ${first() + " " + last()}</h1> `;
  // or
  h("h1", {}, "Hello ", first() + " " + last());
  ```
  The following will update as expected when `first` or `last` change because the template will read from the getter within an effect and dependencies will be tracked:
  ```js
  html` <h1>Hello ${() => first() + " " + last()}</h1> `;
  // or
  h("h1", {}, "Hello ", () => first() + " " + last());
  ```
  Solid's JSX doesn't have this issue because of its compile-time abilities, and an expression like `<h1>Hello {first() + ' ' + last()}</h1>` will be reactive.
- Build-time optimizations won't be in place like they are with Solid JSX, meaning app startup speed will be slightly slower because each template gets compiled at runtime the first time it is executed, but for many use cases this perf hit is imperceivable. Ongoing speed after startup will remain the same with the ` html`` ` template tag as with JSX. `h()` calls will always have slower ongoing speed due to their inability to statically analyze whole templates before being executed.

You need the corresponding DOM Expressions library for these to work with TypeScript. You can use Tagged Template Literals with [Lit DOM Expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/lit-dom-expressions) or HyperScript with [Hyper DOM Expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/hyper-dom-expressions).
