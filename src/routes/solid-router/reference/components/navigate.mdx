---
title: Navigate
use_cases: >-
  redirects, programmatic navigation, render-time navigation
tags:
  - component
  - redirects
  - navigation
version: "1.0"
description: >-
  Navigate performs router navigation when it renders.
---

`Navigate` performs router navigation during render and returns no UI. It is the component form of a redirect, not an anchor link.

## Import

```tsx
import { Navigate } from "@solidjs/router";
```

## Type

```tsx
interface NavigateProps {
	href:
		| ((args: { navigate: Navigator; location: Location }) => string)
		| string;
	state?: unknown;
}

function Navigate(props: NavigateProps): null;
```

## Props

### `href`

- **Type:** `((args: { navigate: Navigator; location: Location }) => string) | string`
- **Optional:** No

Path to navigate to, or a function that receives the router navigator and current location and returns a path.

### `state`

- **Type:** `unknown`
- **Optional:** Yes

State passed to the router navigator.

## Behavior

- Calls `useNavigate` and `useLocation` when rendered.
- If `href` is a function, it receives `{ navigate, location }` before navigation.
- Navigation uses `{ replace: true, state }`.
- Renders `null`.

## Examples

### Basic usage

```tsx
import { Navigate, Route, Router } from "@solidjs/router";

export default function App() {
	return (
		<Router>
			<Route path="/old" component={() => <Navigate href="/new" />} />
		</Router>
	);
}
```

### Function href

```tsx
import { Navigate, Route, Router } from "@solidjs/router";

function getPath({ location }) {
	return location.pathname === "/old" ? "/new" : "/";
}

export default function App() {
	return (
		<Router>
			<Route path="/old" component={() => <Navigate href={getPath} />} />
		</Router>
	);
}
```

## Related

- [`A`](/solid-router/reference/components/a)
- [`useNavigate`](/solid-router/reference/primitives/use-navigate)
- [`useLocation`](/solid-router/reference/primitives/use-location)
