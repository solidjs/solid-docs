---
title: query
use_cases: >-
  data queries, cache keys, route data, revalidation
tags:
  - query
  - cache
  - data
  - revalidation
version: "1.0"
description: >-
  query wraps a function with router cache metadata.
---

`query` caches the result of a function call by name and arguments.
Calls with the same name and serialized arguments share the same cache entry.

## Import

```tsx
import { query } from "@solidjs/router";
```

## Type

```tsx
type CachedFunction<T extends (...args: any) => any> = T extends (
	...args: infer A
) => infer R
	? ((
			...args: A
		) => R extends Promise<infer P>
			? Promise<NarrowResponse<P>>
			: NarrowResponse<R>) & {
			keyFor: (...args: A) => string;
			key: string;
		}
	: never;

function query<T extends (...args: any) => any>(
	fn: T,
	name: string
): CachedFunction<T>;

namespace query {
	function get(key: string): any;
	function set<T>(
		key: string,
		value: T extends Promise<any> ? never : T
	): void;
	function delete(key: string): boolean;
	function clear(): void;
}
```

## Parameters

### `fn`

- **Type:** `T extends (...args: any) => any`
- **Required:** Yes

Function whose result is cached.
Arguments passed to the wrapped function are included in the cache key.
Arguments should serialize consistently with `JSON.stringify`.

### `name`

- **Type:** `string`
- **Required:** Yes

Base key combined with the serialized argument list.
Functions with the same `name` and serialized arguments share a cache entry.

## Return value

`query` returns a function with the same call signature as `fn`.
The returned function has the following properties:

### `key`

- **Type:** `string`

Base key for the query.

### `keyFor`

- **Type:** `(...args: Parameters<T>) => string`

Returns the cache key for a specific argument list.

## Static methods

The `query` namespace has methods for reading and mutating the active cache.
Pass a cache key from a query function's `key` or `keyFor` property.

### `get`

- **Type:** `(key: string) => any`

Returns the resolved value for an existing cache entry.

### `set`

- **Type:** `<T>(key: string, value: T extends Promise<any> ? never : T) => void`

Stores a resolved, non-promise value for `key`.

### `delete`

- **Type:** `(key: string) => boolean`

Deletes the cache entry for `key`.

### `clear`

- **Type:** `() => void`

Clears the active cache.

## Behavior

### Cache keys

- Cache keys are built from `name` plus the serialized argument list.
- Argument serialization uses `JSON.stringify` and sorts keys for plain objects.
- When `fn` has a `GET` property, `fn.GET` is wrapped.

### Cache reuse

- Preloaded route data is reused for `5000` milliseconds when a later call has the same cache key.
- Active subscriptions keep matching cache entries reusable while subscribed.
- Native history navigation reuses matching cache entries instead of calling `fn` again.
- During server rendering, repeated calls with the same cache key reuse the same request-scoped cache entry.
- During hydration, a matching serialized value from Solid's shared config is loaded instead of calling `fn`.

### Cache storage

- During server rendering, cache entries are stored on the request event router cache.
- On the client, cache entries are stored in a module-level map.
- Client cache entries with no active subscribers can be deleted after `180000` milliseconds.
- Static methods read or mutate the active cache.

### Response handling

- Returned `Response` headers are copied to the request event response during server rendering.
- Returned `Response` objects with a `Location` header trigger navigation on the client or set a `302` response status during server rendering.

## Examples

### Basic usage

```tsx
import { query } from "@solidjs/router";

const getUserProfile = query(async (userId: string) => {
	const response = await fetch(`/api/users/${encodeURIComponent(userId)}`);
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json?.message ?? "Failed to load user profile.");
	}

	return json as { name: string };
}, "userProfile");

const key = getUserProfile.keyFor("123");
```

### Reading and writing cache entries

```tsx
const key = getUserProfile.keyFor("123");

query.set(key, { name: "Ada" });
const cached = query.get(key);

query.delete(key);
```

## Related

- [`createAsync`](/solid-router/reference/data-apis/create-async)
- [`revalidate`](/solid-router/reference/data-apis/revalidate)
