---
title: "Thinking in Solid"
version: "2.0"
description: "Build the storefront's product search end to end, and at each step see what a React or Vue developer would reach for and what Solid does instead."
---

The storefront needs a search page: a text box, a category filter, a list of matching products from the server, and an **Add to cart** button on each row that updates the cart badge in the header.
If you have built this in React or Vue, you already have a plan: state for the query, a memoized filter, an effect that fetches, a loading flag, and a state update after the request succeeds.

This guide builds the same page in Solid and stops at each step to say which part of that plan does not carry over.
The [Quick start](/getting-started/quick-start) showed the one rule everything here follows: a component runs once, and a read inside JSX, a memo, or an effect's compute function is what updates.

## Start from the markup

Begin with a static list:

```tsx
// src/routes/search.tsx
import { For } from "solid-js";

type Product = {
	id: string;
	name: string;
	price: number;
	category: string;
	inStock: boolean;
};

const catalog: Product[] = [
	{ id: "mug", name: "Mug", price: 12, category: "kitchen", inStock: true },
	{ id: "tee", name: "T-shirt", price: 20, category: "apparel", inStock: true },
	{ id: "cap", name: "Cap", price: 15, category: "apparel", inStock: false },
];

export default function Search() {
	return (
		<main>
			<h1>Products</h1>
			<ul>
				<For each={catalog}>
					{(product) => (
						<li>
							{product.name} ${product.price}
						</li>
					)}
				</For>
			</ul>
		</main>
	);
}
```

Load the page and three rows render.
`Search` has now run for the only time it will run; nothing on this page causes it to run again.

