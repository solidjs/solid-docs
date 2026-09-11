---
title: "Metadata and transport"
version: "2.0"
description: "Read a server-function request in the network tab, attach a header to every call, move the endpoint, and cancel one call in flight."
---

Open the network tab and click Add to cart.
The request is a `POST` to `/_server/data/<id>`, it carries `X-Server-Function-Instance` and `X-Server-Function-Format` headers the client runtime added, its body is the argument array, and the response leaves with `Cache-Control: no-store`.
Nothing on the product page asked for any of that; the transport has defaults, and most applications never change them.

This page is for the three cases where the defaults are not enough: every request needs a header that changes during the session, such as a bearer token; the endpoint has to live somewhere other than `/_server`; or one call needs to be cancelled while it is in flight.
Most applications need [Prepare every client request](#prepare-every-client-request) and [Configure one call](#configure-one-call).
Declaration metadata and invocation identity are for integrators and data layers.

## Attach declaration metadata

`withMeta()` attaches static metadata to a server-function reference:

```ts
// src/data/checkout.ts
import { withMeta } from "@solidjs/web/server-functions";

export const placeOrder = withMeta(
	async (cartId: string) => {
		"use server";
		return orders.place(cartId);
	},
	{ requiresAuth: true }
);
```

Nothing changes on the wire yet.
Metadata describes the function so that a `prepareRequest` hook or a data layer can read it; it runs no policy on its own:

```ts
// Avoid: metadata alone, expected to enforce something
export const placeOrder = withMeta(
	async (cartId: string) => {
		"use server";
		return orders.place(cartId);
	},
	{ requiresAuth: true }
);

// Prefer: the check in the body, metadata as the hint the client reads
export const placeOrder = withMeta(
	async (cartId: string) => {
		"use server";
		if (!getRequestEvent()?.locals.userId) throw redirect("/sign-in");
		return orders.place(cartId);
	},
	{ requiresAuth: true }
);
```

The `Avoid` version places any order for any caller; `requiresAuth` is a value on the reference, and the server never reads it.

Later `withMeta()` calls shallow-merge over earlier metadata.
`GET()` uses the same channel for its HTTP method, and the two compose in either order.
`live()` wraps the call behavior, so it goes outside both:

```ts
export const stockLevels = live(
	withMeta(
		GET(async function* () {
			"use server";
			yield* inventory.levels();
		}),
		{ channel: "inventory" }
	)
);
```

Integration code reads a declaration with `getServerFunctionMetadata(fn)` and checks that an unknown callable is a reference with `isServerFunction(fn)`.
Every reference exposes its stable `id` and its current `url`.

## Prepare every client request

`configureServerFunctionsClient()` configures the browser transport, and its `prepareRequest` hook runs before each fetch:

```ts
// src/entry-client.tsx
import { configureServerFunctionsClient } from "@solidjs/web/server-functions";

configureServerFunctionsClient({
	prepareRequest(init, { meta }) {
		if (!meta?.requiresAuth) return init;

		const headers = new Headers(init.headers);
		headers.set("authorization", `Bearer ${session.token()}`);
		return { ...init, headers };
	},
});
```

Click Add to cart again and the request to `placeOrder` carries an `authorization` header; a call to `getProduct`, which has no `requiresAuth` metadata, does not.
The hook receives the final `RequestInit` the transport is about to send, the function id, and the declaration metadata.

Use `prepareRequest` for policy that changes during a browser session: an OAuth token, a tracing header, a tenant id.
The configuration accepts one hook, so compose several policies inside one function.

:::caution[Call it before the first server function runs]
`configureServerFunctionsClient()` configures the transport for calls that have not started yet.
Call it once in the client entry, next to `hydrate()`, before any component that calls a server function renders.
:::

## Configure a custom endpoint

The default endpoint is `/_server`.
In start mode, the `serverFunctions.endpoint` option in `vite.config.ts` moves it, and the plugin configures the client and the server to match.

Configure the runtime directly only when you own both the client entry and the host:

```ts
configureServerFunctionsClient({
	endpoint: "/app/_server",
});
```

The client endpoint must be the path where the server mounts `handleServerFunctionRequest()`, base path included.
A mismatch shows up as 404s for every call, with nothing else wrong.

## Configure one call

`invoke()` calls a server-function reference with options that belong to one call:

```ts
// src/pages/checkout/Address.tsx
import { invoke } from "@solidjs/web/server-functions";
import { saveAddress } from "../../data/checkout";

const controller = new AbortController();

const result = invoke(
	saveAddress,
	{ signal: controller.signal, priority: "high" },
	{ name: "Ada", street: "1 Loop Road", postalCode: "12345" }
);

controller.abort();
await result;
```

The `await` rejects with the abort reason, and the browser cancels the request.

`invoke()` accepts three options:

- `signal` cancels the caller and the HTTP request.
- `keepalive` lets a small request continue while the page unloads.
- `priority` is a Fetch priority hint.

Build deadlines and combined cancellation with `AbortSignal.timeout()` and `AbortSignal.any()`.

Anything with a longer lifetime than one call is refused:

```ts
// Avoid: a header on one call
invoke(saveAddress, { headers: { authorization: token } }, address);

// Prefer: session policy in prepareRequest, static shape on the declaration
configureServerFunctionsClient({
	prepareRequest(init) {
		const headers = new Headers(init.headers);
		headers.set("authorization", token);
		return { ...init, headers };
	},
});
invoke(saveAddress, { signal }, address);
```

The `Avoid` version throws `` `headers` is not an invocation option `` with a pointer to where the option belongs.
Set headers in `prepareRequest`, declare reads with `GET()`, attach static values with `withMeta()`, and implement retries or deduplication in the data layer that owns the call.

:::note[Abort during server rendering]
During an in-process call on the server, an abort signal rejects the caller, and the underlying work runs to completion unless the function observes a signal of its own.
`keepalive` and `priority` have no effect there, because the direct call has no network request.
:::

Wrappers around a reference must forward the invocation channel for `invoke()` to reach it.
Application code normally uses the reference directly or through a data layer that already handles this composition.

:::advanced[Read the current invocation]
`getServerFunctionInvocation()` returns the identity of the server function that is executing, for logs and per-call cache keys:

```ts
import { getServerFunctionInvocation } from "@solidjs/web/server-functions";

export async function loadAccount() {
	"use server";

	const invocation = getServerFunctionInvocation();
	logger.info({ serverFunctionId: invocation?.id });
	return database.accounts.current();
}
```

Invocation identity describes the current call; `getServerFunctionMetadata(fn)` describes a declaration.
Use the first for logs and the second for transport policy.
:::

## Common problems

### Every call answers 404 after moving the endpoint

The client endpoint and the server mount point differ.
Set `serverFunctions.endpoint` in `vite.config.ts` so the plugin configures both, or check that `configureServerFunctionsClient({ endpoint })` names the exact path, base path included, where `handleServerFunctionRequest()` is mounted.

### `invoke()` throws that an option is not an invocation option

The options bag contained something other than `signal`, `keepalive`, or `priority`, such as `headers` or `method`.
Move headers to `prepareRequest`, the method to `GET()`, and static values to `withMeta()`.

### `invoke()` throws that the wrapper does not forward the invocation channel

The reference passed to `invoke()` is a wrapper, such as a cache or a channel, that shares calls between callers and did not opt in.
Invoke the underlying reference directly, or use the wrapper's own per-call options.

### The `authorization` header is missing on some calls

`prepareRequest` returned `init` unchanged for that call, or `configureServerFunctionsClient()` ran after those calls were made.
Check the condition in the hook against the metadata on the reference, and move the configuration to the client entry, before the first call.

## Recap

- The defaults are a `POST` to `/_server/data/<id>` with the argument array as the body and `Cache-Control: no-store` on the response; change them only for a reason on this page.
- Attach static facts to a declaration with `withMeta()`; the server does not read them, so enforce policy in the body.
- Compose `withMeta()` and `GET()` in either order, and put `live()` outside both.
- Add session-dependent headers in one `prepareRequest` hook, configured once in the client entry before the first call.
- Move the endpoint with the plugin's `serverFunctions.endpoint` option so client and server stay matched.
- Pass `signal`, `keepalive`, or `priority` to one call through `invoke()`; anything longer-lived is refused with a pointer to its home.
- On the server, an abort rejects the caller and does not stop the work.

## Next steps

- [Progressive enhancement](/building-apps/server-functions/progressive-enhancement): the URL each server function exposes, and how a form posts to it before JavaScript loads.
- [Vite plugin server-function options](/reference/vite-plugin-solid/server-functions): the host-side configuration that pairs with the client settings on this page.
- [Deployment](/building-apps/deployment): where a custom endpoint has to be routed when the app runs behind a provider.
