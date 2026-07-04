---
title: redirect
use_cases: >-
  redirects, response redirects, navigation responses, revalidation headers
tags:
  - redirect
  - response
  - navigation
  - revalidation
version: "1.0"
description: >-
  redirect returns a custom redirect response.
---

`redirect` is a response helper that returns a [`Response` object](https://developer.mozilla.org/en-US/docs/Web/API/Response) object that instructs the router to navigate to a different route when returned or thrown from a [query](/solid-router/reference/data-apis/query) or [action](/solid-router/concepts/actions).

## Import

```ts
import { redirect } from "@solidjs/router";
```

## Type

```ts
type RouterResponseInit = Omit<ResponseInit, "body"> & {
	revalidate?: string | string[];
};

function redirect(
	url: string,
	init?:
		| number
		| {
				revalidate?: string | string[];
				headers?: HeadersInit;
				status?: number;
				statusText?: string;
		  }
): CustomResponse<never>;
```

## Parameters

### `url`

- **Type:** `string`
- **Required:** Yes

The absolute or relative URL to which the redirect should occur.

### `init`

- **Type:** `number | RouterResponseInit`
- **Default:** `302`
- **Required:** No

Redirect status code or response options.

### `revalidate`

- **Type:** `string | string[]`
- **Required:** No

Key or keys written to the `X-Revalidate` response header.

#### `status`

- **Type:** `number`
- **Required:** No

The HTTP status code for the redirect.
Defaults to [`302 Found`)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302).

## Return value

- **Type:** `CustomResponse<never>`

Returns a `Response` object with a `Location` header.

## Behavior

- A numeric `init` is used as the response status.
- Object `init` values default `status` to `302` when `status` is undefined.
- Writes `url` to the `Location` header.
- Defined `revalidate` values are written to the `X-Revalidate` header with `toString()`.

## Examples

### Basic usage

```ts
import { query, redirect } from "@solidjs/router";

const getCurrentUser = query(async () => {
	const response = await fetch("/api/me");

	if (response.status === 401) {
		return redirect("/login");
	}

	return response.json();
}, "currentUser");
```

## Related

- [`json`](/solid-router/reference/response-helpers/json)
- [`reload`](/solid-router/reference/response-helpers/reload)
