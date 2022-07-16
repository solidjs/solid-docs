---
title: API
description: Outline ng lahat ng Solid API.
sort: 0
---

# Basic Reactivity

## `createSignal`

```ts
export function createSignal<T>(
  value: T,
  options?: { equals?: false | ((prev: T, next: T) => boolean) }
): [get: () => T, set:(v: T) => T];
```

Ito ang pinakapayak na reactive primitive na ginagamit upang i-track ang isang value na pabagu-bago. Nagbibigay ang `createSignal` ng dalawang function sa isang array: isang getter (o _accessor_) at isang setter.

Nagbibigay ng kasalukuyang value ng signal ang getter. Kapag tinawag ito sa loob ng isang tracking scope (tulad ng mga function na pinasa sa `createEffect` o ginamit sa loob ng JSX expression), tatakbo muli ang calling context kapag nag-update ang signal.

Ang setter ang siyang maga-update ng signal. Tumatanggap ang setter ng iisang argument--maaaring ang bagong value ng signal, o kaya naman ay isang function na magbibigay ng panibagong value sa signal mula sa luma nitong value. Ibabalik ng setter ang bagong value.

```js
const [getValue, setValue] = createSignal(initialValue);

// kunin ang value
getValue();

// magpalit ng value
setValue(nextValue);

// baguhin ang value gamit ang function setter
setValue((prev) => prev + next);
```

> Kung gusto mong maglagay ng function bilang value ng Signal, kailangan mong gamitin ang function form ng setter:
>
> ```js
> setValue(() => myFunction);
> ```

### Mga Option

Marami sa mga primitive ng Solid ang tumatanggap ng "options" object sa huli nitong mga argument. Maaari kang makapagbigay ng `equals` na option sa options object ng `createSignal`.

```js
const [getValue, setValue] = createSignal(initialValue, { equals: false });
```

Sa simula, kapag tinawag ang setter ng signal, tatakbo muli ang mga dependency ng signal kung talagang magkaiba ang bago at luma nitong value. Maaari mong i-set ang `equals` na option sa `false` para palaging tumakbo ang mga dependency ng signal tuwing pagkatapos tawagin ang setter, o kaya naman ay puwede kang magpasa na sarili mong equality function.

```js
const [myString, setMyString] = createSignal("string", {
   equals: (newVal, oldVal) => newVal.length === oldVal.length 
});

setMyString("strung") //itinuturing na equal sa huling value at hindi makapagsisimula ng mga update
setMyString("stranger") //itinuturing na magkaiba at makapagsisimula ng mga update
```


## `createEffect`

```ts
export function createEffect<T>(
  fn: (v: T) => T,
  value?: T,
): void;
```

Gumagawa ng panibagong computation na automatic na magta-track sa mga dependency at tatakbo pagkatapos ng bawat render sa oras na magbago ang isa sa mga dependency. Mabisa katuwang ng paggamit ng mga `ref` at pagma-manage ng iba pang mga side effect.

```js
const [a, setA] = createSignal(initialValue);

// effect na nakadepende sa signal `a`
createEffect(() => doSideEffect(a()));
```

Tatawagin ang effect function na may isang argument mula sa ibinalik nito noong huli itong tinawag. Maaaring ibigay ang value ng argument na ito bilang optional na pangalawang argument. Magagamit ito sa diffing nang walang ginagawang panibagong closure.

```js
createEffect((prev) => {
  const sum = a() + b();
  if (sum !== prev) console.log(sum);
  return sum;
}, 0);
```

Nagbabago ang mga signal sa loob ng mga effect nang _naka-batch_: walang magpo-propagate na pag-update sa signal habang hindi pa tapos tumakbo ang effect na naglalaman ng pagtawag sa pag-update nitong signal.

## `createMemo`

```ts
export function createMemo<T>(
  fn: (v: T) => T,
  value?: T,
  options?: { equals?: false | ((prev: T, next: T) => boolean) }
): () => T;
```

Gumagawa ng derived signal na readonly at may value na magre-recalculate sa tuwing magbabago ang kahit isa sa mga dependency nito.

```js
const getValue = createMemo(() => computeExpensiveValue(a(), b()));

// kunin ang value
getValue();
```

