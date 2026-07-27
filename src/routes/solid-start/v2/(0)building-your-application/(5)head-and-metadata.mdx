---
title: Head and metadata
use_cases: >-
  seo optimization, page titles, meta tags, og tags, social sharing, search
  engine visibility, dynamic metadata
tags:
  - seo
  - metadata
  - head
  - title
  - meta
  - og-tags
version: "2.0"
description: >-
  Manage SEO and metadata in SolidStart with dynamic titles, meta tags, and Open
  Graph tags.
---

SolidStart does not bundle a metadata API. Use [`@solidjs/meta`](/solid-meta) to manage document titles, metadata, links, styles, and other elements in `<head>`.

```package-install
@solidjs/meta
```

## Add the provider

Place `MetaProvider` in the router root so route metadata is collected during server rendering and updated during client navigation.

```tsx title="src/app.tsx" {8,12}
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Suspense>{props.children}</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
```

## Set route metadata

Metadata components can be rendered from any route below `MetaProvider`. They are removed or updated when the route changes.

```tsx title="src/routes/about.tsx"
import { Meta, Title } from "@solidjs/meta";

export default function About() {
	return (
		<>
			<Title>About | My site</Title>
			<Meta name="description" content="Learn more about my site." />
			<Meta property="og:title" content="About my site" />
			<h1>About</h1>
		</>
	);
}
```

## Use asynchronous data

Metadata can read the same query result as the route. Wrap the rendered data in `Suspense` or `Show` when it may not be available immediately.

```tsx title="src/routes/users/[id].tsx"
import { Title } from "@solidjs/meta";
import { createAsync, query, type RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";

const getUser = query(async (id: string) => {
	"use server";
	return { id, name: `User ${id}` };
}, "user");

export default function User(props: RouteSectionProps) {
	const user = createAsync(() => getUser(props.params.id));

	return (
		<Show when={user()}>
			{(value) => (
				<>
					<Title>{value().name}</Title>
					<h1>{value().name}</h1>
				</>
			)}
		</Show>
	);
}
```

See the [`@solidjs/meta` documentation](/solid-meta) for all supported head elements and provider behavior.
