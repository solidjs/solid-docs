# Basic Reactivity

Solid's overall approach to reactivity is to wrap any reactive computation in
a function, and rerun that function when its dependencies update.
The Solid JSX compiler also wraps most JSX expressions (code in braces) with a
function, so they automatically update (and trigger corresponding DOM updates)
when their dependencies change.
More precisely, automatic rerunning of a function happens whenever the function
gets called in a _tracking scope_, such as a JSX expression
or API calls that build "computations" (`createEffect`, `createMemo`, etc.).
By default, the dependencies of a function get tracked automatically
when they're called in a tracking scope, by detecting when the function reads
reactive state (e.g., via a Signal getter or Store attribute).
As a result, you generally don't need to worry about dependencies yourselves.
(But if automatic dependency tracking ever doesn't produce the results you
want, you can [override dependency tracking](#reactive-utilities).)
This approach makes reactivity _composable_: calling one function
within another function generally causes the calling function
to inherit the dependencies of the called function.

## `createSignal`

```ts
import { createSignal } from "solid-js";

function createSignal<T>(
  initialValue: T,
  options?: { equals?: false | ((prev: T, next: T) => boolean) }
): [get: () => T, set: (v: T) => T];

// available types for return value of createSignal:
import type { Signal, Accessor, Setter } from "solid-js";
type Signal<T> = [get: Accessor<T>, set: Setter<T>];
type Accessor<T> = () => T;
type Setter<T> = (v: T | ((prev?: T) => T)) => T;
```

Signals are the most basic reactive primitive. They track a single value
(which can be any JavaScript object) that changes over time.
The Signal's value starts out equal to the passed first argument
`initialValue` (or `undefined` if there are no arguments).
The `createSignal` function returns a pair of functions as a two-element array:
a _getter_ (or _accessor_) and a _setter_. In typical use, you would
destructure this array into a named Signal like so:

```js
const [count, setCount] = createSignal(0);
const [ready, setReady] = createSignal(false);
```

Calling the getter (e.g., `count()` or `ready()`)
returns the current value of the Signal.
Crucial to automatic dependency tracking, calling the getter
within a tracking scope causes the calling function to depend on this Signal,
so that function will rerun if the Signal gets updated.

Calling the setter (e.g., `setCount(nextCount)` or `setReady(nextReady)`)
sets the Signal's value and _updates_ the Signal
(triggering dependents to rerun)
if the value actually changed (see details below).
As its only argument, the setter takes either the new value for the signal,
or a function that maps the last value of the signal to a new value.
The setter also returns the updated value. For example:

```js
// read signal's current value, and
// depend on signal if in a tracking scope
// (but nonreactive outside of a tracking scope):
const currentCount = count();

// or wrap any computation with a function,
// and this function can be used in a tracking scope:
const doubledCount = () => 2 * count();

// or build a tracking scope and depend on signal:
const countDisplay = <div>{count()}</div>;

// write signal by providing a value:
setReady(true);

// write signal by providing a function setter:
const newCount = setCount((prev) => prev + 1);
```

> If you want to store a function in a Signal you must use the function form:
>
> ```js
> setValue(() => myFunction);
> ```
>
> However, functions are not treated specially as the `initialValue` argument
> to `createSignal`, so you should pass a function initial value as is:
>
> ```js
> const [func, setFunc] = createSignal(myFunction);
> ```

##### Options

Several primitives in Solid take an "options" object
as an optional last argument.
`createSignal`'s options object allows you to provide an
`equals` option. For example:

```js
const [getValue, setValue] = createSignal(initialValue, { equals: false });
```

By default, when calling a signal's setter, the signal only updates (and causes
dependents to rerun) if the new value is actually different than the old value,
according to JavaScript's `===` operator.

Alternatively, you can set `equals` to `false` to always rerun dependents after
the setter is called, or you can pass your own function for testing equality.
Some examples:

```js
// use { equals: false } to allow modifying object in-place;
// normally this wouldn't be seen as an update because the
// object has the same identity before and after change
const [object, setObject] = createSignal({ count: 0 }, { equals: false });
setObject((current) => {
  current.count += 1;
  current.updated = new Date();
  return current;
});

// use { equals: false } signal as trigger without value:
const [depend, rerun] = createSignal(undefined, { equals: false });
// now calling depend() in a tracking scope
// makes that scope rerun whenever rerun() gets called

// define equality based on string length:
const [myString, setMyString] = createSignal("string", {
  equals: (newVal, oldVal) => newVal.length === oldVal.length,
});

setMyString("strung"); // considered equal to the last value and won't cause updates
setMyString("stranger"); // considered different and will cause updates
```

## `createEffect`

```ts
import { createEffect } from "solid-js";

function createEffect<T>(fn: (v: T) => T, value?: T): void;
```

Effects are a general way to make arbitrary code ("side effects")
run whenever dependencies change, e.g., to modify the DOM manually.
`createEffect` creates a new computation that runs the given function
in a tracking scope, thus automatically tracking its dependencies,
and automatically reruns the function whenever the dependencies update.
For example:

```js
const [a, setA] = createSignal(initialValue);

// effect that depends on signal `a`
createEffect(() => doSideEffect(a()));
```

The effect function gets called with an argument equal to the value returned
from the effect function's last execution, or on the first call,
equal to the optional second argument to `createEffect`.
This allows you to compute diffs without creating an additional closure
to remember the last computed value. For example:

```js
createEffect((prev) => {
  const sum = a() + b();
  if (sum !== prev) console.log("sum changed to", sum);
  return sum;
}, 0);
```

Effects are meant primarily for side effects that read but don't write
to the reactive system:
it's best to avoid setting signals in effects, which without care
can cause additional rendering or even infinite effect loops.
Instead, prefer using [`createMemo`](#creatememo) to compute new values
that depend on other reactive values, so the reactive system knows what
depends on what, and can optimize accordingly.

The _first_ execution of the effect function is not immediate;
it's scheduled to run after the current rendering phase
(e.g., after calling the function passed to [`render`](#render),
[`createRoot`](#createroot), or [`runWithOwner`](#runwithowner)).
If you want to wait for the first execution to occur, use
[`queueMicrotask`](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask)
(which runs before the browser renders the DOM) or
`await Promise.resolve()` or `setTimeout(..., 0)`
(which run after browser rendering).

```js
// assume this code is in a component function, so is part of a rendering phase
const [count, setCount] = createSignal(0);

// this effect prints count at the beginning and when it changes
createEffect(() => console.log("count =", count()));
// effect won't run yet
console.log("hello");
setCount(1); // effect still won't run yet
setCount(2); // effect still won't run yet

queueMicrotask(() => {
  // now `count = 2` will print
  console.log("microtask");
  setCount(3); // immediately prints `count = 3`
  console.log("goodbye");
});

// --- overall output: ---
// hello
// count = 2
// microtask
// count = 3
// goodbye
```

This delay in first execution is useful because it means
an effect defined in a component scope runs after
the JSX returned by the component gets added to the DOM.
In particular, [`ref`](#ref)s will already be set.
Thus you can use an effect to manipulate the DOM manually,
call vanilla JS libraries, or other side effects.

Note that the first run of the effect still runs before the browser renders
the DOM to the screen (similar to React's `useLayoutEffect`).
If you need to wait until after rendering (e.g., to measure the rendering),
you can use `await Promise.resolve()` (or `Promise.resolve().then(...)`),
but note that subsequent use of reactive state (such as signals)
will not trigger the effect to rerun, as tracking is not
possible after an `async` function uses `await`.
Thus you should use all dependencies before the promise.

If you'd rather an effect run immediately even for its first run,
use [`createRenderEffect`](#createrendereffect) or
[`createComputed`](#createcomputed).

You can clean up your side effects in between executions of the effect function
by calling [`onCleanup`](#oncleanup) _inside_ the effect function.
Such a cleanup function gets called both in between effect executions and
when the effect gets disposed (e.g., the containing component unmounts).
For example:

```js
// listen to event dynamically given by eventName signal
createEffect(() => {
  const event = eventName();
  const callback = (e) => console.log(e);
  ref.addEventListener(event, callback);
  onCleanup(() => ref.removeEventListener(event, callback));
});
```

## `createMemo`

```ts
import { createMemo } from "solid-js";

function createMemo<T>(
  fn: (v: T) => T,
  value?: T,
  options?: { equals?: false | ((prev: T, next: T) => boolean) }
): () => T;
```

Memos let you efficiently use a derived value in many reactive computations.
`createMemo` creates a readonly reactive value equal to the return value of
the given function and makes sure that function only gets executed when its dependencies change.

```js
const value = createMemo(() => computeExpensiveValue(a(), b()));

// read value
value();
```

In Solid, you often don't need to wrap functions in memos;
you can alternatively just define and call a regular function
to get similar reactive behavior.
The main difference is when you call the function in multiple reactive settings.
In this case, when the function's dependencies update, the function will get
called multiple times unless it is wrapped in `createMemo`. For example:

```js
const user = createMemo(() => searchForUser(username()));
// compare with: const user = () => searchForUser(username());
return (
  <ul>
    <li>Your name is "{user()?.name}"</li>
    <li>
      Your email is <code>{user()?.email}</code>
    </li>
  </ul>
);
```

When the `username` signal updates, `searchForUser` will get called just once.
If the returned user actually changed, the `user` memo updates, and then both
list items will update automatically.

If we had instead defined `user` as a plain function
`() => searchForUser(username())`, then `searchForUser` would have been
called twice, once when updating each list item.

Another key difference is that a memo can shield dependents from updating
when the memo's dependencies change but the resulting memo value doesn't.
Like [`createSignal`](#createsignal), the derived signal made by `createMemo`
_updates_ (and triggers dependents to rerun) only when the value returned by
the memo function actually changes from the previous value,
according to JavaScript's `===` operator.
Alternatively, you can pass an options object with `equals` set to `false`
to always update the memo when its dependencies change,
or you can pass your own `equals` function for testing equality.

The memo function gets called with an argument equal to the value returned
from the memo function's last execution, or on the first call,
equal to the optional second argument to `createMemo`.
This is useful for reducing computations, for example:

```js
// track the sum of all values taken on by input() as it updates
const sum = createMemo((prev) => input() + prev, 0);
```

The memo function should not change other signals by calling setters
(it should be "pure").
This enables Solid to optimize the execution order of memo updates
according to their dependency graph, so that all memos can update
at most once in response to a dependency change.

## `createResource`

```ts
import { createResource } from "solid-js";
import type { ResourceReturn } from "solid-js";

type ResourceReturn<T> = [
  {
    (): T | undefined;
    state: "unresolved" | "pending" | "ready" | "refreshing" | "errored"
    loading: boolean;
    error: any;
    latest: T | undefined;
  },
  {
    mutate: (v: T | undefined) => T | undefined;
    refetch: (info: unknown) => Promise<T> | T;
  }
];

export type ResourceOptions<T, S = unknown> = {
  initialValue?: T;
  name?: string;
  deferStream?: boolean;
  ssrLoadFrom?: "initial" | "server";
  storage?: (init: T | undefined) => [Accessor<T | undefined>, Setter<T | undefined>];
  onHydrated?: (k: S | undefined, info: { value: T | undefined }) => void;
};

function createResource<T, U = true>(
  fetcher: (
    k: U,
    info: { value: T | undefined; refetching: boolean | unknown }
  ) => T | Promise<T>,
  options?: ResourceOptions<T, U>
): ResourceReturn<T>;

function createResource<T, U>(
  source: U | false | null | (() => U | false | null),
  fetcher: (
    k: U,
    info: { value: T | undefined; refetching: boolean | unknown }
  ) => T | Promise<T>,
  options?: ResourceOptions<T, U>
): ResourceReturn<T>;
```

Creates a signal that reflects the result of an async request.

`createResource` takes an asynchronous fetcher function and returns a signal that is updated with the resulting data when the fetcher completes.

There are two ways to use `createResource`: you can pass the fetcher function as the sole argument, or you can additionally pass a source signal as the first argument. The source signal will retrigger the fetcher whenever it changes, and its value will be passed to the fetcher.

```js
const [data, { mutate, refetch }] = createResource(fetchData);
```

```js
const [data, { mutate, refetch }] = createResource(sourceSignal, fetchData);
```

In these snippets, the fetcher is the function `fetchData`, and `data()` is undefined until `fetchData` finishes resolving. In the first case, `fetchData` will be called immediately.
In the second, `fetchData` will be called as soon as `sourceSignal` has any value other than `false`, `null`, or `undefined`.
It will be called again whenever the value of `sourceSignal` changes, and that value will always be passed to `fetchData` as its first argument.

You can call `mutate` to directly update the `data` signal (it works like any other signal setter). You can also call `refetch` to rerun the fetcher directly, and pass an optional argument to provide additional info to the fetcher: `refetch(info)`.

`data` works like a normal signal getter: use `data()` to read the last returned value of `fetchData`.
But it also has extra reactive properties: `data.loading` tells you if the fetcher has been called but not returned, and `data.error` tells you if the request has errored out; if so, it contains the error thrown by the fetcher. (Note: if you anticipate errors, you may want to wrap `createResource` in an [ErrorBoundary](#<errorboundary>).)

As of **1.4.0**, `data.latest` will return the last returned value and won't trigger [Suspense](#<suspense>) and [transitions](#usetransition); if no value has been returned yet, `data.latest` acts the same as `data()`. This can be useful if you want to show the out-of-date data while the new data is loading.

`loading`, `error`, and `latest` are reactive getters and can be tracked.

The `fetcher` is the async function that you provide to `createResource` to actually fetch the data.
It is passed two arguments: the value of the source signal (if provided), and an info object with two properties: `value` and `refetching`. `value` tells you the previously fetched value.
`refetching` is `true` if the fetcher was triggered using the `refetch` function and `false` otherwise.
If the `refetch` function was called with an argument (`refetch(info)`), `refetching` is set to that argument.

```js
async function fetchData(source, { value, refetching }) {
  // Fetch the data and return a value.
  //`source` tells you the current value of the source signal;
  //`value` tells you the last returned value of the fetcher;
  //`refetching` is true when the fetcher is triggered by calling `refetch()`,
  // or equal to the optional data passed: `refetch(info)`
}

const [data, { mutate, refetch }] = createResource(getQuery, fetchData);

// read value
data();

// check if loading
data.loading;

// check if errored
data.error;

// directly set value without creating promise
mutate(optimisticValue);

// refetch the last request explicitly
refetch();
```

**New in v1.4.0**

If you're using `renderToStream`, you can tell Solid to wait for a resource before flushing the stream using the `deferStream` option:

```js
// fetches a user and streams content as soon as possible
const [user] = createResource(() => params.id, fetchUser);

// fetches a user but only streams content after this resource has loaded
const [user] = createResource(() => params.id, fetchUser, {
  deferStream: true,
});
```

**New in v1.5.0**

We've added a new `state` field which covers a more detailed view of the Resource state beyond `loading` and `error`. You can now check whether a Resource is `"unresolved"`, `"pending"`, `"ready"`, `"refreshing"`, or `"error"`.

| state      | value resolved | loading | has error |
| ---------- | -------------- | ------- | --------- |
| unresolved | No             | No      | No        |
| pending    | No             | Yes     | No        |
| ready      | Yes            | No      | No        |
| refreshing | Yes            | Yes     | No        |
| errored    | No             | No      | Yes       |

**New in v1.5.0**

When server rendering resources especially when fetching when embedding Solid in other system that fetch before render, you might want to initiate the resource with this prefetched value instead of fetching again and having the resource serialize it isn't own state. You can use the new `ssrLoadFrom` option for this. Instead of using the default `"server"` value, you can pass `"initial"` and the resource will use `initialValue` as if it were the result of the first fetch for both SSR and hydration.

**New in 1.5.0** *Experimental*

Resources can be set with custom defined storage with the same signature as a Signal by using the `storage` option. For example using a custom reconciling store could be done this way:

```ts
function createDeepSignal<T>(value: T): Signal<T> {
  const [store, setStore] = createStore({
    value
  });
  return [
    () => store.value,
    (v: T) => {
      const unwrapped = unwrap(store.value);
      typeof v === "function" && (v = v(unwrapped));
      setStore("value", reconcile(v));
      return store.value;
    }
  ] as Signal<T>;
}

const [resource] = createResource(fetcher, {
  storage: createDeepSignal
});
```

# Lifecycles

## `onMount`

```ts
import { onMount } from "solid-js";

function onMount(fn: () => void): void;
```

Registers a method that runs after initial render and elements have been mounted. Ideal for using `ref`s and managing other one time side effects. It is equivalent to a `createEffect` which does not have any dependencies.

## `onCleanup`

```ts
import { onCleanup } from "solid-js";

function onCleanup(fn: () => void): void;
```

Registers a cleanup method that executes on disposal or recalculation of the current reactive scope. Can be used in any Component or Effect.

## `onError`

```ts
import { onError } from "solid-js";

function onError(fn: (err: any) => void): void;
```

Registers an error handler method that executes when child scope errors. Only the nearest scope error handlers execute. Rethrow to trigger up the line.

# Reactive Utilities

These helpers provide the ability to better schedule updates and control how reactivity is tracked.

## `untrack`

```ts
import { untrack } from "solid-js";

function untrack<T>(fn: () => T): T;
```

Ignores tracking any of the dependencies in the executing code block and returns the value.

## `batch`

```ts
import { batch } from "solid-js";

function batch<T>(fn: () => T): T;
```

Holds executing downstream computations within the block until the end to prevent unnecessary recalculation. [Solid Store](#createstore)'s set method, [Mutable Store](#createmutable)'s array methods, and Effects automatically wrap their code in a batch.

## `on`

```ts
import { on } from "solid-js";

function on<T extends Array<() => any> | (() => any), U>(
  deps: T,
  fn: (input: T, prevInput: T, prevValue?: U) => U,
  options: { defer?: boolean } = {}
): (prevValue?: U) => U | undefined;
```

`on` is designed to be passed into a computation to make its dependencies explicit. If an array of dependencies is passed, `input` and `prevInput` are arrays.

```js
createEffect(on(a, (v) => console.log(v, b())));

// is equivalent to:
createEffect(() => {
  const v = a();
  untrack(() => console.log(v, b()));
});
```

You can also not run the computation immediately and instead opt in for it to only run on change by setting the defer option to true.

```js
// doesn't run immediately
createEffect(on(a, (v) => console.log(v), { defer: true }));

setA("new"); // now it runs
```

Please note that on `stores` and `mutable`, adding or removing a property from the parent object will trigger an effect. See [`createMutable`](#createMutable)

## `createRoot`

```ts
import { createRoot } from "solid-js";

function createRoot<T>(fn: (dispose: () => void) => T): T;
```

Creates a new non-tracked owner scope that doesn't auto-dispose. This is useful for nested reactive scopes that you do not wish to release when the parent re-evaluates.

All Solid code should be wrapped in one of these top level as they ensure that all memory/computations are freed up. Normally you do not need to worry about this as `createRoot` is embedded into all `render` entry functions.

## `getOwner`

```ts
import { getOwner } from "solid-js";

function getOwner(): Owner;
```

Gets the reactive scope that owns the currently running code, e.g.,
for passing into a later call to `runWithOwner` outside of the current scope.

Internally, computations (effects, memos, etc.) create owners which are
children of their owner, all the way up to the root owner created by
`createRoot` or `render`. In particular, this ownership tree lets Solid
automatically clean up a disposed computation by traversing its subtree
and calling all [`onCleanup`](#oncleanup) callbacks.
For example, when a `createEffect`'s dependencies change, the effect calls
all descendant `onCleanup` callbacks before running the effect function again.
Calling `getOwner` returns the current owner node that is responsible
for disposal of the current execution block.

Components are not computations, so do not create an owner node, but they are
typically rendered from a `createEffect` which does, so the result is similar:
when a component gets unmounted, all descendant `onCleanup` callbacks get
called. Calling `getOwner` from a component scope returns the owner that is
responsible for rendering and unmounting that component.

Note that the owning reactive scope isn't necessarily _tracking_.
For example, [`untrack`](#untrack) turns off tracking for the duration
of a function (without creating a new reactive scope), as do
components created via JSX (`<Component ...>`).

## `runWithOwner`

```ts
import { runWithOwner } from 'solid-js';

function runWithOwner<T>(owner: Owner, fn: (() => void) => T): T;
```

Executes the given function under the provided owner,
instead of (and without affecting) the owner of the outer scope.
By default, computations created by `createEffect`, `createMemo`, etc.
are owned by the owner of the currently executing code (the return value of
`getOwner`), so in particular will get disposed when their owner does.
Calling `runWithOwner` provides a way to override this default to a manually
specified owner (typically, the return value from a previous call to
`getOwner`), enabling more precise control of when computations get disposed.

Having a (correct) owner is important for two reasons:

- Computations without an owner cannot be cleaned up. For example, if you call
  `createEffect` without an owner (e.g., in the global scope), the effect will
  continue running forever, instead of being disposed when its owner gets
  disposed.
- [`useContext`](#usecontext) obtains context by walking up the owner tree
  to find the nearest ancestor providing the desired context.
  So without an owner you cannot look up any provided context
  (and with the wrong owner, you might obtain the wrong context).

Manually setting the owner is especially helpful when doing reactivity outside
of any owner scope. In particular, asynchronous computation
(via either `async` functions or callbacks like `setTimeout`)
lose the automatically set owner, so remembering the original owner via
`getOwner` and restoring it via `runWithOwner` is necessary in these cases.
For example:

```js
const owner = getOwner();
setTimeout(() => {
  // This callback gets run without owner.
  // Restore owner via runWithOwner:
  runWithOwner(owner, () => {
    const foo = useContext(FooContext);
    createEffect(() => {
      console.log(foo);
    });
  });
}, 1000);
```

Note that owners are not what determines dependency tracking,
so `runWithOwner` does not help with tracking in asynchronous functions;
use of reactive state in the asynchronous part (e.g. after the first `await`)
will not be tracked as a dependency.

## `mergeProps`

```ts
import { mergeProps } from "solid-js";

function mergeProps(...sources: any): any;
```

A reactive object `merge` method. Useful for setting default props for components in case caller doesn't provide them. Or cloning the props object including reactive properties.

This method works by using a proxy and resolving properties in reverse order. This allows for dynamic tracking of properties that aren't present when the prop object is first merged.

```js
// default props
props = mergeProps({ name: "Smith" }, props);

// clone props
newProps = mergeProps(props);

// merge props
props = mergeProps(props, otherProps);
```

## `splitProps`

```ts
import { splitProps } from "solid-js";

function splitProps<T>(
  props: T,
  ...keys: Array<(keyof T)[]>
): [...parts: Partial<T>];
```

Splits a reactive object by keys.

It takes a reactive object and any number of arrays of keys; for each array of keys, it will return a reactive object with just those properties of the original object. The last reactive object in the returned array will have any leftover properties of the original object.

This can be useful if you want to consume a subset of props and pass the rest to a child.

```js
function MyComponent(props) {
  const [local, others] = splitProps(props, ["children"]);

  return (
    <>
      <div>{local.children}</div>
      <Child {...others} />
    </>
  );
}
```

Because `splitProps` takes any number of arrays, we can split a props object
as much as we wish (if, for example, we had multiple child components that
each required a subset of the props).

Let's say a component was passed six props:

```js
<MyComponent a={1} b={2} c={3} d={4} e={5} foo="bar" />;
function MyComponent(props) {
  console.log(props); // {a: 1, b: 2, c: 3, d: 4, e: 5, foo: "bar"}
  const [vowels, consonants, leftovers] = splitProps(
    props,
    ["a", "e"],
    ["b", "c", "d"]
  );
  console.log(vowels); // {a: 1, e: 5}
  console.log(consonants); // {b: 2, c: 3, d: 4}
  console.log(leftovers.foo); // bar
}
```

## `useTransition`

```ts
import { useTransition } from "solid-js";

function useTransition(): [
  pending: () => boolean,
  startTransition: (fn: () => void) => Promise<void>
];
```

Used to batch async updates in a transaction deferring commit until all async processes are complete. This is tied into Suspense and only tracks resources read under Suspense boundaries.

```js
const [isPending, start] = useTransition();

// check if transitioning
isPending();

// wrap in transition
start(() => setSignal(newValue), () => /* transition is done */)
```

## `startTransition`

**New in v1.1.0**

```ts
import { startTransition } from 'solid-js';

function startTransition: (fn: () => void) => Promise<void>;
```

Similar to `useTransition` except there is no associated pending state. This one can just be used directly to start the Transition.

## `observable`

```ts
import { observable } from "solid-js";

function observable<T>(input: () => T): Observable<T>;
```

This method takes a signal and produces an Observable.
You can consume it from another Observable library of your choice, typically
with the `from` operator.

```js
// How to integrate rxjs with a solid.js signal
import { observable } from "solid-js";
import { from } from "rxjs";

const [s, set] = createSignal(0);

const obsv$ = from(observable(s));

obsv$.subscribe((v) => console.log(v));
```

You can also use `from` without `rxjs`; see below.

## `from`

**New in v1.1.0**

```ts
import { from } from "solid-js";

function from<T>(
  producer:
    | ((setter: (v: T) => T) => () => void)
    | {
        subscribe: (
          fn: (v: T) => void
        ) => (() => void) | { unsubscribe: () => void };
      }
): () => T;
```

A helper to make it easier to interop with external producers like RxJS observables or with Svelte Stores. This basically turns any subscribable (object with a `subscribe` method) into a Signal and manages subscription and disposal.

```js
const signal = from(obsv$);
```

It can also take a custom producer function where the function is passed a setter function returns a unsubscribe function:

```js
const clock = from((set) => {
  const t = setInterval(() => set(1), 1000);
  return () => clearInterval(t);
});
```

> Note: Signals created by `from` have equality checks turned off to interface better with external streams and sources.

## `mapArray`

```ts
import { mapArray } from "solid-js";

function mapArray<T, U>(
  list: () => readonly T[],
  mapFn: (v: T, i: () => number) => U
): () => U[];
```

Reactive map helper that caches each item by reference to reduce unnecessary mapping on updates. It only runs the mapping function once per value and then moves or removes it as needed. The index argument is a signal. The map function itself is not tracking.

Underlying helper for the `<For>` control flow.

```js
const mapped = mapArray(source, (model) => {
  const [name, setName] = createSignal(model.name);
  const [description, setDescription] = createSignal(model.description);

  return {
    id: model.id,
    get name() {
      return name();
    },
    get description() {
      return description();
    },
    setName,
    setDescription,
  };
});
```

## `indexArray`

```ts
import { indexArray } from "solid-js";

function indexArray<T, U>(
  list: () => readonly T[],
  mapFn: (v: () => T, i: number) => U
): () => U[];
```

Similar to `mapArray` except it maps by index. The item is a signal and the index is now the constant.

Underlying helper for the `<Index>` control flow.

```js
const mapped = indexArray(source, (model) => {
  return {
    get id() {
      return model().id
    }
    get firstInitial() {
      return model().firstName[0];
    },
    get fullName() {
      return `${model().firstName} ${model().lastName}`;
    },
  }
});
```

# Stores

These APIs are available at `solid-js/store`. They allow the creation of stores: [proxy objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) that allow a tree of signals to be independently tracked and modified.

## Using Stores

### `createStore`

```ts
import { createStore } from "solid-js/store";
import type { StoreNode, Store, SetStoreFunction } from "solid-js/store";

function createStore<T extends StoreNode>(
  state: T | Store<T>
): [get: Store<T>, set: SetStoreFunction<T>];
type Store<T> = T;  // conceptually readonly, but not typed as such
```

The create function takes an initial state, wraps it in a store, and returns a readonly proxy object and a setter function.

```js
const [state, setState] = createStore(initialValue);

// read value
state.someValue;

// set value
setState({ merge: "thisValue" });

setState("path", "to", "value", newValue);
```

As proxies, store objects only track when a property is accessed.

When nested objects are accessed, stores will produce nested store objects, and this applies all the way down the tree. However, this only applies to arrays and plain objects. Classes are not wrapped, so objects like `Date`, `HTMLElement`, `RegExp`, `Map`, `Set` won't be granularly reactive as properties on a store.

#### Arrays in stores

As of version **1.4.0**, the top level state object can be an array. In prior versions, create an object to wrap the array:

```jsx
//After Solid 1.4.0
const [todos, setTodos] = createStore([
  { id: 1, title: "Thing I have to do", done: false },
  { id: 2, title: "Learn a New Framework", done: false },
]);
...
<For each={todos}>{todo => <Todo todo={todo} />}</For>;
```

```jsx
//Before 1.4.0
const [state, setState] = createStore({
  todos: [
    { id: 1, title: "Thing I have to do", done: false },
    { id: 2, title: "Learn a New Framework", done: false },
  ],
});
<For each={state.todos}>{(todo) => <Todo todo={todo} />}<For>;
```

Note that modifying an array inside a store will not trigger computations that subscribe to the array directly. For example:

```js
createEffect(() => {
  console.log(state.todos);
});

//This will not trigger the effect:
setState(todos, state.todos.length, { id: 3 });
//This will trigger the effect, because the array reference changes:
setState("todos", (prev) => [...prev, { id: 3 }]);
```

### Getters

Store objects support the use of getters to store calculated values.

```js
const [state, setState] = createStore({
  user: {
    firstName: "John",
    lastName: "Smith",
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
});
```

These are getters that rerun when accessed,
so you still need to use a memo if you want to cache a value:

```js
let fullName;
const [state, setState] = createStore({
  user: {
    firstName: "John",
    lastName: "Smith",
    get fullName() {
      return fullName();
    },
  },
});
fullName = createMemo(() => `${state.user.firstName} ${state.user.lastName}`);
```

### Updating Stores

Changes can take the form of function that passes previous state and returns new state or a value. Objects are always shallowly merged. Set values to `undefined` to delete them from the Store. In TypeScript, you can delete a value by using a non-null assertion, like `undefined!`.

```js
const [state, setState] = createStore({
  firstName: "John",
  lastName: "Miller",
});

setState({ firstName: "Johnny", middleName: "Lee" });
// ({ firstName: 'Johnny', middleName: 'Lee', lastName: 'Miller' })

setState((state) => ({ preferredName: state.firstName, lastName: "Milner" }));
// ({ firstName: 'Johnny', preferredName: 'Johnny', middleName: 'Lee', lastName: 'Milner' })
```

It supports paths including key arrays, object ranges, and filter functions.

setState also supports nested setting where you can indicate the path to the change. When nested the state you are updating may be other non Object values. Objects are still merged but other values (including Arrays) are replaced.

```js
const [state, setState] = createStore({
  counter: 2,
  list: [
    { id: 23, title: 'Birds' }
    { id: 27, title: 'Fish' }
  ]
});

setState('counter', c => c + 1);
setState('list', l => [...l, {id: 43, title: 'Marsupials'}]);
setState('list', 2, 'read', true);
// {
//   counter: 3,
//   list: [
//     { id: 23, title: 'Birds' }
//     { id: 27, title: 'Fish' }
//     { id: 43, title: 'Marsupials', read: true }
//   ]
// }
```

Path can be string keys, array of keys, iterating objects ({from, to, by}), or filter functions. This gives incredible expressive power to describe state changes.

```js
const [state, setState] = createStore({
  todos: [
    { task: 'Finish work', completed: false }
    { task: 'Go grocery shopping', completed: false }
    { task: 'Make dinner', completed: false }
  ]
});

setState('todos', [0, 2], 'completed', true);
// {
//   todos: [
//     { task: 'Finish work', completed: true }
//     { task: 'Go grocery shopping', completed: false }
//     { task: 'Make dinner', completed: true }
//   ]
// }

setState('todos', { from: 0, to: 1 }, 'completed', c => !c);
// {
//   todos: [
//     { task: 'Finish work', completed: false }
//     { task: 'Go grocery shopping', completed: true }
//     { task: 'Make dinner', completed: true }
//   ]
// }

setState('todos', todo => todo.completed, 'task', t => t + '!')
// {
//   todos: [
//     { task: 'Finish work', completed: false }
//     { task: 'Go grocery shopping!', completed: true }
//     { task: 'Make dinner!', completed: true }
//   ]
// }

setState('todos', {}, todo => ({ marked: true, completed: !todo.completed }))
// {
//   todos: [
//     { task: 'Finish work', completed: true, marked: true }
//     { task: 'Go grocery shopping!', completed: false, marked: true }
//     { task: 'Make dinner!', completed: false, marked: true }
//   ]
// }
```

## Store Utilities

### `produce`

```ts
import { produce } from "solid-js/store";

function produce<T>(fn: (state: T) => void): (state: T) => T;
```

Immer inspired API for Solid's Store objects that allows for localized mutation.

```js
setState(
  produce((s) => {
    s.user.name = "Frank";
    s.list.push("Pencil Crayon");
  })
);
```

### `reconcile`

```ts
import { reconcile } from "solid-js/store";

function reconcile<T>(
  value: T | Store<T>,
  options?: {
    key?: string | null;
    merge?: boolean;
  } = { key: "id" }
): (
  state: T extends NotWrappable ? T : Store<T>
) => T extends NotWrappable ? T : Store<T>;
```

Diffs data changes when we can't apply granular updates. Useful for when dealing with immutable data from stores or large API responses.

The key is used when available to match items. By default `merge` false does referential checks where possible to determine equality and replaces where items are not referentially equal. `merge` true pushes all diffing to the leaves and effectively morphs the previous data to the new value.

```js
// subscribing to an observable
const unsubscribe = store.subscribe(({ todos }) => (
  setState('todos', reconcile(todos)));
);
onCleanup(() => unsubscribe());
```

### `unwrap`

```ts
import { unwrap } from "solid-js/store";

function unwrap(store: Store<T>): T;
```

Returns the underlying data in the store without a proxy.

### `createMutable`

```ts
import { createMutable } from 'solid-js/store';

function createMutable<T extends StoreNode>(
  state: T | Store<T>,
): Store<T>;
```

Creates a new mutable Store proxy object. Stores only trigger updates on values changing. Tracking is done by intercepting property access and automatically tracks deep nesting via proxy.

Useful for integrating external systems or as a compatibility layer with MobX/Vue.

> **Note:** A mutable state can be passed around and mutated anywhere, which can make it harder to follow and easier to break unidirectional flow. It is generally recommended to use `createStore` instead. The `produce` modifier can give many of the same benefits without any of the downsides.

```js
const state = createMutable(initialValue);

// read value
state.someValue;

// set value
state.someValue = 5;

state.list.push(anotherValue);
```

Mutables support setters along with getters.

```js
const user = createMutable({
  firstName: "John",
  lastName: "Smith",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  },
});
```

### `modifyMutable`

**New in v1.4.0**

```ts
import { modifyMutable } from 'solid-js/store';

function modifyMutable<T>(mutable: T, modifier: (state: T) => T): void;
```

This helper function simplifies making multiple changes to a mutable Store
(as returned by [`createMutable`](#createmutable))
in a single [`batch`](#batch),
so that dependant computations update just once instead of once per update.
The first argument is the mutable Store to modify,
and the second argument is a Store modifier such as those returned by
[`reconcile`](#reconcile) or [`produce`](#produce).
(If you pass in your own modifier function, beware that its argument is
an unwrapped version of the Store.)

For example, suppose we have a UI depending on multiple fields of a mutable:

```tsx
const state = createMutable({
  user: {
    firstName: "John",
    lastName: "Smith",
  },
});

<h1>Hello {state.user.firstName + ' ' + state.user.lastName}</h1>
```

Modifying *n* fields in sequence will cause the UI to update *n* times:

```ts
state.user.firstName = "Jake";  // triggers update
state.user.lastName = "Johnson";  // triggers another update
```

To trigger just a single update, we could modify the fields in a `batch`:

```ts
batch(() => {
  state.user.firstName = "Jake";
  state.user.lastName = "Johnson";
});
```

`modifyMutable` combined with `reconcile` or `produce`
provides two alternate ways to do similar things:

```ts
// Replace state.user with the specified object (deleting any other fields)
modifyMutable(state.user, reconcile({
  firstName: "Jake",
  lastName: "Johnson",
});

// Modify two fields in batch, triggering just one update
modifyMutable(state.user, produce((u) => {
  u.firstName = "Jake";
  u.lastName = "Johnson";
});
```

# Component APIs

## `createContext`

```ts
import { createContext } from "solid-js";
import type { Context } from "solid-js";

interface Context<T> {
  id: symbol;
  Provider: (props: { value: T; children: any }) => any;
  defaultValue: T;
}

function createContext<T>(defaultValue?: T): Context<T | undefined>;
```

Context provides a form of dependency injection in Solid. It is used to save from needing to pass data as props through intermediate components.

This function creates a new context object that can be used with `useContext` and provides the `Provider` control flow. Default Context is used when no `Provider` is found above in the hierarchy.

```js
export const CounterContext = createContext([{ count: 0 }, {}]);

export function CounterProvider(props) {
  const [state, setState] = createStore({ count: props.count || 0 });
  const counter = [
    state,
    {
      increment() {
        setState("count", (c) => c + 1);
      },
      decrement() {
        setState("count", (c) => c - 1);
      },
    },
  ];

  return (
    <CounterContext.Provider value={counter}>
      {props.children}
    </CounterContext.Provider>
  );
}
```

The value passed to provider is passed to `useContext` as is. That means wrapping as a reactive expression will not work. You should pass in Signals and Stores directly instead of accessing them in the JSX.

## `useContext`

```ts
import { useContext } from "solid-js";

function useContext<T>(context: Context<T>): T;
```

Used to grab context to allow for deep passing of props without having to pass them through each Component function.

```js
const [state, { increment, decrement }] = useContext(CounterContext);
```

## `children`

```ts
import { children } from "solid-js";
import type { JSX, ResolvedChildren } from "solid-js";

function children(fn: () => JSX.Element): () => ResolvedChildren;
```

The `children` helper is for complicated interactions with `props.children`,
when you're not just passing children on to another component
using `{props.children}` once in JSX.
Normally you pass in a getter for `props.children` like so:

```js
const resolved = children(() => props.children);
```

The return value is a [memo](#creatememo) evaluating to the resolved children,
which updates whenever the children change.
Using this memo instead of accessing `props.children` directly
has some important advantages in some scenarios.
The underlying issue is that, when you specify component children via JSX,
Solid automatically defines `props.children` as a property getter,
so that the children are created (in particular, DOM is created)
whenever `props.children` gets accessed. Two particular consequences:

- If you access `props.children` multiple times, the children
  (and associated DOM) get created multiple times.
  This is useful if you want the DOM to be duplicated (as DOM nodes can appear
  in only one parent element), but in many cases it creates redundant DOM nodes.
  If you instead call `resolved()` multiple times, you re-use the same children.
- If you access `props.children` outside of a tracking scope (e.g., in an
  event handler), then you create children that will never be cleaned up.
  If you instead call `resolved()`, you re-use the already resolved children.
  You also guarantee that the children are tracked in the current component,
  as opposed to another tracking scope such as another component.

In addition, the `children` helper "resolves" children by
calling argumentless functions and flattening arrays of arrays into an array.
For example, a child specified with JSX like `{signal() * 2}` gets wrapped into
a getter function `() => count() * 2` in `props.children`, but gets evaluated
to an actual number in `resolved`, properly depending on a `count` signal.

If the given `props.children` is not an array
(which occurs when the JSX tag has a single child),
then the `children` helper will not normalize it into an array.
This is useful behavior e.g. when the intention is to pass a single function
as a child, which can be detected via `typeof resolved() === 'function'`.
If you want to normalize to an array, the returned memo has a `toArray` method(*new in 1.5*).

Here is an example of automatically setting the `class` attribute of any
child that resolves to an `Element`, in addition to rendering the children:

```tsx
const resolved = children(() => props.children);

createEffect(() => {
  let list = resolved.toArray();
  for (let child of list) child?.setAttribute?.("class", myClass());
});

return <div>{resolved()}</div>;
```

(Note that this approach is not particularly recommended:
it is usually better to follow a declarative approach of passing
in the desired class via props or context to the children components.)

On the other hand, you don't need (and in some cases, don't want)
to use the `children` helper if you're just passing `props.children`
on to another component or element via JSX:

```tsx
const Wrapper = (props) => {
  return <div>{props.children}</div>;
};
```

An important aspect of the `children` helper is that it forces the children
to be created and resolved, as it accesses `props.children` immediately.
This can be undesirable for conditional rendering,
e.g., when using the children within a [`<Show>`](#<show>) component.
For example, the following code always evaluates the children:

```tsx
const resolved = children(() => props.children);

return <Show when={visible()}>{resolved()}</Show>;
```

To evaluate the children only when `<Show>` would render them, you can
push the call to `children` inside a component or a function within `<Show>`,
which only evaluates its children when the `when` condition is true.
Another nice workaround is to pass `props.children` to the `children` helper
only when you actually want to evaluate the children:

```ts
const resolved = children(() => visible() && props.children);
```

## `lazy`

```ts
import { lazy } from "solid-js";

function lazy<T extends Component<any>>(
  fn: () => Promise<{ default: T }>
): T & { preload: () => Promise<T> };
```

Used to lazy load components to allow for code splitting. Components are not loaded until rendered. Lazy loaded components can be used the same as its statically imported counterpart, receiving props etc... Lazy components trigger `<Suspense>`

```js
// wrap import
const ComponentA = lazy(() => import("./ComponentA"));

// use in JSX
<ComponentA title={props.title} />;
```

## `createUniqueId`

```ts
import { createUniqueId } from "solid-js";

function createUniqueId(): string;
```

A universal id generator that is stable across server/browser.

```js
const id = createUniqueId();
```

> **Note** on the server this only works under hydratable components

# Secondary Primitives

You probably won't need them for your first app, but these are useful tools to have.

## `createDeferred`

```ts
import { createDeferred } from "solid-js";

function createDeferred<T>(
  source: () => T,
  options?: {
    timeoutMs?: number;
    equals?: false | ((prev: T, next: T) => boolean);
  }
): () => T;
```

Creates a readonly that only notifies downstream changes when the browser is idle. `timeoutMs` is the maximum time to wait before forcing the update.

## `createRenderEffect`

```ts
import { createRenderEffect } from "solid-js";

function createRenderEffect<T>(fn: (v: T) => T, value?: T): void;
```

A render effect is a computation similar to a regular effect
(as created by [`createEffect`](#createeffect)),
but differs in when Solid schedules the first execution of the effect function.
While `createEffect` waits for the current rendering phase to be complete,
`createRenderEffect` immediately calls the function.
Thus the effect runs as DOM elements are being created and updated,
but possibly before specific elements of interest have been created,
and probably before those elements have been connected to the document.
In particular, [`ref`](#ref)s will not be set before the initial effect call.
Indeed, Solid uses `createRenderEffect` to implement the rendering phase
itself, including setting of `ref`s.

Reactive updates to render effects are identical to effects: they queue up in
response to a reactive change (e.g., a single signal update, or a `batch` of
changes, or collective changes during an entire render phase) and run in a
single [`batch`](#batch) afterward (together with effects).
In particular, all signal updates within a render effect are batched.

Here is an example of the behavior.
(Compare with the example in [`createEffect`](#createeffect).)

```js
// assume this code is in a component function, so is part of a rendering phase
const [count, setCount] = createSignal(0);

// this effect prints count at the beginning and when it changes
createRenderEffect(() => console.log("count =", count()));
// render effect runs immediately, printing `count = 0`
console.log("hello");
setCount(1); // effect won't run yet
setCount(2); // effect won't run yet

queueMicrotask(() => {
  // now `count = 2` will print
  console.log("microtask");
  setCount(3); // immediately prints `count = 3`
  console.log("goodbye");
});

// --- overall output: ---
// count = 0   [this is the only added line compared to createEffect]
// hello
// count = 2
// microtask
// count = 3
// goodbye
```

Just like `createEffect`, the effect function gets called with an argument
equal to the value returned from the effect function's last execution,
or on the first call, equal to the optional second argument to
`createRenderEffect`.

## `createComputed`

```ts
import { createComputed } from "solid-js";

function createComputed<T>(fn: (v: T) => T, value?: T): void;
```

`createComputed` creates a new computation that immediately runs the given
function in a tracking scope, thus automatically tracking its dependencies,
and automatically reruns the function whenever the dependencies changes.
The function gets called with an argument equal to the value returned
from the function's last execution, or on the first call,
equal to the optional second argument to `createComputed`.
Note that the return value of the function is not otherwise exposed;
in particular, `createComputed` has no return value.

`createComputed` is the most immediate form of reactivity in Solid, and is
most useful for building other reactive primitives.
(For example, some other Solid primitives are built from `createComputed`.)
But it should be used with care, as `createComputed` can easily cause more
unnecessary updates than other reactive primitives.
Before using it, consider the closely related primitives
[`createMemo`](#creatememo) and [`createRenderEffect`](#createrendereffect).

Like `createMemo`, `createComputed` calls its function immediately on updates
(unless you're in a [batch](#batch), [effect](#createEffect), or
[transition](#use-transition)).
However, while `createMemo` functions should be pure (not set any signals),
`createComputed` functions can set signals.
Related, `createMemo` offers a readonly signal for the return value of the
function, whereas to do the same with `createComputed` you would need to
set a signal within the function.
If it is possible to use pure functions and `createMemo`, this is likely
more efficient, as Solid optimizes the execution order of memo updates,
whereas updating a signal within `createComputed` will immediately trigger
reactive updates some of which may turn out to be unnecessary.

Like `createRenderEffect`, `createComputed` calls its function for the first
time immediately. But they differ in how updates are performed.
While `createComputed` generally updates immediately, `createRenderEffect`
updates queue to run (along with `createEffect`s)
after the current render phase.
Thus `createRenderEffect` can perform fewer overall updates,
but is slightly less immediate.

## `createReaction`

**New in v1.3.0**

```ts
import { createReaction } from "solid-js";

function createReaction(onInvalidate: () => void): (fn: () => void) => void;
```

Sometimes it is useful to separate tracking from re-execution. This primitive registers a side effect that is run the first time the expression wrapped by the returned tracking function is notified of a change.

```js
const [s, set] = createSignal("start");

const track = createReaction(() => console.log("something"));

// next time s changes run the reaction
track(() => s());

set("end"); // "something"

set("final"); // no-op as reaction only runs on first update, need to call track again.
```

## `createSelector`

```ts
import { createSelector } from "solid-js";

function createSelector<T, U>(
  source: () => T,
  fn?: (a: U, b: T) => boolean
): (k: U) => boolean;
```

Creates a conditional signal that only notifies subscribers when entering or exiting their key matching the value. Useful for delegated selection state. As it makes the operation O(1) instead of O(n).

```js
const isSelected = createSelector(selectedId);

<For each={list()}>
  {(item) => <li classList={{ active: isSelected(item.id) }}>{item.name}</li>}
</For>;
```

# Rendering

These imports are exposed from `solid-js/web`.

## `render`

```ts
import { render } from "solid-js/web";
import type { JSX, MountableElement } from "solid-js/web";

function render(code: () => JSX.Element, element: MountableElement): () => void;
```

This is the browser app entry point.
Provide a top-level component function and an element to mount to.
It is recommended this element be empty:
while `render` will just append children,
the returned `dispose` function will remove all children.

```js
const dispose = render(App, document.getElementById("app"));
// or
const dispose = render(() => <App />, document.getElementById("app"));
```

It's important that the first argument is a function: do not pass JSX directly
(as in `render(<App/>, ...)`), because this will call `App` before `render` can
set up a root to track signal dependencies within `App`.

## `hydrate`

```ts
import { hydrate } from "solid-js/web";

function hydrate(fn: () => JSX.Element, node: MountableElement): () => void;
```

This method is similar to `render` except it attempts to rehydrate what is already rendered to the DOM. When initializing in the browser a page has already been server rendered.

```js
const dispose = hydrate(App, document.getElementById("app"));
```

## `renderToString`

```ts
import { renderToString } from "solid-js/web";

function renderToString<T>(
  fn: () => T,
  options?: {
    nonce?: string;
    renderId?: string;
  }
): string;
```

Renders to a string synchronously. The function also generates a script tag for progressive hydration. Options include eventNames to listen to before the page loads and play back on hydration, and nonce to put on the script tag.

`renderId` is used to namespace renders when having multiple top level roots.

```js
const html = renderToString(App);
```

## `renderToStringAsync`

```ts
import { renderToStringAsync } from "solid-js/web";

function renderToStringAsync<T>(
  fn: () => T,
  options?: {
    timeoutMs?: number;
    renderId?: string;
    nonce?: string;
  }
): Promise<string>;
```

Same as `renderToString` except it will wait for all `<Suspense>` boundaries to resolve before returning the results. Resource data is automatically serialized into the script tag and will be hydrated on client load.

`renderId` is used to namespace renders when having multiple top level roots.

```js
const html = await renderToStringAsync(App);
```

## `renderToStream`

**New in v1.3.0**

```ts
import { renderToStream } from "solid-js/web";

function renderToStream<T>(
  fn: () => T,
  options?: {
    nonce?: string;
    renderId?: string;
    onCompleteShell?: () => void;
    onCompleteAll?: () => void;
  }
): {
  pipe: (writable: { write: (v: string) => void }) => void;
  pipeTo: (writable: WritableStream) => void;
};
```

This method renders to a stream. It renders the content synchronously including any Suspense fallback placeholders, and then continues to stream the data and HTML from any async resource as it completes.

```js
// node
renderToStream(App).pipe(res);

// web stream
const { readable, writable } = new TransformStream();
renderToStream(App).pipeTo(writable);
```

`onCompleteShell` fires when synchronous rendering is complete before writing the first flush to the stream out to the browser. `onCompleteAll` is called when all server Suspense boundaries have settled. `renderId` is used to namespace renders when having multiple top level roots.

> Note this API replaces the previous `pipeToWritable` and `pipeToNodeWritable` APIs.

## `isServer`

```ts
import { isServer } from "solid-js/web";

const isServer: boolean;
```

This indicates that the code is being run as the server or browser bundle. As the underlying runtimes export this as a constant boolean it allows bundlers to eliminate the code and their used imports from the respective bundles.

```js
if (isServer) {
  // I will never make it to the browser bundle
} else {
  // won't be run on the server;
}
```

## `DEV`

```ts
import { DEV } from "solid-js";

const DEV: object | undefined;
```

On the client, Solid provides
(via [conditional exports](https://nodejs.org/api/packages.html#conditional-exports))
different builds depending on whether the `development` condition is set.
Development mode provides some additional checking — e.g. detecting accidental
use of multiple instances of Solid — which are removed in production builds.

If you want code to run only in development mode (most useful in libraries),
you can check whether the `DEV` export is defined. Note that it is always
defined on the server, so you may want to combine with [`isServer`](#isserver):

```ts
import { DEV } from "solid-js";
import { isServer } from "solid-js/web";

if (DEV && !isServer) {
  console.log(...);
}
```

## `HydrationScript`

```ts
import { generateHydrationScript, HydrationScript } from "solid-js/web";

function generateHydrationScript(options: {
  nonce?: string;
  eventNames?: string[];
}): string;

function HydrationScript(props: {
  nonce?: string;
  eventNames?: string[];
}): JSX.Element;
```

Hydration Script is a special script that should be placed once on the page to bootstrap hydration before Solid's runtime has loaded. It comes both as a function that can be called and inserted in an your HTML string, or as a Component if you are rendering JSX from the `<html>` tag.

The options are for the `nonce` to be put on the script tag and any event names for that Solid should capture before scripts have loaded and replay during hydration. These events are limited to those that Solid delegates which include most UI Events that are composed and bubble. By default it is only `click` and `input` events.

# Control Flow

For reactive control flow to be performant, we have to control how elements are created. For example, calling `array.map` is inefficient as it always maps the entire array.

This means helper functions. Wrapping these in components is convenient way for terse templating and allows users to compose and build their own control flow components.

These built-in control flow components will be automatically imported. All except `Portal` and `Dynamic` are exported from both `solid-js` and `solid-js/web`. `Portal` and `Dynamic`, which are DOM-specific, are exported by `solid-js/web`.

> Note: All callback/render function children of control flow are non-tracking. This allows for nesting state creation, and better isolates reactions.

## `<For>`

```ts
import { For } from "solid-js";

function For<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: T, index: () => number) => U;
}): () => U[];
```

A referentially keyed loop with efficient updating of only changed items.
The callback takes the current item as the first argument:

```jsx
<For each={state.list} fallback={<div>Loading...</div>}>
  {(item) => <div>{item}</div>}
</For>
```

The optional second argument is an index signal:

```jsx
<For each={state.list} fallback={<div>Loading...</div>}>
  {(item, index) => (
    <div>
      #{index()} {item}
    </div>
  )}
</For>
```

## `<Show>`

```ts
import { Show } from "solid-js";

function Show<T>(props: {
  when: T | undefined | null | false;
  keyed: boolean;
  fallback?: JSX.Element;
  children: JSX.Element | ((item: T) => JSX.Element);
}): () => JSX.Element;
```

The Show control flow is used to conditional render part of the view: it renders `children` when the `when` is truthy, an `fallback` otherwise. It is similar to the ternary operator (`when ? children : fallback`) but is ideal for templating JSX.

```jsx
<Show when={state.count > 0} fallback={<div>Loading...</div>}>
  <div>My Content</div>
</Show>
```

Show can also be used as a way of keying blocks to a specific data model. Ex the function is re-executed whenever the user model is replaced.

```jsx
<Show when={state.user} fallback={<div>Loading...</div>} keyed>
  {(user) => <div>{user.firstName}</div>}
</Show>
```

## `<Switch>`/`<Match>`

```ts
import { Switch, Match } from "solid-js";
import type { MatchProps } from "solid-js";

function Switch(props: {
  fallback?: JSX.Element;
  children: JSX.Element;
}): () => JSX.Element;

type MatchProps<T> = {
  when: T | undefined | null | false;
  children: JSX.Element | ((item: T) => JSX.Element);
};
function Match<T>(props: MatchProps<T>);
```

Useful for when there are more than 2 mutual exclusive conditions.
For example, it can be used to perform basic routing:

```jsx
<Switch fallback={<div>Not Found</div>}>
  <Match when={state.route === "home"}>
    <Home />
  </Match>
  <Match when={state.route === "settings"}>
    <Settings />
  </Match>
</Switch>
```

Match also supports function children to serve as keyed flow.

## `<Index>`

```ts
import { Index } from "solid-js";

function Index<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: () => T, index: number) => U;
}): () => U[];
```

Non-keyed list iteration (rendered nodes are keyed to an array index). This is useful when there is no conceptual key, like if the data consists of primitives and it is the index that is fixed rather than the value.

The item is a signal:

```jsx
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item) => <div>{item()}</div>}
</Index>
```

Optional second argument is an index number:

```jsx
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item, index) => (
    <div>
      #{index} {item()}
    </div>
  )}
</Index>
```

## `<ErrorBoundary>`

```ts
import { ErrorBoundary } from "solid-js";

function ErrorBoundary(props: {
  fallback: JSX.Element | ((err: any, reset: () => void) => JSX.Element);
  children: JSX.Element;
}): () => JSX.Element;
```

Catches uncaught errors and renders fallback content.

```jsx
<ErrorBoundary fallback={<div>Something went terribly wrong</div>}>
  <MyComp />
</ErrorBoundary>
```

Also supports callback form which passes in error and a reset function.

```jsx
<ErrorBoundary
  fallback={(err, reset) => <div onClick={reset}>Error: {err.toString()}</div>}
>
  <MyComp />
</ErrorBoundary>
```

## `<Suspense>`

```ts
import { Suspense } from "solid-js";

function Suspense(props: {
  fallback?: JSX.Element;
  children: JSX.Element;
}): JSX.Element;
```

A component that tracks all resources read under it and shows a fallback placeholder state until they are resolved. What makes `Suspense` different than `Show` is it is non-blocking in that both branches exist at the same time even if not currently in the DOM.

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <AsyncComponent />
</Suspense>
```

## `<SuspenseList>` (Experimental)

```ts
import { SuspenseList } from "solid-js";

function SuspenseList(props: {
  children: JSX.Element;
  revealOrder: "forwards" | "backwards" | "together";
  tail?: "collapsed" | "hidden";
}): JSX.Element;
```

`SuspenseList` allows for coordinating multiple parallel `Suspense` and `SuspenseList` components. It controls the order in which content is revealed to reduce layout thrashing and has an option to collapse or hide fallback states.

```jsx
<SuspenseList revealOrder="forwards" tail="collapsed">
  <ProfileDetails user={resource.user} />
  <Suspense fallback={<h2>Loading posts...</h2>}>
    <ProfileTimeline posts={resource.posts} />
  </Suspense>
  <Suspense fallback={<h2>Loading fun facts...</h2>}>
    <ProfileTrivia trivia={resource.trivia} />
  </Suspense>
</SuspenseList>
```

SuspenseList is still experimental and does not have full SSR support.

## `<Dynamic>`

```ts
import { Dynamic } from "solid-js/web";

function Dynamic<T>(
  props: T & {
    children?: any;
    component?: Component<T> | string | keyof JSX.IntrinsicElements;
  }
): () => JSX.Element;
```

This component lets you insert an arbitrary Component or tag and passes the props through to it.

```jsx
<Dynamic component={state.component} someProp={state.something} />
```

## `<Portal>`

```ts
import { Portal } from "solid-js/web";

function Portal(props: {
  mount?: Node;
  useShadow?: boolean;
  isSVG?: boolean;
  children: JSX.Element;
}): Text;
```

This inserts the element in the mount node. Useful for inserting Modals outside of the page layout. Events still propagate through the Component Hierarchy.

The portal is mounted in a `<div>` unless the target is the document head. `useShadow` places the element in a Shadow Root for style isolation, and `isSVG` is required if inserting into an SVG element so that the `<div>` is not inserted.

```jsx
<Portal mount={document.getElementById("modal")}>
  <div>My Content</div>
</Portal>
```

# Special JSX Attributes

In general Solid attempts to stick to DOM conventions. Most props are treated as attributes on native elements and properties on Web Components, but a few of them have special behavior.

For custom namespaced attributes with TypeScript you need to extend Solid's JSX namespace:

```ts
declare module "solid-js" {
  namespace JSX {
    interface Directives {
      // use:____
    }
    interface ExplicitProperties {
      // prop:____
    }
    interface ExplicitAttributes {
      // attr:____
    }
    interface CustomEvents {
      // on:____
    }
    interface CustomCaptureEvents {
      // oncapture:____
    }
  }
}
```

## `ref`

Refs are a way of getting access to underlying DOM elements in our JSX. While it is true one could just assign an element to a variable, it is more optimal to leave components in the flow of JSX. Refs are assigned at render time but before the elements are connected to the DOM. They come in 2 flavors.

```js
// variable assigned directly by ref
let myDiv;

// use onMount or createEffect to read after connected to DOM
onMount(() => console.log(myDiv));

<div ref={myDiv} />

// Or, callback function (called before connected to DOM)
<div ref={el => console.log(el)} />
```

Refs can also be used on Components. They still need to be attached on the other side.

```jsx
function MyComp(props) {
  return <div ref={props.ref} />;
}

function App() {
  let myDiv;
  onMount(() => console.log(myDiv.clientWidth));
  return <MyComp ref={myDiv} />;
}
```

## `classList`

Solid offers two ways to set the `class` of an element:
`class` and `classList` attributes.

First, you can set `class=...` like any other attribute. For example:

```jsx
// Two static classes
<div class="active editing" />

// One dynamic class, deleting class attribute if it's not needed
<div class={state.active ? 'active' : undefined} />

// Two dynamic classes
<div class={`${state.active ? 'active' : ''} ${state.currentId === row.id ? 'editing' : ''}`} />
```

(Note that `className=...` was deprecated in Solid 1.4.)

Alternatively, the `classList` pseudo-attribute lets you specify an object,
where each key is a class and the value is treated as a boolean
representing whether to include that class.
For example (matching the last example):

```jsx
<div
  classList={{ active: state.active, editing: state.currentId === row.id }}
/>
```

This example compiles to a [render effect](#createrendereffect)
that dynamically calls
[`element.classList.toggle`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle)
to turn each class on or off, only when the corresponding boolean changes.
For example, when `state.active` becomes `true` [`false`], the element gains
[loses] the `active` class.

The value passed into `classList` can be any expression (including a signal
getter) that evaluates to an appropriate object. Some examples:

```jsx
// Dynamic class name and value
<div classList={{ [className()]: classOn() }} />;

// Signal class list
const [classes, setClasses] = createSignal({});
setClasses((c) => ({ ...c, active: true }));
<div classList={classes()} />;
```

It's also possible, but dangerous, to mix `class` and `classList`.
The main safe situation is when `class` is set to a static string (or nothing),
and `classList` is reactive.
(`class` could also be set to a static computed value as in
`class={baseClass()}`, but then it should appear
before any `classList` pseudo-attributes.)
If both `class` and `classList` are reactive,
you can get unexpected behavior:
when the `class` value changes, Solid sets the entire `class` attribute,
so will overwrite any toggles made by `classList`.

Because `classList` is a compile-time pseudo-attribute,
it does not work in a prop spread like `<div {...props} />`
or in `<Dynamic>`.

## `style`

Solid's `style` attribute lets you provide either a CSS string or
an object where keys are CSS property names:

```jsx
// string
<div style={`color: green; height: ${state.height}px`} />

// object
<div style={{
  color: "green",
  height: state.height + "px" }}
/>
```

Unlike [React's `style` attribute](https://reactjs.org/docs/dom-elements.html#style),
Solid uses `element.style.setProperty` under the hood. This means you need to use
the lower-case, dash-separated version of property names
instead of the JavaScript camel-cased version,
such as `"background-color"` rather than `backgroundColor`.
This actually leads to better performance and consistency with SSR output.

```jsx
// string
<div style={`color: green; background-color: ${state.color}; height: ${state.height}px`} />

// object
<div style={{
  color: "green",
  "background-color": state.color,
  height: state.height + "px" }}
/>
```

This also means you can set CSS variables! For example:

```jsx
// set css variable
<div style={{ "--my-custom-color": state.themeColor }} />
```

## `innerHTML`/`textContent`

These work the same as their property equivalent. Set a string and they will be set. **Be careful!!** Setting `innerHTML` with any data that could be exposed to an end user as it could be a vector for malicious attack. `textContent` while generally not needed is actually a performance optimization when you know the children will only be text as it bypasses the generic diffing routine.

```jsx
<div textContent={state.text} />
```

## `on___`

Event handlers in Solid typically take the form of `onclick` or `onClick` depending on style.

Solid uses semi-synthetic event delegation for common UI events that are composed and bubble. This improves performance for these common events.

```jsx
<div onClick={(e) => console.log(e.currentTarget)} />
```

Solid also supports passing an array to the event handler to bind a value to the first argument of the event handler. This doesn't use `bind` or create an additional closure, so it is a highly optimized way of delegating events.

```jsx
function handler(itemId, e) {
  /*...*/
}

<ul>
  <For each={state.list}>{(item) => <li onClick={[handler, item.id]} />}</For>
</ul>;
```

Events are never rebound and the bindings are not reactive, as it is expensive to attach and detach listeners.
Since event handlers are called like any other function each time an event fires, there is no need for reactivity; shortcut your handler if desired.

```jsx
// if defined, call it; otherwise don't.
<div onClick={() => props.handleClick?.()} />
```

Note that `onChange` and `onInput` work according to their native behavior. `onInput` will fire immediately after the value has changed; for `<input>` fields, `onChange` will only fire after the field loses focus.

## `on:___`/`oncapture:___`

For any other events, perhaps ones with unusual names, or ones you wish not to be delegated, there are the `on` namespace events. This attribute adds an event listener verbatim.

```jsx
<div on:Weird-Event={(e) => alert(e.detail)} />
```

## `use:___`

These are custom directives. In a sense this is just syntax sugar over ref but allows us to easily attach multiple directives to a single element. A directive is a function with the following signature:

```ts
function directive(element: Element, accessor: () => any): void;
```

Directive functions are called at render time but before being added to the DOM. You can do whatever you'd like in them including create signals, effects, register clean-up etc.

```js
const [name, setName] = createSignal("");

function model(el, value) {
  const [field, setField] = value();
  createRenderEffect(() => (el.value = field()));
  el.addEventListener("input", (e) => setField(e.target.value));
}

<input type="text" use:model={[name, setName]} />;
```

To register with TypeScript extend the JSX namespace.

```ts
declare module "solid-js" {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any];
    }
  }
}
```

## `prop:___`

Forces the prop to be treated as a property instead of an attribute.

```jsx
<div prop:scrollTop={props.scrollPos + "px"} />
```

## `attr:___`

Forces the prop to be treated as a attribute instead of an property. Useful for Web Components where you want to set attributes.

```jsx
<my-element attr:status={props.status} />
```

## `/* @once */`

Solid's compiler uses a heuristic for reactive wrapping and lazy evaluation of JSX expressions. Does it contain a function call, a property access, or JSX? If yes we wrap it in a getter when passed to components or in an effect if passed to native elements.

Knowing this heuristic and its limitations, we can reduce overhead of things we know will never change by accessing them outside of the JSX. A lone variable will never be wrapped. We can also tell the compiler not to wrap them by starting the expression with a comment decorator `/* @once */`.

```jsx
<MyComponent static={/*@once*/ state.wontUpdate} />
```

This also works on children.

```jsx
<MyComponent>{/*@once*/ state.wontUpdate}</MyComponent>
```
