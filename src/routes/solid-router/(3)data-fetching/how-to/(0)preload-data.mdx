---
title: "Preload data"
---

Preloading data improves perceived performance by fetching the data for an upcoming page before the user navigates to it.

Solid Router initiates preloading in two scenarios:

- When a user indicates intent to navigate to the page (e.g., by hovering over a link).
- When the route's component is rendering.

This ensures data fetching starts as early as possible, often making data ready once the component renders.

Preloading is configured using the [`preload`](/solid-router/reference/preload-functions/preload) prop on a [`Route`](/solid-router/reference/components/route).
This prop accepts a function that calls one or more queries.
When triggered, the queries execute and their results are stored in a short-lived internal cache.
Once the user navigates and the destination route’s component renders, any `createAsync` calls within the page will consume the preloaded data.
Thanks to the [deduplication mechanism](#deduplication), no redundant network requests are made.

```tsx {18-20,27}
import { Show } from "solid-js";
import { Route, query, createAsync } from "@solidjs/router";

const getProductQuery = query(async (id: string) => {
	// ... Fetches product details for the given ID.
}, "product");

function ProductDetails(props) {
	const product = createAsync(() => getProductQuery(props.params.id));

	return (
		<Show when={product()}>
			<h1>{product().name}</h1>
		</Show>
	);
}

function preloadProduct({ params }: { params: { id: string } }) {
	getProductQuery(params.id);
}

function Routes() {
	return (
		<Route
			path="/products/:id"
			component={ProductDetails}
			preload={preloadProduct}
		/>
	);
}
```

In this example, hovering a link to `/products/:id` triggers `preloadProduct`.
When the `ProductDetails` component renders, its `createAsync` call will instantly resolve with the preloaded data.
