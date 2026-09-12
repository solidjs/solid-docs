---
title: "Server functions"
version: "2.0"
description: 'Move a database query or a secret out of the browser by marking a function with "use server", and recognize what that call becomes on the wire.'
---

The product page needs the product record.
The record lives in a database, the database client needs a connection string, and neither the client nor the string can ship to the browser.
The usual answer is a separate HTTP API: a route module, a fetch call, a type for the response, and two places to keep in step.

A server function is the same call without the second place.
Add `"use server"` to the function, keep calling it from the component, and the build moves the body to the server and leaves a typed stub in the browser that makes the HTTP request for you.

```ts
// src/data/products.ts
import { database } from "./database";

export async function getProduct(id: string) {
	"use server";
	return database.products.find(id);
}
```

```tsx
// src/pages/Product.tsx
import { createMemo, Loading } from "solid-js";
import { getProduct } from "../data/products";

export function Product(props: { id: string }) {
	const product = createMemo(() => getProduct(props.id));

	return (
		<Loading fallback={<p>Loading…</p>}>
			<h1>{product().name}</h1>
			<p>{product().description}</p>
		</Loading>
	);
}
```

Open the network tab and load the page in the browser: the call is a `POST` to `/_server/data/<id>` whose body carries `["mug"]`, and the response carries the product as the function returned it.
Search the client bundle for `database` and it is not there.
The component did not change; `getProduct` returns a promise on both sides, so the [Async reactivity](/concepts/async-reactivity) rules apply to it unchanged.

Server functions work without a router.
Solid Router's `query()` and `action()` add caching, submissions, and revalidation on top of them, and [Data loading and mutations](/routing/solid-router/data) covers that layer.

## Enable server functions

Turn on the transform with the `serverFunctions` option in start mode:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
	plugins: [
		solid({
			start: true,
			ssr: true,
			serverFunctions: true,
		}),
	],
});
```

The `solid-v2/fullstack` and `solid-v2/fullstack-tanstack` templates ship with this configuration.

## Declare a server function

Add `"use server"` as the first statement of a function body:

```ts
export async function getProduct(id: string) {
	"use server";
	return database.products.find(id);
}
```

The server build keeps the body and registers it under a stable id.
The client build replaces the body with a reference that sends the arguments to the server-function endpoint and returns the decoded result.
Imports used only inside the body, such as the database client or a validation schema, are removed from the client build along with it.

The body runs at module top level on the server, so it can use module-scope bindings and nothing in between:

```tsx
// Avoid: the server function reads a variable from the component's scope
function AddToCart(props: { productId: string }) {
	const productId = props.productId;
	async function add() {
		"use server";
		await database.cart.add(productId);
	}
	return <button onClick={add}>Add to cart</button>;
}

// Prefer: pass the value as an argument
async function addToCart(productId: string) {
	"use server";
	await database.cart.add(productId);
}

function AddToCart(props: { productId: string }) {
	return (
		<button onClick={() => addToCart(props.productId)}>Add to cart</button>
	);
}
```

The `Avoid` version does not build.
The compiler reports ``server functions cannot capture non-top-level variables: `productId` is declared in an enclosing function`` with the file and line, because the extracted body would read a variable that does not exist where it runs.

:::caution[The directive goes on a function, not a method]
A `"use server"` string inside a class method, getter, or setter is not extracted, and the compiler rejects it with `a "use server" directive has no effect on a method`.
Assign a function to a property, or declare the function at module level, when a class needs to call one.
:::

## Declare a server module

Place the directive at the top of a module to make every export a server function:

```ts
// src/data/catalog.ts
"use server";

import { database } from "./database";

export async function listProducts() {
	return database.products.all();
}

export async function countProducts() {
	return database.products.count();
}
```

Each export must evaluate to a function.
Named functions, default exports, aliases, and wrappers are fine; a non-function export stops the server while the module loads, with an error naming the export and stating that it `is not a function`.

The whole module runs on the server, so closures inside it are intact and a wrapper applied at module scope becomes part of the registered implementation:

```ts
// src/data/orders.ts
"use server";

import { getRequestEvent, redirect } from "@solidjs/web";
import { database } from "./database";

const withAccount =
	<A extends unknown[], R>(fn: (userId: string, ...args: A) => Promise<R>) =>
	async (...args: A) => {
		const userId = getRequestEvent()?.locals.userId;
		if (!userId) throw redirect("/sign-in");
		return fn(userId, ...args);
	};

