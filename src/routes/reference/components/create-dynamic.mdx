---
title: createDynamic
use_cases: >-
  dynamic components, runtime component selection, polymorphic components,
  lower-level rendering helpers, library components
tags:
  - dynamic
  - components
  - jsx
  - polymorphic
  - rendering
version: "1.0"
description: >-
  Render a component or intrinsic element selected at runtime from an accessor.
---

`createDynamic` renders the value returned by its `component` accessor as either a custom component or an intrinsic element.

## Import

```ts
import { createDynamic } from "solid-js/web";
```

## Type

```ts
type ValidComponent =
	| keyof JSX.IntrinsicElements
	| ((props: any) => JSX.Element);

function createDynamic<T extends ValidComponent>(
	component: () => T | undefined,
	props: ComponentProps<T>
): JSX.Element;
```

## Parameters

### `component`

- **Type:** `() => T | undefined`

Accessor that returns the component or intrinsic element to render.

### `props`

- **Type:** props accepted by the rendered component or element

Props passed to the rendered component or element.

## Return value

- **Type:** `JSX.Element`

Returns the rendered component or element.

## Behavior

- If `component()` is `undefined`, nothing is rendered.

## Example

```tsx
import { createSignal } from "solid-js";

const views = {
	red: (props: { label: string }) => (
		<p style={{ color: "red" }}>{props.label}</p>
	),
	blue: (props: { label: string }) => (
		<p style={{ color: "blue" }}>{props.label}</p>
	),
};

function App() {
	const [selected, setSelected] = createSignal<keyof typeof views>("red");

	return (
		<>
			<button onClick={() => setSelected("red")}>Red</button>
			<button onClick={() => setSelected("blue")}>Blue</button>

			{createDynamic(() => views[selected()], { label: "Selected view" })}
		</>
	);
}
```

## Related

- [`<Dynamic>`](/reference/components/dynamic)
