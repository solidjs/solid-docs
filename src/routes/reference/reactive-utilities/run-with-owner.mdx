---
title: runWithOwner
category: Reactive Utilities
order: 5
use_cases: >-
  async operations, manual cleanup, context access, ownership control,
  setTimeout callbacks, lifecycle management
tags:
  - async
  - ownership
  - context
  - cleanup
  - lifecycle
  - effects
version: "1.0"
description: >-
  Execute a function under the provided owner.
---

`runWithOwner` executes a function under the provided owner.

## Import

```ts
import { runWithOwner } from "solid-js";
```

## Type

```ts
type Owner = unknown;

function runWithOwner<T>(owner: Owner | null, fn: () => T): T | undefined;
```

## Parameters

### `owner`

- **Type:** `Owner | null`
- **Required:** Yes

Owner used while executing `fn`.

### `fn`

- **Type:** `() => T`
- **Required:** Yes

Function executed under `owner`.

## Return value

- **Type:** `T | undefined`

Returns the value produced by `fn`, or `undefined` when an error is routed through Solid's error handling.

## Behavior

- During the synchronous execution of `fn`, `runWithOwner` restores the provided owner for cleanup, context lookup, and descendant computations created inside `fn`.
- `runWithOwner` does not restore dependency tracking because the current tracking listener is cleared while `fn` runs.
- Code after the first `await` in an `async` function runs without the restored owner or reactive dependency tracking.

## Examples

### Restore an owner in a callback

```tsx
import { createEffect, getOwner, runWithOwner } from "solid-js";

function Example() {
	const owner = getOwner();

	queueMicrotask(() => {
		if (owner) {
			runWithOwner(owner, () => {
				createEffect(() => {
					console.log("effect created under the captured owner");
				});
			});
		}
	});

	return null;
}
```

## Related

- [`getOwner`](/reference/reactive-utilities/get-owner)
- [`onCleanup`](/reference/lifecycle/on-cleanup)