export const listOrders = withAccount(async (userId) => {
	return database.orders.forUser(userId);
});
```

Call `listOrders()` without a session and the redirect fires, whether the call came over HTTP or from a server render.

:::note[Two kinds of wrapper]
A module-level wrapper such as `withAccount` runs inside the server implementation, so it applies to every call path.
Declaration wrappers such as `GET()`, `live()`, and `withMeta()` wrap a function-level `"use server"` reference from the outside; they configure how the reference is called and never run server-side policy.
[Arguments and security](/building-apps/server-functions/arguments-and-security#validate-caller-controlled-values) shows what that difference means for validation.
:::

## What the call becomes

In the browser, a call is an HTTP request to the server-function endpoint, `/_server` by default.
The client runtime posts to `/_server/data/<id>` and reads the response through Solid's codec.
The bare address, `/_server/<id>`, answers plain HTTP for everything that is not the client runtime: HTML form posts, and anything a person can type into a terminal.

```bash
curl -X POST 'https://shop.example/_server/<id>?args=%5B%22mug%22%5D' \
	-H 'Origin: https://shop.example'
```

That request runs `getProduct("mug")` and answers with the product as a JSON body.
Every server function is reachable this way, which is why [Arguments and security](/building-apps/server-functions/arguments-and-security) treats every argument as untrusted.

During server-side rendering, the same `getProduct(props.id)` call does not make an HTTP request.
The implementation runs in the current server process under a request event derived from the page request, marked `serverOnly: true`, with a per-call copy of `locals`.
The values middleware placed on `locals`, such as the signed-in user, are visible on both paths.

:::deep-dive[Why there are two addresses]
A shared cache stores one answer per URL.
If the scripted and plain answers shared an address, a cached codec-encoded body could be replayed to a form post, or a plain JSON body to the client runtime.
Putting the caller kind on the URL, `/data/<id>` against `/<id>`, keeps the two answer shapes in two cache entries.
The `X-Server-Function-Instance` header the client runtime sends identifies the call for logging and the no-JavaScript convention; it does not decide the answer shape.
:::

## Common problems

### The call resolves to a `Response` object instead of data

The function returned `redirect()` or `reload()`, and the caller was plain code rather than a router action.
The client transport hands responses that carry navigation or revalidation metadata back whole, so the integration that owns navigation can apply them.
Call the function through Solid Router's `action()`, or return a value and let the caller decide where to go; [Mutations and responses](/building-apps/server-functions/mutations-and-responses#redirect-the-caller) covers both.

### The build fails with `server functions cannot capture non-top-level variables`

The function body reads a variable declared between module scope and the function, such as a component prop or a loop variable.
Pass the value as an argument, or move the function to module scope.

### The database import is in the browser bundle

The build removes an import only when nothing outside a `"use server"` body references it.
A type import is free, but a value reference in the component, such as `database.products.count` used for a badge, keeps the whole module in the client build.
Move that read into a server function, or put the import in a `"use server"` module so no client code can reach it.

### The function body runs in the browser

The `serverFunctions` option is off.
Without the transform, `"use server"` is a string expression the engine evaluates and ignores, and the body runs wherever it is called.
Check `vite.config.ts` against the [Enable server functions](#enable-server-functions) section.

### `Cannot call server function outside of a request` on the server

Server code called the function with no request event in scope: a module-level call, a scheduled job, or a test that did not provide an event.
The in-process call derives its event from the current request, so it needs one.
Call the function from a render, a middleware, or another server function, or provide an event with [`provideRequestEvent`](/reference/solid-web/request-response/provide-request-event) in tests.

## Recap

- Add `"use server"` as the first statement of a function, or at the top of a module to cover every export.
- A server function may read its parameters, module-scope bindings, and globals; pass anything from a component scope as an argument.
- Imports referenced only inside the body stay out of the client build; a reference outside the body keeps them in.
- In the browser a call is `POST /_server/data/<id>`; the bare `/_server/<id>` answers plain HTTP for forms and scripts.
- During server rendering the same call runs in-process under a `serverOnly` request event; no HTTP is involved.
- Module-level wrappers run on every call path; `GET()`, `live()`, and `withMeta()` configure the reference and run no server-side policy.
- Anyone can send a request to a server function, so validate and authorize inside the body.

## Next steps

- [Reads, streams, and live data](/building-apps/server-functions/reads-and-live-data): declare a read that HTTP caches can store, and keep a stock level connected when another shopper changes it.
- [Arguments and security](/building-apps/server-functions/arguments-and-security): what a caller can send, what the transport can encode, and how to validate and authorize every request.
- [Mutations and responses](/building-apps/server-functions/mutations-and-responses): return a redirect, a reload, or a 400 from a cart mutation, and control what a thrown error reveals.
- [Data loading and mutations](/routing/solid-router/data): wrap the same functions in `query()` and `action()` for caching, submissions, and revalidation.
