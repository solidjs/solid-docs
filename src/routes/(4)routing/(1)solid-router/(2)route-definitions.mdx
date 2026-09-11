---
title: "Route definitions"
version: "2.0"
description: "Write the route objects Solid Router matches against: path patterns with required, optional, and wildcard segments, typed parameters, match filters, metadata, lazy subtrees, and the file-system manifest."
---

The URL `/products/mug` has a product id in it.
The product page needs that id as `props.params.id`, the link that points at it needs `paths.products("mug")` to be checked by the type checker, and neither should accept `/products/` with nothing after it.
All of that comes from one object in the route tree.

A route definition is a plain object: a path pattern, the component to render, and optionally a `preload`, `children`, match filters, and metadata.
Most apps need only [Match path patterns](#match-path-patterns) and [Type a route at its definition](#type-a-route-at-its-definition); the sections after those cover filters, metadata, lazy subtrees, and the file-system manifest for when a project grows into them.

```tsx
import { defineRoutes } from "@solidjs/router";

export const routes = defineRoutes([
	{ path: "/", component: Home },
	{ path: "/products/:id", component: Product },
	{ path: "*404", component: NotFound },
]);
```

The route array is also where the types come from.
`paths.products` exists and `paths.prodcuts` does not because TypeScript kept the literal `"/products/:id"`.
An inline array passed to `createRouter` keeps its literals on its own; an array assigned to a variable first widens to `string`:

```tsx
// Avoid: the literal paths widen to string, so paths accepts anything
const routes = [
	{ path: "/", component: Home },
	{ path: "/products/:id", component: Product },
];
export const Router = createRouter({ routes });

// Prefer: defineRoutes keeps the literals
const routes = defineRoutes([
	{ path: "/", component: Home },
	{ path: "/products/:id", component: Product },
]);
export const Router = createRouter({ routes });
```

With the `Avoid` version, `paths.prodcuts` compiles, and the typo is a dead link found at runtime.
With `defineRoutes`, it is a type error at the call site.

## Type a route at its definition

Inside a route's own `component` and `preload`, `params` is an open record by default: every key is `string | undefined`, even `:id`, which the pattern guarantees.
Wrap the route in `defineRoute` and both are typed from the route's own `path`:

```tsx
import { defineRoute } from "@solidjs/router";

const productRoute = defineRoute({
	path: "/products/:id/:tab?",
	preload: ({ params }) => void getProduct(params.id), // params.id: string
	component: (props) => (
		<Product id={props.params.id} tab={props.params.tab} /> // tab: string | undefined
	),
});
```

Required parameters such as `:id` are typed as `string`.
Optional parameters such as `:tab?` are typed as `string | undefined`.
Parameters inherited from a parent remain accessible as `string | undefined`.

Whatever `preload` returns is typed as the component's `props.data`.
It is captured once when the route matches, so for async data the pattern on the [Data loading and mutations](/routing/solid-router/data) page is to start the query in `preload` with `void` and read it through a memo in the component, where it stays reactive to `params`.

For a component declared in another module, annotate it with a path witness:

```tsx
import type { RouteComponent } from "@solidjs/router";
import type { Router } from "../router";

const Product: RouteComponent<typeof Router.paths.products> = (props) => (
	<h1>{props.params.id}</h1>
);
```

`RouteProps<typeof Router.paths.products>` provides the corresponding props-object type.

## Match path patterns

Choose a path token for each parameter:

- Use `:name` for a required segment.
- Use `:name?` for an optional segment.
- Use `*name` for the remaining path.

```tsx
const routes = defineRoutes([
	{ path: "/products/:id", component: Product },
	{ path: "/docs/:section?", component: Docs },
	{ path: "/files/*path", component: FileViewer },
]);
```

`/products/mug` matches the first route with `params.id === "mug"`; `/products` does not match it.
`/docs` and `/docs/install` both match the second.
`/files/2024/invoices/march.pdf` matches the third with `params.path === "2024/invoices/march.pdf"`.

:::caution[A wildcard ends the pattern]
`*name` must be the final segment; everything after the `*` is read as the parameter name, so a pattern such as `/files/*path/preview` does not match what it looks like it matches.
Put the fixed segments before the wildcard, or use a child route for the variant.
:::

A route can also match any path in an array:

```tsx
{ path: ["/sign-in", "/register"], component: AccountAccess }
```

The same route definition stays mounted when navigation moves between its matching paths, so a form in `AccountAccess` keeps its state when the user switches from `/sign-in` to `/register`.

## Filter parameters

`matchFilters` rejects parameter values that do not satisfy the configured filter.
Use an array, regular expression, or predicate as the filter:

```tsx
import { defineRoute, int } from "@solidjs/router";

const orderRoute = defineRoute({
	path: "/account/orders/:id",
	matchFilters: { id: int },
	component: Order,
});
```

`/account/orders/42` matches; `/account/orders/latest` falls through to the next route that matches, usually the `*404` catch-all.

The built-in `int` filter accepts integer strings at runtime.
It also changes the corresponding `Router.paths` argument to `number`, so `paths.account.orders(42)` type-checks and `paths.account.orders("latest")` does not.

:::note[Filters change the type of the link, not the param]
Route components still receive URL parameters as strings.
`params.id` is `"42"` inside `Order` even with `int` on the route, because that is what a URL holds; convert where you read it.
:::

## Add route metadata

The `info` property stores application metadata on a route.
Read matched metadata with `useRouteMatches()` or with `Router.match(url)`:

```tsx
const routes = defineRoutes([
	{
		path: "/account",
		component: Account,
		info: { breadcrumb: "Account" },
	},
]);
```

Augment `RouteInfo` to check shared metadata keys throughout the application:

```ts
declare module "@solidjs/router" {
	interface RouteInfo {
		breadcrumb?: string;
	}
}
```

## Load a route subtree lazily

A `children` thunk can load an entire nested route table.
The module may export the route array as `default` or as `routes`:

```tsx
const Router = createRouter({
	routes: [
		{ path: "/", component: Home },
		{
			path: "/admin",
			component: AdminLayout,
			children: () => import("./admin/routes"),
		},
	],
});
```

```tsx
// src/admin/routes.ts
import { defineRoutes } from "@solidjs/router";

export default defineRoutes([
	{ path: "/", component: AdminHome },
	{ path: "/products/:id", component: AdminProduct },
]);
```

Visit `/` and the admin route table is not downloaded.
Visit `/admin/products/mug`, or hover a link to it, and the thunk runs, the router adds the resolved subtree to the compiled route tree, and the match completes.
TypeScript infers `paths.admin.products("mug")` through the import's promise type when the imported route array retains literal types.

Use a deterministic thunk such as `() => import("./admin/routes")`.
The resolved subtree is cached and shared, so it does not switch based on later runtime state.

## Convert a file-system manifest

Enable the `filesystem-routing` Vite plugin to generate `virtual:file-routes`:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { fileRoutes as fileRoutesPlugin } from "filesystem-routing/vite";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
	plugins: [solid({ start: true }), fileRoutesPlugin()],
});
```

The `@solidjs/router/fs` adapter converts the generated `pageRoutes` export into Solid Router route definitions:

```tsx
import { pageRoutes } from "virtual:file-routes";
import { createRouter } from "@solidjs/router";
import { fileRoutes as routerFileRoutes } from "@solidjs/router/fs";

