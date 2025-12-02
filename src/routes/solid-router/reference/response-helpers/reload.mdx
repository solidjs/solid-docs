---
title: reload
use_cases: >-
  data refresh, cache invalidation, after mutations, updating queries, form
  submissions, data synchronization
tags:
  - reload
  - cache
  - revalidation
  - mutations
  - queries
  - refresh
version: "1.0"
description: >-
  Reload and revalidate specific queries after mutations. Efficiently update
  cached data without full page refreshes for better UX.
---

The `reload` function returns a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object that instructs the router to revalidate specific queries when returned or thrown from a [query](/solid-router/reference/data-apis/query) or [action](/solid-router/concepts/actions).

## Import

```ts
import { reload } from "@solidjs/router";
```

## Type

```ts
function reload(init?: {
	revalidate?: string | string[];
	headers?: HeadersInit;
	status?: number;
	statusText?: string;
}): CustomResponse<never>;
```

## Parameters

### `init`

- **Type:** `{ revalidate?: string | string[]; headers?: HeadersInit; status?: number; statusText?: string; }`
- **Required:** No

An optional configuration object with the following properties:

#### `revalidate`

- **Type:** `string | string[]`
- **Required:** No

A query key or an array of query keys to revalidate.

#### `headers`

- **Type:** `HeadersInit`
- **Required:** No

An object containing any headers to be sent with the response.

#### `status`

- **Type:** `number`
- **Required:** No

The HTTP status code of the response.
Defaults to [`200 OK`](http://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200).

#### `statusText`

- **Type:** `string`
- **Required:** No

The status text associated with the status code.

## Examples

### Basic Usage

```ts
import { action, reload } from "@solidjs/router";

const savePreferencesAction = action(async () => {
	// ... Saves the user preferences.

	// Only revalidate the "userPreferences" query.
	return reload({ revalidate: ["userPreferences"] });
}, "savePreferences");
```
