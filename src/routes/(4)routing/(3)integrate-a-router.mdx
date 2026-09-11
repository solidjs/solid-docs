---
title: "Integrate a router"
version: "2.0"
description: "Wire a router that Solid does not ship into start mode: give it the request URL and a per-request instance, and connect it to the single-flight mutation transport."
---

This page is for someone bringing a router other than Solid Router or TanStack Router into start mode, or writing a Solid adapter for one.
An application developer using either supported router does not need it; the [Routing overview](/routing/overview) and the router's own pages cover everything they touch.

The situation it addresses: the router renders fine in the browser, and the first server-rendered request either matches the wrong URL, has no request-scoped instance to load its routes into, or leaves a mutation making two round trips where Solid Router makes one.
Two parts of the platform are involved, the request pipeline and the server-function transport, and each exposes a small, router-neutral surface.

## Connect routing to requests

During server-side rendering (SSR), a router needs the request URL and any request-scoped data its loaders read.
The start mode request handler creates a `RequestEvent` for each web `Request` and runs the render inside that event's scope, so `getRequestEvent()` answers anywhere in the render.

Solid Router reads the request URL from that event when it creates its server integration, and falls back to its `url` prop when there is no event.
A router that does the same needs nothing else from the platform for a synchronous route tree.

### Prepare an instance per request

A router that must do asynchronous work before rendering, such as creating a request-bound instance and awaiting its route loaders, uses the `start.setup` option:

```ts
// vite.config.ts
solid({
	start: {
		setup: "./src/setup.tsx",
	},
	ssr: true,
});
```

The configured module is server-only.
Its default export runs once per SSR request, after the middleware chain has dispatched to the page render and immediately before `renderToStream`:

```tsx
// src/setup.tsx
import type { RequestEvent } from "@solidjs/web";

export default async function setup(event: RequestEvent) {
	const url = new URL(event.request.url);
	const router = createRequestRouter(url.pathname + url.search); // your router's per-request factory
	await router.load();
	return () => <RouterProvider router={router} />;
}
```

