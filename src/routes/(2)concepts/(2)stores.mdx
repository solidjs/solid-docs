---
title: "Stores"
version: "2.0"
description: "Hold a cart, a form, or any nested object in a store: update one property through a draft, derive filtered views with a projection, and load server data into the same proxy."
---

The cart on the [Components and JSX](/concepts/components-and-jsx) page held its items in a signal.
That works until the user edits a quantity.
To change one number you must build a new array with one new object in it, and `For` sees a new object where the old row was: the row is torn down and rebuilt, and if the user was typing in that row's input, the input they were typing in is gone.

A store fixes this by tracking each property on its own.
Change `items[1].quantity` and the one text node that reads it updates.
Nothing is copied, no row is rebuilt, and the input keeps focus.

Use a signal when a value is read and replaced as one unit: a count, a selected id, a string.
Use a store when readers need separate parts of an object or array, which describes most application state.

## Create nested state

[`createStore`](/reference/solid-js/stores/create-store) takes an object or array and returns a read-only proxy and a setter:

```tsx
import { For, createStore } from "solid-js";

type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	savedForLater?: boolean;
};

export function Cart() {
	const [cart, setCart] = createStore({
		items: [
			{ id: "mug", name: "Mug", price: 12, quantity: 1 },
			{ id: "tee", name: "T-shirt", price: 20, quantity: 2 },
		] as CartItem[],
		coupon: "",
	});

	return (
		<>
			<ul>
				<For each={cart.items}>
					{(item) => (
						<li>
							{item.name}
							<input
								type="number"
								min="1"
								value={item.quantity}
								onInput={(event) =>
									setCart((draft) => {
										const target = draft.items.find((i) => i.id === item.id);
										if (target)
											target.quantity = event.currentTarget.valueAsNumber || 1;
									})
								}
							/>
						</li>
					)}
				</For>
			</ul>
			<p>{cart.items.length} lines</p>
		</>
	);
}
```

Change the T-shirt quantity to 3.
The `value` of that one input updates and nothing else on the page is touched: the Mug row, the line count, and the `<li>` around the input all stay as they were.

Each property read inside a tracking scope subscribes that scope to that property, including reads through nested objects and array indexes.
`item.quantity` subscribed the input to one number; `cart.items.length` subscribed the paragraph to the array's length.
A write to `cart.coupon` would update neither.

Store properties are values, not accessors.
Read `cart.coupon`, not `cart.coupon()`.
The same rule as for signals applies to where you read: inside JSX, a memo, or an effect's compute function when the reader should update, and a read in the component body is a one-time snapshot.

:::deep-dive[How a store tracks one property at a time]
The proxy does not create a signal for every property up front.
It creates a tracking node the first time a tracked consumer reads a property, and only for the properties that were read.
Nested objects and arrays are wrapped in their own proxies when they are first reached, so a store with a thousand rows costs nothing for the rows nothing has read.
This is why reading `cart.items[0].quantity` and reading `cart.items.length` produce two independent subscriptions: they are two different nodes.
:::

## Update with a draft

The setter receives a draft.
Mutate it with normal property assignments and array methods, and Solid applies the changes to the store when the callback returns:

```ts
setCart((draft) => {
	draft.coupon = "SAVE10";

	const mug = draft.items.find((item) => item.id === "mug");
	if (mug) mug.quantity += 1;

	draft.items.push({ id: "cap", name: "Cap", price: 15, quantity: 1 });
});
```

Three properties changed, and three subscriptions are notified: the coupon reader, the Mug quantity input, and the `length` reader.
The T-shirt row is not touched.

The habit from immutable state is to rebuild the collection.
That habit undoes what the store gives you:

```ts
// Avoid: a new object for the changed item, so For rebuilds that row
setCart((draft) => {
	draft.items = draft.items.map((item) =>
		item.id === id ? { ...item, quantity } : item
	);
});

// Prefer: change the one property on the draft
setCart((draft) => {
	const item = draft.items.find((item) => item.id === id);
	if (item) item.quantity = quantity;
});
```

