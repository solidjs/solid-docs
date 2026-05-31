---
title: onMount
category: Lifecycle
order: 5
use_cases: >-
  initial setup, dom refs access, one-time initialization, component mounting,
  element manipulation after render
tags:
  - lifecycle
  - mounting
  - refs
  - dom
  - initialization
version: "1.0"
description: >-
  Register a function that runs once after the initial render of the current
  component or root.
---

`onMount` registers a function that runs once after the initial render for the current component or root.

## Import

```ts
import { onMount } from "solid-js";
```

## Type

```ts
function onMount(fn: () => void): void;
```

## Parameters

### `fn`

- **Type:** `() => void`
- **Required:** Yes

Non-tracking function executed once on mount.

## Return value

`onMount` does not return a value.

## Behavior

- On the client, `onMount` runs once after the initial render. It does not run during server rendering.
- `fn` does not track reactive dependencies.
- Internally, `onMount(fn)` is equivalent to `createEffect(() => untrack(fn))`.
- By the time `onMount` runs, refs have already been assigned.
- Returning a function from `fn` does not register cleanup. Use [`onCleanup`](/reference/lifecycle/on-cleanup) inside `onMount` when cleanup is needed.

:::note
"Mounted" in Solid refers to when a component is rendered within the reactive tree, not when it is physically inserted into the DOM.
If you store JSX in a variable before conditionally rendering it, `onMount` runs when that JSX is evaluated, even if the elements have not yet been added to the visible page.
Similarly, [`onCleanup`](/reference/lifecycle/on-cleanup) runs based on the reactive ownership tree rather than DOM removal.

For cases where you need to detect actual DOM insertion or removal, consider using a [`ref`](/concepts/refs) callback or the [Lifecycle primitives from solid-primitives](https://github.com/solidjs-community/solid-primitives/tree/main/packages/lifecycle).
:::

## Examples

### Access a ref after mount

```tsx
import { onMount } from "solid-js";

function MyComponent() {
	let ref: HTMLButtonElement;

	onMount(() => {
		ref.disabled = true;
	});

	return <button ref={ref}>Focus me!</button>;
}
```

### Run one-time browser setup

```tsx
import { onMount } from "solid-js";

function Example() {
	onMount(() => {
		// Browser-only code
		console.log(window.location.pathname);
	});

	return <div>Mounted</div>;
}
```

## Related

- [`onCleanup`](/reference/lifecycle/on-cleanup)
- [`createEffect`](/reference/basic-reactivity/create-effect)
- [`untrack`](/reference/reactive-utilities/untrack)