Tatawagin ang memo function na may isang argument mula sa ibinalik nito noong huli itong tinawag. Maaaring ibigay ang value ng argument na ito bilang optional na pangalawang argument. Magagamit ito upang bawasan ang karagdagang mga computation.

```js
const sum = createMemo((prev) => input() + prev, 0);
```

## `createResource`

```ts
type ResourceReturn<T> = [
  {
    (): T | undefined;
    loading: boolean;
    error: any;
  },
  {
    mutate: (v: T | undefined) => T | undefined;
    refetch: () => void;
  }
];

export function createResource<T, U = true>(
  fetcher: (k: U, getPrev: () => T | undefined) => T | Promise<T>,
  options?: { initialValue?: T; }
): ResourceReturn<T>;

export function createResource<T, U>(
  source: U | false | null | (() => U | false | null),
  fetcher: (k: U, getPrev: () => T | undefined) => T | Promise<T>,
  options?: { initialValue?: T; }
): ResourceReturn<T>;
```

Gumagawa ng signal na makapagma-manage ng mga async request. Isang async function ang `fetcher` na tumatanggap ng value na ibinabalik ng `source` kung ibinigay, at magbabalik ng Promise na magre-resolve sa isang value. Itong resolved na value ay siyang ilalagay bilang panibagong value ng resource. Hindi reactive ang fetcher kaya magbigay ng `source` kung gusto mong tumakbo ito nang higit sa isang beses. Kung magre-resolve ang source sa false, null, o kaya ay undefined, hindi muling tatakbo ang fetcher upang baguhin ang value ng resource.

```js
const [data, { mutate, refetch }] = createResource(getQuery, fetchData);

// kunin ang value
data();

// tingnan kung naglo-load
data.loading;

// tingnan kung nag-error
data.error;

// baguhin ang value kaagad
mutate(optimisticValue);

// mag-fetch uli sa anumang dahilan
refetch();
```

Ang `loading` at `error` ay mga reactive na getter at maaaring i-track.

# Mga Lifecycle

## `onMount`

```ts
export function onMount(fn: () => void): void;
```

Magre-register ng method na tatakbo pagkatapos ng unang render at kapag naikarga na ang mga element. Mainam katuwang ng mga `ref` at pagma-manage ng iba pang mga side effect na tatakbo lamang nang isang beses. Katumbas ito ng `createEffect` na walang mga dependency.

## `onCleanup`

```ts
export function onCleanup(fn: () => void): void;
```

Magre-register ng cleanup method na tatakbo tuwing disposal o kaya ng recalculation ng reactive scope kung saan ito kabilang. Maaaring gamitin sa anumang Component o Effect. 

## `onError`

```ts
export function onError(fn: (err: any) => void): void;
```

Magre-register ng error handler method na tatakbo kapag nakatanggap ng error kahit saan sa child scope. Tatakbo lamang ang error handler sa pinakamalapit na scope. Ibato muli ang error para maipasa paitaas sa mga scope.

# Mga Reactive Utility

Nagbibigay ang mga helper na ito ng kakayahan upang makapag-schedule ng mga update nang mas maayos, at kontroling kung papaano tinatrack ang reactivity. 

## `untrack`

```ts
export function untrack<T>(fn: () => T): T;
```

Binabalewala ang tracking ng anumang dependency sa code block na tumatakbo at nagbibigay ng value.

## `batch`

```ts
export function batch<T>(fn: () => T): T;
```

