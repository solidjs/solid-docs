---
title: from
category: Reactive Utilities
use_cases: >-
  rxjs interop, svelte stores integration, external observables, third-party
  state management, converting subscriptions to signals
tags:
  - interop
  - rxjs
  - observables
  - signals
  - integration
version: "1.0"
description: >-
  Convert an external producer or subscribable into a Solid accessor.
---

`from` creates an accessor from an external producer or subscribable source.

## Import

```ts
import { from } from "solid-js";
```

## Type

```ts
function from<T>(producer: Producer<T>, initialValue: T): () => T;
function from<T>(producer: Producer<T | undefined>): () => T | undefined;

type Producer<T> =
	| ((setter: Setter<T>) => () => void)
	| {
			subscribe: (
				fn: (value: T) => void
			) => (() => void) | { unsubscribe: () => void };
	  };
```

## Parameters

### `producer`

- **Type:** `Producer<T>` or `Producer<T | undefined>`
- **Required:** Yes

Producer function or subscribable object.

### `initialValue`

- **Type:** `T`
- **Required:** No

Initial value for the accessor.

## Return value

- **Type:** `() => T` or `() => T | undefined`

Returns an accessor backed by the external source.

## Behavior

- `from` subscribes to the producer immediately when it runs.
- A producer function receives a Solid setter and returns a cleanup function.
- A subscribable source must expose `subscribe()`, and that subscription may return either a cleanup function or an object with `unsubscribe()`.
- Emitted values are not deduplicated by equality.
- Cleanup is registered on the current Solid owner when one exists.
- When `from` runs without an owner, the subscription still starts but is not cleaned up automatically.
- When `initialValue` is omitted, the accessor can return `undefined`.

## Examples

### Create an accessor from a subscribable source

```tsx
import { from } from "solid-js";

function Clock() {
	const time = from(
		{
			subscribe(next) {
				const interval = setInterval(
					() => next(new Date().toLocaleTimeString()),
					1000
				);
				return () => clearInterval(interval);
			},
		},
		""
	);

	return <div>{time()}</div>;
}
```

### Create an accessor from a producer function

```tsx
import { from } from "solid-js";

function Counter() {
	const count = from((set) => {
		const interval = setInterval(() => {
			set((value = 0) => value + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, 0);

	return <div>{count()}</div>;
}
```

## Related

- [`observable`](/reference/reactive-utilities/observable)