In React the component function is the render, and every state change runs it again from the top.
In Vue the `setup` function runs once but the template re-renders when reactive state it reads changes.
In Solid there is no second run to plan for: the function sets up the page, returns the JSX, and each expression inside that JSX keeps itself current from then on.
[Components and JSX](/concepts/components-and-jsx#how-jsx-executes) explains what the compiler does with the JSX to make that work.

## Add the state that changes

The query is a string the user replaces on every keystroke.
The filter is an object with two fields that different parts of the page read:

```tsx
import { For, createSignal, createStore } from "solid-js";

export default function Search() {
	const [query, setQuery] = createSignal("");
	const [filter, setFilter] = createStore({
		category: "all",
		inStockOnly: false,
	});

	return (
		<main>
			<input
				type="search"
				onInput={(event) => setQuery(event.currentTarget.value)}
			/>
			<select
				onChange={(event) =>
					setFilter((draft) => {
						draft.category = event.currentTarget.value;
					})
				}
			>
				<option value="all">All</option>
				<option value="kitchen">Kitchen</option>
				<option value="apparel">Apparel</option>
			</select>
			<label>
				<input
					type="checkbox"
					checked={filter.inStockOnly}
					onInput={(event) =>
						setFilter((draft) => {
							draft.inStockOnly = event.currentTarget.checked;
						})
					}
				/>
				In stock only
			</label>
			<p>
				Showing {filter.category} products matching "{query()}"
			</p>
			{/* the list from above */}
		</main>
	);
}
```

Type `m` and the sentence under the controls changes; pick **Apparel** and the same sentence changes again.
The two expressions that read the changed value updated, and nothing else on the page was touched.
Check **In stock only** and nothing visible changes yet, because nothing on the page reads `filter.inStockOnly` apart from the checkbox itself.

The choice between the two primitives is about how the value is read.
`createSignal` holds a value that is read and replaced as one unit, and its getter is called: `query()`.
`createStore` holds an object or array whose parts are read separately, and its properties are read as values: `filter.category`.
React has one primitive, `useState`, and the object-or-string question is about how much to copy on each update; Vue has `ref` and `reactive`, which map closely to signal and store.
[Stores](/concepts/stores) covers the draft setter and per-property tracking in depth.

:::note[Where the read happens is the whole model]
`query()` inside the JSX subscribes that one text node to the signal.
The same call in the component body would run once, during setup, and the sentence would never change; development prints `[STRICT_READ_UNTRACKED]` when that happens.
[Reactivity](/concepts/reactivity#signals) explains tracking scopes, which is the one concept a React or Vue developer has to add.
:::

## Derive everything else

The list should show the products that match the query and the filter, and the heading should show how many.
The plan from other frameworks is a second piece of state kept in step with the first:

```tsx
import { createEffect, createMemo, createSignal } from "solid-js";

type Filter = { category: string; inStockOnly: boolean };

function matches(product: Product, text: string, filter: Filter) {
	return (
		(filter.category === "all" || product.category === filter.category) &&
		(!filter.inStockOnly || product.inStock) &&
		product.name.toLowerCase().includes(text.toLowerCase())
	);
}

// Avoid: a second signal, filled by an effect whenever the inputs change
const [filtered, setFiltered] = createSignal<Product[]>([]);
createEffect(
	() => catalog.filter((product) => matches(product, query(), filter)),
	(list) => setFiltered(list)
);

// Prefer: derive the list where it is read
const filtered = createMemo(() =>
	catalog.filter((product) => matches(product, query(), filter))
);
const count = () => filtered().length;
```

Run the `Avoid` version and type a letter.
The sentence under the controls updates in the flush the keystroke caused; the effect runs after that flush and writes `filtered`, which updates in the next one, so for one frame the page shows the new query above the old list.
With attribution enabled, development names the pattern `[EFFECT_RELAY_TEAR]`; [Avoid unnecessary effects](/guides/avoid-unnecessary-effects#calculate-values-when-they-are-read) shows the report and the other shapes it takes.

In the `Prefer` version there is no second copy.
`createMemo` runs its function in a tracking scope, so the reads of `query()`, `filter.category`, and `filter.inStockOnly` inside `matches` are its dependency list; there is no array to write and nothing to keep in step.
React's `useMemo` needs `[query, filter]` spelled out and recomputes when the component re-renders with a changed entry; Vue's `computed` is the closest match to what the memo does here.

`count` is a plain function rather than a memo.
It has one reader, so it costs nothing to recompute where it is read; a memo costs a node and an equality check and earns it when several readers share the result.
[Derived values](/concepts/reactivity#derived-values) covers that choice.

The memo returns the same product objects the catalog holds, filtered.
`For` keys rows by object identity, so a product that stays in the results keeps its `<li>`; when the derived collection is built from new objects on each run, use a [projection](/concepts/stores#derive-a-store-with-a-projection) instead so rows are matched by `id`.

## Read from the server

The catalog lives in a database.
Move the search there with a server function, and call it from the memo:

```ts
// src/data/products.ts
import { database } from "./database";

export async function searchProducts(
	query: string,
	filter: { category: string; inStockOnly: boolean }
) {
	"use server";
	return database.products.search({ query, ...filter });
}
```

```tsx
// src/routes/search.tsx
import {
	For,
	Loading,
	createMemo,
	createSignal,
	createStore,
	isPending,
} from "solid-js";
import { searchProducts } from "../data/products";

export default function Search() {
	const [query, setQuery] = createSignal("");
	const [filter, setFilter] = createStore({
		category: "all",
		inStockOnly: false,
	});

	const results = createMemo(() => {
		const text = query().trim();
		const current = {
			category: filter.category,
			inStockOnly: filter.inStockOnly,
		};
		if (!text) return [] as Product[];
		return searchProducts(text, current);
	});

	return (
		<main>
			{/* the input and select from above */}
			<Loading fallback={<p>Searching…</p>}>
				<ul class={{ stale: isPending(results) }}>
					<For each={results()} fallback={<li>No products match.</li>}>
						{(product) => (
							<li>
								{product.name} ${product.price}
							</li>
						)}
					</For>
				</ul>
			</Loading>
		</main>
	);
}
```

Type `mug`.
Three requests start, one per keystroke; the list shows the answer to `mug` and nothing else, and while each answer is on its way the previous list stays on screen with the `stale` class.
The first time the memo returns a promise, the `Loading` boundary shows **Searching…** in place of the list; after that first answer, the fallback does not come back.

The memo returned a promise, and that is the whole change.
Readers of `results()` see a `Product[]`, not a `Promise` and not `undefined`; an expression that reads a value that is not ready yet waits, and the nearest `Loading` boundary decides what renders in the meantime.
An answer to a superseded run is dropped, so there is no request counter and no `AbortController`.
[Async reactivity](/concepts/async-reactivity) covers what happens between the keystroke and the answer, including `latest` for a controlled input whose `value` should show the new text while the old list is held.

In React this section is a `useEffect` with a fetch, a results state, a loading state, and an ignore flag for stale responses, or a data-fetching library that hides those four things.
In Vue it is a `watch` on the query with the same set of refs.
In Solid the request is the derived value, and the loading and stale states are questions asked of it: `isPending(results)` here, a `Loading` boundary for the first answer.

:::tip[Empty query, no request]
`if (!text) return []` returns a settled value synchronously, so an empty box never shows the fallback and never asks the server.
Put the guard after every reactive input has been read and before the call; [Read every input before the first await](/concepts/async-reactivity#read-every-input-before-the-first-await) explains why the order matters when the function itself is `async`.
:::

During server rendering the same `searchProducts(text, current)` call runs in the current process, with no HTTP request; in the browser it becomes a `POST` to the server-function endpoint.
[Server functions](/building-apps/server-functions) covers the transport and what a caller can send.

## Write back

Each row gets an **Add to cart** button, and the header badge should count the items.
The count is server data, and the click should show at once:

```ts
// src/data/cart.ts
import { getRequestEvent, redirect } from "@solidjs/web";
import { database } from "./database";

export async function getCart() {
	"use server";
	const userId = getRequestEvent()?.locals.userId;
	if (!userId) return { items: [] };
	return database.cart.forUser(userId);
}

export async function addToCart(productId: string) {
	"use server";
	const userId = getRequestEvent()?.locals.userId;
	if (!userId) throw redirect("/sign-in");
	await database.cart.add(userId, productId);
}
```

```tsx
// src/routes/search.tsx
import { Loading, action, createOptimistic, refresh } from "solid-js";
import { addToCart, getCart } from "../data/cart";

export default function Search() {
	// query, filter, and results from above

	const [cartCount, setCartCount] = createOptimistic(async () => {
		const cart = await getCart();
		return cart.items.length;
	});

	const add = action(function* (productId: string) {
		setCartCount((count) => count + 1);
		yield addToCart(productId);
		refresh(cartCount);
	});

	return (
		<main>
			<header>
				<Loading fallback={<span>Cart</span>}>
					<span>Cart ({cartCount()})</span>
				</Loading>
			</header>
			{/* the input, select, and list from above, with a button in each row: */}
			<button type="button" onClick={() => void add(product.id)}>
				Add to cart
			</button>
		</main>
	);
}
```

Click **Add to cart** and the badge goes from 2 to 3 at once.
When `addToCart` resolves, `refresh(cartCount)` asks the server again and the badge shows what the server has; if the two agree, nothing visible changes.
If the request rejects, the badge returns to 2 with no code written for that case.

The write before the `yield` is tentative because it happens inside an [`action`](/reference/solid-js/lifecycle-actions/action) on a [`createOptimistic`](/reference/solid-js/reactivity/create-optimistic) value: it shows immediately, and Solid discards it when the action settles.
The generator body is what keeps the write and the refresh in one transaction across the round trip.
[Mutations](/concepts/mutations) builds this up for a whole cart with `createOptimisticStore`, and explains why a plain `await` inside the action would leave the transaction.

In React this is a state update, a request, and a second state update or a rollback in the `catch`, or `useOptimistic` inside a transition.
In Vue it is the same sequence written by hand.
In Solid the synchronous write already describes the expected result, and the action decides how long it stays.

:::caution[The count belongs to the cart, not to the search page]
`cartCount` and `add` are created inside `Search`, so they are disposed when the user leaves the page and re-created on the next visit.
The header shows the same count on every page, so the value should be created once, higher in the tree, and shared through context.
[State management](/guides/state-management) moves it there.
:::

## What did not happen

- No dependency arrays were written.
  The memo's tracked reads are its dependencies, and they were correct on the first try because they are the reads themselves.
- Nothing was wrapped to prevent a re-render.
  `Search` ran once; there was no render to skip, so there was no `React.memo`, `useCallback`, or key trick.
- No effect kept a derived value in step.
  The filtered list and the count are derivations, and the one effect on this page was the `Avoid` version.
- No loading flag, request counter, or abort controller was declared.
  The request is the memo's value; `Loading` and `isPending` read its status.
- No rollback code was written.
  The optimistic write is discarded when the action settles, whether the request succeeded or failed.
- No component re-ran when state changed.
  Each JSX expression that read a changed value updated on its own.

The one habit to add is the one the [Quick start](/getting-started/quick-start#make-a-change) demonstrated: read reactive values inside JSX, a memo, or an effect's compute function, and call a signal when you read it.

## Common problems

### A row shows the first product and never changes

The row component destructured its props: `function Row({ product })`.
Destructuring reads each prop once, in the component body, so the row is frozen at the values it was created with.
Keep `props` whole and read `props.product.name` inside the JSX; [Props](/concepts/components-and-jsx#props) shows the compiled getter that makes this work.

### `props.query is not a function`

The parent passed `query={query()}`, so the child receives a string and reads it as `props.query`.
A dynamic prop compiles to a getter that runs the parent's expression when the child reads it, so the child does not call it.
Pass the accessor itself, `query={query}`, when the child should receive a function, and then call `props.query()`.

### The page shows `() => ` or `function` where a value should be

The signal was placed in the JSX without being called, or concatenated into a string.
Write `{query()}`, not `{query}`; [Reactivity](/concepts/reactivity#the-page-shows-the-words-function-or---instead-of-the-value) covers the variants.

### The list is one keystroke behind the sentence above it

An effect is copying a derived value into a signal, as in the `Avoid` version above.
Delete the signal and the effect and make the list a memo; [Avoid unnecessary effects](/guides/avoid-unnecessary-effects#the-copied-value-is-one-step-behind-the-source) walks through the diagnostic.

## Recap

- A component runs once; plan for the JSX expressions to update, not for the function to run again.
- Hold a value that is replaced whole in a signal and call it, `query()`; hold an object read in parts in a store and read its properties, `filter.category`.
- Derive the filtered list and the count where they are read; a signal plus an effect that fills it is the same state one flush late.
- Return the server function's promise from a memo and read the result as a plain array; `Loading` handles the first answer and `isPending` reports the ones after.
- Read every reactive input at the top of an async memo, before the request.
- Make the optimistic write inside an `action` on a `createOptimistic` value, `yield` the request, then `refresh` the source.
- Keep `props` whole and read `props.name` inside the JSX.

## Next steps

- [State management](/guides/state-management): where the cart count, the signed-in user, and the current filter should live, and how to share them without module-scope state.
- [Data fetching patterns](/guides/data-fetching-patterns): the search box with a controlled input, several requests per page, pagination, and refresh.
- [Avoid unnecessary effects](/guides/avoid-unnecessary-effects): every place an effect gets written where a derivation belongs, and the two cases where an effect is right.
- [Migrate from React](/migration/from-react): a hook-by-hook translation for an existing codebase.
