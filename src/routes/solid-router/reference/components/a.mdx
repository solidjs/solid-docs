---
title: A
use_cases: >-
  navigation links, active link styling, relative paths, route links
tags:
  - component
  - navigation
  - links
  - active-states
version: "1.0"
description: >-
  A wraps a native anchor element for Solid Router navigation.
---

`A` wraps the native [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) element with Solid Router path resolution, active-state classes, and the router `link` marker used by delegated navigation handling.

## Import

```tsx
import { A } from "@solidjs/router";
```

## Type

```tsx
interface AnchorProps extends Omit<
	JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
	"state"
> {
	href: string;
	replace?: boolean;
	noScroll?: boolean;
	state?: unknown;
	inactiveClass?: string;
	activeClass?: string;
	end?: boolean;
}

function A(props: AnchorProps): JSX.Element;
```

## Props

Besides the router props below, `A` accepts native [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) attributes except `state`, which Solid Router defines separately.

### `href`

- **Type:** `string`
- **Optional:** No

Path passed to the router and rendered as the anchor `href`.

### `replace`

- **Type:** `boolean`
- **Optional:** Yes

Forwarded to the rendered anchor for router navigation handling.

### `noScroll`

- **Type:** `boolean`
- **Optional:** Yes

Forwarded to the rendered anchor for router navigation handling.

### `state`

- **Type:** `unknown`
- **Optional:** Yes

Value serialized onto the rendered anchor for router navigation handling.

### `inactiveClass`

- **Type:** `string`
- **Default:** `"inactive"`
- **Optional:** Yes

Class applied when the link does not match the current location.

### `activeClass`

- **Type:** `string`
- **Default:** `"active"`
- **Optional:** Yes

Class applied when the link matches the current location.

### `end`

- **Type:** `boolean`
- **Optional:** Yes

Controls whether active matching requires an exact pathname match.

## Behavior

- Renders a native `a` element, spreads remaining anchor attributes onto it, and adds the router `link` attribute.
- Resolves `href` against the current route and renders the router-rendered path when one is available.
- Active matching compares the normalized current pathname to the normalized target pathname. Without `end`, descendant paths also match.
- When the link is an exact match, `A` sets `aria-current="page"`.
- `state` is serialized with `JSON.stringify` before being passed to the rendered anchor.
- Requires a router context.

## Examples

### Basic usage

```tsx
import { A, Route, Router } from "@solidjs/router";

function Layout(props) {
	return (
		<>
			<nav>
				<A href="/">Home</A>
				<A href="/docs" activeClass="selected">
					Docs
				</A>
			</nav>
			{props.children}
		</>
	);
}

export default function App() {
	return (
		<Router root={Layout}>
			<Route path="/" component={() => <h1>Home</h1>} />
			<Route path="/docs" component={() => <h1>Docs</h1>} />
		</Router>
	);
}
```

## Related

- [`Router`](/solid-router/reference/components/router)
- [`useNavigate`](/solid-router/reference/primitives/use-navigate)
