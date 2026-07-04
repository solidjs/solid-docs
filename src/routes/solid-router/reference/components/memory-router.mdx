---
title: MemoryRouter
use_cases: >-
  memory routing, controlled history, tests, internal navigation state
tags:
  - memory
  - history
  - component
  - router
version: "1.0"
description: >-
  MemoryRouter stores route paths in a memory history object.
---

`MemoryRouter` keeps the router location in a `MemoryHistory` object instead of the browser address bar. It is for route state owned by code, with navigation controlled through `history.get`, `history.set`, `history.go`, and `history.listen`.

## Import

```tsx
import { MemoryRouter, createMemoryHistory } from "@solidjs/router";
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

type MemoryHistory = {
	get: () => string;
	set: (change: LocationChange) => void;
	go: (delta: number) => void;
	listen: (listener: (value: string) => void) => () => void;
};

type MemoryRouterProps = BaseRouterProps & {
	history?: MemoryHistory;
	actionBase?: string;
	explicitLinks?: boolean;
	preload?: boolean;
};

function createMemoryHistory(): MemoryHistory & {
	back: () => void;
	forward: () => void;
};

function MemoryRouter(props: MemoryRouterProps): JSX.Element;
```

## Props

### `history`

- **Type:** `MemoryHistory`
- **Default:** `createMemoryHistory()`
- **Optional:** Yes

Memory history object used as the router source.

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

## Return value

- **Type:** `MemoryHistory & { back: () => void; forward: () => void }`

`createMemoryHistory` returns a memory history object.

## Behavior

- Uses the provided `history` prop. If `history` is omitted, it creates a new memory history.
- `createMemoryHistory` starts with `"/"` at index `0`.
- `history.set` replaces the current entry when `replace` is truthy. Otherwise, it removes entries after the current index and appends the next value.
- `history.go` clamps the next index between the first and last history entries.
- `history.listen` registers a listener and returns a cleanup function that removes it.

## Examples

### Basic usage

```tsx
import { MemoryRouter, Route, createMemoryHistory } from "@solidjs/router";

export default function App() {
	const history = createMemoryHistory();

	return (
		<MemoryRouter history={history}>
			<Route path="/" component={() => <h1>Home</h1>} />
			<Route path="/about" component={() => <h1>About</h1>} />
		</MemoryRouter>
	);
}
```

## Related

- [`Router`](/solid-router/reference/components/router)
- [`HashRouter`](/solid-router/reference/components/hash-router)
- [`Route`](/solid-router/reference/components/route)
