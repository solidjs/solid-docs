---
title: "TypeScript"
version: "2.0"
description: "Replace the any annotations in a storefront with the types Solid exports for props, children, accessors, store drafts, event handlers, refs, server function results, and typed routes."
---

The storefront compiles, and a search for `any` in `src` finds six of them: the props of `LineItem`, the `children` of `Panel`, the `query` passed into `SearchResults`, the draft inside a `setCart` callback, an `onInput` handler, and a `ref`.
Each one was written to silence an error whose message was not clear at the time.

This guide goes through those six places and shows which exported type belongs in each, and what the type checker reports when the wrong one is used.
The [type reference pages](/reference/solid-js/types/component-types) list the exports; [Components and JSX](/concepts/components-and-jsx#children-and-composition) introduces `ParentProps`.
This guide starts from there and shows the types in the cart and product pages those pages built.

## Set up

The templates ship a `tsconfig.json` with three settings that matter for Solid:

```json
{
	"compilerOptions": {
		"jsx": "preserve",
		"jsxImportSource": "@solidjs/web",
		"strict": true
	}
}
```

`jsx: "preserve"` leaves JSX in place for the Solid compiler in the Vite plugin, which handles `.tsx` and `.jsx` files itself.
`jsxImportSource` points TypeScript at `@solidjs/web/jsx-runtime`, where the element, attribute, and event types for the DOM renderer live.
`strict` turns on the null checks that make `createSignal<Product>()` report its `undefined` before the first render does.

## Type component props

A component is a function that takes one `props` object, so the first choice is between annotating the parameter and annotating the function:

```tsx
import type { Component } from "solid-js";

type Product = { id: string; name: string; price: number };

// A function declaration with a typed parameter
function LineItem(props: { product: Product; quantity: number }) {
	return <li>{props.product.name}</li>;
}

// The same contract, as a value
const LineItem: Component<{ product: Product; quantity: number }> = (props) => (
	<li>{props.product.name}</li>
);
```

Both accept the same JSX and reject the same mistakes.
`Component<P>` is `(props: P) => Element`, so use it when the component is a value: stored in a map, passed to `dynamic()`, or returned from `lazy()`.
Use the function declaration otherwise; it reads the same and needs no import.

Three helpers extend a props type with a `children` contract:

```tsx
import type { ParentProps, VoidProps } from "solid-js";

// children is optional
function Panel(props: ParentProps<{ title: string }>) {
	return <section>{props.children}</section>;
}

// children is forbidden
function Price(props: VoidProps<{ amount: number }>) {
	return <span>{props.amount}</span>;
}
```

Write `<Price amount={12}>USD</Price>` and the checker reports `'Price' components don't accept text as child elements. Text in JSX has the type 'string', but the expected type of 'children' is 'undefined'`.
Without `VoidProps`, the text would type-check and be dropped at runtime, because a component only renders the children it reads.
`FlowProps` is the third helper; it requires children of a specific type and appears in the next section.

To reuse another component's props, take them from the component: `function IconButton(props: ComponentProps<typeof Button> & { icon: JSX.Element })`.
`ComponentProps<typeof Button>` is whatever `Button` declared, so adding a `variant` to `Button` adds it to `IconButton` with no second edit.

Defaults and rest props keep their types through `merge` and `omit`:

```tsx
import { merge, omit } from "solid-js";
import type { JSX } from "@solidjs/web";

function Button(
	_props: {
		label: string;
		variant?: "primary" | "ghost";
	} & JSX.ButtonHTMLAttributes<HTMLButtonElement>
) {
	const props = merge({ variant: "primary" } as const, _props);
	const rest = omit(props, "label", "variant");

	return (
		<button {...rest} class={props.variant}>
			{props.label}
		</button>
	);
}
```

After `merge`, `props.variant` is `"primary" | "ghost"` with the `undefined` gone.
After `omit`, `rest.label` is a type error, so nothing the component consumed leaks onto the `<button>`.
Both keep reactivity, which is why they replace destructuring and spreading; the [`merge`](/reference/solid-js/stores/merge) and [`omit`](/reference/solid-js/stores/omit) references list the signatures.

:::pitfall[Destructuring type-checks and still breaks]

```tsx
// Avoid: valid TypeScript, reads quantity once
function LineItem({ quantity }: { quantity: number }) {
	return <li>{quantity}</li>;
}

// Prefer: read the prop where it is used
function LineItem(props: { quantity: number }) {
	return <li>{props.quantity}</li>;
}
```

The `Avoid` version compiles without a warning, because destructuring a parameter is ordinary TypeScript.
At runtime the parent's next `quantity` never reaches the row, and development prints `[STRICT_READ_UNTRACKED]` with the component name.
Types describe the shape of `props`, not when it is read; [Props](/concepts/components-and-jsx#props) explains the getter the compiler generates.
:::

## Element and children types

Most components need no return annotation; the checker infers it from the JSX.
When a type is needed, for a prop that takes markup or a function that returns it, use `JSX.Element` from `@solidjs/web`.

:::note[Two packages export types]
`solid-js` exports the renderer-neutral types: `Component`, `Element`, `ParentProps`, `Accessor`, `Store`.
`@solidjs/web` exports the DOM renderer's `JSX` namespace, and its own `ComponentProps` that also accepts a tag name, so `ComponentProps<"button">` is the attribute type of a native button.
There is no `JSX` export on `solid-js`.
`JSX.Element` in `@solidjs/web` is the core `Element` type widened with DOM `Node`, so a component may return a node it created by hand.
:::

A component that hands a value to its children declares the callback type with `FlowProps`:

```tsx
import { createMemo, type Accessor, type FlowProps } from "solid-js";
import type { JSX } from "@solidjs/web";

function ProductLoader(
	props: FlowProps<{ id: string }, (product: Accessor<Product>) => JSX.Element>
) {
	const product = createMemo(() => getProduct(props.id));
	return <>{props.children(product)}</>;
}

<ProductLoader id="mug">
	{(product) => <h1>{product().name}</h1>}
</ProductLoader>;
```

The callback parameter is typed from the declaration, so `product().name` completes and `product().nmae` is an error.
Pass an element instead of a function and the checker reports `Type 'Element' is not assignable to type '(product: Accessor<Product>) => Element'`.

When a component must inspect its children, the [`children`](/reference/solid-js/components-context/children) helper returns a `ChildrenReturn`: an `Accessor<ResolvedChildren>` with a `toArray()` that returns `ResolvedElement[]`.
Both types are exported from `solid-js`.

## Signals, memos, and setters

`createSignal` infers its type from the initial value, and the no-argument form includes `undefined`:

```tsx
import { createMemo, createSignal } from "solid-js";

const [quantity, setQuantity] = createSignal(1); // Signal<number>
const [selected, setSelected] = createSignal<string>(); // Signal<string | undefined>

setQuantity((prev) => prev + 1);
setSelected(); // clears to undefined; allowed because the type includes it

const product = createMemo(() => getProduct(props.id)); // SourceAccessor<Product>
```

`product()` is a `Product`, not a `Promise<Product>`.
A compute function may return a promise, and the memo's type is the settled value; what a reader sees while the promise is pending is the subject of [Async reactivity](/concepts/async-reactivity#a-memo-that-returns-a-promise).

Accessors travel as props in two ways, and the error that follows from mixing them is the most common one on this page:

```tsx
import type { Accessor } from "solid-js";

function Results(props: { query: string }) {
	return <p>{props.query}</p>;
}

// Avoid: the accessor is passed where the value is expected
<Results query={query} />;

// Prefer: read it in the attribute; the compiler makes the attribute a getter
<Results query={query()} />;
```

The `Avoid` version reports `Type 'SourceAccessor<string>' is not assignable to type 'string'`.
The `Prefer` version stays reactive, because a dynamic attribute compiles to a getter on `props`, so `props.query` inside `Results` re-reads `query()` where it is used.
Type a prop as `Accessor<T>` only when the child needs the function itself, to hand it to a primitive or to defer the read; the [Custom primitives](/guides/custom-primitives) guide covers accepting either form.

`Setter<T>` types a setter passed down, as in `props: { value: Accessor<number>; setValue: Setter<number> }`, and the child may call it with a value or an updater.

:::caution[A function passed to a setter is an updater]
`setHandler(() => console.log("saved"))` reports `Type 'void' is not assignable to type 'Handler'`, because the setter reads a function argument as `(prev) => next` and checks its return.
To store a function as the value, return it from an updater: `setHandler(() => next)`.
The same rule applies to `createSignal`: a function as the first argument is the derived, writable form, not an initial value.
:::

## Stores

`createStore<T>` returns `[Store<T>, StoreSetter<T>]`, and `Store<T>` is `T`:

```tsx
import { createStore, reconcile } from "solid-js";

type CartItem = { id: string; name: string; price: number; quantity: number };
type Cart = { items: CartItem[]; coupon: string };

const [cart, setCart] = createStore<Cart>({ items: [], coupon: "" });

setCart((draft) => {
	draft.coupon = 5; // Type 'number' is not assignable to type 'string'
	draft.items.push({ id: "mug" }); // Property 'quantity' is missing
});

setCart(reconcile(await getCart()));
```

The draft is a `Cart`, so a write to the wrong property or a half-built item is reported at the line that wrote it.
Because `Store<Cart>` is `Cart`, the proxy passes anywhere a `Cart` or a `CartItem[]` is expected, such as `<CartLines items={cart.items} />`, with no cast.
`reconcile(value)` returns `(state: Cart) => Cart`, which is exactly what the setter takes.

The function form, `createStore(async () => getCart(), seed)`, is typed by its seed and return value, and [`createProjection`](/reference/solid-js/stores/create-projection) returns a `Store<T>` of its seed type.
[Stores](/concepts/stores#update-with-a-draft) explains what the draft does at runtime.

## Events and refs

Inline handlers are typed from the element they sit on:

```tsx
<input onInput={(event) => setQuery(event.currentTarget.value)} />
<button onClick={(event) => event.currentTarget.disabled} />
```

`event.currentTarget` is the element the handler is on: `HTMLInputElement` in the first line, `HTMLButtonElement` in the second.
For `onInput`, `onChange`, and focus events on an input, select, or textarea, `event.target` is narrowed to the same element.
For every other handler, `event.target` is `Element`, so `event.target.value` in an `onClick` reports `Property 'value' does not exist on type 'EventTarget & Element'`; read `currentTarget`.

A handler defined outside the JSX takes one of the handler types from the `JSX` namespace:

```tsx
import type { JSX } from "@solidjs/web";

const onInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (event) =>
	setQuery(event.target.value);

const onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) =>
	event.currentTarget.blur();
```

A prop that forwards to an element, such as `onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>`, takes the union the element attribute takes, which includes the bound `[handler, data]` form.

A `ref` variable is `undefined` until Solid creates the element:

```tsx
// Avoid: the checker is right, and so is the runtime
let input: HTMLInputElement | undefined;
input.select(); // 'input' is possibly 'undefined'

// Prefer: assert assignment, and read it from a handler or onSettled
let input!: HTMLInputElement;
<input ref={(element) => (input = element)} />;
<button type="button" onClick={() => input.select()} />;
```

The `!` says the variable is assigned before it is read, which holds when every read happens in an event handler or in `onSettled`, both of which run after the element exists.

A component that exposes its element takes a `Ref<T>` prop, `T | ((val: T) => void) | undefined | Ref<T>[]` from `solid-js`, and passes it straight through to `ref`.
The [`ref` reference](/reference/solid-web/jsx-properties/ref) lists what the attribute accepts.

## Server functions and the router

A `"use server"` function is typed like any async function, and the caller sees its declared return:

```tsx
import { getRequestEvent, redirect } from "@solidjs/web";

export async function getCart() {
	"use server";
	const userId = getRequestEvent()?.locals.userId;
	if (!userId) throw redirect("/sign-in");
	return database.cart.forUser(userId); // Promise<Cart>
}

export async function deleteAccount() {
	"use server";
	const userId = getRequestEvent()?.locals.userId;
	if (!userId) return redirect("/sign-in");
	return database.cart.forUser(userId); // Promise<Cart | Response>
}
```

`redirect()` returns a `Response`.
Thrown, it leaves the return type alone, so `await getCart()` is a `Cart`; returned, it widens the result to `Cart | Response`, which matches what plain code receives when it calls the function directly.
[Redirect the caller](/building-apps/server-functions/mutations-and-responses#redirect-the-caller) covers which callers follow the redirect.

Solid Router derives its types from the route table.
`defineRoutes` keeps the path literals, `RouteComponent<typeof Router.paths.products>` types `props.params.id` as `string`, and `PathParamsOf<typeof Router.paths.products>` is `{ id: string }`:

```tsx
import type { PathParamsOf, RouteComponent } from "@solidjs/router";
import type { Router } from "../router";

const Product: RouteComponent<typeof Router.paths.products> = (props) => (
	<h1>{props.params.id}</h1>
);
type ProductParams = PathParamsOf<typeof Router.paths.products>; // { id: string }
```

With `matchFilters: { id: int }` on the orders route, `Router.paths.account.orders("latest")` reports `Argument of type 'string' is not assignable to parameter of type 'number'`.
[Type a route at its definition](/routing/solid-router/route-definitions#type-a-route-at-its-definition) and [Type search parameters](/routing/solid-router/navigation#type-search-parameters) cover `defineRoute`, filters, and search schemas.

## Generic components

A size picker that works for sizes, colors, and shipping methods takes a type parameter:

```tsx
import { For } from "solid-js";

function Select<T>(props: {
	options: T[];
	label: (option: T) => string;
	onChange: (value: T) => void;
}) {
	return (
		<select
			onChange={(event) =>
				props.onChange(props.options[event.currentTarget.selectedIndex])
			}
		>
			<For each={props.options}>
				{(option) => <option>{props.label(option)}</option>}
			</For>
		</select>
	);
}
```

Render `<Select options={sizes} label={(size) => size.label} onChange={(size) => setSize(size.code)} />` and `T` is inferred from `options` as `Size`, so `size.code` completes in both callbacks.
An arrow function needs a trailing comma in the type parameter list, `const Select = <T,>(props: ...) => ...`, because in a `.tsx` file `<T>` on its own reads as a JSX tag and reports `JSX element 'T' has no corresponding closing tag`.

## Common problems

### `Type 'SourceAccessor<string>' is not assignable to type 'string'`

An accessor was passed where the prop type expects the value.
Call it in the attribute, `query={query()}`, which stays reactive; type the prop as `Accessor<string>` only when the child needs the function.

### The child never updates, and there is no type error

The child destructured `props` or copied a prop into a local variable.
TypeScript allows both; development prints `[STRICT_READ_UNTRACKED]`.
Read `props.name` inside the JSX; see [Props](/concepts/components-and-jsx#props).

### `'Price' components don't accept text as child elements`

The component's props use `VoidProps`, which types `children` as `never`, so any child is rejected.
Remove the child, or change the props to `ParentProps` if the component should render children.

### `Type 'SourceAccessor<number>' is not assignable to type 'Element'`

A signal was placed in JSX without calling it: `{quantity}` instead of `{quantity()}`.
A function is not a valid child, so the checker reports it; add the parentheses.

### `'input' is possibly 'undefined'`

The `ref` variable is typed `HTMLInputElement | undefined` and read in the component body, before the element exists.
Move the read into an event handler or `onSettled`, and declare the variable with `!` once every read happens after creation.

## Recap

- Type `props` on the parameter, or use `Component<P>` when the component is a value; both produce the same checks.
- Add `children` with `ParentProps` (optional), `FlowProps` (required, with its type), or `VoidProps` (forbidden).
- Import `JSX` from `@solidjs/web`; `solid-js` exports the renderer-neutral `Component`, `Element`, and reactive types.
- Pass `query()` to a prop typed `string`; the compiled getter keeps it reactive, and `Accessor<T>` is for children that need the function.
- A memo that returns a promise is typed as the settled value; `createSignal<T>()` with no argument includes `undefined`.
- A store draft has the store's type, and `Store<T>` is `T`, so a store passes where the plain object is expected.
- Read `event.currentTarget`; `event.target` is only narrowed for input events on form controls.
- A thrown `redirect()` keeps the server function's return type; a returned one adds `Response`.

## Next steps

- [Components and JSX](/concepts/components-and-jsx): the runtime behavior behind the props, children, and ref types on this page.
- [Custom primitives](/guides/custom-primitives): accept a value or an accessor in a `createX` function, and return accessors from it.
- [Route definitions](/routing/solid-router/route-definitions): `defineRoute`, match filters, and lazily loaded route tables, all typed from the path literal.
- [Server functions](/building-apps/server-functions): argument encoding and validation, which is where an `unknown` argument gets its type.
