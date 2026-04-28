---
title: <Index>
category: Components
use_cases: >-
  non-keyed lists, index-based rendering, fixed positions, changing values,
  simple lists
tags:
  - lists
  - iteration
  - components
  - arrays
  - index
version: "1.0"
description: >-
  Render a list by index with a child function that receives an item accessor
  and a numeric index.
---

`<Index>` renders a list by index.

## Import

```ts
import { Index } from "solid-js";
```

## Type

```ts
type Accessor<T> = () => T;

function Index<T extends readonly any[], U extends JSX.Element>(props: {
	each: T | undefined | null | false;
	fallback?: JSX.Element;
	children: (item: Accessor<T[number]>, index: number) => U;
}): JSX.Element;
```

## Props

### `each`

- **Type:** `T | undefined | null | false`

Source list.

### `fallback`

- **Type:** `JSX.Element`

Content rendered when `each` is an empty array, `undefined`, `null`, or `false`.

### `children`

- **Type:** `(item: Accessor<T[number]>, index: number) => U`

Child function. It receives an accessor for the item at that index and the index number.

## Return value

- **Type:** `JSX.Element`

## Behavior

- `<Index>` maps items by index rather than by value identity.
- The `item` argument is an accessor.
- The `index` argument is a number.
- Updating a value at the same index updates the corresponding rendered item.
- When the array is reordered, rendered positions stay tied to indexes, and `item()` updates to the current value at that index.
- `<Index>` uses [`indexArray`](/reference/reactive-utilities/index-array) internally.

## Examples

### Basic usage

```tsx
const items = ["A", "B", "C"];

<Index each={items} fallback={<div>No items</div>}>
	{(item) => <div>{item()}</div>}
</Index>;
```

### Access the index

```tsx
const items = ["A", "B", "C"];

<Index each={items}>
	{(item, index) => (
		<div>
			#{index} {item()}
		</div>
	)}
</Index>;
```

## Related

- [`<For>`](/reference/components/for)
- [`indexArray`](/reference/reactive-utilities/index-array)
