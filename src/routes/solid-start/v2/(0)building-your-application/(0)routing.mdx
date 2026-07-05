---
title: Routing
use_cases: >-
  page navigation, url structure, dynamic paths, route organization,
  filesystem routing, api endpoints
tags:
  - routing
  - filesystem
  - pages
  - dynamic
  - api
version: "2.0"
description: >-
  SolidStart v2 routing uses the filesystem router to map files in
  src/routes to UI routes and API routes.
---

Routes come from the filesystem.
`FileRoutes` from `@solidjs/start/router` maps files in `src/routes` into route paths.

This page covers the route filename conventions.

## UI routes and API routes

There are two route shapes:

- Files with a default export become UI routes.
- Files that export HTTP method names such as `GET` or `POST` become API routes.

You can read more about handler exports in [API routes](/solid-start/v2/building-your-application/api-routes).

## Basic filename mapping

File names map to paths using these rules:

- `src/routes/index.tsx` becomes `/`
- `src/routes/about.tsx` becomes `/about`
- `src/routes/blog/index.tsx` becomes `/blog`
- `src/routes/blog/post.tsx` becomes `/blog/post`

An `.mdx` file in `src/routes` is also treated as a page route.

## Dynamic segments

Bracketed segments become route params:

- `src/routes/users/[id].tsx` becomes `/users/:id`
- `src/routes/users/[[id]].tsx` becomes `/users/:id?`
- `src/routes/docs/[...slug].tsx` becomes `/docs/*slug`

Read them with [`useParams`](/solid-router/reference/primitives/use-params):

```tsx title="src/routes/users/[id].tsx"
import { useParams } from "@solidjs/router";

export default function UserPage() {
	const params = useParams();
	return <h1>User {params.id}</h1>;
}
```

## Route config exports

The filesystem router also looks for an exported `route` object alongside a page component.
That lets a route file attach route-level behavior while still default-exporting UI.

```tsx title="src/routes/posts/[id].tsx"
import { query, createAsync, type RouteDefinition } from "@solidjs/router";

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
