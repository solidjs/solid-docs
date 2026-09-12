---
title: "Reads, streams, and live data"
version: "2.0"
description: "Declare a product read that HTTP caches can store, stream order events from a server function, and keep a stock level connected when another shopper changes it."
---

The product page from the [Server functions](/building-apps/server-functions) page shows "3 left in stock".
Another shopper buys one, and the number on this page is wrong until someone reloads.
The same page fetches the product record on every visit, and because a server function call is a `POST` by default, no cache between the browser and the server is allowed to remember the answer.

Both problems are about how a read reaches the server.
`GET()` declares a read the transport may send as a cacheable `GET` request.
`live()` declares a read that produces values over time and reconnects when the connection drops, so the stock level follows the other shopper's purchase.

Most applications need the [GET read](#declare-a-get-read) section, and only when a read is called outside Solid Router's `query()`, plus [live sources](#declare-a-live-source) for a value that changes under the user.
Streams and connection status are for the parts of an app that consume events directly.

## Declare a GET read

Import `GET` from the server-functions entry and wrap the function:

```ts
// src/data/products.ts
import { GET } from "@solidjs/web/server-functions";

export const getProduct = GET(async (id: string) => {
	"use server";
	return database.products.find(id);
});
```

Load the product page and look at the network tab: the call is a `GET` to `/_server/data/<id>?args=%5B%22mug%22%5D`, with the arguments in the URL instead of a request body.
When the encoded URL would exceed the transport's length limit, the client sends the same call as a `POST` instead; the call succeeds, and the answer is not a cache entry.

A `GET()` declaration grants `GET` and `HEAD` dispatch and keeps the default `POST` path.
A function that never declared `GET()` answers a `GET` request with status 405.

Solid Router's `query()` makes the declaration for you: a plain `"use server"` function passed to `query()` is wrapped in `GET()` at that point, and a function you already declared passes through unchanged.
Write `GET()` yourself when you call the read outside `query()`, or when a router other than Solid Router does not declare it.

The wrapper needs a server function, not a plain async function:

```ts
// Avoid: no directive, so GET receives an ordinary function
export const getProduct = GET(async (id: string) => {
	return database.products.find(id);
});

// Prefer: the directive inside, the declaration outside
export const getProduct = GET(async (id: string) => {
	"use server";
	return database.products.find(id);
});
```

The `Avoid` version throws `GET expects a server function reference` when the module loads, and the database import stays in the client build because nothing marked the body for extraction.

:::pitfall[A secret in a GET argument ends up in a URL]
The arguments of a `GET()` read are the query string, and the query string is written to browser history, server access logs, and cache keys.

```ts
// Avoid: the session token travels in the URL
export const getOrders = GET(async (sessionToken: string) => {
	"use server";
	return database.orders.forSession(sessionToken);
});

// Prefer: read identity from the request event
export const getOrders = GET(async () => {
	"use server";
	const userId = getRequestEvent()?.locals.userId;
	if (!userId) throw redirect("/sign-in");
	return database.orders.forUser(userId);
});
```

The `Avoid` version leaves the token in every log line that records the request.
:::

Server-function responses leave with `Cache-Control: no-store` unless the function sets its own policy.
Declaring `GET()` makes a cache entry possible; a header makes it happen:

```ts
import { respond } from "@solidjs/web";
import { GET } from "@solidjs/web/server-functions";

export const getCatalog = GET(async () => {
	"use server";
	const products = await database.products.all();
	return respond(products, {
		headers: { "cache-control": "public, max-age=60" },
	});
});
```

Visit the catalog twice within a minute and the second request is answered from the browser cache without reaching the server.
`GET` also skips the same-origin check that protects `POST` calls, because a declared read is safe to run from any origin by contract; [Same-origin protection](/building-apps/server-functions/arguments-and-security#same-origin-protection) has the details.
Declare `GET()` only for a read that is safe and idempotent.

## Return a stream

A server function can return an async iterable, and the transport sends each yielded value over the open response as it is produced:

```ts
// src/data/orders.ts
export async function* orderEvents(orderId: string) {
	"use server";
	for await (const event of orderLog.subscribe(orderId)) {
		yield event;
	}
}
```

Consume it with `for await` in the browser and each event arrives when the server yields it.
Ending the iteration in the browser, with `break` or `return`, aborts the request and fires the server's `request.signal`, so the producer can clean up.

A streamed call owns one connection.
When the connection drops, the iteration ends with an error and nothing reopens it.
Use a stream for a sequence of events the consumer accumulates, such as an order's status history, and use `live()` when each value replaces the previous one.

## Declare a live source

A live source is value-shaped: each yield is the current answer to one question, not an event to add to a list.
The stock level for a product is one such question.

```ts
// src/data/inventory.ts
import { GET, live } from "@solidjs/web/server-functions";

export const stockLevel = live(
	GET(async function* (productId: string) {
		"use server";
		yield await inventory.count(productId);
		for await (const change of inventory.subscribe(productId)) {
			yield change.count;
		}
	})
);
```

Place `live()` outside `GET()`.
`GET()` chooses the read transport, and `live()` wraps the call behavior around it, so it must be the outermost declaration.
`live()` does not imply `GET()`; a live source without it streams over `POST`, which is fine when a cacheable URL is of no use.

The source yields the current count first, every time it is invoked.
That is the contract a reconnect depends on: when the connection drops and the client calls again, the first yield replaces the stale answer, and no client-side cache is needed to fill the gap.

## Read a live source reactively

Pass the returned async iterable through an async computation:

```tsx
// src/pages/Product.tsx
import { createMemo, Loading } from "solid-js";
import { stockLevel } from "../data/inventory";

function Stock(props: { productId: string }) {
	const source = stockLevel(props.productId);
	const count = createMemo(() => source);

	return (
		<Loading fallback={<span>Checking stock…</span>}>
			<output>{count()} left in stock</output>
		</Loading>
	);
}
```

Open the product in two browser windows and buy one from the first.
The count in the second window changes without a reload.

The first value can suspend the computation, so a `Loading` boundary above the read decides what shows until it arrives.
During server-side rendering, Solid renders the first value and hands subsequent work to the browser.

One iteration is one connection.
When several parts of the tree show the same stock level, hoist the memo and pass the value down:

```tsx
// Avoid: each component opens its own connection to the same source
function Stock(props: { productId: string }) {
	const count = createMemo(() => stockLevel(props.productId));
	// ...
}
function AddToCartButton(props: { productId: string }) {
	const count = createMemo(() => stockLevel(props.productId));
	// ...
}

// Prefer: one memo, one connection, the value passed down
function Stock(props: { count: number }) {
	return <span>{props.count} in stock</span>;
}
function AddToCartButton(props: { disabled: boolean }) {
	return <button disabled={props.disabled}>Add to cart</button>;
}
function Product(props: { productId: string }) {
	const count = createMemo(() => stockLevel(props.productId));
	return (
		<>
			<Stock count={count()} />
			<AddToCartButton disabled={count() === 0} />
		</>
	);
}
```

The `Avoid` version holds two open streams for one product, and each reconnects on its own when the network blips.

## Observe connection status

The returned iterable has an optional `onstatus` callback for the facts the reconnect loop removes from the value stream:

```tsx
import { createMemo, createSignal } from "solid-js";
import type { LiveSourceStatus } from "@solidjs/web/server-functions";

const source = stockLevel("mug");
const [status, setStatus] = createSignal<LiveSourceStatus>();

source.onstatus = (next) => setStatus(next);
const count = createMemo(() => source);
```

The callback receives:

- `"connected"` after each successful connection.
- `"reconnecting"` when a connected stream fails and the client starts retrying.
- `"closed"` when the source completes, the consumer ends iteration, or a definite rejection closes the source.

Show "reconnecting" next to the count when the user should know the number may be behind.
Put data freshness in the yielded value itself, such as a timestamp, when the UI needs to say how old the number is; the connection status is a transport fact and says nothing about the data.

:::deep-dive[What retries and what does not]
A failure before the first connection rejects like a normal server-function call, so a wrong id or a missing session surfaces where the call was made.
After a connection has succeeded, a failure retries with exponential backoff, and a healthy value resets the backoff.
A 4xx response is a definite rejection: the server understood the request and refused it, so retrying would not help, and the source fires `"closed"` with the error and rejects the consumer.
The exceptions are the statuses that ask for a retry, 408, 425, and 429, and any response carrying `Retry-After`; those reconnect like a 5xx after the named wait.
A live source updates through its open stream, so it takes no part in router revalidation or single-flight mutation data.
:::

## Common problems

### `Method not allowed for server function` in the server log, status 405

Something sent a `GET` or `HEAD` request to a function that was not declared with `GET()`.
Link checkers and prefetchers do this to any URL they find.
Declare the function with `GET()` when it is a safe read; leave the 405 in place when it is not.

### The read is never served from the cache

Three things must line up: the function is declared with `GET()`, the response sets a `Cache-Control` header other than the default `no-store`, and the encoded URL fits under the transport's length limit.
A read with a large argument, such as a long filter object, falls back to `POST` and misses the cache without an error.

### The network tab shows two open streams for one product

Two components each called `stockLevel(id)`, and every call site that invokes a live source holds its own connection and reconnects on its own.
Hoist the memo to the nearest common parent and pass the value down, as in [Read a live source reactively](#read-a-live-source-reactively).

### A live source stops after a network error and never comes back

The failure was a 4xx, which the client treats as a definite rejection, or it happened before the first connection ever succeeded.
Check the server log for the status: the client retries only transient failures after a successful connection, and a refused request needs a fix on the request rather than a wait.

## Recap

- Declare a read with `GET()` when it is safe and idempotent and is called outside Solid Router's `query()`; `query()` declares it for you.
- A `GET()` read puts its arguments in the URL; keep secrets out of them and read identity from the request event.
- Responses leave with `Cache-Control: no-store`; return `respond(value, { headers })` to opt a read into caching.
- Return an async iterable to stream events over one connection; ending the iteration in the browser ends the server producer.
- Declare a value that changes over time with `live(GET(fn))`, `live()` outermost, and yield the current value first on every invocation.
- Read a live source through one memo and pass the value down; each call site that invokes the source opens its own connection.
- Use `onstatus` to show a reconnect; put data freshness in the yielded value.

## Next steps

- [Arguments and security](/building-apps/server-functions/arguments-and-security): what a caller can put in a read's arguments, and why the read must validate them.
- [Async reactivity](/concepts/async-reactivity): what the product page shows while a `GET()` read or a live source has not answered yet.
- [Data fetching patterns](/guides/data-fetching-patterns): search as you type, pagination, and keeping data fresh, with these reads underneath.
- [Data loading and mutations](/routing/solid-router/data): wrapping reads in `query()` for caching and route preloading with Solid Router.
