---
title: createSelector
category: Secondary Primitives
use_cases: >-
  selection states, active items, dropdown menus, tab navigation, list
  highlighting, performance optimization
tags:
  - reactivity
  - performance
  - selection
  - ui-state
  - optimization
version: "1.0"
description: >-
  Create a keyed boolean accessor that reports whether a key matches the current
  source value.
---

`createSelector` returns a keyed boolean accessor derived from a source accessor.

## Import

```ts
import { createSelector } from "solid-js";
```

## Type

```ts
type Accessor<T> = () => T;

function createSelector<T, U = T>(
	source: Accessor<T>,
	fn?: (key: U, value: T) => boolean,
	options?: { name?: string }
): (key: U) => boolean;
```

## Parameters

### `source`

- **Type:** `Accessor<T>`
- **Required:** Yes

Accessor used as the selection source.

### `fn`

- **Type:** `(key: U, value: T) => boolean`

Comparison function used to match a key against the current source value.

### `options`

#### `name`

- **Type:** `string`

Debug name used by development tooling.

## Return value

- **Type:** `(key: U) => boolean`

Returns an accessor function that reports whether the provided key matches the current source value. Each subscriber tracks only its own key.

## Behavior

- The returned function compares each key against the current source value. With the default comparison, matching uses strict equality.
- Solid tracks subscribers by key, so only subscribers whose key starts or stops matching need to update.
- On the server, `createSelector` compares each key directly against `source()` without keyed subscriber bookkeeping.

Compared with checking equality directly in every subscriber, `createSelector` keeps subscriptions keyed by the compared value.

## Examples

### Basic usage

```tsx
import { createSelector, createSignal, For } from "solid-js";

function Example(props) {
	const [selectedId, setSelectedId] = createSignal<number>();
	const isSelected = createSelector(selectedId);

	return (
		<For each={props.list}>
			{(item) => (
				<li
					classList={{ active: isSelected(item.id) }}
					onClick={() => setSelectedId(item.id)}
				>
					{item.name}
				</li>
			)}
		</For>
	);
}
```

## Related

- [`createMemo`](/reference/basic-reactivity/create-memo)
- [`<For>`](/reference/components/for)
