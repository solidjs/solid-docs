---
title: Router
use_cases: >-
  routing context, browser routing, route definitions, app routing
tags:
  - component
  - router
  - routing
  - context
version: "1.0"
description: >-
  Router provides browser-based routing context for Solid Router.
---

`Router` is the browser router component that provides routing context for route definitions and router primitives.

## Import

```tsx
import { Router } from "@solidjs/router";
```

## Type

```tsx
type RouterProps = BaseRouterProps & {
	url?: string;
	actionBase?: string;
	explicitLinks?: boolean;
	preload?: boolean;
};

type BaseRouterProps = {
	base?: string;
	root?: Component<RouteSectionProps>;
	rootPreload?: RoutePreloadFunc;
	singleFlight?: boolean;
	children?: JSX.Element | RouteDefinition | RouteDefinition[];
	transformUrl?: (url: string) => string;
	rootLoad?: RoutePreloadFunc;
};

function Router(props: RouterProps): JSX.Element;
```

## Props

### `children`

- **Type:** `JSX.Element | RouteDefinition | RouteDefinition[]`
- **Optional:** Yes

Route definitions rendered by the router.

### `base`

- **Type:** `string`
- **Default:** `""`
- **Optional:** Yes

Base path used when creating route branches.

### `root`

- **Type:** `Component<RouteSectionProps>`
- **Optional:** Yes

Component rendered around matched routes.

### `rootPreload`

- **Type:** `RoutePreloadFunc`
- **Optional:** Yes

Preload function called for the root route context.

### `singleFlight`

- **Type:** `boolean`
- **Default:** `true`
- **Optional:** Yes

Controls the router context `singleFlight` setting.

### `transformUrl`

- **Type:** `(url: string) => string`
- **Optional:** Yes

Function applied to the location pathname before route matching.

### `url`

- **Type:** `string`
- **Optional:** Yes

Initial URL used by the server-side static router path.

### `actionBase`

- **Type:** `string`
- **Default:** `"/_server"`
- **Optional:** Yes

Base path used by native form action handling.

### `explicitLinks`

- **Type:** `boolean`
- **Default:** `false`
- **Optional:** Yes

Controls whether native anchor interception requires the `link` attribute.

### `preload`

- **Type:** `boolean`
- **Default:** `true`
- **Optional:** Yes

Controls router-managed anchor preloading.

## Behavior

- On the server, `Router` delegates to `StaticRouter`.
- Client routing reads the current path from `window.location.pathname`, `window.location.search`, and `window.location.hash`.
- Navigation writes with `window.history.pushState` or `window.history.replaceState`.
- Hash scrolling uses the decoded hash target when one is present.
- Native anchor, preload, and form action event handlers are installed on the client.

## Examples

### Basic usage

```tsx
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

function Layout(props) {
	return (
		<>
			<h1>Root header</h1>
			{props.children}
		</>
	);
}

render(
	() => (
		<Router root={Layout}>
			<Route path="/" component={() => <h2>Home</h2>} />
		</Router>
	),
	document.getElementById("root")!
);
```

## Related

- [`Route`](/solid-router/reference/components/route)
- [`A`](/solid-router/reference/components/a)
- [`HashRouter`](/solid-router/reference/components/hash-router)
- [`MemoryRouter`](/solid-router/reference/components/memory-router)