Iniipon ang mga update sa loob ng block hanggang sa huli upang maiwasan ang sobrang recalculation. Ibig sabihin, hindi pa maga-update ang pagkuha ng value sa susunod na linya. Automatic na nakapaloob ang set method ng [Solid Store](#createstore) at mga Effect sa isang batch.

## `on`

```ts
export function on<T extends Array<() => any> | (() => any), U>(
  deps: T,
  fn: (input: T, prevInput: T, prevValue?: U) => U,
  options: { defer?: boolean } = {}
): (prevValue?: U) => U | undefined;
```

Dinisenyo ang `on` para ipasa sa loob ng computation upang gawing hayagan ang mga dependency nito. Kung array ng mga dependency ang ipinasa, magiging array rin ang `input` at `prevInput`.

```js
createEffect(on(a, (v) => console.log(v, b())));

// ay katumbas ng:
createEffect(() => {
  const v = a();
  untrack(() => console.log(v, b()));
});
```

Maaari ring huwag munang gawin ang computation kaagad at sa halip ay gawin ito kapag nagbago ang mga dependency sa pamamagitan ng paglalagay ng defer option sa true.

```js
// hindi kaagad tatakbo
createEffect(on(a, (v) => console.log(v), { defer: true }));

setA("new"); // ngayon tatakbo na ito
```

## `createRoot`

```ts
export function createRoot<T>(fn: (dispose: () => void) => T): T;
```

Gumagawa ng bagong non-tracked context na hindi kaagad mago-auto-dispose. Magagamit ito sa mga nested na reactive context kung saan hindi dapat ire-release kapag nag-re-evaluate ang parent. Mabisa ito para sa caching.

Dapat naka-wrap ang lahat ng Solid code sa ganitong top level wrapper dahil sinisiguro nito na lahat ng memory/mga computation ay freed up na. Madalas, hindi na kailangang gawin ang ganito dahil ang lahat ng `render` entry function ay may kasama nang `createRoot` sa loob.

## `mergeProps`

```ts
export function mergeProps(...sources: any): any;
```

Isang method para sa reactive object `merge`. Magagamito ito sa pagse-set ng mga default prop ng mga component sa tuwing hindi ibinigay ng caller ang mga ito. O kaya naman ay pagko-clone ng props object kasama ng mga reactive property.

Gumagana ang method na ito gamit ang proxy at nire-resolve nito ang mga property nang pabaligtad. Ito ang makapagbibigay ng kakayahan upang maisagawa ang dynamic tracking ng mga property na hindi kasama noong unang minerge ang prop object.

```js
// defaul na mga prop
props = mergeProps({ name: "Smith" }, props);

// i-clone ang mga prop
newProps = mergeProps(props);

// i-merge ang mga prop
props = mergeProps(props, otherProps);
```

## `splitProps`

```ts
export function splitProps<T>(
  props: T,
  ...keys: Array<(keyof T)[]>
): [...parts: Partial<T>];
```

Hinahati ang reactive object gamit ang mga key.

Tumatanggap ito ng reactive object at kahit ilang array ng key; sa bawat array ng key, magbabalik ito ng reactive object na meron lamang property nung orihinal na object. Itong reactive object ay maglalaman lamang ng mga property na kasama ang key sa mga ibinigay sa mga array. Ang huling reactive object sa ibinalik na array ay maglalaman ng mga natirang property.

Magagamit ito kung ninanais na kumuha lamang ng iilang mga prop at ipasa ang natitira sa isang child.

```js
const [local, others] = splitProps(props, ["children"]);

<>
  <Child {...others} />
  <div>{local.children}<div>
</>
```

## `useTransition`

```ts
export function useTransition(): [
  () => boolean,
  (fn: () => void, cb?: () => void) => void
];
```

Ginagamit ito upang i-batch ang mga async update sa isang transaction, at ihihinto ang mga commit pansamantala hanggang matapos ang lahat ng async process. Katuwang nito ang Suspense at tinatrack lamang ang mga resource na ginagamit sa loob ng mga Suspense boundary.

```js
const [isPending, start] = useTransition();

// i-check kung nagta-transitioning
isPending();

// i-wrap sa loob ng transition
start(() => setSignal(newValue), () => /* transition is done */)
```

## `observable`

```ts
export function observable<T>(input: () => T): Observable<T>;
```

Tumatanggap ang method na ito ng isang signal at nagbabalik ng simpleng Observable. Gamitin ito sa napipiling Observable library sa pamamagitan ng `from` operator.

```js
import { from } from "rxjs";

const [s, set] = createSignal(0);

const obsv$ = from(observable(s));

obsv$.subscribe((v) => console.log(v));
```

## `mapArray`

```ts
export function mapArray<T, U>(
  list: () => readonly T[],
  mapFn: (v: T, i: () => number) => U
): () => U[];
```

Reactive map helper na nagka-cache ng bawat item by reference upang bawasan ang karagdagang mapping sa mga update. Tumatakbo lamang ang mapping function isang beses sa bawat value na nililipat o tinatanggal kung kinakailangan. Isang signal ang index argument. Hindi nagta-track mismo ang map function.

Ginagamit ito ng `<For>` control flow.

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
    }
    setName,
    setDescription
  }
});
```

## `indexArray`

```ts
export function indexArray<T, U>(
  list: () => readonly T[],
  mapFn: (v: () => T, i: number) => U
): () => U[];
```

Katulad ng `mapArray`, ngunit nagma-map ito gamit ang index. Isang signal ang item, at constant na ngayon ang index.

Ginagamit ito ng `<Index>` control flow.

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
export function createStore<T extends StoreNode>(
  state: T | Store<T>,
): [get: Store<T>, set: SetStoreFunction<T>];
```

