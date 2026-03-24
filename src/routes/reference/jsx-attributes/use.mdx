---
title: "use:*"
category: JSX Attributes
order: 5
use_cases: >-
  reusable DOM behavior, directives, element setup helpers
tags:
  - directives
  - dom
  - jsx
version: "1.0"
description: >-
  Attach a directive function to a native element with `use:*`.
---

`use:*` attaches a directive function to a native element.

## Syntax

```tsx
<input use:model={[value, setValue]} />
```

## Type

```ts
type Accessor<T> = () => T;

function directive(element: Element, accessor?: Accessor<any>): void;
```

## Value

- **Type:** directive argument

The directive reads the value through an accessor. Without an explicit value, the accessor returns `true`.

## Behavior

- `use:name={value}` passes the element and an accessor for `value` to the directive.
- Without an explicit value, the accessor returns `true`.
- The directive runs during rendering in the current owner, before the element is connected to the DOM, so it can create effects and register cleanup.
- `use:*` works only on native elements, including custom elements, and is not forwarded through user-defined components.

## Examples

### Basic usage

```tsx
function model(element, value) {
	const [field, setField] = value();
	const onInput = ({ currentTarget }) => setField(currentTarget.value);

	createRenderEffect(() => (element.value = field()));
	element.addEventListener("input", onInput);
	onCleanup(() => element.removeEventListener("input", onInput));
}

const [name, setName] = createSignal("");

<input type="text" use:model={[name, setName]} />;
```

:::note
When using TypeScript, custom directives may require extending Solid's JSX directive typings:

```ts
declare module "solid-js" {
	namespace JSX {
		interface Directives {
			model: [Accessor<string>, Setter<string>];
		}
	}
}
```

:::
