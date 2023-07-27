import { Aside } from "~/components/configurable/Aside";

<Title>Store Utilities</Title>

## produce

```ts
function produce<T>(
  fn: (state: T) => void
): (
  state: T extends NotWrappable ? T : Store<T>
) => T extends NotWrappable ? T : Store<T>;
```

An [Immer](https://immerjs.github.io/immer/) inspired API for Solid's Store objects that allows for localized mutation.

```ts
import { produce } from "solid-js/store";

const [state, setState] = createStore({
  user: {
    name: "John",
    age: 30,
  },
  list: ["book", "pen"],
});

setState(
  produce((state) => {
    state.user.name = "Jane";
    state.list.push("pencil");
  })
);
```

## reconcile

```ts
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

The key option is used when available to match items. By default the merge option false does referential checks where possible to determine equality and replaces where items are not referentially equal. merge true pushes all diffing to the leaves and effectively morphs the previous data to the new value.

```ts
// subscribing to an observable
const unsubscribe = store.subscribe(({ todos }) => (
  setState('todos', reconcile(todos)));
);
onCleanup(() => unsubscribe());
```

##### Options

| Option | Type    | Default | Description                        |
| ------ | ------- | ------- | ---------------------------------- |
| key    | string  | "id"    | The key to use for matching items. |
| merge  | boolean | false   | Whether to merge or replace items. |

## unwrap

```ts
import { unwrap } from "solid-js/store";

function unwrap(store: Store<T>): T;
```

Returns the underlying data in the store without a proxy.

## createMutable

```ts
function createMutable<T extends StoreNode>(state: T | Store<T>): Store<T>;
```

Creates a new mutable Store proxy object. Stores only trigger updates on values changing. Tracking is done by intercepting property access and automatically tracks deep nesting via proxy.

Useful for integrating external systems or as a compatibility layer with MobX/Vue.

<Aside>
  Note: A mutable state can be passed around and mutated anywhere, which can
  make it harder to follow and easier to break unidirectional flow. It is
  generally recommended to use createStore instead. The produce modifier can
  give many of the same benefits without any of the downsides.
</Aside>

```ts
import { createMutable } from "solid-js/store";

const state = createMutable({
  someValue: 0,
  list: [],
});

// read value
state.someValue;

// set value
state.someValue = 5;

state.list.push(anotherValue);
```

Mutables support setters along with getters.

```ts
const user = createMutable({
  firstName: "John",
  lastName: "Smith",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set setFullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  },
});
```

## modifyMutable

**New in v1.4.0**

```ts
function modifyMutable<T>(mutable: T, modifier: (state: T) => T): void;
```

This helper function simplifies making multiple changes to a mutable Store (as returned by [createMutable](#createMutable)) in a single [batch](/references/api-reference/reactive-utilities/batch), so that dependant computations update just once instead of once per update. The first argument is the mutable Store to modify, and the second argument is a Store modifier such as those returned by [reconcile]('#reconcile') or [produce](#produce). (If you pass in your own modifier function, beware that its argument is an unwrapped version of the Store.)

For example, suppose we have a UI depending on multiple fields of a mutable:

```tsx
import { createMutable } from "solid-js/store";

const state = createMutable({
  user: {
    firstName: "John",
    lastName: "Smith",
  },
});

<h1>Hello {state.user.firstName + " " + state.user.lastName}</h1>;
```

Modifying n fields in sequence will cause the UI to update n times:

```tsx
state.user.firstName = "Jane";
state.user.lastName = "Doe";
```

To trigger just a single update, we could modify the fields in a `batch`:

```tsx
import { batch } from "solid-js";

batch(() => {
  state.user.firstName = "Jane";
  state.user.lastName = "Doe";
});
```

`modifyMutable` combined with reconcile or produce provides two alternate ways to do similar things:

```tsx
import { modifyMutable, reconcile } from "solid-js/store";

// Replace state.user with the specified object (deleting any other fields)
modifyMutable(
  state.user,
  reconcile({
    firstName: "Jane",
    lastName: "Doe",
  })
);
```

```tsx
import { modifyMutable, produce } from "solid-js/store";

// Modify two fields in batch, triggering just one update
modifyMutable(
  state,
  produce((state) => {
    state.user.firstName = "Jane";
    state.user.lastName = "Doe";
  })
);
```

