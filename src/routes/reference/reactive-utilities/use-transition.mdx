---
title: useTransition
category: Reactive Utilities
use_cases: >-
  async batching, loading states, suspense integration, concurrent updates, ui
  transitions
tags:
  - transitions
  - async
  - suspense
  - loading
  - batching
  - concurrent
version: "1.0"
description: >-
  Return a pending-state accessor and a function that starts a transition.
---

`useTransition` returns a pending-state accessor and a function that starts a transition.

## Import

```ts
import { useTransition } from "solid-js";
```

## Type

```ts
function useTransition(): [
	pending: () => boolean,
	start: (fn: () => void) => Promise<void>,
];
```

## Parameters

`useTransition` does not take any parameters.

## Return value

- **Type:** `[() => boolean, (fn: () => void) => Promise<void>]`

Returns a tuple containing:

- `pending`: an accessor that reports whether the transition is pending
- `start`: a function that starts a transition

## Behavior

- `start` is the same transition-starting function exposed by [`startTransition`](/reference/reactive-utilities/start-transition).
- On the client, `start` schedules its callback asynchronously in a microtask.
- `pending()` reflects whether that transition is still pending.
- Transition state integrates with Suspense and resource reads under Suspense boundaries.
- On the server, `pending()` is `false` and transitions run synchronously.

## Examples

### Basic usage

```tsx
import {
	Suspense,
	createResource,
	createSignal,
	useTransition,
} from "solid-js";

function Example() {
	const [userId, setUserId] = createSignal(1);
	const [user] = createResource(userId, async (id) => {
		const response = await fetch(`/api/users/${id}`);
		return response.json();
	});
	const [pending, start] = useTransition();

	return (
		<>
			<button
				onClick={async () => {
					await start(() => setUserId(2));
				}}
			>
				Load next user
			</button>
			<div>{pending() ? "Loading transition..." : "Ready"}</div>
			<Suspense fallback={<p>Loading user...</p>}>
				<pre>{JSON.stringify(user(), null, 2)}</pre>
			</Suspense>
		</>
	);
}
```

## Related

- [`startTransition`](/reference/reactive-utilities/start-transition)
- [`Suspense`](/reference/components/suspense)
