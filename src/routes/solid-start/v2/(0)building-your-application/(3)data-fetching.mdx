---
title: Data fetching
use_cases: >-
  api calls, database queries, loading states, preloading data, server-side
  fetching, route data
tags:
  - fetch
  - data
  - query
  - async
  - server
version: "2.0"
description: >-
  Fetch data in SolidStart v2 with Solid Router queries, createAsync, and
  server-backed functions compiled from the use server directive.
---

Data loading is built around Solid Router's [`query`](/solid-router/reference/data-apis/query) API and [`createAsync`](/solid-router/reference/data-apis/create-async).
The `"use server"` directive lets a query body run only on the server when needed.

## Basic query usage

Use `query` to define cached data loading and `createAsync` to read the result inside a route component.

```tsx title="src/routes/posts.tsx"
import { For } from "solid-js";
import { createAsync, query } from "@solidjs/router";

const getPosts = query(async () => {
	const response = await fetch("https://example.com/api/posts");
	return response.json() as Promise<Array<{ id: number; title: string }>>;
}, "posts");

export default function PostsPage() {
	const posts = createAsync(() => getPosts());

	return <For each={posts()}>{(post) => <li>{post.title}</li>}</For>;
}
```

## Keep the data function on the server

If your query needs direct access to server-only resources, add the `"use server"` directive inside the query function.

```tsx title="src/routes/account.tsx"
import { createAsync, query } from "@solidjs/router";
import { useSession } from "@solidjs/start/http";

const getCurrentUser = query(async () => {
	"use server";

	const session = await useSession<{ userId?: string }>({
		password: process.env.SESSION_SECRET as string,
		name: "session",
	});

	return { userId: session.data.userId ?? null };
}, "currentUser");

export default function AccountPage() {
	const user = createAsync(() => getCurrentUser());
	return <pre>{JSON.stringify(user(), null, 2)}</pre>;
}
```

## Preload route data

If you want to warm the query before rendering the page, export a `route.preload` function from the route module.

```tsx title="src/routes/posts/[id].tsx"
import { createAsync, query, type RouteDefinition } from "@solidjs/router";

const getPost = query(async (id: string) => {
	"use server";
	const response = await fetch(`https://example.com/api/posts/${id}`);
	return response.json();
}, "post");

export const route = {
	preload: ({ params }) => getPost(params.id),
} satisfies RouteDefinition;

export default function PostPage(props: { params: { id: string } }) {
	const post = createAsync(() => getPost(props.params.id));
	return <pre>{JSON.stringify(post(), null, 2)}</pre>;
}
```

Cache invalidation and advanced query behavior are handled by [Solid Router](/solid-router), so use the Solid Router references when you need lower-level cache semantics.
