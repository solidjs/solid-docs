---
title: useNavigate
use_cases: >-
  programmatic navigation, redirects, history navigation, navigation state
tags:
  - navigate
  - redirect
  - history
  - state
version: "1.0"
description: >-
  useNavigate returns the navigation function.
---

`useNavigate` returns a function for programmatically navigating to a new route.

## Import

```ts
import { useNavigate } from "@solidjs/router";
```

## Type

```ts
interface NavigateOptions<S = unknown> {
	resolve: boolean;
	replace: boolean;
	scroll: boolean;
	state: S;
}

interface Navigator {
	(to: string | number, options?: Partial<NavigateOptions>): void;
	(delta: number): void;
}

function useNavigate(): Navigator;
```

## Parameters

`useNavigate` takes no arguments.

## Return value

- **Type:** `Navigator`

Returns a function that accepts two arguments:

### `to`

- **Type:** `string | number`
- **Required:** Yes

Path to navigate to, or history delta (e.g., `-1` for back, `1` for forward) for the router integration.

### `options`

- **Type:** `Partial<NavigateOptions>`
- **Required:** No

Navigation options used when `to` is a string.

### `options.resolve`

- **Type:** `boolean`
- **Default:** `true` for path navigation, `false` for query-only strings.

Controls whether the target path resolves against the current route.

### `options.replace`

- **Type:** `boolean`
- **Default:** `false`

Controls whether navigation replaces the current history entry.

### `options.scroll`

- **Type:** `boolean`
- **Default:** `true`

Controls whether navigation scrolls after the route changes.

### `options.state`

- **Type:** `unknown`
- **Default:** `undefined`

State stored with the next location.

## Behavior

- Passing `0` as a history delta does nothing.
- Nonzero history deltas call the router integration `go` function when one exists.
- Query-only strings are resolved against the current pathname.
- On the server, path navigation sets a `302` response with a `Location` header when a request event is available.

## Examples

### Basic usage

```tsx
import { useNavigate } from "@solidjs/router";

const navigate = useNavigate();

navigate("/users/123");
```

### With `replace`

```tsx
import { useNavigate } from "@solidjs/router";

const navigate = useNavigate();

// Redirect (replace history)
function login() {
	navigate("/dashboard", { replace: true });
}
```

### With `delta`

```tsx
import { useNavigate } from "@solidjs/router";

const navigate = useNavigate();

// Go back one page
function goBack() {
	navigate(-1);
}
```

### With `state`

```tsx
import { useNavigate } from "@solidjs/router";

const navigate = useNavigate();

// Pass custom state
navigate("/checkout", {
	state: { from: "cart", total: 100 },
});
```

## Related

- [useLocation](/solid-router/reference/primitives/use-location)
- [redirect](/solid-router/reference/response-helpers/redirect)
