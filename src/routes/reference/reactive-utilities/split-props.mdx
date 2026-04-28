---
title: splitProps
category: Reactive Utilities
use_cases: >-
  prop forwarding, component composition, prop separation, splitting props into
  multiple groups
tags:
  - props
  - components
  - composition
  - destructuring
  - reactive
version: "1.0"
description: >-
  Split a reactive props object into multiple reactive subsets and a remainder
  object.
---

`splitProps` partitions a props object by key groups and returns a reactive object for each group plus a final object containing the remaining keys.

## Import

```ts
import { splitProps } from "solid-js";
```

## Type

```ts
function splitProps<
	T extends Record<any, any>,
	K extends [readonly (keyof T)[], ...(readonly (keyof T)[])[]],
>(props: T, ...keys: K): SplitProps<T, K>;
```

## Parameters

### `props`

- **Type:** `T`

Source props object.

### `keys`

- **Type:** `(readonly (keyof T)[])[]`

Arrays of keys that determine each returned subset.

## Return value

- **Type:** `SplitProps<T, typeof keys>`

Returns a tuple of reactive subsets followed by a reactive remainder object.

## Behavior

- Each returned object preserves reactive property access.
- A key is assigned to the first matching group only.
- The last returned object contains keys not included in the provided key arrays.
- When the source props object is proxy-backed, the returned objects use proxy-backed property access.
- `splitProps` separates props into groups without destructuring them into non-reactive locals.

## Examples

### Basic usage

```tsx
import { splitProps } from "solid-js";

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

### Split multiple groups

```tsx
import { splitProps } from "solid-js";

function MyComponent(props) {
	const [vowels, consonants, leftovers] = splitProps(
		props,
		["a", "e"],
		["b", "c", "d"]
	);

	return (
		<Child vowels={vowels} consonants={consonants} leftovers={leftovers} />
	);
}
```

## Related

- [`mergeProps`](/reference/reactive-utilities/merge-props)
