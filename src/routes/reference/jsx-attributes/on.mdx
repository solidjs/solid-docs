---
title: "on:*"
category: JSX Attributes
order: 4
use_cases: >-
  direct event listeners, custom event names, event listener options
tags:
  - events
  - listeners
  - dom
  - capture
  - passive
version: "1.0"
description: >-
  Attach an event listener directly to an element with `addEventListener`.
---

`on:*` attaches an event listener directly to an element with `addEventListener`.

## Syntax

```tsx
<div on:wheel={handler} />
```

## Value

- **Type:** event handler function or object with `handleEvent` and optional `AddEventListenerOptions`

Listener passed to `addEventListener`.

## Behavior

- `on:name={handler}` attaches a listener for the event named `name`.
- The listener is attached directly to the element instead of using Solid's delegated event system.
- Event names keep the text after `on:` exactly as written.
- Use `on:*` when you need exact event casing, such as case-sensitive custom events.
- When the value changes, Solid removes the previous direct listener and adds the new one.
- Listener options such as `once`, `passive`, `capture`, and `signal` can be provided by passing an object that implements `handleEvent`.
- `oncapture:*` remains available as a deprecated capture-specific form.

## Examples

### Basic usage

```tsx
const [message, setMessage] = createSignal("Waiting");
let el;

<>
	<button
		onClick={() =>
			el.dispatchEvent(new CustomEvent("MyEvent", { detail: "Hello" }))
		}
	>
		Dispatch event
	</button>

	<div on:MyEvent={(e) => setMessage(e.detail)} ref={el} />
	<p>{message()}</p>
</>;
```

### Listener options

```tsx
const [count, setCount] = createSignal(0);

const handler = {
	handleEvent() {
		setCount((count) => count + 1);
	},
	once: true,
};

<>
	<button on:click={handler}>Click me</button>
	<p>Clicked {count()} time(s)</p>
</>;
```

:::note
The object-listener form was added in Solid 1.9.0. It is useful when you need options such as `once`, `passive`, `capture`, or `signal`.
:::

## Related

- [`on*`](/reference/jsx-attributes/on_)