export const Router = createRouter({
	routes: routerFileRoutes(pageRoutes),
});
```

Each route module exports its component as `default`.
An optional named `route` export can supply `preload`, `matchFilters`, `search`, and `info`:

```tsx
// src/routes/products/[id].tsx
import { createMemo } from "solid-js";
import { int, type RouteProps } from "@solidjs/router";
import { defineFileRoute } from "@solidjs/router/fs";
import { getProduct } from "../../data/products";

export const route = defineFileRoute("/products/:id", {
	matchFilters: { id: int },
	preload: ({ params }) => void getProduct(params.id),
});

export default function Product(props: RouteProps<typeof route>) {
	const product = createMemo(() => getProduct(props.params.id));
	return <h1>{product().name}</h1>;
}
```

Inside a route file the pattern lives in the filename, so there is no `paths` node to type against.
The string passed to [`defineFileRoute`](/reference/solid-router/filesystem) stands in for it: it types `preload`'s params, validates `matchFilters`, and lets the config double as the component's `RouteProps` witness.
The manifest path remains the runtime source of truth; if the file moves, update the string with it.

:::deep-dive[What the adapter does with the manifest]
When the manifest has generated literal types, route paths, filters, and search schemas continue into `Router.paths`, so `paths.products("mug")` is typed the same way it would be from a hand-written array.
Code-split manifest components become Solid `lazy` components.
An eagerly delivered component from a manifest built with `codeSplitting: false` is passed through without a `lazy` wrapper.
The `route` export is read from the module the manifest points at; a hand-written route tree does not read it, which is why the preload sits on the route object in `src/router.ts` on the [introduction](/routing/solid-router#load-data-for-a-page) page.
:::

## Recap

- Keep path literals with `defineRoutes` or an inline array, so `paths` is typed from the route tree.
- Use `:name` for a required segment, `:name?` for an optional one, and `*name` as the final segment for the rest of the path.
- Wrap a route in `defineRoute` to type `params` in its own `component` and `preload`.
- Start async work in `preload` with `void` and read it through a memo; `props.data` is captured once.
- Use `matchFilters` to reject values at match time; params stay strings, and `int` types the `paths` argument as a number.
- Put a large section's routes in their own module and load them with a `children` thunk.
- In a route file, put `preload` and filters in the `route` export with `defineFileRoute`.

## Next steps

- [Nested routes and layouts](/routing/solid-router/nested-routes): how a route with `children` renders a layout around the matched page, and what stays mounted.
- [Navigation and typed paths](/routing/solid-router/navigation): the typed `paths` these definitions produce, and search parameters with a schema.
- [Data loading and mutations](/routing/solid-router/data): what to put in `preload`, and how the component reads it.
