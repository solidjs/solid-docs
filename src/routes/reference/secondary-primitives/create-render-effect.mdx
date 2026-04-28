---
title: createRenderEffect
category: Secondary Primitives
use_cases: >-
  dom manipulation during render, immediate effects, rendering phase logic,
  ref-independent effects, custom rendering
tags:
  - rendering
  - effects
  - dom
  - immediate
  - refs
  - lifecycle
version: "1.0"
description: >-
  Create a reactive computation that runs immediately during the render phase.
---

`createRenderEffect` creates a reactive computation that runs during the render phase as DOM is created and updated.
It tracks reactive reads inside the provided function and re-runs whenever those dependencies change.

## Execution Timing

### Initial Run

- A render effect runs **synchronously during the current rendering phase**, while DOM elements are being created or updated.
- It **runs before elements are mounted** to the DOM.
- **[Refs](/concepts/refs) are not set** during this initial run.

### Subsequent Runs

- After the initial render, the render effect **re-runs whenever any of its tracked dependencies change**.
- When multiple dependencies change within the same batch, the render effect **runs once per batch**.

### Server-Side Rendering

- During SSR, render effects **run once on the server**, since they are part of the synchronous rendering phase.
- On the client, an initial run still occurs during the client rendering phase.
- After hydration, subsequent runs occur on the client when dependencies change.

## Import

```ts
import { createRenderEffect } from "solid-js";
```

## Type

```ts
function createRenderEffect<Next>(
	fn: EffectFunction<undefined | NoInfer<Next>, Next>
): void;
function createRenderEffect<Next, Init = Next>(
	fn: EffectFunction<Init | Next, Next>,
	value: Init,
	options?: { name?: string }
): void;
function createRenderEffect<Next, Init>(
	fn: EffectFunction<Init | Next, Next>,
	value?: Init,
	options?: { name?: string }
): void;
```

## Parameters

### `fn`

- **Type:** `EffectFunction<undefined | NoInfer<Next>, Next> | EffectFunction<Init | Next, Next>`
- **Required:** Yes

A function to be executed as the render effect.

It receives the value returned from the previous run, or the initial `value` during the first run.
The value returned by `fn` is passed to the next run.

### `value`

- **Type:** `Init`
- **Required:** No

The initial value passed to `fn` during its first run.

### `options`

- **Type:** `{ name?: string }`
- **Required:** No

An optional configuration object with the following properties:

#### `name`

- **Type:** `string`
- **Required:** No

A name for the render effect, which can be useful for identification in debugging tools like the [Solid Debugger](https://github.com/thetarnav/solid-devtools).

## Return value

`createRenderEffect` does not return a value.

## Behavior

- `createRenderEffect` runs immediately when it is created.
- Its initial run happens during the render phase, before mounted DOM is connected and before refs are assigned.
- Later runs happen when tracked dependencies change.
- Most application code should use [`createEffect`](/reference/basic-reactivity/create-effect). `createRenderEffect` is mainly for render-phase work where that timing is required.

## Examples

### Ref timing

```tsx
import { createRenderEffect, onMount } from "solid-js";

function Example() {
	let element: HTMLDivElement | undefined;

	createRenderEffect(() => {
		console.log("render effect", element); // undefined on the initial run
	});

	onMount(() => {
		console.log("mounted", element); // <div>
	});

	return <div ref={element}>Hello</div>;
}
```

## Related

- [`createEffect`](/reference/basic-reactivity/create-effect)
- [`onCleanup`](/reference/lifecycle/on-cleanup)
