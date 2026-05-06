---
title: json
use_cases: >-
  json responses, action responses, query responses, revalidation headers
tags:
  - json
  - response
  - revalidation
version: "1.0"
description: >-
  json returns a custom JSON response.
---

`json` is a response helper that returns a returns a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) with a JSON body and a `customBody` reader for the original data.
It is intended for sending JSON data from a [query](/solid-router/reference/data-apis/query) or [action](/solid-router/concepts/actions) while also allowing configuration of query revalidation.

## Import

```ts
import { json } from "@solidjs/router";
```

## Type

```ts
function json<T>(
	data: T,
	init: {
		revalidate?: string | string[];
		headers?: HeadersInit;
		status?: number;
		statusText?: string;
	} = {}
): CustomResponse<T>;
```

## Parameters

### `data`

- **Type:** `T`
- **Required:** Yes

The data to be serialized as JSON in the response body.
It must be a value that can be serialized with [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

### `init`

- **Type:** `RouterResponseInit`
- **Default:** `{}`
- **Required:** No

A configuration object with the following properties:

### `revalidate`

- **Type:** `string | string[]`
- **Required:** No

A query key or an array of query keys to revalidate.
Passing an empty array (`[]`) disables query revalidation entirely.

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

## Return value

- **Type:** `CustomResponse<T>`

Returns a `Response` object with a `customBody` function that returns `data`.

## Behavior

- Sets the `Content-Type` header to `"application/json"`.
- Serializes `data` with `JSON.stringify`.
- When `init.revalidate` is defined, `json` writes it to the `X-Revalidate` header with `toString()`.
- Values from `init.headers` are preserved unless overwritten by `json`.

## Examples

### Invalidating Data After a Mutation

```tsx
import { For } from "solid-js";
import { query, action, json, createAsync } from "@solidjs/router";

const getCurrentUserQuery = query(async () => {
	return await fetch("/api/me").then((response) => response.json());
}, "currentUser");

const getPostsQuery = query(async () => {
	return await fetch("/api/posts").then((response) => response.json());
}, "posts");

const createPostAction = action(async (formData: FormData) => {
	const title = formData.get("title")?.toString();
	const newPost = await fetch("/api/posts", {
		method: "POST",
		body: JSON.stringify({ title }),
	}).then((response) => response.json());

	// Only revalidate the "posts" query.
	return json(newPost, { revalidate: "posts" });
}, "createPost");

function Posts() {
	const currentUser = createAsync(() => getCurrentUserQuery());
	const posts = createAsync(() => getPostsQuery());

	return (
		<div>
			<p>Welcome back {currentUser()?.name}</p>
			<ul>
				<For each={posts()}>{(post) => <li>{post.title}</li>}</For>
			</ul>
			<form action={createPostAction} method="post">
				<input name="title" />
				<button>Create Post</button>
			</form>
		</div>
	);
}
```

## Related

- [`query`](/solid-router/reference/data-apis/query)
- [`action`](/solid-router/reference/data-apis/action)
