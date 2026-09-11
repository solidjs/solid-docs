---
title: "State management"
version: "2.0"
description: "Decide where each piece of storefront state lives: a component, a context provider, the URL, or the server, and keep it out of module scope in code that also runs on the server."
---

The search page from [Thinking in Solid](/guides/thinking-in-solid) ended with a cart count created inside the `Search` component.
The header shows that count on every page, so it has to move.
The same question comes up for the signed-in customer's name, the search filter that should survive a refresh, the product catalog, and the open flag on the **Remove item?** dialog.

Each of those has one right home, and the wrong home shows up as a symptom: a count that resets when the page changes, a filter that clears on refresh, a dialog that stays open after the user navigates away, or a cart that belongs to a different visitor.
This guide goes through the homes one at a time and ends with a decision list.

## Five kinds of state

| Kind                | Storefront example                            | Home                                                  |
| ------------------- | --------------------------------------------- | ----------------------------------------------------- |
| Local               | A dialog's open flag, a hovered row           | A signal or store in the component that renders it    |
| Shared by a subtree | The cart, read by the header and the checkout | A store created in a provider, read through context   |
| Shared by the app   | The current customer, the theme               | The same provider, placed at the root of `App`        |
| In the URL          | Search query, category, sort, page            | Search parameters, read with `useSearchParams`        |
| On the server       | The catalog, orders, the session              | Server functions; the client holds a view, not a copy |

The first three differ only in where the provider sits.
The last two are not held in Solid state at all: the URL and the server own them, and components read them through a router primitive or a server function.

## Local state stays local

The **Remove item?** dialog needs one boolean:

```tsx
import { Show, createSignal } from "solid-js";

function RemoveButton(props: { onConfirm: () => void }) {
	const [open, setOpen] = createSignal(false);

	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Remove
			</button>
			<Show when={open()}>
				<dialog open>
					<p>Remove this item?</p>
					<button type="button" onClick={() => setOpen(false)}>
						Keep
					</button>
					<button
						type="button"
						onClick={() => {
							setOpen(false);
							props.onConfirm();
						}}
					>
						Remove
					</button>
				</dialog>
			</Show>
		</>
	);
}
```

Click **Remove** and the dialog appears; click **Keep** and it goes away.
When the row is removed from the list, `RemoveButton` is disposed and the signal goes with it, so the next row's dialog starts closed.

