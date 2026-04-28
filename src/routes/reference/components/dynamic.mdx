---
title: <Dynamic>
category: Components
order: 5
use_cases: >-
  dynamic components, runtime component selection, polymorphic components,
  rendering custom components or intrinsic elements
tags:
  - dynamic
  - components
  - jsx
  - polymorphic
  - rendering
version: "1.0"
description: >-
  Render a component or intrinsic element selected at runtime.
---

`<Dynamic>` renders the value of its `component` prop as either a custom component or an intrinsic element.

## Import

```ts
import { Dynamic } from "solid-js/web";
```

## Type

```ts
type ValidComponent =
	| keyof JSX.IntrinsicElements
	| ((props: any) => JSX.Element);

type DynamicProps<T extends ValidComponent, P = ComponentProps<T>> = {
	[K in keyof P]: P[K];
} & {
	component: T | undefined;
};

function Dynamic<T extends ValidComponent>(props: DynamicProps<T>): JSX.Element;
```

## Props

### `component`

- **Type:** `T | undefined`

Component or intrinsic element to render.

### remaining props

- **Type:** props accepted by the rendered component or element

Props forwarded to the rendered value of `component`.

## Return value

- **Type:** `JSX.Element`

Returns the rendered component or element.

## Behavior

- When `component` is `undefined`, nothing is rendered.

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

			<Dynamic component={views[selected()]} label="Selected view" />
		</>
	);
}
```

## Related

- [`createDynamic`](/reference/components/create-dynamic)
