# Testing Solid

To use your Solid code in production, it needs to be tested. Since you don't want to test everything manually, you need automated tests. This guide describes how to set everything up and a few useful patterns for testing Solid code.

## Testing Setup

We offer support for two test runners:

- jest - very well established with many features

- uvu - only brings the bare necessities

Both are based around [solid-testing-library](https://github.com/solidjs/solid-testing-library), which integrates [Testing Library](https://testing-library.com/) into Solid. Testing Library mimics a light-weight browser and provides an API to interact with it from your tests.

We maintain a starter template for Solid and Jest tests. We recommend you base your project on it, or alternatively install the starter template in a scratch project and copy the configuration from it into your own project.

The templates use the [degit](https://github.com/Rich-Harris/degit) utility for installation.

### Setting up Jest

The Jest integration is based around the [solid-jest/preset/browser](https://github.com/solidjs/solid-jest) Jest configuration preset which lets you use Solid as in the browser. This uses babel to transform the Solid code.

It uses [jest-dom](https://github.com/testing-library/jest-dom) to extend `expect` with a bunch of custom matchers that help you write tests.

#### Jest with TypeScript (`ts-jest`)

```bash
$ npx degit solidjs/templates/ts-jest my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

Note that this template does not do typechecks during testing; you can use your IDE or a custom `tsc --noEmit` script in `package.json` to trigger such checks.

### Setting up uvu

We also maintain a starter template for `uvu`.

It includes [solid-dom-testing](https://www.npmjs.com/package/solid-dom-testing) to help you write assertions useful with Testing Library.

#### Uvu with TypeScript (`ts-uvu`)

```bash
$ npx degit solidjs/templates/ts-uvu my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

#### Uvu coverage Reports

> Unfortunately, due to a [limitation of babel](https://github.com/babel/babel/issues/4289), we cannot get source maps output for transpiled JSX, which will result in components to show zero coverage. It will work for non-JSX code, though.

If you want to check code coverage of your tests, the favorite tool for uvu is c8. To install and set it up, run:

```sh
> npm i --save-dev c8 # or yarn add -D or pnpm
> npm set-script "test:coverage" "c8 uvu -r solid-register"
```

Now if you `npm run test:coverage`, you'll see the test coverage.

If you want nice HTML coverage reports, you can use `c8 -r html` instead of `c8` to enable the html reporter.

#### Watch Mode

`uvu` does not have a watch mode out of the box, but you can use `chokidar-cli` to do the same:

```sh
> npm i --save-dev chokidar-cli # or yarn add -D or pnpm
> npm set-script "test:watch" "chokidar src/**/*.ts src/**/*.tsx -c \"uvu -r solid-register\"
# use .js/.jsx instead of .ts/.tsx
```

Now if you run `npm run test:watch`, the tests will run every time you change a file.

## Testing Patterns and Best Practices

Now that you have installed your testing tools, you should start to use them. In order to make this easier, Solid supports a few nice patterns.

### Testing Reactive State

You may want to keep parts of your state separate from the components for ease of maintenance or being able to support multiple views. In this case, the interface against which you are testing is the state itself. Keep in mind that out of a [reactive root](https://www.solidjs.com/docs/latest/api#createroot) your state is not tracked and updates won't trigger effects and memos.

Also, since effects trigger asynchronously, it can help to wrap our assertions in a final effect. Alternatively, to observe a sequence of effects over multiple changes, it can help to return the necessary tools from `createRoot` and execute them in an async test function (as `createRoot` itself cannot take an `async` function).

As an example, let's test `createLocalStorage` from the [todo example](https://www.solidjs.com/examples/todos):

```ts
import { createEffect } from "solid-js";
import { createStore, Store, SetStoreFunction } from "solid-js/store";

export function createLocalStore<T>(
  initState: T
): [Store<T>, SetStoreFunction<T>] {
  const [state, setState] = createStore(initState);
  if (localStorage.todos) setState(JSON.parse(localStorage.todos));
  createEffect(() => (localStorage.todos = JSON.stringify(state)));
  return [state, setState];
}
```

Instead of creating a TODO component, we can test this model in isolation; when we do that, we need to keep in mind that 1. reactive changes only work when they have a tracking context provided by `render` or `createRoot` and 2. are asynchronous, but we can use `createEffect` to catch them. Using `createRoot` has the advantage that we can trigger the disposal manually:

#### Testing with Jest

```ts
import { createLocalStore } from "./main.tsx";
import { createRoot, createEffect } from "solid-js";

describe("createLocalStore", () => {
  beforeEach(() => {
    localStorage.removeItem("todos");
  });

  const initialState = {
    todos: [],
    newTitle: "",
  };

  test("it reads pre-existing state from localStorage", () =>
    createRoot((dispose) => {
      const savedState = { todos: [], newTitle: "saved" };
      localStorage.setItem("todos", JSON.stringify(savedState));
      const [state] = createLocalStore(initialState);
      expect(state).toEqual(savedState);
      dispose();
    }));

  test("it stores new state to localStorage", () =>
    createRoot((dispose) => {
      const [state, setState] = createLocalStore(initialState);
      setState("newTitle", "updated");
      // to catch an effect, use an effect
      return new Promise<void>((resolve) =>
        createEffect(() => {
          expect(JSON.parse(localStorage.todos || "")).toEqual({
            todos: [],
            newTitle: "updated",
          });
          dispose();
          resolve();
        })
      );
    }));

  test("it updates state multiple times", async () => {
    const { dispose, setState } = createRoot((dispose) => {
      const [state, setState] = createLocalStore(initialState);
      return { dispose, setState };
    });
    setState("newTitle", "first");
    // wait a tick to resolve all effects
    await new Promise((done) => setTimeout(done, 0));
    expect(JSON.parse(localStorage.todos || "")).toEqual({
      todos: [],
      newTitle: "first",
    });
    setState("newTitle", "second");
    await new Promise((done) => setTimeout(done, 0));
    expect(JSON.parse(localStorage.todos || "")).toEqual({
      todos: [],
      newTitle: "first",
    });
    dispose();
  });
});
```

#### Testing with uvu

```ts
import { createLocalStore } from "./main";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { createEffect, createRoot } from "solid-js";

const todoTest = suite("createLocalStore");

todoTest.before.each(() => {
  localStorage.removeItem("todos");
});

const initialState = {
  todos: [],
  newTitle: "",
};

todoTest("it reads pre-existing state from localStorage", () =>
  createRoot((dispose) => {
    const savedState = { todos: [], newTitle: "saved" };
    localStorage.setItem("todos", JSON.stringify(savedState));
    const [state] = createLocalStore(initialState);
    assert.equal(state, savedState);
    dispose();
  })
);

todoTest("it stores new state to localStorage", () =>
  createRoot((dispose) => {
    const [_, setState] = createLocalStore(initialState);
    setState("newTitle", "updated");
    // to catch an effect, we need an effect
    return new Promise<void>((resolve) =>
      createEffect(() => {
        assert.equal(JSON.parse(localStorage.todos || ""), {
          todos: [],
          newTitle: "updated",
        });
        dispose();
        resolve();
      })
    );
  })
);

todoTest.run();
```

### Testing directives

[Directives](https://www.solidjs.com/docs/latest/api#use%3A___) allow using refs in a reusable way. They are basically functions that follow the pattern `(ref: HTMLElement, data: Accessor<any>) => void`. In our [directives tutorial](https://www.solidjs.com/tutorial/bindings_directives?solved), we define the `clickOutside` directive that should call the callback wrapped in the accessor argument.

We could now create a component and use the directive in there, but then we'd be testing the use of directives instead of directly testing the directive. It's simpler to test the surface of the directive by providing a mounted node and the accessor:

#### Testing with Jest

```ts
// click-outside.test.ts
import clickOutside from "click-outside";
import { createRoot } from "solid-js";
import { fireEvent } from "solid-testing-library";

describe("clickOutside", () => {
  const ref = document.createElement("div");

  beforeAll(() => {
    document.body.appendChild(ref);
  });

  afterAll(() => {
    document.body.removeChild(ref);
  });

  test("will trigger on click outside", () =>
    createRoot(
      (dispose) =>
        new Promise<void>((resolve) => {
          let clickedOutside = false;
          clickOutside(ref, () => () => {
            clickedOutside = true;
          });
          document.body.addEventListener("click", () => {
            expect(clickedOutside).toBeTruthy();
            dispose();
            resolve();
          });
          fireEvent.click(document.body);
        })
    ));

  test("will not trigger on click inside", () =>
    createRoot(
      (dispose) =>
        new Promise<void>((resolve) => {
          let clickedOutside = false;
          clickOutside(ref, () => () => {
            clickedOutside = true;
          });
          ref.addEventListener("click", () => {
            expect(clickedOutside).toBeFalsy();
            dispose();
            resolve();
          });
          fireEvent.click(ref);
        })
    ));
});
```

#### Testing with uvu

```ts
// click-outside.test.ts
import clickOutside from "click-outside.tsx";
import { createRoot } from "solid-js";
import { fireEvent } from "solid-testing-library";

const clickTest = suite("clickOutside");

const ref = document.createElement("div");

clickTest.before(() => {
  document.body.appendChild(ref);
});

clickTest.after(() => {
  document.body.removeChild(ref);
});

clickTest("will trigger on click outside", () =>
  createRoot(
    (dispose) =>
      new Promise<void>((resolve) => {
        let clickedOutside = false;
        clickOutside(ref, () => () => {
          clickedOutside = true;
        });
        document.body.addEventListener("click", () => {
          assert.ok(clickedOutside);
          dispose();
          resolve();
        });
        fireEvent.click(document.body);
      })
  )
);

clickTest("will not trigger on click inside", () =>
  createRoot(
    (dispose) =>
      new Promise<void>((resolve) => {
        let clickedOutside = false;
        clickOutside(ref, () => () => {
          clickedOutside = true;
        });
        ref.addEventListener("click", () => {
          assert.is(clickedOutside, false);
          dispose();
          resolve();
        });
        fireEvent.click(ref);
      })
  )
);

clickTest.run();
```

### Testing components

Let's take a simple click-counter component that we want to test:

```ts
// main.tsx
import { createSignal, Component } from "solid-js";

export const Counter: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div role="button" onClick={() => setCount((c) => c + 1)}>
      Count: {count()}
    </div>
  );
};
```

Here we use `solid-testing-library`. It's most important helpers are `render` to render a component to the DOM in a managed way, `fireEvent` to dispatch events in a way that resembles actual user events and `screen` to provide global selectors. We also use helpful assertions added to `expect` provided by `@testing-library/jest-dom`.

#### Testing with Jest

```ts
// main.test.tsx
import { Counter } from "./main";
import { cleanup, fireEvent, render, screen } from "solid-testing-library";

describe("Counter", () => {
  afterEach(cleanup);

  test("it starts with zero", () => {
    render(() => <Counter />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Count: 0");
  });

  test("it increases its value on click", async () => {
    render(() => <Counter />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    // the event loop takes one Promise to resolve to be finished
    await Promise.resolve();
    expect(button).toHaveTextContent("Count: 1");
    fireEvent.click(button);
    await Promise.resolve();
    expect(button).toHaveTextContent("Count: 2");
  });
});
```

#### Testing with uvu

```ts
// main.test.tsx
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { Counter } from "main";
import { fireEvent, render, screen } from "solid-testing-library";
import { isInDocument, hasTextContent } from "solid-dom-testing";

const testCounter = suite("Counter");

testCounter.after.each(cleanup);

testCounter("it starts with zero", () => {
  const { getByRole } = render(() => <Counter />);
  const button = getByRole("button");
  assert.ok(isInDocument(button), "button not in dom");
  assert.ok(hasTextContent(button, "Count: 0"), "wrong text content");
});

testCounter("it increases its value on click", async () => {
  render(() => <Counter />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  // the event loop takes one Promise to resolve to be finished
  await Promise.resolve();
  assert.ok(
    hasTextContent(button, "Count: 1"),
    "not count 1 after first click"
  );
  fireEvent.click(button);
  await Promise.resolve();
  assert.ok(
    hasTextContent(button, "Count: 2"),
    "not count 2 after first click"
  );
});

testCounter.run();
```