Run the `Avoid` version while the cursor is in that row's input and the input loses focus, because the row was torn down and a new one created.
The `Prefer` version updates the one `value` binding.

:::pitfall[Writing to the store outside the setter does nothing]
The store proxy is read-only.
An assignment such as `cart.items[0].quantity = 2` outside a setter is ignored: it does not throw, it does not warn, and the value does not change.
If a write seems to vanish, look for a write that skipped `setCart`.
Every change goes through the setter's draft, including changes from event handlers and from inside actions.
:::

The callback may return a replacement value instead of mutating.
For an array, Solid writes the returned entries by index and adjusts the length.
For an object, Solid writes the keys that are present and deletes the keys that are missing:

```ts
setCart((draft) => {
	draft.items = draft.items.filter((item) => item.quantity > 0);
});
```

A returned or assigned collection replaces the array by index, and the items that survive are the same objects, so their proxies and their rows are kept.
When the new array holds new objects, such as a fresh server response, nothing matches them to the old ones; reconcile that inside a [projection](#derive-a-store-with-a-projection) with a key, or with `reconcile`.

Store writes are staged and applied in the same batch as signal writes, so a read on the next line sees the previous value until the batch lands.
[When updates land](/concepts/reactivity#when-updates-land) explains the batch and when to call `flush()`.

:::note[Path setters from Solid 1]
[`storePath`](/reference/solid-js/advanced/store-advanced/store-path) accepts the path-and-value form Solid 1 used, `setCart(storePath("coupon", "SAVE10"))`, for code that has not moved yet.
New code uses the draft.
:::

## Derive a store with a projection

A projection is a store whose value is computed from other reactive values.
Where a memo derives one value, a projection derives an object or array whose properties are tracked separately, and whose items keep their identity from one computation to the next.

[`createProjection`](/reference/solid-js/stores/create-projection) takes a function and a seed.
The function receives a draft of the seed and may mutate it or return a replacement; a returned array is reconciled into the store by `id`:

```tsx
import { For, createProjection, createSignal, createStore } from "solid-js";

function Cart() {
	const [cart] = createStore({ items: [] as CartItem[] });
	const [showSaved, setShowSaved] = createSignal(false);

	const visible = createProjection(
		() => cart.items.filter((item) => showSaved() || !item.savedForLater),
		[] as CartItem[]
	);

	return (
		<>
			<label>
				<input
					type="checkbox"
					checked={showSaved()}
					onInput={(event) => setShowSaved(event.currentTarget.checked)}
				/>
				Show saved for later
			</label>
			<ul>
				<For each={visible}>{(item) => <li>{item.name}</li>}</For>
			</ul>
		</>
	);
}
```

Check the box and the saved items appear.
The rows that were already visible are the same DOM nodes as before: the projection matched them by `id`, so `For` kept their proxies and did not rebuild them.

Pass a key name when the data uses a different identity field, or `null` to match by position.
The seed is the backing object the results reconcile into, so the root proxy keeps its identity across recomputations too.

Use a projection for a derived collection or object.
For a derived number or string, such as the cart total, use a memo:

```ts
const total = createMemo(() =>
	cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
```

### Fetch into a store

The projection function may return a promise.
The function form of `createStore` is a projection with a setter, and it is the normal way to load server data into a store:

```ts
const [cart, setCart] = createStore(async () => api.cart(), {
	items: [] as CartItem[],
});
```

The request starts when the store is created, and again whenever a reactive value the function read changes.
Each response reconciles into the same proxy by `id`, so items the server did not change keep their identity and their DOM.
A [`Loading`](/concepts/boundaries) boundary shows a fallback before the first response, [`isPending(() => cart.items)`](/reference/solid-js/reactivity/is-pending) reports a refetch, and [`refresh(cart)`](/reference/solid-js/lifecycle-actions/refresh) asks the server again.

With an async function, the seed is not shown as a first answer by default; readers wait for the first response the same way they wait for an async memo.
[Async reactivity](/concepts/async-reactivity) explains that wait, and the `seedLoadingValue` option that makes the seed an acceptable first answer.

Split the request into its own memo only when a second reader shapes the same response differently:

```ts
const response = createMemo(() => api.cart());
const [cart] = createStore(() => response(), { items: [] as CartItem[] });
const itemCount = createMemo(() => response().items.length);
```

Without that second reader, the one-line form is the right one.

## Optimistic stores

[`createOptimisticStore`](/reference/solid-js/stores/create-optimistic-store) has the same draft setter, with one difference: a write made inside an [`action`](/reference/solid-js/lifecycle-actions/action) is tentative.
It shows immediately, and when the action settles Solid removes it and shows the value the store derives from its source:

```ts
import { action, createOptimisticStore, refresh } from "solid-js";

const [cart, setCart] = createOptimisticStore(async () => api.cart(), {
	items: [] as CartItem[],
});

const setQuantity = action(function* (id: string, quantity: number) {
	setCart((draft) => {
		const item = draft.items.find((item) => item.id === id);
		if (item) item.quantity = quantity;
	});
	yield api.setQuantity(id, quantity);
	refresh(cart);
});
```

Call `setQuantity("mug", 3)` and the input shows 3 at once.
When the request completes, the refreshed cart from the server replaces the tentative value; if the server agreed, nothing visible changes, and if the request failed, the quantity returns to what the server has.

The [Mutations](/concepts/mutations) page builds this up from the client-only cart above, one change at a time.

## Common problems

### A store write did nothing

The write went to the proxy instead of the setter's draft: `cart.coupon = "SAVE10"` rather than `setCart((draft) => { draft.coupon = "SAVE10"; })`.
Writes outside the setter are ignored without an error.

### Every row rebuilds when one item changes

The setter replaced the item objects, usually with `map` and a spread.
`For` keys rows by object identity, so a new object is a new row.
Change the property on the draft instead, or if the data arrives as a fresh array from the server, load it through a [projection](#derive-a-store-with-a-projection) so items are matched by `id`.

### `cart.items.length` renders once and never updates

The read happened in the component body, outside a tracking scope.
Store reads follow the same rule as signal reads: put the read in the JSX, a memo, or an effect's compute function.
Development prints `[STRICT_READ_UNTRACKED]` with the component name.

### A `Map`, `Date`, or class instance inside the store does not track

Plain objects, arrays, and class instances are wrapped in proxies; platform objects such as `Map`, `Set`, and `Date` are stored as they are.
Reassign the property to a new instance through the setter to notify readers, or keep the data in plain objects and arrays.

## Recap

- Use a store for an object or array whose parts are read separately; use a signal for a value replaced as a unit.
- Read store properties as values, `cart.coupon`, inside a tracking scope.
- Change state on the setter's draft; a write to the proxy itself is ignored.
- Assign the one property that changed rather than rebuilding the collection, so rows keep their identity.
- Derive a collection with `createProjection`, which reconciles results by `id`; derive a scalar with `createMemo`.
- Load server data with `createStore(async () => ..., seed)`; each response reconciles into the same proxy.
- Make optimistic writes inside an `action` on a `createOptimisticStore`, and `refresh` the source when the request settles.

## Next steps

- [Async reactivity](/concepts/async-reactivity): what readers see while `createStore(async () => ...)` is waiting, and why the current cart stays on screen during a refetch.
- [Mutations](/concepts/mutations): the cart's `add`, `remove`, and `setQuantity` as actions against a server, with the optimistic overlay and the refresh.
- [Lists](/guides/lists): editing, filtering, selection, and keeping row identity across server refetches, with the store patterns from this page.
- [Avoid unnecessary effects](/guides/avoid-unnecessary-effects): when a derived store should be a projection instead of an effect that copies into a second store.
- [Performance](/guides/performance#stores-at-scale): keyed reconciliation and projections over a store with thousands of rows.