Return a component and the generated entry renders it in `App`'s place inside `Document`; return nothing and `<App />` renders unchanged.
The browser-side `App` must produce the matching router tree so hydration lines up.
The [TanStack Router](/routing/tanstack#what-the-server-does-per-request) page shows a complete `setup.tsx`, including how it copies a redirect or a `404` from the router onto the response.

:::caution[Where the hook runs and where it does not]
`start.setup` runs only when a generated server entry renders an SSR request.
It is ignored when `ssr` is off, and configuring it together with an authored `entry-server` is a build error, because an authored entry already owns its render function and must perform the same preparation itself.
:::

### Middleware shares the event

The separate `start.middleware` option installs a fetch-style chain in front of page renders, server-function calls, API routes, and no-JavaScript form posts.
The chain and `start.setup` receive the same request event, so a value a middleware stores in `event.locals`, such as a session, is visible to the router instance the setup hook builds.
[Middleware and API routes](/building-apps/middleware-and-api-routes) covers the chain itself.

## Integrate single-flight mutations

Single-flight combines a mutation result and refreshed page data in one server-function response.
The platform transport supplies two router-neutral extension points, one on each side of the wire:

- On the client, registering a consumer with `subscribeFlightData` from `@solidjs/web/server-functions` is the opt-in.
  While any consumer is registered, the transport adds the single-flight request header to non-`GET` server-function calls; `GET` reads stay plain and cacheable.
- On the server, a `collectFlightData` hook receives the target URL the client will show next, the revalidation keys the mutation declared, and request headers with the mutation's cookie changes already folded in.

The server-function runtime awaits the consumer before resolving the call with the mutation value, so by the time the caller's `await` returns, the consumer has already seeded whatever cache it owns.
The integration decides everything in between: how to match the target URL, which loaders or preloads to rerun, what serializable payload to produce, and how to apply it on the client.

Register the server hook once, at startup, from a module the generated handler imports before it dispatches any server function:

```ts
// src/server-config.ts
import { configureServerFunctionsServer } from "@solidjs/web/server-functions/server";

configureServerFunctionsServer({
	collectFlightData: async (event, outcome) => {
		if (!outcome.targetUrl) return undefined;
		// match outcome.targetUrl against your route tree, run its loaders
		// (outcome.revalidateKeys scopes the work), and return a serializable
		// payload; undefined sends nothing
	},
});
```

```ts
// vite.config.ts
solid({
	start: true,
	serverFunctions: { configure: "./src/server-config.ts" },
});
```

The `configure` module is pinned into the handler graph, so it loads before the first dispatch on the development middleware and in the production handler alike.
An application with its own server-function handler passes `collectFlightData` to `handleServerFunctionRequest` per request instead.

The unnamed `collectFlightData` slot belongs to the integration that owns data production, a router.
A second cache, such as a query library refreshing its own entries, registers additively with `registerFlightDataSource(id, hook)` on the server and `subscribeFlightData(id, consumer)` on the client.
Each named source receives only its own slice of the payload, so the two do not compete for the slot or overwrite each other.

:::deep-dive[How the two supported routers use these hooks]
Solid Router supplies `createFlightDataCollector` from `@solidjs/router/server`.
It consumes the router's route tree, base, and root preload, then collects matched `query` results for the target URL.
On the client, it registers the mounted router when `singleFlight` is on, which is the default, and installs its flight consumer when the first router action is created.
The two sides use a rendezvous so either can load first: an action module in a lazily loaded route still attaches to the already mounted router, and a router-only app that never creates an action never subscribes, so the server is never asked to collect.
The consumer applies the response's redirect and revalidation metadata and seeds Solid Router's `query` cache from the payload.

TanStack Router's integration registers a named source instead.
Its `QueryClientProvider` subscribes as `"sq"` while mounted, the server hook builds a router for the target URL and runs its loaders into a fresh `QueryClient`, and the payload is a dehydrated TanStack Query cache that the client hydrates with TanStack's own `hydrate`.
[Single-flight on a router Solid does not own](/routing/tanstack#single-flight-on-a-router-solid-does-not-own) walks through that code.
:::

## Common problems

### The build fails with `start.setup only applies to generated entries`

The project has an authored `entry-server` and a `start.setup` option at the same time.
Remove one: either delete the authored entry so the generated one runs the hook, or move the preparation into the authored entry's own render function and drop `start.setup`.

### The setup module never runs

`start.setup` is server-mode only.
With `ssr: false` there is no per-request app render to prepare, so the option is accepted and ignored.
Check the `ssr` flag in `vite.config.ts` before looking at the module.

### Mutation responses carry no flight data

No consumer is subscribed on the client, so the transport does not send the single-flight header and the server skips collection; responses are byte-identical to a plain call.
Subscribe the consumer before the mutation is called, and check that the mutation is not declared `GET`, since `GET` calls never carry the header.

### The server hook runs but the payload is not applied

The hook returned a payload under a source id the client did not subscribe to, or the client subscribed under a different id.
The unnamed server hook pairs with the one-argument `subscribeFlightData(consumer)`; a named `registerFlightDataSource(id, hook)` pairs with `subscribeFlightData(id, consumer)`, and the ids must match exactly.

## Recap

- Read the request URL from the request event during SSR; the handler runs the render inside that event's scope.
- Use `start.setup` for a router that needs a per-request instance or asynchronous loading before render, and return the component to render in `App`'s place.
- `start.setup` applies only to generated server entries with `ssr` on; an authored entry does the same work itself.
- Values a middleware stores in `event.locals` are visible in the setup hook, because both receive the same request event.
- Opt in to single-flight on the client with `subscribeFlightData`; the header is sent on non-`GET` calls while a consumer is registered.
- Register the server-side `collectFlightData` hook from the `serverFunctions.configure` module so it loads before the first dispatch.
- Use `registerFlightDataSource` and the two-argument `subscribeFlightData` when a second cache shares the round trip.

## Next steps

- [TanStack Router](/routing/tanstack): a complete integration built on these hooks, with the setup module and the flight-data source in full.
- [Metadata and transport](/building-apps/server-functions/metadata-and-transport): what a server-function request and response look like on the wire, including the single-flight envelope.
- [App structure](/building-apps/app-structure): the generated entries, `Document`, and when to author an entry instead.
- [Middleware and API routes](/building-apps/middleware-and-api-routes): the `start.middleware` chain that runs before the setup hook.