The create function takes an initial state, wraps it in a store, and returns a readonly proxy object and a setter function.

```js
import { createStore } from "solid-js/store";
const [state, setState] = createStore(initialValue);

// read value
state.someValue;

// set value
setState({ merge: "thisValue" });

setState("path", "to", "value", newValue);
```

As proxies, store objects only track when a property is accessed. 

When nested objects are accessed, stores will produce nested store objects, and this applies all the way down the tree. However, this only applies to arrays and plain objects. Classes are not wrapped, so objects like `Date`, `HTMLElement`, `RegExp`, `Map`, `Set` won't be granularly reactive as properties on a store. 

The top level state object cannot be tracked, so put any lists on a key of state rather than using the state object itself.
```js
// put the list as a key on the state object
const [state, setState] = createStore({ list: [] });

// access the `list` property on the state object
<For each={state.list}>{item => /*...*/}</For>
```

### Getters

Store objects support the use of getters to store calculated values.

```js
import { createStore } from "solid-js/store";
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

These are simple getters, so you still need to use a memo if you want to cache a value:

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

Changes can take the form of function that passes previous state and returns new state or a value. Objects are always shallowly merged. Set values to `undefined` to delete them from the Store.

```js
import { createStore } from "solid-js/store";
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
export function produce<T>(
  fn: (state: T) => void
): (
  state: T extends NotWrappable ? T : Store<T>
) => T extends NotWrappable ? T : Store<T>;
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
export function reconcile<T>(
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

### `createMutable`

```ts
export function createMutable<T extends StoreNode>(
  state: T | Store<T>,
): Store<T> {
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

# Component APIs

## `createContext`

```ts
interface Context<T> {
  id: symbol;
  Provider: (props: { value: T; children: any }) => any;
  defaultValue: T;
}
export function createContext<T>(defaultValue?: T): Context<T | undefined>;
```

Context provides a form of dependency injection in Solid. It is used to save from needing to pass data as props through intermediate components.

This function creates a new context object that can be used with `useContext` and provides the `Provider` control flow. Default Context is used when no `Provider` is found above in the hierarchy.

```js
export const CounterContext = createContext([{ count: 0 }, {}]);

export function CounterProvider(props) {
  const [state, setState] = createStore({ count: props.count || 0 });
  const store = [
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
    <CounterContext.Provider value={store}>
      {props.children}
    </CounterContext.Provider>
  );
}
```

The value passed to provider is passed to `useContext` as is. That means wrapping as a reactive expression will not work. You should pass in Signals and Stores directly instead of accessing them in the JSX.

## `useContext`

```ts
export function useContext<T>(context: Context<T>): T;
```

Used to grab context to allow for deep passing of props without having to pass them through each Component function.

```js
const [state, { increment, decrement }] = useContext(CounterContext);
```

## `children`

```ts
export function children(fn: () => any): () => any;
```

Used to make it easier to interact with `props.children`. This helper resolves any nested reactivity and returns a memo. Recommended approach to using `props.children` in anything other than passing directly through to JSX.

```js
const list = children(() => props.children);

// do something with them
createEffect(() => list());
```

## `lazy`

```ts
export function lazy<T extends Component<any>>(
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

# Secondary Primitives

You probably won't need them for your first app, but these are useful tools to have.

## `createDeferred`

```ts
export function createDeferred<T>(
  source: () => T,
  options?: {
    timeoutMs?: number;
    equals?: false | ((prev: T, next: T) => boolean);
  }
): () => T;
```

Creates a readonly that only notifies downstream changes when the browser is idle. `timeoutMs` is the maximum time to wait before forcing the update.

## `createComputed`

```ts
export function createComputed<T>(
  fn: (v: T) => T,
  value?: T,
): void;
```

Creates a new computation that automatically tracks dependencies and runs immediately before render. Use this to write to other reactive primitives. When possible use `createMemo` instead as writing to a signal mid update can cause other computations to need to re-calculate.

## `createRenderEffect`

```ts
export function createRenderEffect<T>(
  fn: (v: T) => T,
  value?: T,
): void;
```

Creates a new computation that automatically tracks dependencies and runs during the render phase as DOM elements are created and updated but not necessarily connected. All internal DOM updates happen at this time.

## `createSelector`

```ts
export function createSelector<T, U>(
  source: () => T,
  fn?: (a: U, b: T) => boolean,
): (k: U) => boolean;
```

Creates a conditional signal that only notifies subscribers when entering or exiting their key matching the value. Useful for delegated selection state. As it makes the operation O(2) instead of O(n).

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
export function render(
  code: () => JSX.Element,
  element: MountableElement
): () => void;
```

This is the browser app entry point. Provide a top level component definition or function and an element to mount to. It is recommended this element be empty as the returned dispose function will wipe all children.

```js
const dispose = render(App, document.getElementById("app"));
```

## `hydrate`

```ts
export function hydrate(
  fn: () => JSX.Element,
  node: MountableElement
): () => void;
```

This method is similar to `render` except it attempts to rehydrate what is already rendered to the DOM. When initializing in the browser a page has already been server rendered.

```js
const dispose = hydrate(App, document.getElementById("app"));
```

## `renderToString`

```ts
export function renderToString<T>(
  fn: () => T,
  options?: {
    eventNames?: string[];
    nonce?: string;
  }
): string;
```

Renders to a string synchronously. The function also generates a script tag for progressive hydration. Options include eventNames to listen to before the page loads and play back on hydration, and nonce to put on the script tag.

```js
const html = renderToString(App);
```

## `renderToStringAsync`

```ts
export function renderToStringAsync<T>(
  fn: () => T,
  options?: {
    eventNames?: string[];
    timeoutMs?: number;
    nonce?: string;
  }
): Promise<string>;
```

Same as `renderToString` except it will wait for all `<Suspense>` boundaries to resolve before returning the results. Resource data is automatically serialized into the script tag and will be hydrated on client load.

```js
const html = await renderToStringAsync(App);
```

## `pipeToNodeWritable`

```ts
export type PipeToWritableResults = {
  startWriting: () => void;
  write: (v: string) => void;
  abort: () => void;
};
export function pipeToNodeWritable<T>(
  fn: () => T,
  writable: { write: (v: string) => void },
  options?: {
    eventNames?: string[];
    nonce?: string;
    noScript?: boolean;
    onReady?: (r: PipeToWritableResults) => void;
    onComplete?: (r: PipeToWritableResults) => void | Promise<void>;
  }
): void;
```

This method renders to a Node stream. It renders the content synchronously including any Suspense fallback placeholders, and then continues to stream the data from any async resource as it completes.

```js
pipeToNodeWritable(App, res);
```

The `onReady` option is useful for writing into the stream around the the core app rendering. Remember if you use `onReady` to manually call `startWriting`.

## `pipeToWritable`

```ts
export type PipeToWritableResults = {
  write: (v: string) => void;
  abort: () => void;
  script: string;
};
export function pipeToWritable<T>(
  fn: () => T,
  writable: WritableStream,
  options?: {
    eventNames?: string[];
    nonce?: string;
    noScript?: boolean;
    onReady?: (
      writable: { write: (v: string) => void },
      r: PipeToWritableResults
    ) => void;
    onComplete?: (
      writable: { write: (v: string) => void },
      r: PipeToWritableResults
    ) => void;
  }
): void;
```

This method renders to a web stream. It renders the content synchronously including any Suspense fallback placeholders, and then continues to stream the data from any async resource as it completes.

```js
const { readable, writable } = new TransformStream();
pipeToWritable(App, writable);
```

The `onReady` option is useful for writing into the stream around the the core app rendering. Remember if you use `onReady` to manually call `startWriting`.

## `isServer`

```ts
export const isServer: boolean;
```

This indicates that the code is being run as the server or browser bundle. As the underlying runtimes export this as a constant boolean it allows bundlers to eliminate the code and their used imports from the respective bundles.

```js
if (isServer) {
  // I will never make it to the browser bundle
} else {
  // won't be run on the server;
}
```

# Control Flow

 For reactive contriol flow to be performant, we have to control how elements are created. For example, with lists, a simple `map` is inefficient as it always maps the entire array. 
 
This means helper functions. Wrapping these in components is convenient way for terse templating and allows users to compose and build their own control flow components.

These built-in control flow components will be automatically imported. All except `Portal` and `Dynamic` are exported from `solid-js`. Those two, which are DOM-specific, are exported by `solid-js/web`.

> Note: All callback/render function children of control flow are non-tracking. This allows for nesting state creation, and better isolates reactions.

## `<For>`

```ts
export function For<T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: T, index: () => number) => U;
}): () => U[];
```

Simple referentially keyed loop. The callback takes the current item as the first argument:

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
function Show<T>(props: {
  when: T | undefined | null | false;
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
<Show when={state.user} fallback={<div>Loading...</div>}>
  {(user) => <div>{user.firstName}</div>}
</Show>
```

