---
title: createAsync
use_cases: >-
  async data, resources, suspense, route data
tags:
  - async
  - data
  - resource
  - suspense
version: "1.0"
description: >-
  createAsync creates an accessor for promise-backed data.
---

`createAsync` is a wrapper around `createResource` that tracks a promise-returning function and returns the resolved value through an accessor with a `latest` property.

## Import

```tsx
import { createAsync } from "@solidjs/router";
```

## Type

```tsx
type AccessorWithLatest<T> = {
	(): T;
	latest: T;
};

function createAsync<T>(
	fn: (prev: T) => Promise<T>,
	options: {
		name?: string;
		initialValue: T;
		deferStream?: boolean;
	}
): AccessorWithLatest<T>;

function createAsync<T>(
	fn: (prev: T | undefined) => Promise<T>,
	options?: {
		name?: string;
		initialValue?: T;
		deferStream?: boolean;
	}
): AccessorWithLatest<T | undefined>;
```

## Parameters

### `fn`

- **Type:** `(prev: T | undefined) => Promise<T>`
- **Required:** Yes

Promise-returning function used as the async resource fetcher.
The resolved value is returned by the accessor.
Synchronous reactive reads made while `fn` runs are tracked, causing the resource to rerun when those dependencies change.

### `options`

- **Type:** `{ name?: string; initialValue?: T; deferStream?: boolean }`
- **Required:** No

Options for the resource name, initial value, and server streaming.

#### `name`

- **Type:** `string`
- **Required:** No

Name used by the resource for development debugging.

#### `initialValue`

- **Type:** `T`
- **Required:** No

Initial value returned by the accessor before the async function resolves.

#### `deferStream`

- **Type:** `boolean`
- **Default:** `false`
- **Required:** No

When `true`, [streaming](/solid-router/data-fetching/streaming) waits for this resource to resolve before flushing.

## Return value

- **Type:** `AccessorWithLatest<T | undefined>`

Returns an accessor for the resolved value.
Before the first resolution, the accessor returns `initialValue` when provided and `undefined` otherwise.

### `latest`

- **Type:** `T | undefined`

Getter that reads the `latest` value from the `createResource` result.

## Behavior

- Calls `createResource` internally.
- `fn` receives the previous latest value when the resource has resolved, or `undefined` while unresolved.
- The previous-value read is wrapped in `untrack`.
- The returned accessor reads the current resource value, and `latest` reads `resource.latest`.
- During hydration, `window.fetch` and `Promise` are temporarily replaced with mock implementations while `fn` runs.

## Examples

### Basic usage

```tsx
import { createAsync, query } from "@solidjs/router";

const getCurrentUser = query(async () => {
	const response = await fetch("/api/current-user");
	return response.json() as Promise<{ name: string }>;
}, "currentUser");

function UserProfile() {
	const user = createAsync(() => getCurrentUser());

	return <div>{user()?.name}</div>;
}
```

### With parameter

```tsx
import { createAsync, query } from "@solidjs/router";

type Invoice = {
	number: string;
	total: number;
};

const getInvoice = query(async (invoiceId: string) => {
	const response = await fetch(`/api/invoices/${invoiceId}`);
	return response.json() as Promise<Invoice>;
}, "invoice");

function InvoiceDetails(props: { invoiceId: string }) {
	const invoice = createAsync(() => getInvoice(props.invoiceId));

	return (
		<div>
			<h2>Invoice #{invoice()?.number}</h2>
			<p>Total: ${invoice()?.total}</p>
		</div>
	);
}
```

### With Suspense and ErrorBoundary

```tsx
import { ErrorBoundary, For, Suspense } from "solid-js";
import { createAsync, query } from "@solidjs/router";

type Recipe = {
	name: string;
	time: string;
};

const getRecipes = query(async () => {
	const response = await fetch("/api/recipes");
	return response.json() as Promise<Recipe[]>;
}, "recipes");

function Recipes() {
	const recipes = createAsync(() => getRecipes());

	return (
		<ErrorBoundary fallback={<p>Couldn't fetch any recipes.</p>}>
			<Suspense fallback={<p>Fetching recipes...</p>}>
				<For each={recipes()}>
					{(recipe) => (
						<div>
							<h3>{recipe.name}</h3>
							<p>Cook time: {recipe.time}</p>
						</div>
					)}
				</For>
			</Suspense>
		</ErrorBoundary>
	);
}
```

## Related

- [`query`](/solid-router/reference/data-apis/query)
- [`createAsyncStore`](/solid-router/reference/data-apis/create-async-store)
- [`<Suspense>`](/reference/components/suspense)
- [`<ErrorBoundary>`](/reference/components/error-boundary)