Nothing else needs `open`, so nothing else should be able to see it.
State created in a component is owned by that component: Solid disposes it when the component leaves the page, and a fresh instance gets a fresh value.
[Ownership](/concepts/reactivity#ownership) explains what disposal covers.

Lift the value only when a second component needs it.
If the cart page also wants to disable every other **Remove** button while one dialog is open, `open` moves to the list component and reaches each row as a prop.
Props are reactive on their own, so a lifted value costs nothing but the two lines that pass it down; [Props](/concepts/components-and-jsx#props) shows why.

## Share with context

The header badge and the checkout page are far apart in the tree, and threading the cart through every layout between them would make each layout know about a cart it does not use.
Create the cart once in a provider and let both read it:

```tsx
// src/cart.tsx
import {
	action,
	createContext,
	createStore,
	refresh,
	useContext,
	type ParentProps,
} from "solid-js";
import { addToCart, getCart } from "./data/cart";

type CartItem = { id: string; name: string; quantity: number };

function createCart() {
	const [cart] = createStore(() => getCart(), { items: [] as CartItem[] });

	const add = action(function* (item: CartItem) {
		yield addToCart(item.id);
		refresh(cart);
	});

	return { cart, add };
}

const CartContext = createContext<ReturnType<typeof createCart>>();

export function CartProvider(props: ParentProps) {
	return <CartContext value={createCart()}>{props.children}</CartContext>;
}

export function useCart() {
	return useContext(CartContext);
}
```

```tsx
export default function App() {
	return (
		<Router>
			{(props) => (
				<CartProvider>
					<Header />
					<Loading fallback={<main>Loading…</main>}>{props.children}</Loading>
				</CartProvider>
			)}
		</Router>
	);
}
```

```tsx
function Header() {
	const { cart } = useCart();
	return (
		<Loading fallback={<span>Cart</span>}>
			<span>Cart ({cart.items.length})</span>
		</Loading>
	);
}
```

Navigate from the search page to the checkout page and the badge keeps its number.
`createCart()` ran once, inside `CartProvider`, when `App` rendered; the pages under it come and go, and the provider stays.

The context object returned by [`createContext`](/reference/solid-js/components-context/create-context) is also the provider component, and it creates a scoped owner for its children.
`useCart()` returns the same object from anywhere below the provider without a prop on any component in between.
[Share state between components](/concepts/reactivity#share-state-between-components) introduced this shape; the rest of this section is about what to put in `value`.

### Pass a store or accessors, not a snapshot

The provider reads `value` once, when it is created.
Whatever is in the object at that moment is what every consumer gets:

```tsx
// Avoid: the count is read here, once, and the consumers get a number
<CartContext value={{ count: cart.items.length }}>

// Prefer: the consumers read the store themselves, in their own tracking scopes
<CartContext value={{ cart, add }}>
```

Run the `Avoid` version and add an item: the badge keeps the number the provider saw when it ran, because nothing runs the provider's `value` expression a second time.
In the `Prefer` version `cart` is the store proxy, and `cart.items.length` in the header is a tracked read that updates when the length changes.
The rule is the same one that applies to props: pass the reactive value and read it where it is used.

### Default value or thrown error

`createContext<T>()` with no default makes the provider mandatory: `useContext` outside one throws `ContextNotFoundError`, and its return type is `T` with no `undefined` to narrow.
That is the right form for anything that carries reactive state, because a cart that silently reads as `undefined` is a bug found later than one that throws at the first read.

`createContext<T>(defaultValue)` returns the default outside a provider.
Reserve it for a primitive with a meaningful fallback, such as a theme name or a locale, where a component rendered on its own in a test or a story should still work.

:::deep-dive[How a context read resolves]
Each owner carries a context record inherited from its parent.
`useContext` looks the context up on the current owner's record; if the entry is `undefined` it falls back to the context's default, and if that is `undefined` too it throws `ContextNotFoundError`.
A provider writes its `value` into a fresh copy of the record for the owner it creates, so siblings and ancestors never see it, and a nested provider for the same context replaces the value for its own subtree only.
The lookup needs an owner, which is why `useContext` is called during component setup rather than inside an event handler.
:::

## Module-level state and the server

The shortest way to share the cart is to export it from a module:

```ts
// Avoid: one store object for every request the server ever handles
export const [cart, setCart] = createStore({ items: [] as CartItem[] });

// Prefer: one store per client, created when the provider runs
function createCart() {
	const [cart, setCart] = createStore({ items: [] as CartItem[] });
	return { cart, setCart };
}
```

Run the `Avoid` version in a project with `ssr: true`.
The generated server entry imports `App`, and through it this module, once when the entry loads; each request then calls `renderToStream` with the same imported `App`.
On the server `createStore(value)` returns the object itself, and its setter mutates that object in place and warns `[SERVER_WRITE]`, so a write made during one request's render is what the next request reads.
There is one cart for the whole server, not one per visitor.

The `Prefer` version runs `createStore` inside `createCart()`, which the provider calls during render.
That is once per browser tab in the client and once per request on the server, and each instance is owned by its provider and disposed with it.

A module-scope store that is derived from a server function fails sooner:

```ts
// Avoid: runs while the module loads, with no request in scope
export const [cart] = createStore(() => getCart(), { items: [] as CartItem[] });
```

On the server the derivation runs as soon as the store is created, while the module is still being evaluated, and the in-process call to `getCart()` throws `Cannot call server function outside of a request` because no request event exists yet; [Server functions](/building-apps/server-functions#cannot-call-server-function-outside-of-a-request-on-the-server) lists the other places this appears.
Inside `createCart()` the same line runs during a request, under the request event that middleware decorated, so `getRequestEvent()?.locals.userId` inside `getCart()` names the right customer.

:::note[Projects without server rendering]
In a project built without `ssr: true`, the module is evaluated once per browser tab and a module-scope store is one store per tab, which is what app-wide state means there.
The cost is portability: the day `ssr: true` is added, the same file also loads once on the server, and the store becomes the shared object described above.
Creating it in a provider from the start removes that step.
:::

Constants are fine at module scope.
A category list, a currency formatter, or a `createContext` call has no per-visitor state, and the server sharing one copy is the intended behavior.

## State in the URL

The search filter lived in a signal, so a refresh cleared it and a shared link opened an empty search.
Values that describe which page the user is looking at belong in the URL:

```tsx
import { For, createMemo, latest } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { searchProducts } from "../data/products";

export default function Search() {
	const [search, setSearch] = useSearchParams();

	const results = createMemo(() => {
		const text = String(search.q ?? "").trim();
		const category = String(search.category ?? "all");
		if (!text) return [];
		return searchProducts(text, { category, inStockOnly: false });
	});

	return (
		<>
			<input
				type="search"
				value={latest(() => String(search.q ?? ""))}
				onInput={(event) => setSearch({ q: event.currentTarget.value })}
			/>
			<select
				value={latest(() => String(search.category ?? "all"))}
				onChange={(event) => setSearch({ category: event.currentTarget.value })}
			>
				<option value="all">All</option>
				<option value="kitchen">Kitchen</option>
			</select>
			<ul>
				<For each={results()}>{(product) => <li>{product.name}</li>}</For>
			</ul>
		</>
	);
}
```

Type `mug`, pick **Kitchen**, and the address bar reads `/search?q=mug&category=kitchen`.
Press refresh and the same results come back; paste the URL into another tab and it opens on the same search.

`setSearch` merges the keys it is given into the current query string and navigates without scrolling, so `q` and `category` can be set from two handlers without either one erasing the other.
`search.q` is a reactive read like a store property, so the memo re-runs when the URL changes, including on **Back**.
The two controls read through `latest` because the write to the URL is held while `results` fetches, and the control the user touched should show the new value while the old list waits; [Show the input now](/concepts/async-reactivity#show-the-input-now-latest) explains that pairing.
Without a schema every value is a string or an array of strings; [Type search parameters](/routing/solid-router/navigation#type-search-parameters) shows how a route's `search` schema turns `"2"` into `2` and supplies defaults.

:::caution[Search parameters are user input]
A value in the query string is user input.
`String(search.category ?? "all")` accepts `?category=<script>`, and the server function has to validate it the same way it validates any other argument.
[Arguments and security](/building-apps/server-functions/arguments-and-security) covers the checks that belong in `searchProducts`.
:::

Not everything on the page belongs in the URL.
A dialog's open flag, a hovered row, or text typed into a form field before submit is local state; the test is whether a shared link should reproduce it.

## State on the server

The signed-in customer, the catalog, and the order history live in the database and the session cookie.
The client never holds them; it holds a view that a server function returned:

```ts
// src/data/account.ts
import { getRequestEvent } from "@solidjs/web";
import { database } from "../server/database";

export async function getCurrentUser() {
	"use server";
	const userId = getRequestEvent()?.locals.userId;
	if (!userId) return null;
	return database.customers.find(userId);
}
```

```tsx
// src/components/Header.tsx
import { Loading, Show, createMemo } from "solid-js";
import { getCurrentUser } from "../data/account";

export function Header() {
	const user = createMemo(() => getCurrentUser());

	return (
		<Loading fallback={<span />}>
			<Show when={user()} fallback={<a href="/sign-in">Sign in</a>}>
				{(current) => <span>{current().name}</span>}
			</Show>
		</Loading>
	);
}
```

Load the page signed out and the header shows **Sign in**.
Sign in, and the next request carries the session cookie: middleware sets `event.locals.userId` from `getSession()`, `getCurrentUser()` finds the customer, and the header renders the name.
No component ever saw the cookie.

`user` is a memo of a promise, not a copy of the user.
When something on the server changes what `getCurrentUser()` would return, the view is stale until it is re-read: a `refresh(user)` after a rename action, or a full navigation after sign-out.
[Sessions and auth](/building-apps/sessions-and-auth) owns the cookie, the middleware, and the sign-in and sign-out functions; [Mutations](/concepts/mutations) shows how an optimistic layer sits on top of a view like this one without becoming a second source of truth.

Put the memo where its readers are.
`App` renders the header once, so a memo inside `Header` is created once per app; a product page that also needs the user should read it through a provider next to the cart rather than call the server function a second time.

## Decide

Ask these in order and stop at the first yes:

1. Should a shared link or a refresh reproduce it?
   Put it in a search parameter.
2. Does the server own it, because it comes from a database or a session?
   Read it through a server function into a memo or a store created from a function, and mutate it through an action.
3. Does exactly one component read and write it?
   Create a signal or store in that component.
4. Do two nearby components need it?
   Create it in their common parent and pass it as props.
5. Do components far apart, or every page, need it?
   Create it in a provider and read it with `useContext`; place the provider at the root of `App` for app-wide state.

Module scope is not on the list.
Use it for constants and for the `createContext` call itself.

## Common problems

### `useContext` throws `ContextNotFoundError`

The component rendered outside the provider, or the provider is lower in the tree than the reader.
In development the message reads `Context must either be created with a default value or a value must be provided before accessing it.`
Move the provider up, usually to `App`; adding a default value hides the mistake rather than fixing it when the value is reactive state.

### `Context can only be accessed under a reactive root`

`useContext` was called from an event handler or a callback, where there is no owner to look the context up on.
Call it during component setup and keep the result in a variable the handler closes over.

### The header shows the cart count from another customer

A store was created at module scope in a project with server rendering, so one object served every request and a write during one render was visible to the next.
Move the `createStore` call into a provider or component, and keep the source of truth behind a server function that reads the customer from `event.locals`.

### The filter clears when the page is refreshed

The filter lived in a signal, which starts from its initial value on every load.
Read and write it with `useSearchParams` so the URL carries it; see [State in the URL](#state-in-the-url).

### The context value never updates

The provider was given a snapshot, such as `value={{ count: cart.items.length }}`, which was read once when the provider ran.
Pass the store, the accessor, or a function, and read it in the consumer; see [Pass a store or accessors, not a snapshot](#pass-a-store-or-accessors-not-a-snapshot).

## Recap

- Create state in the component that reads it, and lift it to a parent only when a second component needs it.
- Share state across distant components with a provider that creates the store and a `useContext` read below it; put the provider at the root of `App` for app-wide state.
- Pass stores, accessors, and functions through context; the provider reads `value` once.
- Use `createContext<T>()` with no default for reactive state so a missing provider throws.
- Do not create signals or stores at module scope in code that runs on the server; the module loads once and one object serves every request.
- Put anything a shared link should reproduce in search parameters with `useSearchParams`.
- Read server-owned data through a server function into a memo or store; the client holds a view, and `refresh` re-reads it.

## Next steps

- [Mutations](/concepts/mutations): writes to server-owned state with `action`, `createOptimisticStore`, and `refresh`, layered without a second copy of the data.
- [Sessions and auth](/building-apps/sessions-and-auth): how `event.locals.userId` gets set, and how every server function checks it.
- [Navigation and typed paths](/routing/solid-router/navigation): typed search parameters with a schema, and the rest of the URL as state.
- [Rendering and SSR](/concepts/rendering-and-ssr): the other rules for code that runs on both the server and the client.
