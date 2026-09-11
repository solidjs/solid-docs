---
title: "TanStack Router"
version: "2.0"
description: "Use TanStack Router and TanStack Query with Solid's server functions, streaming SSR, and single-flight mutations, as the fullstack-tanstack project shape does."
---

You already build on TanStack Query, or you share route conventions with a TanStack app in another framework, and you want Solid's server functions, streaming SSR, and single-flight mutations without giving that up.
The `fullstack-tanstack` project shape is that combination: the `fullstack` shape with the client half swapped out.

[TanStack Router](https://tanstack.com/router) owns routing and [TanStack Query](https://tanstack.com/query) owns the data cache, while Solid's server functions, streaming SSR, single-flight mutations, sessions, and API routes work unchanged.
Nothing on the server asks which router is rendering.

This page explains how the three fit together in that template, so you can read its source with the design in mind and change it with confidence.
For the router's own API, route files, `<Link>`, loaders, search params, and so on, use the [TanStack Router documentation](https://tanstack.com/router/latest/docs/framework/solid/overview); nothing there changes under Solid.

:::note[If you have not chosen a router yet]
[Pick a router](/routing/overview#pick-a-router) weighs this shape against Solid Router.
The short version: choose this one for TanStack Query or shared TanStack conventions; otherwise Solid Router has the file-system convention the other templates share and forms that work without JavaScript.
:::

## Who owns what

- Solid and the Vite plugin own the RPC (`"use server"` functions compiled to typed fetches), the single-flight envelope, serialization, the generated entries, `src/Document.tsx`, sessions, and typed env.
- TanStack Router owns routing: the file-based tree under `src/routes` (generated into `src/routeTree.gen.ts`), navigation, intent preloading, and per-route code splitting.
- TanStack Query owns the client data cache: loaders prefetch into it, components read from it with `useQuery`, and everything the server hands back lands in it.

Single-flight crosses all three, through public extension points only.
No package patches or wraps another.

## The shape of a page

Here is the user detail route from the template, trimmed:

```tsx
// src/routes/users.$id.tsx
import { useMutation, useQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { isPending } from "solid-js";
import { prefetch, userQuery } from "../lib/queries";
import { renameUser } from "../lib/users";

export const Route = createFileRoute("/users/$id")({
	loader: ({ context, params }) => {
		prefetch(context.queryClient, userQuery(params.id));
	},
	component: UserPage,
});

function UserPage() {
	const params = Route.useParams();
	const user = useQuery(() => userQuery(params().id));
	const rename = useMutation(() => ({
		mutationFn: (input: { id: string; name: string }) => renameUser(input),
	}));

	return (
		<section style={{ opacity: isPending(() => user.data) ? 0.5 : 1 }}>
			<h2>{user.data.name}</h2>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const name = new FormData(event.currentTarget).get("name");
					rename.mutate({ id: params().id, name: String(name) });
				}}
			>
				<input name="name" value={user.data.name} required />
				<button type="submit" disabled={rename.isPending}>
					Rename
				</button>
			</form>
		</section>
	);
}
```

Open `/users/1`, type a new name, and click **Rename**: the heading updates, the section dims briefly while the refetch is in flight, and the users list in the parent layout shows the new name too.
Three things in this file are deliberate departures from a TanStack default.

The loader is a hint rather than a gate.
`prefetch` is `void queryClient.prefetchQuery(...)`.
The navigation commits at once and the component picks the data up at `user.data`, which suspends to the nearest `Loading` boundary until the query settles.
On the server that is what lets each boundary stream as its own query finishes instead of holding the whole response for the slowest one.

Reads go through Solid's async model.
`user.data.name` is read directly, with no `isLoading` guard, and `isPending(() => user.data)` dims the section during a refetch.
These are the same primitives as the rest of Solid; [Async reactivity](/concepts/async-reactivity) explains them.

There is no `invalidateQueries`.
When `rename.mutate` settles, the cache already holds the renamed user and the parent list.
That is single-flight, covered below.

## Reads: `queryOptions` around a `GET` server function

Every read is declared once, in `src/lib/queries.ts`, as TanStack `queryOptions` wrapping a server function:

```ts
// src/lib/queries.ts
import { queryOptions } from "@tanstack/solid-query";
import { getUser, getUsers } from "./users";

export const usersQuery = () =>
	queryOptions({ queryKey: ["users"], queryFn: () => getUsers() });

export const userQuery = (id: string) =>
	queryOptions({ queryKey: ["users", id], queryFn: () => getUser(id) });
```

```ts
// src/lib/users.ts
import { GET } from "@solidjs/web/server-functions";

export const getUser = GET(async (id: string) => {
	"use server";
	return findUser(id);
});
```

Loaders, components, and the single-flight collector all consume the same options, so a key is spelled in one place.

The `GET` wrapper matters here more than in the Solid Router template, where `query` applies it for you:

```ts
// Avoid: a bare server function is a POST, and every POST carries the single-flight header
export async function getUser(id: string) {
	"use server";
	return findUser(id);
}

// Prefer: declare the read as a GET
export const getUser = GET(async (id: string) => {
	"use server";
	return findUser(id);
});
```

With the `Avoid` version, each `useQuery` fetch asks the server to re-run the page's loaders and hold the response until they settle, because the mounted single-flight consumer adds its header to every non-`GET` call.
A read marked `GET` skips that header and gets cacheable HTTP semantics as a bonus.

:::caution[Keep staleTime above zero]
The shared `QueryClient` sets `staleTime: 30_000`.
Data the server has rendered, or a mutation has refreshed, counts as fresh; without that, every `useQuery` that mounts would refetch on arrival and undo both hydration and single-flight.
:::

## Mutations: server functions through `useMutation`

A mutation is a plain server function called through `useMutation`:

```ts
// src/lib/users.ts
import { reload } from "@solidjs/web";

export async function renameUser(input: { id: string; name: string }) {
	"use server";
	if (!(await getSession())?.userId) throw new Error("Sign in to rename users");
	updateUser(input.id, { name: input.name });
	return reload({ revalidate: "users" });
}
```

Wrap the call in an arrow, as the route above does.
`useMutation` invokes `mutationFn(variables, context)`, and a server function forwards every argument it receives into the RPC; the arrow keeps the context object off the wire.

`reload({ revalidate: "users" })` declares what the mutation changed.
The template uses that declaration to scope single-flight collection; a mutation that returns nothing gets the unscoped behavior, which re-runs the page's loaders and ships everything they produce.

Forms here are scripted (`onSubmit` calling `mutate`), the usual TanStack shape.
For forms that must work without JavaScript, the `fullstack` shape's Solid Router actions are the supported path; [Progressive enhancement](/building-apps/server-functions/progressive-enhancement) describes what the server-function runtime does for an unscripted `POST` regardless of router.

## What the server does per request

The plugin's `start.setup` hook is the seam that lets a router Solid does not own drive streaming SSR.
`src/setup.tsx` runs for each SSR request:

```tsx
// src/setup.tsx (trimmed)
export default async function setup(
	event: RequestEvent & { response: ResponseStub }
) {
	const url = new URL(event.request.url);
	const queryClient = createQueryClient();
	const router = createAppRouter(
		queryClient,
		createMemoryHistory({ initialEntries: [url.pathname + url.search] })
	);

	await router.load();

	const result = router._serverResult;
	if (result?.type === "redirect") {
		result.redirect.headers.forEach((value, key) =>
			event.response.headers.set(key, value)
		);
		event.response.status = result.redirect.status;
		return () => null;
	}
	if (result) event.response.status = result.status;

	return () => (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}
```

Read it top to bottom:

1. A fresh `QueryClient` and router per request, so one user's data never renders into another's page.
2. `router.load()` matches the URL and starts the loaders' prefetches; rendering begins while they are in flight.
3. A `redirect()` thrown in `beforeLoad` or a loader does not throw on the server; it lands in `router._serverResult`.
   Setup copies its status and `Location` onto the response so the browser gets a real `30x` instead of a `200` with an empty body.
   Not-found and errored loads set `404` and `500` the same way.
4. The returned component renders in `App`'s place inside `Document`.

The handoff to the client is provider-owned.
`QueryClientProvider` streams each query's dehydrated entry into Solid's hydration registry as it settles, and the client provider primes its cache from those entries as they arrive.
`RouterProvider` does the same for match state, so the client's `createRouter` commits the server's matches before hydrating: no boot `router.load()`, no loader re-runs, and each route's lazy chunk resolves under the boundary the server rendered.
There is no inline `window.__QUERY_STATE__` or `window.$_TSR` script.

The client entry mirrors the tree with one session-long `QueryClient`:

```tsx
// src/App.tsx (trimmed)
const queryClient = createQueryClient();
const router = createAppRouter(queryClient);

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}
```

## Single-flight on a router Solid does not own

Rename a user with the network tab open.
There is one `POST /_server`, and both the detail heading and the users list in the parent layout update from that one response.

The client side is TanStack Query's own: `QueryClientProvider` subscribes a named flight-data source (`"sq"`) while mounted and hydrates the cache from any payload that comes back under that name.
Subscribing is also the opt-in; while the provider is mounted, mutation calls carry the single-flight header.

The server side is `src/server-config.ts`, loaded before any server function is dispatched through `serverFunctions.configure` in `vite.config.ts`:

```ts
// src/server-config.ts (trimmed)
import { registerFlightDataSource } from "@solidjs/web/server-functions/server";
import { FLIGHT_DATA_SOURCE, dehydrateSettled } from "@tanstack/solid-query";
import { loadFlightTarget } from "@tanstack/solid-router/ssr/server";

registerFlightDataSource(FLIGHT_DATA_SOURCE, (event, outcome) => {
	const queryClient = createQueryClient();
	return loadFlightTarget({
		router: createAppRouter(queryClient),
		event,
		outcome,
		async collect() {
			const state = await dehydrateSettled(queryClient);
			return state.queries.length > 0 ? state : undefined;
		},
	});
});
```

`loadFlightTarget` builds a router for the page the browser will show after the mutation, with the mutation's cookie effects already folded in, and runs its loaders into the fresh `QueryClient`.
`dehydrateSettled` waits for those prefetches and returns the dehydrated cache, which becomes the payload.
The payload is a dehydrated `QueryClient`, so consuming it is TanStack's own `hydrate`.

The template goes one step further in `src/lib/flight.ts`: mutation requests carry an inventory of what the client already caches, and the collector skips recomputing anything the mutation's `revalidate` keys did not name.
That is userland composition over the same seams, and the template's comments walk through it.
Remove it and the base protocol still works.

## What stays the same

Sessions, typed env, API routes, and deployment are the `fullstack` shape's, unchanged.
The one adjustment is where API routes live: `src/routes` belongs to TanStack Router, so the `fileRoutes` plugin scans `src/api` and mounts it under `/api` instead.

## Limits to know

- `start.setup` runs only with the plugin's generated server entry and only when `ssr` is on.
  An authored server entry has to prepare the router and render it itself.
- TanStack's own SSR protocol (`RouterServer`, `RouterClient`, and the `$_TSR` stream handlers) expects to own the HTML stream, and under start mode the plugin owns it.
  The template does not use that protocol; the hydration-registry transfer above is the native channel for this setup.
- `disableGlobalCatchBoundary: true` in `src/router.tsx` is a design choice, not a workaround.
  Errors, including a `redirect()` during SSR, bubble past the router to the app's own [boundaries](/concepts/boundaries) and stream handler instead of stopping at the router's `ErrorComponent`.
  Route-level `errorComponent` and `pendingComponent` still work.

## Recap

- Declare every read once as `queryOptions` around a `GET` server function, so loaders, components, and the collector spell each key in one place.
- Treat the loader as a prefetch: `void` the promise and let the component suspend to the nearest `Loading` boundary.
- Read `query.data` directly and use `isPending` for refetch state; skip the `isLoading` guards.
- Call mutations through `useMutation` with an arrow around the server function, and return `reload({ revalidate })` to scope what single-flight collects.
- Keep `staleTime` above zero so hydrated and single-flight data count as fresh.
- Build a fresh router and `QueryClient` per request in `start.setup`, and copy a redirect or status from `router._serverResult` onto the response.
- Leave `disableGlobalCatchBoundary: true` in place so errors and redirects reach the app's own boundaries during SSR.

## Next steps

- [Server functions](/building-apps/server-functions): the reads and mutations wrapped in `queryOptions` and `useMutation`, including why `GET` matters.
- [Integrate a router](/routing/integrate-a-router): the `start.setup` and flight-data hooks this template is built on, for adapting the pattern to another router.
- [Choose a rendering mode](/guides/choose-a-rendering-mode): the `ssr: false` posture, a static shell plus API server, works for this shape too.
- [Middleware and API routes](/building-apps/middleware-and-api-routes): the `src/api` handlers, and why they live outside `src/routes` in this shape.
