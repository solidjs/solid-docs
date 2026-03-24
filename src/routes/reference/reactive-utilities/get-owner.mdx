---
title: getOwner
category: Reactive Utilities
use_cases: >-
  advanced tracking control, custom cleanup logic, understanding component
  hierarchy, debugging ownership chains, manual scope management
tags:
  - ownership
  - tracking
  - scopes
  - cleanup
  - debugging
version: "1.0"
description: >-
  Return the owner for the currently executing reactive scope.
---

`getOwner` returns the owner for the currently executing reactive scope.

## Import

```ts
import { getOwner } from "solid-js";
```

## Type

```ts
type Owner = unknown;

function getOwner(): Owner | null;
```

The `Owner` interface is public, but its concrete shape is mostly useful for advanced interop such as [`runWithOwner`](/reference/reactive-utilities/run-with-owner).

## Parameters

`getOwner` does not take any parameters.

## Return value

- **Type:** `Owner | null`

Returns the current owner or `null` when no owner is active.

## Behavior

- `getOwner` returns the current owner and does not create or modify ownership.
- Owners determine cleanup and context lookup for descendant computations.
- A computation created inside the current scope becomes part of the current owner tree unless ownership is overridden.
- Component functions run under an owner created for that subtree.
- Calling `getOwner` inside component code returns the owner responsible for rendering and disposing that component subtree.
- Turning off tracking with [`untrack`](/reference/reactive-utilities/untrack) does not create a new owner.

## Examples

### Capture an owner for later use

```tsx
import { getOwner, runWithOwner } from "solid-js";

function Example() {
	const owner = getOwner();

	queueMicrotask(() => {
		if (owner) {
			runWithOwner(owner, () => {
				console.log("owner restored");
			});
		}
	});

	return null;
}
```

## Related

- [`runWithOwner`](/reference/reactive-utilities/run-with-owner)
- [`onCleanup`](/reference/lifecycle/on-cleanup)
- [`untrack`](/reference/reactive-utilities/untrack)