## `<Switch>`/`<Match>`

```ts
export function Switch(props: {
  fallback?: JSX.Element;
  children: JSX.Element;
}): () => JSX.Element;

type MatchProps<T> = {
  when: T | undefined | null | false;
  children: JSX.Element | ((item: T) => JSX.Element);
};
export function Match<T>(props: MatchProps<T>);
```

Useful for when there are more than 2 mutual exclusive conditions. Can be used to do things like simple routing.

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
export function Index<T, U extends JSX.Element>(props: {
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
export function Suspense(props: {
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
export function Portal(props: {
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
// simple assignment
let myDiv;

// use onMount or createEffect to read after connected to DOM
onMount(() => console.log(myDiv));
<div ref={myDiv} />

// Or, callback function (called before connected to DOM)
<div ref={el => console.log(el)} />
```

Refs can also be used on Components. They still need to be attached on the otherside.

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

A helper that leverages `element.classList.toggle`. It takes an object whose keys are class names and assigns them when the resolved value is true.

```jsx
<div
  classList={{ active: state.active, editing: state.currentId === row.id }}
/>
```

## `style`

Solid's style helper works with either a string or with an object. Unlike React's version Solid uses `element.style.setProperty` under the hood. This means support for CSS vars, but it also means we use the lower, dash-case version of properties. This actually leads to better performance and consistency with SSR output.

```jsx
// string
<div style={`color: green; background-color: ${state.color}; height: ${state.height}px`} />

// object
<div style={{
  color: "green",
  "background-color": state.color,
  height: state.height + "px" }}
/>

// css variable
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
Since event handlers are called like any other function each time an event fires, there is no need for reactivity; simply shortcut your handler if desired.

```jsx
// if defined call it, otherwised don't.
<div onClick={() => props.handleClick?.()} />
```

Note that `onChange` and `onInput` work according to their native behavior. `onInput` will fire immediately after the value has changed; for `<input>` fields, `onChange` will only fire after the field loses focus.
## `on:___`/`oncapture:___`

For any other events, perhaps ones with unusual names, or ones you wish not to be delegated there are the `on` namespace events. This simply adds an event listener verbatim.

```jsx
<div on:Weird-Event={(e) => alert(e.detail)} />
```

## `use:___`

These are custom directives. In a sense this is just syntax sugar over ref but allows us to easily attach multiple directives to a single element. A directive is simply a function with the following signature:

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

Solid's compiler uses a simple heuristic for reactive wrapping and lazy evaluation of JSX expressions. Does it contain a function call, a property access, or JSX? If yes we wrap it in a getter when passed to components or in an effect if passed to native elements.

Knowing this we can reduce overhead of things we know will never change simply by accessing them outside of the JSX. A simple variable will never be wrapped. We can also tell the compiler not to wrap them by starting the expression with a comment decorator `/_ @once _/`.

```jsx
<MyComponent static={/*@once*/ state.wontUpdate} />
```

This also works on children.

```jsx
<MyComponent>{/*@once*/ state.wontUpdate}</MyComponent>
```
