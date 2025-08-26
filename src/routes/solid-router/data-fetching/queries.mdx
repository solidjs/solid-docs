---
title: "Queries"
---

Queries are the core building blocks for data fetching in Solid Router.
They provide an elegant solution for managing data fetching.

## Defining queries

They are defined using the [`query` function](/solid-router/reference/data-apis/query).
It wraps the data-fetching logic and extends it with powerful capabilities like [request deduplication](#deduplication) and [automatic revalidation](#revalidation).

The `query` function takes two parameters: a **fetcher** and a **name**.

- The **fetcher** is an asynchronous function that fetches data from any source, such as a remote API.
- The **name** is a unique string used to identify the query.
  When a query is called, Solid Router uses this name and the arguments passed to the query to create a unique key, which is used for the internal deduplication mechanism.

```tsx
import { query } from "@solidjs/router";

const getUserProfileQuery = query(async (userId: string) => {
	const response = await fetch(
		`https://api.example.com/users/${encodeURIComponent(userId)}`
	);
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json?.message ?? "Failed to load user profile.");
	}

	return json;
}, "userProfile");
```

In this example, the defined query fetches a user's profile from an API.
If the request fails, the fetcher will throw an error that will be caught by the nearest [`<ErrorBoundary>`](/reference/components/error-boundary) in the component tree.

## Using queries in components

Defining a query does not by itself fetch any data.
To access its data, the query can be used with the [`createAsync` primitive](/solid-router/reference/data-apis/create-async).
`createAsync` takes an asynchronous function, such as a query, and returns a signal that tracks its result.

```tsx
import { For, Show } from "solid-js";
import { query, createAsync } from "@solidjs/router";

const getArticlesQuery = query(async () => {
	// ... Fetches a list of articles from an API.
}, "articles");

function Articles() {
	const articles = createAsync(() => getArticlesQuery());

	return (
		<Show when={articles()}>
			<For each={articles()}>{(article) => <p>{article.title}</p>}</For>
		</Show>
	);
}
```

In this example, `createAsync` is used to call the query.
Once the query completes, `articles` holds the result, which is then rendered.

:::tip
When working with complex data types, such as arrays or deeply nested objects, the [`createAsyncStore` primitive](/solid-router/reference/data-apis/create-async-store) offers a more ergonomic and performant solution.
It works like `createAsync`, but returns a [store](/concepts/stores) for easier state management..
:::

## Deduplication

A key feature of queries is their ability to deduplicate requests, preventing redundant data fetching in quick succession.

One common use case is preloading: when a user hovers over a link, the application can begin preloading the data for the destination page.
If the user then clicks the link, the query has already been completed, and the data is available instantly without triggering another network request.
This mechanism is fundamental to the performance of Solid Router applications.

Deduplication also applies when multiple components on the same page use the same query.
As long as at least one component is actively using the query, Solid Router will reuse the cached result instead of refetching the data.
