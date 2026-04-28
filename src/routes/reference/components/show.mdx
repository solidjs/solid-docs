---
title: <Show>
category: Components
order: 5
use_cases: >-
  conditional rendering, toggling ui, feature flags, loading states, user
  permissions, responsive design
tags:
  - conditional
  - rendering
  - components
  - control-flow
  - ui
  - toggle
version: "1.0"
description: >-
  Render children when a condition is truthy, with optional fallback content
  and keyed behavior.
---

`<Show>` renders its children when `when` is truthy and renders `fallback` otherwise.

## Import

```ts
import { Show } from "solid-js";
```

## Type

```ts
type Accessor<T> = () => T;

function Show<T>(props: {
	when: T | undefined | null | false;
	keyed?: false;
	fallback?: JSX.Element;
	children: JSX.Element | ((item: Accessor<NonNullable<T>>) => JSX.Element);
}): JSX.Element;

function Show<T>(props: {
	when: T | undefined | null | false;
	keyed: true;
	fallback?: JSX.Element;
	children: JSX.Element | ((item: NonNullable<T>) => JSX.Element);
}): JSX.Element;
```

## Props

### `when`

- **Type:** `T | undefined | null | false`

Condition value that determines whether the children are rendered.

### `keyed`

- **Type:** `boolean`

Controls whether function children receive the current value directly instead of an accessor.

### `fallback`

- **Type:** `JSX.Element`

Content rendered when `when` is falsy.

### `children`

- **Type:** `JSX.Element | ((item: Accessor<NonNullable<T>>) => JSX.Element) | ((item: NonNullable<T>) => JSX.Element)`

Content rendered when `when` is truthy.

## Return value

- **Type:** `JSX.Element`

Returns the rendered children or `fallback` content.

## Behavior

- With `keyed` omitted or `false`, `<Show>` updates only when the truthiness of `when` changes. Replacing one truthy value with another truthy value does not recreate the child block, and function children receive an accessor that can only be read while the condition remains truthy.
- With `keyed={true}`, changes to the `when` value trigger a new render even when the value remains truthy, and function children receive the value directly.
- Function children are wrapped in [`untrack`](/reference/reactive-utilities/untrack).

## Examples

### Basic usage

```tsx
const loading = () => false;

<Show when={!loading()} fallback={<div>Loading...</div>}>
	<div>Loaded</div>
</Show>;
```

### Function child

```tsx
const user = () => ({ name: "Ada" });

<Show when={user()}>{(user) => <div>{user().name}</div>}</Show>;
```

### Keyed function child

```tsx
const user = () => ({ name: "Ada" });

<Show when={user()} keyed>
	{(user) => <div>{user.name}</div>}
</Show>;
```

## Related

- [`untrack`](/reference/reactive-utilities/untrack)
- [`<Switch> / <Match>`](/reference/components/switch-and-match)
