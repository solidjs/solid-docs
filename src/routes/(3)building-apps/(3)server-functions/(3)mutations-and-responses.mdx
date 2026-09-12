---
title: "Mutations and responses"
version: "2.0"
description: "Return a value, a redirect, a reload, or a 400 from a cart or account mutation, and control what a thrown error reveals in production."
---

The Add to cart form on the product page posts to `addToCart`.
When the write succeeds, the browser should land on the cart with the new line in it.
When the quantity is not a whole number, the caller should get a 400 and a message it can show next to the field.
When the database is down, the caller should get an error, and that error must not contain the failing query.

A return value can carry the cart line.
It cannot carry a status, a `Location`, or the instruction to refresh the cart, so those go through the response helpers in `@solidjs/web`.
Most applications need [`redirect()`](#redirect-the-caller), [`reload()`](#request-revalidation), and `throw respond(...)` from [Handle thrown errors](#handle-thrown-errors); the envelope internals are for integrators.

Mutations stay on the default `POST` transport, which is origin-checked.
Declare `GET()` only for reads.

## Return a value with response metadata

`respond()` pairs a value with a status and headers:

```ts
// src/data/admin.ts
import { getRequestEvent, respond } from "@solidjs/web";

export async function createProduct(input: CreateProductInput) {
	"use server";

	const userId = getRequestEvent()?.locals.userId;
	if (!userId || !(await database.users.isAdmin(userId))) {
		throw respond({ error: "Forbidden" }, { status: 403 });
	}

	const product = await database.products.create(input);
	return respond(product, {
		status: 201,
		headers: { "x-created-product": product.id },
	});
}
```

Call `createProduct(input)` from the admin page and the promise resolves to `product`, not to the envelope.
The transport applies the 201 and the header to the HTTP response, and a plain HTTP caller such as `curl` receives a JSON body with the same product in it.

:::deep-dive[The envelope on the wire]
`respond()` returns a `ResponseEnvelope`, an object holding the `Response` that carries the metadata and the `value` the caller should see.
The server-function handler forwards the response's status and headers and encodes the value as the body.
Integration code that has to recognize an envelope, such as a router applying revalidation, uses [`isResponseEnvelope()`](/reference/solid-web/request-response/respond); the check is a registered symbol, so it works when a bundle contains two copies of the runtime.
Application code never touches the envelope directly.
:::

## Redirect the caller

`redirect()` returns a `Response` with a `Location` header:

```ts
// src/data/account.ts
import { getRequestEvent, redirect } from "@solidjs/web";

export async function deleteAccount() {
	"use server";

	const event = getRequestEvent();
	const userId = event?.locals.userId;
	if (!userId) throw redirect("/sign-in");

	await database.users.remove(userId);
	return redirect("/goodbye", { revalidate: "session" });
}
```

Return a redirect when it is the successful outcome, and throw it when it is an early exit, as in the sign-in check above.
Both reach the caller the same way.

What the browser does next depends on who made the call.
A Solid Router `action()` navigates to `/goodbye` without a page load.
An HTML form post without JavaScript is answered with the redirect itself, 302 by default, and the browser follows it.
Plain code that called `deleteAccount()` directly receives the `Response` object as the resolved value, because the transport hands navigation metadata back whole for the caller to apply.

The target can be a string or an `Href` produced by a router's typed paths helper; a branded `Href` redirects to its logical path.
Any other object throws `redirect() expects a string URL or an Href-branded value`.

## Request revalidation

`reload()` returns a response that tells an integration which cached reads are stale:

```ts
// src/data/cart.ts
import { reload } from "@solidjs/web";

export async function addToCart(productId: string, quantity: number) {
	"use server";

	await database.cart.add(currentSessionId(), productId, quantity);
	return reload({ revalidate: "cart" });
}
```

Call `addToCart("mug", 1)` through a router action and the cart query refetches when the call settles; nothing else on the page is touched.
Omit `revalidate` to ask for every cached read to refresh.

Core carries the keys in an `X-Revalidate` header and does not define a cache.
Solid Router reads the header against its query cache; [What revalidates after a mutation](/routing/solid-router/data#what-revalidates-after-a-mutation) explains the matching.
`respond()` and `redirect()` accept the same `revalidate` option, for a mutation that also returns a value or changes location.

## Handle thrown errors

A returned or thrown `Response` or envelope is control flow, and the handler preserves its status, headers, and value.
A plain thrown value is treated as an accident:

```ts
// Avoid: a plain Error carries whatever message the failure had
export async function addToCart(productId: string, quantity: number) {
	"use server";
	if (!Number.isInteger(quantity) || quantity < 1) {
		throw new Error("Quantity must be a whole number");
	}
	await database.cart.add(currentSessionId(), productId, quantity);
	return reload({ revalidate: "cart" });
}

// Prefer: a response envelope for a failure the caller should see
export async function addToCart(productId: string, quantity: number) {
	"use server";
	if (!Number.isInteger(quantity) || quantity < 1) {
		throw respond(
			{ field: "quantity", message: "Quantity must be a whole number" },
			{ status: 400 }
		);
	}
	await database.cart.add(currentSessionId(), productId, quantity);
	return reload({ revalidate: "cart" });
}
```

In development the `Avoid` version rejects with the message as written.
In production the same call rejects with `Error("Internal Server Error")`: the handler replaces every unbranded thrown value before serializing it, so a database driver's failing query or connection string cannot reach the browser, and the quantity message goes with it.
The `Prefer` version rejects with `{ field, message }` and status 400 in every environment.

The line between the two behaviors is the build, not `NODE_ENV`.
`@solidjs/web` ships a development copy of the server-function handler behind the `development` export condition, which Vite's dev server resolves; every other resolution, including a production build and a plain Node process, sanitizes.

When the failure is an `Error` whose message is meant for the user, brand it instead of wrapping it:

```ts
import { markSafeError } from "@solidjs/web";

throw markSafeError(new Error("This coupon has expired"));
```

The brand lets the message and own properties cross the boundary in production.
Do not brand an error you did not construct: an error from a driver or a third-party client can carry anything in its properties.
Integration code can test the brand with [`isSafeError()`](/reference/solid-web/request-response/safe-errors).

:::pitfall[Returning a 400 makes the call succeed]
Only a thrown outcome rejects the caller.

```ts
// Avoid: returned, so the caller's promise resolves with the issues
return respond({ issues }, { status: 400 });

// Prefer: thrown, so the caller's promise rejects with the issues
throw respond({ issues }, { status: 400 });
```

With the `Avoid` version the HTTP response is a 400, and the promise in the browser resolves as if the write had worked; a router action records it as a successful submission with `{ issues }` as its result.
The status on a returned envelope is for HTTP callers; the throw is what tells the caller something failed.
:::

## Add router submissions

Solid Router's `action()` turns a server function into something a form can post to and the router can track:

```ts
// src/data/cart.ts
import { action } from "@solidjs/router";
import { reload } from "@solidjs/web";

export async function addToCart(form: FormData) {
	"use server";

	const productId = String(form.get("productId") ?? "");
	const quantity = Number(form.get("quantity") ?? 1);
	if (!Number.isInteger(quantity) || quantity < 1) {
		throw respond(
			{ field: "quantity", message: "Enter a whole number" },
			{ status: 400 }
		);
	}

	await database.cart.add(currentSessionId(), productId, quantity);
	return reload({ revalidate: "cart" });
}

export const addToCartAction = action(addToCart);
```

Render `<form method="post" action={addToCartAction}>` and the form posts to the function's URL before JavaScript loads; after hydration the router intercepts the submit, calls the function over the transport, and applies the `reload`.
The router marks the form `aria-busy` while it runs and, once it settles, records a submission whose `error` is the thrown envelope's value, which the [Forms guide](/guides/forms) reads to show messages next to the fields.

Keep the server function a named export and wrap it separately, as above, so a test or an API route can call `addToCart` without the form.
When the function exists only for the form, write the body inline, `action(async (form: FormData) => { "use server"; ... })`; the [Data loading and mutations](/routing/solid-router/data#mutate-with-actions) page uses that shape throughout, and the two behave the same.

:::note[Which action]
`action` here is from `@solidjs/router`.
`solid-js` also exports an [`action`](/reference/solid-js/lifecycle-actions/action), which runs a generator as a reactive transaction and has no URL; [Mutations](/concepts/mutations) covers it.
A form needs the router's.
:::

When the router registers its single-flight integration, the mutation response can carry refreshed route data alongside the result; the server-function runtime treats that payload as opaque.

## Common problems

### The message is right in development and `Internal Server Error` in production

The function threw a plain `Error`, a string, or an object.
Production sanitizes every unbranded thrown value.
Throw `respond(value, { status })` for a structured failure, or `markSafeError(new Error(message))` for a message meant for the user.

### The 400 arrives as a successful result

The envelope was returned instead of thrown.
A returned envelope resolves the caller with its value whatever the status; `throw respond(...)` is what rejects.

### The redirect comes back as a `Response` object

The function was called directly rather than through a router action, and the transport hands responses that carry a `Location` or `X-Revalidate` header back whole.
Call the function through `action()`, or return a value and navigate in the caller.

### `redirect()` throws a `TypeError` about an Href-branded value

The first argument was an object that is not a string and not a router `Href`.
Pass a string path, or the value a router's typed paths helper returns.

## Recap

- Return a plain value when the caller needs data and nothing else; use `respond()` to add a status or headers to it.
- Return or throw `redirect(path)`; a router action navigates, a form post follows the redirect, and direct code receives the `Response`.
- Return `reload({ revalidate })` after a write so the router refetches the named reads.
- Throw `respond(value, { status })` for a failure the caller should see; a returned envelope resolves the caller whatever its status.
- A plain thrown value becomes `Internal Server Error` in production; `markSafeError()` opts one `Error` out of that.
- The development build is selected by the `development` export condition, not by `NODE_ENV`.
- Wrap a named server function with the router's `action()` for forms and submissions; write it inline only when nothing else calls it.

## Next steps

- [Progressive enhancement](/building-apps/server-functions/progressive-enhancement): the same Add to cart form submitted before JavaScript loads, and what the runtime does with the 303.
- [Forms](/guides/forms): the checkout address form, with the thrown 400 shown as inline field messages.
- [Metadata and transport](/building-apps/server-functions/metadata-and-transport): attaching a header to every call and cancelling a call in flight.
- [Mutations](/concepts/mutations): the client side of a mutation, with optimistic state and the reactive `action` from `solid-js`.
