---
title: preload
use_cases: >-
  route preload, route data, route definitions
tags:
  - preload
  - routing
  - data
version: "1.0"
description: >-
  preload is a route definition property for route data setup.
---

`preload` is a [`Route`](/solid-router/reference/components/route) property for preparing route data before the route component renders or while a route is being preloaded.

## Import

```tsx
import { Route } from "@solidjs/router";
```

## Type

```tsx
type Intent = "initial" | "native" | "navigate" | "preload";

interface RoutePreloadFuncArgs {
	params: Params;
	location: Location;
	intent: Intent;
}

type RoutePreloadFunc<T = unknown> = (args: RoutePreloadFuncArgs) => T;
```

## Parameters

### `params`

- **Type:** `Params`
- **Required:** Yes

Route params for the matched route.
The value has the same shape as [`useParams`](/solid-router/reference/primitives/use-params).

### `location`

- **Type:** `Location`
- **Required:** Yes

[`Location`](/solid-router/reference/primitives/use-location) for the route being loaded or preloaded.

### `intent`

- **Type:** `"initial" | "native" | "navigate" | "preload"`
- **Required:** Yes

Reason the router called the preload function, such as initial render, router navigation, native history navigation, or route preloading.

## Return value

- **Type:** `T`

Returns the route data value.
During route context creation, Solid Router passes this value to the matched route component as `props.data`.

## Behavior

- During route context creation, Solid Router calls `preload` with the matched params, current location, and current router intent or `"initial"`.
- Manual route preloading calls `preload` with `intent: "preload"` only when `preloadData` is truthy.
- If a route definition has no `preload`, Solid Router uses the deprecated `load` property when one is present.
- The route component's static `preload` method runs before the route-level `preload` function.

## Examples

### Basic usage

```tsx
import { Route, query } from "@solidjs/router";

const getProduct = query(async (id: string) => {
	const response = await fetch(`/api/products/${id}`);
	return response.json();
}, "product");

function preloadProduct({ params }) {
	void getProduct(params.id);
}

function ProductPage(props) {
	return <h1>Product {props.params.id}</h1>;
}

export default function ProductRoutes() {
	return (
		<Route
			path="/products/:id"
			component={ProductPage}
			preload={preloadProduct}
		/>
	);
}
```

## Related

- [`Route`](/solid-router/reference/components/route)
- [`usePreloadRoute`](/solid-router/reference/primitives/use-preload-route)
