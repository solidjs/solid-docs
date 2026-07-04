---
title: createAsyncStore
use_cases: >-
  async stores, route data, reconciled data, nested data
tags:
  - async
  - stores
  - data
  - reconcile
version: "1.0"
description: >-
  createAsyncStore creates an accessor for promise-backed store data.
---

`createAsyncStore` is a wrapper around `createResource` that tracks a promise-returning function and returns the resolved value through a store-backed accessor.

## Import

```tsx
import { createAsyncStore } from "@solidjs/router";
```

## Type

```tsx
function createAsyncStore<T>(
	fn: (prev: T) => Promise<T>,
	options: {
		name?: string;
		initialValue: T;
		deferStream?: boolean;
		reconcile?: ReconcileOptions;
	}
): AccessorWithLatest<T>;

function createAsyncStore<T>(
	fn: (prev: T | undefined) => Promise<T>,
	options?: {
		name?: string;
		initialValue?: T;
		deferStream?: boolean;
		reconcile?: ReconcileOptions;
	}
): AccessorWithLatest<T | undefined>;
```

## Parameters

### `fn`

- **Type:** `(prev: T | undefined) => Promise<T>`
- **Required:** Yes

Promise-returning function used as the async resource fetcher.
The resolved value is stored in the returned store-backed accessor.
Synchronous reactive reads made while `fn` runs are tracked, causing the resource to rerun when those dependencies change.

### `options`

- **Type:** `{ name?: string; initialValue?: T; deferStream?: boolean; reconcile?: ReconcileOptions }`
- **Default:** `{}`
- **Required:** No

Options for the resource name, initial store value, server streaming, and store reconciliation.

#### `name`

- **Type:** `string`
- **Required:** No

Name used by the resource for development debugging.

#### `initialValue`

- **Type:** `T`
- **Required:** No

Initial store value returned by the accessor before the async function resolves.

#### `deferStream`

- **Type:** `boolean`
- **Default:** `false`
- **Required:** No

If `true`, [streaming](/solid-router/data-fetching/streaming) waits for this resource to resolve before flushing.

#### `reconcile`

- **Type:** `ReconcileOptions`
- **Required:** No

Options passed to [`reconcile`](/reference/store-utilities/reconcile).
These options control how resolved values are merged into the existing store.

## Return value

- **Type:** `AccessorWithLatest<T | undefined>`

Returns an accessor for the resolved store value.
Before the first resolution, the accessor returns `initialValue` when provided and `undefined` otherwise.

### `latest`

- **Type:** `T | undefined`

Getter that reads the `latest` value from the `createResource` result.

## Behavior

- Calls `createResource` with store-backed storage created by `createStore`.
- `fn` receives `unwrap(resource.latest)` when the resource has resolved, or `undefined` while unresolved.
- Initial store storage is created from `structuredClone(initialValue)`.
- Resolved values are cloned with `structuredClone` and merged with `reconcile`.
- The `reconcile` option is passed to [`reconcile`](/reference/store-utilities/reconcile) when store writes run.
- The returned accessor reads the current store-backed resource value.
- During hydration, `window.fetch` and `Promise` are temporarily replaced with mock implementations while `fn` runs.

## Examples

### With reactive arguments

```tsx
import { For, createSignal } from "solid-js";
import { createAsyncStore, query } from "@solidjs/router";

type Notification = {
	id: string;
	message: string;
	user: { name: string };
};

const getNotifications = query(async (unreadOnly: boolean) => {
	const response = await fetch(`/api/notifications?unread=${unreadOnly}`);
	return response.json() as Promise<Notification[]>;
}, "notifications");

function Notifications() {
	const [unreadOnly, setUnreadOnly] = createSignal(false);
	const notifications = createAsyncStore(() => getNotifications(unreadOnly()), {
		initialValue: [],
	});

	return (
		<>
			<button onClick={() => setUnreadOnly((value) => !value)}>
				Toggle unread
			</button>
			<ul>
				<For each={notifications()}>
					{(notification) => (
						<li>
							<div>{notification.message}</div>
							<div>{notification.user.name}</div>
						</li>
					)}
				</For>
			</ul>
		</>
	);
}
```

## Related

- [`createAsync`](/solid-router/reference/data-apis/create-async)
- [`reconcile`](/reference/store-utilities/reconcile)
