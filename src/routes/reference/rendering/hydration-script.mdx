---
title: hydrationScript
category: Rendering
use_cases: >-
  server rendering, hydration bootstrap, capturing delegated events before
  client hydration
tags:
  - ssr
  - hydration
  - bootstrap
  - events
version: "1.0"
description: >-
  Generate the SSR hydration bootstrap script with `HydrationScript` or
  `generateHydrationScript`.
---

`HydrationScript` and `generateHydrationScript` generate Solid's SSR hydration bootstrap script.

## Import

```ts
import { HydrationScript, generateHydrationScript } from "solid-js/web";
```

## Type

```ts
function HydrationScript(props: {
	nonce?: string;
	eventNames?: string[];
}): JSX.Element;

function generateHydrationScript(options: {
	nonce?: string;
	eventNames?: string[];
}): string;
```

## `HydrationScript` props

### `nonce`

- **Type:** `string`

Nonce applied to the generated `<script>` tag.

### `eventNames`

- **Type:** `string[]`

Delegated event names captured before client scripts load.

## `generateHydrationScript` options

### `nonce`

- **Type:** `string`

Nonce applied to the generated script tag.

### `eventNames`

- **Type:** `string[]`

Delegated event names captured before client scripts load.

## Return value

- **Type:** `JSX.Element` for `HydrationScript`, `string` for `generateHydrationScript`

## Behavior

- The generated script initializes `window._$HY` and bootstraps delegated event replay before the runtime loads.
- The default captured delegated events are `"click"` and `"input"` unless `eventNames` is overridden.
- Place the generated script once in the server-rendered document when the page will hydrate on the client.
- `HydrationScript` returns JSX for server-rendered HTML output, and `generateHydrationScript` returns a string for manual HTML generation.
- In browser bundles, these exports are placeholders that return `undefined`.

## Examples

### `HydrationScript`

```tsx
import { HydrationScript } from "solid-js/web";
import type { JSX } from "solid-js";

function Html(props: { children: JSX.Element }) {
	return (
		<html lang="en">
			<head>
				<HydrationScript />
			</head>
			<body>{props.children}</body>
		</html>
	);
}
```

### `generateHydrationScript`

```ts
import { generateHydrationScript } from "solid-js/web";

const script = generateHydrationScript({ nonce: "nonce-value" });
```

## Related

- [`hydrate`](/reference/rendering/hydrate)
