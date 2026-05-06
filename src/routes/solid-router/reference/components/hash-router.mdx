---
title: HashRouter
use_cases: >-
  hash routing, client routing, static deployments
tags:
  - hash-routing
  - client-side
  - component
  - router
version: "1.0"
description: >-
  HashRouter stores route paths in the URL hash.
---

`HashRouter` is the browser router variant that keeps the route in the URL fragment. It reads and writes `window.location.hash`, so routed URLs render as hash paths such as `#/docs` instead of pathname URLs such as `/docs`.

## Import

```tsx
import { HashRouter } from "@solidjs/router";
```

## Type

```tsx
type BaseRouterProps = {
	base?: string;
	root?: Component<RouteSectionProps>;
	rootPreload?: RoutePreloadFunc;
	singleFlight?: boolean;
	children?: JSX.Element | RouteDefinition | RouteDefinition[];
	transformUrl?: (url: string) => string;
	rootLoad?: RoutePreloadFunc;
};

type HashRouterProps = BaseRouterProps & {
	actionBase?: string;
	explicitLinks?: boolean;
	preload?: boolean;
};

function HashRouter(props: HashRouterProps): JSX.Element;
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

- Reads the route source from `window.location.hash.slice(1)`.
- Navigation writes `"#" + value` with `window.history.pushState` or `window.history.replaceState`.
- Rendered paths have a leading `#`.
- Listens for `hashchange` events.
- Hash-only hrefs that do not start with `/` are parsed as hashes on the current path.

## Examples

### Basic usage

```tsx
import { render } from "solid-js/web";
import { HashRouter, Route } from "@solidjs/router";

render(
	() => (
		<HashRouter>
			<Route path="/" component={() => <h1>Home</h1>} />
		</HashRouter>
	),
	document.getElementById("root")!
);
```

## Related

- [`Router`](/solid-router/reference/components/router)
- [`Route`](/solid-router/reference/components/route)
- [`A`](/solid-router/reference/components/a)
