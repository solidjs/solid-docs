---
title: "Routing overview"
version: "2.0"
description: "Choose between Solid Router and TanStack Router for a Solid app, mount the router in App, and decide whether routes come from an array or from files under src/routes."
---

The store from the [Quick start](/getting-started/quick-start) has one page.
It needs a product page whose URL carries the product id, a cart at `/cart`, and a header that stays on screen while the page under it changes, and clicking between those pages must not reload the document.

Solid does not ship a router.
Routing is an integration: a router owns URL matching, navigation, and rendering the matched page, and the application renders it as part of the component tree like any other component.
Two routers are supported, and both are mounted the same way.
This page helps you pick one and shows the smallest routed app; the router-specific pages take over from there.

:::note[Wiring a router that is not one of these two]
If you are integrating a different router into start mode, [Integrate a router](/routing/integrate-a-router) covers the request pipeline and the single-flight extension points.
Nothing on this page is required reading for that.
:::

## Pick a router

Use Solid Router when you do not have a reason to use something else.
It is built for Solid's reactivity model: route params and location are reactive values, `query()` and `action()` are thin wrappers around server functions, forms submit before JavaScript loads, and single-flight mutations work by default.
It also ships the file-system adapter that the CLI templates use, so routes are files under `src/routes`.
The `basic` and `fullstack` project shapes install it.

Use TanStack Router when you already build on TanStack Query, need its typed search-parameter schemas and loader model, or share routing conventions with a TanStack app in another framework.
You give up the file-system convention shared with the rest of the Solid templates, and you own the data cache handoff between server and client, which the [TanStack Router](/routing/tanstack) page documents.
The `fullstack-tanstack` project shape installs it.

The `bare` shape has no router, for a single-page tool or a project that adds one later.

## The smallest routed app

This is the `basic` template with the comments removed.
The router is created once at module scope:

```ts
// src/router.ts
import { pageRoutes } from "virtual:file-routes";
import { createRouter } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";

export const Router = createRouter({ routes: fileRoutes(pageRoutes) });

export const { paths } = Router;
```

And mounted in `App`, where the matched page renders through `props.children`:

```tsx
// src/App.tsx
import { Loading } from "solid-js";
import { paths, Router } from "./router";

export default function App() {
	return (
		<Router>
			{(props) => (
				<>
					<nav>
						<a href={paths()}>Home</a>
						<a href={paths.users(1)}>Users</a>
					</nav>
					<Loading fallback={<main>Loading…</main>}>{props.children}</Loading>
				</>
			)}
		</Router>
	);
}
```

Run it and click **Users**.
The URL changes to `/users/1`, the page under the `<nav>` changes, and the `<nav>` itself is not touched: the document did not reload.

Each file under `src/routes` with a default export is a page.
`paths` builds URLs from the route tree, so `paths.users(1)` is checked by the type checker and a link to a route that does not exist fails to compile.
The `Loading` boundary around `props.children` gives the first load a fallback; later navigations keep the current page on screen without it, because the update is held until the next page's data arrives.
The [Solid Router setup page](/routing/solid-router/setup) shows the same app with an in-memory route tree instead of the file-system adapter.

## Mount the router in `App`

The `@solidjs/vite-plugin` start mode uses `src/App.tsx` as the root component for its generated entries.
With server-side rendering (SSR) enabled, the generated server and client entries both render `App` inside `src/Document.tsx`.
Mount the router or its provider in `App` so both entries use the same router root.

Site-wide providers can wrap the router.
Shared layouts belong inside it, in the router's function child or a layout route, so they can read the location:

```tsx
// Avoid: the header is outside the router, so it cannot read the location or mark the active link
<>
	<Header />
	<Router>{(props) => props.children}</Router>
</>

// Prefer: the header is in the router's function child, where router primitives work
<Router>
	{(props) => (
		<>
			<Header />
			{props.children}
		</>
	)}
</Router>
```

Run the `Avoid` version with a `useLocation()` call inside `Header` and it throws `<A> and 'use' router primitives can be only used inside a Route.`
The `Prefer` version keeps `Header` mounted for the life of the app and gives it access to every router primitive.

:::caution[One router per app]
Solid Router does not support a `<Router>` inside another `<Router>`; development warns `Mounting a router inside another router is not supported.`
Compose one route tree instead, splitting large sections into [lazy subtrees](/routing/solid-router/route-definitions#load-a-route-subtree-lazily) when they should load on demand.
:::

## Choose how routes are defined

The platform does not prescribe route definitions or file naming.
A router can consume a hand-written route array, its own generated route tree, or a manifest from a file-system routing plugin.

With Solid Router, both forms produce the same route objects, so the decision is about where you want to read the route tree:

- A hand-written array in `src/router.ts` keeps every path in one file and needs no plugin.
  [Route definitions](/routing/solid-router/route-definitions) covers its fields.
- The `filesystem-routing` Vite plugin exposes a manifest through `virtual:file-routes`, and `fileRoutes` from `@solidjs/router/fs` converts its `pageRoutes` export into route definitions.
  The path lives in the filename, so adding a page is adding a file.
  This is what the templates do.

TanStack Router uses `@tanstack/router-plugin` to generate its own typed route tree from `src/routes`.
An application can still use `virtual:file-routes` for HTTP handlers in another directory, as the `fullstack-tanstack` template does for `src/api`.

## Recap

- Use Solid Router unless you already build on TanStack Query or share routing with a TanStack app.
- Create the router once at module scope and export `Router` and `paths` from `src/router.ts`.
- Mount the router in `src/App.tsx` so the generated client and server entries render the same tree.
- Put shared layout inside the router's function child, not around the router, so it can use router primitives.
- Wrap `props.children` in a `Loading` boundary so the first load has a fallback and later navigations keep the current page.
- Build URLs with `paths` instead of string literals so the type checker catches a route that moved.
- Choose the file-system adapter or a hand-written array in `src/router.ts`; everything else is unchanged either way.

## Next steps

- [Solid Router](/routing/solid-router): one small store built up page by page, then routes, layouts, navigation, and data loading in depth.
- [TanStack Router](/routing/tanstack): how the `fullstack-tanstack` template hands the TanStack Query cache between server and client.
- [App structure](/building-apps/app-structure): what the generated entries do with `App` and `Document`, and when to change them.
- [Integrate a router](/routing/integrate-a-router): the request pipeline and single-flight hooks for a router Solid does not ship.
