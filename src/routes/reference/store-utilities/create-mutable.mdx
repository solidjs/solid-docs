---
title: createMutable
category: Store Utilities
use_cases: >-
  mutable proxy state, interop with mutable systems, object mutation through a
  store proxy
tags:
  - store
  - mutable
  - proxy
  - state
version: "1.0"
description: >-
  Create a mutable store proxy.
---

`createMutable` creates a mutable store proxy.

## Import

```ts
import { createMutable } from "solid-js/store";
```

## Type

```ts
function createMutable<T extends StoreNode>(
	state: T,
	options?: { name?: string }
): T;
```

## Parameters

### `state`

- **Type:** `T`

Initial mutable state.

### `options`

#### `name`

- **Type:** `string`

Debug name used by development tooling.

## Return value

- **Type:** `T`

Mutable store proxy.

## Behavior

- `createMutable` creates mutable shared state through a reactive proxy. Property reads and writes go through that proxy, and nested property access is reactive.
- Writes, deletes, and array mutator methods are batched through the proxy while updating the store in place.
- `createMutable` exposes reads and writes through the same proxy instead of separating them into a getter and setter.
- Getters and setters defined on the initial object remain available on the mutable store.

## Examples

### Basic usage

```tsx
import { createMutable } from "solid-js/store";

const state = createMutable({
	someValue: 0,
	list: [],
});

state.someValue = 5;
state.list.push("item");
```

### Getter and setter

```tsx
import { createMutable } from "solid-js/store";

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

user.fullName = "Jane Doe";
```

## Related

- [`modifyMutable`](/reference/store-utilities/modify-mutable)
- [`createStore`](/reference/store-utilities/create-store)
